/**
 * CuisineSection.tsx
 * A reusable input component for selecting the cuisine type.
 * Allows users to choose from predefined cuisine types. See CuisineType in shared module.
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
import type { CuisineType } from '@pantry2plate/shared';
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars

/**
 * Props for the CuisineSection component
 */
interface CuisineSectionProps {
  // Current value of the cuisine type
  value: CuisineType;
  // Function parent component provides to handle value changes
  onChange: (value: CuisineType) => void;
  // If custom cuisine type 'other' is selected
  customValue: string;
  onCustomChange: (value: string) => void;

  // Optional className for styling
  className?: string;
}

/**
 * CuisineSection Component
 * @param CuisineSectionProps but as destructured props
 * @returns A dropdown for selecting recipe cuisine type
 */
export function CuisineSection({ value, onChange, customValue, onCustomChange, className }: CuisineSectionProps ) {
  
  // Local state for the input display (allows any string while typing)
  const [displayCustom, setDisplayCustom] = useState(customValue);
  const [isValid, setIsValid] = useState(false);

  // Handler for custom input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setDisplayCustom(input);
    setIsValid(CUSTOM_REGEX.test(input.trim()));
  };

  // Handler for adding custom cuisine type
  const handleAdd = () => {
    const trimmed = displayCustom.trim();
    // Case invalid format
    if (!CUSTOM_REGEX.test(trimmed)) {
      toast.error("Invalid cuisine type", {
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
  useEffect(
    () => {
      if (value !== 'other') {
        setDisplayCustom('');
        onCustomChange('');
        setIsValid(false);
      }
    },
    [value, onCustomChange]);


  return (
    <div className={cn("flex flex-col w-full max-w-40 items-center gap-1.5", className)}>

      <Label
        htmlFor="cuisine-type"
        className="text-xl whitespace-nowrap"
      >
        Cuisine Type
      </Label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as CuisineType)}
      >
        <SelectTrigger className="w-full max-w-40">
          <SelectValue placeholder="Select a cuisine type" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Cuisine Type</SelectLabel>
            <SelectItem value="any">Any</SelectItem>
            <SelectItem value="Italian">Italian</SelectItem>
            <SelectItem value="Chinese">Chinese</SelectItem>
            <SelectItem value="Mexican">Mexican</SelectItem>
            <SelectItem value="Japanese">Japanese</SelectItem>
            <SelectItem value="Indian">Indian</SelectItem>
            <SelectItem value="Thai">Thai</SelectItem>
            <SelectItem value="French">French</SelectItem>
            <SelectItem value="Mediterranean">Mediterranean</SelectItem>
            <SelectItem value="American">American</SelectItem>
            <SelectItem value="Korean">Korean</SelectItem>
            <SelectItem value="Vietnamese">Vietnamese</SelectItem>
            <SelectItem value="Greek">Greek</SelectItem>
            <SelectItem value="Spanish">Spanish</SelectItem>
            <SelectItem value="Middle Eastern">Middle Eastern</SelectItem>
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
          placeholder="Enter cuisine type"
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
