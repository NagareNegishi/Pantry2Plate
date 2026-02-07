/**
 * ResultsSection.tsx
 * A reusable input component for displaying generated menu results.
 * Renders menu data with proper formatting.
 */
/**
 * ResultsSection.tsx
 * A reusable component for displaying generated menu results.
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
 * Displays the generated menu results in a scrollable list
 */
export function ResultsSection({ menuData, style }: ResultsSectionProps) {
  if (!menuData) return null;

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



// /**
//  * ResultsSection Component
//  * @param ResultsSectionProps but as destructured props
//  * @returns A section displaying the generated menu results
//  */
// export function ResultsSection({ menuData, className, ref }: ResultsSectionProps) {
//   if (!menuData) return null;  // Hidden until data exists

//   return (
//     <div ref={ref} className={cn("space-y-8", className)}>
//       {menuData.menus.map((menu, index) => (
//         <div key={index} className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
//           {/* Recipe Header with separator */}
//           <div className="border-b-3 border-gray-300 pb-3 mb-4">
//             <h2 className="text-2xl font-bold text-gray-800">
//               Recipe {index + 1}: {menu.name}
//             </h2>
//           </div>

//           {/* Description */}
//           <p className="text-lg text-gray-600 mb-4 italic">{menu.description}</p>

//           {/* Info row: Servings, Time, Difficulty */}
//           <div className="flex gap-8 text-base text-gray-700 mb-6 pb-4 border-b border-gray-200">
//             <div>
//               <span className="font-semibold">Servings:</span> {menu.servings}
//             </div>
//             <div>
//               <span className="font-semibold">Cooking Time:</span> {menu.cookingTime} minutes
//             </div>
//             <div>
//               <span className="font-semibold">Difficulty:</span> {menu.difficulty}
//             </div>
//           </div>

//           {/* Ingredients Section - Box/Background */}
//           <div className="mb-6">
//             <h3 className="text-lg font-semibold mb-3 text-gray-800">Ingredients</h3>
//             <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
//               <ul className="space-y-2">
//                 {menu.ingredients.map((ingredient, idx) => (
//                   <li key={idx} className="flex items-start">
//                     <span className="text-blue-600 mr-2">•</span>
//                     {/* Capitalize first letter of ingredient */}
//                     <span className="text-gray-700">{ingredient.charAt(0).toUpperCase() + ingredient.slice(1)}</span>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//           </div>

//           {/* Instructions Section - Each step in separate box */}
//           <div>
//             <h3 className="text-lg font-semibold mb-3 text-gray-800">Instructions</h3>
//             <div className="space-y-3">
//               {menu.instructions.map((step, idx) => (
//                 <div key={idx} className="bg-gray-50 rounded-lg p-4 border border-gray-200">
//                   <div className="flex gap-3">
//                     <span className="font-semibold text-gray-600 flex-shrink-0">
//                       {idx + 1}.
//                     </span>
//                     <span className="text-gray-700">{step}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }