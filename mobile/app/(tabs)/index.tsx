import { Image } from 'expo-image';
import { Platform, StyleSheet, View } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

// import from frontend
import { useState } from 'react';

import { AdvancedSection } from '@/components/AdvancedSection';
import { BasicInputs } from '@/components/BasicInputs';
import { GenerateButton } from '@/components/GenerateButton';
import type { Allergy, CookingMethod, CuisineType, DietaryRestriction, Difficulty, FlavorProfile, MealType } from '@pantry2plate/shared';

// toaster replacement
import { Snackbar, Text } from 'react-native-paper';

export default function HomeScreen() {


  // State for the inputs
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
  const handleGenerate = () => {
    console.log('Generating menu!!');
    setIsLoading(true);
    // Simulate generation process
    setTimeout(() => {
      setIsLoading(false);
      showSnackbar('Menu generated successfully!', 'success');
    }, 2000);
  };

  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'error' as 'error' | 'success' | 'info'
  });

const showSnackbar = (message: string, type: 'error' | 'success' | 'info' = 'error') => {
  setSnackbar({ visible: true, message, type });
};

  return (
    <View style={{ flex: 1 }}>
      <ParallaxScrollView
        headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
        headerImage={
          <Image
            source={require('@/assets/images/partial-react-logo.png')}
            style={styles.reactLogo}
          />
        }>
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Hello World!</ThemedText>
          <HelloWave />
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
            style={{ width: '100%' }}
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
            style={{ width: '100%' }}
          />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <GenerateButton
            onPress={handleGenerate}
            disabled={ingredients.length === 0 || isLoading}
            isLoading={isLoading}
            style={{ width: '100%' }}
          />
        </ThemedView>

                      



        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1: Try it</ThemedText>
          <ThemedText>
            Edit <ThemedText type="defaultSemiBold">app/(tabs)/index.tsx</ThemedText> to see changes.
            Press{' '}
            <ThemedText type="defaultSemiBold">
              {Platform.select({
                ios: 'cmd + d',
                android: 'cmd + m',
                web: 'F12',
              })}
            </ThemedText>{' '}
            to open developer tools.
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <Link href="/modal">
            <Link.Trigger>
              <ThemedText type="subtitle">Step 2: Explore</ThemedText>
            </Link.Trigger>
            <Link.Preview />
            <Link.Menu>
              <Link.MenuAction title="Action" icon="cube" onPress={() => alert('Action pressed')} />
              <Link.MenuAction
                title="Share"
                icon="square.and.arrow.up"
                onPress={() => alert('Share pressed')}
              />
              <Link.Menu title="More" icon="ellipsis">
                <Link.MenuAction
                  title="Delete"
                  icon="trash"
                  destructive
                  onPress={() => alert('Delete pressed')}
                />
              </Link.Menu>
            </Link.Menu>
          </Link>

          <ThemedText>
            {`Tap the Explore tab to learn more about what's included in this starter app.`}
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3: Get a fresh start</ThemedText>
          <ThemedText>
            {`When you're ready, run `}
            <ThemedText type="defaultSemiBold">npm run reset-project</ThemedText> to get a fresh{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> directory. This will move the current{' '}
            <ThemedText type="defaultSemiBold">app</ThemedText> to{' '}
            <ThemedText type="defaultSemiBold">app-example</ThemedText>.
          </ThemedText>
        </ThemedView>




      </ParallaxScrollView>

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



    </View>

  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    backgroundColor: '#7f9253',
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
