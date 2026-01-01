// shared/src/enums.ts

/**
 * Enum Definitions for Application
 * These enums define valid values for various menu request attributes.
 * All enums include 'any' as a default option and 'other' for custom user input
 * (except Difficulty which does not support custom input).
 */


/**
 * Type of meal being requested
 *
 * 'any' = No preference (default)
 * 'other' = Custom meal type (requires mealTypeCustom field)
 */
export type MealType = 'any' | 'breakfast' | 'lunch' | 'dinner'
    | 'snack' | 'brunch' | 'dessert' | 'other';