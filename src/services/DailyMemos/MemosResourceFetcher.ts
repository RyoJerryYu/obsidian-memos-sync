import { MemosClient0191 } from "@/api/memos-v0.19.1";
import * as log from "@/utils/log";
import { ResourceCli } from "@/api/memos-v0.22.0-adapter";
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
