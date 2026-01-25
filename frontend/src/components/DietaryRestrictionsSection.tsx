/**
 * DietaryRestrictionsSection.tsx
 * A reusable input component for selecting the type of dietary restriction.
 * Allows users to choose from predefined dietary restrictions. See DietaryRestriction in shared module.
 */
import { Checkbox } from "@/components/ui/checkbox";
// NOTE: Checkbox is a wrapper around Radix UI Checkbox primitive
// https://www.radix-ui.com/primitives/docs/components/checkbox
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { DietaryRestriction } from '@pantry2plate/shared';
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars
const MAX_CUSTOM_DIETARY_RESTRICTIONS = 3; // arbitrary limit to prevent abuse
// List of dietary restrictions for dynamic rendering
const DIETARY_RESTRICTIONS: DietaryRestriction[] = [
    'vegetarian', 'vegan', 'gluten-free', 'dairy-free',
    'nut-free', 'shellfish-free', 'halal', 'kosher',
    'keto', 'paleo', 'low-carb', 'low-fat', 'other'
  ];

/**
 * Props for the DietaryRestrictionsSection component
 */
interface DietaryRestrictionsSectionProps {
  // Current value of the dietary restrictions
  value: DietaryRestriction[];
  // Function parent component provides to handle value changes
  onChange: (value: DietaryRestriction[]) => void;
  // If custom dietary restrictions 'other' is selected
  customValue: string[];
  onCustomChange: (value: string[]) => void;
}

/**
 * DietaryRestrictionsSection Component
 * @param DietaryRestrictionsSectionProps but as destructured props
 * @returns A dropdown for selecting recipe dietary restrictions
 */
export function DietaryRestrictionsSection({ value, onChange, customValue, onCustomChange }: DietaryRestrictionsSectionProps ) {
  
  // Local state for the input display (allows any string while typing)
  const [displayCustom, setDisplayCustom] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Handler for custom input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setDisplayCustom(input);
    setIsValid(CUSTOM_REGEX.test(input.trim()));
  };

  // Handler for adding custom dietary restrictions
  const handleCustomAdd = () => {
    const trimmed = displayCustom.trim();
    // Case invalid format
    if (!CUSTOM_REGEX.test(trimmed)) {
      toast.error("Invalid dietary restriction", {
        description: "Use only letters, spaces, and hyphens (1-20 characters)",
      });
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    const normalized = trimmed.toLowerCase().replace(/\s+/g, '-');
    // Case duplicate
    if (customValue.includes(normalized)) {
      toast.error("Duplicate dietary restriction", {
        description: `"${normalized}" is already in the list`,
      });
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    // Case conflict with predefined dietary restrictions
    if (DIETARY_RESTRICTIONS.includes(normalized as DietaryRestriction)) {
      // auto-select instead of error
      if (!value.includes(normalized as DietaryRestriction)) {
        onChange([...value, normalized as DietaryRestriction]);
        toast.success("Selected predefined dietary restriction", {
          description: `"${trimmed}" has been selected from predefined options`,
        });
      } else {
        toast.info("Already selected", {
          description: `"${trimmed}" is already checked`,
        });
      }
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    // Case max reached
    if (customValue.length >= MAX_CUSTOM_DIETARY_RESTRICTIONS) {
      toast.error("Maximum reached", {
        description: `You can only add up to ${MAX_CUSTOM_DIETARY_RESTRICTIONS} custom dietary restrictions`,
      });
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    onCustomChange([...customValue, normalized]);
    setDisplayCustom('');
    setIsValid(true);
  };

  // When user presses Enter in custom input
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form submission if inside a form
      handleCustomAdd();
    }
  };

  // Reset custom input when switching away from 'other'
  // NOTE: First argument is the code to run, second argument determines when to run it
  useEffect(
    // FIRST ARGUMENT: The effect function
    () => {
      if (!value.includes('other')) {
        setDisplayCustom('');
        setIsValid(false);
        // do not clear already added custom dietary restrictions
      }
    },
    // SECOND ARGUMENT: Dependency array
    [value, onCustomChange]);


  const handleToggle = (restriction: DietaryRestriction) => {
    if (value.includes(restriction)) {
      onChange(value.filter(a => a !== restriction));
    } else {
      onChange([...value, restriction]);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-54 gap-1.5">

      <Accordion type="single" collapsible>
        <AccordionItem value="dietary restrictions">
          
          <AccordionTrigger className="text-base">
            <span className="flex-grow text-center">Dietary Restrictions</span>
          </AccordionTrigger>

          <AccordionContent className="px-1">
            {/* Checkbox list for dietary restrictions */}
            {DIETARY_RESTRICTIONS.map((restriction) => (
            <div key={restriction} className="flex space-x-2">
              <Checkbox
                id={restriction}
                checked={value.includes(restriction)}
                onCheckedChange={() => handleToggle(restriction)}
              />
              <Label
                htmlFor={restriction}
                className="text-sm"
                >
                  {restriction.charAt(0).toUpperCase() + restriction.slice(1).replace('-', ' ')}
              </Label>
            </div>
            ))}

            {/* custom input only shows if 'other' is selected */}
            {value.includes('other') && (
              <Input
                type="text"
                value={displayCustom}
                onChange={handleChange}
                onBlur={handleCustomAdd}
                onKeyDown={handleEnter}
                placeholder="Enter dietary restrictions"
                maxLength={20}
                className={
                  isValid === true
                    ? 'border-green-500 focus-visible:ring-green-500'
                    : 'border-red-400 placeholder:text-red-300 focus-visible:ring-red-400'
                }
              />
            )}
          </AccordionContent>

          {/* Display selected dietary restrictions as badges */}
          {(value.length > 0 || customValue.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {/* Predefined dietary restrictions */}
              {value.filter(a => a !== 'other').map((restriction) => (
                <div key={restriction} className="relative group">
                  <Badge
                    variant="secondary"
                    className="px-6 py-1.5 text-sm"
                  >
                    <span>{restriction}</span>
                  </Badge>
                  <Button
                    onClick={() => handleToggle(restriction)}
                    size="icon"
                    variant="ghost"
                    // Show delete icon only on hover
                    className="absolute right-0 h-full w-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-destructive/10 hover:bg-destructive/20"
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              ))}
              
              {/* Custom dietary restrictions */}
              {customValue.map((restriction) => (
                <div key={restriction} className="relative group">
                  <Badge
                    variant="secondary"
                    className="px-6 py-1.5 text-sm"
                  >
                    <span>{restriction}</span>
                  </Badge>
                  <Button
                    onClick={() => {
                      const newCustom = customValue.filter((_, i) => i !== customValue.indexOf(restriction));
                      onCustomChange(newCustom);
                    }}
                    size="icon"
                    variant="ghost"
                    // Show delete icon only on hover
                    className="absolute right-0 h-full w-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-destructive/10 hover:bg-destructive/20"
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </AccordionItem>
      </Accordion>

    </div>
  );
}
