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
}
