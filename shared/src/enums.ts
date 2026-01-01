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


/**
 * Taste characteristics of the desired dish
 *
 * Maximum 3 selections allowed
 * 'any' is exclusive (cannot combine with other flavors)
 * 'other' = Custom flavor (requires flavorProfilesCustom field)
 */
export type FlavorProfile = 'any' | 'sweet' | 'spicy' | 'savory'
    | 'sour' | 'umami' | 'bitter' | 'other';