/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum Edition {
  EDITION_UNKNOWN = "EDITION_UNKNOWN",
  EDITION_LEGACY = "EDITION_LEGACY",
  EDITION_PROTO2 = "EDITION_PROTO2",
  EDITION_PROTO3 = "EDITION_PROTO3",
  EDITION_2023 = "EDITION_2023",
  EDITION_2024 = "EDITION_2024",
  EDITION_1_TEST_ONLY = "EDITION_1_TEST_ONLY",
  EDITION_2_TEST_ONLY = "EDITION_2_TEST_ONLY",
  EDITION_99997_TEST_ONLY = "EDITION_99997_TEST_ONLY",
  EDITION_99998_TEST_ONLY = "EDITION_99998_TEST_ONLY",
  EDITION_99999_TEST_ONLY = "EDITION_99999_TEST_ONLY",
  EDITION_MAX = "EDITION_MAX",
}

export enum ExtensionRangeOptionsVerificationState {
  DECLARATION = "DECLARATION",
  UNVERIFIED = "UNVERIFIED",
}

export enum FieldDescriptorProtoType {
  TYPE_DOUBLE = "TYPE_DOUBLE",
  TYPE_FLOAT = "TYPE_FLOAT",
  TYPE_INT64 = "TYPE_INT64",
  TYPE_UINT64 = "TYPE_UINT64",
  TYPE_INT32 = "TYPE_INT32",
  TYPE_FIXED64 = "TYPE_FIXED64",
  TYPE_FIXED32 = "TYPE_FIXED32",
  TYPE_BOOL = "TYPE_BOOL",
  TYPE_STRING = "TYPE_STRING",
  TYPE_GROUP = "TYPE_GROUP",
  TYPE_MESSAGE = "TYPE_MESSAGE",
  TYPE_BYTES = "TYPE_BYTES",
  TYPE_UINT32 = "TYPE_UINT32",
  TYPE_ENUM = "TYPE_ENUM",
  TYPE_SFIXED32 = "TYPE_SFIXED32",
  TYPE_SFIXED64 = "TYPE_SFIXED64",
  TYPE_SINT32 = "TYPE_SINT32",
  TYPE_SINT64 = "TYPE_SINT64",
}

export enum FieldDescriptorProtoLabel {
  LABEL_OPTIONAL = "LABEL_OPTIONAL",
  LABEL_REPEATED = "LABEL_REPEATED",
  LABEL_REQUIRED = "LABEL_REQUIRED",
}

export enum FileOptionsOptimizeMode {
  SPEED = "SPEED",
  CODE_SIZE = "CODE_SIZE",
  LITE_RUNTIME = "LITE_RUNTIME",
}

export enum FieldOptionsCType {
  STRING = "STRING",
  CORD = "CORD",
  STRING_PIECE = "STRING_PIECE",
}

export enum FieldOptionsJSType {
  JS_NORMAL = "JS_NORMAL",
  JS_STRING = "JS_STRING",
  JS_NUMBER = "JS_NUMBER",
}

export enum FieldOptionsOptionRetention {
  RETENTION_UNKNOWN = "RETENTION_UNKNOWN",
  RETENTION_RUNTIME = "RETENTION_RUNTIME",
  RETENTION_SOURCE = "RETENTION_SOURCE",
}

export enum FieldOptionsOptionTargetType {
  TARGET_TYPE_UNKNOWN = "TARGET_TYPE_UNKNOWN",
  TARGET_TYPE_FILE = "TARGET_TYPE_FILE",
  TARGET_TYPE_EXTENSION_RANGE = "TARGET_TYPE_EXTENSION_RANGE",
  TARGET_TYPE_MESSAGE = "TARGET_TYPE_MESSAGE",
  TARGET_TYPE_FIELD = "TARGET_TYPE_FIELD",
  TARGET_TYPE_ONEOF = "TARGET_TYPE_ONEOF",
  TARGET_TYPE_ENUM = "TARGET_TYPE_ENUM",
  TARGET_TYPE_ENUM_ENTRY = "TARGET_TYPE_ENUM_ENTRY",
  TARGET_TYPE_SERVICE = "TARGET_TYPE_SERVICE",
  TARGET_TYPE_METHOD = "TARGET_TYPE_METHOD",
}

export enum MethodOptionsIdempotencyLevel {
  IDEMPOTENCY_UNKNOWN = "IDEMPOTENCY_UNKNOWN",
  NO_SIDE_EFFECTS = "NO_SIDE_EFFECTS",
  IDEMPOTENT = "IDEMPOTENT",
}

export enum FeatureSetFieldPresence {
  FIELD_PRESENCE_UNKNOWN = "FIELD_PRESENCE_UNKNOWN",
  EXPLICIT = "EXPLICIT",
  IMPLICIT = "IMPLICIT",
  LEGACY_REQUIRED = "LEGACY_REQUIRED",
}

export enum FeatureSetEnumType {
  ENUM_TYPE_UNKNOWN = "ENUM_TYPE_UNKNOWN",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
}

export enum FeatureSetRepeatedFieldEncoding {
  REPEATED_FIELD_ENCODING_UNKNOWN = "REPEATED_FIELD_ENCODING_UNKNOWN",
  PACKED = "PACKED",
  EXPANDED = "EXPANDED",
}

export enum FeatureSetUtf8Validation {
  UTF8_VALIDATION_UNKNOWN = "UTF8_VALIDATION_UNKNOWN",
  VERIFY = "VERIFY",
  NONE = "NONE",
}

export enum FeatureSetMessageEncoding {
  MESSAGE_ENCODING_UNKNOWN = "MESSAGE_ENCODING_UNKNOWN",
  LENGTH_PREFIXED = "LENGTH_PREFIXED",
  DELIMITED = "DELIMITED",
}

export enum FeatureSetJsonFormat {
  JSON_FORMAT_UNKNOWN = "JSON_FORMAT_UNKNOWN",
  ALLOW = "ALLOW",
  LEGACY_BEST_EFFORT = "LEGACY_BEST_EFFORT",
}

export enum GeneratedCodeInfoAnnotationSemantic {
  NONE = "NONE",
  SET = "SET",
  ALIAS = "ALIAS",
}

export type FileDescriptorSet = {
  file?: FileDescriptorProto[]
}

export type FileDescriptorProto = {
  name?: string
  package?: string
  dependency?: string[]
  publicDependency?: number[]
  weakDependency?: number[]
  messageType?: DescriptorProto[]
  enumType?: EnumDescriptorProto[]
  service?: ServiceDescriptorProto[]
  extension?: FieldDescriptorProto[]
  options?: FileOptions
  sourceCodeInfo?: SourceCodeInfo
  syntax?: string
  edition?: Edition
}

export type DescriptorProtoExtensionRange = {
  start?: number
  end?: number
  options?: ExtensionRangeOptions
}

export type DescriptorProtoReservedRange = {
  start?: number
  end?: number
}

export type DescriptorProto = {
  name?: string
  field?: FieldDescriptorProto[]
  extension?: FieldDescriptorProto[]
  nestedType?: DescriptorProto[]
  enumType?: EnumDescriptorProto[]
  extensionRange?: DescriptorProtoExtensionRange[]
  oneofDecl?: OneofDescriptorProto[]
  options?: MessageOptions
  reservedRange?: DescriptorProtoReservedRange[]
  reservedName?: string[]
}

export type ExtensionRangeOptionsDeclaration = {
  number?: number
  fullName?: string
  type?: string
  reserved?: boolean
  repeated?: boolean
}

export type ExtensionRangeOptions = {
  uninterpretedOption?: UninterpretedOption[]
  declaration?: ExtensionRangeOptionsDeclaration[]
  features?: FeatureSet
  verification?: ExtensionRangeOptionsVerificationState
}

export type FieldDescriptorProto = {
  name?: string
  number?: number
  label?: FieldDescriptorProtoLabel
  type?: FieldDescriptorProtoType
  typeName?: string
  extendee?: string
  defaultValue?: string
  oneofIndex?: number
  jsonName?: string
  options?: FieldOptions
  proto3Optional?: boolean
}

export type OneofDescriptorProto = {
  name?: string
  options?: OneofOptions
}

export type EnumDescriptorProtoEnumReservedRange = {
  start?: number
  end?: number
}

export type EnumDescriptorProto = {
  name?: string
  value?: EnumValueDescriptorProto[]
  options?: EnumOptions
  reservedRange?: EnumDescriptorProtoEnumReservedRange[]
  reservedName?: string[]
}

export type EnumValueDescriptorProto = {
  name?: string
  number?: number
  options?: EnumValueOptions
}

export type ServiceDescriptorProto = {
  name?: string
  method?: MethodDescriptorProto[]
  options?: ServiceOptions
}

export type MethodDescriptorProto = {
  name?: string
  inputType?: string
  outputType?: string
  options?: MethodOptions
  clientStreaming?: boolean
  serverStreaming?: boolean
}

export type FileOptions = {
  javaPackage?: string
  javaOuterClassname?: string
  javaMultipleFiles?: boolean
  javaGenerateEqualsAndHash?: boolean
  javaStringCheckUtf8?: boolean
  optimizeFor?: FileOptionsOptimizeMode
  goPackage?: string
  ccGenericServices?: boolean
  javaGenericServices?: boolean
  pyGenericServices?: boolean
  deprecated?: boolean
  ccEnableArenas?: boolean
  objcClassPrefix?: string
  csharpNamespace?: string
  swiftPrefix?: string
  phpClassPrefix?: string
  phpNamespace?: string
  phpMetadataNamespace?: string
  rubyPackage?: string
  features?: FeatureSet
  uninterpretedOption?: UninterpretedOption[]
}

export type MessageOptions = {
  messageSetWireFormat?: boolean
  noStandardDescriptorAccessor?: boolean
  deprecated?: boolean
  mapEntry?: boolean
  deprecatedLegacyJsonFieldConflicts?: boolean
  features?: FeatureSet
  uninterpretedOption?: UninterpretedOption[]
}

export type FieldOptionsEditionDefault = {
  edition?: Edition
  value?: string
}

export type FieldOptionsFeatureSupport = {
  editionIntroduced?: Edition
  editionDeprecated?: Edition
  deprecationWarning?: string
  editionRemoved?: Edition
}

export type FieldOptions = {
  ctype?: FieldOptionsCType
  packed?: boolean
  jstype?: FieldOptionsJSType
  lazy?: boolean
  unverifiedLazy?: boolean
  deprecated?: boolean
  weak?: boolean
  debugRedact?: boolean
  retention?: FieldOptionsOptionRetention
  targets?: FieldOptionsOptionTargetType[]
  editionDefaults?: FieldOptionsEditionDefault[]
  features?: FeatureSet
  featureSupport?: FieldOptionsFeatureSupport
  uninterpretedOption?: UninterpretedOption[]
}

export type OneofOptions = {
  features?: FeatureSet
  uninterpretedOption?: UninterpretedOption[]
}

export type EnumOptions = {
  allowAlias?: boolean
  deprecated?: boolean
  deprecatedLegacyJsonFieldConflicts?: boolean
  features?: FeatureSet
  uninterpretedOption?: UninterpretedOption[]
}

export type EnumValueOptions = {
  deprecated?: boolean
  features?: FeatureSet
  debugRedact?: boolean
  uninterpretedOption?: UninterpretedOption[]
}

export type ServiceOptions = {
  features?: FeatureSet
  deprecated?: boolean
  uninterpretedOption?: UninterpretedOption[]
}

export type MethodOptions = {
  deprecated?: boolean
  idempotencyLevel?: MethodOptionsIdempotencyLevel
  features?: FeatureSet
  uninterpretedOption?: UninterpretedOption[]
}

export type UninterpretedOptionNamePart = {
  namePart?: string
  isExtension?: boolean
}

export type UninterpretedOption = {
  name?: UninterpretedOptionNamePart[]
  identifierValue?: string
  positiveIntValue?: string
  negativeIntValue?: string
  doubleValue?: number
  stringValue?: Uint8Array
  aggregateValue?: string
}

export type FeatureSet = {
  fieldPresence?: FeatureSetFieldPresence
  enumType?: FeatureSetEnumType
  repeatedFieldEncoding?: FeatureSetRepeatedFieldEncoding
  utf8Validation?: FeatureSetUtf8Validation
  messageEncoding?: FeatureSetMessageEncoding
  jsonFormat?: FeatureSetJsonFormat
}

export type FeatureSetDefaultsFeatureSetEditionDefault = {
  edition?: Edition
  overridableFeatures?: FeatureSet
  fixedFeatures?: FeatureSet
}

export type FeatureSetDefaults = {
  defaults?: FeatureSetDefaultsFeatureSetEditionDefault[]
  minimumEdition?: Edition
  maximumEdition?: Edition
}

export type SourceCodeInfoLocation = {
  path?: number[]
  span?: number[]
  leadingComments?: string
  trailingComments?: string
  leadingDetachedComments?: string[]
}

export type SourceCodeInfo = {
  location?: SourceCodeInfoLocation[]
}

export type GeneratedCodeInfoAnnotation = {
  path?: number[]
  sourceFile?: string
  begin?: number
  end?: number
  semantic?: GeneratedCodeInfoAnnotationSemantic
}

export type GeneratedCodeInfo = {
  annotation?: GeneratedCodeInfoAnnotation[]
}