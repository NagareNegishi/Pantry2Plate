import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import Constants from 'expo-constants';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Snackbar, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AdvancedSection } from '@/components/AdvancedSection';
import { BasicInputs } from '@/components/BasicInputs';
import { GenerateButton } from '@/components/GenerateButton';
import { ResultsSection } from '@/components/ResultsSection';
import { MOCK_MENU_RESPONSE } from '@/mock/menuData'; // mock result data
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
import { MenuItem, MenuRequestImpl } from '@pantry2plate/shared';

const BACKEND_URL = Constants.expoConfig?.extra?.backendUrl;
const isDemoMode = true; // BACKEND_URL === 'http://localhost:3001';

export default function TabGenerate() {

  // State for basic inputs
  const [servings, setServings] = useState<number>(1);
  const [cookingTime, setCookingTime] = useState<number>(60);
  const [difficulty, setDifficulty] = useState<Difficulty>('any');
  const [ingredients, setIngredients] = useState<string[]>([]);

  // state for advanced inputs
  const [mealType, setMealType] = useState<MealType>('any');
  const [customMealType, setCustomMealType] = useState<string>('');
  const [cuisineType, setCuisineType] = useState<CuisineType>('any');
  const [customCuisineType, setCustomCuisineType] = useState<string>('');
  const [cookingMethod, setCookingMethod] = useState<CookingMethod>('any');
  const [customCookingMethod, setCustomCookingMethod] = useState<string>('');
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [customAllergy, setCustomAllergy] = useState<string[]>([]);
  const [dietaryRestrictions, setDietaryRestrictions] = useState<DietaryRestriction[]>([]);
  const [customDietaryRestriction, setCustomDietaryRestriction] = useState<string[]>([]);
  const [flavorProfiles, setFlavorProfiles] = useState<FlavorProfile[]>([]);
  const [customFlavorProfile, setCustomFlavorProfile] = useState<string[]>([]);

  // Loading state for generation process
  const [isLoading, setIsLoading] = useState(false);

  // Memoized MenuRequest object to avoid unnecessary recalculations
  const menuRequest = useMemo(() => {
    return new MenuRequestImpl({
      ingredients,
      allergies,
      allergiesCustom: customAllergy, // name mismatch handled
      dietaryRestrictions,
      dietaryRestrictionsCustom: customDietaryRestriction,
      servings,
      mealType,
      mealTypeCustom: customMealType,
      flavorProfiles,
      flavorProfilesCustom: customFlavorProfile,
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
    customAllergy,
    dietaryRestrictions,
    customDietaryRestriction,
    servings,
    mealType,
    customMealType,
    flavorProfiles,
    customFlavorProfile,
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
    menus: MenuItem[];
  } | null>(null);

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'error' as 'error' | 'success' | 'info'
  });

  // Handle generate button press
  const handleGenerate = async () => {
    if (!validation.valid) {
      showSnackbar(validation.errors.join(', '), 'error');
      return;
    }
    setIsLoading(true);
    // Simulate generation process

    try {
      let data: any;
      if (isDemoMode) { // Mock response without backend call
        await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate delay
        
        console.log('== DEMO MODE: Using mock response ==');

        data = MOCK_MENU_RESPONSE;
      } else { // Real implementation, send request to backend

        // check if backend URL is set
        console.log('== BACKEND_URL:', BACKEND_URL);

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
          showSnackbar(`Error: ${errorData.error || 'Failed to generate menu'}`, 'error');
          return;
        }
        data = await response.json();
      }
      // handle successful response
      console.log('Menu generated successfully:', data.response);
      setMenuData(data.response);
      showSnackbar('Menu generated successfully!', 'success');

    } catch (error) {
      // handle error
      console.log('Error generating menu:', error);
      showSnackbar('Failed to connect to server', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  // Function to show snackbar messages
  const showSnackbar = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
    setSnackbar({ visible: true, message, type });
  };



// Scroll to results when menuData updates
const scrollViewRef = useRef<ScrollView>(null);
const [resultsYPosition, setResultsYPosition] = useState<number>(0);

useEffect(() => {
  if (menuData && scrollViewRef.current && resultsYPosition > 0) {
    scrollViewRef.current.scrollTo({
      y: resultsYPosition,
      animated: true
    });
  }
}, [menuData, resultsYPosition]);


  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
          ref={scrollViewRef}
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
        >
          <ThemedView style={styles.titleContainer}>
            <ThemedText
              type="title"
              style={{
                fontFamily: Fonts.rounded,
                fontSize: 32,
                // fontStyle: 'italic',
                // fontWeight: '700',
                letterSpacing: 1,
                textTransform: 'uppercase',
                color: '#f6f1ac',  // Fill color
                textShadowColor: '#000000',  // Outline color
                textShadowOffset: { width: -1, height: 1 },
                textShadowRadius: 3,
              }}
            >
              Find new recipes
            </ThemedText>
          </ThemedView>

          {/* Combined Basic Inputs Component */}
          <ThemedView style={styles.stepContainer}>
            <BasicInputs
              servings={servings}
              setServings={setServings}
              cookingTime={cookingTime}
              setCookingTime={setCookingTime}
              difficulty={difficulty}
              setDifficulty={setDifficulty}
              ingredients={ingredients}
              setIngredients={setIngredients}
              ingredientError={showSnackbar}
              style={{
                width: '100%',
                maxWidth: 320,
                marginBottom: 20,
                alignSelf: 'center',
              }}
            />
          </ThemedView>

          {/* Advanced Sections */}
          <ThemedView style={styles.stepContainer}>
            <AdvancedSection
              mealType={mealType}
              setMealType={setMealType}
              customMealType={customMealType}
              setCustomMealType={setCustomMealType}
              mealTypeError={showSnackbar}
              cuisineType={cuisineType}
              setCuisineType={setCuisineType}
              customCuisineType={customCuisineType}
              setCustomCuisineType={setCustomCuisineType}
              cuisineTypeError={showSnackbar}
              cookingMethod={cookingMethod}
              setCookingMethod={setCookingMethod}
              customCookingMethod={customCookingMethod}
              setCustomCookingMethod={setCustomCookingMethod}
              cookingMethodError={showSnackbar}
              allergies={allergies}
              setAllergies={setAllergies}
              customAllergies={customAllergy}
              setCustomAllergies={setCustomAllergy}
              allergiesError={showSnackbar}
              allergiesInfo={(msg) => showSnackbar(msg, 'info')}
              dietaryRestrictions={dietaryRestrictions}
              setDietaryRestrictions={setDietaryRestrictions}
              customDietaryRestrictions={customDietaryRestriction}
              setCustomDietaryRestrictions={setCustomDietaryRestriction}
              dietaryRestrictionsError={showSnackbar}
              dietaryRestrictionsInfo={(msg) => showSnackbar(msg, 'info')}
              flavorProfiles={flavorProfiles}
              setFlavorProfiles={setFlavorProfiles}
              customFlavorProfiles={customFlavorProfile}
              setCustomFlavorProfiles={setCustomFlavorProfile}
              flavorProfilesError={showSnackbar}
              flavorProfilesInfo={(msg) => showSnackbar(msg, 'info')}
              style={{
                width: '100%',
                maxWidth: 360,
                alignSelf: 'center',
              }}
            />
          </ThemedView>

          <ThemedView style={styles.stepContainer}>
            <GenerateButton
              onPress={handleGenerate}
              disabled={ingredients.length === 0 || isLoading}
              isLoading={isLoading}
              style={{ width: '75%', alignSelf: 'center' }}
            />
          </ThemedView>

          {/* Display generated menu results */}
          <ThemedView
            style={styles.stepContainer}
            onLayout={(event) => {
              const { y } = event.nativeEvent.layout;
              setResultsYPosition(y);
            }}
          >
            <ResultsSection
              menuData={menuData}
              style={{ width: '100%' }}
              onError={showSnackbar}
              onInfo={(msg) => showSnackbar(msg, 'info')}
            />
          </ThemedView>

        </ScrollView>
      </SafeAreaView>

      {/* Snackbar for error messages */}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: '', type: 'error' })}
        duration={3000}
        style={{
          backgroundColor: '#000000',
          marginBottom: 80,
          borderWidth: 1,
          borderColor: snackbar.type === 'error' ? '#ce2f2f' : snackbar.type === 'success' ? '#4caf50' : '#2196f3',
          borderRadius: 4
        }}
        wrapperStyle={{
          width: '90%',
          minWidth: 400,
          maxWidth: 600,
          alignSelf: 'center'
        }}
      >
        <Text style={{
          color: snackbar.type === 'error' ? '#ce2f2f' : snackbar.type === 'success' ? '#4caf50' : '#2196f3',
          textAlign: 'center',
        }}>
          {snackbar.message}
        </Text>
      </Snackbar>



    </LinearGradient>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent'
  },
  contentContainer: {
    padding: 16,
    paddingTop: 48,
    paddingBottom: 80,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: 'transparent',
    marginBottom: 24,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    backgroundColor: 'transparent'
  }
});
