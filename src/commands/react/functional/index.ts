import path from 'path'
import { fileURLToPath } from 'url'
import { toPascalCase } from '@utils/string'
import { failSpinner, startSpinner, succeedSpinner } from '@utils/spinnerUtils'
import {
	createDirectory,
	directoryExists,
	writeFile
} from '@utils/fileSystemUtils'
import { renderTemplate } from '@utils/renderTemplate'

const _filename: string = fileURLToPath(import.meta.url)
const _dirname: string = path.dirname(_filename)

export const makeFunctionalComponent = async (name: string): Promise<void> => {
	const spinner = startSpinner(`Creating component ${name}`)

	const componentDir = path.join(process.cwd(), 'components')
	const dir = path.join(componentDir, toPascalCase(name))

	const templates = [
		'index.tsx',
		'style.scss',
		'_index.spec.tsx',
		'interface.ts'
	]
	const templatePath = path.join(_dirname, 'templates', 'components')

	if (!directoryExists(componentDir)) {
		const spinnerComponent = startSpinner('Creating components folder')
		try {
			createDirectory(componentDir)
			succeedSpinner(
				spinnerComponent,
				'Components folder created successfully!'
			)
		} catch {
			failSpinner(spinnerComponent, 'Error creating components folder')
			return
		}
	}

	if (directoryExists(dir)) {
		failSpinner(spinner, 'Component already exists!')
		return
	}

	try {
		createDirectory(dir)
	} catch {
		failSpinner(spinner, `Error creating component ${name}`)
		return
	}

	templates.forEach((template) => {
		const content = renderTemplate(templatePath, template, { name })
		writeFile(path.join(dir, template), content)
	})

	succeedSpinner(spinner, `Component ${name} created successfully!`)
}

export default makeFunctionalComponent
