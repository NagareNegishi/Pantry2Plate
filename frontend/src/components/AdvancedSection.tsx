/**
 * AdvancedSection.tsx
 * Collection of advanced input components for recipe parameters.
 * Receives state and setters from parent component (App.tsx).
 */
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import type { Allergy, CookingMethod, CuisineType, DietaryRestriction, FlavorProfile, MealType } from '@pantry2plate/shared';
import { AllergiesSection } from './AllergiesSection';
import { CookingMethodSection } from './CookingMethodSection';
import { CuisineSection } from './CuisineSection';
import { DietaryRestrictionsSection } from './DietaryRestrictionsSection';
import { FlavorProfilesSection } from './FlavorProfilesSection';
import { MealTypeSection } from './MealTypeSection';


/**
 * Props for the AdvancedSection component.
 */
interface AdvancedSectionProps {
  // Meal type
  mealType: MealType;
  setMealType: (value: MealType) => void;
  customMealType: string;
  setCustomMealType: (value: string) => void;
  // Cuisine type
  cuisineType: CuisineType;
  setCuisineType: (value: CuisineType) => void;
  customCuisineType: string;
  setCustomCuisineType: (value: string) => void;
  // Cooking method
  cookingMethod: CookingMethod;
  setCookingMethod: (value: CookingMethod) => void;
  customCookingMethod: string;
  setCustomCookingMethod: (value: string) => void;
  // Allergies
  allergies: Allergy[];
  setAllergies: (value: Allergy[]) => void;
  customAllergies: string[];
  setCustomAllergies: (value: string[]) => void;
  // Dietary restrictions
  dietaryRestrictions: DietaryRestriction[];
  setDietaryRestrictions: (value: DietaryRestriction[]) => void;
  customDietaryRestrictions: string[];
  setCustomDietaryRestrictions: (value: string[]) => void;
  // Flavor profiles
  flavorProfiles: FlavorProfile[];
  setFlavorProfiles: (value: FlavorProfile[]) => void;
  customFlavorProfiles: string[];
  setCustomFlavorProfiles: (value: string[]) => void;

  // Optional className for styling
  className?: string;
}


/**
 * AdvancedSection Component
 * @param AdvancedSectionProps as destructured props
 * @returns A collection of input components for recipe parameters
 */
export function AdvancedSection({
  mealType,
  setMealType,
  customMealType,
  setCustomMealType,
  cuisineType,
  setCuisineType,
  customCuisineType,
  setCustomCuisineType,
  cookingMethod,
  setCookingMethod,
  customCookingMethod,
  setCustomCookingMethod,
  allergies,
  setAllergies,
  customAllergies,
  setCustomAllergies,
  dietaryRestrictions,
  setDietaryRestrictions,
  customDietaryRestrictions,
  setCustomDietaryRestrictions,
  flavorProfiles,
  setFlavorProfiles,
  customFlavorProfiles,
  setCustomFlavorProfiles,
  className
}: AdvancedSectionProps) {
  return (
    <div className={cn("space-y-6 flex flex-col items-center", className)}>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="advanced" className="w-full">

          <AccordionTrigger className="text-2xl">
            <span className="flex-grow text-center">Advanced Options</span>
          </AccordionTrigger>

          <AccordionContent className="px-2 pb-2 w-full">
            <div className="space-y-12  w-full">
              {/* critical requirements at the top */}
              <div className="grid grid-cols-2 gap-8 w-full">
                <AllergiesSection
                  value={allergies}
                  onChange={setAllergies}
                  customValue={customAllergies}
                  onCustomChange={setCustomAllergies}
                />
                <DietaryRestrictionsSection
                  value={dietaryRestrictions}
                  onChange={setDietaryRestrictions}
                  customValue={customDietaryRestrictions}
                  onCustomChange={setCustomDietaryRestrictions}
                />
              </div>
              <div className="grid grid-cols-2 gap-8 w-full justify-items-center">
                <MealTypeSection
                  value={mealType}
                  onChange={setMealType}
                  customValue={customMealType}
                  onCustomChange={setCustomMealType}
                />
                <CuisineSection
                  value={cuisineType}
                  onChange={setCuisineType}
                  customValue={customCuisineType}
                  onCustomChange={setCustomCuisineType}
                />
                <CookingMethodSection
                  value={cookingMethod}
                  onChange={setCookingMethod}
                  customValue={customCookingMethod}
                  onCustomChange={setCustomCookingMethod}
                  className="pt-4" // align with other sections
                />
                <FlavorProfilesSection
                  value={flavorProfiles}
                  onChange={setFlavorProfiles}
                  customValue={customFlavorProfiles}
                  onCustomChange={setCustomFlavorProfiles}
                />
              </div>
            </div>
          </AccordionContent>

        </AccordionItem>
      </Accordion>
    </div>
  );
}