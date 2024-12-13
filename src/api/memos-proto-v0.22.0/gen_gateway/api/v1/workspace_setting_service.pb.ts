/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../fetch.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum WorkspaceStorageSettingStorageType {
  STORAGE_TYPE_UNSPECIFIED = "STORAGE_TYPE_UNSPECIFIED",
  DATABASE = "DATABASE",
  LOCAL = "LOCAL",
  S3 = "S3",
}


type BaseWorkspaceSetting = {
  name?: string
}

export type WorkspaceSetting = BaseWorkspaceSetting
  & OneOf<{ generalSetting: WorkspaceGeneralSetting; storageSetting: WorkspaceStorageSetting; memoRelatedSetting: WorkspaceMemoRelatedSetting }>

export type WorkspaceGeneralSetting = {
  instanceUrl?: string
  disallowSignup?: boolean
  disallowPasswordLogin?: boolean
  additionalScript?: string
  additionalStyle?: string
  customProfile?: WorkspaceCustomProfile
}

export type WorkspaceCustomProfile = {
  title?: string
  description?: string
  logoUrl?: string
  locale?: string
  appearance?: string
}

export type WorkspaceStorageSettingS3Config = {
  accessKeyId?: string
  accessKeySecret?: string
  endpoint?: string
  region?: string
  bucket?: string
}

export type WorkspaceStorageSetting = {
  storageType?: WorkspaceStorageSettingStorageType
  filepathTemplate?: string
  uploadSizeLimitMb?: string
  s3Config?: WorkspaceStorageSettingS3Config
}

export type WorkspaceMemoRelatedSetting = {
  disallowPublicVisible?: boolean
  displayWithUpdateTime?: boolean
  contentLengthLimit?: number
}

export type GetWorkspaceSettingRequest = {
  name?: string
}

export type SetWorkspaceSettingRequest = {
  setting?: WorkspaceSetting
}

export class WorkspaceSettingService {
  static GetWorkspaceSetting(req: GetWorkspaceSettingRequest, initReq?: fm.InitReq): Promise<WorkspaceSetting> {
    return fm.fetchReq<GetWorkspaceSettingRequest, WorkspaceSetting>(`/api/v1/workspace/${req["namesettings"]}?${fm.renderURLSearchParams(req, ["namesettings"])}`, {...initReq, method: "GET"})
  }
  static SetWorkspaceSetting(req: SetWorkspaceSettingRequest, initReq?: fm.InitReq): Promise<WorkspaceSetting> {
    return fm.fetchReq<SetWorkspaceSettingRequest, WorkspaceSetting>(`/api/v1/workspace/${req["settingNamesettings"]}`, {...initReq, method: "PATCH", body: JSON.stringify(req["setting"], fm.replacer)})
  }
}