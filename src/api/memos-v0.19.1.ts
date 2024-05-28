import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import * as log from "@/utils/log";
import { requestUrl } from "obsidian";

export type ResourceType = {
	name?: string;
	externalLink?: string;
	type?: string;
	uid?: string;
	id: string;
	filename: string;
};

export type DailyRecordType = {
	rowStatus: "ARCHIVED" | "ACTIVE" | "NORMAL";
	updatedTs: number;
	createdTs: number;
	createdAt: string;
	updatedAt: string;
	content: string;
	resourceList?: ResourceType[];
};

export type FetchError = {
	code: number;
	message: string;
	msg?: string;
	error?: string;
};

export class MemosClient0191 {
	constructor(
		private endpoint: string, // http://localhost:5230
		private token: string,
	) {}

	listMemos = async (
		limit: number,
		offset: number,
	): Promise<DailyRecordType[] | undefined> => {
		try {
			const data = await this.get<DailyRecordType[] | FetchError>(
				this.endpoint + `/api/v1/memo`,
				{
					params: {
						limit: limit,
						offset: offset,
						rowStatus: "NORMAL",
					},
				},
			);

			if (Array.isArray(data)) {
				return data;
			}

			throw new Error(
				data.message || data.msg || data.error || JSON.stringify(data),
			);
		} catch (error) {
			log.error(`Failed to fetch daily memos: ${error}`);
		}
	};

	listResources = async () => {
		const data = await this.get<ResourceType[] | FetchError>(
			this.endpoint + `/api/v1/resource`,
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
		const data = await this.getRaw(resourceURL, {
			responseType: "arraybuffer",
		});

		return data;
	};

	private get = async <T = any, D = any>(
		url: string,
		config?: AxiosRequestConfig<D>,
	): Promise<T> => {
		const urlObj = new URL(url);
		if (config?.params) {
			Object.entries(config.params).forEach(([key, value]) => {
				urlObj.searchParams.append(key, String(value));
			});
		}
		const res = await requestUrl({
			url: urlObj.toString(),
			headers: {
				Authorization: `Bearer ${this.token}`,
				Accept: "application/json",
			},
		});

		return res.json;
	};

	private getRaw = async <D = any>(
		url: string,
		config?: AxiosRequestConfig<D>,
	): Promise<ArrayBuffer> => {
		const urlObj = new URL(url);
		if (config?.params) {
			Object.entries(config.params).forEach(([key, value]) => {
				urlObj.searchParams.append(key, String(value));
			});
		}
		const res = await requestUrl({
			url: urlObj.toString(),
			headers: {
				Authorization: `Bearer ${this.token}`,
				Accept: "application/json",
			},
		});

		return res.arrayBuffer;
	};
}
