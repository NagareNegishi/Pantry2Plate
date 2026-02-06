/**
 * FlavorProfilesSection.tsx
 * A reusable input component for selecting the type of flavor profiles.
 * Allows users to choose from predefined flavor profiles. See FlavorProfile in shared module.
 * NOTE: FlavorProfile type has 'any' option, however it is not included in checkbox list here.
 * if both values and customValues are empty, it implies 'any'.
 */
import type { FlavorProfile } from '@pantry2plate/shared';
import { useEffect, useRef, useState } from "react";
import { StyleProp, View, ViewStyle } from 'react-native';
import { Checkbox, Chip, List, Text } from 'react-native-paper';
import { CustomTextInput } from './ui/CustomTextInput';

const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars
const MAX_FLAVOR_PROFILES = 3;
// List of flavor profiles for dynamic rendering
const FLAVOR_PROFILES: FlavorProfile[] = [
    'sweet', 'spicy', 'savory', 'sour', 'umami', 'bitter', 'other'
  ];

/**
 * Props for the FlavorProfilesSection component
 */
interface FlavorProfilesSectionProps {
  // Current value of the flavor profiles
  value: FlavorProfile[];
  // Function parent component provides to handle value changes
  onChange: (value: FlavorProfile[]) => void;
  // If custom flavor profiles 'other' is selected
  customValue: string[];
  onCustomChange: (value: string[]) => void;
  // Optional styling
  style?: StyleProp<ViewStyle>;
  // Optional callback for error messages
  onError?: (message: string) => void;
  onInfo?: (message: string) => void;
}

/**
 * FlavorProfilesSection Component
 * @param FlavorProfilesSectionProps but as destructured props
 * @returns A dropdown for selecting recipe flavor profiles
 */
export function FlavorProfilesSection({
  value,
  onChange,
  customValue,
  onCustomChange,
  style,
  onError,
  onInfo
  }: FlavorProfilesSectionProps ) {

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

  // Handler for adding custom flavor profiles
  const handleCustomAdd = () => {
    // Case max reached
    const flavorCount = value.filter(f => f !== 'other').length + customValue.length;
    if (flavorCount >= MAX_FLAVOR_PROFILES) {
      onError?.(`Maximum reached: You can only add up to ${MAX_FLAVOR_PROFILES} flavor profiles`);
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    // Case invalid format
    const trimmed = displayCustom.trim();
    if (!CUSTOM_REGEX.test(trimmed)) {
      onError?.("Invalid flavor profiles. Use only letters, spaces, and hyphens (1-20 characters)");
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    // Case duplicate
    const normalized = trimmed.toLowerCase().replace(/\s+/g, '-');
    if (customValue.includes(normalized)) {
      onError?.("Duplicate flavor profiles: " + `"${normalized}" is already in the list`);
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    // Case conflict with predefined flavor profiles
    if (FLAVOR_PROFILES.includes(normalized as FlavorProfile)) {
      // auto-select instead of error
      if (!value.includes(normalized as FlavorProfile)) {
        onChange([...value, normalized as FlavorProfile]);
        onInfo?.(`${trimmed}" is selected from predefined flavor profiles`);
      } else {
        onInfo?.(`"${trimmed}" is already checked`);
      }
      setDisplayCustom('');
      setIsValid(false);
      return;
    }

    onCustomChange([...customValue, normalized]);
    setDisplayCustom('');
    setIsValid(true);
  };

  // Handler for submitting custom flavor (on blur or submit)
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
        // do not clear already added custom flavor profiles
      }
    },
    // SECOND ARGUMENT: Dependency array
    [value, onCustomChange]);

  // Handler for toggling checkbox
  const handleToggle = (flavor: FlavorProfile) => {
    if (value.includes(flavor)) {
      onChange(value.filter(a => a !== flavor));
    } else {
      const flavorCount = value.filter(f => f !== 'other').length + customValue.length;
      if (flavorCount >= MAX_FLAVOR_PROFILES) {
        onError?.(`Maximum reached: You can only add up to ${MAX_FLAVOR_PROFILES} flavor profiles`);
        return;
      }
      onChange([...value, flavor]);
    }
  }

  return (
    <View style={[{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 360,
      alignItems: 'flex-start',
      gap: 6,
    }, style]}>

      <List.Accordion
        title="Flavor Profiles"
        titleStyle={{ fontSize: 18, color: '#000' }}
        expanded={expanded}
        onPress={handlePress}
        style={{
          width: '100%',
          maxWidth: 360,
          minWidth: 240,
          backgroundColor: '#ffffff',
        }}
      >
        <View
          style={{
            backgroundColor: '#ffffff',
            paddingVertical: 8,
          }}>
          {/* Checkbox list for flavors */}
          {FLAVOR_PROFILES.map((flavor) => (
            <View
              key={flavor}
              style={{
                flexDirection: 'row',
                width: '100%',
                maxWidth: 480,
                alignItems: 'center',
                gap: 8,
                backgroundColor: '#ffffff'
                }}>
                <Checkbox.Android // enforce Android style for better UX
                  status={value.includes(flavor) ? 'checked' : 'unchecked'}
                  onPress={() => {
                    handleToggle(flavor);
                  }}
                  color="#007AFF"
                  uncheckedColor="#666"
                />
              <Text style={{ fontSize: 16, color: '#000' }}>
                {flavor.charAt(0).toUpperCase() + flavor.slice(1).replace('-', ' ')}
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
              placeholder="Enter flavor profiles"
              placeholderTextColor="#5a5f67"
              maxLength={20}
              returnKeyType='done'
              validationState={isValid ? 'valid' : 'invalid'} // never undefined
            />
          )}
        </View>
      </List.Accordion>
      
      {/* Display selected flavors as badges */}
      {(value.length > 0 || customValue.length > 0) && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {/* Predefined flavors */}
          {value.filter(a => a !== 'other').map((flavor) => (
            <Chip
              key={flavor}
              onClose={() => handleToggle(flavor)}
            >
              {flavor.charAt(0).toUpperCase() + flavor.slice(1).replaceAll('-', ' ')}
            </Chip>
          ))}
          {/* Custom flavors */}
          {customValue.map((flavor) => (
            <Chip
              key={flavor}
              onClose={() => {
                const newCustom = customValue.filter((_, i) => i !== customValue.indexOf(flavor));
                onCustomChange(newCustom);
              }}
            >
              {flavor.charAt(0).toUpperCase() + flavor.slice(1).replaceAll('-', ' ')}
            </Chip>
          ))}
        </View>
      )}
    </View>
  );
}
