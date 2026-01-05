// shared/src/types.ts

/**
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}


/**
 * Define min and max cooking time in minutes
 */
export const MIN_COOKING_TIME = 10;
export const MAX_COOKING_TIME = 720;