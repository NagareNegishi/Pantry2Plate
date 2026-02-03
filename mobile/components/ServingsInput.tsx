/**
 * ServingsInput.tsx
 * A reusable input component for selecting the number of servings.
 * Allows users to input a number between 1 and 12.
 */
// NOTE: TextInput replaced with Input and Text replaced with Label component from frontend
import { Text, TextInput } from 'react-native-paper';
// NOTE: React Native has NO className prop, instead uses "style" prop with StyleSheet or inline styles
// so where "className" and "cn" are used as:
//
// className?: string;
// className={cn("flex flex-col", className)}
//
// it will be replaced with:
// style?: ViewStyle;  // TypeScript type from 'react-native'
// style={[styles.container, style]}  // Array to merge styles
import { MAX_SERVINGS, MIN_SERVINGS } from '@pantry2plate/shared';
import { useState } from "react";
import { View, ViewStyle } from 'react-native';

/**
 * Props for the ServingsInput component.
 */
interface ServingsInputProps {
  // Current value of the servings input
  value: number;
  // Function parent component provides to handle value changes
  onChange: (value: number) => void;
  // Optional styling
  style? : ViewStyle;
}

/**
 * ServingsInput Component
 * @param ServingsInputProps but as destructured props
 * @returns A number input field for selecting servings between 1 and 12
 */
export function ServingsInput({ value, onChange, style }: ServingsInputProps) {

  // Local state for the input display (allows any string while typing)
  const [displayValue, setDisplayValue] = useState(value.toString());

  // Handler for input changes
  // In React Native TextInput, onChangeText gives the new text directly (not an event)
  const handleChange = ( inputValue: string) => {
    setDisplayValue(inputValue);  // Update display immediately (no validation)

    // Try to parse -> update
    if (inputValue === '') return; // Allow empty input (user clearing field)
    const newValue = parseInt(inputValue, 10); // Convert input string to number
    if (!isNaN(newValue) && newValue >= MIN_SERVINGS && newValue <= MAX_SERVINGS) {
      onChange(newValue);
    }
  };

  // When user leaves input, enforce valid value
  const handleBlur = () => {
    const num = parseInt(displayValue, 10);
    if (isNaN(num) || displayValue === '') { // Empty or invalid → reset to minimum
      setDisplayValue(MIN_SERVINGS.toString());
      onChange(MIN_SERVINGS);
    } else if (num < MIN_SERVINGS) { // Too low → set to minimum
      setDisplayValue(MIN_SERVINGS.toString());
      onChange(MIN_SERVINGS);
    } else if (num > MAX_SERVINGS) { // Too high → set to maximum
      setDisplayValue(MAX_SERVINGS.toString());
      onChange(MAX_SERVINGS);
    } else { // Valid → just ensure display matches
      setDisplayValue(num.toString());
    }
  };

  return (
    <View style={[{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 96,
      alignItems: 'center',
      gap: 6,
    }, style]}>
      {/* Note: unlike HTML which is click-to-focus, Mobile is touch-to-focus, so no need for htmlFor/id linking between Label and Input */}
      <Text style={{ fontSize: 20, color: '#000' }}>
        Servings
      </Text>
      <TextInput
        mode="outlined"
        keyboardType="numeric"
        value={displayValue}
        onChangeText={handleChange}
        onBlur={handleBlur}
        // Paper TextInput has unfixed bug, without explicit width it height expands 100%
        style={{ width: '100%', maxWidth: 80, height: 40, textAlign: 'left' }}
      />
    </View>
  );
}
