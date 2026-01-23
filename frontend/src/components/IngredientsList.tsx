/**
 * IngredientsList Component
 * A reusable input component for inputting a list of ingredients.
 * Allows users to input a ingredients(letters, spaces, hyphens only, 1-20 chars)
 * For time being, up to 10 ingredients.
 */
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // @/ is an alias to src/
import { Label } from "@/components/ui/label";
import { useState } from "react";

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
 * @returns
 */
export function IngredientsList({ value, onChange }: IngredientsListProps) {

  // Local state for the input display (allows any string while typing)
  const [currentInput, setCurrentInput] = useState('');

  // Handler for input changes
  const handleAdd = () => {
    const inputValue = currentInput.trim();
    if (INGREDIENT_REGEX.test(inputValue) && value.length < MAX_INGREDIENTS) {
      onChange([...value, inputValue]);
      setCurrentInput('');  // Clear input after adding
    }
  };



  return (
    <div className="grid w-full max-w-sm items-center gap-1.5">
      <Label htmlFor="ingredients">Ingredients</Label>
      <Input
        id="ingredients"
        type="text"
        placeholder="input ingredients here"
        value={currentInput}
        onChange={(e) => setCurrentInput(e.target.value)}
      />

      <Button
        onClick={handleAdd}
        disabled={
          !INGREDIENT_REGEX.test(currentInput.trim()) ||
          value.length >= MAX_INGREDIENTS
        }
      >Add</Button>
    </div>
  );
}

