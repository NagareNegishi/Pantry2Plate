/**
 * BasicInputs.tsx
 * Collection of basic input components for recipe parameters.
 * Receives state and setters from parent component (App.tsx).
 */
import type { Difficulty } from '@pantry2plate/shared';
import { View, ViewStyle } from 'react-native';
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
  ingredientError?: (message: string) => void;
  // Optional styling
  style?: ViewStyle;
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
  ingredientError,
  style
}: BasicInputsProps) {
  return (
    <View style={[{ gap: 24}, style]}>
      <IngredientsList value={ingredients} onChange={setIngredients} onError={ingredientError}/>
      <View style={{ gap: 16, alignItems: 'flex-start' }}>
        <View style={{ flexDirection: 'row', gap: 48, justifyContent: 'space-between' }}>
          <ServingsInput value={servings} onChange={setServings}/>
          <CookingTimeInput value={cookingTime} onChange={setCookingTime}/>
        </View>
          <DifficultySelect value={difficulty} onChange={setDifficulty}/>
        </View>
    </View>
  );
}