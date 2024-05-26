import axios, { AxiosInstance } from "axios";
import { DailyRecordType, FetchError, ResourceType } from "types/usememos";
import * as log from "utils/log";

export class MemosClient0191 {
	private axios: AxiosInstance;

	constructor(
		private endpoint: string, // http://localhost:5230
		private token: string
	) {
		this.axios = axios.create({
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/json",
			},
		});
	}

	listMemos = async (
		limit: number,
		offset: number
	): Promise<DailyRecordType[] | undefined> => {
		try {
			const { data } = await this.axios.get<
				DailyRecordType[] | FetchError
			>(this.endpoint + `/api/v1/memo`, {
				params: {
					limit: limit,
					offset: offset,
					rowStatus: "NORMAL",
				},
			});

			if (Array.isArray(data)) {
				return data;
			}

			throw new Error(
				data.message || data.msg || data.error || JSON.stringify(data)
			);
		} catch (error) {
			log.error(`Failed to fetch daily memos: ${error}`);
		}
	};

	listResources = async () => {
		const { data } = await this.axios.get<ResourceType[] | FetchError>(
			this.endpoint + `/api/v1/resource`
		);
		return data;
	};

	/**
	 * @param resource Resource JSON returned from listResources
	 * @returns ArrayBuffer of the resource that could write into a file
	 */
	getResourceBuffer = async (resource: ResourceType) => {
		const resourceURL = `${this.endpoint}/o/r/${
			resource.uid || resource.name || resource.id
		}`;
		const { data } = await this.axios.get(resourceURL, {
			responseType: "arraybuffer",
		});

		return data;
	};
}
