/**
 * MealTypeSection.tsx
 * A reusable input component for selecting the type of meal.
 * Allows users to choose from predefined meal types. See MealType in shared module.
 */
import type { MealType } from '@pantry2plate/shared';
import { useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { CustomDropdown } from './CustomDropdown';
import { CustomTextInput } from './ui/CustomTextInput';

const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars

/**
 * Props for the MealTypeSection component
 */
interface MealTypeSectionProps {
  // Current value of the meal type
  value: MealType;
  // Function parent component provides to handle value changes
  onChange: (value: MealType) => void;
  // If custom meal type 'other' is selected
  customValue: string;
  onCustomChange: (value: string) => void;
  // Optional styling
  style?: StyleProp<ViewStyle>;
  // Optional callback for error messages
  onError?: (message: string) => void;
}

/**
 * MealTypeSection Component
 * @param MealTypeSectionProps but as destructured props
 * @returns A dropdown for selecting recipe meal type
 */
export function MealTypeSection({ value, onChange, customValue, onCustomChange, style, onError }: MealTypeSectionProps ) {
  
  // Local state for the input display (allows any string while typing)
  const [displayCustom, setDisplayCustom] = useState(customValue);
  const [isValid, setIsValid] = useState(false);


  // Handler for adding custom meal type
  const handleAdd = () => {
    const trimmed = displayCustom.trim();
    // Case invalid format
    if (!CUSTOM_REGEX.test(trimmed)) {
      onError?.("Invalid meal type. Use only letters, spaces, and hyphens (1-20 characters)");
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    onCustomChange(trimmed);
    setIsValid(true);
  };


  // Reset custom input when switching away from 'other'
  // NOTE: First argument is the code to run, second argument determines when to run it
  useEffect(
    // FIRST ARGUMENT: The effect function
    () => {
      if (value !== 'other') {
        setDisplayCustom('');
        onCustomChange('');
        setIsValid(false);
      }
    },
    // SECOND ARGUMENT: Dependency array
    [value, onCustomChange]);


  return (
    // <div style={cn("flex flex-col w-full max-w-40 items-center gap-1.5", style)}>
    <View style={[{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 240,
      alignItems: 'flex-start',
      gap: 6,
    }, style]}>
      <Text style={{ fontSize: 20, color: '#000', flexWrap: 'nowrap' }}>
        Meal Type
      </Text>

      {/* Dropdown for meal type selection */}
      <CustomDropdown<MealType>
        value={value}
        onChange={onChange}
        style={{ maxWidth: 140 }}
        options={['any', 'breakfast', 'lunch', 'dinner', 'snack', 'brunch', 'dessert', 'other']}
      />

      {/* custom input only shows if 'other' is selected */}

{value === 'other' && (
        <CustomTextInput
          value={displayCustom}
          onChangeText={setDisplayCustom}
          onBlur={handleAdd}
          onSubmitEditing={handleAdd}
          placeholder='Enter meal type'
          maxLength={20}
          returnKeyType='done'
          validationState={isValid ? 'valid' : 'invalid'} // never undefined
          style={{ width: '100%', maxWidth: 320 }}
        />
      )}

    </View>
  );
}

