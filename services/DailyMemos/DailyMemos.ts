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
import { MemosPaginator, MemosPaginatorFactory } from "./MemosPaginator";
import { DailyNoteModifier } from "./DailyNoteModifier";

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
	private memosPaginatorFactory: MemosPaginatorFactory;
	private memosPaginator: MemosPaginator;

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

		this.localKey = `periodic-para-daily-record-last-time-${this.settings.usememosToken}`;
		const lastTime = window.localStorage.getItem(this.localKey) || "";
		this.memosPaginatorFactory = new MemosPaginatorFactory(this.settings);
		this.memosPaginator =
			this.memosPaginatorFactory.createMemosPaginator(lastTime);
	}

	/**
	 * Force syncing daily memos, ignore the lastTime.
	 * After syncing, save the lastTime to localStorage, and reload the memosPaginator.
	 */
	forceSync = async () => {
		log.info("Force syncing daily memos...");
		const forcePaginator =
			this.memosPaginatorFactory.createMemosPaginator("");
		this.downloadResource();
		this.insertDailyMemos(forcePaginator);
		this.memosPaginator = forcePaginator;
	};

	/**
	 * Sync daily memos, only sync the memos after the lastTime.
	 * After syncing, save the lastTime to localStorage.
	 */
	sync = async () => {
		log.info("Syncing daily memos...");
		this.downloadResource();
		this.insertDailyMemos(this.memosPaginator);
	};

	/**
	 * Sync daily memos for the current daily note file.
	 * If the current file is not a daily note, do nothing.
	 */
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

		const currentDate = getDateFromFile(file, "day")?.format("YYYY-MM-DD");
		if (!currentDate) {
			log.debug("Failed to get date from file.");
			return;
		}
		const currentMomentMmemosPaginator =
			this.memosPaginatorFactory.createMemosPaginator(
				"",
				(date) => date === currentDate
			);

		this.downloadResource();
		this.insertDailyMemos(currentMomentMmemosPaginator);
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

	private insertDailyMemos = async (memosPaginator: MemosPaginator) => {
		const dailyNoteManager = new DailyNoteManager();
		const dailyNoteModifier = new DailyNoteModifier(
			this.settings.dailyMemosHeader
		);
		const lastTime = await memosPaginator.foreach(
			async ([today, dailyMemosForToday]) => {
				const momentDay = window.moment(today);

				const targetFile = await dailyNoteManager.getOrCreateDailyNote(
					momentDay
				);

				// read daily note, modify the memos list

				const originFileContent = await this.app.vault.read(targetFile);

				const modifiedFileContent =
					await dailyNoteModifier.modifyDailyNote(
						originFileContent,
						today,
						dailyMemosForToday
					);
				if (!modifiedFileContent) {
					return;
				}

				await this.app.vault.modify(targetFile, modifiedFileContent);
			}
		);

		log.info(`Synced daily memos, lastTime: ${lastTime}`);
		window.localStorage.setItem(this.localKey, lastTime);
	};
}
