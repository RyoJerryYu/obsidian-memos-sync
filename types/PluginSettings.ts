export interface PluginSettings {
	/**
	 * The header for the daily memos section.
	 */
	dailyMemosHeader: string;
	/**
	 * Usememos API URL. Should be like `https://api.usememos.com/api/v1`.
	 */
	usememosAPI: string;
	/**
	 * Usememos token.
	 */
	usememosToken: string;
	/**
	 * The folder for attachments.
	 */
	attachmentFolder: string;

	/**
	 * Memos Version, for using different version of memos API.
	 */
	memosAPIVersion: "v0.22.1" | "v0.19.1";
}
