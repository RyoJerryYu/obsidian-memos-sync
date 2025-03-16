import {
	createChannel,
	createClientFactory,
	FetchTransport,
	Client,
} from "nice-grpc-web";
import { MemoServiceDefinition } from "./memos-proto-v0.22.0/gen/api/v1/memo_service";
import { ResourceServiceDefinition } from "./memos-proto-v0.22.0/gen/api/v1/resource_service";
import * as log from "@/utils/log";
import { AuthServiceDefinition } from "./memos-proto-v0.22.0/gen/api/v1/auth_service";
import { Clients } from "./memos-v0.22.0-adapter";
import { bearerAuthMiddleware, loggingMiddleware } from "./nice-grpc-utils";

export type MemoCli = Client<MemoServiceDefinition>;
export type ResourceCli = Client<ResourceServiceDefinition>;
export type AuthCli = Client<AuthServiceDefinition>;

export function newClients(endpoint: string, token: string): Clients {
	const channel = createChannel(
		endpoint,
		FetchTransport({
			credentials: "include",
		})
	);
	const clientFactory = createClientFactory()
		.use(loggingMiddleware)
		.use(bearerAuthMiddleware(token));

	return {
		memoCli: clientFactory.create(
			MemoServiceDefinition,
			channel
		) as MemoCli,
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
