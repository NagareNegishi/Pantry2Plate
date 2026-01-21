// shared/src/types.ts

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}


/**
 * Define min and max ranges for menu request fields
 */
export const MIN_COOKING_TIME = 10;
export const MAX_COOKING_TIME = 720;
export const MIN_SERVINGS = 1;
export const MAX_SERVINGS = 12;