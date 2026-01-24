/**
 * IngredientsList Component
 * A reusable input component for inputting a list of ingredients.
 * Allows users to input a ingredients(letters, spaces, hyphens only, 1-20 chars)
 * For time being, up to 10 ingredients.
 */
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { COMMON_INGREDIENTS } from "@/constants/ingredients";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const MAX_INGREDIENTS = 10;
const INGREDIENT_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars


/**
 * Props for the IngredientsList component.
 */
interface IngredientsListProps {
  // Current list of ingredients
  value: string[];
  // Function parent component provides to update the list
  onChange: (value: string[]) => void;
}

/**
 * IngredientsList Component
 * @param IngredientsListProps but as destructured props
 * @returns An input field to add ingredients with validation and a list to display added ingredients
 */
export function IngredientsList({ value, onChange }: IngredientsListProps) {

  // Local state for the input display (allows any string while typing)
  const [currentInput, setCurrentInput] = useState('');

  // Handler for input changes
  const handleAdd = () => {
    const trimmed = currentInput.trim();
    // Case invalid format
    if (!INGREDIENT_REGEX.test(trimmed)) {
      toast.error("Invalid ingredient", {
        description: "Use only letters, spaces, and hyphens (1-20 characters)",
      });
      return;
    }
    const normalized = trimmed.toLowerCase().replace(/\s+/g, '-');
    // Case duplicate
    if (value.includes(normalized)) {
      toast.error("Duplicate ingredient", {
        description: `"${normalized}" is already in the list`,
      });
      return;
    }
    // Case max reached
    if (value.length >= MAX_INGREDIENTS) {
      toast.error("Maximum reached", {
        description: `You can only add up to ${MAX_INGREDIENTS} ingredients`,
      });
      return;
    }
    onChange([...value, normalized]);
    setCurrentInput('');  // Clear input after adding
  };

  // Enter key adds ingredient
  const handleEnter = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // Prevent form unintended submission
      handleAdd();
    }
  }

  // Allow removal of ingredients
  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index)); // Remove ingredient at index
    // Note: _ indicates "unused", we only care about index
    // React requires a new array reference to trigger re-render, so splice is not used
  };

  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label
        htmlFor="ingredients"
        className="text-base"
      >
        Ingredients
      </Label>
      <p className="text-sm text-muted-foreground">
        Letters, spaces, and hyphens only (1-20 characters)
      </p>
      <Input
        list="ingredients-list" // For datalist suggestions
        id="ingredients"
        type="text"
        placeholder="e.g., chicken, rice, tomatoes"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
        onKeyDown={handleEnter}
      />
      {/* Datalist for common ingredients suggestions */}
      <datalist id="ingredients-list">
        {COMMON_INGREDIENTS.map((ingredient) => (
          <option key={ingredient} value={ingredient} />
        ))}
      </datalist>

      {/* Add Button */}
      <Button
        onClick={handleAdd}
        disabled={
          !INGREDIENT_REGEX.test(currentInput.trim()) ||
          value.length >= MAX_INGREDIENTS
        }
        variant="outline"
        className="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
      >
        Add
      </Button>

      {/* List of added ingredients */}
      <div className="flex flex-wrap gap-2 mt-2"> {/* flex flex-wrap automatically wraps tags */}
        {value.map((ingredient, index) => (
          <div key={index} className="relative group">
            <Badge
              variant="secondary"
              className="px-6 py-1.5 text-sm"
            >
              <span>{ingredient}</span>
            </Badge>
            <Button
              onClick={() => handleRemove(index)}
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

    </div>
  );
}
