// test connection from shared module
import type { Difficulty, ValidationResult } from '@pantry2plate/shared'; // Types only (disappear at runtime)
import { MenuRequestImpl } from '@pantry2plate/shared'; // Actual classes/values (exist at runtime)

import { useState } from 'react';
import { BasicInputs } from './components/BasicInputs';

import { Toaster } from "@/components/ui/sonner";





// for advanced inputs later
import type { CuisineType, MealType } from '@pantry2plate/shared';
import { AdvancedSection } from './components/AdvancedSection';




function App() {
  // useState returns array : [currentValue, Setter function]
  // we name currentValue and setter function appropriately
  // Setter function is provided by React (we can name it whatever we want)
  const [servings, setServings] = useState(1); // Default to 1 serving
  const [cookingTime, setCookingTime] = useState(60); // Default to 60 minutes
  const [difficulty, setDifficulty] = useState<Difficulty>('any'); // Default to 'any' difficulty
  const [ingredients, setIngredients] = useState<string[]>([]); // Default to empty ingredients list


// State for advanced inputs later
  const [mealType, setMealType] = useState<MealType>('any'); // Default to 'any' meal type
  const [customMealType, setCustomMealType] = useState<string>(''); // Default to empty custom meal type
  const [cuisineType, setCuisineType] = useState<CuisineType>('any'); // Default to 'any' cuisine type
  const [customCuisineType, setCustomCuisineType] = useState<string>(''); // Default to empty custom cuisine type


  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Pantry2Plate</h1>
      <BasicInputs
        servings={servings}
        setServings={setServings}
        cookingTime={cookingTime}
        setCookingTime={setCookingTime}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        ingredients={ingredients}
        setIngredients={setIngredients}
      />


      <AdvancedSection
        mealType={mealType}
        setMealType={setMealType}
        customMealType={customMealType}
        setCustomMealType={setCustomMealType}
        cuisineType={cuisineType}
        setCuisineType={setCuisineType}
        customCuisineType={customCuisineType}
        setCustomCuisineType={setCustomCuisineType}
      />




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