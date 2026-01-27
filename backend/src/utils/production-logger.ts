/**
 * Logs API results and Caches successful request-response pairs to JSON files.
 * Each log entry includes request, response, status, and error info.
 */
import type { MenuRequestImpl } from '@pantry2plate/shared';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

interface ProductionLog {
  timestamp: string;
  status: 'success' | 'insufficient' | 'validation_error' | 'api_error';
  error?: string;
  request: {
    ingredients: string[];
    servings: number;
    maxCookingTime: number;
    mealType?: string;
    cuisineType?: string;
    allergies?: string[];
    dietaryRestrictions?: string[];
    flavorProfiles?: string[];
    cookingMethod?: string;
    difficulty?: string;
  };
  response?: string;
}

interface SuccessfulPair {
  timestamp: string;
  request: {
    ingredients: string[];
    servings: number;
    maxCookingTime: number;
    mealType?: string;
    cuisineType?: string;
    allergies?: string[];
    dietaryRestrictions?: string[];
    flavorProfiles?: string[];
    cookingMethod?: string;
    difficulty?: string;
  };
  response: string;
}

// Configuration
const LOG_DIR = process.env.PRODUCTION_LOG_DIR || join(process.cwd(), 'production-logs');
const CACHE_DIR = process.env.PRODUCTION_CACHE_DIR || join(process.cwd(), 'production-cache');
const ENABLE_LOGGING = process.env.ENABLE_PRODUCTION_LOGGING === 'true';
const ENABLE_CACHE = process.env.ENABLE_PRODUCTION_CACHE === 'true';


/**
 * Log ALL production attempts (success, error, insufficient, etc.)
 */
export function logProductionResult(
  status: ProductionLog['status'],
  request: MenuRequestImpl,
  response?: string,
  error?: string
): void {
  if (!ENABLE_LOGGING) return; // Skip logging if disabled

	// Create logs directory if it doesn't exist
  if (!existsSync(LOG_DIR)) {
    mkdirSync(LOG_DIR, { recursive: true });
  }

	// Create filename with current date
  const date = new Date().toISOString().split('T')[0];
  const logFile = join(LOG_DIR, `production-results-${date}.json`);

	// Read existing logs or create empty array
  let logs: ProductionLog[] = [];
  if (existsSync(logFile)) {
    logs = JSON.parse(readFileSync(logFile, 'utf-8'));
  }

  const log: ProductionLog = {
    timestamp: new Date().toISOString(),
    status,
    request: {
      ingredients: request.ingredients,
      servings: request.servings,
      maxCookingTime: request.maxCookingTime,
      mealType: request.mealType,
      cuisineType: request.cuisineType,
      cookingMethod: request.cookingMethod,
      difficulty: request.difficulty
    }
  };

	// Conditionally add arrays only if not empty
  if (request.allergies.length > 0) log.request.allergies = request.allergies;
  if (request.dietaryRestrictions.length > 0) log.request.dietaryRestrictions = request.dietaryRestrictions;
  if (request.flavorProfiles.length > 0) log.request.flavorProfiles = request.flavorProfiles;
  if (response) log.response = response;
  if (error) log.error = error;

	// Append new log and write back to file
  logs.push(log);
  writeFileSync(logFile, JSON.stringify(logs, null, 2));
}