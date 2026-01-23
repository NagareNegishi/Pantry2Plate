

// test connection from shared module
import type { Difficulty, ValidationResult } from '@pantry2plate/shared'; // Types only (disappear at runtime)
import { MenuRequestImpl } from '@pantry2plate/shared'; // Actual classes/values (exist at runtime)

import { useState } from 'react';
import { CookingTimeInput } from './components/CookingTimeInput';
import { DifficultySelect } from './components/DifficultySelect';
import { IngredientsList } from './components/IngredientsList';
import { ServingsInput } from './components/ServingsInput';

import { Toaster } from "@/components/ui/sonner";


function App() {
  // useState returns array : [currentValue, Setter function]
  // we name currentValue and setter function appropriately
  // Setter function is provided by React (we can name it whatever we want)
  const [servings, setServings] = useState(1); // Default to 1 serving
  const [cookingTime, setCookingTime] = useState(60); // Default to 60 minutes
  const [difficulty, setDifficulty] = useState<Difficulty>('any'); // Default to 'any' difficulty
  const [ingredients, setIngredients] = useState<string[]>([]); // Default to empty ingredients list

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pantry2Plate</h1>

      <ServingsInput value={servings} onChange={setServings} />
      <p className="mt-4">Selected servings: {servings}</p>
      
      <CookingTimeInput value={cookingTime} onChange={setCookingTime} />
      <p className="mt-4">Selected cooking time: {cookingTime} minutes</p>

      <DifficultySelect value={difficulty} onChange={setDifficulty} />
      <p className="mt-4">Selected difficulty: {difficulty}</p>

      <IngredientsList value={ingredients} onChange={setIngredients} />

      <Toaster /> {/* Toast notifications container */}
    </div>
  );
}

export default App




// Example usage of MenuRequestImpl and ValidationResult, connect to app later

const request = new MenuRequestImpl({
  ingredients: ['chicken', 'rice'],
  dietaryRestrictions: ['vegetarian', 'gluten-free'],
  mealType: 'dinner',
  servings: 2
});

const validation: ValidationResult = request.validate();
console.log('Validation Result front:', validation);