/**
 * IngredientsList Component
 * A reusable input component for inputting a list of ingredients.
 * Allows users to input a ingredients(letters, spaces, hyphens only, 1-20 chars)
 * For time being, up to 10 ingredients.
 * TODO?: Add auto-suggest dropdown based on common ingredients, however, unlike web browser,
 * most mobile platforms have built-in auto-suggest based on user history, so it may be redundant.
 */
import { useRef, useState } from "react";
import { StyleProp, View, ViewStyle } from 'react-native';
import { Chip, Text } from 'react-native-paper';
import { CustomTextInput } from './ui/CustomTextInput';

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
  style?: StyleProp<ViewStyle>;
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
  const [isValid, setIsValid] = useState(false);
  const isSubmitting = useRef(false);

  // Handler for custom input changes
  const handleChange = (input: string) => {
    setCurrentInput(input);
    setIsValid(INGREDIENT_REGEX.test(input.trim()));
  };

  // Clear input
  const clearInput = () => {
    setCurrentInput('');
    setIsValid(false);
  };

  // Handler for input changes
  const handleAdd = () => {
    const trimmed = currentInput.trim();

    // Empty is not an error
    if (trimmed === '') {
      clearInput();
      return;
    }

    // Case invalid format
    if (!INGREDIENT_REGEX.test(trimmed)) {
      onError?.("Invalid ingredient. Use only letters, spaces, and hyphens (1-20 characters)");
      clearInput();
      return;
    }
    const normalized = trimmed.toLowerCase().replace(/\s+/g, '-');
    // Case duplicate
    if (value.includes(normalized)) {
      onError?.(`Duplicate ingredient: "${normalized}" is already in the list`);
      clearInput();
      return;
    }
    // Case max reached
    if (value.length >= MAX_INGREDIENTS) {
      onError?.(`Maximum reached. You can only add up to ${MAX_INGREDIENTS} ingredients`);
      clearInput();
      return;
    }
    onChange([...value, normalized]);
    clearInput();
  };

  // Handler for submitting custom allergy (on blur or submit)
  const handleSubmit = () => {
    isSubmitting.current = true;
    handleAdd();
    setTimeout(() => { isSubmitting.current = false; }, 100);
  };

  // Handler for blur event on custom input
  const handleBlur = () => {
    if (isSubmitting.current) return;
    handleAdd();
  };

  // Allow removal of ingredients
  const handleRemove = (index: number) => {
    onChange(value.filter((_, i) => i !== index)); // Remove ingredient at index
    // Note: _ indicates "unused", we only care about index
    // React requires a new array reference to trigger re-render, so splice is not used
  };

  return (
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

      <CustomTextInput
        value={currentInput}
        onChangeText={handleChange}
        onBlur={handleBlur}
        onSubmitEditing={handleSubmit}
        placeholder="e.g., onion"
        placeholderTextColor="#5a5f67"
        returnKeyType="done"
        // undefined when empty, valid/invalid otherwise
        validationState={currentInput === '' ? undefined : isValid ? 'valid' : 'invalid'}
        style={{ width: '100%', maxWidth: 320, height: 40, textAlign: 'left' }}
      />

      {/* Tags for added ingredients */}
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
