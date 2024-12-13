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
import * as MemosApiV1Common from "./common.pb"

export enum UserRole {
  ROLE_UNSPECIFIED = "ROLE_UNSPECIFIED",
  HOST = "HOST",
  ADMIN = "ADMIN",
  USER = "USER",
}

export type User = {
  name?: string
  id?: number
  role?: UserRole
  username?: string
  email?: string
  nickname?: string
  avatarUrl?: string
  description?: string
  password?: string
  rowStatus?: MemosApiV1Common.RowStatus
  createTime?: GoogleProtobufTimestamp.Timestamp
  updateTime?: GoogleProtobufTimestamp.Timestamp
}

export type ListUsersRequest = {
}

export type ListUsersResponse = {
  users?: User[]
}

export type SearchUsersRequest = {
  filter?: string
}

export type SearchUsersResponse = {
  users?: User[]
}

export type GetUserRequest = {
  name?: string
}

export type GetUserAvatarBinaryRequest = {
  name?: string
  httpBody?: GoogleApiHttpbody.HttpBody
}

export type CreateUserRequest = {
  user?: User
}

export type UpdateUserRequest = {
  user?: User
  updateMask?: GoogleProtobufField_mask.FieldMask
}

export type DeleteUserRequest = {
  name?: string
}

export type UserSetting = {
  name?: string
  locale?: string
  appearance?: string
  memoVisibility?: string
}

export type GetUserSettingRequest = {
  name?: string
}

export type UpdateUserSettingRequest = {
  setting?: UserSetting
  updateMask?: GoogleProtobufField_mask.FieldMask
}

export type UserAccessToken = {
  accessToken?: string
  description?: string
  issuedAt?: GoogleProtobufTimestamp.Timestamp
  expiresAt?: GoogleProtobufTimestamp.Timestamp
}

export type ListUserAccessTokensRequest = {
  name?: string
}

export type ListUserAccessTokensResponse = {
  accessTokens?: UserAccessToken[]
}

export type CreateUserAccessTokenRequest = {
  name?: string
  description?: string
}

export type DeleteUserAccessTokenRequest = {
  name?: string
  accessToken?: string
}

export class UserService {
  static ListUsers(req: ListUsersRequest, initReq?: fm.InitReq): Promise<ListUsersResponse> {
    return fm.fetchReq<ListUsersRequest, ListUsersResponse>(`/api/v1/users?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static SearchUsers(req: SearchUsersRequest, initReq?: fm.InitReq): Promise<SearchUsersResponse> {
    return fm.fetchReq<SearchUsersRequest, SearchUsersResponse>(`/api/v1/users:search?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetUser(req: GetUserRequest, initReq?: fm.InitReq): Promise<User> {
    return fm.fetchReq<GetUserRequest, User>(`/api/v1/${req["nameusers"]}?${fm.renderURLSearchParams(req, ["nameusers"])}`, {...initReq, method: "GET"})
  }
  static GetUserAvatarBinary(req: GetUserAvatarBinaryRequest, initReq?: fm.InitReq): Promise<GoogleApiHttpbody.HttpBody> {
    return fm.fetchReq<GetUserAvatarBinaryRequest, GoogleApiHttpbody.HttpBody>(`/file/${req["nameusers"]}/avatar?${fm.renderURLSearchParams(req, ["nameusers"])}`, {...initReq, method: "GET"})
  }
  static CreateUser(req: CreateUserRequest, initReq?: fm.InitReq): Promise<User> {
    return fm.fetchReq<CreateUserRequest, User>(`/api/v1/users`, {...initReq, method: "POST", body: JSON.stringify(req["user"], fm.replacer)})
  }
  static UpdateUser(req: UpdateUserRequest, initReq?: fm.InitReq): Promise<User> {
    return fm.fetchReq<UpdateUserRequest, User>(`/api/v1/${req["userNameusers"]}`, {...initReq, method: "PATCH", body: JSON.stringify(req["user"], fm.replacer)})
  }
  static DeleteUser(req: DeleteUserRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<DeleteUserRequest, GoogleProtobufEmpty.Empty>(`/api/v1/${req["nameusers"]}`, {...initReq, method: "DELETE"})
  }
  static GetUserSetting(req: GetUserSettingRequest, initReq?: fm.InitReq): Promise<UserSetting> {
    return fm.fetchReq<GetUserSettingRequest, UserSetting>(`/api/v1/${req["nameusers"]}/setting?${fm.renderURLSearchParams(req, ["nameusers"])}`, {...initReq, method: "GET"})
  }
  static UpdateUserSetting(req: UpdateUserSettingRequest, initReq?: fm.InitReq): Promise<UserSetting> {
    return fm.fetchReq<UpdateUserSettingRequest, UserSetting>(`/api/v1/${req["settingNameuserssetting"]}`, {...initReq, method: "PATCH", body: JSON.stringify(req["setting"], fm.replacer)})
  }
  static ListUserAccessTokens(req: ListUserAccessTokensRequest, initReq?: fm.InitReq): Promise<ListUserAccessTokensResponse> {
    return fm.fetchReq<ListUserAccessTokensRequest, ListUserAccessTokensResponse>(`/api/v1/${req["nameusers"]}/access_tokens?${fm.renderURLSearchParams(req, ["nameusers"])}`, {...initReq, method: "GET"})
  }
  static CreateUserAccessToken(req: CreateUserAccessTokenRequest, initReq?: fm.InitReq): Promise<UserAccessToken> {
    return fm.fetchReq<CreateUserAccessTokenRequest, UserAccessToken>(`/api/v1/${req["nameusers"]}/access_tokens`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static DeleteUserAccessToken(req: DeleteUserAccessTokenRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<DeleteUserAccessTokenRequest, GoogleProtobufEmpty.Empty>(`/api/v1/${req["nameusers"]}/access_tokens/${req["accessToken"]}`, {...initReq, method: "DELETE"})
  }
}