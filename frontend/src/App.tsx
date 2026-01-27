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
import { ResultsSection } from "./components/ResultsSection";

// Env Variables must be prefixed with VITE_ to be accessible in the frontend
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';

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
      // Real implementation

      // // send request to backend
      // const response = await fetch(`${BACKEND_URL}/api/menu/generate`, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(menuRequest)
      // });
      // // handle non-OK responses
      // if (!response.ok) {
      //   const errorData = await response.json();
      //   toast.error(`Error: ${errorData.error || 'Failed to generate menu'}`);
      //   return;
      // }
      // const data = await response.json();


      // Temp: Mock response for testing without backend
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
      
      const data = {
        response: {
          menus: [
            {
              name: "Chicken Fried Rice",
              description: "A quick and flavorful one-pan meal.",
              servings: 2,
              cookingTime: 60,
              difficulty: "easy",
              ingredients: [
                "rice: 1.5 cups",
                "chicken breast: 200g",
                "eggs: 2",
                "green onion: 2 stalks",
                "garlic: 2 cloves",
                "soy sauce: 2 tbsp",
                "vegetable oil: 3 tbsp",
                "salt: pinch",
                "pepper: pinch"
              ],
              instructions: [
                "Cook rice according to package directions, spread on plate to cool",
                "Meanwhile, dice chicken into small cubes, slice green onions, and mince garlic",
                "Cook chicken in 1 tbsp oil over medium heat, season with salt and pepper, until no longer pink, set aside",
                "Beat eggs in a small bowl",
                "Heat wok over high heat until you see a wisp of smoke, add 1 tbsp oil and swirl to coat",
                "Add green onions and garlic, stir-fry for 30 seconds until fragrant",
                "Return chicken to wok and combine",
                "Add 1 tbsp oil if wok looks dry, pour in beaten eggs and let spread",
                "Immediately add rice on top of eggs, breaking up any clumps",
                "Keep tossing and stirring, until rice grains are separated and golden from egg coating",
                "Drizzle soy sauce around the edge of wok, not directly on rice",
                "Continue stir-frying until soy sauce is evenly distributed and rice begins to crisp slightly",
                "Taste and adjust seasoning with salt and pepper",
                "Serve immediately"
              ]
            },
            {
              name: "Spaghetti Carbonara",
              description: "Classic Roman pasta with creamy egg sauce and crispy pancetta.",
              servings: 2,
              cookingTime: 25,
              difficulty: "medium",
              ingredients: [
                "spaghetti: 200g",
                "eggs: 2 whole",
                "egg yolk: 1",
                "Pecorino Romano cheese: 60g",
                "pancetta: 120g",
                "black pepper: 1 tsp",
                "salt: for pasta water"
              ],
              instructions: [
                "Bring large pot of water to boil, add salt until it tastes like seawater",
                "Meanwhile, cut pancetta into small strips",
                "Finely grate cheese and set aside",
                "In a bowl, whisk together eggs, egg yolk, half the cheese, and black pepper until well combined",
                "Cook spaghetti according to package time minus 1 minute for al dente",
                "While pasta cooks, heat large pan over medium heat, add pancetta and cook until fat renders and edges are crispy",
                "Turn off heat under pancetta pan and let it cool slightly",
                "Before draining pasta, reserve 1 cup of starchy pasta water",
                "Drain pasta and immediately add to the pan with pancetta, toss to coat",
                "Remove pan completely from heat, add egg mixture and toss quickly with tongs",
                "Add pasta water a few tablespoons at a time while tossing, until sauce is creamy and coats each strand",
                "The residual heat will cook the eggs gently without scrambling",
                "Add remaining cheese, toss to combine, and adjust consistency with more pasta water if needed",
                "Serve immediately with extra black pepper and cheese on top"
              ]
            }
          ]
        }
      };



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

      {/* Display generated menu results */}
      <ResultsSection
        menuData={menuData}
        className="mt-6 max-w-3xl mx-auto"
      />

      <Toaster /> {/* Toast notifications container */}
    </div>
  );
}
export default App
