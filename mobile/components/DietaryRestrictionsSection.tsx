/**
 * DietaryRestrictionsSection.tsx
 * A reusable input component for selecting the type of dietary restriction.
 * Allows users to choose from predefined dietary restrictions. See DietaryRestriction in shared module.
 */
import type { DietaryRestriction } from '@pantry2plate/shared';
import { useEffect, useRef, useState } from "react";
import { StyleProp, View, ViewStyle } from 'react-native';
import { Checkbox, Chip, List, Text } from 'react-native-paper';
import { CustomTextInput } from './ui/CustomTextInput';


const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars
const MAX_CUSTOM_DIETARY_RESTRICTIONS = 3; // arbitrary limit to prevent abuse
// List of dietary restrictions for dynamic rendering
const DIETARY_RESTRICTIONS: DietaryRestriction[] = [
    'vegetarian', 'vegan', 'gluten-free', 'dairy-free',
    'nut-free', 'shellfish-free', 'halal', 'kosher',
    'keto', 'paleo', 'low-carb', 'low-fat', 'other'
  ];

/**
 * Props for the DietaryRestrictionsSection component
 */
interface DietaryRestrictionsSectionProps {
  // Current value of the dietary restrictions
  value: DietaryRestriction[];
  // Function parent component provides to handle value changes
  onChange: (value: DietaryRestriction[]) => void;
  // If custom dietary restrictions 'other' is selected
  customValue: string[];
  onCustomChange: (value: string[]) => void;
  // Optional styling
  style?: StyleProp<ViewStyle>;
  // Optional callback for error messages
  onError?: (message: string) => void;
  onInfo?: (message: string) => void;
}

/**
 * DietaryRestrictionsSection Component
 * @param DietaryRestrictionsSectionProps but as destructured props
 * @returns A dropdown for selecting recipe dietary restrictions
 */
export function DietaryRestrictionsSection({
  value,
  onChange,
  customValue,
  onCustomChange,
  style,
  onError,
  onInfo
  }: DietaryRestrictionsSectionProps ) {

  const [displayCustom, setDisplayCustom] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const isSubmitting = useRef(false);

  // Handler for accordion toggle
  const handlePress = () => setExpanded(!expanded);

  // Handler for custom input changes
  const handleChange = (input: string) => {
    setDisplayCustom(input);
    setIsValid(CUSTOM_REGEX.test(input.trim()));
  };

  // Handler for adding custom dietary restrictions
  const handleCustomAdd = () => {
    const trimmed = displayCustom.trim();
    // Case invalid format
    if (!CUSTOM_REGEX.test(trimmed)) {
      onError?.("Invalid dietary restriction. Use only letters, spaces, and hyphens (1-20 characters)");
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    const normalized = trimmed.toLowerCase().replace(/\s+/g, '-');
    // Case duplicate
    if (customValue.includes(normalized)) {
      onError?.("Duplicate dietary restriction" + `"${normalized}" is already in the list`);
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    // Case conflict with predefined dietary restrictions
    if (DIETARY_RESTRICTIONS.includes(normalized as DietaryRestriction)) {
      // auto-select instead of error
      if (!value.includes(normalized as DietaryRestriction)) {
        onChange([...value, normalized as DietaryRestriction]);
        onInfo?.(`${trimmed}" is selected from predefined dietary restrictions`);
      } else {
        onInfo?.(`"${trimmed}" is already checked`);
      }
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    // Case max reached
    if (customValue.length >= MAX_CUSTOM_DIETARY_RESTRICTIONS) {
      onError?.(`Maximum reached. You can only add up to ${MAX_CUSTOM_DIETARY_RESTRICTIONS} custom dietary restrictions`);
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    onCustomChange([...customValue, normalized]);
    setDisplayCustom('');
    setIsValid(true);
  };

  // Handler for submitting custom restriction (on blur or submit)
  const handleSubmit = () => {
    isSubmitting.current = true;
    handleCustomAdd();
    setTimeout(() => { isSubmitting.current = false; }, 100);
  };

  // Handler for blur event on custom input
  const handleBlur = () => {
    if (isSubmitting.current) return;
    handleCustomAdd();
  };

  // Reset custom input when switching away from 'other'
  // NOTE: First argument is the code to run, second argument determines when to run it
  useEffect(
    // FIRST ARGUMENT: The effect function
    () => {
      if (!value.includes('other')) {
        setDisplayCustom('');
        setIsValid(false);
        // do not clear already added custom dietary restrictions
      }
    },
    // SECOND ARGUMENT: Dependency array
    [value, onCustomChange]);

  // Handler for toggling predefined dietary restrictions
  const handleToggle = (restriction: DietaryRestriction) => {
    if (value.includes(restriction)) {
      onChange(value.filter(a => a !== restriction));
    } else {
      onChange([...value, restriction]);
    }
  }

  return (
    <View style={[{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 480,
      alignItems: 'flex-start',
      gap: 6,
    }, style]}>

      <List.Accordion
        title="Dietary Restrictions"
        titleStyle={{
          fontSize: 18,
          color: '#000',
          paddingBottom: 6,
          borderBottomWidth: 2,
          borderBottomColor: '#000',
          textAlign: 'center',
          width: '100%'
        }}
        expanded={expanded}
        onPress={handlePress}
        style={{
          width: '100%',
          maxWidth: 480,
          minWidth: 260,
          backgroundColor: 'transparent',
        }}
        theme={{
          colors: {
            background: 'transparent',
          }
        }}
      >

        <View
          style={{
            backgroundColor: 'transparent',
            paddingVertical: 8,
          }}>
          {/* Checkbox list for Dietary Restrictions */}
          {DIETARY_RESTRICTIONS.map((restriction) => (
            <View
              key={restriction}
              style={{
                flexDirection: 'row',
                width: '100%',
                maxWidth: 480,
                alignItems: 'center',
                gap: 8,
                backgroundColor: 'transparent',
                }}>
                <Checkbox.Android // enforce Android style for better UX
                  status={value.includes(restriction) ? 'checked' : 'unchecked'}
                  onPress={() => {
                    handleToggle(restriction);
                  }}
                  color="#007AFF"
                  uncheckedColor="#313131"
                />
              <Text style={{ fontSize: 16, color: '#000' }}>
                {restriction.charAt(0).toUpperCase() + restriction.slice(1).replace('-', ' ')}
              </Text>
            </View>
          ))}

          {/* custom input only shows if 'other' is selected */}
          {value.includes('other') && (
            <CustomTextInput
              value={displayCustom}
              onChangeText={handleChange}
              onBlur={handleBlur}
              onSubmitEditing={handleSubmit}
              placeholder="Enter dietary restrictions"
              placeholderTextColor="#5a5f67"
              maxLength={20}
              returnKeyType='done'
              validationState={isValid ? 'valid' : 'invalid'} // never undefined
              style={{ marginTop: 8 }}
            />
          )}
        </View>
      </List.Accordion>

      {/* Display selected Dietary Restrictions as badges */}
      {(value.length > 0 || customValue.length > 0) && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {/* Predefined Dietary Restrictions */}
          {value.filter(a => a !== 'other').map((restriction) => (
            <Chip
              key={restriction}
              onClose={() => handleToggle(restriction)}
            >
              {restriction.charAt(0).toUpperCase() + restriction.slice(1).replaceAll('-', ' ')}
            </Chip>
          ))}
          {/* Custom Dietary Restrictions */}
          {customValue.map((restriction) => (
            <Chip
              key={restriction}
              onClose={() => {
                const newCustom = customValue.filter((_, i) => i !== customValue.indexOf(restriction));
                onCustomChange(newCustom);
              }}
            >
              {restriction.charAt(0).toUpperCase() + restriction.slice(1).replaceAll('-', ' ')}
            </Chip>
          ))}
        </View>
      )}
    </View>
  );
}
