/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../fetch.pb"
import * as GoogleProtobufEmpty from "../../google/protobuf/empty.pb"
import * as GoogleProtobufField_mask from "../../google/protobuf/field_mask.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum IdentityProviderType {
  TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
  OAUTH2 = "OAUTH2",
}

export type IdentityProvider = {
  name?: string
  type?: IdentityProviderType
  title?: string
  identifierFilter?: string
  config?: IdentityProviderConfig
}


type BaseIdentityProviderConfig = {
}

export type IdentityProviderConfig = BaseIdentityProviderConfig
  & OneOf<{ oauth2Config: OAuth2Config }>

export type FieldMapping = {
  identifier?: string
  displayName?: string
  email?: string
}

export type OAuth2Config = {
  clientId?: string
  clientSecret?: string
  authUrl?: string
  tokenUrl?: string
  userInfoUrl?: string
  scopes?: string[]
  fieldMapping?: FieldMapping
}

export type ListIdentityProvidersRequest = {
}

export type ListIdentityProvidersResponse = {
  identityProviders?: IdentityProvider[]
}

export type GetIdentityProviderRequest = {
  name?: string
}

export type CreateIdentityProviderRequest = {
  identityProvider?: IdentityProvider
}

export type UpdateIdentityProviderRequest = {
  identityProvider?: IdentityProvider
  updateMask?: GoogleProtobufField_mask.FieldMask
}

export type DeleteIdentityProviderRequest = {
  name?: string
}

export class IdentityProviderService {
  static ListIdentityProviders(req: ListIdentityProvidersRequest, initReq?: fm.InitReq): Promise<ListIdentityProvidersResponse> {
    return fm.fetchReq<ListIdentityProvidersRequest, ListIdentityProvidersResponse>(`/api/v1/identityProviders?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
  static GetIdentityProvider(req: GetIdentityProviderRequest, initReq?: fm.InitReq): Promise<IdentityProvider> {
    return fm.fetchReq<GetIdentityProviderRequest, IdentityProvider>(`/api/v1/${req["nameidentityProviders"]}?${fm.renderURLSearchParams(req, ["nameidentityProviders"])}`, {...initReq, method: "GET"})
  }
  static CreateIdentityProvider(req: CreateIdentityProviderRequest, initReq?: fm.InitReq): Promise<IdentityProvider> {
    return fm.fetchReq<CreateIdentityProviderRequest, IdentityProvider>(`/api/v1/identityProviders`, {...initReq, method: "POST", body: JSON.stringify(req["identity_provider"], fm.replacer)})
  }
  static UpdateIdentityProvider(req: UpdateIdentityProviderRequest, initReq?: fm.InitReq): Promise<IdentityProvider> {
    return fm.fetchReq<UpdateIdentityProviderRequest, IdentityProvider>(`/api/v1/${req["identityProviderNameidentityProviders"]}`, {...initReq, method: "PATCH", body: JSON.stringify(req["identity_provider"], fm.replacer)})
  }
  static DeleteIdentityProvider(req: DeleteIdentityProviderRequest, initReq?: fm.InitReq): Promise<GoogleProtobufEmpty.Empty> {
    return fm.fetchReq<DeleteIdentityProviderRequest, GoogleProtobufEmpty.Empty>(`/api/v1/${req["nameidentityProviders"]}`, {...initReq, method: "DELETE"})
  }
}