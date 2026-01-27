/**
 * ResultsSection.tsx
 * A reusable input component for displaying generated menu results.
 * Renders menu data with proper formatting.
 */

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
  } | null;  // null when no results yet
  className?: string;
}

