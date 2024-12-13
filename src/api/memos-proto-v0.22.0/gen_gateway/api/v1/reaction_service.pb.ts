/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

export enum ReactionType {
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
}

export type Reaction = {
  id?: number
  creator?: string
  contentId?: string
  reactionType?: ReactionType
}