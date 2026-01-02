// shared/src/MenuItem.ts
import {
  Difficulty,
} from './enums';

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
 * Validation result
 */
export interface ValidationResult {
  valid: boolean;
  errors: string[];
}


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
    this.servings = data.servings ?? 1;
    this.cookingTime = data.cookingTime ?? 0;
    this.difficulty = data.difficulty ?? 'any';
    this.ingredients = data.ingredients ?? [];
    this.instructions = data.instructions ?? [];
  }

  /**
   * Validate that all required fields are present and valid
   */
  validate(): ValidationResult {
    const errors: string[] = [];

    return {
      valid: errors.length === 0,
      errors
    };
  }
}