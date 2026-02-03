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
    if (isNaN(num) || displayValue === '') { // Empty or invalid → reset to minimum
      setDisplayValue(MIN_COOKING_TIME.toString());
      onChange(MIN_COOKING_TIME);
    } else if (num < MIN_COOKING_TIME) { // Too low → set to minimum
      setDisplayValue(MIN_COOKING_TIME.toString());
      onChange(MIN_COOKING_TIME);
    } else if (num > MAX_COOKING_TIME) { // Too high → set to maximum
      setDisplayValue(MAX_COOKING_TIME.toString());
      onChange(MAX_COOKING_TIME);
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
      <Text style={{ fontSize: 20, color: '#000' }}> {/* whitespace-nowrap?? */}
        Cooking Time
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
{/* 
      <div style="flex items-center gap-1">
        <Input
          id="cookingTime"
          type="number"
          min={MIN_COOKING_TIME}
          max={MAX_COOKING_TIME}
          step={5}
          value={displayValue}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        <span style="text-sm text-muted-foreground">minutes</span>
      </div> */}
    </View>
  );
}