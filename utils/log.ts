import { Component, MarkdownRenderer, Notice, TFile, moment } from "obsidian";


/**
 * Build environment, defined in esbuild.config.mjs
 */
const env: "production" | "development" = process.env.BUILD_ENV as any || "production";

export enum LogLevel {
	"debug",
	"info",
	"warn",
	"error",  
}
export function debug(msg:string) {
	if (env === "production") return;
	console.debug(msg);
}
export function info(msg: string) {
	new Notice(msg, 5000);
	console.info(msg); 
}

export function warn(msg: string) {
	new Notice(msg);
	console.warn(msg);
}

export function error(msg: string) {
	new Notice(msg);
	console.error(msg);
}
