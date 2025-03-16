import {
	ClientMiddlewareCall,
	Metadata,
	ClientMiddleware,
	CallOptions,
} from "nice-grpc-web";
import * as log from "@/utils/log";

export const loggingMiddleware: ClientMiddleware =
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

export const bearerAuthMiddleware: (token: string) => ClientMiddleware = (token) => {
	return (call, options) =>
		call.next(call.request, {
			...options,
			metadata: Metadata(options.metadata).set(
				"authorization",
				`Bearer ${token}`
			),
		});
};
