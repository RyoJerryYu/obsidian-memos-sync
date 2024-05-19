import { Component, MarkdownRenderer, Notice, TFile, moment } from "obsidian";
export enum LogLevel {
	"debug",
	"info",
	"warn",
	"error",  
}
export function debug(msg:string) {
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
