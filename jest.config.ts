/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	testPathIgnorePatterns: ['/node_modules/', '/dist/'],
	globals: {
		'ts-jest': {
			isolatedModules: true
		}
	},
	moduleNameMapper: {
		'@/(.*)': '<rootDir>/src/$1',
		'@utils/(.*)': '<rootDir>/src/utils/$1'
	},
	collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
	transform: {
		'^.+\\.ts?$': [
			'ts-jest',
			{
				diagnostics: {
					ignoreCodes: [1343]
				},
				astTransformers: {
					before: [
						{
							path: 'node_modules/ts-jest-mock-import-meta', // or, alternatively, 'ts-jest-mock-import-meta' directly, without node_modules.
							options: {
								metaObjectReplacement: {
									url: 'https://www.url.com'
								}
							}
						}
					]
				}
			}
		]
	}
}
