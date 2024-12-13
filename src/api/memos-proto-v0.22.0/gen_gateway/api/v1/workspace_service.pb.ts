/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../fetch.pb"
export type WorkspaceProfile = {
  owner?: string
  version?: string
  mode?: string
}

export type GetWorkspaceProfileRequest = {
}

export class WorkspaceService {
  static GetWorkspaceProfile(req: GetWorkspaceProfileRequest, initReq?: fm.InitReq): Promise<WorkspaceProfile> {
    return fm.fetchReq<GetWorkspaceProfileRequest, WorkspaceProfile>(`/api/v1/workspace/profile?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}