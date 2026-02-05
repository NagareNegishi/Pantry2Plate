/**
 * IngredientsList Component
 * A reusable input component for inputting a list of ingredients.
 * Allows users to input a ingredients(letters, spaces, hyphens only, 1-20 chars)
 * For time being, up to 10 ingredients.
 */
import { useState } from "react";
import { View, ViewStyle } from 'react-native';
import { Chip, Text, TextInput } from 'react-native-paper';


const MAX_INGREDIENTS = 10;
const INGREDIENT_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars


/**
 * Props for the IngredientsList component.
 */
interface IngredientsListProps {
  // Current list of ingredients
  value: string[];
  // Function parent component provides to update the list
  onChange: (value: string[]) => void;
  // Optional styling
  style?: ViewStyle;
  // Optional callback for error messages
  onError?: (message: string) => void;
}

/**
 * IngredientsList Component
 * @param IngredientsListProps but as destructured props
 * @returns An input field to add ingredients with validation and a list to display added ingredients
 */
export function IngredientsList({ value, onChange, style, onError }: IngredientsListProps) {

  // Local state for the input display (allows any string while typing)
  const [currentInput, setCurrentInput] = useState('');

  // Handler for input changes
  const handleAdd = () => {
    const trimmed = currentInput.trim();
    // Case invalid format
    if (!INGREDIENT_REGEX.test(trimmed)) {
      onError?.("Invalid ingredient. Use only letters, spaces, and hyphens (1-20 characters)");
      return;
    }
    const normalized = trimmed.toLowerCase().replace(/\s+/g, '-');
    // Case duplicate
    if (value.includes(normalized)) {
      onError?.("Duplicate ingredient" + `"${normalized}" is already in the list`);
      return;
    }
    // Case max reached
    if (value.length >= MAX_INGREDIENTS) {
      onError?.(`Maximum reached. You can only add up to ${MAX_INGREDIENTS} ingredients`);
      return;
    }
    onChange([...value, normalized]);
    setCurrentInput('');  // Clear input after adding
  };


  // Allow removal of ingredients
  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index)); // Remove ingredient at index
    // Note: _ indicates "unused", we only care about index
    // React requires a new array reference to trigger re-render, so splice is not used
  };

  return (
    // <div style={cn("grid w-full max-w-md items-center gap-1.5", style)}>
    <View style={[{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 360,
      alignItems: 'flex-start',
      gap: 6,
    }, style]}>
      <Text style={{ fontSize: 24, color: '#000' }}>
        Ingredients
      </Text>
      <Text style={{ fontSize: 14, color: '#666' }}>
        Letters, spaces, and hyphens only (1-20 characters)
      </Text>

      <TextInput
        mode="outlined"
        placeholder="e.g., chicken, rice, tomatoes"
        value={currentInput}
        onChangeText={setCurrentInput}
        onSubmitEditing={handleAdd}
        returnKeyType="done" // Show platform-appropriate "Done" button on keyboard
        // Paper TextInput has unfixed bug, without explicit width it height expands 100%
        style={{ width: '100%', maxWidth: 320, height: 40, textAlign: 'left' }}
      />


      {/* Datalist for common ingredients suggestions */}
      {/* <datalist id="ingredients-list">
        {COMMON_INGREDIENTS.map((ingredient) => (
          <option key={ingredient} value={ingredient} />
        ))}
      </datalist> */}

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {value.map((ingredient, index) => (
          <Chip
            key={index}
            onClose={() => handleRemove(index)}
          >
            {ingredient.charAt(0).toUpperCase() + ingredient.slice(1).replaceAll('-', ' ')}
          </Chip>
        ))}
      </View>



    </View>
  );
}

// probably not needed buttom for mobile
      // {/* Add Button */}
      // <Button
      //   onClick={handleAdd}
      //   disabled={
      //     !INGREDIENT_REGEX.test(currentInput.trim()) ||
      //     value.length >= MAX_INGREDIENTS
      //   }
      //   variant="outline"
      //   style="bg-blue-50 hover:bg-blue-100 text-blue-700 border-blue-200"
      // >
      //   Add
      // </Button>

