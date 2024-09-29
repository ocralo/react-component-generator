import { makeFunctionalComponent } from '@/commands/react/functional'
import {
	createDirectory,
	directoryExists,
	writeFile
} from '@/utils/fileSystemUtils'
import { startSpinner, succeedSpinner, failSpinner } from '@/utils/spinnerUtils'

jest.mock('@/utils/spinnerUtils', () => ({
	startSpinner: jest.fn(),
	succeedSpinner: jest.fn(),
	failSpinner: jest.fn()
}))
jest.mock('@/utils/fileSystemUtils')
jest.mock('@/utils/renderTemplate')
jest.mock('url', () => ({
	fileURLToPath: jest.fn().mockReturnValue('fileURLToPath')
}))
jest.mock('path', () => ({
	...jest.requireActual('path'),
	dirname: jest.fn().mockReturnValue('dirname'),
	join: jest.fn().mockReturnValue('join')
}))

describe('makeFunctionalComponent', () => {
	const name = 'componentName'

	afterEach(() => {
		jest.clearAllMocks()
	})

	it('should create a functional component', async () => {
		;(startSpinner as jest.Mock).mockReturnValue({ start: jest.fn() })
		await makeFunctionalComponent(name)

		expect(startSpinner).toHaveBeenCalledWith(`Creating component ${name}`)
		expect(createDirectory).toHaveBeenCalledWith('join')
		expect(directoryExists).toHaveBeenCalledWith('join')
		expect(writeFile).toHaveBeenCalledTimes(4)
		expect(succeedSpinner).toHaveBeenCalledWith(
			expect.any(Object),
			`Component ${name} created successfully!`
		)
	})

	it('should handle error creating components folder', async () => {
		;(startSpinner as jest.Mock).mockReturnValue({ start: jest.fn() })
		;(succeedSpinner as jest.Mock).mockImplementation(() => {
			throw new Error()
		})
		await makeFunctionalComponent(name)
		expect(startSpinner).toHaveBeenCalledWith(`Creating component ${name}`)
		expect(createDirectory).toHaveBeenCalledWith('join')
		expect(directoryExists).toHaveBeenCalledWith('join')
		expect(failSpinner).toHaveBeenCalledWith(
			expect.any(Object),
			'Error creating components folder'
		)
	})

	it('should handle error component already exists', async () => {
		;(startSpinner as jest.Mock).mockReturnValue({ start: jest.fn() })
		;(directoryExists as jest.Mock).mockReturnValue(true)
		await makeFunctionalComponent(name)
		expect(startSpinner).toHaveBeenCalledWith(`Creating component ${name}`)
		expect(directoryExists).toHaveBeenCalledWith('join')
		expect(failSpinner).toHaveBeenCalledWith(
			expect.any(Object),
			'Component already exists!'
		)
	})

	it('should handle error creating component', async () => {
		;(startSpinner as jest.Mock).mockReturnValue({ start: jest.fn() })
		;(directoryExists as jest.Mock)
			.mockReturnValueOnce(true)
			.mockReturnValueOnce(false)
		;(createDirectory as jest.Mock).mockImplementation(() => {
			throw new Error()
		})
		await makeFunctionalComponent(name)
		expect(startSpinner).toHaveBeenCalledWith(`Creating component ${name}`)
		expect(directoryExists).toHaveBeenCalledWith('join')
		expect(failSpinner).toHaveBeenCalledWith(
			expect.any(Object),
			`Error creating component ${name}`
		)
	})
})
