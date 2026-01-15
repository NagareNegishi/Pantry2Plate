/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  // Ts-Jest require configuration to transform TypeScript files
  // https://kulshekhar.github.io/ts-jest/docs/getting-started/installation#jest-config-file
  preset: "ts-jest",
  // Automatically clear mock calls, instances, contexts and results before every test
  clearMocks: true,
  // Indicates which provider should be used to instrument code for coverage
  coverageProvider: "v8",
  // Tells Jest to treat .ts files as ESM modules: https://jestjs.io/docs/configuration#extensionstotreatasesm-arraystring
  extensionsToTreatAsEsm: ['.ts'],
  // TypeScript files import with .js extensions: import { X } from './file.js'
  // But the actual files are .ts before compilation, This regex removes .js so Jest can find .ts files
  moduleNameMapper: {
    '^(\\.{1,2}/.*)\\.js$': '$1',
    '^@pantry2plate/shared$': '<rootDir>/../shared/src/index.ts',
  },
  // Configures ts-jest to transform TypeScript in ESM mode, Default ts-jest uses CommonJS
  transform: {
    '^.+\\.ts$': [
      'ts-jest',
      {
        useESM: true,
      },
    ],
  },
};

export default config;