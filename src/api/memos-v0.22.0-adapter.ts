export type User = {
	name: string;
};

export type Resource = {
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
	resources?: Resource[];
	attachments?: Resource[]; // v0.25.1+ uses "attachments" instead of "resources"
};

export type HttpBody = {
	contentType: string;
	data: ArrayBuffer;
};

export type GetAuthStatusRequest = {};

export type ListMemosResponse = {
	memos: Memo[];
	nextPageToken: string;
};

export type ListResourcesRequest = {};
export type ListResourcesResponse = {
	resources: Resource[];
};

export type GetResourceBinaryRequest = {
	name: string;
	filename: string;
};

export type AuthCli = {
	getAuthStatus?: (request: Partial<GetAuthStatusRequest>) => Promise<User>;
	getCurrentSession?: (request: Partial<GetAuthStatusRequest>) => Promise<User>;
};

export type ResourceCli = {
	listResources: (
		request: Partial<ListResourcesRequest>
	) => Promise<ListResourcesResponse>;
	getResourceBinary: (
		request: Partial<GetResourceBinaryRequest>
	) => Promise<HttpBody>;
};

export type MemoListPaginator = {
	listMemos: (pageSize: number, pageToken: string, currentUser: User) => Promise<ListMemosResponse>;
}

export type AttachmentCli = {
	listAttachments: (
		request: Partial<ListAttachmentsRequest>
	) => Promise<ListAttachmentsResponse>;
	getAttachmentBinary: (
		request: Partial<GetAttachmentBinaryRequest>
	) => Promise<HttpBody>;
};

export type ListAttachmentsRequest = {
	pageSize?: number;
	pageToken?: string;
	filter?: string;
	orderBy?: string;
};

export type ListAttachmentsResponse = {
	attachments: Resource[];
	nextPageToken?: string;
	totalSize?: number;
};

export type GetAttachmentBinaryRequest = {
	name: string;
	filename: string;
	thumbnail?: boolean;
};

export type Clients = {
	authCli: AuthCli;
	memoListPaginator: MemoListPaginator;
	resourceCli?: ResourceCli;
	attachmentCli?: AttachmentCli;
};
