import { MemosClient0191 } from "@/api/memos-v0.19.1";
import { requestUrl } from "obsidian";
import * as log from "@/utils/log";
import { AttachmentCli, ResourceCli } from "@/api/memos-v0.22.0-adapter";
import { APIResource, convert0220ResourceToAPIResource } from "./MemosResource";

export type MemosResourceFetcher = {
	listResources: () => Promise<APIResource[] | undefined>;
	fetchResource: (resource: APIResource) => Promise<ArrayBuffer | undefined>;
};

export class MemosResourceFetcher0191 {
	constructor(private client: MemosClient0191) {}

	listResources = async (): Promise<APIResource[] | undefined> => {
		try {
			const data = await this.client.listResources();
			if (!Array.isArray(data)) {
				throw new Error(
					data.message ||
						data.msg ||
						data.error ||
						JSON.stringify(data)
				);
			}
			return data;
		} catch (error) {
			if (error.response && error.response.status === 404) {
				log.debug(`fetch resources 404: ${origin}/resource`);
				return;
			}
			log.error(error);
			return undefined;
		}
	};

	fetchResource = async (
		resource: APIResource
	): Promise<ArrayBuffer | undefined> => {
		try {
			const data = await this.client.getResourceBuffer(resource);
			if (!data) {
				throw new Error(
					`Failed to fetch resource: ${resource.filename}`
				);
			}
			return data;
		} catch (error) {
			log.error(error);
			return undefined;
		}
	};
}

export class MemosResourceFetcher0220 {
	constructor(private resourceCli: ResourceCli) {}

	listResources = async (): Promise<APIResource[] | undefined> => {
		try {
			const resp = await this.resourceCli.listResources({});
			return resp.resources.map(convert0220ResourceToAPIResource);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				log.debug(`fetch resources 404: ${origin}/resource`);
				return;
			}
			log.error(error);
			return undefined;
		}
	};

	fetchResource = async (
		resource: APIResource
	): Promise<ArrayBuffer | undefined> => {
		try {
			const resp = await this.resourceCli.getResourceBinary({
				name: resource.name,
				filename: resource.filename,
			});
			return resp.data;
		} catch (error) {
			log.error(error);
			return undefined;
		}
	};
}

/**
 * MemosResourceFetcher for v0.25.1
 * Uses AttachmentService (replaces ResourceService from v0.24.x)
 */
export class MemosResourceFetcher0251 {
	constructor(private attachmentCli: AttachmentCli) {}

	listResources = async (): Promise<APIResource[] | undefined> => {
		try {
			const resp = await this.attachmentCli.listAttachments({});
			return resp.attachments.map(convert0220ResourceToAPIResource);
		} catch (error) {
			if (error.response && error.response.status === 404) {
				log.debug(`fetch attachments 404: ${origin}/attachment`);
				return;
			}
			log.error(error);
			return undefined;
		}
	};

	fetchResource = async (
		resource: APIResource
	): Promise<ArrayBuffer | undefined> => {
		try {
			const resp = await this.attachmentCli.getAttachmentBinary({
				name: resource.name,
				filename: resource.filename,
			});
			return resp.data;
		} catch (error) {
			log.error(error);
			return undefined;
		}
	};
}

/**
 * MemosResourceFetcher for v0.26.1
 * Uses Obsidian requestUrl (bypasses CORS) + Connect protocol JSON format
 * v0.26.0 removed GetAttachmentBinary gRPC method, use HTTP /file/ endpoint instead
 */
export class MemosResourceFetcher0261 {
	constructor(
		private apiUrl: string,
		private token: string
	) {}

	listResources = async (): Promise<APIResource[] | undefined> => {
		try {
			const res = await requestUrl({
				url: `${this.apiUrl}/memos.api.v1.AttachmentService/ListAttachments`,
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${this.token}`,
				},
				body: JSON.stringify({}),
			});
			const data = res.json;
			return (data.attachments || []).map(convert0220ResourceToAPIResource);
		} catch (error) {
			log.error(`Failed to list attachments via REST: ${error}`);
			return undefined;
		}
	};

	fetchResource = async (
		resource: APIResource
	): Promise<ArrayBuffer | undefined> => {
		try {
			// v0.26.0 removed GetAttachmentBinary gRPC method.
			// Use HTTP endpoint /file/{name}/{filename} which still exists.
			const url = `${this.apiUrl}/file/${resource.name}/${encodeURIComponent(resource.filename)}`;
			const res = await requestUrl({
				url,
				headers: {
					Authorization: `Bearer ${this.token}`,
				},
			});
			return res.arrayBuffer;
		} catch (error) {
			log.error(`Failed to fetch resource binary: ${error}`);
			return undefined;
		}
	};
}
