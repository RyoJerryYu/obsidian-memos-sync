import {
    Client,
    createChannel,
    createClientFactory,
    FetchTransport,
} from "nice-grpc-web";
import { bearerAuthMiddleware, loggingMiddleware } from "./nice-grpc-utils";
import { AuthServiceDefinition } from "./memos-proto-v0.25.1/gen/api/v1/auth_service";
import { MemoServiceDefinition } from "./memos-proto-v0.25.1/gen/api/v1/memo_service";
import { UserServiceDefinition } from "./memos-proto-v0.25.1/gen/api/v1/user_service";
import { WorkspaceServiceDefinition } from "./memos-proto-v0.25.1/gen/api/v1/workspace_service";
import { AttachmentServiceDefinition } from "./memos-proto-v0.25.1/gen/api/v1/attachment_service";
import { MarkdownServiceDefinition } from "./memos-proto-v0.25.1/gen/api/v1/markdown_service";
import { ShortcutServiceDefinition } from "./memos-proto-v0.25.1/gen/api/v1/shortcut_service";
import { AuthCli, Clients, AttachmentCli, User } from "./memos-v0.25.1-adapter";

class MemoListPaginator implements MemoListPaginator {
    constructor(private memoCli: Client<MemoServiceDefinition>) {}

    listMemos(pageSize: number, pageToken: string, currentUser: String) {
        return this.memoCli.listMemos({
            pageSize,
            pageToken,
        });
    }
}

export function new0251Clients(endpoint: string, token: string): Clients {
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
        attachmentCli: clientFactory.create(
            AttachmentServiceDefinition,
            channel
        ) as AttachmentCli,
        authCli: clientFactory.create(
            AuthServiceDefinition,
            channel
        ) as AuthCli,
    };
}


