export const toPascalCase = (str: string) => {
	if (!str) return ''

	return str
		.split(/[-_ ]/)
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join('')
		.replace(/[^a-zA-Z0-9]/g, '')
}
