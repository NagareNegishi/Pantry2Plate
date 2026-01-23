/**
 * BasicInputs.tsx
 * Collection of basic input components for recipe parameters.
 * Receives state and setters from parent component (App.tsx).
 */
import type { Difficulty } from '@pantry2plate/shared';
import { CookingTimeInput } from './CookingTimeInput';
import { DifficultySelect } from './DifficultySelect';
import { IngredientsList } from './IngredientsList';
import { ServingsInput } from './ServingsInput';


/**
 * Props for the BasicInputs component.
 */
interface BasicInputsProps {
  servings: number;
  setServings: (value: number) => void;
  cookingTime: number;
  setCookingTime: (value: number) => void;
  difficulty: Difficulty;
  setDifficulty: (value: Difficulty) => void;
  ingredients: string[];
  setIngredients: (value: string[]) => void;
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
  setIngredients
}: BasicInputsProps) {
  return (
    <div className="space-y-4">
      <IngredientsList value={ingredients} onChange={setIngredients} />
      <div className="flex gap-4">
        <ServingsInput value={servings} onChange={setServings} />
        <CookingTimeInput value={cookingTime} onChange={setCookingTime} />
        <DifficultySelect value={difficulty} onChange={setDifficulty} />
      </div>
    </div>
  );
}