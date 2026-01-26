// test connection from shared module
import { Toaster } from "@/components/ui/sonner";
import type {
  Allergy,
  CookingMethod,
  CuisineType,
  DietaryRestriction,
  Difficulty,
  FlavorProfile,
  MealType,
  ValidationResult
} from '@pantry2plate/shared';
import { MenuRequestImpl } from '@pantry2plate/shared';
import { useMemo, useState } from 'react';
import { toast } from "sonner";
import { AdvancedSection } from './components/AdvancedSection';
import { BasicInputs } from './components/BasicInputs';
import { GenerateButton } from './components/GenerateButton';


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
  // Loading state for generation process
  const [isLoading, setIsLoading] = useState(false);

  // Memoized MenuRequest object to avoid unnecessary recalculations
  const menuRequest = useMemo(() => {
    return new MenuRequestImpl({
      ingredients,
      allergies,
      allergiesCustom: customAllergies,
      dietaryRestrictions,
      dietaryRestrictionsCustom: customDietaryRestrictions,
      servings,
      mealType,
      mealTypeCustom: customMealType,
      flavorProfiles,
      flavorProfilesCustom: customFlavorProfiles,
      cuisineType,
      cuisineTypeCustom: customCuisineType,
      cookingMethod,
      cookingMethodCustom: customCookingMethod,
      maxCookingTime: cookingTime,
      difficulty
    });
  }, [
    ingredients,
    allergies,
    customAllergies,
    dietaryRestrictions,
    customDietaryRestrictions,
    servings,
    mealType,
    customMealType,
    flavorProfiles,
    customFlavorProfiles,
    cuisineType,
    customCuisineType,
    cookingMethod,
    customCookingMethod,
    cookingTime,
    difficulty
  ]);

  const validation: ValidationResult = useMemo(() => {
    return menuRequest.validate();
  }, [menuRequest]);

  const handleGenerate = async () => {
    if (!validation.valid) {
      toast.error(validation.errors.join(', '));
      return;
    }
    setIsLoading(true);
    try {
      // API call here
      console.log('Generating menu with request:', menuRequest);
    } catch (error) {
      // handle error
      console.log('Error generating menu:', error);
      toast.error('Failed to generate menu');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-center text-4xl font-bold mb-4 ">Pantry2Plate</h1>
      {/* Basic Inputs Section */}
      <BasicInputs
        servings={servings}
        setServings={setServings}
        cookingTime={cookingTime}
        setCookingTime={setCookingTime}
        difficulty={difficulty}
        setDifficulty={setDifficulty}
        ingredients={ingredients}
        setIngredients={setIngredients}
        className="max-w-2xl mx-auto bg-slate-50 rounded-lg p-6 mb-6"
      />
      {/* Advanced Section */}
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
        className="max-w-2xl mx-auto bg-blue-50 rounded-lg p-6"
      />
      {/* Button to generate menu */}
      <GenerateButton
        onClick={handleGenerate}
        disabled={ingredients.length === 0 || isLoading}
        isLoading={isLoading}
        className="max-w-2xl mx-auto w-full"
      />
      <Toaster /> {/* Toast notifications container */}
    </div>
  );
}
export default App
