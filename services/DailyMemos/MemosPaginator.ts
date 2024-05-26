import { DailyRecordType, MemosClient0191 } from "api/memos-v0.19.1";
import * as log from "utils/log";
import { MemoCli } from "api/memos-v0.22.1";
import { Memo } from "api/memos-proto-v0.22.1/gen/api/v1/memo_service";
import { PluginSettings } from "types/PluginSettings";
import {
	APIResource,
	convert0220ResourceToAPIResource,
	generateResourceLink,
} from "./MemosResource";

type APIMemo = {
	/**
	 * created at or udpated at for the memo, for identifying the memo
	 * for identifying the memo, sorting, and decide which daily note to place in
	 */
	timestamp: number;
	/**
	 * content of the memo
	 */
	content: string;
	/**
	 * resources for the memo
	 * for generating file link
	 */
	resources?: APIResource[];
};

type MdItemMemo = {
	date: string; // date for which daily memo to place
	timestamp: string; // timestamp for identifying the memo
	content: string; // content of the memo
};

/**
 * transformAPIToMdItemMemo
 * transform API returned memo to md item.
 * It will find all resources and generate file link.
 * @param param APIMemoParam
 */
function transformAPIToMdItemMemo(param: APIMemo): MdItemMemo {
	const { timestamp, content, resources } = param;
	const [date, time] = window
		.moment(timestamp * 1000)
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

	targetFirstLine += ` #daily-record ^${timestamp}`;

	const targetOtherLine = otherLine?.length //剩余行
		? "\n" +
		  otherLine
				.filter((line: string) => line.trim())
				.map((line) => `\t${line}`)
				.join("\n")
				.trimEnd()
		: "";
	const targetResourceLine = resources?.length // 资源文件
		? "\n" +
		  resources
				?.map(
					(resource: APIResource) =>
						`\t- ${generateResourceLink(resource)}`
				)
				.join("\n")
		: "";
	const finalTargetContent =
		targetFirstLine + targetOtherLine + targetResourceLine;

	return {
		date,
		timestamp: String(timestamp),
		content: finalTargetContent,
	};
}

export type MemosPaginator = {
	foreach: (
		handle: ([today, dailyMemosForToday]: [
			string, // date, format "YYYY-MM-DD"
			Record<string, string> // daily memos for today, map<timestamp, content>
		]) => Promise<void>
	) => Promise<string>;
};

export class MemosPaginator0191 {
	private limit: number;
	private offset: number;
	private lastTime: string;

	constructor(
		private client: MemosClient0191,
		lastTime?: string,
		private filter?: (
			date: string,
			dailyMemosForDate: Record<string, string>
		) => boolean
	) {
		this.limit = 50;
		this.offset = 0;
		this.lastTime = lastTime || "";
	}

	/**
	 * return lastTime
	 * @param handle
	 * @returns
	 */
	foreach = async (
		handle: ([today, dailyMemosForToday]: [
			string, // date, format "YYYY-MM-DD"
			Record<string, string> // daily memos for today, map<timestamp, content>
		]) => Promise<void>
	) => {
		this.offset = 0; // iterate from newest, reset offset
		while (true) {
			const memos =
				(await this.client.listMemos(this.limit, this.offset)) || [];

			const mostRecentRecordTimeStamp = memos[0]?.createdAt
				? window.moment(memos[0]?.createdAt).unix()
				: memos[0]?.createdTs;

			if (
				!memos.length ||
				mostRecentRecordTimeStamp * 1000 < Number(this.lastTime)
			) {
				// bug if one memo pinned to top
				// but it's not a big deal, use sync for current daily notes
				log.debug("No new daily memos found.");
				this.lastTime = Date.now().toString();
				return this.lastTime;
			}

			const dailyMemosByDay = this.generalizeDailyMemos(memos);

			await Promise.all(
				Object.entries(dailyMemosByDay).map(
					async ([today, dailyMemosForToday]) => {
						if (
							this.filter &&
							!this.filter(today, dailyMemosForToday)
						) {
							return;
						}
						await handle([today, dailyMemosForToday]);
					}
				)
			);

			this.lastTime = String(mostRecentRecordTimeStamp * 1000);
			this.offset += memos.length;
		}
	};

	// generalize daily memos by day and timestamp
	// map<date, map<timestamp, formattedRecord>>
	private generalizeDailyMemos = (memos: DailyRecordType[]) => {
		const dailyMemosByDay: Record<string, Record<string, string>> = {};
		for (const memo of memos) {
			if (!memo.content && !memo.resourceList?.length) {
				continue;
			}

			const { createdTs, createdAt } = memo;
			const timestampInput = createdAt
				? window.moment(createdAt).unix()
				: createdTs;

			const mdItemMemo = transformAPIToMdItemMemo({
				timestamp: timestampInput,
				content: memo.content,
				resources: memo.resourceList,
			});

			if (!dailyMemosByDay[mdItemMemo.date]) {
				dailyMemosByDay[mdItemMemo.date] = {};
			}

			dailyMemosByDay[mdItemMemo.date][mdItemMemo.timestamp] =
				mdItemMemo.content;
		}
		return dailyMemosByDay;
	};
}

export class MemosPaginator0220 {
	private pageSize: number;
	private pageToken: string;
	private lastTime: string;

	constructor(
		private memoCli: MemoCli,
		lastTime?: string,
		private filter?: (
			date: string,
			dailyMemosForDate: Record<string, string>
		) => boolean
	) {
		this.pageSize = 50;
		this.pageToken = "";
		this.lastTime = lastTime || "";
	}

	/**
	 * return lastTime
	 * @param handle
	 * @returns
	 */
	foreach = async (
		handle: ([today, dailyMemosForToday]: [
			string, // date, format "YYYY-MM-DD"
			Record<string, string> // daily memos for today, map<timestamp, content>
		]) => Promise<void>
	) => {
		this.pageToken = ""; // iterate from newest, reset pageToken
		while (true) {
			const resp = await this.memoCli.listMemos({
				pageSize: this.pageSize,
				pageToken: this.pageToken,
				filter: "",
			});
			if (!resp) {
				log.debug("No new daily memos found.");
				this.lastTime = Date.now().toString();
				return this.lastTime;
			}
			const { memos, nextPageToken } = resp;

			const mostRecentRecordTimeStamp = memos[0]?.updateTime
				? window.moment(memos[0]?.updateTime).unix()
				: window.moment(memos[0]?.createTime).unix();

			if (
				!memos.length ||
				mostRecentRecordTimeStamp * 1000 < Number(this.lastTime)
			) {
				// bug if one memo pinned to top
				// but it's not a big deal, use sync for current daily notes
				log.debug("No new daily memos found.");
				this.lastTime = Date.now().toString();
				return this.lastTime;
			}

			const dailyMemosByDay = this.generalizeDailyMemos(memos);

			await Promise.all(
				Object.entries(dailyMemosByDay).map(
					async ([today, dailyMemosForToday]) => {
						if (
							this.filter &&
							!this.filter(today, dailyMemosForToday)
						) {
							return;
						}
						await handle([today, dailyMemosForToday]);
					}
				)
			);

			this.lastTime = String(mostRecentRecordTimeStamp * 1000);
			// if (!nextPageToken) {
			// 	return this.lastTime;
			// }
			this.pageToken = nextPageToken;
		}
	};

	// generalize daily memos by day and timestamp
	// map<date, map<timestamp, formattedRecord>>
	private generalizeDailyMemos = (memos: Memo[]) => {
		const dailyMemosByDay: Record<string, Record<string, string>> = {};
		for (const memo of memos) {
			if (!memo.content && !memo.resources?.length) {
				continue;
			}

			const resources = memo.resources?.map(
				convert0220ResourceToAPIResource
			);

			const mdItemMemo = transformAPIToMdItemMemo({
				timestamp: window.moment(memo.createTime).unix(),
				content: memo.content,
				resources: resources,
			});

			if (!dailyMemosByDay[mdItemMemo.date]) {
				dailyMemosByDay[mdItemMemo.date] = {};
			}

			dailyMemosByDay[mdItemMemo.date][mdItemMemo.timestamp] =
				mdItemMemo.content;
		}
		return dailyMemosByDay;
	};
}
