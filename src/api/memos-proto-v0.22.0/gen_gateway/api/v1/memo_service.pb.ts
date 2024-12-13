/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../fetch.pb"
import * as GoogleProtobufEmpty from "../../google/protobuf/empty.pb"
import * as GoogleProtobufField_mask from "../../google/protobuf/field_mask.pb"
import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb"
import * as MemosApiV1Common from "./common.pb"
import * as MemosApiV1Markdown_service from "./markdown_service.pb"
import * as MemosApiV1Memo_relation_service from "./memo_relation_service.pb"
import * as MemosApiV1Reaction_service from "./reaction_service.pb"
import * as MemosApiV1Resource_service from "./resource_service.pb"

export enum Visibility {
  VISIBILITY_UNSPECIFIED = "VISIBILITY_UNSPECIFIED",
  PRIVATE = "PRIVATE",
  PROTECTED = "PROTECTED",
  PUBLIC = "PUBLIC",
}

export type Memo = {
  name?: string
  uid?: string
  rowStatus?: MemosApiV1Common.RowStatus
  creator?: string
  createTime?: GoogleProtobufTimestamp.Timestamp
  updateTime?: GoogleProtobufTimestamp.Timestamp
  displayTime?: GoogleProtobufTimestamp.Timestamp
  content?: string
  nodes?: MemosApiV1Markdown_service.Node[]
  visibility?: Visibility
  tags?: string[]
  pinned?: boolean
  resources?: MemosApiV1Resource_service.Resource[]
  relations?: MemosApiV1Memo_relation_service.MemoRelation[]
  reactions?: MemosApiV1Reaction_service.Reaction[]
  property?: MemoProperty
}

export type MemoProperty = {
  tags?: string[]
  hasLink?: boolean
  hasTaskList?: boolean
}

export type CreateMemoRequest = {
  content?: string
  visibility?: Visibility
}

export type ListMemosRequest = {
  pageSize?: number
  pageToken?: string
  filter?: string
}

export type ListMemosResponse = {
  memos?: Memo[]
  nextPageToken?: string
}

export type SearchMemosRequest = {
  filter?: string
}

export type SearchMemosResponse = {
  memos?: Memo[]
}

export type GetMemoRequest = {
  name?: string
}

export type UpdateMemoRequest = {
  memo?: Memo
  updateMask?: GoogleProtobufField_mask.FieldMask
}

export type DeleteMemoRequest = {
  name?: string
}

export type ExportMemosRequest = {
  filter?: string
}

export type ExportMemosResponse = {
  content?: Uint8Array
}

export type ListMemoPropertiesRequest = {
  name?: string
}

export type ListMemoPropertiesResponse = {
  properties?: MemoProperty[]
}

export type RebuildMemoPropertyRequest = {
  name?: string
}

export type ListMemoTagsRequest = {
  parent?: string
  filter?: string
}

export type ListMemoTagsResponse = {
  tagAmounts?: {[key: string]: number}
}

export type RenameMemoTagRequest = {
  parent?: string
  oldTag?: string
  newTag?: string
}

export type DeleteMemoTagRequest = {
  parent?: string
  tag?: string
  deleteRelatedMemos?: boolean
}

export type SetMemoResourcesRequest = {
  name?: string
  resources?: MemosApiV1Resource_service.Resource[]
}

export type ListMemoResourcesRequest = {
  name?: string
}

export type ListMemoResourcesResponse = {
  resources?: MemosApiV1Resource_service.Resource[]
}

export type SetMemoRelationsRequest = {
  name?: string
  relations?: MemosApiV1Memo_relation_service.MemoRelation[]
}

export type ListMemoRelationsRequest = {
  name?: string
}

export type ListMemoRelationsResponse = {
  relations?: MemosApiV1Memo_relation_service.MemoRelation[]
}

export type CreateMemoCommentRequest = {
  name?: string
  comment?: CreateMemoRequest
}

export type ListMemoCommentsRequest = {
  name?: string
}

export type ListMemoCommentsResponse = {
  memos?: Memo[]
}

export type GetUserMemosStatsRequest = {
  name?: string
  timezone?: string
  filter?: string
}

export type GetUserMemosStatsResponse = {
  stats?: {[key: string]: number}
}

export type ListMemoReactionsRequest = {
  name?: string
}

export type ListMemoReactionsResponse = {
  reactions?: MemosApiV1Reaction_service.Reaction[]
}

export type UpsertMemoReactionRequest = {
  name?: string
  reaction?: MemosApiV1Reaction_service.Reaction
}

export type DeleteMemoReactionRequest = {
  reactionId?: number
}

export class MemoService {
  static CreateMemo(req: CreateMemoRequest, initReq?: fm.InitReq): Promise<Memo> {
    return fm.fetchReq<CreateMemoRequest, Memo>(`/api/v1/memos`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ListMemos(req: ListMemosRequest, initReq?: fm.InitReq): Promise<ListMemosResponse> {
    return fm.fetchReq<ListMemosRequest, ListMemosResponse>(`/api/v1/memos?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static SearchMemos(req: SearchMemosRequest, initReq?: fm.InitReq): Promise<SearchMemosResponse> {
    return fm.fetchReq<SearchMemosRequest, SearchMemosResponse>(`/api/v1/memos:search?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetMemo(req: GetMemoRequest, initReq?: fm.InitReq): Promise<Memo> {
    return fm.fetchReq<GetMemoRequest, Memo>(`/api/v1/${req["namememos"]}?${fm.renderURLSearchParams(req, ["namememos"])}`, {...initReq, method: "GET"})
  }
  static UpdateMemo(req: UpdateMemoRequest, initReq?: fm.InitReq): Promise<Memo> {
    return fm.fetchReq<UpdateMemoRequest, Memo>(`/api/v1/${req["memoNamememos"]}`, {...initReq, method: "PATCH", body: JSON.stringify(req["memo"], fm.replacer)})
  }
  static DeleteMemo(req: DeleteMemoRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<DeleteMemoRequest, GoogleProtobufEmpty.Empty>(`/api/v1/${req["namememos"]}`, {...initReq, method: "DELETE"})
  }
  static ExportMemos(req: ExportMemosRequest, initReq?: fm.InitReq): Promise<ExportMemosResponse> {
    return fm.fetchReq<ExportMemosRequest, ExportMemosResponse>(`/api/v1/memos:export`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ListMemoProperties(req: ListMemoPropertiesRequest, initReq?: fm.InitReq): Promise<ListMemoPropertiesResponse> {
    return fm.fetchReq<ListMemoPropertiesRequest, ListMemoPropertiesResponse>(`/api/v1/${req["namememos"]}/properties?${fm.renderURLSearchParams(req, ["namememos"])}`, {...initReq, method: "GET"})
  }
  static RebuildMemoProperty(req: RebuildMemoPropertyRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<RebuildMemoPropertyRequest, GoogleProtobufEmpty.Empty>(`/api/v1/${req["namememos"]}/properties:rebuild`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static ListMemoTags(req: ListMemoTagsRequest, initReq?: fm.InitReq): Promise<ListMemoTagsResponse> {
    return fm.fetchReq<ListMemoTagsRequest, ListMemoTagsResponse>(`/api/v1/${req["parentmemos"]}/tags?${fm.renderURLSearchParams(req, ["parentmemos"])}`, {...initReq, method: "GET"})
  }
  static RenameMemoTag(req: RenameMemoTagRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<RenameMemoTagRequest, GoogleProtobufEmpty.Empty>(`/api/v1/${req["parentmemos"]}/tags:rename`, {...initReq, method: "PATCH", body: JSON.stringify(req, fm.replacer)})
  }
  static DeleteMemoTag(req: DeleteMemoTagRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<DeleteMemoTagRequest, GoogleProtobufEmpty.Empty>(`/api/v1/${req["parentmemos"]}/tags/${req["tag"]}`, {...initReq, method: "DELETE"})
  }
  static SetMemoResources(req: SetMemoResourcesRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<SetMemoResourcesRequest, GoogleProtobufEmpty.Empty>(`/api/v1/${req["namememos"]}/resources`, {...initReq, method: "PATCH", body: JSON.stringify(req, fm.replacer)})
  }
  static ListMemoResources(req: ListMemoResourcesRequest, initReq?: fm.InitReq): Promise<ListMemoResourcesResponse> {
    return fm.fetchReq<ListMemoResourcesRequest, ListMemoResourcesResponse>(`/api/v1/${req["namememos"]}/resources?${fm.renderURLSearchParams(req, ["namememos"])}`, {...initReq, method: "GET"})
  }
  static SetMemoRelations(req: SetMemoRelationsRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<SetMemoRelationsRequest, GoogleProtobufEmpty.Empty>(`/api/v1/${req["namememos"]}/relations`, {...initReq, method: "PATCH", body: JSON.stringify(req, fm.replacer)})
  }
  static ListMemoRelations(req: ListMemoRelationsRequest, initReq?: fm.InitReq): Promise<ListMemoRelationsResponse> {
    return fm.fetchReq<ListMemoRelationsRequest, ListMemoRelationsResponse>(`/api/v1/${req["namememos"]}/relations?${fm.renderURLSearchParams(req, ["namememos"])}`, {...initReq, method: "GET"})
  }
  static CreateMemoComment(req: CreateMemoCommentRequest, initReq?: fm.InitReq): Promise<Memo> {
    return fm.fetchReq<CreateMemoCommentRequest, Memo>(`/api/v1/${req["namememos"]}/comments`, {...initReq, method: "POST", body: JSON.stringify(req["comment"], fm.replacer)})
  }
  static ListMemoComments(req: ListMemoCommentsRequest, initReq?: fm.InitReq): Promise<ListMemoCommentsResponse> {
    return fm.fetchReq<ListMemoCommentsRequest, ListMemoCommentsResponse>(`/api/v1/${req["namememos"]}/comments?${fm.renderURLSearchParams(req, ["namememos"])}`, {...initReq, method: "GET"})
  }
  static GetUserMemosStats(req: GetUserMemosStatsRequest, initReq?: fm.InitReq): Promise<GetUserMemosStatsResponse> {
    return fm.fetchReq<GetUserMemosStatsRequest, GetUserMemosStatsResponse>(`/api/v1/memos/stats?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static ListMemoReactions(req: ListMemoReactionsRequest, initReq?: fm.InitReq): Promise<ListMemoReactionsResponse> {
    return fm.fetchReq<ListMemoReactionsRequest, ListMemoReactionsResponse>(`/api/v1/${req["namememos"]}/reactions?${fm.renderURLSearchParams(req, ["namememos"])}`, {...initReq, method: "GET"})
  }
  static UpsertMemoReaction(req: UpsertMemoReactionRequest, initReq?: fm.InitReq): Promise<MemosApiV1Reaction_service.Reaction> {
    return fm.fetchReq<UpsertMemoReactionRequest, MemosApiV1Reaction_service.Reaction>(`/api/v1/${req["namememos"]}/reactions`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static DeleteMemoReaction(req: DeleteMemoReactionRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<DeleteMemoReactionRequest, GoogleProtobufEmpty.Empty>(`/api/v1/reactions/${req["reactionId"]}`, {...initReq, method: "DELETE"})
  }
}