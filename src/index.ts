#!/usr/bin/env node
import { input } from '@inquirer/prompts'

async function main() {
	const answer = await input({ message: 'Enter your name' })
	console.log(answer)
}

main()
