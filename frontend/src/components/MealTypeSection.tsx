/**
 * MealTypeSection.tsx
 * A reusable input component for selecting the type of meal.
 * Allows users to choose from predefined meal types. See MealType in shared module.
 */
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { MealType } from '@pantry2plate/shared';


/**
 * Props for the MealTypeSection component
 */
interface MealTypeSectionProps {
  // Current value of the meal type
  value: MealType;
  // Function parent component provides to handle value changes
  onChange: (value: MealType) => void;
}

/**
 * MealTypeSection Component
 * @param MealTypeSectionProps but as destructured props
 * @returns A dropdown for selecting recipe difficulty
 */
export function MealTypeSection({ value, onChange }: MealTypeSectionProps ) {
  
  return (
    <div className="flex flex-col w-full max-w-32 items-center gap-1.5">
      <Label
        htmlFor="meal-type"
        className="text-base"
      >
        Meal Type
      </Label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as MealType)}
      >
        <SelectTrigger className="w-full max-w-48">
          <SelectValue placeholder="Select a Meal Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Meal Type</SelectLabel>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="breakfast">Breakfast</SelectItem>
            <SelectItem value="lunch">Lunch</SelectItem>
            <SelectItem value="dinner">Dinner</SelectItem>
            <SelectItem value="snack">Snack</SelectItem>
            <SelectItem value="brunch">Brunch</SelectItem>
            <SelectItem value="dessert">Dessert</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
