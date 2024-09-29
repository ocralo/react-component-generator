import ora, { Ora } from 'ora'
import chalk from 'chalk'

export const startSpinner = (message: string): Ora => {
	return ora(message).start()
}

export const succeedSpinner = (spinner: Ora, message: string): void => {
	spinner.succeed(chalk.green(message))
}

export const failSpinner = (spinner: Ora, message: string): void => {
	spinner.fail(chalk.red(message))
}
