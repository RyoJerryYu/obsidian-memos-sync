import {
	createChannel,
	createClientFactory,
	FetchTransport,
	Client,
	Metadata,
	ClientMiddleware,
	ClientMiddlewareCall,
	CallOptions,
} from "nice-grpc-web";
import { MemoServiceDefinition } from "./memos-proto-v0.22.0/gen/api/v1/memo_service";
import { ResourceServiceDefinition } from "./memos-proto-v0.22.0/gen/api/v1/resource_service";
import * as log from "@/utils/log";
import { AuthServiceDefinition } from "./memos-proto-v0.22.0/gen/api/v1/auth_service";

export type MemoCli = Client<MemoServiceDefinition>;
export type ResourceCli = Client<ResourceServiceDefinition>;
export type AuthCli = Client<AuthServiceDefinition>;

const loggingMiddleware: ClientMiddleware =
	async function* devtoolsLoggingMiddleware<Request, Response>(
		call: ClientMiddlewareCall<Request, Response>,
		options: CallOptions
	): AsyncGenerator<Response, Response | void, undefined> {
		const req = call.request;
		let resp;
		try {
			resp = yield* call.next(call.request, options);
			return resp;
		} finally {
			log.debug(
				`gRPC to ${call.method.path}\n\nrequest:\n${JSON.stringify(
					req
				)}\n\nresponse:\n${JSON.stringify(resp)}`
			);
		}
	};

const bearerAuthMiddleware: (token: string) => ClientMiddleware = (token) => {
	return (call, options) =>
		call.next(call.request, {
			...options,
			metadata: Metadata(options.metadata).set(
				"authorization",
				`Bearer ${token}`
			),
		});
};

export function newClients(endpoint: string, token: string) {
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
