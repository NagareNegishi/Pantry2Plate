/**
 * AllergiesSection.tsx
 * A reusable input component for selecting the type of allergy.
 * Allows users to choose from predefined allergiess. See Allergy in shared module.
 */
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
// NOTE: Checkbox is a wrapper around Radix UI Checkbox primitive
// https://www.radix-ui.com/primitives/docs/components/checkbox
import { Label } from "@/components/ui/label";
import type { Allergy } from '@pantry2plate/shared';
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars

// List of allergies for dynamic rendering
const ALLERGIES: Allergy[] = [
    'peanuts', 'tree-nuts', 'milk', 'eggs', 'wheat',
    'soy', 'fish', 'shellfish', 'sesame', 'corn',
    'mustard', 'celery', 'sulfites', 'lupin', 'other'
  ];

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
    onCustomChange([...customValue, trimmed]);
    setDisplayCustom('');
    setIsValid(true);
  };

  // When user presses Enter in custom input
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if inside a form
      handleAdd();

      // // display all allergies and custom allergies for debugging
      // console.log("Allergies:", value);
      // console.log("Custom Allergies:", customValue);
    }
  };

  // Reset custom input when switching away from 'other'
  // NOTE: First argument is the code to run, second argument determines when to run it
  useEffect(
    // FIRST ARGUMENT: The effect function
    () => {
      if (value[0] !== 'other') {
        setDisplayCustom('');
        // onCustomChange('');
        
        setIsValid(false);
      }
    },
    // SECOND ARGUMENT: Dependency array
    [value, onCustomChange]);


  const handleToggle = (allergy: Allergy) => {
    if (value.includes(allergy)) {
      onChange(value.filter(a => a !== allergy));
    } else {
      onChange([...value, allergy]);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-40 items-center gap-1.5">

      <Label
        htmlFor="allergy-type"
        className="text-base"
      >
        Allergies
      </Label>

      {/* Checkbox list for allergies */}
      {ALLERGIES.map((allergy) => (
      <div key={allergy} className="flex items-center space-x-2">
        <Checkbox
          id={allergy}
          checked={value.includes(allergy)}
          onCheckedChange={() => handleToggle(allergy)}
        />
        <Label htmlFor={allergy}>{allergy.charAt(0).toUpperCase() + allergy.slice(1).replace('-', ' ')}</Label>
      </div>
      ))}

      {/* custom input only shows if 'other' is selected */}
      {value.includes('other') && (
        <Input
          type="text"
          value={displayCustom}
          onChange={handleChange}
          onBlur={handleAdd}
          onKeyDown={handleEnter}
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




