/**
 * CookingMethodSection.tsx
 * A reusable input component for selecting the type of cooking method.
 * Allows users to choose from predefined cooking method types. See CookingMethod in shared module.
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
import { cn } from "@/lib/utils";
import type { CookingMethod } from '@pantry2plate/shared';
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars

/**
 * Props for the CookingMethodSection component
 */
interface CookingMethodSectionProps {
  // Current value of the cooking method type
  value: CookingMethod;
  // Function parent component provides to handle value changes
  onChange: (value: CookingMethod) => void;
  // If custom cooking method type 'other' is selected
  customValue: string;
  onCustomChange: (value: string) => void;

  // Optional className for styling
  className?: string;
}

/**
 * CookingMethodSection Component
 * @param CookingMethodSectionProps but as destructured props
 * @returns A dropdown for selecting recipe cooking method type
 */
export function CookingMethodSection({ value, onChange, customValue, onCustomChange, className }: CookingMethodSectionProps ) {
  
  // Local state for the input display (allows any string while typing)
  const [displayCustom, setDisplayCustom] = useState(customValue);
  const [isValid, setIsValid] = useState(false);

  // Handler for custom input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setDisplayCustom(input);
    setIsValid(CUSTOM_REGEX.test(input.trim()));
  };

  // Handler for adding custom cooking method type
  const handleAdd = () => {
    const trimmed = displayCustom.trim();
    // Case invalid format
    if (!CUSTOM_REGEX.test(trimmed)) {
      toast.error("Invalid cooking method", {
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
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if inside a form
      handleAdd();
    }
  };

  // Reset custom input when switching away from 'other'
  // NOTE: First argument is the code to run, second argument determines when to run it
  useEffect(
    // FIRST ARGUMENT: The effect function
    () => {
      if (value !== 'other') {
        setDisplayCustom('');
        onCustomChange('');
        setIsValid(false);
      }
    },
    // SECOND ARGUMENT: Dependency array
    [value, onCustomChange]);


  return (
    <div className={cn("flex flex-col w-full max-w-40 items-center gap-1.5", className)}>

      <Label
        htmlFor="cooking-method"
        className="text-base"
      >
        Cooking Method
      </Label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as CookingMethod)}
      >
        <SelectTrigger className="w-full max-w-40">
          <SelectValue placeholder="Select a cooking method" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cooking Method</SelectLabel>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="bake">Bake</SelectItem>
            <SelectItem value="deep-fry">Deep-Fry</SelectItem>
            <SelectItem value="grill">Grill</SelectItem>
            <SelectItem value="steam">Steam</SelectItem>
            <SelectItem value="boil">Boil</SelectItem>
            <SelectItem value="roast">Roast</SelectItem>
            <SelectItem value="slow-cook">Slow-Cook</SelectItem>
            <SelectItem value="stir-fry">Stir-Fry</SelectItem>
            <SelectItem value="sauté">Sauté</SelectItem>
            <SelectItem value="broil">Broil</SelectItem>
            <SelectItem value="raw">Raw</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      {/* custom input only shows if 'other' is selected */}
      {value === 'other' && (
        <Input
          type="text"
          value={displayCustom}
          onChange={handleChange}
          onBlur={handleAdd}
          onKeyDown={handleEnter}
          placeholder="Enter cooking method"
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
