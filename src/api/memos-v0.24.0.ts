import {
	Client,
	createChannel,
	createClientFactory,
	FetchTransport,
} from "nice-grpc-web";
import { bearerAuthMiddleware, loggingMiddleware } from "./nice-grpc-utils";
import { AuthCli, Clients, ResourceCli, User } from "./memos-v0.22.0-adapter";
import { MemoServiceDefinition } from "./memos-proto-v0.24.0/gen/api/v1/memo_service";
import { ResourceServiceDefinition } from "./memos-proto-v0.24.0/gen/api/v1/resource_service";
import { AuthServiceDefinition } from "./memos-proto-v0.24.0/gen/api/v1/auth_service";

class MemoListPaginator implements MemoListPaginator {
	constructor(private memoCli: Client<MemoServiceDefinition>) {}

	listMemos(pageSize: number, pageToken: string, currentUser: User) {
		return this.memoCli.listMemos({
			parent: currentUser.name,
			pageSize,
			pageToken,
		});
	}
}
export function new0240Clients(endpoint: string, token: string): Clients {
	const channel = createChannel(
		endpoint,
		FetchTransport({ credentials: "include" })
	);
	const clientFactory = createClientFactory()
		.use(loggingMiddleware)
		.use(bearerAuthMiddleware(token));

	return {
		memoListPaginator: new MemoListPaginator(
			clientFactory.create(MemoServiceDefinition, channel)
		),
		resourceCli: clientFactory.create(
			ResourceServiceDefinition,
			channel
		) as ResourceCli,
		authCli: clientFactory.create(
			AuthServiceDefinition,
			channel
		) as AuthCli,
	};
}
