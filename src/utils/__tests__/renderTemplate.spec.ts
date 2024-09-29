import { renderTemplate } from '@utils/renderTemplate'
import fs from 'fs'
import ejs from 'ejs'

jest.mock('fs', () => ({
	readFileSync: jest.fn()
}))

jest.mock('ejs', () => ({
	render: jest.fn()
}))

describe('renderTemplate', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('should render a template', () => {
		;(fs.readFileSync as jest.Mock).mockReturnValueOnce('')
		const templatePath = 'test'
		const template = 'test'
		const data = {}
		renderTemplate(templatePath, template, data)
		expect(fs.readFileSync).toHaveBeenCalledWith(
			`${templatePath}/${template}.ejs`,
			'utf-8'
		)
		expect(ejs.render).toHaveBeenCalledWith('', data)
	})

	it('should handle errors', () => {
		;(fs.readFileSync as jest.Mock).mockImplementationOnce(() => {
			throw new Error('Error')
		})
		const templatePath = 'test'
		const template = 'test'
		const data = {}
		expect(() => renderTemplate(templatePath, template, data)).toThrow(
			'Error rendering template'
		)
	})
})
