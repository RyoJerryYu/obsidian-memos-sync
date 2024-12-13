// @generated by protoc-gen-es v2.2.3 with parameter "target=ts,json_types=true"
// @generated from file api/v1/common.proto (package memos.api.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file api/v1/common.proto.
 */
export const file_api_v1_common: GenFile = /*@__PURE__*/
  fileDesc("ChNhcGkvdjEvY29tbW9uLnByb3RvEgxtZW1vcy5hcGkudjEiKgoJUGFnZVRva2VuEg0KBWxpbWl0GAEgASgFEg4KBm9mZnNldBgCIAEoBSpBCglSb3dTdGF0dXMSGgoWUk9XX1NUQVRVU19VTlNQRUNJRklFRBAAEgoKBkFDVElWRRABEgwKCEFSQ0hJVkVEEAJCfQoQY29tLm1lbW9zLmFwaS52MUILQ29tbW9uUHJvdG9QAVoKZ2VuL2FwaS92MaICA01BWKoCDE1lbW9zLkFwaS5WMcoCDE1lbW9zXEFwaVxWMeICGE1lbW9zXEFwaVxWMVxHUEJNZXRhZGF0YeoCDk1lbW9zOjpBcGk6OlYxYgZwcm90bzM");

/**
 * Used internally for obfuscating the page token.
 *
 * @generated from message memos.api.v1.PageToken
 */
export type PageToken = Message<"memos.api.v1.PageToken"> & {
  /**
   * @generated from field: int32 limit = 1;
   */
  limit: number;

  /**
   * @generated from field: int32 offset = 2;
   */
  offset: number;
};

/**
 * Used internally for obfuscating the page token.
 *
 * @generated from message memos.api.v1.PageToken
 */
export type PageTokenJson = {
  /**
   * @generated from field: int32 limit = 1;
   */
  limit?: number;

  /**
   * @generated from field: int32 offset = 2;
   */
  offset?: number;
};

/**
 * Describes the message memos.api.v1.PageToken.
 * Use `create(PageTokenSchema)` to create a new message.
 */
export const PageTokenSchema: GenMessage<PageToken, PageTokenJson> = /*@__PURE__*/
  messageDesc(file_api_v1_common, 0);

/**
 * @generated from enum memos.api.v1.RowStatus
 */
export enum RowStatus {
  /**
   * @generated from enum value: ROW_STATUS_UNSPECIFIED = 0;
   */
  ROW_STATUS_UNSPECIFIED = 0,

  /**
   * @generated from enum value: ACTIVE = 1;
   */
  ACTIVE = 1,

  /**
   * @generated from enum value: ARCHIVED = 2;
   */
  ARCHIVED = 2,
}

/**
 * @generated from enum memos.api.v1.RowStatus
 */
export type RowStatusJson = "ROW_STATUS_UNSPECIFIED" | "ACTIVE" | "ARCHIVED";

/**
 * Describes the enum memos.api.v1.RowStatus.
 */
export const RowStatusSchema: GenEnum<RowStatus, RowStatusJson> = /*@__PURE__*/
  enumDesc(file_api_v1_common, 0);
