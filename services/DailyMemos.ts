import axios, { Axios } from "axios";
import { getAllDailyNotes, getDailyNote } from "obsidian-daily-notes-interface";
import type { Moment } from "moment";
import { App, TFile, normalizePath } from "obsidian";
import { PluginSettings } from "types/PluginSettings";
import { DailyRecordType, FetchError, ResourceType } from "types/usememos";
import * as log from "utils/log";
import { MemosClient0191 } from "api/memos-v0.19.1";

function generateHeaderRegExp(header: string) {
	const formattedHeader = /^#+/.test(header.trim())
		? header.trim()
		: `# ${header.trim()}`;
	const reg = new RegExp(`(${formattedHeader}[^\n]*)([\\s\\S]*?)(?=\\n##|$)`);

	return reg;
}

function generateFileLink(resource: ResourceType): string {
	if (!resource.externalLink) {
		return `![[${generateFileName(resource)}]]`;
	}

	const prefix = resource.type?.includes("image") ? "!" : ""; // only add ! for image type

	return `${prefix}[${resource.name || resource.filename}](${
		resource.externalLink
	})`;
}

function generateFileName(resource: ResourceType): string {
	return `${resource.id}-${resource.filename.replace(/[/\\?%*:|"<>]/g, "-")}`;
}

function isBulletList(content: string) {
	return /^([-*\u2022]|\d+\.) .*/.test(content);
}

function formatDailyRecord(record: DailyRecordType) {
	const { createdTs, createdAt, content, resourceList } = record;
	const timeStamp = createdAt ? window.moment(createdAt).unix() : createdTs;
	const [date, time] = window
		.moment(timeStamp * 1000)
		.format("YYYY-MM-DD HH:mm")
		.split(" ");
	const [firstLine, ...otherLine] = content.trim().split("\n");
	const isTask = /^- \[.*?\]/.test(firstLine); // 目前仅支持 task
	const isCode = /```/.test(firstLine);

	let targetFirstLine = "";

	if (isTask) {
		targetFirstLine = `- [ ] ${time} ${firstLine.replace(
			/^- \[.*?\]/,
			""
		)}`;
	} else if (isCode) {
		targetFirstLine = `- ${time}`; // 首行不允许存在代码片段
		otherLine.unshift(firstLine);
	} else {
		targetFirstLine = `- ${time} ${firstLine.replace(/^- /, "")}`;
	}

	targetFirstLine += ` #daily-record ^${timeStamp}`;

	const targetOtherLine = otherLine?.length //剩余行
		? "\n" +
		  otherLine
				.filter((line: string) => line.trim())
				.map(
					(line: string) =>
						`\t${isBulletList(line) ? line : `- ${line}`}`
				)
				.join("\n")
				.trimEnd()
		: "";
	const targetResourceLine = resourceList?.length // 资源文件
		? "\n" +
		  resourceList
				?.map(
					(resource: ResourceType) =>
						`\t- ${generateFileLink(resource)}`
				)
				.join("\n")
		: "";
	const finalTargetContent =
		targetFirstLine + targetOtherLine + targetResourceLine;

	return [date, timeStamp, finalTargetContent].map(String);
}

export class DailyMemos {
	private app: App;
	private settings: PluginSettings;
	private limit: number;
	private offset: number;
	private lastTime: string;
	private localKey: string;
	private memosClient: MemosClient0191;

	constructor(app: App, settings: PluginSettings) {
		if (!settings.usememosAPI) {
			log.error(
				"Please set the usememosAPI setting in the plugin settings."
			);
			return;
		}

		this.app = app;
		this.settings = settings;

		this.localKey = `periodic-para-daily-record-last-time-${this.settings.usememosToken}`;
		this.limit = 50;
		this.offset = 0;
		this.lastTime = window.localStorage.getItem(this.localKey) || "";

		this.memosClient = new MemosClient0191(
			this.settings.usememosAPI,
			this.settings.usememosToken
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

	/**
	 * Download resources to attachments folder.
	 * @returns {Promise<void>}
	 */
	private downloadResource = async () => {
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

			await Promise.all(
				data.map(async (resource) => {
					if (resource.externalLink) {
						// do not download external resources
						log.debug(
							`External resource, skip download: ${resource.externalLink}`
						);
						return;
					}
					this.settings;

					//TODO: Set the folder use obsidian-daily-notes-interface
					const folder = this.settings.attachmentFolder;
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

					//TODO: Create Folder...
					// will cause error, make it more robust
					if (!this.app.vault.getAbstractFileByPath(folder)) {
						log.info(`Creating folder: ${folder}`)
						this.app.vault.createFolder(folder);
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
				log.debug(`fetch resources 404: ${origin}/resource`)
				return;
			}
			log.error(`Failed to fetch resource: ${error}`);
		}
	};

	private insertDailyMemos = async () => {
		const records =
			(await this.memosClient.listMemos(this.limit, this.offset)) ||
			[];

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

			if (dailyMemosByDay[date]) {
				dailyMemosByDay[date][timestamp] = formattedRecord;
			} else {
				dailyMemosByDay[date] = { [timestamp]: formattedRecord };
			}
		}

		await Promise.all(
			Object.entries(dailyMemosByDay).map(
				async ([today, dailyMemosForToday]) => {
					const momentDay = window.moment(today);

					//TODO: Set as daily note link
					const link = `${momentDay.format("YYYY-MM-DD")}.md`;

					//TODO: get file use obsidian-daily-notes-interface
					// getDailyNote(moment(),getAllDailyNotes())
					const targetFile =
						this.app.metadataCache.getFirstLinkpathDest(link, "");
					// const targetFfile = this.file
					if (!targetFile) {
						log.warn(`Failed to find daily note for ${today}`);
						// TODO create daily note
						return;
					}

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
			log.debug(`${regMatch}`)
			log.warn(
				`Failed to find header for ${today}. Please make sure your daily note template is correct.`
			);
			return;
		}

		const localRecordContent = regMatch[2]?.trim(); // the memos list
		const from = regMatch.index + regMatch[1].length + 1; // start of the memos list
		const to = from + localRecordContent.length; // end of the memos list
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

		const sortedRecordList = Object.entries({
			...fetchedRecordList,
			...existedRecordList,
		})
			.sort((a, b) => Number(a[0]) - Number(b[0]))
			.map((item) => item[1]);

		const modifiedFileContent =
			prefix.trim() +
			`\n\n${sortedRecordList}\n\n` +
			suffix.trim() +
			`\n`;

		return modifiedFileContent;
	};
}
