/**
 * BasicInputs.tsx
 * Collection of basic input components for recipe parameters.
 * Receives state and setters from parent component (App.tsx).
 */
import { cn } from "@/lib/utils";
import type { Difficulty } from '@pantry2plate/shared';
import { CookingTimeInput } from './CookingTimeInput';
import { DifficultySelect } from './DifficultySelect';
import { IngredientsList } from './IngredientsList';
import { ServingsInput } from './ServingsInput';


/**
 * Props for the BasicInputs component.
 */
interface BasicInputsProps {
  // Servings
  servings: number;
  setServings: (value: number) => void;
  // Cooking time
  cookingTime: number;
  setCookingTime: (value: number) => void;
  // Difficulty
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  // Ingredients
  ingredients: string[];
  setIngredients: (value: string[]) => void;

  // Optional className for styling
  className?: string;
}


/**
 * BasicInputs Component
 * @param BasicInputsProps as destructured props
 * @returns A collection of input components for recipe parameters
 */
export function BasicInputs({
  servings,
  setServings,
  cookingTime,
  setCookingTime,
  difficulty,
  setDifficulty,
  ingredients,
  setIngredients,
  className
}: BasicInputsProps) {
  return (
    <div className={cn("space-y-6", className)}>
      <IngredientsList value={ingredients} onChange={setIngredients} className="w-full"/>
      <div className="flex gap-6 w-full">
        <ServingsInput value={servings} onChange={setServings} className="flex-1"/>
        <CookingTimeInput value={cookingTime} onChange={setCookingTime} className="flex-1"/>
        <DifficultySelect value={difficulty} onChange={setDifficulty} className="flex-1"/>
      </div>
    </div>
  );
}