// @generated by protoc-gen-es v2.2.3 with parameter "target=ts,json_types=true"
// @generated from file api/v1/resource_service.proto (package memos.api.v1, syntax proto3)
/* eslint-disable */

import type { GenFile, GenMessage, GenService } from "@bufbuild/protobuf/codegenv1";
import { fileDesc, messageDesc, serviceDesc } from "@bufbuild/protobuf/codegenv1";
import { file_google_api_annotations } from "../../google/api/annotations_pb";
import { file_google_api_client } from "../../google/api/client_pb";
import { file_google_api_field_behavior } from "../../google/api/field_behavior_pb";
import type { HttpBodySchema } from "../../google/api/httpbody_pb";
import { file_google_api_httpbody } from "../../google/api/httpbody_pb";
import type { EmptySchema, FieldMask, FieldMaskJson, Timestamp, TimestampJson } from "@bufbuild/protobuf/wkt";
import { file_google_protobuf_empty, file_google_protobuf_field_mask, file_google_protobuf_timestamp } from "@bufbuild/protobuf/wkt";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file api/v1/resource_service.proto.
 */
export const file_api_v1_resource_service: GenFile = /*@__PURE__*/
  fileDesc("Ch1hcGkvdjEvcmVzb3VyY2Vfc2VydmljZS5wcm90bxIMbWVtb3MuYXBpLnYxIrYBCghSZXNvdXJjZRIMCgRuYW1lGAEgASgJEgsKA3VpZBgCIAEoCRI0CgtjcmVhdGVfdGltZRgDIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5UaW1lc3RhbXBCA+BBAxIQCghmaWxlbmFtZRgEIAEoCRIUCgdjb250ZW50GAUgASgMQgPgQQQSFQoNZXh0ZXJuYWxfbGluaxgGIAEoCRIMCgR0eXBlGAcgASgJEgwKBHNpemUYCCABKAMiQQoVQ3JlYXRlUmVzb3VyY2VSZXF1ZXN0EigKCHJlc291cmNlGAEgASgLMhYubWVtb3MuYXBpLnYxLlJlc291cmNlIhYKFExpc3RSZXNvdXJjZXNSZXF1ZXN0IkIKFUxpc3RSZXNvdXJjZXNSZXNwb25zZRIpCglyZXNvdXJjZXMYASADKAsyFi5tZW1vcy5hcGkudjEuUmVzb3VyY2UiKAoWU2VhcmNoUmVzb3VyY2VzUmVxdWVzdBIOCgZmaWx0ZXIYASABKAkiRAoXU2VhcmNoUmVzb3VyY2VzUmVzcG9uc2USKQoJcmVzb3VyY2VzGAEgAygLMhYubWVtb3MuYXBpLnYxLlJlc291cmNlIiIKEkdldFJlc291cmNlUmVxdWVzdBIMCgRuYW1lGAEgASgJIjoKGEdldFJlc291cmNlQmluYXJ5UmVxdWVzdBIMCgRuYW1lGAEgASgJEhAKCGZpbGVuYW1lGAIgASgJInIKFVVwZGF0ZVJlc291cmNlUmVxdWVzdBIoCghyZXNvdXJjZRgBIAEoCzIWLm1lbW9zLmFwaS52MS5SZXNvdXJjZRIvCgt1cGRhdGVfbWFzaxgCIAEoCzIaLmdvb2dsZS5wcm90b2J1Zi5GaWVsZE1hc2siJQoVRGVsZXRlUmVzb3VyY2VSZXF1ZXN0EgwKBG5hbWUYASABKAkymgcKD1Jlc291cmNlU2VydmljZRJyCg5DcmVhdGVSZXNvdXJjZRIjLm1lbW9zLmFwaS52MS5DcmVhdGVSZXNvdXJjZVJlcXVlc3QaFi5tZW1vcy5hcGkudjEuUmVzb3VyY2UiI4LT5JMCHToIcmVzb3VyY2UiES9hcGkvdjEvcmVzb3VyY2VzEnMKDUxpc3RSZXNvdXJjZXMSIi5tZW1vcy5hcGkudjEuTGlzdFJlc291cmNlc1JlcXVlc3QaIy5tZW1vcy5hcGkudjEuTGlzdFJlc291cmNlc1Jlc3BvbnNlIhmC0+STAhMSES9hcGkvdjEvcmVzb3VyY2VzEoABCg9TZWFyY2hSZXNvdXJjZXMSJC5tZW1vcy5hcGkudjEuU2VhcmNoUmVzb3VyY2VzUmVxdWVzdBolLm1lbW9zLmFwaS52MS5TZWFyY2hSZXNvdXJjZXNSZXNwb25zZSIggtPkkwIaEhgvYXBpL3YxL3Jlc291cmNlczpzZWFyY2gScgoLR2V0UmVzb3VyY2USIC5tZW1vcy5hcGkudjEuR2V0UmVzb3VyY2VSZXF1ZXN0GhYubWVtb3MuYXBpLnYxLlJlc291cmNlIinaQQRuYW1lgtPkkwIcEhovYXBpL3YxL3tuYW1lPXJlc291cmNlcy8qfRKOAQoRR2V0UmVzb3VyY2VCaW5hcnkSJi5tZW1vcy5hcGkudjEuR2V0UmVzb3VyY2VCaW5hcnlSZXF1ZXN0GhQuZ29vZ2xlLmFwaS5IdHRwQm9keSI72kENbmFtZSxmaWxlbmFtZYLT5JMCJRIjL2ZpbGUve25hbWU9cmVzb3VyY2VzLyp9L3tmaWxlbmFtZX0SmwEKDlVwZGF0ZVJlc291cmNlEiMubWVtb3MuYXBpLnYxLlVwZGF0ZVJlc291cmNlUmVxdWVzdBoWLm1lbW9zLmFwaS52MS5SZXNvdXJjZSJM2kEUcmVzb3VyY2UsdXBkYXRlX21hc2uC0+STAi86CHJlc291cmNlMiMvYXBpL3YxL3tyZXNvdXJjZS5uYW1lPXJlc291cmNlcy8qfRJ4Cg5EZWxldGVSZXNvdXJjZRIjLm1lbW9zLmFwaS52MS5EZWxldGVSZXNvdXJjZVJlcXVlc3QaFi5nb29nbGUucHJvdG9idWYuRW1wdHkiKdpBBG5hbWWC0+STAhwqGi9hcGkvdjEve25hbWU9cmVzb3VyY2VzLyp9QoYBChBjb20ubWVtb3MuYXBpLnYxQhRSZXNvdXJjZVNlcnZpY2VQcm90b1ABWgpnZW4vYXBpL3YxogIDTUFYqgIMTWVtb3MuQXBpLlYxygIMTWVtb3NcQXBpXFYx4gIYTWVtb3NcQXBpXFYxXEdQQk1ldGFkYXRh6gIOTWVtb3M6OkFwaTo6VjFiBnByb3RvMw", [file_google_api_annotations, file_google_api_client, file_google_api_field_behavior, file_google_api_httpbody, file_google_protobuf_empty, file_google_protobuf_field_mask, file_google_protobuf_timestamp]);

/**
 * @generated from message memos.api.v1.Resource
 */
export type Resource = Message<"memos.api.v1.Resource"> & {
  /**
   * The name of the resource.
   * Format: resources/{id}
   * id is the system generated unique identifier.
   *
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * The user defined id of the resource.
   *
   * @generated from field: string uid = 2;
   */
  uid: string;

  /**
   * @generated from field: google.protobuf.Timestamp create_time = 3;
   */
  createTime?: Timestamp;

  /**
   * @generated from field: string filename = 4;
   */
  filename: string;

  /**
   * @generated from field: bytes content = 5;
   */
  content: Uint8Array;

  /**
   * @generated from field: string external_link = 6;
   */
  externalLink: string;

  /**
   * @generated from field: string type = 7;
   */
  type: string;

  /**
   * @generated from field: int64 size = 8;
   */
  size: bigint;
};

/**
 * @generated from message memos.api.v1.Resource
 */
export type ResourceJson = {
  /**
   * The name of the resource.
   * Format: resources/{id}
   * id is the system generated unique identifier.
   *
   * @generated from field: string name = 1;
   */
  name?: string;

  /**
   * The user defined id of the resource.
   *
   * @generated from field: string uid = 2;
   */
  uid?: string;

  /**
   * @generated from field: google.protobuf.Timestamp create_time = 3;
   */
  createTime?: TimestampJson;

  /**
   * @generated from field: string filename = 4;
   */
  filename?: string;

  /**
   * @generated from field: bytes content = 5;
   */
  content?: string;

  /**
   * @generated from field: string external_link = 6;
   */
  externalLink?: string;

  /**
   * @generated from field: string type = 7;
   */
  type?: string;

  /**
   * @generated from field: int64 size = 8;
   */
  size?: string;
};

/**
 * Describes the message memos.api.v1.Resource.
 * Use `create(ResourceSchema)` to create a new message.
 */
export const ResourceSchema: GenMessage<Resource, ResourceJson> = /*@__PURE__*/
  messageDesc(file_api_v1_resource_service, 0);

/**
 * @generated from message memos.api.v1.CreateResourceRequest
 */
export type CreateResourceRequest = Message<"memos.api.v1.CreateResourceRequest"> & {
  /**
   * @generated from field: memos.api.v1.Resource resource = 1;
   */
  resource?: Resource;
};

/**
 * @generated from message memos.api.v1.CreateResourceRequest
 */
export type CreateResourceRequestJson = {
  /**
   * @generated from field: memos.api.v1.Resource resource = 1;
   */
  resource?: ResourceJson;
};

/**
 * Describes the message memos.api.v1.CreateResourceRequest.
 * Use `create(CreateResourceRequestSchema)` to create a new message.
 */
export const CreateResourceRequestSchema: GenMessage<CreateResourceRequest, CreateResourceRequestJson> = /*@__PURE__*/
  messageDesc(file_api_v1_resource_service, 1);

/**
 * @generated from message memos.api.v1.ListResourcesRequest
 */
export type ListResourcesRequest = Message<"memos.api.v1.ListResourcesRequest"> & {
};

/**
 * @generated from message memos.api.v1.ListResourcesRequest
 */
export type ListResourcesRequestJson = {
};

/**
 * Describes the message memos.api.v1.ListResourcesRequest.
 * Use `create(ListResourcesRequestSchema)` to create a new message.
 */
export const ListResourcesRequestSchema: GenMessage<ListResourcesRequest, ListResourcesRequestJson> = /*@__PURE__*/
  messageDesc(file_api_v1_resource_service, 2);

/**
 * @generated from message memos.api.v1.ListResourcesResponse
 */
export type ListResourcesResponse = Message<"memos.api.v1.ListResourcesResponse"> & {
  /**
   * @generated from field: repeated memos.api.v1.Resource resources = 1;
   */
  resources: Resource[];
};

/**
 * @generated from message memos.api.v1.ListResourcesResponse
 */
export type ListResourcesResponseJson = {
  /**
   * @generated from field: repeated memos.api.v1.Resource resources = 1;
   */
  resources?: ResourceJson[];
};

/**
 * Describes the message memos.api.v1.ListResourcesResponse.
 * Use `create(ListResourcesResponseSchema)` to create a new message.
 */
export const ListResourcesResponseSchema: GenMessage<ListResourcesResponse, ListResourcesResponseJson> = /*@__PURE__*/
  messageDesc(file_api_v1_resource_service, 3);

/**
 * @generated from message memos.api.v1.SearchResourcesRequest
 */
export type SearchResourcesRequest = Message<"memos.api.v1.SearchResourcesRequest"> & {
  /**
   * @generated from field: string filter = 1;
   */
  filter: string;
};

/**
 * @generated from message memos.api.v1.SearchResourcesRequest
 */
export type SearchResourcesRequestJson = {
  /**
   * @generated from field: string filter = 1;
   */
  filter?: string;
};

/**
 * Describes the message memos.api.v1.SearchResourcesRequest.
 * Use `create(SearchResourcesRequestSchema)` to create a new message.
 */
export const SearchResourcesRequestSchema: GenMessage<SearchResourcesRequest, SearchResourcesRequestJson> = /*@__PURE__*/
  messageDesc(file_api_v1_resource_service, 4);

/**
 * @generated from message memos.api.v1.SearchResourcesResponse
 */
export type SearchResourcesResponse = Message<"memos.api.v1.SearchResourcesResponse"> & {
  /**
   * @generated from field: repeated memos.api.v1.Resource resources = 1;
   */
  resources: Resource[];
};

/**
 * @generated from message memos.api.v1.SearchResourcesResponse
 */
export type SearchResourcesResponseJson = {
  /**
   * @generated from field: repeated memos.api.v1.Resource resources = 1;
   */
  resources?: ResourceJson[];
};

/**
 * Describes the message memos.api.v1.SearchResourcesResponse.
 * Use `create(SearchResourcesResponseSchema)` to create a new message.
 */
export const SearchResourcesResponseSchema: GenMessage<SearchResourcesResponse, SearchResourcesResponseJson> = /*@__PURE__*/
  messageDesc(file_api_v1_resource_service, 5);

/**
 * @generated from message memos.api.v1.GetResourceRequest
 */
export type GetResourceRequest = Message<"memos.api.v1.GetResourceRequest"> & {
  /**
   * The name of the resource.
   * Format: resources/{id}
   * id is the system generated unique identifier.
   *
   * @generated from field: string name = 1;
   */
  name: string;
};

/**
 * @generated from message memos.api.v1.GetResourceRequest
 */
export type GetResourceRequestJson = {
  /**
   * The name of the resource.
   * Format: resources/{id}
   * id is the system generated unique identifier.
   *
   * @generated from field: string name = 1;
   */
  name?: string;
};

/**
 * Describes the message memos.api.v1.GetResourceRequest.
 * Use `create(GetResourceRequestSchema)` to create a new message.
 */
export const GetResourceRequestSchema: GenMessage<GetResourceRequest, GetResourceRequestJson> = /*@__PURE__*/
  messageDesc(file_api_v1_resource_service, 6);

/**
 * @generated from message memos.api.v1.GetResourceBinaryRequest
 */
export type GetResourceBinaryRequest = Message<"memos.api.v1.GetResourceBinaryRequest"> & {
  /**
   * The name of the resource.
   * Format: resources/{id}
   * id is the system generated unique identifier.
   *
   * @generated from field: string name = 1;
   */
  name: string;

  /**
   * The filename of the resource. Mainly used for downloading.
   *
   * @generated from field: string filename = 2;
   */
  filename: string;
};

/**
 * @generated from message memos.api.v1.GetResourceBinaryRequest
 */
export type GetResourceBinaryRequestJson = {
  /**
   * The name of the resource.
   * Format: resources/{id}
   * id is the system generated unique identifier.
   *
   * @generated from field: string name = 1;
   */
  name?: string;

  /**
   * The filename of the resource. Mainly used for downloading.
   *
   * @generated from field: string filename = 2;
   */
  filename?: string;
};

/**
 * Describes the message memos.api.v1.GetResourceBinaryRequest.
 * Use `create(GetResourceBinaryRequestSchema)` to create a new message.
 */
export const GetResourceBinaryRequestSchema: GenMessage<GetResourceBinaryRequest, GetResourceBinaryRequestJson> = /*@__PURE__*/
  messageDesc(file_api_v1_resource_service, 7);

/**
 * @generated from message memos.api.v1.UpdateResourceRequest
 */
export type UpdateResourceRequest = Message<"memos.api.v1.UpdateResourceRequest"> & {
  /**
   * @generated from field: memos.api.v1.Resource resource = 1;
   */
  resource?: Resource;

  /**
   * @generated from field: google.protobuf.FieldMask update_mask = 2;
   */
  updateMask?: FieldMask;
};

/**
 * @generated from message memos.api.v1.UpdateResourceRequest
 */
export type UpdateResourceRequestJson = {
  /**
   * @generated from field: memos.api.v1.Resource resource = 1;
   */
  resource?: ResourceJson;

  /**
   * @generated from field: google.protobuf.FieldMask update_mask = 2;
   */
  updateMask?: FieldMaskJson;
};

/**
 * Describes the message memos.api.v1.UpdateResourceRequest.
 * Use `create(UpdateResourceRequestSchema)` to create a new message.
 */
export const UpdateResourceRequestSchema: GenMessage<UpdateResourceRequest, UpdateResourceRequestJson> = /*@__PURE__*/
  messageDesc(file_api_v1_resource_service, 8);

/**
 * @generated from message memos.api.v1.DeleteResourceRequest
 */
export type DeleteResourceRequest = Message<"memos.api.v1.DeleteResourceRequest"> & {
  /**
   * The name of the resource.
   * Format: resources/{id}
   * id is the system generated unique identifier.
   *
   * @generated from field: string name = 1;
   */
  name: string;
};

/**
 * @generated from message memos.api.v1.DeleteResourceRequest
 */
export type DeleteResourceRequestJson = {
  /**
   * The name of the resource.
   * Format: resources/{id}
   * id is the system generated unique identifier.
   *
   * @generated from field: string name = 1;
   */
  name?: string;
};

/**
 * Describes the message memos.api.v1.DeleteResourceRequest.
 * Use `create(DeleteResourceRequestSchema)` to create a new message.
 */
export const DeleteResourceRequestSchema: GenMessage<DeleteResourceRequest, DeleteResourceRequestJson> = /*@__PURE__*/
  messageDesc(file_api_v1_resource_service, 9);

/**
 * @generated from service memos.api.v1.ResourceService
 */
export const ResourceService: GenService<{
  /**
   * CreateResource creates a new resource.
   *
   * @generated from rpc memos.api.v1.ResourceService.CreateResource
   */
  createResource: {
    methodKind: "unary";
    input: typeof CreateResourceRequestSchema;
    output: typeof ResourceSchema;
  },
  /**
   * ListResources lists all resources.
   *
   * @generated from rpc memos.api.v1.ResourceService.ListResources
   */
  listResources: {
    methodKind: "unary";
    input: typeof ListResourcesRequestSchema;
    output: typeof ListResourcesResponseSchema;
  },
  /**
   * SearchResources searches memos.
   *
   * @generated from rpc memos.api.v1.ResourceService.SearchResources
   */
  searchResources: {
    methodKind: "unary";
    input: typeof SearchResourcesRequestSchema;
    output: typeof SearchResourcesResponseSchema;
  },
  /**
   * GetResource returns a resource by name.
   *
   * @generated from rpc memos.api.v1.ResourceService.GetResource
   */
  getResource: {
    methodKind: "unary";
    input: typeof GetResourceRequestSchema;
    output: typeof ResourceSchema;
  },
  /**
   * GetResourceBinary returns a resource binary by name.
   *
   * @generated from rpc memos.api.v1.ResourceService.GetResourceBinary
   */
  getResourceBinary: {
    methodKind: "unary";
    input: typeof GetResourceBinaryRequestSchema;
    output: typeof HttpBodySchema;
  },
  /**
   * UpdateResource updates a resource.
   *
   * @generated from rpc memos.api.v1.ResourceService.UpdateResource
   */
  updateResource: {
    methodKind: "unary";
    input: typeof UpdateResourceRequestSchema;
    output: typeof ResourceSchema;
  },
  /**
   * DeleteResource deletes a resource by name.
   *
   * @generated from rpc memos.api.v1.ResourceService.DeleteResource
   */
  deleteResource: {
    methodKind: "unary";
    input: typeof DeleteResourceRequestSchema;
    output: typeof EmptySchema;
  },
}> = /*@__PURE__*/
  serviceDesc(file_api_v1_resource_service, 0);

