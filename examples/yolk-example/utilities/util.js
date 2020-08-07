export function crossPlatformPathConversion(filePath) {
	if (Deno.build.os === "win") {
		filePath = filePath.split("/").join("\\");
		filePath = filePath.substr(1, filePath.length - 1);
	}

	return filePath
}