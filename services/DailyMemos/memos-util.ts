import { ResourceType } from "types/memos-v0.19.1-types";


export function generateFileName(resource: ResourceType): string {
	return `${resource.id}-${resource.filename.replace(/[/\\?%*:|"<>]/g, "-")}`;
}

export function generateFileLink(resource: ResourceType): string {
	if (!resource.externalLink) {
		return `![[${generateFileName(resource)}]]`;
	}

	const prefix = resource.type?.includes("image") ? "!" : ""; // only add ! for image type

	return `${prefix}[${resource.name || resource.filename}](${
		resource.externalLink
	})`;
}
