/**
 * ResultsSection.tsx
 * A reusable input component for displaying generated menu results.
 * Renders menu data with proper formatting.
 */
import { cn } from "@/lib/utils";

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

/**
 * ResultsSection Component
 * @param ResultsSectionProps but as destructured props
 * @returns A section displaying the generated menu results
 */
export function ResultsSection({ menuData, className }: ResultsSectionProps) {
  if (!menuData) return null;  // Hidden until data exists

  return (
    <div className={cn("...", className)}>
      {menuData.menus.map((menu, index) => (
        <div key={index}>
          {/* Format each menu item with proper JSX/Tailwind */}
        </div>
      ))}
    </div>
  );
}