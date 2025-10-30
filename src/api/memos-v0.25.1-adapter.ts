import { GetCurrentSessionRequest, GetCurrentSessionResponse } from "./memos-proto-v0.25.1/gen/api/v1/auth_service";

export type User = {
	name: string;
};

export type Attachment = {
	name: string;
	filename: string;
	externalLink: string;
	type: string;
	uid?: string;
};

export type Memo = {
	content: string;
	createTime?: Date | undefined;
	updateTime?: Date | undefined;
	attachments?: Attachment[]; // Updated from Resource[] to Attachment[]
};

export type HttpBody = {
	contentType: string;
	data: ArrayBuffer;
};

export type ListMemosResponse = {
	memos: Memo[];
	nextPageToken: string;
    totalSize: number;
};

export type ListAttachmentsRequest = {};
export type ListAttachmentsResponse = {
	attachments: Attachment[];
    nextPageToken: string;
    totalSize: number;
};

export type GetAttachmentBinaryRequest = {
	name: string;
	filename: string;
};

export type AuthCli = {
	getCurrentSession: (request: Partial<GetCurrentSessionRequest>) => Promise<GetCurrentSessionResponse>;
};

export type AttachmentCli = {
	listAttachments: (
		request: Partial<ListAttachmentsRequest>
	) => Promise<ListAttachmentsResponse>;
	getAttachmentBinary: (
		request: Partial<GetAttachmentBinaryRequest>
	) => Promise<HttpBody>;
};

export type MemoListPaginator = {
	listMemos: (pageSize: number, pageToken: string, currentUser: string) => Promise<ListMemosResponse>;
}

export type Clients = {
	authCli: AuthCli;
	memoListPaginator: MemoListPaginator;
	attachmentCli: AttachmentCli;
};
