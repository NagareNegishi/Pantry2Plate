/**
 * RecipeCard.tsx
 * Individual recipe card component with save/unsave functionality.
 * Can be reused in results and saved recipes screens.
 */
import { SaveRecipeButton } from '@/components/SaveRecipeButton';
import { CollapsibleCard } from '@/components/ui/CollapsibleCard';
import { deleteRecipeByName, saveRecipe } from '@/services/recipeStorage';
import { MenuItem } from '@pantry2plate/shared';
import { useState } from 'react';
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

/**
 * Props for the RecipeCard component
 */
interface RecipeCardProps {
  recipe: MenuItem;
  index?: number;
  style?: StyleProp<ViewStyle>;
  // Optional callback for error messages
  onError?: (message: string) => void;
  onInfo?: (message: string) => void;
  // Optional: control save state externally
  initialSaved?: boolean;
  // For collapsible card
  isExpanded?: boolean;
  onToggle?: () => void;
}

/**
 * RecipeCard Component
 * @param RecipeCardProps but as destructured props
 * @returns A card displaying recipe details with save/unsave functionality
 */
export function RecipeCard({
  recipe,
  index,
  style,
  onError,
  onInfo,
  initialSaved = false,
  isExpanded = false,
  onToggle,
}: RecipeCardProps) {
  const [isSaved, setIsSaved] = useState(initialSaved);
  const [isSaving, setIsSaving] = useState(false);

  const handleToggleSave = async () => {
    if (isSaving) return;

    try {
      setIsSaving(true);

      if (isSaved) {
        await deleteRecipeByName(recipe.name);
        setIsSaved(false);
        onInfo?.('Recipe removed');
      } else {
        await saveRecipe(recipe);
        setIsSaved(true);
        onInfo?.('Recipe saved!');
      }
    } catch (error) {
      onError?.(error instanceof Error ? error.message : 'Failed to save/remove recipe');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <CollapsibleCard
      isExpanded={isExpanded}
      onToggle={onToggle || (() => {})} // No-op if onToggle not provided
      header={
        <View style={styles.headerSection}>
          <View style={styles.textContainer}>
            {index !== undefined && (
              <Text style={styles.recipeNumber}>Recipe {index + 1}</Text>
            )}
            <Text style={styles.recipeText} numberOfLines={2}>
              {recipe.name}
            </Text>
          </View>
          <SaveRecipeButton
            onPress={handleToggleSave}
            isSaved={isSaved}
            disabled={isSaving}
          />
        </View>
      }
    >

      {/* Description */}
      <Text style={styles.description}>{recipe.description}</Text>

      {/* Info row: Servings, Time, Difficulty */}
      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Servings: </Text>
          <Text style={styles.infoValue}>{recipe.servings}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Cooking Time: </Text>
          <Text style={styles.infoValue}>{recipe.cookingTime} minutes</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Difficulty: </Text>
          <Text style={styles.infoValue}>{recipe.difficulty}</Text>
        </View>
      </View>

      {/* Ingredients Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ingredients</Text>
        <View style={styles.ingredientsBox}>
          {recipe.ingredients.map((ingredient, idx) => (
            <View key={idx} style={styles.ingredientItem}>
              <Text style={styles.bullet}>• </Text>
              <Text style={styles.ingredientText}>
                {ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}
              </Text>
            </View>
          ))}
        </View>
      </View>

      {/* Instructions Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Instructions</Text>
        {recipe.instructions.map((step, idx) => (
          <View key={idx} style={styles.instructionBox}>
            <Text style={styles.stepNumber}>{idx + 1}. </Text>
            <Text style={styles.stepText}>{step}</Text>
          </View>
        ))}
      </View>

    </CollapsibleCard>
  );
}

const styles = StyleSheet.create({
  // Each menu card
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 8,
    marginBottom: 32,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    
    // Shadow for elevation
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // Android shadow
  },

  // Header section
  headerSection: {
    borderBottomWidth: 3,
    borderBottomColor: '#b8bcc3',
    paddingBottom: 12,
    marginBottom: 16,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  // Text container to allow space for save button
  textContainer: {
    flex: 1,
    paddingRight: 6,
  },

  // Recipe number
  recipeNumber: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 4,
  },

  // Recipe title
  recipeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  // Description
  description: {
    fontSize: 16,
    color: '#4b5563',
    marginBottom: 8,
    fontStyle: 'italic',
    padding: 8,
  },

  // Info section (servings, time, difficulty)
  infoSection: {
    marginBottom: 24,
    paddingBottom: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#b8bcc3',
    padding: 8,
  },

  // Each info item container
  infoItem: {
    flexDirection: 'row',
    marginBottom: 8,
  },

  // Info labels
  infoLabel: {
    fontWeight: '600',
    color: '#374151',
    fontSize: 16,
  },

  // Info values
  infoValue: {
    color: '#374151',
    fontSize: 16,
  },

  // Generic section container
  section: {
    marginBottom: 24,
  },

  // Section titles
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#1f2937',
  },

  // Ingredients box
  ingredientsBox: {
    backgroundColor: '#eff6ff',
    borderRadius: 8,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },

  // Each ingredient item
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },

  // Bullet point
  bullet: {
    color: '#2563eb',
    marginRight: 8,
    fontSize: 16,
  },

  // Ingredient text
  ingredientText: {
    color: '#374151',
    fontSize: 16,
    flex: 1,
  },

  // Instruction box
  instructionBox: {
    backgroundColor: '#f9fafb',
    borderRadius: 8,
    padding: 6,
    borderWidth: 1,
    borderColor: '#e5e7eb',
    marginBottom: 12,
    flexDirection: 'row',
    gap: 2,
  },

  // Step number
  stepNumber: {
    fontWeight: '600',
    color: '#4b5563',
    fontSize: 14,
  },

  // Step text
  stepText: {
    color: '#374151',
    fontSize: 14,
    flex: 1,
  },
});