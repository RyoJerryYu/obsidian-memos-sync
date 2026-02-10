import { MemosSyncPluginSettings } from "@/types/PluginSettings";
import {
	MemosPaginator,
	MemosPaginator0191,
	MemosPaginator0220,
	MemosPaginator0261,
} from "./MemosPaginator";
import { new0220Clients } from "@/api/memos-v0.22.0";
import {
	AttachmentCli,
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
	MemosResourceFetcher0261,
} from "./MemosResourceFetcher";
import { new0240Clients } from "@/api/memos-v0.24.0";
import { new0251Clients } from "@/api/memos-v0.25.1";

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
		if (this.settings.memosAPIVersion === "v0.26.1") {
			this.inner = new MemosFactory0261(this.settings);
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
		const clients = newClients(
			apiUrl,
			this.settings.memosAPIToken
		);

		this.memoListPaginator = clients.memoListPaginator;
		this.resourceCli = clients.resourceCli!; // v0.22.0/v0.24.0 always have resourceCli
		this.authCli = clients.authCli!;
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

/**
 * MemosFactory for v0.25.1
 * Uses AttachmentService (replaces ResourceService from v0.24.x)
 */
class MemosFactory0251 {
	private memoListPaginator: MemoListPaginator;
	private attachmentCli: AttachmentCli;
	private authCli: AuthCli;
	constructor(private settings: MemosSyncPluginSettings) {
		const apiUrl = this.settings.memosAPIURL.endsWith("/")
			? this.settings.memosAPIURL.slice(0, -1)
			: this.settings.memosAPIURL;
		const clients = new0251Clients(
			apiUrl,
			this.settings.memosAPIToken
		);

		this.memoListPaginator = clients.memoListPaginator;
		this.attachmentCli = clients.attachmentCli!; // v0.25.1 always have attachmentCli
		this.authCli = clients.authCli!;
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
		return new MemosResourceFetcher0251(this.attachmentCli);
	};
}

/**
 * MemosFactory for v0.26.1
 * Uses Obsidian requestUrl (bypasses CORS) + Connect protocol JSON format
 * No gRPC clients needed - directly uses apiUrl and token
 */
class MemosFactory0261 {
	private apiUrl: string;
	constructor(private settings: MemosSyncPluginSettings) {
		this.apiUrl = this.settings.memosAPIURL.endsWith("/")
			? this.settings.memosAPIURL.slice(0, -1)
			: this.settings.memosAPIURL;
	}

	createMemosPaginator = (
		lastTime?: string,
		filter?: (
			date: string,
			dailyMemosForDate: Record<string, string>
		) => boolean
	): MemosPaginator => {
		return new MemosPaginator0261(
			this.apiUrl,
			this.settings.memosAPIToken,
			lastTime,
			filter
		);
	};

	createResourceFetcher = () => {
		return new MemosResourceFetcher0261(
			this.apiUrl,
			this.settings.memosAPIToken
		);
	};
}
