import { Resource } from "@/api/memos-proto-v0.22.0/gen/api/v1/resource_service";

export type APIResource = {
	name?: string;
	externalLink?: string;
	type?: string;
	uid?: string;
	id: string;
	filename: string;
};

export function convert0220ResourceToAPIResource(
	resource: Resource
): APIResource {
	return {
		id: resource.name.replace("resources/", ""),
		filename: resource.filename,
		externalLink: resource.externalLink,
		name: resource.name,
		type: resource.type,
		uid: resource.uid,
	};
}

export function generateResourceName(resource: APIResource): string {
	return `${resource.id}-${resource.filename.replace(/[/\\?%*:|"<>]/g, "-")}`;
}

export function generateResourceLink(resource: APIResource): string {
	if (!resource.externalLink) {
		return `![[${generateResourceName(resource)}]]`;
	}

	const prefix = resource.type?.includes("image") ? "!" : ""; // only add ! for image type

	return `${prefix}[${resource.name || resource.filename}](${
		resource.externalLink
	})`;
}
