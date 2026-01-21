/**
 * ServingsInput.tsx
 * A reusable input component for selecting the number of servings.
 * Allows users to input a number between 1 and 12.
 */
import { Input } from "@/components/ui/input"; // @/ is an alias to src/
import { Label } from "@/components/ui/label";


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

  // Handler for input changes
  // React.ChangeEvent is a TypeScript generic type from React for event handling
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10); // Convert input string to number (e.target.value is always a string)
    
    // Enforce min/max constraints
    if (newValue >= 1 && newValue <= 12) {
      onChange(newValue);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="servings">Servings</Label>
      <Input
        id="servings"
        type="number"
        min={1}
        max={12}
        value={value}
        onChange={handleChange}
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