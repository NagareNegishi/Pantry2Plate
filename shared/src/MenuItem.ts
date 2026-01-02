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
    // Validate and assign required fields
    // Throw error if any field is missing or invalid
  }

  /**
   * Validate that all required fields are present and valid
   */
  validate(): ValidationResult {
    // Check all fields are present and non-empty
  }
}