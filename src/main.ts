import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
	SliderComponent,
	setTooltip,
} from "obsidian";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { DailyMemos } from "@/services/DailyMemos/DailyMemos";
import { MemosSyncPluginSettings } from "@/types/PluginSettings";
import { appHasDailyNotesPluginLoaded } from "obsidian-daily-notes-interface";

// Remember to rename these classes and interfaces!

const MEMOS_SYNC_DEFAULT_SETTINGS: MemosSyncPluginSettings = {
	dailyMemosHeader: "Memos",
	memosAPIVersion: "v0.19.1",
	memosAPIURL: "https://usememos.com",
	memosAPIToken: "",
	attachmentFolder: "Attachments",
};

export default class MemosSyncPlugin extends Plugin {
	settings: MemosSyncPluginSettings;
	dailyMemos: DailyMemos;

	async onload() {
		await this.loadSettings();
		await this.loadDailyMemos();

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new MemosSyncSettingTab(this.app, this));
	}

	onunload() {}

	loadSettings = async () => {
		this.settings = Object.assign(
			{},
			MEMOS_SYNC_DEFAULT_SETTINGS,
			await this.loadData()
		);
	};

	saveSettings = async () => {
		await this.saveData(this.settings);
		this.loadDailyMemos();
	};

	loadDailyMemos = async () => {
		this.dailyMemos = new DailyMemos(this.app, this.settings);
		this.addCommand({
			id: "memos-sync-daily-memos",
			name: "Sync daily memos",
			callback: this.dailyMemos.sync,
		});
		this.addCommand({
			id: "memos-force-sync-daily-memos",
			name: "Force sync daily memos",
			callback: this.dailyMemos.forceSync,
		});
		this.addCommand({
			id: "memos-sync-force-current-daily-memos",
			name: "Force sync current daily memos",
			callback: this.dailyMemos.syncForCurrentFile,
		});
		// timeout
		// interval
		// for sync
		// notice to clear on unload
	};
}

class MemosSyncSettingTab extends PluginSettingTab {
	app: App;
	plugin: MemosSyncPlugin;

	constructor(app: App, plugin: MemosSyncPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private saveSettings = (newSettings: Partial<MemosSyncPluginSettings>) => {
		this.plugin.settings = {
			...this.plugin.settings,
			...newSettings,
		};
		this.plugin.saveSettings();
	};

	display(): void {
		this.containerEl.empty();
		const dailyNotesEnabled = appHasDailyNotesPluginLoaded();
		if (!dailyNotesEnabled) {
			this.containerEl.createEl("h3", {
				text: "Attention: Daily Notes is not enabled.",
				attr: {
					style: "color: red",
				}
			});
			this.containerEl.createEl("p", {
				text: "Daily Notes feature is not enabled. Please enable the official Daily Notes plugin or daily notes feature in Periodic Notes plugin. Otherwise, this plugin will not work properly.",
				attr: {
					style: "color: red",
				}
			})
			
		}

		this.containerEl.createEl("h3", { text: "Settings for Memos Sync" });

		new Setting(this.containerEl)
			.setName("Daily Memos Header")
			.setDesc("The header for the daily memos section.")
			.addText((textfield) => {
				textfield.setPlaceholder(MEMOS_SYNC_DEFAULT_SETTINGS.dailyMemosHeader);
				textfield.setValue(this.plugin.settings.dailyMemosHeader);
				textfield.onChange((value) => {
					this.saveSettings({
						dailyMemosHeader: value,
					});
				});
			});

		new Setting(this.containerEl)
			.setName("Attachment Folder")
			.setDesc("The folder for attachments.")
			.addText((textfield) => {
				textfield.setPlaceholder(MEMOS_SYNC_DEFAULT_SETTINGS.attachmentFolder);
				textfield.setValue(this.plugin.settings.attachmentFolder);
				textfield.onChange((value) => {
					this.saveSettings({
						attachmentFolder: value,
					});
				});
			});

		new Setting(this.containerEl)
			.setName("Memos API Version")
			.setDesc("Memos API Version")
			.addDropdown((dropDown) => {
				dropDown.addOptions({
					"v0.19.1": "before v0.21.x",
					"v0.22.0": "after v0.22.x",
				});
				dropDown.setValue(this.plugin.settings.memosAPIVersion);
				dropDown.onChange((value) => {
					this.saveSettings({
						memosAPIVersion: value as "v0.19.1" | "v0.22.0",
					});
				});
			});

		new Setting(this.containerEl)
			.setName("Memos API URL")
			.setDesc("Memos API URL, e.g. http://localhost:5230")
			.addText((textfield) => {
				textfield.setPlaceholder(MEMOS_SYNC_DEFAULT_SETTINGS.memosAPIURL);
				textfield.setValue(this.plugin.settings.memosAPIURL);
				textfield.onChange((value) => {
					this.saveSettings({
						memosAPIURL: value,
					});
				});
			});

		new Setting(this.containerEl)
			.setName("Memos API Token")
			.setDesc("Memos API token.")
			.addText((textfield) => {
				textfield.setPlaceholder(MEMOS_SYNC_DEFAULT_SETTINGS.memosAPIToken);
				textfield.setValue(this.plugin.settings.memosAPIToken);
				textfield.onChange((value) => {
					this.saveSettings({
						memosAPIToken: value,
					});
				});
			});
	}
}
