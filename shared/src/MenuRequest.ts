// shared/src/MenuRequest.ts

import {
  Allergy,
  CookingMethod,
  CuisineType,
  DietaryRestriction,
  Difficulty,
  FlavorProfile,
  MealType
} from './enums';

/**
 * Menu request from user to backend
 *
 * Defines what the user wants for their meal, including ingredients,
 * dietary requirements, preferences, and constraints.
 *
 * Validation rules:
 * - ingredients: Required, must have at least 1 item
 * - flavorProfiles: Max 3 selections, 'any' is exclusive
 * - maxCookingTime: 10-720 minutes (10 min to 12 hours)
 * - Custom fields (*Custom): Required when corresponding enum = 'other'
 * - Custom input: 1-20 characters, letters and spaces only
 */
export interface MenuRequest {
  // ========== REQUIRED ==========

  /** List of available ingredients */
  ingredients: string[];

  // ========== RESTRICTIONS (Must Follow) ==========

  /** Food allergies - recipes MUST NOT contain these allergens */
  allergies?: Allergy[];
  /** Custom allergies when 'other' is selected */
  allergiesCustom?: string[];

  /** Dietary restrictions (religious, medical, lifestyle) */
  dietaryRestrictions?: DietaryRestriction[];
  /** Custom dietary restrictions when 'other' is selected */
  dietaryRestrictionsCustom?: string[];

  // ========== PREFERENCES ==========
  
  /** Number of servings (default: 1) */
  servings?: number;
  
  /** Type of meal (default: 'any') */
  mealType?: MealType;
  /** Custom meal type when mealType = 'other' */
  mealTypeCustom?: string;
  
  /** Desired flavor profiles - max 3, 'any' is exclusive (default: ['any']) */
  flavorProfiles?: FlavorProfile[];
  /** Custom flavor profiles when 'other' is included */
  flavorProfilesCustom?: string[];
  
  /** Cuisine style (default: 'any') */
  cuisineType?: CuisineType;
  /** Custom cuisine type when cuisineType = 'other' */
  cuisineTypeCustom?: string;
  
  /** Preferred cooking method (default: 'any') */
  cookingMethod?: CookingMethod;
  /** Custom cooking method when cookingMethod = 'other' */
  cookingMethodCustom?: string;
  
  /** Maximum cooking time in minutes (range: 10-720, default: 60) */
  maxCookingTime?: number;
  
  /** Recipe difficulty level (default: 'any') */
  difficulty?: Difficulty;
}