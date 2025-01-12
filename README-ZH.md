# Obsidian Memos Sync Plugin

中文 | [English](README.md)

这是一个用于 [Obsidian](https://obsidian.md) 的插件。

这个插件提供了一些命令，可以将来自 [Memos](https://github.com/usememos/memos) 服务器账号里的记录同步到你的 Obsidian 笔记库的每日笔记中。如果每日笔记不存在，它还会根据规则创建一个。

## 兼容性

这个插件与官方的 [Daily Notes 插件](https://help.obsidian.md/Plugins/Daily+notes) 、 [Calendar 插件](https://github.com/liamcain/obsidian-calendar-plugin) 和 [Periodic Notes 插件](https://github.com/liamcain/obsidian-periodic-notes) 完全兼容。

这个插件兼容 Memos API 的各个版本，包括 v0.22.0 之后新版以及之前的旧版。

## 命令

### 同步每日 Memos

这个命令将从 Memos 服务器增量同步记录到每日笔记。
这个插件会记住上次同步的时间，并且只同步那个时间之后的记录。

### 强制同步每日 Memos

这个命令将重新同步 Memos 服务器上的所有的记录。

### 强制同步当前每日 Memos

这个命令将为光标所在的当前每日笔记重新同步 Memos 服务器上的记录。
当你想要为特定一天同步记录时，这个命令非常有用。

## 配置

| Key                | 描述                                                                      | 例子                              |
| ------------------ | ------------------------------------------------------------------------- | --------------------------------- |
| Daily Memos Header | 每日笔记中的标题， Memos 记录会替换这个章节下的内容。                     | `Memos`                           |
| Attachment Folder  | 存储附件的文件夹。                                                        | `attachments/memos_daily`         |
| Memos API Version  | Memos 服务器的版本。                                                      | `after v0.22.x`, `before v0.21.x` |
| Memos API URL      | Memos API的URL。                                                          | `http://localhost:5230`           |
| Memos API Token    | Memos API的令牌。你可以在 Memos 页面 -> 设置 -> 我的账户 界面上创建一个。 |                                   |

# FAQ

## Failed to find header for xxxx , Please make sure your daily note tempalte is correct.

如果每日笔记不存在，这个插件将创建一个新的每日笔记。
并且它会在你配置中指定的标题下插入 memos 。

这个错误的一个可能原因是 Daily Note 的模板中不包含你在配置中指定的标题。
因此，这个插件在创建 Daily Note 后无法找到标题来插入 memos 。

要解决这个问题，你应该确保 Daily Note 的 Template 里包含你在配置中指定的 Header 。
请自行检查在官方 Tempalate 插件或 [Templater 插件](https://github.com/SilentVoid13/Templater) 中指定的 Daily Note 中的模板。

# 特别鸣谢

[obsidian-lifeos](https://github.com/quanru/obsidian-lifeos)中的代码有很多有价值的参考，为这个项目早期阶段的快速开发提供了宝贵的帮助。非常感谢！
