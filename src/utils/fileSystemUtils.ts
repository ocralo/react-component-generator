import fs from 'fs'

export const createDirectory = (dir: string): void => {
	if (!directoryExists(dir)) {
		try {
			fs.mkdirSync(dir)
		} catch {
			throw new Error('Error creating directory')
		}
	}
}

export const writeFile = (filePath: string, content: string): void => {
	try {
		fs.writeFileSync(filePath, content)
	} catch {
		throw new Error('Error writing file')
	}
}

export const directoryExists = (dir: string): boolean => {
	return fs.existsSync(dir)
}
