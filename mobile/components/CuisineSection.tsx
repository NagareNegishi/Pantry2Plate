/**
 * CuisineSection.tsx
 * A reusable input component for selecting the cuisine type.
 * Allows users to choose from predefined cuisine types. See CuisineType in shared module.
 */
import type { CuisineType } from '@pantry2plate/shared';
import { useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { CustomDropdown } from './CustomDropdown';
import { CustomTextInput } from './ui/CustomTextInput';

const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars

/**
 * Props for the CuisineSection component
 */
interface CuisineSectionProps {
  // Current value of the cuisine type
  value: CuisineType;
  // Function parent component provides to handle value changes
  onChange: (value: CuisineType) => void;
  // If custom cuisine type 'other' is selected
  customValue: string;
  onCustomChange: (value: string) => void;
  // Optional styling
  style?: StyleProp<ViewStyle>;
  // Optional callback for error messages
  onError?: (message: string) => void;
}

/**
 * CuisineSection Component
 * @param CuisineSectionProps but as destructured props
 * @returns A dropdown for selecting recipe cuisine type
 */
export function CuisineSection({
  value,
  onChange,
  customValue,
  onCustomChange,
  style,
  onError
  }: CuisineSectionProps ) {
  
  // Local state for the input display (allows any string while typing)
  const [displayCustom, setDisplayCustom] = useState(customValue);
  const [isValid, setIsValid] = useState(false);

  // Handler for adding custom cuisine type
  const handleAdd = () => {
    const trimmed = displayCustom.trim();
    // Case invalid format
    if (!CUSTOM_REGEX.test(trimmed)) {
      onError?.("Invalid cuisine type. Use only letters, spaces, and hyphens (1-20 characters)");
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    onCustomChange(trimmed);
    setIsValid(true);
  };

  // Reset custom input when switching away from 'other'
  useEffect(
    () => {
      if (value !== 'other') {
        setDisplayCustom('');
        onCustomChange('');
        setIsValid(false);
      }
    },
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
        Cuisine Type
      </Text>

      {/* Dropdown for cuisine selection */}
      <CustomDropdown<CuisineType>
        value={value}
        onChange={onChange}
        style={{ maxWidth: 140 }}
        options={[
          'any',
          'Italian',
          'Chinese',
          'Mexican',
          'Japanese',
          'Indian',
          'Thai',
          'French',
          'Mediterranean',
          'American',
          'Korean',
          'Vietnamese',
          'Greek',
          'Spanish',
          'Middle Eastern',
          'other'
        ]}
      />

      {/* custom input only shows if 'other' is selected */}

      {/* custom input only shows if 'other' is selected */}
      {value === 'other' && (
        <CustomTextInput
          value={displayCustom}
          onChangeText={setDisplayCustom}
          onBlur={handleAdd}
          onSubmitEditing={handleAdd}
          placeholder='Enter cuisine type'
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
