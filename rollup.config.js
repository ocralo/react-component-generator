import typescriptPlugin from '@rollup/plugin-typescript'
import del from 'rollup-plugin-delete'
import terserPlugin from '@rollup/plugin-terser'
import terser from '@rollup/plugin-terser'
import fs from 'fs'

const outputPath = 'dist'
const commonInputOptions = {
	input: 'src/index.ts',
	plugins: [
		del({ targets: `${outputPath}/*` }),
		typescriptPlugin({
			tsconfig: 'tsconfig.rollup.json'
		})
	]
}

const iifeCommonOutputOptions = {
	name: 'ReactComponentGenerator',
	plugins: [terserPlugin()]
}

const config = [
	{
		...commonInputOptions,
		output: {
			...iifeCommonOutputOptions,
			format: 'es',
			file: `${outputPath}/index.js`,
			plugins: [terser()]
		}
	}
]

config[0].output.plugins.push({
	name: 'change-permissions',
	writeBundle() {
		fs.chmodSync(`${outputPath}/index.js`, 0o755)
	}
})

export default config
