#!/usr/bin/env node
import { program } from 'commander'
import chalk from 'chalk'
import figlet from 'figlet'
import ejs from 'ejs'
import fs from 'fs'
import path from 'path'
import ora from 'ora'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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

program
	.command('component <name>')
	.alias('c')
	.description('Generate a new React component')
	.option('-f, --functional', 'Create a functional component')
	.action((name, options) => {
		console.log(name, options)

		const spinner = ora(`Creating component ${name}`).start()

		const componentDir = path.join(process.cwd(), 'components')
		const dir = path.join(componentDir, name)

		const templates = [
			'index.tsx',
			'style.scss',
			'_index.spec.tsx',
			'interface.ts'
		]
		const templatePath = path.join(__dirname, 'templates', 'components')

		const existComponentFolder = fs.existsSync(componentDir)
		if (!existComponentFolder) {
			const spinnerComponent = ora('Creating components folder').start()
			try {
				fs.mkdirSync(componentDir)
			} catch {
				spinnerComponent.fail(
					chalk.red('Error creating components folder')
				)
				return
			}
			spinnerComponent.succeed(
				chalk.green('Components folder created successfully!')
			)
		}

		const existFolder = fs.existsSync(dir)
		if (existFolder) {
			spinner.fail(chalk.red('Component already exists!'))
			return
		}

		try {
			console.log(dir)

			fs.mkdirSync(dir)
		} catch {
			spinner.fail(chalk.red(`Error creating component ${name}`))
			return
		}

		templates.forEach((template) => {
			const templateFile = path.join(templatePath, `${template}.ejs`)
			const content = ejs.render(fs.readFileSync(templateFile, 'utf-8'), {
				name
			})

			fs.writeFileSync(path.join(dir, template), content)
		})

		spinner.succeed(chalk.green(`Component ${name} created successfully!`))
	})

program.parse(process.argv)
