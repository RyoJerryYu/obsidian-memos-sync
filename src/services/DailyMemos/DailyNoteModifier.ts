import * as log from "@/utils/log";

/**
 * Generates a regular expression for matching a header in a daily note.
 * If the header is already formatted with one or more '#' symbols, it will be used as is.
 * Otherwise, a single '#' symbol will be added before the header.
 *
 * @param header - The header to generate the regular expression for.
 * @returns The regular expression for matching the header and its content.
 */
function generateHeaderRegExp(header: string) {
	const formattedHeader = /^#+/.test(header.trim())
		? header.trim()
		: `# ${header.trim()}`;
	const reg = new RegExp(`(${formattedHeader}[^\n]*)([\\s\\S]*?)(?=\\n#|$)`);

	return reg;
}

export class DailyNoteModifier {
	constructor(private dailyMemosHeader: string) {}

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
	modifyDailyNote = (
		originFileContent: string,
		today: string,
		fetchedRecordList: Record<string, string>,
	) => {
		const header = this.dailyMemosHeader;
		const reg = generateHeaderRegExp(header);
		const regMatch = originFileContent.match(reg);

		if (!regMatch?.length || regMatch.index === undefined) {
			log.debug(`${regMatch}`);
			log.warn(
				`Failed to find header for ${today}. Please make sure your daily note template is correct.`,
			);
			return;
		}

		const localRecordContent = regMatch[2]?.trim(); // the memos list
		const from = regMatch.index + regMatch[1].length + 1; // start of the memos list
		const to = from + localRecordContent.length + 1; // end of the memos list
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

		log.debug(
			`for ${today}\n\nfetchedRecordList: ${JSON.stringify({
				from,
				to,
				prefix,
				suffix,
				localRecordList,
				existedRecordList,
			})}`,
		);

		const sortedRecordList = Object.entries({
			...fetchedRecordList,
			...existedRecordList,
		})
			.sort((a, b) => Number(a[0]) - Number(b[0]))
			.map((item) => item[1])
			.join("\n");

		const modifiedFileContent =
			prefix.trim() +
			`\n\n${sortedRecordList}\n\n` +
			suffix.trim() +
			`\n`;

		return modifiedFileContent;
	};
}
