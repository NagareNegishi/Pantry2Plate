/**
 * MealTypeSection.tsx
 * A reusable input component for selecting the type of meal.
 * Allows users to choose from predefined meal types. See MealType in shared module.
 */
import { Input } from "@/components/ui/input";
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
import { useState } from "react";
import { toast } from "sonner";

const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars

/**
 * Props for the MealTypeSection component
 */
interface MealTypeSectionProps {
  // Current value of the meal type
  value: MealType;
  // Function parent component provides to handle value changes
  onChange: (value: MealType) => void;
  // If custom meal type 'other' is selected
  customValue: string;
  onCustomChange: (value: string) => void;
}

/**
 * MealTypeSection Component
 * @param MealTypeSectionProps but as destructured props
 * @returns A dropdown for selecting recipe difficulty
 */
export function MealTypeSection({ value, onChange, customValue, onCustomChange }: MealTypeSectionProps ) {
  
  // Local state for the input display (allows any string while typing)
  const [displayCustom, setDisplayCustom] = useState(customValue);
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setDisplayCustom(input);
    setIsValid(CUSTOM_REGEX.test(input.trim()));
  };



  const handleAdd = () => {
    const trimmed = displayCustom.trim();
    // Case invalid format
    if (!CUSTOM_REGEX.test(trimmed)) {
      toast.error("Invalid meal type", {
        description: "Use only letters, spaces, and hyphens (1-20 characters)",
      });
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    onCustomChange(trimmed);
    setIsValid(true);
  };

  // When user presses Enter in custom input
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if inside a form
      handleAdd();
    }
  };


  return (
    <div className="flex flex-col w-full max-w-40 items-center gap-1.5">
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

      {value === 'other' && (
        <Input
          type="text"
          value={displayCustom}
          onChange={handleChange}
          onBlur={handleAdd}
          onKeyDown={handleKeyDown}
          placeholder="Enter meal type"
          maxLength={20}
          className={
            isValid === true
              ? 'border-green-500 focus-visible:ring-green-500'
              : 'border-red-400 placeholder:text-red-300 focus-visible:ring-red-400'
          }
        />
      )}


    </div>
  );
}
