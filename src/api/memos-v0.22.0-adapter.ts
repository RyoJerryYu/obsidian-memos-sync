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
	getAuthStatus: (request: Partial<GetAuthStatusRequest>) => Promise<User>;
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

export type Clients = {
	authCli: AuthCli;
	memoListPaginator: MemoListPaginator;
	resourceCli: ResourceCli;
};
