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
export type Webhook = {
  id?: number
  creatorId?: number
  createdTime?: GoogleProtobufTimestamp.Timestamp
  updatedTime?: GoogleProtobufTimestamp.Timestamp
  rowStatus?: MemosApiV1Common.RowStatus
  name?: string
  url?: string
}

export type CreateWebhookRequest = {
  name?: string
  url?: string
}

export type GetWebhookRequest = {
  id?: number
}

export type ListWebhooksRequest = {
  creatorId?: number
}

export type ListWebhooksResponse = {
  webhooks?: Webhook[]
}

export type UpdateWebhookRequest = {
  webhook?: Webhook
  updateMask?: GoogleProtobufField_mask.FieldMask
}

export type DeleteWebhookRequest = {
  id?: number
}

export class WebhookService {
  static CreateWebhook(req: CreateWebhookRequest, initReq?: fm.InitReq): Promise<Webhook> {
    return fm.fetchReq<CreateWebhookRequest, Webhook>(`/api/v1/webhooks`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static GetWebhook(req: GetWebhookRequest, initReq?: fm.InitReq): Promise<Webhook> {
    return fm.fetchReq<GetWebhookRequest, Webhook>(`/api/v1/webhooks/${req["id"]}?${fm.renderURLSearchParams(req, ["id"])}`, {...initReq, method: "GET"})
  }
  static ListWebhooks(req: ListWebhooksRequest, initReq?: fm.InitReq): Promise<ListWebhooksResponse> {
    return fm.fetchReq<ListWebhooksRequest, ListWebhooksResponse>(`/api/v1/webhooks?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static UpdateWebhook(req: UpdateWebhookRequest, initReq?: fm.InitReq): Promise<Webhook> {
    return fm.fetchReq<UpdateWebhookRequest, Webhook>(`/api/v1/webhooks/${req["webhookId"]}`, {...initReq, method: "PATCH", body: JSON.stringify(req["webhook"], fm.replacer)})
  }
  static DeleteWebhook(req: DeleteWebhookRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<DeleteWebhookRequest, GoogleProtobufEmpty.Empty>(`/api/v1/webhooks/${req["id"]}`, {...initReq, method: "DELETE"})
  }
}