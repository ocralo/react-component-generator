import { toPascalCase } from '../string'

describe('toPascalCase', (): void => {
	it('should return empty string', (): void => {
		expect(toPascalCase('')).toBe('')
	})

	it('should return PascalCase', (): void => {
		expect(toPascalCase('pascal case')).toBe('PascalCase')
	})

	it('should return PascalCase', (): void => {
		expect(toPascalCase('pascal-case')).toBe('PascalCase')
	})

	it('should return PascalCase', (): void => {
		expect(toPascalCase('pascal_case')).toBe('PascalCase')
	})
})
