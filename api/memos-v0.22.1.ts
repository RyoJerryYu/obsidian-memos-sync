import {
	createChannel,
	createClientFactory,
	FetchTransport,
	Client,
	Metadata,
} from "nice-grpc-web";
import axios, { AxiosInstance } from "axios";
import * as log from "utils/log";
import {
	ListMemosRequest,
	MemoServiceDefinition,
} from "./memos-proto-v0.22.1/gen/api/v1/memo_service";

// export type ListMemosParams = {
// 	// The maximum number of memos to return.
// 	page_size: number;

// 	// A page token, received from a previous `ListMemos` call.
// 	// Provide this to retrieve the subsequent page.
// 	page_token: string;

// 	// Filter is used to filter memos returned in the list.
// 	// Format: "creator == 'users/{uid}' && visibilities == ['PUBLIC', 'PROTECTED']"
// 	filter: string;
// };

export class MemosClient0210 {
	private memoCli: Client<MemoServiceDefinition>;

	constructor(
		private endpoint: string, // http://localhost:5230/
		private token: string
	) {
		const channel = createChannel(
			endpoint,
			FetchTransport({
				credentials: "include",
			})
		);
		const clientFactory = createClientFactory().use((call, options) =>
			call.next(call.request, {
				...options,
				metadata: Metadata(options.metadata).set(
					"authorization",
					`Bearer ${token}`
				),
			})!
		);

		this.memoCli = clientFactory.create(MemoServiceDefinition, channel);
	}

	listMemos = async (req: ListMemosRequest) => {
		try {
			const { memos } = await this.memoCli.listMemos(req);
		} catch (error) {
			log.error(`Failed to fetch daily memos: ${error}`);
		}
	};
}
