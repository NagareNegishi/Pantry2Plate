// shared/src/MenuRequest.ts

import type {
  Allergy,
  CookingMethod,
  CuisineType,
  DietaryRestriction,
  Difficulty,
  FlavorProfile,
  MealType
} from './enums.js';

import type { ValidationResult } from './types.js';
import { MAX_COOKING_TIME, MAX_SERVINGS, MIN_COOKING_TIME } from './types.js';

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


/**
 * MenuRequest implementation with validation and defaults
 */
export class MenuRequestImpl implements MenuRequest {
  // ========== REQUIRED ==========
  ingredients: string[];

  // ========== RESTRICTIONS ==========
  allergies: Allergy[];
  allergiesCustom: string[];
  dietaryRestrictions: DietaryRestriction[];
  dietaryRestrictionsCustom: string[];

  // ========== PREFERENCES ==========
  servings: number;
  mealType: MealType;
  mealTypeCustom: string;
  flavorProfiles: FlavorProfile[];
  flavorProfilesCustom: string[];
  cuisineType: CuisineType;
  cuisineTypeCustom: string;
  cookingMethod: CookingMethod;
  cookingMethodCustom: string;
  maxCookingTime: number;
  difficulty: Difficulty;

  constructor(data: Partial<MenuRequest>) {
    // Required
    this.ingredients = data.ingredients ?? [];
    // Restrictions
    this.allergies = data.allergies ?? [];
    this.dietaryRestrictions = data.dietaryRestrictions ?? [];
    // Preferences
    this.servings = data.servings ?? 1;
    this.mealType = data.mealType ?? 'any';
    this.flavorProfiles = data.flavorProfiles ?? ['any'];
    this.cuisineType = data.cuisineType ?? 'any';
    this.cookingMethod = data.cookingMethod ?? 'any';
    this.maxCookingTime = data.maxCookingTime ?? 60;
    this.difficulty = data.difficulty ?? 'any';

    // Custom inputs - validate and sanitize
    this.allergiesCustom = this.sanitizeCustomInputs(data.allergiesCustom ?? []);
    this.dietaryRestrictionsCustom = this.sanitizeCustomInputs(data.dietaryRestrictionsCustom ?? []);
    this.mealTypeCustom = this.sanitizeCustomInput(data.mealTypeCustom ?? '');
    this.flavorProfilesCustom = this.sanitizeCustomInputs(data.flavorProfilesCustom ?? []);
    this.cuisineTypeCustom = this.sanitizeCustomInput(data.cuisineTypeCustom ?? '');
    this.cookingMethodCustom = this.sanitizeCustomInput(data.cookingMethodCustom ?? '');
  }


  /**
   * Sanitize a single custom input string
   * If invalid format, returns empty string
   * Rules: 1-20 characters, letters and spaces only
   */
  private sanitizeCustomInput(input: string): string {
    if (!input) return '';
    
    const trimmed = input.trim();
    const regex = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars
    
    // If invalid, return empty string (silently reject)
    if (!regex.test(trimmed)) return '';
    
    return trimmed;
  }


  /**
   * Sanitize an array of custom inputs
   * Filters out invalid entries
   */
  private sanitizeCustomInputs(inputs: string[]): string[] {
    return inputs
      .map(input => this.sanitizeCustomInput(input))
      .filter(input => input !== '');  // Remove empty strings
  }


  /**
   * Validate the entire request
   */
  validate(): ValidationResult {
    const errors: string[] = [];

    // Basic validations
    if (this.ingredients.length === 0) { errors.push('At least one ingredient is required'); }
    if (this.servings <= 0 || this.servings > MAX_SERVINGS) {
      errors.push('Servings must be between 1 and 12');
      this.servings = Math.min(Math.max(this.servings, 1), MAX_SERVINGS);
    }
    if (this.flavorProfiles.length > 3) {
      errors.push('Maximum 3 flavor profiles allowed');
      // trim to first 3
      this.flavorProfiles = this.flavorProfiles.slice(0, 3);
    }
    if (this.flavorProfiles.includes('any') && this.flavorProfiles.length > 1) {
      errors.push("'any' cannot be combined with other flavors");
      this.flavorProfiles = ['any']; // Auto-correct
    }
    if (this.maxCookingTime < MIN_COOKING_TIME || this.maxCookingTime > MAX_COOKING_TIME) {
      errors.push('Cooking time must be between 10 and 720 minutes');
      // Auto-correct to nearest bound
      this.maxCookingTime = Math.min(Math.max(this.maxCookingTime, MIN_COOKING_TIME), MAX_COOKING_TIME);
    }

    // Check: if 'other' selected but custom field is empty = was sanitized
    if (this.mealType === 'other' && !this.mealTypeCustom) {
      errors.push('Custom meal type required but invalid format provided');
      this.mealType = 'any'; // Auto-correct to default
    }
    if (this.cuisineType === 'other' && !this.cuisineTypeCustom) {
      errors.push('Custom cuisine type required but invalid format provided');
      this.cuisineType = 'any'; // Auto-correct to default
    }
    if (this.cookingMethod === 'other' && !this.cookingMethodCustom) {
      errors.push('Custom cooking method required but invalid format provided');
      this.cookingMethod = 'any'; // Auto-correct to default
    }
    if (this.allergies.includes('other') && this.allergiesCustom.length === 0) {
      errors.push('Custom allergy required but invalid format provided');
      // remove 'other'
      this.allergies = this.allergies.filter(a => a !== 'other');
    }
    if (this.dietaryRestrictions.includes('other') && this.dietaryRestrictionsCustom.length === 0) {
      errors.push('Custom dietary restriction required but invalid format provided');
      // remove 'other'
      this.dietaryRestrictions = this.dietaryRestrictions.filter(d => d !== 'other');
    }
    if (this.flavorProfiles.includes('other') && this.flavorProfilesCustom.length === 0) {
      errors.push('Custom flavor profile required but invalid format provided');
      // remove 'other'
      this.flavorProfiles = this.flavorProfiles.filter(f => f !== 'other');
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }

}