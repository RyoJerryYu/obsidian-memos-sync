// @generated by protoc-gen-es v2.2.3 with parameter "target=ts,json_types=true"
// @generated from file api/v1/memo_relation_service.proto (package memos.api.v1, syntax proto3)
/* eslint-disable */

import type { GenEnum, GenFile, GenMessage } from "@bufbuild/protobuf/codegenv1";
import { enumDesc, fileDesc, messageDesc } from "@bufbuild/protobuf/codegenv1";
import type { Message } from "@bufbuild/protobuf";

/**
 * Describes the file api/v1/memo_relation_service.proto.
 */
export const file_api_v1_memo_relation_service: GenFile = /*@__PURE__*/
  fileDesc("CiJhcGkvdjEvbWVtb19yZWxhdGlvbl9zZXJ2aWNlLnByb3RvEgxtZW1vcy5hcGkudjEimwEKDE1lbW9SZWxhdGlvbhIMCgRtZW1vGAEgASgJEhQKDHJlbGF0ZWRfbWVtbxgCIAEoCRItCgR0eXBlGAMgASgOMh8ubWVtb3MuYXBpLnYxLk1lbW9SZWxhdGlvbi5UeXBlIjgKBFR5cGUSFAoQVFlQRV9VTlNQRUNJRklFRBAAEg0KCVJFRkVSRU5DRRABEgsKB0NPTU1FTlQQAkKKAQoQY29tLm1lbW9zLmFwaS52MUIYTWVtb1JlbGF0aW9uU2VydmljZVByb3RvUAFaCmdlbi9hcGkvdjGiAgNNQViqAgxNZW1vcy5BcGkuVjHKAgxNZW1vc1xBcGlcVjHiAhhNZW1vc1xBcGlcVjFcR1BCTWV0YWRhdGHqAg5NZW1vczo6QXBpOjpWMWIGcHJvdG8z");

/**
 * @generated from message memos.api.v1.MemoRelation
 */
export type MemoRelation = Message<"memos.api.v1.MemoRelation"> & {
  /**
   * The name of memo.
   * Format: "memos/{uid}"
   *
   * @generated from field: string memo = 1;
   */
  memo: string;

  /**
   * The name of related memo.
   * Format: "memos/{uid}"
   *
   * @generated from field: string related_memo = 2;
   */
  relatedMemo: string;

  /**
   * @generated from field: memos.api.v1.MemoRelation.Type type = 3;
   */
  type: MemoRelation_Type;
};

/**
 * @generated from message memos.api.v1.MemoRelation
 */
export type MemoRelationJson = {
  /**
   * The name of memo.
   * Format: "memos/{uid}"
   *
   * @generated from field: string memo = 1;
   */
  memo?: string;

  /**
   * The name of related memo.
   * Format: "memos/{uid}"
   *
   * @generated from field: string related_memo = 2;
   */
  relatedMemo?: string;

  /**
   * @generated from field: memos.api.v1.MemoRelation.Type type = 3;
   */
  type?: MemoRelation_TypeJson;
};

/**
 * Describes the message memos.api.v1.MemoRelation.
 * Use `create(MemoRelationSchema)` to create a new message.
 */
export const MemoRelationSchema: GenMessage<MemoRelation, MemoRelationJson> = /*@__PURE__*/
  messageDesc(file_api_v1_memo_relation_service, 0);

/**
 * @generated from enum memos.api.v1.MemoRelation.Type
 */
export enum MemoRelation_Type {
  /**
   * @generated from enum value: TYPE_UNSPECIFIED = 0;
   */
  TYPE_UNSPECIFIED = 0,

  /**
   * @generated from enum value: REFERENCE = 1;
   */
  REFERENCE = 1,

  /**
   * @generated from enum value: COMMENT = 2;
   */
  COMMENT = 2,
}

/**
 * @generated from enum memos.api.v1.MemoRelation.Type
 */
export type MemoRelation_TypeJson = "TYPE_UNSPECIFIED" | "REFERENCE" | "COMMENT";

/**
 * Describes the enum memos.api.v1.MemoRelation.Type.
 */
export const MemoRelation_TypeSchema: GenEnum<MemoRelation_Type, MemoRelation_TypeJson> = /*@__PURE__*/
  enumDesc(file_api_v1_memo_relation_service, 0, 0);

