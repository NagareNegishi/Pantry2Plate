/**
 * ResultsSection.tsx
 * A reusable input component for displaying generated menu results.
 * Renders menu data with proper formatting.
 */
import { RecipeCard } from '@/components/RecipeCard';
import { MenuItem } from '@pantry2plate/shared';
import { useEffect, useRef, useState } from 'react';
import { ScrollView, StyleProp, StyleSheet, View, ViewStyle } from 'react-native';


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
  scrollViewRef: React.RefObject<ScrollView | null>;
}


/**
 * ResultsSection Component
 * @param ResultsSectionProps but as destructured props
 * @returns A section displaying the generated menu results
 */
export function ResultsSection({
  menuData,
  style,
  onError,
  onInfo,
  scrollViewRef
  }: ResultsSectionProps) {

  // only one accordion can be open and scroll to it
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);
  const itemRefs = useRef<{ [key: number]: View | null }>({});

  // Handle scrolling when accordion opens
  useEffect(() => {
    if (expandedIndex !== null && itemRefs.current[expandedIndex] && scrollViewRef.current) {
      itemRefs.current[expandedIndex]?.measureLayout(
        scrollViewRef.current as any,
        (x, y) => {
          scrollViewRef.current?.scrollTo({
            y: y - 20,
            animated: true
          });
        },
        () => {}
      );
    }
  }, [expandedIndex, scrollViewRef]);

  if (!menuData) return null; // Hidden until data exists

  return (
    <View style={[styles.container, style]}>
      {menuData.menus.map((menu, index) => (
        <View
          key={menu.name}
          ref={(ref) => { itemRefs.current[index] = ref; }}
        >
          <RecipeCard
            // key={index}
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
});







