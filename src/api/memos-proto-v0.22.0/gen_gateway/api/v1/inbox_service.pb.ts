/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../fetch.pb"
import * as GoogleProtobufEmpty from "../../google/protobuf/empty.pb"
import * as GoogleProtobufField_mask from "../../google/protobuf/field_mask.pb"
import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb"

export enum InboxStatus {
  STATUS_UNSPECIFIED = "STATUS_UNSPECIFIED",
  UNREAD = "UNREAD",
  ARCHIVED = "ARCHIVED",
}

export enum InboxType {
  TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
  MEMO_COMMENT = "MEMO_COMMENT",
  VERSION_UPDATE = "VERSION_UPDATE",
}

export type Inbox = {
  name?: string
  sender?: string
  receiver?: string
  status?: InboxStatus
  createTime?: GoogleProtobufTimestamp.Timestamp
  type?: InboxType
}

export type ListInboxesRequest = {
  user?: string
}

export type ListInboxesResponse = {
  inboxes?: Inbox[]
}

export type UpdateInboxRequest = {
  inbox?: Inbox
  updateMask?: GoogleProtobufField_mask.FieldMask
}

export type DeleteInboxRequest = {
  name?: string
}

export class InboxService {
  static ListInboxes(req: ListInboxesRequest, initReq?: fm.InitReq): Promise<ListInboxesResponse> {
    return fm.fetchReq<ListInboxesRequest, ListInboxesResponse>(`/api/v1/inboxes?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static UpdateInbox(req: UpdateInboxRequest, initReq?: fm.InitReq): Promise<Inbox> {
    return fm.fetchReq<UpdateInboxRequest, Inbox>(`/api/v1/${req["inboxNameinboxes"]}`, {...initReq, method: "PATCH", body: JSON.stringify(req["inbox"], fm.replacer)})
  }
  static DeleteInbox(req: DeleteInboxRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<DeleteInboxRequest, GoogleProtobufEmpty.Empty>(`/api/v1/${req["nameinboxes"]}`, {...initReq, method: "DELETE"})
  }
}