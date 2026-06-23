import { type Config } from 'jest'
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  preset: 'ts-jest',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/$1',
    '^@project-bd-client/ui$': '<rootDir>/../../packages/ui/src/index.ts',
    '^@ui/(.*)$': '<rootDir>/../../packages/ui/src/$1',
  },
  testMatch: [
    '<rootDir>/app/**/*.{spec,test}.{ts,tsx}',
    '<rootDir>/../../packages/ui/src/**/*.{spec,test}.{ts,tsx}',
  ],
  // Add more setup options before each test is run
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)
