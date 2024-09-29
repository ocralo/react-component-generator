import chalk from 'chalk'
jest.mock('chalk', () => ({
	red: jest.fn(),
	blue: jest.fn(),
	green: jest.fn()
}))
jest.mock('commander', () => ({
	Command: jest.fn(() => ({
		version: jest.fn().mockReturnValue({
			description: jest.fn()
		}),
		option: jest.fn().mockReturnThis(),
		action: jest.fn(),
		command: jest.fn().mockReturnThis(),
		parse: jest.fn()
	}))
}))
jest.mock('@/commands/react/functional', () => jest.fn())

describe('CLI Component Generator', () => {
	it('should work', async () => {
		await import('../index')
		expect(chalk.red).toHaveBeenCalled()
	})
})
