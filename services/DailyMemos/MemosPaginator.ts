import { MemosClient0191 } from "api/memos-v0.19.1";
import * as log from "utils/log";
import { DailyRecordType, ResourceType } from "types/usememos";
import { generateFileLink } from "./memos-util";

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
				log.info("No new daily memos found.");
				this.lastTime = Date.now().toString();
				return this.lastTime;
			}

			const dailyMemosByDay = this.generalizeDailyMemos(memos);

			await Promise.all(
				Object.entries(dailyMemosByDay).map(
					async ([today, dailyMemosForToday]) => {
						if (this.filter && !this.filter(today, dailyMemosForToday)){
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