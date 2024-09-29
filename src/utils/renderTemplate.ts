import ejs from 'ejs'
import fs from 'fs'
import path from 'path'

export const renderTemplate = (
	templatePath: string,
	template: string,
	data: object
): string => {
	const templateFile = path.join(templatePath, `${template}.ejs`)

	try {
		return ejs.render(fs.readFileSync(templateFile, 'utf-8'), data)
	} catch {
		throw new Error('Error rendering template')
	}
}
