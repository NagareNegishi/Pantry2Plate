/**
 * AdvancedSection.tsx
 * Collection of advanced input components for recipe parameters.
 * Receives state and setters from parent component (App.tsx).
 */
import type { MealType } from '@pantry2plate/shared';
import { MealTypeSection } from './MealTypeSection';


/**
 * Props for the AdvancedSection component.
 */
interface AdvancedSectionProps {
  mealType: MealType;
  setMealType: (value: MealType) => void;
  customMealType: string;
  setCustomMealType: (value: string) => void;
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
  setCustomMealType
}: AdvancedSectionProps) {
  return (
    <div className="space-y-4">
      <MealTypeSection
        value={mealType}
        onChange={setMealType}
        customValue={customMealType}
        onCustomChange={setCustomMealType}
      />
    </div>
  );
}