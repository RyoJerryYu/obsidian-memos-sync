/* eslint-disable */
// @ts-nocheck
/*
* This file is a generated Typescript file for GRPC Gateway, DO NOT MODIFY
*/

import * as fm from "../../fetch.pb"

type Absent<T, K extends keyof T> = { [k in Exclude<keyof T, K>]?: undefined };
type OneOf<T> =
  | { [k in keyof T]?: undefined }
  | (
    keyof T extends infer K ?
      (K extends string & keyof T ? { [k in K]: T[K] } & Absent<T, K>
        : never)
    : never);

export enum NodeType {
  NODE_UNSPECIFIED = "NODE_UNSPECIFIED",
  LINE_BREAK = "LINE_BREAK",
  PARAGRAPH = "PARAGRAPH",
  CODE_BLOCK = "CODE_BLOCK",
  HEADING = "HEADING",
  HORIZONTAL_RULE = "HORIZONTAL_RULE",
  BLOCKQUOTE = "BLOCKQUOTE",
  ORDERED_LIST = "ORDERED_LIST",
  UNORDERED_LIST = "UNORDERED_LIST",
  TASK_LIST = "TASK_LIST",
  MATH_BLOCK = "MATH_BLOCK",
  TABLE = "TABLE",
  EMBEDDED_CONTENT = "EMBEDDED_CONTENT",
  TEXT = "TEXT",
  BOLD = "BOLD",
  ITALIC = "ITALIC",
  BOLD_ITALIC = "BOLD_ITALIC",
  CODE = "CODE",
  IMAGE = "IMAGE",
  LINK = "LINK",
  AUTO_LINK = "AUTO_LINK",
  TAG = "TAG",
  STRIKETHROUGH = "STRIKETHROUGH",
  ESCAPING_CHARACTER = "ESCAPING_CHARACTER",
  MATH = "MATH",
  HIGHLIGHT = "HIGHLIGHT",
  SUBSCRIPT = "SUBSCRIPT",
  SUPERSCRIPT = "SUPERSCRIPT",
  REFERENCED_CONTENT = "REFERENCED_CONTENT",
  SPOILER = "SPOILER",
}

export type ParseMarkdownRequest = {
  markdown?: string
}

export type ParseMarkdownResponse = {
  nodes?: Node[]
}

export type RestoreMarkdownRequest = {
  nodes?: Node[]
}

export type RestoreMarkdownResponse = {
  markdown?: string
}

export type GetLinkMetadataRequest = {
  link?: string
}

export type LinkMetadata = {
  title?: string
  description?: string
  image?: string
}


type BaseNode = {
  type?: NodeType
}

export type Node = BaseNode
  & OneOf<{ lineBreakNode: LineBreakNode; paragraphNode: ParagraphNode; codeBlockNode: CodeBlockNode; headingNode: HeadingNode; horizontalRuleNode: HorizontalRuleNode; blockquoteNode: BlockquoteNode; orderedListNode: OrderedListNode; unorderedListNode: UnorderedListNode; taskListNode: TaskListNode; mathBlockNode: MathBlockNode; tableNode: TableNode; embeddedContentNode: EmbeddedContentNode; textNode: TextNode; boldNode: BoldNode; italicNode: ItalicNode; boldItalicNode: BoldItalicNode; codeNode: CodeNode; imageNode: ImageNode; linkNode: LinkNode; autoLinkNode: AutoLinkNode; tagNode: TagNode; strikethroughNode: StrikethroughNode; escapingCharacterNode: EscapingCharacterNode; mathNode: MathNode; highlightNode: HighlightNode; subscriptNode: SubscriptNode; superscriptNode: SuperscriptNode; referencedContentNode: ReferencedContentNode; spoilerNode: SpoilerNode }>

export type LineBreakNode = {
}

export type ParagraphNode = {
  children?: Node[]
}

export type CodeBlockNode = {
  language?: string
  content?: string
}

export type HeadingNode = {
  level?: number
  children?: Node[]
}

export type HorizontalRuleNode = {
  symbol?: string
}

export type BlockquoteNode = {
  children?: Node[]
}

export type OrderedListNode = {
  number?: string
  indent?: number
  children?: Node[]
}

export type UnorderedListNode = {
  symbol?: string
  indent?: number
  children?: Node[]
}

export type TaskListNode = {
  symbol?: string
  indent?: number
  complete?: boolean
  children?: Node[]
}

export type MathBlockNode = {
  content?: string
}

export type TableNodeRow = {
  cells?: string[]
}

export type TableNode = {
  header?: string[]
  delimiter?: string[]
  rows?: TableNodeRow[]
}

export type EmbeddedContentNode = {
  resourceName?: string
  params?: string
}

export type TextNode = {
  content?: string
}

export type BoldNode = {
  symbol?: string
  children?: Node[]
}

export type ItalicNode = {
  symbol?: string
  content?: string
}

export type BoldItalicNode = {
  symbol?: string
  content?: string
}

export type CodeNode = {
  content?: string
}

export type ImageNode = {
  altText?: string
  url?: string
}

export type LinkNode = {
  text?: string
  url?: string
}

export type AutoLinkNode = {
  url?: string
  isRawText?: boolean
}

export type TagNode = {
  content?: string
}

export type StrikethroughNode = {
  content?: string
}

export type EscapingCharacterNode = {
  symbol?: string
}

export type MathNode = {
  content?: string
}

export type HighlightNode = {
  content?: string
}

export type SubscriptNode = {
  content?: string
}

export type SuperscriptNode = {
  content?: string
}

export type ReferencedContentNode = {
  resourceName?: string
  params?: string
}

export type SpoilerNode = {
  content?: string
}

export class MarkdownService {
  static ParseMarkdown(req: ParseMarkdownRequest, initReq?: fm.InitReq): Promise<ParseMarkdownResponse> {
    return fm.fetchReq<ParseMarkdownRequest, ParseMarkdownResponse>(`/api/v1/markdown/parse`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static RestoreMarkdown(req: RestoreMarkdownRequest, initReq?: fm.InitReq): Promise<RestoreMarkdownResponse> {
    return fm.fetchReq<RestoreMarkdownRequest, RestoreMarkdownResponse>(`/api/v1/markdown:restore`, {...initReq, method: "POST", body: JSON.stringify(req, fm.replacer)})
  }
  static GetLinkMetadata(req: GetLinkMetadataRequest, initReq?: fm.InitReq): Promise<LinkMetadata> {
    return fm.fetchReq<GetLinkMetadataRequest, LinkMetadata>(`/api/v1/markdown/link:metadata?${fm.renderURLSearchParams(req, [])}`, {...initReq, method: "GET"})
  }
}