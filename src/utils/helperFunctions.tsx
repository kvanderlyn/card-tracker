function toTitleCase(str: string) {
	return str.replace(
		/\w\S*/g,
		(string) =>
			string.charAt(0).toUpperCase() + string.substring(1).toLocaleLowerCase(),
	);
}

export { toTitleCase };
