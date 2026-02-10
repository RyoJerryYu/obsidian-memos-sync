import {
	Client,
	createChannel,
	createClientFactory,
	FetchTransport,
} from "nice-grpc-web";
import { bearerAuthMiddleware, loggingMiddleware } from "./nice-grpc-utils";
import {
	AttachmentCli,
	AuthCli,
	Clients,
	User,
} from "./memos-v0.22.0-adapter";
import { MemoServiceDefinition } from "./memos-proto-v0.25.1/gen/api/v1/memo_service";
import {
	AttachmentServiceDefinition,
} from "./memos-proto-v0.25.1/gen/api/v1/attachment_service";
import { AuthServiceDefinition } from "./memos-proto-v0.25.1/gen/api/v1/auth_service";

/**
 * MemoListPaginator for v0.25.1
 * v0.25.x removed `parent` field from ListMemosRequest
 */
class MemoListPaginator {
	constructor(private memoCli: Client<typeof MemoServiceDefinition>) {}

	listMemos(pageSize: number, pageToken: string, _currentUser: User) {
		return this.memoCli.listMemos({
			pageSize,
			pageToken,
		});
	}
}

/**
 * Create gRPC clients for Memos v0.25.1
 * Uses AttachmentService (replaces ResourceService from v0.24.x)
 */
export function new0251Clients(
	endpoint: string,
	token: string,
): Clients {
	const channel = createChannel(
		endpoint,
		FetchTransport({ credentials: "include" }),
	);
	const clientFactory = createClientFactory()
		.use(loggingMiddleware)
		.use(bearerAuthMiddleware(token));

	const authCli = clientFactory.create(AuthServiceDefinition, channel);
	// Wrap authCli to match AuthCli interface (getCurrentSession returns { user, lastAccessedAt })
	const authCliAdapter: AuthCli = {
		getCurrentSession: async (request) => {
			const resp = await authCli.getCurrentSession(request);
			return resp.user || { name: "" };
		},
	};

	return {
		memoListPaginator: new MemoListPaginator(
			clientFactory.create(MemoServiceDefinition, channel),
		),
		attachmentCli: clientFactory.create(
			AttachmentServiceDefinition,
			channel,
		) as AttachmentCli,
		authCli: authCliAdapter,
	};
}
