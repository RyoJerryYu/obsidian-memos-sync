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
export type ListMemosRequest = {
	pageSize: number;
	pageToken: string;
	filter: string;
};
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

export type MemoCli = {
	listMemos: (
		request: Partial<ListMemosRequest>
	) => Promise<ListMemosResponse>;
};

export type ResourceCli = {
	listResources: (
		request: Partial<ListResourcesRequest>
	) => Promise<ListResourcesResponse>;
	getResourceBinary: (
		request: Partial<GetResourceBinaryRequest>
	) => Promise<HttpBody>;
};

export type Clients = {
	authCli: AuthCli;
	memoCli: MemoCli;
	resourceCli: ResourceCli;
};
