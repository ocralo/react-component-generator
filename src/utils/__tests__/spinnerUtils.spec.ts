import { failSpinner, startSpinner, succeedSpinner } from '@utils/spinnerUtils'
import ora from 'ora'
import chalk from 'chalk'

jest.mock('ora', () =>
	jest.fn(() => ({
		start: jest.fn().mockReturnValue({
			succeed: jest.fn(),
			fail: jest.fn()
		}),
		fail: jest.fn(),
		succeed: jest.fn()
	}))
)

jest.mock('chalk', () => ({
	red: jest.fn((txt: string) => txt),
	green: jest.fn((txt: string) => txt)
}))

describe('SpinnerUtils', () => {
	beforeEach(() => {
		jest.clearAllMocks()
	})

	describe('failSpinner', () => {
		it('should fail the spinner', () => {
			const message = 'test'
			const spinner = ora('test').start()
			failSpinner(spinner, message)
			expect(spinner.fail).toHaveBeenCalledWith(message)
			expect(chalk.red).toHaveBeenCalledWith(message)
		})
	})

	describe('startSpinner', () => {
		it('should start the spinner', () => {
			const message = 'test'
			startSpinner(message)
			expect(ora).toHaveBeenCalledWith(message)
		})
	})

	describe('succeedSpinner', () => {
		it('should succeed the spinner', () => {
			const message = 'test'
			const spinner = ora('test').start()
			succeedSpinner(spinner, message)
			expect(spinner.succeed).toHaveBeenCalledWith(message)
			expect(chalk.green).toHaveBeenCalledWith(message)
		})
	})
})
