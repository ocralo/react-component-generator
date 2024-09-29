import {
	createDirectory,
	writeFile,
	directoryExists
} from '@utils/fileSystemUtils'
import fs from 'fs'

jest.mock('fs', () => ({
	existsSync: jest.fn(),
	mkdirSync: jest.fn(),
	writeFileSync: jest.fn()
}))

describe('fileSystemUtils', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('createDirectory', () => {
		it('should create a directory', () => {
			;(fs.existsSync as jest.Mock).mockReturnValueOnce(false)
			const dir = 'test'
			createDirectory(dir)
			expect(fs.mkdirSync).toHaveBeenCalledWith(dir)
		})

		it('should not create a directory if it already exists', () => {
			;(fs.existsSync as jest.Mock).mockReturnValueOnce(true)
			const dir = 'test'
			createDirectory(dir)
			expect(fs.mkdirSync).not.toHaveBeenCalled()
		})

		it('should handle errors', () => {
			;(fs.existsSync as jest.Mock).mockReturnValueOnce(false)
			;(fs.mkdirSync as jest.Mock).mockImplementationOnce(() => {
				throw new Error('Error')
			})
			const dir = 'test'
			expect(() => createDirectory(dir)).toThrow(
				'Error creating directory'
			)
		})
	})

	describe('writeFile', () => {
		it('should write a file', () => {
			const filePath = 'test'
			const content = 'test'
			writeFile(filePath, content)
			expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, content)
		})

		it('should handle errors', () => {
			;(fs.writeFileSync as jest.Mock).mockImplementationOnce(() => {
				throw new Error('Error')
			})
			const filePath = 'test'
			const content = 'test'
			expect(() => writeFile(filePath, content)).toThrow(
				'Error writing file'
			)
		})
	})

	describe('directoryExists', () => {
		it('should return true if directory exists', () => {
			const dir = 'test'
			;(fs.existsSync as jest.Mock).mockReturnValueOnce(true)
			expect(directoryExists(dir)).toBe(true)
		})

		it('should return false if directory does not exist', () => {
			const dir = 'test'
			;(fs.existsSync as jest.Mock).mockReturnValueOnce(false)
			expect(directoryExists(dir)).toBe(false)
		})
	})
})
