/**
 * Caches successful request-response pairs from real API tests.
 * Stores pairs in a JSON file for reuse in future.
 */

import type { MenuRequestImpl } from '@pantry2plate/shared';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export interface CachedPair {
  timestamp: string;
  testName: string;
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
  response: string;
}

const CACHE_FILE = join(__dirname, 'cache', 'successful-pairs.json');

/**
 * Save successful request-response pair to cache
 */
export function cacheSuccessfulPair(
  testName: string,
  request: MenuRequestImpl,
  response: string
): void {
  const cacheDir = join(__dirname, 'cache');
  
  // Create cache directory if it doesn't exist
  if (!existsSync(cacheDir)) {
    mkdirSync(cacheDir, { recursive: true });
  }

  // Read existing cache or create empty array
  let cache: CachedPair[] = [];
  if (existsSync(CACHE_FILE)) {
    const content = readFileSync(CACHE_FILE, 'utf-8');
    cache = JSON.parse(content);
  }

  // Create cached pair
  const pair: CachedPair = {
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
    response
  };

  // Add optional fields only if they exist
  if (request.allergies.length > 0) {
    pair.request.allergies = request.allergies;
  }
  if (request.dietaryRestrictions.length > 0) {
    pair.request.dietaryRestrictions = request.dietaryRestrictions;
  }
  if (request.flavorProfiles.length > 0) {
    pair.request.flavorProfiles = request.flavorProfiles;
  }

  // Append and save
  cache.push(pair);
  writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2));
}

/**
 * Get all cached pairs
 */
export function getCachedPairs(): CachedPair[] {
  if (!existsSync(CACHE_FILE)) {
    return [];
  }
  const content = readFileSync(CACHE_FILE, 'utf-8');
  return JSON.parse(content);
}

/**
 * Clear all cached pairs
 */
export function clearCache(): void {
  if (existsSync(CACHE_FILE)) {
    writeFileSync(CACHE_FILE, JSON.stringify([], null, 2));
  }
}