import {
	createDailyNote,
	getAllDailyNotes,
	getDailyNote,
	getDateFromFile,
} from "obsidian-daily-notes-interface";
import type { Moment } from "moment";
import { App, MarkdownView, TFile, normalizePath } from "obsidian";
import { PluginSettings } from "types/PluginSettings";
import { DailyRecordType, FetchError, ResourceType } from "types/usememos";
import * as log from "utils/log";
import { MemosClient0191 } from "api/memos-v0.19.1";
import { generateFileName } from "./memos-util";
import { MemosPaginator0191 } from "./MemosPaginator";

function isBulletList(content: string) {
	return /^([-*\u2022]|\d+\.) .*/.test(content);
}

function generateHeaderRegExp(header: string) {
	const formattedHeader = /^#+/.test(header.trim())
		? header.trim()
		: `# ${header.trim()}`;
	const reg = new RegExp(`(${formattedHeader}[^\n]*)([\\s\\S]*?)(?=\\n#|$)`);

	return reg;
}

class DailyNoteManager {
	private allDailyNotes: Record<string, TFile>;
	constructor() {
		this.allDailyNotes = getAllDailyNotes();
	}

	getOrCreateDailyNote = async (date: Moment) => {
		const dailyNote = getDailyNote(date, this.allDailyNotes);
		if (!dailyNote) {
			log.info(`Failed to find daily note for ${date}, creating...`);
			const newDailyNote = await createDailyNote(date);
			this.allDailyNotes = getAllDailyNotes();
			return newDailyNote;
		}

		return dailyNote;
	};

	reload = () => {
		this.allDailyNotes = getAllDailyNotes();
	};
}

export class DailyMemos {
	private app: App;
	private settings: PluginSettings;
	private localKey: string;
	private memosClient: MemosClient0191;
	private dailyNoteManager: DailyNoteManager;
	private memosPaginator: MemosPaginator0191;

	constructor(app: App, settings: PluginSettings) {
		if (!settings.usememosAPI) {
			log.error(
				"Please set the usememosAPI setting in the plugin settings."
			);
			return;
		}

		this.app = app;
		this.settings = settings;

		this.memosClient = new MemosClient0191(
			this.settings.usememosAPI,
			this.settings.usememosToken
		);
		this.dailyNoteManager = new DailyNoteManager();

		this.localKey = `periodic-para-daily-record-last-time-${this.settings.usememosToken}`;
		const lastTime = window.localStorage.getItem(this.localKey) || "";
		this.memosPaginator = new MemosPaginator0191(
			this.memosClient,
			lastTime
		);
	}

	forceSync = async () => {
		this.lastTime = "";
		this.sync();
	};

	sync = async () => {
		log.info("Syncing daily memos...");
		this.offset = 0;
		this.downloadResource();
		this.insertDailyMemos();
	};

	syncForCurrentFile = async () => {
		const view = this.app.workspace.getActiveViewOfType(MarkdownView);
		if (!view) {
			log.debug("No active view found.");
			return;
		}
		if (!(view.file instanceof TFile)) {
			log.debug("Active view is not a file.");
			return;
		}

		const file = view.file;

		log.debug(`basename:${file.basename}
		path:${file.path}
		name:${file.name}
		ext:${file.extension}
		parent:${file.parent?.name}
		stat:${file.stat.ctime}`);

		const currentMoment = getDateFromFile(file, "day");
	};

	/**
	 * Download resources to attachments folder.
	 */
	private downloadResource = async (): Promise<void> => {
		const { origin } = new URL(this.settings.usememosAPI);
		try {
			const data = await this.memosClient.listResources();

			if (!Array.isArray(data)) {
				throw new Error(
					data.message ||
						data.msg ||
						data.error ||
						JSON.stringify(data)
				);
			}

			if (!data.length) {
				log.debug(`No resources found: ${origin}/resource`);
				return;
			}

			//TODO: Set the folder use obsidian-daily-notes-interface
			const folder = this.settings.attachmentFolder;
			//TODO: Create Folder...
			// will cause error, make it more robust
			if (!this.app.vault.getAbstractFileByPath(folder)) {
				log.info(`Creating folder: ${folder}`);
				await this.app.vault.createFolder(folder);
			}
			await Promise.all(
				data.map(async (resource) => {
					if (resource.externalLink) {
						// do not download external resources
						log.debug(
							`External resource, skip download: ${resource.externalLink}`
						);
						return;
					}

					const resourcePath = normalizePath(
						`${folder}/${generateFileName(resource)}`
					);

					const isResourceExists =
						await this.app.vault.adapter.exists(resourcePath);
					if (isResourceExists) {
						log.debug(
							`Resource exists, skip download: ${resourcePath}`
						);
						return;
					}

					const data = await this.memosClient.getResourceBuffer(
						resource
					);

					if (!data) {
						log.warn(`Failed to fetch resource: ${resource}`);
						return;
					}

					log.debug(`Download resource: ${resourcePath}`);
					await this.app.vault.adapter.writeBinary(
						resourcePath,
						data
					);
				})
			);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				log.debug(`fetch resources 404: ${origin}/resource`);
				return;
			}
			log.error(`Failed to fetch resource: ${error}`);
		}
	};

	private insertDailyMemos = async () => {
		const records =
			(await this.memosClient.listMemos(this.limit, this.offset)) || [];

		const mostRecentRecordTimeStamp = records[0]?.createdAt
			? window.moment(records[0]?.createdAt).unix()
			: records[0]?.createdTs;

		if (
			!records.length ||
			mostRecentRecordTimeStamp * 1000 < Number(this.lastTime)
		) {
			log.info("No new daily memos found.");
			window.localStorage.setItem(this.localKey, Date.now().toString());
			return;
		}

		// generalize daily memos by day and timestamp
		// map<date, map<timestamp, formattedRecord>>
		const dailyMemosByDay: Record<string, Record<string, string>> = {};
		for (const record of records) {
			if (!record.content && !record.resourceList?.length) {
				continue;
			}

			const [date, timestamp, formattedRecord] =
				formatDailyRecord(record);

			if (!dailyMemosByDay[date]) {
				dailyMemosByDay[date] = {};
			}

			dailyMemosByDay[date][timestamp] = formattedRecord;
		}

		await Promise.all(
			Object.entries(dailyMemosByDay).map(
				async ([today, dailyMemosForToday]) => {
					const momentDay = window.moment(today);

					const targetFile =
						await this.dailyNoteManager.getOrCreateDailyNote(
							momentDay
						);

					// read daily note, modify the memos list

					const originFileContent = await this.app.vault.read(
						targetFile
					);

					const modifiedFileContent = await this.modifyDailyNotes(
						originFileContent,
						today,
						dailyMemosForToday
					);
					if (!modifiedFileContent) {
						return;
					}

					await this.app.vault.modify(
						targetFile,
						modifiedFileContent
					);
				}
			)
		);

		this.offset = this.offset + this.limit;
		this.insertDailyMemos(); // trailing recursion
	};

	/**
	 * Daily Notes will be:
	 * ```markdown
	 * contents before
	 * ...
	 *
	 * # The Header
	 * - memos
	 * - memos
	 *
	 * contents after
	 * ```
	 *
	 * @returns modifiedFileContent
	 */
	private modifyDailyNotes = async (
		originFileContent: string,
		today: string,
		fetchedRecordList: Record<string, string>
	) => {
		const header = this.settings.dailyMemosHeader;
		const reg = generateHeaderRegExp(header);
		const regMatch = originFileContent.match(reg);

		if (!regMatch?.length || regMatch.index === undefined) {
			log.debug(`${regMatch}`);
			log.warn(
				`Failed to find header for ${today}. Please make sure your daily note template is correct.`
			);
			return;
		}

		const localRecordContent = regMatch[2]?.trim(); // the memos list
		const from = regMatch.index + regMatch[1].length + 1; // start of the memos list
		const to = from + localRecordContent.length + 1; // end of the memos list
		const prefix = originFileContent.slice(0, from); // contents before the memos list
		const suffix = originFileContent.slice(to); // contents after the memos list
		const localRecordList = localRecordContent
			? localRecordContent.split(/\n(?=- )/g)
			: [];

		// record on memos, has timestamp
		const existedRecordList: Record<string, string> = {}; // map<timestamp, record>

		for (const record of localRecordList) {
			const regMatch = record.match(/.*\^(\d{10})/);
			const createdTs = regMatch?.length ? regMatch[1]?.trim() : "";

			// put records in daily memos into different categories
			if (createdTs) {
				existedRecordList[createdTs] = record;
			}
		}

		log.debug(
			`for ${today}\n\nfetchedRecordList: ${JSON.stringify({
				from,
				to,
				prefix,
				suffix,
				localRecordList,
				existedRecordList,
			})}`
		);

		const sortedRecordList = Object.entries({
			...fetchedRecordList,
			...existedRecordList,
		})
			.sort((a, b) => Number(a[0]) - Number(b[0]))
			.map((item) => item[1])
			.join("\n");

		const modifiedFileContent =
			prefix.trim() +
			`\n\n${sortedRecordList}\n\n` +
			suffix.trim() +
			`\n`;

		return modifiedFileContent;
	};
}
