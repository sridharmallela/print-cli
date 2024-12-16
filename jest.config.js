/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
module.exports = {
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/lib/**/*.[jt]s?(x)'],
  coverageDirectory: '<rootDir>/coverage',
  coveragePathIgnorePatterns: [
    '\\\\node_modules\\\\',
    '\\\\dist\\\\',
    'cli.js'
  ],
  coverageReporters: ['json', 'text', 'lcovonly', 'html', 'cobertura'],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    },
    '**/*': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  errorOnDeprecated: true,
  rootDir: '.',
  slowTestThreshold: 5,
  testEnvironment: 'node',
  testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
  transformIgnorePatterns: ['\\\\node_modules\\\\'],
  verbose: true
};
