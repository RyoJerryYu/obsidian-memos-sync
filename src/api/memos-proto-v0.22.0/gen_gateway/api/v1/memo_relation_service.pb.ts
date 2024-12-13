/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum MemoRelationType {
  TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
  REFERENCE = "REFERENCE",
  COMMENT = "COMMENT",
}

export type MemoRelation = {
  memo?: string
  relatedMemo?: string
  type?: MemoRelationType
}