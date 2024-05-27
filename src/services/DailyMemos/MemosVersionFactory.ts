import { MemosSyncPluginSettings } from "@/types/PluginSettings";
import {
	MemosPaginator,
	MemosPaginator0191,
	MemosPaginator0220,
} from "./MemosPaginator";
import { MemoCli, ResourceCli, newClients } from "@/api/memos-v0.22.0";
import { MemosClient0191 } from "@/api/memos-v0.19.1";
import {
	MemosResourceFetcher,
	MemosResourceFetcher0191,
	MemosResourceFetcher0220,
} from "./MemosResourceFetcher";

/**
 * MemosPaginatorFactory
 * Create MemosPaginator based on settings
 * it will create different version of MemosPaginator
 * by checking the settings.memosAPIVersion
 */
export class MemosAbstractFactory {
	private inner: MemosFactory;

	constructor(private settings: MemosSyncPluginSettings) {
		if (this.settings.memosAPIVersion === "v0.22.0") {
			const { memoCli, resourceCli } = newClients(
				this.settings.memosAPIURL,
				this.settings.memosAPIToken
			);

			this.inner = new MemosFactory0220(this.settings);
			return;
		}

		this.inner = new MemosFactory0191(this.settings);
	}

	createMemosPaginator = (
		lastTime?: string,
		filter?: (
			date: string,
			dailyMemosForDate: Record<string, string>
		) => boolean
	): MemosPaginator => {
		return this.inner.createMemosPaginator(lastTime, filter);
	};

	createResourceFetcher = () => {
		return this.inner.createResourceFetcher();
	};
}

type MemosFactory = {
	createMemosPaginator: (
		lastTime?: string,
		filter?: (
			date: string,
			dailyMemosForDate: Record<string, string>
		) => boolean
	) => MemosPaginator;
	createResourceFetcher: () => MemosResourceFetcher;
};

class MemosFactory0191 {
	private client: MemosClient0191;
	constructor(private settings: MemosSyncPluginSettings) {
		this.client = new MemosClient0191(
			this.settings.memosAPIURL,
			this.settings.memosAPIToken
		);
	}

	createMemosPaginator = (
		lastTime?: string,
		filter?: (
			date: string,
			dailyMemosForDate: Record<string, string>
		) => boolean
	): MemosPaginator => {
		return new MemosPaginator0191(this.client, lastTime, filter);
	};

	createResourceFetcher = () => {
		return new MemosResourceFetcher0191(this.client);
	};
}

class MemosFactory0220 {
	private memoCli: MemoCli;
	private resourceCli: ResourceCli;
	constructor(private settings: MemosSyncPluginSettings) {
		const { memoCli, resourceCli } = newClients(
			this.settings.memosAPIURL,
			this.settings.memosAPIToken
		);

		this.memoCli = memoCli;
		this.resourceCli = resourceCli;
	}

	createMemosPaginator = (
		lastTime?: string,
		filter?: (
			date: string,
			dailyMemosForDate: Record<string, string>
		) => boolean
	): MemosPaginator => {
		return new MemosPaginator0220(this.memoCli, lastTime, filter);
	};

	createResourceFetcher = () => {
		return new MemosResourceFetcher0220(this.resourceCli);
	};
}
