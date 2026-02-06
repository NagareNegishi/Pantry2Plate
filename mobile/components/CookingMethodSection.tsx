/**
 * CookingMethodSection.tsx
 * A reusable input component for selecting the type of cooking method.
 * Allows users to choose from predefined cooking method types. See CookingMethod in shared module.
 */
import type { CookingMethod } from '@pantry2plate/shared';
import { useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { CustomDropdown } from './CustomDropdown';
import { CustomTextInput } from './ui/CustomTextInput';

const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars

/**
 * Props for the CookingMethodSection component
 */
interface CookingMethodSectionProps {
  // Current value of the cooking method type
  value: CookingMethod;
  // Function parent component provides to handle value changes
  onChange: (value: CookingMethod) => void;
  // If custom cooking method type 'other' is selected
  customValue: string;
  onCustomChange: (value: string) => void;
  // Optional styling
  style?: StyleProp<ViewStyle>;
  // Optional callback for error messages
  onError?: (message: string) => void;
}

/**
 * CookingMethodSection Component
 * @param CookingMethodSectionProps but as destructured props
 * @returns A dropdown for selecting recipe cooking method type
 */
export function CookingMethodSection({
  value,
  onChange,
  customValue,
  onCustomChange,
  style,
  onError
  }: CookingMethodSectionProps ) {

  // Local state for the input display (allows any string while typing)
  const [displayCustom, setDisplayCustom] = useState(customValue);
  const [isValid, setIsValid] = useState(false);

  // Handler for adding custom cooking method type
  const handleAdd = () => {
    const trimmed = displayCustom.trim();
    // Case invalid format
    if (!CUSTOM_REGEX.test(trimmed)) {
      onError?.("Invalid cooking method. Use only letters, spaces, and hyphens (1-20 characters)");
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
    <View style={[{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 240,
      alignItems: 'flex-start',
      gap: 6,
    }, style]}>
      <Text style={{ fontSize: 20, color: '#000', flexWrap: 'nowrap' }}>
        Cooking Method
      </Text>

      {/* Dropdown for cooking method selection */}
      <CustomDropdown<CookingMethod>
        value={value}
        onChange={onChange}
        style={{ maxWidth: 140 }}
        options={[
          'any',
          'bake',
          'deep-fry',
          'grill',
          'steam',
          'boil',
          'roast',
          'slow-cook',
          'stir-fry',
          'sauté',
          'broil',
          'raw',
          'other'
        ]}
      />

      {/* custom input only shows if 'other' is selected */}
      {value === 'other' && (
        <CustomTextInput
          value={displayCustom}
          onChangeText={setDisplayCustom}
          onBlur={handleAdd}
          onSubmitEditing={handleAdd}
          placeholder='Enter cooking method'
          placeholderTextColor="#5a5f67"
          maxLength={20}
          returnKeyType='done'
          validationState={isValid ? 'valid' : 'invalid'} // never undefined
          style={{ width: '100%', maxWidth: 320 }}
        />
      )}

    </View>
  );
}
