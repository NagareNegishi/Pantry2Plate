/**
 * AdvancedSection.tsx
 * Collection of advanced input components for recipe parameters.
 * Receives state and setters from parent component (App.tsx).
 */
import type { CuisineType, MealType } from '@pantry2plate/shared';
import { CuisineSection } from './CuisineSection';
import { MealTypeSection } from './MealTypeSection';


/**
 * Props for the AdvancedSection component.
 */
interface AdvancedSectionProps {
  mealType: MealType;
  setMealType: (value: MealType) => void;
  customMealType: string;
  setCustomMealType: (value: string) => void;
  cuisineType: CuisineType;
  setCuisineType: (value: CuisineType) => void;
  customCuisineType: string;
  setCustomCuisineType: (value: string) => void;
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
  setCustomCuisineType
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
    </div>
  );
}