/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../fetch.pb"
import * as GoogleProtobufEmpty from "../../google/protobuf/empty.pb"
import * as MemosApiV1User_service from "./user_service.pb"
export type GetAuthStatusRequest = {
}

export type GetAuthStatusResponse = {
  user?: MemosApiV1User_service.User
}

export type SignInRequest = {
  username?: string
  password?: string
  neverExpire?: boolean
}

export type SignInWithSSORequest = {
  idpId?: number
  code?: string
  redirectUri?: string
}

export type SignUpRequest = {
  username?: string
  password?: string
}

export type SignOutRequest = {
}

export class AuthService {
  static GetAuthStatus(req: GetAuthStatusRequest, initReq?: fm.InitReq): Promise<MemosApiV1User_service.User> {
    return fm.fetchReq<GetAuthStatusRequest, MemosApiV1User_service.User>(`/api/v1/auth/status`, {...initReq, method: "POST"})
  }
  static SignIn(req: SignInRequest, initReq?: fm.InitReq): Promise<MemosApiV1User_service.User> {
    return fm.fetchReq<SignInRequest, MemosApiV1User_service.User>(`/api/v1/auth/signin`, {...initReq, method: "POST"})
  }
  static SignInWithSSO(req: SignInWithSSORequest, initReq?: fm.InitReq): Promise<MemosApiV1User_service.User> {
    return fm.fetchReq<SignInWithSSORequest, MemosApiV1User_service.User>(`/api/v1/auth/signin/sso`, {...initReq, method: "POST"})
  }
  static SignUp(req: SignUpRequest, initReq?: fm.InitReq): Promise<MemosApiV1User_service.User> {
    return fm.fetchReq<SignUpRequest, MemosApiV1User_service.User>(`/api/v1/auth/signup`, {...initReq, method: "POST"})
  }
  static SignOut(req: SignOutRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<SignOutRequest, GoogleProtobufEmpty.Empty>(`/api/v1/auth/signout`, {...initReq, method: "POST"})
  }
}