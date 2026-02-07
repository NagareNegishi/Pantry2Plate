/**
 * ResultsSection.tsx
 * A reusable input component for displaying generated menu results.
 * Renders menu data with proper formatting.
 */
import { StyleProp, Text, View, ViewStyle } from 'react-native';

/**
 *  Props for the ResultsSection component
 */
interface ResultsSectionProps {
  menuData: {
    menus: Array<{
      name: string;
      description: string;
      servings: number;
      cookingTime: number;
      difficulty: string;
      ingredients: string[];
      instructions: string[];
    }>;
  } | null;
  style?: StyleProp<ViewStyle>;
}


/**
 * ResultsSection Component
 * @param ResultsSectionProps but as destructured props
 * @returns A section displaying the generated menu results
 */
export function ResultsSection({ menuData, style }: ResultsSectionProps) {
  if (!menuData) return null; // Hidden until data exists

  return (
    <View style={[styles.container, style]}>
      {menuData.menus.map((menu, index) => (
        <View key={index} style={styles.menuCard}>
          
          {/* Recipe Header with separator */}
          <View style={styles.headerSection}>
            <Text style={styles.headerText}>
              Recipe {index + 1}: {menu.name}
            </Text>
          </View>

          {/* Description */}
          <Text style={styles.description}>{menu.description}</Text>

          {/* Info row: Servings, Time, Difficulty */}
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Servings: </Text>
              <Text style={styles.infoValue}>{menu.servings}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Cooking Time: </Text>
              <Text style={styles.infoValue}>{menu.cookingTime} minutes</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Difficulty: </Text>
              <Text style={styles.infoValue}>{menu.difficulty}</Text>
            </View>
          </View>

          {/* Ingredients Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Ingredients</Text>
            <View style={styles.ingredientsBox}>
              {menu.ingredients.map((ingredient, idx) => (
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
            {menu.instructions.map((step, idx) => (
              <View key={idx} style={styles.instructionBox}>
                <Text style={styles.stepNumber}>{idx + 1}. </Text>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
}










