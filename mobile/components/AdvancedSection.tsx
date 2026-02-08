/**
 * AdvancedSection.tsx
 * Collection of advanced input components for recipe parameters.
 * Receives state and setters from parent component (App.tsx).
 */
import type { Allergy, CookingMethod, CuisineType, DietaryRestriction, FlavorProfile, MealType } from '@pantry2plate/shared';
import { useState } from "react";
import { StyleProp, View, ViewStyle } from 'react-native';
import { List } from 'react-native-paper';
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
  mealTypeError?: (message: string) => void;
  // Cuisine type
  cuisineType: CuisineType;
  setCuisineType: (value: CuisineType) => void;
  customCuisineType: string;
  setCustomCuisineType: (value: string) => void;
  cuisineTypeError?: (message: string) => void;
  // Cooking method
  cookingMethod: CookingMethod;
  setCookingMethod: (value: CookingMethod) => void;
  customCookingMethod: string;
  setCustomCookingMethod: (value: string) => void;
  cookingMethodError?: (message: string) => void;
  // Allergies
  allergies: Allergy[];
  setAllergies: (value: Allergy[]) => void;
  customAllergies: string[];
  setCustomAllergies: (value: string[]) => void;
  allergiesError?: (message: string) => void;
  allergiesInfo?: (message: string) => void;
  // Dietary restrictions
  dietaryRestrictions: DietaryRestriction[];
  setDietaryRestrictions: (value: DietaryRestriction[]) => void;
  customDietaryRestrictions: string[];
  setCustomDietaryRestrictions: (value: string[]) => void;
  dietaryRestrictionsError?: (message: string) => void;
  dietaryRestrictionsInfo?: (message: string) => void;
  // Flavor profiles
  flavorProfiles: FlavorProfile[];
  setFlavorProfiles: (value: FlavorProfile[]) => void;
  customFlavorProfiles: string[];
  setCustomFlavorProfiles: (value: string[]) => void;
  flavorProfilesError?: (message: string) => void;
  flavorProfilesInfo?: (message: string) => void;
  // Optional styling
  style?: StyleProp<ViewStyle>;
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
  mealTypeError,
  cuisineType,
  setCuisineType,
  customCuisineType,
  setCustomCuisineType,
  cuisineTypeError,
  cookingMethod,
  setCookingMethod,
  customCookingMethod,
  setCustomCookingMethod,
  cookingMethodError,
  allergies,
  setAllergies,
  customAllergies,
  setCustomAllergies,
  allergiesError,
  allergiesInfo,
  dietaryRestrictions,
  setDietaryRestrictions,
  customDietaryRestrictions,
  setCustomDietaryRestrictions,
  dietaryRestrictionsError,
  dietaryRestrictionsInfo,
  flavorProfiles,
  setFlavorProfiles,
  customFlavorProfiles,
  setCustomFlavorProfiles,
  flavorProfilesError,
  flavorProfilesInfo,
  style
  }: AdvancedSectionProps) {

  // Handler for accordion toggle
  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);

  return (
    <View style={[{ gap: 24 }, style]}>
      <List.Accordion
        title="Advanced Options"
        titleStyle={{
          fontSize: 20,
          fontWeight: '500', // 'bold' could work too
          color: '#000',
          textAlign: 'center',
        }}
        expanded={expanded}
        onPress={handlePress}
        style={{
          width: '100%',
          maxWidth: 360,
          minWidth: 180,
          backgroundColor: 'transparent',
        }}
        theme={{
          colors: {
            background: 'transparent',
          }
        }}
      >
        <View
          style={{
            backgroundColor: 'transparent',
            paddingHorizontal: 36,
            paddingVertical: 12,
            gap: 16,
            alignItems: 'flex-start'
          }}>
          <AllergiesSection
            value={allergies}
            onChange={setAllergies}
            customValue={customAllergies}
            onCustomChange={setCustomAllergies}
            onError={allergiesError}
            onInfo={allergiesInfo}
            style={{ width: '100%' }}
          />
          <DietaryRestrictionsSection
            value={dietaryRestrictions}
            onChange={setDietaryRestrictions}
            customValue={customDietaryRestrictions}
            onCustomChange={setCustomDietaryRestrictions}
            onError={dietaryRestrictionsError}
            onInfo={dietaryRestrictionsInfo}
            style={{ width: '100%' }}
          />
          <MealTypeSection
            value={mealType}
            onChange={setMealType}
            customValue={customMealType}
            onCustomChange={setCustomMealType}
            onError={mealTypeError}
            style={{ width: '100%', paddingHorizontal: 16, marginBottom: 10 }}
          />
          <CuisineSection
            value={cuisineType}
            onChange={setCuisineType}
            customValue={customCuisineType}
            onCustomChange={setCustomCuisineType}
            onError={cuisineTypeError}
            style={{ width: '100%', paddingHorizontal: 16, marginBottom: 10 }}
          />
          <CookingMethodSection
            value={cookingMethod}
            onChange={setCookingMethod}
            customValue={customCookingMethod}
            onCustomChange={setCustomCookingMethod}
            onError={cookingMethodError}
            style={{ width: '100%', paddingHorizontal: 16 }}
          />
          <FlavorProfilesSection
            value={flavorProfiles}
            onChange={setFlavorProfiles}
            customValue={customFlavorProfiles}
            onCustomChange={setCustomFlavorProfiles}
            onError={flavorProfilesError}
            onInfo={flavorProfilesInfo}
            style={{ width: '100%' }}
          />
        </View>
      </List.Accordion>
    </View>
  );
}