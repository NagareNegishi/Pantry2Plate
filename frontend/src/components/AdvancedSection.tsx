/**
 * AdvancedSection.tsx
 * Collection of advanced input components for recipe parameters.
 * Receives state and setters from parent component (App.tsx).
 */
import type { CookingMethod, CuisineType, MealType } from '@pantry2plate/shared';
import { CookingMethodSection } from './CookingMethodSection';
import { CuisineSection } from './CuisineSection';
import { MealTypeSection } from './MealTypeSection';


/**
 * Props for the AdvancedSection component.
 */
interface AdvancedSectionProps {
  // Meal type
  mealType: MealType;
  setMealType: (value: MealType) => void;
  customMealType: string;
  setCustomMealType: (value: string) => void;
  // Cuisine type
  cuisineType: CuisineType;
  setCuisineType: (value: CuisineType) => void;
  customCuisineType: string;
  setCustomCuisineType: (value: string) => void;
  // Cooking method
  cookingMethod: CookingMethod;
  setCookingMethod: (value: CookingMethod) => void;
  customCookingMethod: string;
  setCustomCookingMethod: (value: string) => void;
}


/**
 * AdvancedSection Component
 * @param AdvancedSectionProps as destructured props
 * @returns A collection of input components for recipe parameters
 */
export function AdvancedSection({
  mealType,
  setMealType,
  customMealType,
  setCustomMealType,
  cuisineType,
  setCuisineType,
  customCuisineType,
  setCustomCuisineType,
  cookingMethod,
  setCookingMethod,
  customCookingMethod,
  setCustomCookingMethod
}: AdvancedSectionProps) {
  return (
    <div className="space-y-4">
      <MealTypeSection
        value={mealType}
        onChange={setMealType}
        customValue={customMealType}
        onCustomChange={setCustomMealType}
      />
      <CuisineSection
        value={cuisineType}
        onChange={setCuisineType}
        customValue={customCuisineType}
        onCustomChange={setCustomCuisineType}
      />
      <CookingMethodSection
        value={cookingMethod}
        onChange={setCookingMethod}
        customValue={customCookingMethod}
        onCustomChange={setCustomCookingMethod}
      />
    </div>
  );
}