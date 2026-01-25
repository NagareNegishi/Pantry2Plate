/**
 * AdvancedSection.tsx
 * Collection of advanced input components for recipe parameters.
 * Receives state and setters from parent component (App.tsx).
 */
import type { Allergy, CookingMethod, CuisineType, DietaryRestriction, MealType } from '@pantry2plate/shared';
import { AllergiesSection } from './AllergiesSection';
import { CookingMethodSection } from './CookingMethodSection';
import { CuisineSection } from './CuisineSection';
import { DietaryRestrictionsSection } from './DietaryRestrictionsSection';
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



  // Allergies
  allergies: Allergy[];
  setAllergies: (value: Allergy[]) => void;
  customAllergies: string[];
  setCustomAllergies: (value: string[]) => void;
  // Dietary restrictions
  dietaryRestrictions: DietaryRestriction[];
  setDietaryRestrictions: (value: DietaryRestriction[]) => void;
  customDietaryRestrictions: string[];
  setCustomDietaryRestrictions: (value: string[]) => void;
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
  setCustomCookingMethod,

  
  allergies,
  setAllergies,
  customAllergies,
  setCustomAllergies,
  dietaryRestrictions,
  setDietaryRestrictions,
  customDietaryRestrictions,
  setCustomDietaryRestrictions,
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


      <AllergiesSection
        value={allergies}
        onChange={setAllergies}
        customValue={customAllergies}
        onCustomChange={setCustomAllergies}
      />
      <DietaryRestrictionsSection
        value={dietaryRestrictions}
        onChange={setDietaryRestrictions}
        customValue={customDietaryRestrictions}
        onCustomChange={setCustomDietaryRestrictions}
      />
    </div>
  );
}