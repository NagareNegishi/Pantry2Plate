/**
 * CookingTimeInput.tsx
 * A reusable input component for selecting the cooking time in minutes.
 * Allows users to input a number between 10 and 720.
 */
import { Input } from "@/components/ui/input"; // @/ is an alias to src/
import { Label } from "@/components/ui/label";


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

  // Handler for input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value, 10);
    
    // Enforce min/max constraints
    if (newValue >= 10 && newValue <= 720) {
      onChange(newValue);
    }
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="cookingTime">Cooking Time</Label>
      <Input
        id="cookingTime"
        type="number"
        min={10}
        max={720}
        step={5}
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}