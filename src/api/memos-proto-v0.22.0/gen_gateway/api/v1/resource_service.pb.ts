/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../fetch.pb"
import * as GoogleApiHttpbody from "../../google/api/httpbody.pb"
import * as GoogleProtobufEmpty from "../../google/protobuf/empty.pb"
import * as GoogleProtobufField_mask from "../../google/protobuf/field_mask.pb"
import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb"
export type Resource = {
  name?: string
  uid?: string
  createTime?: GoogleProtobufTimestamp.Timestamp
  filename?: string
  content?: Uint8Array
  externalLink?: string
  type?: string
  size?: string
}

export type CreateResourceRequest = {
  resource?: Resource
}

export type ListResourcesRequest = {
}

export type ListResourcesResponse = {
  resources?: Resource[]
}

export type SearchResourcesRequest = {
  filter?: string
}

export type SearchResourcesResponse = {
  resources?: Resource[]
}

export type GetResourceRequest = {
  name?: string
}

export type GetResourceBinaryRequest = {
  name?: string
  filename?: string
}

export type UpdateResourceRequest = {
  resource?: Resource
  updateMask?: GoogleProtobufField_mask.FieldMask
}

export type DeleteResourceRequest = {
  name?: string
}

export class ResourceService {
  static CreateResource(req: CreateResourceRequest, initReq?: fm.InitReq): Promise<Resource> {
    return fm.fetchReq<CreateResourceRequest, Resource>(`/api/v1/resources`, {...initReq, method: "POST", body: JSON.stringify(req["resource"], fm.replacer)})
  }
  static ListResources(req: ListResourcesRequest, initReq?: fm.InitReq): Promise<ListResourcesResponse> {
    return fm.fetchReq<ListResourcesRequest, ListResourcesResponse>(`/api/v1/resources?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static SearchResources(req: SearchResourcesRequest, initReq?: fm.InitReq): Promise<SearchResourcesResponse> {
    return fm.fetchReq<SearchResourcesRequest, SearchResourcesResponse>(`/api/v1/resources:search?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetResource(req: GetResourceRequest, initReq?: fm.InitReq): Promise<Resource> {
    return fm.fetchReq<GetResourceRequest, Resource>(`/api/v1/${req["nameresources"]}?${fm.renderURLSearchParams(req, ["nameresources"])}`, {...initReq, method: "GET"})
  }
  static GetResourceBinary(req: GetResourceBinaryRequest, initReq?: fm.InitReq): Promise<GoogleApiHttpbody.HttpBody> {
    return fm.fetchReq<GetResourceBinaryRequest, GoogleApiHttpbody.HttpBody>(`/file/${req["nameresources"]}/${req["filename"]}?${fm.renderURLSearchParams(req, ["nameresources", "filename"])}`, {...initReq, method: "GET"})
  }
  static UpdateResource(req: UpdateResourceRequest, initReq?: fm.InitReq): Promise<Resource> {
    return fm.fetchReq<UpdateResourceRequest, Resource>(`/api/v1/${req["resourceNameresources"]}`, {...initReq, method: "PATCH", body: JSON.stringify(req["resource"], fm.replacer)})
  }
  static DeleteResource(req: DeleteResourceRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<DeleteResourceRequest, GoogleProtobufEmpty.Empty>(`/api/v1/${req["nameresources"]}`, {...initReq, method: "DELETE"})
  }
}