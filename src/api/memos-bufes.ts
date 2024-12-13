import { createClient, Interceptor } from "@connectrpc/connect";
import { toJson } from "@bufbuild/protobuf";
import {
    createConnectTransport,
    createGrpcWebTransport,
} from "@connectrpc/connect-web";

import {
    ListMemosResponseSchema,
    MemoService,
} from "./memos-proto-v0.22.0/gen_es/api/v1/memo_service_pb";

const authInterceptor: (token: string) => Interceptor = (token) => {
    return (next) => async (req) => {
        req.header.set("Authorization", `Bearer ${token}`);
        return next(req);
    };
};

const transport = createGrpcWebTransport({
    baseUrl: "/api/v1",
    interceptors: [authInterceptor("token")],
});

const client = createClient(MemoService, transport);

async function main() {
    const res = await client.listMemos({
        pageSize: 10,
    });
    const resRaw = toJson(ListMemosResponseSchema, res);
}
