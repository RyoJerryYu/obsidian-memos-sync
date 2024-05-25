// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v1.176.0
//   protoc               unknown
// source: api/v1/reaction_service.proto

/* eslint-disable */
import _m0 from "protobufjs/minimal";

export const protobufPackage = "memos.api.v1";

export interface Reaction {
  id: number;
  /**
   * The name of the creator.
   * Format: users/{id}
   */
  creator: string;
  contentId: string;
  reactionType: Reaction_Type;
}

export enum Reaction_Type {
  TYPE_UNSPECIFIED = "TYPE_UNSPECIFIED",
  THUMBS_UP = "THUMBS_UP",
  THUMBS_DOWN = "THUMBS_DOWN",
  HEART = "HEART",
  FIRE = "FIRE",
  CLAPPING_HANDS = "CLAPPING_HANDS",
  LAUGH = "LAUGH",
  OK_HAND = "OK_HAND",
  ROCKET = "ROCKET",
  EYES = "EYES",
  THINKING_FACE = "THINKING_FACE",
  CLOWN_FACE = "CLOWN_FACE",
  QUESTION_MARK = "QUESTION_MARK",
  UNRECOGNIZED = "UNRECOGNIZED",
}

export function reaction_TypeFromJSON(object: any): Reaction_Type {
  switch (object) {
    case 0:
    case "TYPE_UNSPECIFIED":
      return Reaction_Type.TYPE_UNSPECIFIED;
    case 1:
    case "THUMBS_UP":
      return Reaction_Type.THUMBS_UP;
    case 2:
    case "THUMBS_DOWN":
      return Reaction_Type.THUMBS_DOWN;
    case 3:
    case "HEART":
      return Reaction_Type.HEART;
    case 4:
    case "FIRE":
      return Reaction_Type.FIRE;
    case 5:
    case "CLAPPING_HANDS":
      return Reaction_Type.CLAPPING_HANDS;
    case 6:
    case "LAUGH":
      return Reaction_Type.LAUGH;
    case 7:
    case "OK_HAND":
      return Reaction_Type.OK_HAND;
    case 8:
    case "ROCKET":
      return Reaction_Type.ROCKET;
    case 9:
    case "EYES":
      return Reaction_Type.EYES;
    case 10:
    case "THINKING_FACE":
      return Reaction_Type.THINKING_FACE;
    case 11:
    case "CLOWN_FACE":
      return Reaction_Type.CLOWN_FACE;
    case 12:
    case "QUESTION_MARK":
      return Reaction_Type.QUESTION_MARK;
    case -1:
    case "UNRECOGNIZED":
    default:
      return Reaction_Type.UNRECOGNIZED;
  }
}

export function reaction_TypeToNumber(object: Reaction_Type): number {
  switch (object) {
    case Reaction_Type.TYPE_UNSPECIFIED:
      return 0;
    case Reaction_Type.THUMBS_UP:
      return 1;
    case Reaction_Type.THUMBS_DOWN:
      return 2;
    case Reaction_Type.HEART:
      return 3;
    case Reaction_Type.FIRE:
      return 4;
    case Reaction_Type.CLAPPING_HANDS:
      return 5;
    case Reaction_Type.LAUGH:
      return 6;
    case Reaction_Type.OK_HAND:
      return 7;
    case Reaction_Type.ROCKET:
      return 8;
    case Reaction_Type.EYES:
      return 9;
    case Reaction_Type.THINKING_FACE:
      return 10;
    case Reaction_Type.CLOWN_FACE:
      return 11;
    case Reaction_Type.QUESTION_MARK:
      return 12;
    case Reaction_Type.UNRECOGNIZED:
    default:
      return -1;
  }
}

function createBaseReaction(): Reaction {
  return { id: 0, creator: "", contentId: "", reactionType: Reaction_Type.TYPE_UNSPECIFIED };
}

export const Reaction = {
  encode(message: Reaction, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.id !== 0) {
      writer.uint32(8).int32(message.id);
    }
    if (message.creator !== "") {
      writer.uint32(18).string(message.creator);
    }
    if (message.contentId !== "") {
      writer.uint32(26).string(message.contentId);
    }
    if (message.reactionType !== Reaction_Type.TYPE_UNSPECIFIED) {
      writer.uint32(32).int32(reaction_TypeToNumber(message.reactionType));
    }
    return writer;
  },

  decode(input: _m0.Reader | Uint8Array, length?: number): Reaction {
    const reader = input instanceof _m0.Reader ? input : _m0.Reader.create(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseReaction();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.id = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.creator = reader.string();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.contentId = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.reactionType = reaction_TypeFromJSON(reader.int32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skipType(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<Reaction>): Reaction {
    return Reaction.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<Reaction>): Reaction {
    const message = createBaseReaction();
    message.id = object.id ?? 0;
    message.creator = object.creator ?? "";
    message.contentId = object.contentId ?? "";
    message.reactionType = object.reactionType ?? Reaction_Type.TYPE_UNSPECIFIED;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;
