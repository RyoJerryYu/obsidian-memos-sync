import { MemosClient0191 } from "api/memos-v0.19.1";
import * as log from "utils/log";
import { DailyRecordType, ResourceType } from "types/usememos";
import { generateFileLink } from "./memos-util";
import { MemosClient0210 } from "api/memos-v0.22.1";
import { Memo } from "api/memos-proto-v0.22.1/gen/api/v1/memo_service";
import { Resource } from "api/memos-proto-v0.22.1/gen/api/v1/resource_service";
import { PluginSettings } from "types/PluginSettings";

/**
 *
 * @param record fetch from usememos API
 * @returns [date, timestamp, finalTargetContent], date in format "YYYY-MM-DD", timestamp is unix timestamp
 */
function formatDailyRecord(record: DailyRecordType): [string, string, string] {
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
				.map((line) => `\t${line}`)
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

	return [date, String(timeStamp), finalTargetContent];
}

export type MemosPaginator = {
	foreach: (
		handle: ([today, dailyMemosForToday]: [
			string, // date, format "YYYY-MM-DD"
			Record<string, string> // daily memos for today, map<timestamp, content>
		]) => Promise<void>
	) => Promise<string>;
};

/**
 * MemosPaginatorFactory
 * Create MemosPaginator based on settings
 * it will create different version of MemosPaginator
 * by checking the settings.memosAPIVersion
 */
export class MemosPaginatorFactory {
	constructor(private settings: PluginSettings) {}
	createMemosPaginator = (
		lastTime?: string,
		filter?: (
			date: string,
			dailyMemosForDate: Record<string, string>
		) => boolean
	): MemosPaginator => {
		if (this.settings.memosAPIVersion === "v0.22.1") {
			return new MemosPaginator0220(
				new MemosClient0210(
					this.settings.usememosAPI,
					this.settings.usememosToken
				),
				lastTime,
				filter
			);
		}
		return new MemosPaginator0191(
			new MemosClient0191(
				this.settings.usememosAPI,
				this.settings.usememosToken
			),
			lastTime,
			filter
		);
	};
}


class MemosPaginator0191 {
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
				log.info("No new daily memos found.");
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

			const [date, timestamp, formattedRecord] = formatDailyRecord(memo);

			if (!dailyMemosByDay[date]) {
				dailyMemosByDay[date] = {};
			}

			dailyMemosByDay[date][timestamp] = formattedRecord;
		}
		return dailyMemosByDay;
	};
}

class MemosPaginator0220 {
	private pageSize: number;
	private pageToken: string;
	private lastTime: string;

	constructor(
		private client: MemosClient0210,
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
			const resp = await this.client.listMemos({
				pageSize: this.pageSize,
				pageToken: this.pageToken,
				filter: "",
			});
			if (!resp) {
				log.info("No new daily memos found.");
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
				log.info("No new daily memos found.");
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

			const [date, timestamp, formattedRecord] =
				formatDailyRecord0221(memo);

			if (!dailyMemosByDay[date]) {
				dailyMemosByDay[date] = {};
			}

			dailyMemosByDay[date][timestamp] = formattedRecord;
		}
		return dailyMemosByDay;
	};
}

function formatDailyRecord0221(memo: Memo): [string, string, string] {
	const { createTime, content, resources } = memo;
	const timeStamp = window.moment(createTime).unix();
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
				.map((line) => `\t${line}`)
				.join("\n")
				.trimEnd()
		: "";
	const targetResourceLine = resources?.length // 资源文件
		? "\n" +
		  resources
				?.map(
					(resource: Resource) =>
						`\t- ${generateFileLink({
							id: resource.uid,
							externalLink: resource.externalLink,
							filename: resource.filename,
							name: resource.name,
						})}`
				)
				.join("\n")
		: "";
	const finalTargetContent =
		targetFirstLine + targetOtherLine + targetResourceLine;

	return [date, String(timeStamp), finalTargetContent];
}
