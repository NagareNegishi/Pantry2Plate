/**
 * ServingsInput.tsx
 * A reusable input component for selecting the number of servings.
 * Allows users to input a number between 1 and 12.
 */
import { Input } from "@/components/ui/input"; // @/ is an alias to src/
import { Label } from "@/components/ui/label";
import { MAX_SERVINGS, MIN_SERVINGS } from '@pantry2plate/shared';
import { useState } from "react";

/**
 * Props for the ServingsInput component.
 */
interface ServingsInputProps {
  // Current value of the servings input
  value: number;
  // Function parent component provides to handle value changes
  onChange: (value: number) => void;
}

/**
 * ServingsInput Component
 * @param ServingsInputProps but as destructured props
 * @returns A number input field for selecting servings between 1 and 12
 */
export function ServingsInput({ value, onChange }: ServingsInputProps) {

  // Local state for the input display (allows any string while typing)
  const [displayValue, setDisplayValue] = useState(value.toString());

  // Handler for input changes, React.ChangeEvent is a TypeScript generic type from React for event handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value; // e.target.value is always a string
    setDisplayValue(inputValue);  // Update display immediately (no validation)

    // Try to parse -> update
    if (inputValue === '') return; // Allow empty input (user clearing field)
    const newValue = parseInt(inputValue, 10); // Convert input string to number
    if (!isNaN(newValue) && newValue >= MIN_SERVINGS && newValue <= MAX_SERVINGS) {
      onChange(newValue);
    }
  };

  // When user leaves input, enforce valid value
  const handleBlur = () => {
    const num = parseInt(displayValue, 10);
    if (isNaN(num) || displayValue === '') { // Empty or invalid → reset to minimum
      setDisplayValue(MIN_SERVINGS.toString());
      onChange(MIN_SERVINGS);
    } else if (num < MIN_SERVINGS) { // Too low → set to minimum
      setDisplayValue(MIN_SERVINGS.toString());
      onChange(MIN_SERVINGS);
    } else if (num > MAX_SERVINGS) { // Too high → set to maximum
      setDisplayValue(MAX_SERVINGS.toString());
      onChange(MAX_SERVINGS);
    } else { // Valid → just ensure display matches
      setDisplayValue(num.toString());
    }
  };

  return (
    // <div className="grid w-full max-w-24 items-center gap-1.5"> // left aligned
    <div className="flex flex-col w-full max-w-24 items-center gap-1.5">
      <Label
        htmlFor="servings"
        className="text-lg"
      >
        Servings
      </Label>
      <Input
        id="servings"
        type="number"
        min={1}
        max={12}
        value={displayValue}
        onChange={handleChange}
        onBlur={handleBlur}
      />
    </div>
  );
}


// NOTE: Example structure of the event object in the handleChange function

// const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//   // Event object structure:
  
//   e.target              // The <input> element that triggered the event
//   e.target.value        // Current value (always a STRING)
//   e.target.min          // Min attribute value
//   e.target.max          // Max attribute value
//   e.target.type         // "number"
//   e.target.id           // "servings"
  
//   e.currentTarget       // Same as target (the element with the event listener)
//   e.preventDefault()    // Prevent default behavior
//   e.stopPropagation()   // Stop event bubbling
  
//   // And many more properties...
// }