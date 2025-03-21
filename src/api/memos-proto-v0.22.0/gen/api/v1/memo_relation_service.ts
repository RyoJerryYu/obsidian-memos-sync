// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               unknown
// source: api/v1/memo_relation_service.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "memos.api.v1";

export interface MemoRelation {
  /**
   * The name of memo.
   * Format: "memos/{uid}"
   */
  memo: string;
  /**
   * The name of related memo.
   * Format: "memos/{uid}"
   */
  relatedMemo: string;
  type: MemoRelation_Type;
}

export enum MemoRelation_Type {
  TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
  REFERENCE = "REFERENCE",
  COMMENT = "COMMENT",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function memoRelation_TypeFromJSON(object: any): MemoRelation_Type {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return MemoRelation_Type.TYPE_UNSPECIFIED;
    case 1:
    case "REFERENCE":
      return MemoRelation_Type.REFERENCE;
    case 2:
    case "COMMENT":
      return MemoRelation_Type.COMMENT;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MemoRelation_Type.UNRECOGNIZED;
  }
}

export function memoRelation_TypeToNumber(object: MemoRelation_Type): number {
  switch (object) {
    case MemoRelation_Type.TYPE_UNSPECIFIED:
      return 0;
    case MemoRelation_Type.REFERENCE:
      return 1;
    case MemoRelation_Type.COMMENT:
      return 2;
    case MemoRelation_Type.UNRECOGNIZED:
    default:
      return -1;
  }
}

function createBaseMemoRelation(): MemoRelation {
  return { memo: "", relatedMemo: "", type: MemoRelation_Type.TYPE_UNSPECIFIED };
}

export const MemoRelation: MessageFns<MemoRelation> = {
  encode(message: MemoRelation, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.memo !== "") {
      writer.uint32(10).string(message.memo);
    }
    if (message.relatedMemo !== "") {
      writer.uint32(18).string(message.relatedMemo);
    }
    if (message.type !== MemoRelation_Type.TYPE_UNSPECIFIED) {
      writer.uint32(24).int32(memoRelation_TypeToNumber(message.type));
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MemoRelation {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMemoRelation();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.memo = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.relatedMemo = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 24) {
            break;
          }

          message.type = memoRelation_TypeFromJSON(reader.int32());
          continue;
        }
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<MemoRelation>): MemoRelation {
    return MemoRelation.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<MemoRelation>): MemoRelation {
    const message = createBaseMemoRelation();
    message.memo = object.memo ?? "";
    message.relatedMemo = object.relatedMemo ?? "";
    message.type = object.type ?? MemoRelation_Type.TYPE_UNSPECIFIED;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  create(base?: DeepPartial<T>): T;
  fromPartial(object: DeepPartial<T>): T;
}
