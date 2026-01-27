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
    <div className={cn("space-y-8", className)}>
      {menuData.menus.map((menu, index) => (
        <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          {/* Recipe Header with separator */}
          <div className="border-b-2 border-gray-300 pb-3 mb-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Recipe {index + 1}: {menu.name}
            </h2>
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-4 italic">{menu.description}</p>

          {/* Info row: Servings, Time, Difficulty */}
          <div className="flex gap-6 text-sm text-gray-700 mb-6 pb-4 border-b border-gray-200">
            <div>
              <span className="font-semibold">Servings:</span> {menu.servings}
            </div>
            <div>
              <span className="font-semibold">Cooking Time:</span> {menu.cookingTime} minutes
            </div>
            <div>
              <span className="font-semibold">Difficulty:</span> {menu.difficulty}
            </div>
          </div>

          {/* Ingredients Section - Box/Background */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Ingredients</h3>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <ul className="space-y-2">
                {menu.ingredients.map((ingredient, idx) => (
                  <li key={idx} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-gray-700">{ingredient}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Instructions Section - Each step in separate box */}
          <div>
            <h3 className="text-lg font-semibold mb-3 text-gray-800">Instructions</h3>
            <div className="space-y-3">
              {menu.instructions.map((step, idx) => (
                <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                  <div className="flex gap-3">
                    <span className="font-semibold text-gray-600 flex-shrink-0">
                      {idx + 1}.
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}