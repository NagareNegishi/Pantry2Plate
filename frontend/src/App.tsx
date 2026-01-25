// test connection from shared module
import type { Difficulty, ValidationResult } from '@pantry2plate/shared'; // Types only (disappear at runtime)
import { MenuRequestImpl } from '@pantry2plate/shared'; // Actual classes/values (exist at runtime)

import { useState } from 'react';
import { BasicInputs } from './components/BasicInputs';

import { Toaster } from "@/components/ui/sonner";





// for advanced inputs later
import type { Allergy, CookingMethod, CuisineType, DietaryRestriction, FlavorProfile, MealType } from '@pantry2plate/shared';
import { AdvancedSection } from './components/AdvancedSection';




function App() {
  /*
   * NOTE:
   * useState returns array : [currentValue, Setter function]
   * we name currentValue and setter function appropriately
   * Setter function is provided by React (we can name it whatever we want)
   */

  // State for basic inputs
  const [servings, setServings] = useState(1); // Default to 1 serving
  const [cookingTime, setCookingTime] = useState(60); // Default to 60 minutes
  const [difficulty, setDifficulty] = useState<Difficulty>('any'); // Default to 'any' difficulty
  const [ingredients, setIngredients] = useState<string[]>([]); // Default to empty ingredients list
  // State for advanced inputs
  const [mealType, setMealType] = useState<MealType>('any');
  const [customMealType, setCustomMealType] = useState<string>(''); // Default to empty custom meal type
  const [cuisineType, setCuisineType] = useState<CuisineType>('any');
  const [customCuisineType, setCustomCuisineType] = useState<string>('');
  const [cookingMethod, setCookingMethod] = useState<CookingMethod>('any');
  const [customCookingMethod, setCustomCookingMethod] = useState<string>('');


  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [customAllergies, setCustomAllergies] = useState<string[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<DietaryRestriction[]>([]);
  const [customDietaryRestrictions, setCustomDietaryRestrictions] = useState<string[]>([]);
  const [flavorProfiles, setFlavorProfiles] = useState<FlavorProfile[]>([]);
  const [customFlavorProfiles, setCustomFlavorProfiles] = useState<string[]>([]);



  return (
    <div className="p-8">
      <h1 className="text-center text-4xl font-bold mb-4 ">Pantry2Plate</h1>
      {/* Basic Inputs Section */}
      <div className="max-w-md mx-auto bg-slate-50 rounded-lg p-6 mb-6">
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
      </div>

      {/* Advanced Section */}
      <div className="max-w-md mx-auto bg-blue-50 rounded-lg p-6">
        <AdvancedSection
          mealType={mealType}
          setMealType={setMealType}
          customMealType={customMealType}
          setCustomMealType={setCustomMealType}
          cuisineType={cuisineType}
          setCuisineType={setCuisineType}
          customCuisineType={customCuisineType}
          setCustomCuisineType={setCustomCuisineType}
          cookingMethod={cookingMethod}
          setCookingMethod={setCookingMethod}
          customCookingMethod={customCookingMethod}
          setCustomCookingMethod={setCustomCookingMethod}
          allergies={allergies}
          setAllergies={setAllergies}
          customAllergies={customAllergies}
          setCustomAllergies={setCustomAllergies}
          dietaryRestrictions={dietaryRestrictions}
          setDietaryRestrictions={setDietaryRestrictions}
          customDietaryRestrictions={customDietaryRestrictions}
          setCustomDietaryRestrictions={setCustomDietaryRestrictions}
          flavorProfiles={flavorProfiles}
          setFlavorProfiles={setFlavorProfiles}
          customFlavorProfiles={customFlavorProfiles}
          setCustomFlavorProfiles={setCustomFlavorProfiles}
        />
      </div>

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