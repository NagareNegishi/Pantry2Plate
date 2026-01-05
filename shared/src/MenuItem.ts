// shared/src/MenuItem.ts

import { Difficulty } from './enums';
import { ValidationResult } from './types';

/**
 * Menu item response from backend
 * All fields are required - recipes are always complete.
 */
export interface MenuItem {
  /** Recipe name/title */
  name: string;
  
  /** Brief description (1-2 sentences) */
  description: string;
  
  /** Number of servings this recipe makes */
  servings: number;
  
  /** Total cooking time in minutes */
  cookingTime: number;
  
  /** Recipe difficulty */
  difficulty: Difficulty;
  
  /**
   * List of ingredients with amounts
   * Format: "2 cups rice" or "1 large onion, diced"
   */
  ingredients: string[];
  
  /**
   * Step-by-step cooking instructions
   * Each string is one step
   */
  instructions: string[];
}


/**
 * Define min and max cooking time in minutes
 */
export const MIN_COOKING_TIME = 10;
export const MAX_COOKING_TIME = 720;


/**
 * MenuItem implementation with validation
 */
export class MenuItemImpl implements MenuItem {
  name: string;
  description: string;
  servings: number;
  cookingTime: number;
  difficulty: Difficulty;
  ingredients: string[];
  instructions: string[];


  constructor(data: Partial<MenuItem>) {
    this.name = data.name ?? 'Invalid';
    this.description = data.description ?? 'No description provided.';
    this.servings = data.servings ?? 0;
    this.cookingTime = data.cookingTime ?? 0;
    this.difficulty = data.difficulty ?? 'any';
    this.ingredients = data.ingredients ?? [];
    this.instructions = data.instructions ?? [];
  }

  /**
   * Validate that all required fields are present and valid
   * Some invalid fields are auto-corrected with defaults
   * if recipe name, ingredients, instructions are missing, this MenuItem is invalid
   */
  validate(): ValidationResult {
    const errors: string[] = [];

    if (this.name === 'Invalid') { errors.push('Recipe name is missing.'); }
    if (this.description === 'No description provided.') { errors.push('Recipe description is missing.'); }
    if (this.servings <= 0) {
      errors.push('Servings must be greater than zero.');
      this.servings = 1; // Default to 1
    }

    if (this.cookingTime < MIN_COOKING_TIME || this.cookingTime > MAX_COOKING_TIME) {
      errors.push('Cooking time must be between 10 and 720 minutes');
      // Auto-correct to nearest bound
      this.cookingTime = Math.min(Math.max(this.cookingTime, MIN_COOKING_TIME), MAX_COOKING_TIME);
    }

    if (this.difficulty === 'any') {
      errors.push('Recipe difficulty is not specified.');
    }
    if (this.ingredients.length === 0) {
      errors.push('Ingredients list is empty.');
      this.name = 'Invalid'; // Mark as invalid
    }
    if (this.instructions.length === 0) {
      errors.push('Instructions list is empty.');
      this.name = 'Invalid'; // Mark as invalid
    }

    return {
      valid: errors.length === 0,
      errors
    };
  }
}