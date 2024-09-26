import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'

export default [
	{ files: ['**/*.{js,ts,tsx}', '**/*.spec.{js,ts,tsx}'] },
	{ languageOptions: { globals: globals.browser } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		plugins: {
			prettier: eslintPluginPrettier
		}
	},
	{ rules: { 'prettier/prettier': 'error' } },
	{
		ignores: ['dist/**', 'node_modules/**']
	}
]
