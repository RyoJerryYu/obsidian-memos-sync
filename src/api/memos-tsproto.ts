import { CallOptions, Client } from "nice-grpc-web";
import { MemoServiceDefinition } from "./memos-proto-v0.22.0/gen/api/v1/memo_service";
import {
    CreateResourceRequest,
    DeleteResourceRequest,
    GetResourceBinaryRequest,
    GetResourceRequest,
    ListResourcesResponse,
    Resource,
    ResourceServiceDefinition,
    SearchResourcesRequest,
    SearchResourcesResponse,
    UpdateResourceRequest,
} from "./memos-proto-v0.22.0/gen/api/v1/resource_service";
import { HttpBody } from "./memos-proto-v0.22.0/gen/google/api/httpbody";
import { Empty } from "./memos-proto-v0.22.0/gen/google/protobuf/empty";

export type MemoCli = Client<MemoServiceDefinition>;
export type ResourceCli = Client<ResourceServiceDefinition>;

const resourceCli: ResourceCli = {
    createResource: function (
        request: Partial<CreateResourceRequest>,
        options?: CallOptions
    ): Promise<Resource> {
        throw new Error("Function not implemented.");
    },
    listResources: function (
        request: {},
        options?: CallOptions
    ): Promise<ListResourcesResponse> {
        throw new Error("Function not implemented.");
    },
    searchResources: function (
        request: Partial<SearchResourcesRequest>,
        options?: CallOptions
    ): Promise<SearchResourcesResponse> {
        throw new Error("Function not implemented.");
    },
    getResourceBinary: function (
        request: Partial<GetResourceBinaryRequest>,
        options?: CallOptions
    ): Promise<HttpBody> {
        throw new Error("Function not implemented.");
    },
    updateResource: function (
        request: Partial<UpdateResourceRequest>,
        options?: CallOptions
    ): Promise<Resource> {
        throw new Error("Function not implemented.");
    },
    deleteResource: function (
        request: Partial<DeleteResourceRequest>,
        options?: CallOptions
    ): Promise<Empty> {
        throw new Error("Function not implemented.");
    },
    getResource: function (
        request: Partial<GetResourceRequest>,
        options?: CallOptions
    ): Promise<Resource> {
        throw new Error("Function not implemented.");
    },
};
