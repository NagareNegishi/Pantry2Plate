/**
 * ResultsSection.tsx
 * A reusable input component for displaying generated menu results.
 * Renders menu data with proper formatting.
 */
import { StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

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


const styles = StyleSheet.create({
  // Main container
  container: {
    // No styles needed for now
  },
  
  // Each menu card
  menuCard: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 12,
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
  },

  // Recipe title
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1f2937',
  },

  // Description
  description: {
    fontSize: 18,
    color: '#4b5563',
    marginBottom: 16,
    fontStyle: 'italic',
  },

  // Info row
  infoRow: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 24,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#b8bcc3',
  },

  // Each info item container
  infoItem: {
    flexDirection: 'row',
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
    padding: 8,
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







