/**
 * CookingTimeInput.tsx
 * A reusable input component for selecting the cooking time in minutes.
 * Allows users to input a number between 10 and 720.
 */
import { Input } from "@/components/ui/input"; // @/ is an alias to src/
import { Label } from "@/components/ui/label";
import { MAX_COOKING_TIME, MIN_COOKING_TIME } from '@pantry2plate/shared';
import { useState } from "react";


/**
 * Props for the CookingTimeInput component.
 */
interface CookingTimeInputProps {
  // Current value of the cooking time input
  value: number;
  // Function parent component provides to handle value changes
  onChange: (value: number) => void;
}

/**
 * CookingTimeInput Component
 * @param CookingTimeInputProps but as destructured props
 * @returns A number input field for selecting cooking time between 10 and 720 minutes
 */
export function CookingTimeInput({ value, onChange }: CookingTimeInputProps) {

  // Local state for the input display (allows any string while typing)
  const [displayValue, setDisplayValue] = useState(value.toString());

  // Handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setDisplayValue(inputValue);  // Update display immediately (no validation)

    // Try to parse -> update
    if (inputValue === '') return; // Allow empty input (user clearing field)
    const newValue = parseInt(inputValue, 10);
    if (!isNaN(newValue) && newValue >= MIN_COOKING_TIME && newValue <= MAX_COOKING_TIME) {
      onChange(newValue);
    }
  };

  // When user leaves input, enforce valid value
  const handleBlur = () => {
    const num = parseInt(displayValue, 10);
    if (isNaN(num) || displayValue === '') { // Empty or invalid → reset to minimum
      setDisplayValue(MIN_COOKING_TIME.toString());
      onChange(MIN_COOKING_TIME);
    } else if (num < MIN_COOKING_TIME) { // Too low → set to minimum
      setDisplayValue(MIN_COOKING_TIME.toString());
      onChange(MIN_COOKING_TIME);
    } else if (num > MAX_COOKING_TIME) { // Too high → set to maximum
      setDisplayValue(MAX_COOKING_TIME.toString());
      onChange(MAX_COOKING_TIME);
    } else { // Valid → just ensure display matches
      setDisplayValue(num.toString());
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="cookingTime">Cooking Time</Label>
      <Input
        id="cookingTime"
        type="number"
        min={MIN_COOKING_TIME}
        max={MAX_COOKING_TIME}
        step={5}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}