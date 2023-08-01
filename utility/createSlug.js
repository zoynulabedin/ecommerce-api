function createSlug(title) {
	// Convert the title to lowercase
	let slug = title.toLowerCase();

	// Remove special characters, except for hyphens and spaces
	slug = slug.replace(/[^\w\s-]/g, "");

	// Replace spaces with hyphens
	slug = slug.replace(/\s+/g, "-");

	return slug;
}

export default createSlug;
