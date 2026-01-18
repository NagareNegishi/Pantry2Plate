/**
 * Integration tests for the Claude service using real API calls.
 * Uses test data from JSON file to run multiple scenarios.
 * Note: this test costs API usage, DO NOT run routinely.
 * Command to run with linux/macOS:
 * RUN_INTEGRATION_TESTS=true ENABLE_CLAUDE_API=true npm test -- claude.service.integration
 * On Windows (this package.json script uses cross-env):
 * npx cross-env RUN_INTEGRATION_TESTS=true ENABLE_CLAUDE_API=true npm test -- claude.service.integration
 */


import { describe, expect, it } from '@jest/globals';
import { MenuRequestImpl } from '@pantry2plate/shared';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { generateMenuSuggestions } from '../../src/services/claude.service.js';
import { cacheSuccessfulPair } from './test-cache.js';
import { createTestLog, logTestResult } from './test-logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface TestData {
  name: string;
  request: any;
}

// Load test data
const testDataPath = join(__dirname, 'test-data.json');
const testData: TestData[] = JSON.parse(readFileSync(testDataPath, 'utf-8'));

// Only run first 2 tests for first attempts to limit API usage
const limitedTestData = testData.slice(0, 1);

describe('Claude API Integration Tests', () => {
  // Skip by default - only run when explicitly enabled
  const shouldRun = process.env.RUN_INTEGRATION_TESTS === 'true';
  const testFn = shouldRun ? it : it.skip; // 'it' has 'skip' method, with same signature

  // testData.forEach((testCase) => {
  limitedTestData.forEach((testCase) => {
    // testFn is either 'it' or 'it.skip'
    testFn(`should handle: ${testCase.name}`, async () => {
      const request = new MenuRequestImpl(testCase.request);
      
      try {
        // Call real API
        const response = await generateMenuSuggestions(request);

        // Case for insufficient ingredients -> logged
        if (response === 'INSUFFICIENT_INGREDIENTS') {
          console.log(`Fail: ${testCase.name}: Insufficient ingredients`);
          const log = createTestLog(
            testCase.name,
            request,
            response,
            'insufficient'
          );
          logTestResult(log);
          
          expect(response).toBe('INSUFFICIENT_INGREDIENTS');
          return;
        }

        // Verify structure
        const parsed = JSON.parse(response);
        expect(parsed).toHaveProperty('menus');
        expect(Array.isArray(parsed.menus)).toBe(true);
        expect(parsed.menus.length).toBeGreaterThan(0);

        // Log and cache successful response
        console.log(`Pass: ${testCase.name}: ${parsed.menus.length} menu(s) generated`);
        const log = createTestLog(
          testCase.name,
          request,
          response,
          'success'
        );
        logTestResult(log);
        cacheSuccessfulPair(testCase.name, request, response);

      } catch (error) {
        // Log error
        const errorMsg = error instanceof Error ? error.message : String(error);
        console.log(`Error: ${testCase.name}: ${errorMsg}`);
        const log = createTestLog(
          testCase.name,
          request,
          null,
          'error',
          errorMsg
        );
        logTestResult(log);
        
        throw error; // Re-throw to fail the test
      }
    }, 60000); // Set timeout to 60s per test
  });
});