/**
 * Recipe Storage Service
 * Manages saving, retrieving, and deleting recipes in local storage.
 * Enforces a maximum limit of saved recipes to prevent overflow.
 */
import type { MenuItem } from '@pantry2plate/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'savedRecipes';
const MAX_SAVED_RECIPES = 20;

export interface SavedRecipe extends MenuItem {
  id: string; // Unique ID
  savedAt: number; // Timestamp
}


/**
 * Generate unique ID for saved recipes
 * Format: timestamp_random (e.g., "1707584937234_abc1x3f")
 */
const generateUniqueId = (): string => {
  const timestamp = Date.now();
  // Base-36 random string (index 2 to skip "0.")
  const random = Math.random().toString(36).substring(2, 9);
  return `${timestamp}_${random}`;
};


// Core CRUD operations
/**
 * Save a recipe to local storage
 * Validates against max limit before saving.
 * @param recipe MenuItem object to save
 * @throws Error if storage limit reached or save fails
 */
export const saveRecipe = async (recipe: MenuItem): Promise<void> => {
  try {
    const existingRecipes = await getAllRecipes();
    if (existingRecipes.length >= MAX_SAVED_RECIPES) {
      throw new Error(`Recipe limit reached (${MAX_SAVED_RECIPES} max). Please delete some recipes.`);
    }
    const newRecipe: SavedRecipe = {
      ...recipe,
      id: generateUniqueId(),
      savedAt: Date.now(),
    };
    const updatedRecipes = [...existingRecipes, newRecipe];
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
  } catch (error) {
    console.error('Error saving recipe:', error);
    if (error instanceof Error && error.message.includes('Failed to load')) {
      throw new Error('Failed to save recipe - could not verify storage');
    }
    throw error;
  }
};


/**
 * Get all saved recipes
 * Returns an array of SavedRecipe objects, or empty array if none saved.
 * @throws Error if retrieval fails
 */
export const getAllRecipes = async (): Promise<SavedRecipe[]> => {
  try {
    const data = await AsyncStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error loading recipes:', error);
    throw new Error('Failed to load saved recipes');
  }
};


/**
 * Delete a saved recipe by ID
 * @param id Unique ID of the recipe to delete
 * @throws Error if delete operation fails
 */
export const deleteRecipe = async (id: string): Promise<void> => {
  try {
    const existingRecipes = await getAllRecipes();
    const updatedRecipes = existingRecipes.filter(recipe => recipe.id !== id);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecipes));
  } catch (error) {
    console.error('Error deleting recipe:', error);
    throw new Error('Failed to delete recipe');
  }
};




// isRecipeSaved(id) → Check if recipe exists

// // Utility functions
// getRecipeCount() → How many saved?
// hasReachedLimit() → At max limit?
// clearAllRecipes() → Delete everything (maybe for settings)

// // Optional advanced
// updateRecipe(id, recipe) → Edit saved recipe (future feature?)