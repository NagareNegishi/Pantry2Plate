/**
 * AllergiesSection.tsx
 * A reusable input component for selecting the type of allergy.
 * Allows users to choose from predefined allergiess. See Allergy in shared module.
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
import type { Allergy } from '@pantry2plate/shared';
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars

/**
 * Props for the AllergiesSection component
 */
interface AllergiesSectionProps {
  // Current value of the allergies
  value: Allergy[];
  // Function parent component provides to handle value changes
  onChange: (value: Allergy[]) => void;
  // If custom allergies 'other' is selected
  customValue: string[];
  onCustomChange: (value: string[]) => void;
}

/**
 * AllergiesSection Component
 * @param AllergiesSectionProps but as destructured props
 * @returns A dropdown for selecting recipe allergies
 */
export function AllergiesSection({ value, onChange, customValue, onCustomChange }: AllergiesSectionProps ) {
  
  // Local state for the input display (allows any string while typing)
  const [displayCustom, setDisplayCustom] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Handler for custom input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setDisplayCustom(input);
    setIsValid(CUSTOM_REGEX.test(input.trim()));
  };

  // Handler for adding custom allergies
  const handleAdd = () => {
    const trimmed = displayCustom.trim();
    // Case invalid format
    if (!CUSTOM_REGEX.test(trimmed)) {
      toast.error("Invalid allergies", {
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
    <div className="flex flex-col w-full max-w-40 items-center gap-1.5">

      <Label
        htmlFor="allergy-type"
        className="text-base"
      >
        Allergies
      </Label>
      <Select
        value={value}
        onValueChange={(value) => onChange(value as Allergy)}
      >
        <SelectTrigger className="w-full max-w-40">
          <SelectValue placeholder="Select a Allergies" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Allergies</SelectLabel>
            <SelectItem value="peanuts">Peanuts</SelectItem>
            <SelectItem value="tree-nuts">Tree Nuts</SelectItem>
            <SelectItem value="milk">Milk</SelectItem>
            <SelectItem value="eggs">Eggs</SelectItem>
            <SelectItem value="wheat">Wheat</SelectItem>
            <SelectItem value="soy">Soy</SelectItem>
            <SelectItem value="fish">Fish</SelectItem>
            <SelectItem value="shellfish">Shellfish</SelectItem>
            <SelectItem value="sesame">Sesame</SelectItem>
            <SelectItem value="corn">Corn</SelectItem>
            <SelectItem value="mustard">Mustard</SelectItem>
            <SelectItem value="celery">Celery</SelectItem>
            <SelectItem value="sulfites">Sulfites</SelectItem>
            <SelectItem value="lupin">Lupin</SelectItem>
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
          onKeyDown={handleKeyDown}
          placeholder="Enter allergies"
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
