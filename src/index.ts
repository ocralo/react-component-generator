#!/usr/bin/env node
import { program } from 'commander'
import chalk from 'chalk'
import figlet from 'figlet'

console.log(
	chalk.red(
		figlet.textSync('R C G', {
			horizontalLayout: 'universal smushing',
			whitespaceBreak: true,
			font: 'Larry 3D 2'
		})
	)
)

program
	.version('1.0.0')
	.description('React Component Generator')
	.option('-n, --name <type>', 'Add your name')
	.action((options) => {
		console.log(chalk.blue(`Hey, ${options.name}!`))
		console.log(chalk.green(`Hey, ${options.name}!`))
		console.log(chalk.red(`Hey, ${options.name}!`))
	})

program.parse(process.argv)
