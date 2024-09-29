#!/usr/bin/env node
import chalk from 'chalk'
import { Command } from 'commander'
import figlet from 'figlet'
import makeFunctionalComponent from '@/commands/react/functional'

const program = new Command()

const showBanner = () =>
	chalk.red(
		figlet.textSync('R C G', {
			horizontalLayout: 'universal smushing',
			whitespaceBreak: true,
			font: 'Larry 3D 2'
		})
	)

console.log(showBanner())

program.version('1.0.0').description('React Component Generator')

program.option('-n, --name <type>', 'Add your name').action((options) => {
	console.log(chalk.blue(`Hey, ${options.name}!`))
	console.log(chalk.green(`Hey, ${options.name}!`))
	console.log(chalk.red(`Hey, ${options.name}!`))
})

program
	.command('component <name>', {
		isDefault: true
	})
	.action(makeFunctionalComponent)

program.parse(process.argv)
