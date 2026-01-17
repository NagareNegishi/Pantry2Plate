/**
 * Logs real API test results to JSON files for later analysis.
 * Each log entry includes request, response, status, and error info.
 */

import type { MenuRequestImpl } from '@pantry2plate/shared';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
/**
 * Node.js file system functions:
 * - writeFileSync: Write data to file (blocking)
 * - existsSync: Check if file/folder exists
 * - readFileSync: Read file content (blocking)
 * - mkdirSync: Create directory
 */
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
/**
 * Path utilities:
 * - join: Combine path segments safely (handles OS differences)
 * - dirname: Get directory name from path
 * - fileURLToPath: Convert file:// URL to file path (needed for ESM)
 *
 */

// Getting current file and directory paths in ESM
// import.meta.url gives the file URL of the current module
// fileURLToPath converts that URL to a standard file path
// dirname gets the directory part of that file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface TestLog {
  timestamp: string;
  testName: string; // What test case
  request: {
    ingredients: string[];
    servings?: number;
    maxCookingTime?: number;
    mealType?: string;
    cuisineType?: string;
    allergies?: string[];
    dietaryRestrictions?: string[];
    flavorProfiles?: string[];
    cookingMethod?: string;
    difficulty?: string;
  };
  response: string | null; // What API returned
  status: 'success' | 'insufficient' | 'error'; // Result status
  error?: string;
}

/**
 * Log integration test result to JSON file
 * Creates daily log files: test-results-YYYY-MM-DD.json
 */
export function logTestResult(log: TestLog): void {
  const logsDir = join(__dirname, 'logs');
  
  // Create logs directory if it doesn't exist
  if (!existsSync(logsDir)) {
    mkdirSync(logsDir, { recursive: true });
  }

  // Create filename with current date
  const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const logFile = join(logsDir, `test-results-${date}.json`);

  // Read existing logs or create empty array
  let logs: TestLog[] = [];
  if (existsSync(logFile)) {
    const content = readFileSync(logFile, 'utf-8');
    logs = JSON.parse(content);
  }

  // Append new log
  logs.push(log);

  // Write back to file
  writeFileSync(logFile, JSON.stringify(logs, null, 2));
}

/**
 * Create a TestLog from test data
 */
export function createTestLog(
  testName: string,
  request: MenuRequestImpl,
  response: string | null,
  status: 'success' | 'insufficient' | 'error',
  error?: string
): TestLog {
  const log: TestLog = {
    timestamp: new Date().toISOString(),
    testName,
    request: {
      ingredients: request.ingredients,
      servings: request.servings,
      maxCookingTime: request.maxCookingTime,
      mealType: request.mealType,
      cuisineType: request.cuisineType,
      cookingMethod: request.cookingMethod,
      difficulty: request.difficulty
    },
    response,
    status
  };

  // Conditionally add arrays only if not empty
  if (request.allergies.length > 0) {
    log.request.allergies = request.allergies;
  }
  if (request.dietaryRestrictions.length > 0) {
    log.request.dietaryRestrictions = request.dietaryRestrictions;
  }
  if (request.flavorProfiles.length > 0) {
    log.request.flavorProfiles = request.flavorProfiles;
  }
  if (error) {
    log.error = error;
  }

  return log;
}
