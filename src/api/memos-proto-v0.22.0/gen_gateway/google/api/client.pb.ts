/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as GoogleProtobufDuration from "../protobuf/duration.pb"
import * as GoogleApiLaunch_stage from "./launch_stage.pb"

export enum ClientLibraryOrganization {
  CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED = "CLIENT_LIBRARY_ORGANIZATION_UNSPECIFIED",
  CLOUD = "CLOUD",
  ADS = "ADS",
  PHOTOS = "PHOTOS",
  STREET_VIEW = "STREET_VIEW",
  SHOPPING = "SHOPPING",
  GEO = "GEO",
  GENERATIVE_AI = "GENERATIVE_AI",
}

export enum ClientLibraryDestination {
  CLIENT_LIBRARY_DESTINATION_UNSPECIFIED = "CLIENT_LIBRARY_DESTINATION_UNSPECIFIED",
  GITHUB = "GITHUB",
  PACKAGE_MANAGER = "PACKAGE_MANAGER",
}

export type CommonLanguageSettings = {
  referenceDocsUri?: string
  destinations?: ClientLibraryDestination[]
}

export type ClientLibrarySettings = {
  version?: string
  launchStage?: GoogleApiLaunch_stage.LaunchStage
  restNumericEnums?: boolean
  javaSettings?: JavaSettings
  cppSettings?: CppSettings
  phpSettings?: PhpSettings
  pythonSettings?: PythonSettings
  nodeSettings?: NodeSettings
  dotnetSettings?: DotnetSettings
  rubySettings?: RubySettings
  goSettings?: GoSettings
}

export type Publishing = {
  methodSettings?: MethodSettings[]
  newIssueUri?: string
  documentationUri?: string
  apiShortName?: string
  githubLabel?: string
  codeownerGithubTeams?: string[]
  docTagPrefix?: string
  organization?: ClientLibraryOrganization
  librarySettings?: ClientLibrarySettings[]
  protoReferenceDocumentationUri?: string
  restReferenceDocumentationUri?: string
}

export type JavaSettings = {
  libraryPackage?: string
  serviceClassNames?: {[key: string]: string}
  common?: CommonLanguageSettings
}

export type CppSettings = {
  common?: CommonLanguageSettings
}

export type PhpSettings = {
  common?: CommonLanguageSettings
}

export type PythonSettings = {
  common?: CommonLanguageSettings
}

export type NodeSettings = {
  common?: CommonLanguageSettings
}

export type DotnetSettings = {
  common?: CommonLanguageSettings
  renamedServices?: {[key: string]: string}
  renamedResources?: {[key: string]: string}
  ignoredResources?: string[]
  forcedNamespaceAliases?: string[]
  handwrittenSignatures?: string[]
}

export type RubySettings = {
  common?: CommonLanguageSettings
}

export type GoSettings = {
  common?: CommonLanguageSettings
}

export type MethodSettingsLongRunning = {
  initialPollDelay?: GoogleProtobufDuration.Duration
  pollDelayMultiplier?: number
  maxPollDelay?: GoogleProtobufDuration.Duration
  totalPollTimeout?: GoogleProtobufDuration.Duration
}

export type MethodSettings = {
  selector?: string
  longRunning?: MethodSettingsLongRunning
  autoPopulatedFields?: string[]
}