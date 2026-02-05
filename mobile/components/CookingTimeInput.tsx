/**
 * CookingTimeInput.tsx
 * A reusable input component for selecting the cooking time in minutes.
 * Allows users to input a number between 10 and 720.
 */
import { MAX_COOKING_TIME, MIN_COOKING_TIME } from '@pantry2plate/shared';
import { useState } from "react";
import { View, ViewStyle } from 'react-native';
import { Text, TextInput } from 'react-native-paper';


/**
 * Props for the CookingTimeInput component.
 */
interface CookingTimeInputProps {
  // Current value of the cooking time input
  value: number;
  // Function parent component provides to handle value changes
  onChange: (value: number) => void;
  // Optional styling
  style? : ViewStyle;
}

/**
 * CookingTimeInput Component
 * @param CookingTimeInputProps but as destructured props
 * @returns A number input field for selecting cooking time between 10 and 720 minutes
 */
export function CookingTimeInput({ value, onChange, style }: CookingTimeInputProps) {

  // Local state for the input display (allows any string while typing)
  const [displayValue, setDisplayValue] = useState(value.toString());

  // Handler for input changes
  const handleChange = (inputValue: string) => {
    setDisplayValue(inputValue);  // Update display immediately (no validation)

    // Try to parse -> update
    if (inputValue === '') return; // Allow empty input (user clearing field)
    const newValue = parseInt(inputValue, 10);
    if (!isNaN(newValue) && newValue >= MIN_COOKING_TIME && newValue <= MAX_COOKING_TIME) {
      onChange(newValue);
    }
  };

  // When user leaves input, enforce valid value
  const handleBlur = () => {
    const num = parseInt(displayValue, 10);
    // Revert to last valid value
    if (isNaN(num) || displayValue === '') {
      setDisplayValue(value.toString());
      return;
    }
    // Clamp to valid range
    if (num < MIN_COOKING_TIME) {
      setDisplayValue(MIN_COOKING_TIME.toString());
      onChange(MIN_COOKING_TIME);
    } else if (num > MAX_COOKING_TIME) {
      setDisplayValue(MAX_COOKING_TIME.toString());
      onChange(MAX_COOKING_TIME);
    } else {
      setDisplayValue(num.toString());
    }
  };

  return (
    <View style={[{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 180,
      alignItems: 'flex-start', // or 'center'
      gap: 6,
    }, style]}>
      <Text style={{ fontSize: 20, color: '#000', flexWrap: 'nowrap' }}>
        Cooking Time
      </Text>
      {/* Input + "minutes" text in row */}
      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
        <TextInput
          mode="outlined"
          keyboardType="numeric"
          value={displayValue}
          onChangeText={handleChange}
          onBlur={handleBlur}
          selectTextOnFocus={true}
          // Paper TextInput has unfixed bug, without explicit width it height expands 100%
          style={{ width: '100%', maxWidth: 80, height: 40, textAlign: 'left' }}
        />
        <Text style={{ fontSize: 16, color: '#666' }}>
          minutes
        </Text>
      </View>
    </View>
  );
}

// NOTE: alignment options:
// flex-start - Top
// center - Middle (current)
// baseline - Based on text baseline (between center and bottom, more natural for text)
// flex-end - Bottom