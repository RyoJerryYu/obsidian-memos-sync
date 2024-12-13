/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../fetch.pb"
import * as GoogleProtobufTimestamp from "../../google/protobuf/timestamp.pb"
export type Activity = {
  id?: number
  creatorId?: number
  type?: string
  level?: string
  createTime?: GoogleProtobufTimestamp.Timestamp
  payload?: ActivityPayload
}

export type ActivityMemoCommentPayload = {
  memoId?: number
  relatedMemoId?: number
}

export type ActivityVersionUpdatePayload = {
  version?: string
}

export type ActivityPayload = {
  memoComment?: ActivityMemoCommentPayload
  versionUpdate?: ActivityVersionUpdatePayload
}

export type GetActivityRequest = {
  id?: number
}

export class ActivityService {
  static GetActivity(req: GetActivityRequest, initReq?: fm.InitReq): Promise<Activity> {
    return fm.fetchReq<GetActivityRequest, Activity>(`/api/v1/activities/${req["id"]}?${fm.renderURLSearchParams(req, ["id"])}`, {...initReq, method: "GET"})
  }
}