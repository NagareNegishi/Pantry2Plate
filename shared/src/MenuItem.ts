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