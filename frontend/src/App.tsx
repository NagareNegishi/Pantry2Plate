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
import { useEffect, useMemo, useRef, useState } from 'react';
import { toast } from "sonner";
import { AdvancedSection } from './components/AdvancedSection';
import { BasicInputs } from './components/BasicInputs';
import { GenerateButton } from './components/GenerateButton';
import { ResultsSection } from "./components/ResultsSection";
import { MOCK_MENU_RESPONSE } from './mock/menuData';

// Env Variables must be prefixed with VITE_ to be accessible in the frontend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
const isDemoMode = import.meta.env.VITE_DEMO_MODE === 'true';

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
      allergiesCustom: customAllergies, // name mismatch handled
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
  }, [ // if any of these change, recalculate
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

  // State for generated menu results
  const [menuData, setMenuData] = useState<{
    menus: Array<{
      name: string;
      description: string;
      servings: number;
      cookingTime: number;
      difficulty: string;
      ingredients: string[];
      instructions: string[];
    }>;
  } | null>(null);

  // Handler for generating menu
  const handleGenerate = async () => {
    if (!validation.valid) {
      toast.error(validation.errors.join(', '));
      return;
    }
    setIsLoading(true);
    try {
      let data: any;
      if (isDemoMode) { // Mock response without backend call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        data = MOCK_MENU_RESPONSE;
      } else { // Real implementation, send request to backend
        const response = await fetch(`${BACKEND_URL}/api/menu/generate`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(menuRequest)
        });
        // handle non-OK responses
        if (!response.ok) {
          const errorData = await response.json();
          toast.error(`Error: ${errorData.error || 'Failed to generate menu'}`);
          return;
        }
        data = await response.json();
      }
      // handle successful response
      console.log('Menu generated successfully:', data.response);
      setMenuData(data.response);
      toast.success('Menu generated successfully!');

    } catch (error) {
      // handle error
      console.log('Error generating menu:', error);
      toast.error('Failed to connect to server');
    } finally {
      setIsLoading(false);
    }
  };


  // Scroll to results when menuData updates
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (menuData && resultsRef.current) {
      resultsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [menuData]);


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
        className="max-w-3xl mx-auto min-w-lg"
      />

      {/* Loading spinner */}
      {isLoading && (
        <div className="max-w-3xl mx-auto mt-6 flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600"></div>
        </div>
      )}

      {/* Display generated menu results */}
      <ResultsSection
        menuData={menuData}
        className="mt-6 max-w-3xl mx-auto"
        ref={resultsRef}
      />

      <Toaster /> {/* Toast notifications container */}
    </div>
  );
}
export default App
