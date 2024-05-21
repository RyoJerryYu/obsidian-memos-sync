import {
	App,
	Editor,
	MarkdownView,
	Modal,
	Notice,
	Plugin,
	PluginSettingTab,
	Setting,
} from "obsidian";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { DailyMemos } from "services/DailyMemos/DailyMemos";
import { PluginSettings } from "types/PluginSettings";

// Remember to rename these classes and interfaces!

const DEFAULT_SETTINGS: PluginSettings = {
	dailyMemosHeader: "Memos",
	usememosAPI: "https://usememos.com/api/v1",
	usememosToken: "",
	attachmentFolder: "Attachments",
};

export default class MyPlugin extends Plugin {
	settings: PluginSettings;
	dailyMemos: DailyMemos;

	async onload() {
		await this.loadSettings();
		await this.loadDailyMemos();

		// This creates an icon in the left ribbon.
		const ribbonIconEl = this.addRibbonIcon(
			"dice",
			"Sample Plugin",
			(evt: MouseEvent) => {
				// Called when the user clicks the icon.
				new Notice("This is a notice! Again!2");
			}
		);
		// Perform additional things with the ribbon
		ribbonIconEl.addClass("my-plugin-ribbon-class");

		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText("Status Bar Text");

		// This adds a simple command that can be triggered anywhere
		this.addCommand({
			id: "open-sample-modal-simple",
			name: "Open sample modal (simple)",
			callback: () => {
				new SampleModal(this.app).open();
			},
		});
		// This adds an editor command that can perform some operation on the current editor instance
		this.addCommand({
			id: "sample-editor-command",
			name: "Sample editor command",
			editorCallback: (editor: Editor, view: MarkdownView) => {
				console.log(editor.getSelection());
				editor.replaceSelection("Sample Editor Command");
			},
		});
		// This adds a complex command that can check whether the current state of the app allows execution of the command
		this.addCommand({
			id: "open-sample-modal-complex",
			name: "Open sample modal (complex)",
			checkCallback: (checking: boolean) => {
				// Conditions to check
				const markdownView =
					this.app.workspace.getActiveViewOfType(MarkdownView);
				if (markdownView) {
					// If checking is true, we're simply "checking" if the command can be run.
					// If checking is false, then we want to actually perform the operation.
					if (!checking) {
						new SampleModal(this.app).open();
					}

					// This command will only show up in Command Palette when the check function returns true
					return true;
				}
			},
		});

		// This adds a settings tab so the user can configure various aspects of the plugin
		this.addSettingTab(new SampleSettingTab(this.app, this));
	}

	onunload() {}

	loadSettings = async () => {
		this.settings = Object.assign(
			{},
			DEFAULT_SETTINGS,
			await this.loadData()
		);
	};

	saveSettings = async () => {
		await this.saveData(this.settings);
		this.loadDailyMemos()
	};

	loadDailyMemos = async () => {
		this.dailyMemos = new DailyMemos(this.app, this.settings);
		this.addCommand({
			id: "my-plugin-sync-daily-memos",
			name: "Sync daily memos",
			callback: this.dailyMemos.sync,
		});
		this.addCommand({
			id: "my-plugin-force-sync-daily-memos",
			name: "Force sync daily memos",
			callback: this.dailyMemos.forceSync,
		});
		this.addCommand({
			id: "my-plugin-force-sync-current-daily-memos",
			name: "Force sync current daily memos",
			callback: this.dailyMemos.syncForCurrentFile,
		});
		// timeout
		// interval
		// for sync
		// notice to clear on unload
	};
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText("Woah!");
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}

class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private saveSettings = (newSettings: Partial<PluginSettings>) => {
		this.plugin.settings = {
			...this.plugin.settings,
			...newSettings,
		};
		this.plugin.saveSettings();
	};

	display(): void {
		this.containerEl.empty();
		this.containerEl.createEl("h3", { text: "Settings for My Plugin." });

		new Setting(this.containerEl)
			.setName("Daily Memos Header")
			.setDesc("The header for the daily memos section.")
			.addText((textfield) => {
				textfield.setPlaceholder(DEFAULT_SETTINGS.dailyMemosHeader);
				textfield.setValue(this.plugin.settings.dailyMemosHeader);
				textfield.onChange((value) => {
					this.saveSettings({
						dailyMemosHeader: value,
					});
				});
			});

		new Setting(this.containerEl)
			.setName("Usememos API URL")
			.setDesc("Usememos API URL.")
			.addText((textfield) => {
				textfield.setPlaceholder(DEFAULT_SETTINGS.usememosAPI);
				textfield.setValue(this.plugin.settings.usememosAPI);
				textfield.onChange((value) => {
					this.saveSettings({
						usememosAPI: value,
					});
				});
			});

		new Setting(this.containerEl)
			.setName("Usememos Token")
			.setDesc("Usememos token.")
			.addText((textfield) => {
				textfield.setPlaceholder(DEFAULT_SETTINGS.usememosToken);
				textfield.setValue(this.plugin.settings.usememosToken);
				textfield.onChange((value) => {
					this.saveSettings({
						usememosToken: value,
					});
				});
			});

		new Setting(this.containerEl)
			.setName("Attachment Folder")
			.setDesc("The folder for attachments.")
			.addText((textfield) => {
				textfield.setPlaceholder(DEFAULT_SETTINGS.attachmentFolder);
				textfield.setValue(this.plugin.settings.attachmentFolder);
				textfield.onChange((value) => {
					this.saveSettings({
						attachmentFolder: value,
					});
				});
			});
	}
}
