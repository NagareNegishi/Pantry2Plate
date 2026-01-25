/**
 * FlavorProfilesSection.tsx
 * A reusable input component for selecting the type of flavor profiles.
 * Allows users to choose from predefined flavor profiles. See FlavorProfile in shared module.
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
import type { FlavorProfile } from '@pantry2plate/shared';
import { Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars
const MAX_CUSTOM_FLAVOR_PROFILES = 5; // arbitrary limit to prevent abuse
// List of flavor profiles for dynamic rendering
const FLAVOR_PROFILES: FlavorProfile[] = [
    'sweet', 'spicy', 'savory', 'sour', 'umami', 'bitter', 'other'
  ];
  // how to treat 'any'?

/**
 * Props for the FlavorProfilesSection component
 */
interface FlavorProfilesSectionProps {
  // Current value of the flavor profiles
  value: FlavorProfile[];
  // Function parent component provides to handle value changes
  onChange: (value: FlavorProfile[]) => void;
  // If custom flavor profiles 'other' is selected
  customValue: string[];
  onCustomChange: (value: string[]) => void;
}

/**
 * FlavorProfilesSection Component
 * @param FlavorProfilesSectionProps but as destructured props
 * @returns A dropdown for selecting recipe flavor profiles
 */
export function FlavorProfilesSection({ value, onChange, customValue, onCustomChange }: FlavorProfilesSectionProps ) {
  
  // Local state for the input display (allows any string while typing)
  const [displayCustom, setDisplayCustom] = useState('');
  const [isValid, setIsValid] = useState(false);

  // Handler for custom input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value;
    setDisplayCustom(input);
    setIsValid(CUSTOM_REGEX.test(input.trim()));
  };

  // Handler for adding custom flavor profiles
  const handleCustomAdd = () => {
    const trimmed = displayCustom.trim();
    // Case invalid format
    if (!CUSTOM_REGEX.test(trimmed)) {
      toast.error("Invalid flavor profiles", {
        description: "Use only letters, spaces, and hyphens (1-20 characters)",
      });
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    const normalized = trimmed.toLowerCase().replace(/\s+/g, '-');
    // Case duplicate
    if (customValue.includes(normalized)) {
      toast.error("Duplicate flavor profiles", {
        description: `"${normalized}" is already in the list`,
      });
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    // Case conflict with predefined flavor profiles
    if (FLAVOR_PROFILES.includes(normalized as FlavorProfile)) {
      // auto-select instead of error
      if (!value.includes(normalized as FlavorProfile)) {
        onChange([...value, normalized as FlavorProfile]);
        toast.success("Selected predefined flavor profiles", {
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
    if (customValue.length >= MAX_CUSTOM_FLAVOR_PROFILES) {
      toast.error("Maximum reached", {
        description: `You can only add up to ${MAX_CUSTOM_FLAVOR_PROFILES} custom flavor profiles`,
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
        // do not clear already added custom flavor profiles
      }
    },
    // SECOND ARGUMENT: Dependency array
    [value, onCustomChange]);


  const handleToggle = (flavor: FlavorProfile) => {
    if (value.includes(flavor)) {
      onChange(value.filter(a => a !== flavor));
    } else {
      onChange([...value, flavor]);
    }
  }

  return (
    <div className="flex flex-col w-full max-w-54 gap-1.5">

      <Accordion type="single" collapsible>
        <AccordionItem value="flavor profiles">
          
          <AccordionTrigger className="text-base">
            <span className="flex-grow text-center">Allergies</span>
          </AccordionTrigger>

          <AccordionContent className="px-1">
            {/* Checkbox list for flavor profiles */}
            {FLAVOR_PROFILES.map((flavor) => (
            <div key={flavor} className="flex space-x-2">
              <Checkbox
                id={flavor}
                checked={value.includes(flavor)}
                onCheckedChange={() => handleToggle(flavor)}
              />
              <Label
                htmlFor={flavor}
                className="text-sm"
                >
                  {flavor.charAt(0).toUpperCase() + flavor.slice(1).replace('-', ' ')}
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
                placeholder="Enter flavor profiles"
                maxLength={20}
                className={
                  isValid === true
                    ? 'border-green-500 focus-visible:ring-green-500'
                    : 'border-red-400 placeholder:text-red-300 focus-visible:ring-red-400'
                }
              />
            )}
          </AccordionContent>

          {/* Display selected flavor profiles as badges */}
          {(value.length > 0 || customValue.length > 0) && (
            <div className="flex flex-wrap gap-2 mt-2">
              {/* Predefined flavor profiles */}
              {value.filter(a => a !== 'other').map((flavor) => (
                <div key={flavor} className="relative group">
                  <Badge
                    variant="secondary"
                    className="px-6 py-1.5 text-sm"
                  >
                    <span>{flavor}</span>
                  </Badge>
                  <Button
                    onClick={() => handleToggle(flavor)}
                    size="icon"
                    variant="ghost"
                    // Show delete icon only on hover
                    className="absolute right-0 h-full w-6 opacity-0 group-hover:opacity-100 transition-opacity rounded-full bg-destructive/10 hover:bg-destructive/20"
                  >
                    <Trash2 className="h-3 w-3 text-destructive" />
                  </Button>
                </div>
              ))}
              
              {/* Custom flavor profiles */}
              {customValue.map((flavor) => (
                <div key={flavor} className="relative group">
                  <Badge
                    variant="secondary"
                    className="px-6 py-1.5 text-sm"
                  >
                    <span>{flavor}</span>
                  </Badge>
                  <Button
                    onClick={() => {
                      const newCustom = customValue.filter((_, i) => i !== customValue.indexOf(flavor));
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
