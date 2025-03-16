// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.6.1
//   protoc               unknown
// source: api/v1/workspace_service.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "memos.api.v1";

export interface WorkspaceProfile {
  /**
   * The name of instance owner.
   * Format: "users/{id}"
   */
  owner: string;
  /** version is the current version of instance */
  version: string;
  /** mode is the instance mode (e.g. "prod", "dev" or "demo"). */
  mode: string;
}

export interface GetWorkspaceProfileRequest {
}

function createBaseWorkspaceProfile(): WorkspaceProfile {
  return { owner: "", version: "", mode: "" };
}

export const WorkspaceProfile: MessageFns<WorkspaceProfile> = {
  encode(message: WorkspaceProfile, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.owner !== "") {
      writer.uint32(10).string(message.owner);
    }
    if (message.version !== "") {
      writer.uint32(18).string(message.version);
    }
    if (message.mode !== "") {
      writer.uint32(26).string(message.mode);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): WorkspaceProfile {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseWorkspaceProfile();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1: {
          if (tag !== 10) {
            break;
          }

          message.owner = reader.string();
          continue;
        }
        case 2: {
          if (tag !== 18) {
            break;
          }

          message.version = reader.string();
          continue;
        }
        case 3: {
          if (tag !== 26) {
            break;
          }

          message.mode = reader.string();
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

  create(base?: DeepPartial<WorkspaceProfile>): WorkspaceProfile {
    return WorkspaceProfile.fromPartial(base ?? {});
  },
  fromPartial(object: DeepPartial<WorkspaceProfile>): WorkspaceProfile {
    const message = createBaseWorkspaceProfile();
    message.owner = object.owner ?? "";
    message.version = object.version ?? "";
    message.mode = object.mode ?? "";
    return message;
  },
};

function createBaseGetWorkspaceProfileRequest(): GetWorkspaceProfileRequest {
  return {};
}

export const GetWorkspaceProfileRequest: MessageFns<GetWorkspaceProfileRequest> = {
  encode(_: GetWorkspaceProfileRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): GetWorkspaceProfileRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseGetWorkspaceProfileRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  create(base?: DeepPartial<GetWorkspaceProfileRequest>): GetWorkspaceProfileRequest {
    return GetWorkspaceProfileRequest.fromPartial(base ?? {});
  },
  fromPartial(_: DeepPartial<GetWorkspaceProfileRequest>): GetWorkspaceProfileRequest {
    const message = createBaseGetWorkspaceProfileRequest();
    return message;
  },
};

export type WorkspaceServiceDefinition = typeof WorkspaceServiceDefinition;
export const WorkspaceServiceDefinition = {
  name: "WorkspaceService",
  fullName: "memos.api.v1.WorkspaceService",
  methods: {
    /** GetWorkspaceProfile returns the workspace profile. */
    getWorkspaceProfile: {
      name: "GetWorkspaceProfile",
      requestType: GetWorkspaceProfileRequest,
      requestStream: false,
      responseType: WorkspaceProfile,
      responseStream: false,
      options: {
        _unknownFields: {
          578365826: [
            new Uint8Array([
              27,
              18,
              25,
              47,
              97,
              112,
              105,
              47,
              118,
              49,
              47,
              119,
              111,
              114,
              107,
              115,
              112,
              97,
              99,
              101,
              47,
              112,
              114,
              111,
              102,
              105,
              108,
              101,
            ]),
          ],
        },
      },
    },
  },
} as const;

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
