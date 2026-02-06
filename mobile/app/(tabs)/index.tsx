import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Link } from 'expo-router';

// import from frontend
import { useState } from 'react';

import { BasicInputs } from '@/components/BasicInputs';
import type { CuisineType, Difficulty, MealType } from '@pantry2plate/shared';
// import type { Allergy, CookingMethod, CuisineType, DietaryRestriction, FlavorProfile, MealType } from '@pantry2plate/shared';

// toaster replacement
import { Snackbar, Text } from 'react-native-paper';

// advanced inputs
import { CuisineSection } from '@/components/CuisineSection';
import { MealTypeSection } from '@/components/MealTypeSection';


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



  // Snackbar state
  const [snackbar, setSnackbar] = useState({ visible: false, message: '' });

const showSnackbar = (message: string) => {
  setSnackbar({ visible: true, message });
};

  return (
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
        <MealTypeSection
          value={mealType}
          onChange={setMealType}
          customValue={customMealType}
          onCustomChange={setCustomMealType}
          onError={showSnackbar}
          style={{ width: '100%' }}
        />
      </ThemedView>

      <ThemedView style={styles.stepContainer}>
        <CuisineSection
          value={cuisineType}
          onChange={setCuisineType}
          customValue={customCuisineType}
          onCustomChange={setCustomCuisineType}
          onError={showSnackbar}
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


      {/* Snackbar for error messages */}
      <Snackbar
        visible={snackbar.visible}
        onDismiss={() => setSnackbar({ visible: false, message: '' })}
        duration={3000}
        style={{
          backgroundColor: '#000000',
          marginBottom: 80,
          borderWidth: 1,
          borderColor: '#9a7400',
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
          color: '#ce2f2f',
          textAlign: 'center',
        }}>
          {snackbar.message}
        </Text>
      </Snackbar>




    </ParallaxScrollView>


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
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
