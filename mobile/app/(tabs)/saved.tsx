import { RecipeCard } from '@/components/RecipeCard';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Fonts } from '@/constants/theme';
import { getAllRecipes, SavedRecipe } from '@/services/recipeStorage';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';


export default function SavedScreen() {

  const [recipes, setRecipes] = useState<SavedRecipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Callback to load recipes from storage
  const loadRecipes = useCallback(async () => {
    try {
      setLoading(true);
      const savedRecipes = await getAllRecipes();
      setRecipes(savedRecipes);
    } catch (error) {
      console.error('Failed to load recipes:', error);
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies, create once

  // Reload recipes whenever screen comes into focus
  useFocusEffect(
    useCallback(() => {
      loadRecipes();
    }, [loadRecipes]) // Dependency on loadRecipes to ensure it's up to date
  );


  return (
    <LinearGradient
      colors={['#667eea', '#764ba2']}
      style={{ flex: 1 }}
    >
      <SafeAreaView style={{ flex: 1 }} edges={['top']}>
        <ScrollView
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
              Saved recipes
            </ThemedText>
          </ThemedView>

          {loading ? (
            <ActivityIndicator size="large" color="#f6f1ac" />
          ) : recipes.length === 0 ? (
            <ThemedText style={{ textAlign: 'center', marginTop: 20 }}>
              No saved recipes yet
            </ThemedText>
          ) : (
            recipes.map((recipe, index) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onError={(msg) => console.error(msg)}
                onInfo={(msg) => console.log(msg)}
                initialSaved={true} // Mark as saved since these are from storage
                isExpanded={expandedIndex === index}
                onToggle={() => setExpandedIndex(
                  expandedIndex === index ? null : index
                )}
              />
            ))
          )}
        </ScrollView>
      </SafeAreaView>
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
