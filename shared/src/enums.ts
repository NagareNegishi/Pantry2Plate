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


/**
 * Dietary requirements or preferences
 *
 * Multiple selections allowed
 * Empty array = no restrictions
 * 'other' = Custom restriction (requires dietaryRestrictionsCustom field)
 */
export type DietaryRestriction = 'vegetarian' | 'vegan' | 'gluten-free' | 'dairy-free'
    | 'nut-free' | 'shellfish-free' | 'halal' | 'kosher' | 'keto' | 'paleo'
    | 'low-carb' | 'low-fat' | 'other';


/**
 * Primary cooking technique
 *
 * Single selection only
 * 'any' = No preference (default)
 * 'other' = Custom method (requires cookingMethodCustom field)
 */
export type CookingMethod = 'any' | 'bake' | 'deep-fry' | 'grill' | 'steam' | 'boil'
    | 'roast' | 'slow-cook' | 'stir-fry' | 'sauté' | 'broil' | 'raw' | 'other';


/**
 * Recipe complexity level
 *
 * Single selection only
 * 'any' = No preference (default)
 * No custom option available
 */
export type Difficulty = 'any' | 'easy' | 'medium' | 'hard';