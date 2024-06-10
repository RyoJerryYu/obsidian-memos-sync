import {
	createDailyNote,
	getAllDailyNotes,
	getDailyNote,
	getDateFromFile,
} from "obsidian-daily-notes-interface";
import type { Moment } from "moment";
import { App, MarkdownView, TFile, normalizePath } from "obsidian";
import { MemosSyncPluginSettings } from "@/types/PluginSettings";
import * as log from "@/utils/log";
import { MemosPaginator } from "./MemosPaginator";
import { DailyNoteModifier } from "./DailyNoteModifier";
import { MemosResourceFetcher } from "./MemosResourceFetcher";
import { generateResourceName } from "./MemosResource";
import { MemosAbstractFactory } from "./MemosVersionFactory";

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
	private settings: MemosSyncPluginSettings;
	private localKey: string;
	private memosFactory: MemosAbstractFactory;
	private memosPaginator: MemosPaginator;
	private memosResourceFetcher: MemosResourceFetcher;

	constructor(app: App, settings: MemosSyncPluginSettings) {
		if (!settings.memosAPIURL) {
			log.error(
				"Please set the usememosAPI setting in the plugin settings.",
			);
			return;
		}

		this.app = app;
		this.settings = settings;

		this.memosFactory = new MemosAbstractFactory(this.settings);

		this.localKey = `obsidian-memos-sync-last-time-${this.settings.memosAPIToken}`;
		const lastTime = window.localStorage.getItem(this.localKey) || "";
		this.memosPaginator = this.memosFactory.createMemosPaginator(lastTime);
		this.memosResourceFetcher = this.memosFactory.createResourceFetcher();
	}

	/**
	 * Force syncing daily memos, ignore the lastTime.
	 * After syncing, save the lastTime to localStorage, and reload the memosPaginator.
	 */
	forceSync = async () => {
		log.info("Force syncing daily memos...");
		const forcePaginator = this.memosFactory.createMemosPaginator("");
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
			this.memosFactory.createMemosPaginator(
				"",
				(date) => date === currentDate,
			);

		this.downloadResource();
		this.insertDailyMemos(currentMomentMmemosPaginator);
	};

	/**
	 * Download resources to attachments folder.
	 */
	private downloadResource = async (): Promise<void> => {
		const { origin } = new URL(this.settings.memosAPIURL);
		const resourceList = await this.memosResourceFetcher.listResources();

		if (!resourceList) {
			log.debug(`No resources found: ${origin}/resource`);
			return;
		}

		const folder = this.settings.attachmentFolder;
		if (!this.app.vault.getFolderByPath(folder)) {
			log.info(`Creating folder: ${folder}`);
			await this.app.vault.createFolder(folder);
		}
		await Promise.all(
			resourceList.map(async (resource) => {
				if (resource.externalLink) {
					// do not download external resources
					log.debug(
						`External resource, skip download: ${resource.externalLink}`,
					);
					return;
				}

				const resourcePath = normalizePath(
					`${folder}/${generateResourceName(resource)}`,
				);

				const isResourceExists = await this.app.vault.adapter.exists(
					resourcePath,
				);
				if (isResourceExists) {
					log.debug(
						`Resource exists, skip download: ${resourcePath}`,
					);
					return;
				}

				const data = await this.memosResourceFetcher.fetchResource(
					resource,
				);

				if (!data) {
					log.warn(`Failed to fetch resource: ${resource}`);
					return;
				}

				log.debug(`Download resource: ${resourcePath}`);
				await this.app.vault.adapter.writeBinary(resourcePath, data);
			}),
		);
	};

	private insertDailyMemos = async (memosPaginator: MemosPaginator) => {
		const dailyNoteManager = new DailyNoteManager();
		const dailyNoteModifier = new DailyNoteModifier(
			this.settings.dailyMemosHeader,
		);
		const lastTime = await memosPaginator.foreach(
			async ([today, dailyMemosForToday]) => {
				const momentDay = window.moment(today);

				const targetFile = await dailyNoteManager.getOrCreateDailyNote(
					momentDay,
				);

				// read daily note, modify the memos list
				await this.app.vault.process(targetFile, (originFileContent) => {
					const modifiedFileContent =
						dailyNoteModifier.modifyDailyNote(
							originFileContent,
							today,
							dailyMemosForToday,
						);

					if (!modifiedFileContent) {
						return originFileContent;
					}

					return modifiedFileContent;
				});
			},
		);

		log.info(`Synced daily memos, lastTime: ${lastTime}`);
		window.localStorage.setItem(this.localKey, lastTime);
	};
}
