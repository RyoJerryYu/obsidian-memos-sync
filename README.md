# Obsidian Memos Sync Plugin

[中文](README-ZH.md) | English

This is a plugin for Obsidian (https://obsidian.md).

This plugin provides a few commands to sync memos from a [Memos](https://github.com/usememos/memos) server to daily notes in your Obsidian vault. It will also create a daily note if it does not exist.

## Compatibility

This plugin is fully compatible with official [Daily Notes plugin](https://help.obsidian.md/Plugins/Daily+notes), [Calendar plugin](https://github.com/liamcain/obsidian-calendar-plugin) and [Periodic Notes plugin](https://github.com/liamcain/obsidian-periodic-notes).

This plugin is compatible with each version of Memos API, both for that after v0.22.0 and before.

## Commands

### Sync daily memos

This command will sync memos from the Memos server incrementally to the daily notes.
This plugin will remember the last sync time and only sync memos after that time.

### Force sync daily memos

This command will resync all memos from the Memos server.

### Force sync current daily memos

This command will resync memos from the Memos server for the current daily note that cursor is on.
Useful when you want to sync memos for a specific day.

## Configuration

| Key                | Description                                                                           | Example                           |
| ------------------ | ------------------------------------------------------------------------------------- | --------------------------------- |
| Daily Memos Header | The header in daily notes, where memos will be replaced in.                          | `Memos`                           |
| Attachment Folder  | The folder to store attachments.                                                      | `attachments/memos_daily`         |
| Memos API Version  | Which version the Memos Server is.                                                    | `after v0.22.x`, `before v0.21.x` |
| Memos API URL      | The URL of the Memos API.                                                             | `http://localhost:5230`           |
| Memos API Token    | The token for the Memos API. You can create one on Memos UI -> Settings -> My Account |                                   |

# Special thanks

The code in [obsidian-lifeos](https://github.com/quanru/obsidian-lifeos) provides a lot of reference value in the early stages of this project. Thanks very much!
