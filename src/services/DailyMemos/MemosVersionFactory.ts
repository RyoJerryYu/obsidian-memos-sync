import { MemosSyncPluginSettings } from "@/types/PluginSettings";
import {
	MemosPaginator,
	MemosPaginator0191,
	MemosPaginator0220,
	MemosPaginator0251,
} from "./MemosPaginator";
import { new0220Clients } from "@/api/memos-v0.22.0";
import {
	AuthCli,
	Clients,
	MemoListPaginator,
	ResourceCli,
} from "@/api/memos-v0.22.0-adapter";
import { MemosClient0191 } from "@/api/memos-v0.19.1";
import {
	MemosResourceFetcher,
	MemosResourceFetcher0191,
	MemosResourceFetcher0220,
	MemosResourceFetcher0251,
} from "./MemosResourceFetcher";
import { new0240Clients } from "@/api/memos-v0.24.0";
import { new0251Clients } from "@/api/memos-v0.25.1";
import { 
	AttachmentCli,
	Clients as Clients0251
} from "@/api/memos-v0.25.1-adapter";

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
			this.inner = new MemosFactory0220(this.settings, new0220Clients);
			return;
		}
		if (this.settings.memosAPIVersion === "v0.24.0") {
			this.inner = new MemosFactory0220(this.settings, new0240Clients);
			return;
		}
		if (this.settings.memosAPIVersion === "v0.25.1") {
			this.inner = new MemosFactory0251(this.settings);
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
		const apiUrl = this.settings.memosAPIURL.endsWith("/")
			? this.settings.memosAPIURL.slice(0, -1)
			: this.settings.memosAPIURL;
		this.client = new MemosClient0191(apiUrl, this.settings.memosAPIToken);
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
	private memoListPaginator: MemoListPaginator;
	private resourceCli: ResourceCli;
	private authCli: AuthCli;
	constructor(
		private settings: MemosSyncPluginSettings,
		newClients: (endpoint: string, token: string) => Clients // for adapters that can adapt into 0220
	) {
		const apiUrl = this.settings.memosAPIURL.endsWith("/")
			? this.settings.memosAPIURL.slice(0, -1)
			: this.settings.memosAPIURL;
		const { memoListPaginator, resourceCli, authCli } = newClients(
			apiUrl,
			this.settings.memosAPIToken
		);

		this.memoListPaginator = memoListPaginator;
		this.resourceCli = resourceCli;
		this.authCli = authCli;
	}

	createMemosPaginator = (
		lastTime?: string,
		filter?: (
			date: string,
			dailyMemosForDate: Record<string, string>
		) => boolean
	): MemosPaginator => {
		return new MemosPaginator0220(
			this.memoListPaginator,
			this.authCli,
			lastTime,
			filter
		);
	};

	createResourceFetcher = () => {
		return new MemosResourceFetcher0220(this.resourceCli);
	};
}

class MemosFactory0251 {
	private client: Clients0251;

	constructor(private settings: MemosSyncPluginSettings) {
		const apiUrl = this.settings.memosAPIURL.endsWith("/")
			? this.settings.memosAPIURL.slice(0, -1)
			: this.settings.memosAPIURL;
		this.client = new0251Clients(apiUrl, this.settings.memosAPIToken);
	}

	createMemosPaginator = (
		lastTime?: string,
		filter?: (
			date: string,
			dailyMemosForDate: Record<string, string>
		) => boolean
	): MemosPaginator => {
		return new MemosPaginator0251(
			this.client.memoListPaginator,
			this.client.authCli,
			lastTime,
			filter
		);
	};

	createResourceFetcher = () => {
		return new MemosResourceFetcher0251(this.client.attachmentCli);
	};
}
