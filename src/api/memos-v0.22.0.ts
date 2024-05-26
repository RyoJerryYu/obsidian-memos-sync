import {
	createChannel,
	createClientFactory,
	FetchTransport,
	Client,
	Metadata,
} from "nice-grpc-web";
import { MemoServiceDefinition } from "./memos-proto-v0.22.0/gen/api/v1/memo_service";
import { ResourceServiceDefinition } from "./memos-proto-v0.22.0/gen/api/v1/resource_service";

export type MemoCli = Client<MemoServiceDefinition>;
export type ResourceCli = Client<ResourceServiceDefinition>;

export function newClients(endpoint: string, token: string) {
	const channel = createChannel(
		endpoint,
		FetchTransport({
			credentials: "include",
		})
	);
	const clientFactory = createClientFactory().use(
		(call, options) =>
			call.next(call.request, {
				...options,
				metadata: Metadata(options.metadata).set(
					"authorization",
					`Bearer ${token}`
				),
			})!
	);

	return {
		memoCli: clientFactory.create(
			MemoServiceDefinition,
			channel
		) as MemoCli,
		resourceCli: clientFactory.create(
			ResourceServiceDefinition,
			channel
		) as ResourceCli,
	};
}
