import { JestConfigWithTsJest as IConfig } from 'ts-jest'

/*
 * For a detailed explanation regarding each configuration property and type check, visit:
 * https://jestjs.io/docs/en/configuration.html
 */
export const config: Partial<IConfig> = {
	roots: ['./src'],
	transform: {
		'^.+\\.(ts)?$': 'ts-jest',
	},
    testMatch: ['<rootDir>/**/*.spec.ts'],
	moduleFileExtensions: ['ts', 'js'],
	testEnvironment: 'node',
    clearMocks: true,
	resetMocks: true,
};

export default config