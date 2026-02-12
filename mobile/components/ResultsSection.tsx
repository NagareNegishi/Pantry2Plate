/**
 * ResultsSection.tsx
 * A reusable input component for displaying generated menu results.
 * Renders menu data with proper formatting.
 */
import { RecipeCard } from '@/components/RecipeCard';
import { MenuItem } from '@pantry2plate/shared';
import { useState } from 'react';
import { StyleProp, StyleSheet, View, ViewStyle } from 'react-native';


/**
 *  Props for the ResultsSection component
 */
interface ResultsSectionProps {
  menuData: {
    menus: MenuItem[];
  } | null;
  style?: StyleProp<ViewStyle>;
  // Optional callback for error messages
  onError?: (message: string) => void;
  onInfo?: (message: string) => void;
}


/**
 * ResultsSection Component
 * @param ResultsSectionProps but as destructured props
 * @returns A section displaying the generated menu results
 */
export function ResultsSection({ menuData, style, onError, onInfo }: ResultsSectionProps) {
  if (!menuData) return null; // Hidden until data exists

  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  return (
    <View style={[styles.container, style]}>
      {menuData.menus.map((menu, index) => (
        <RecipeCard
          key={index}
          recipe={menu}
          index={index}
          onError={onError}
          onInfo={onInfo}
          initialSaved={false}
          isExpanded={expandedIndex === index}
          onToggle={() => setExpandedIndex(
            expandedIndex === index ? null : index
          )}
        />
      ))}
    </View>
  );
}


const styles = StyleSheet.create({
  // Main container
  container: {
    // No styles needed for now
  },
});







