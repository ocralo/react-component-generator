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
	collectCoverageFrom: ['<rootDir>/src/**/*.ts']
}
