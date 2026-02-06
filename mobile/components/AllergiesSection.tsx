/**
 * AllergiesSection.tsx
 * A reusable input component for selecting the type of allergy.
 * Allows users to choose from predefined allergiess. See Allergy in shared module.
 */
import type { Allergy } from '@pantry2plate/shared';
import { useEffect, useState } from "react";
import { StyleProp, View, ViewStyle } from 'react-native';
import { Checkbox, Chip, List, Text } from 'react-native-paper';
import { CustomTextInput } from './ui/CustomTextInput';


const CUSTOM_REGEX = /^[a-zA-Z -]{1,20}$/; // letters, spaces, hyphens only, 1-20 chars
const MAX_CUSTOM_ALLERGIES = 5; // arbitrary limit to prevent abuse
// List of allergies for dynamic rendering
const ALLERGIES: Allergy[] = [
    'peanuts', 'tree-nuts', 'milk', 'eggs', 'wheat',
    'soy', 'fish', 'shellfish', 'sesame', 'corn',
    'mustard', 'celery', 'sulfites', 'lupin', 'other'
  ];

/**
 * Props for the AllergiesSection component
 */
interface AllergiesSectionProps {
  // Current value of the allergies
  value: Allergy[];
  // Function parent component provides to handle value changes
  onChange: (value: Allergy[]) => void;
  // If custom allergies 'other' is selected
  customValue: string[];
  onCustomChange: (value: string[]) => void;
  // Optional styling
  style?: StyleProp<ViewStyle>;
  // Optional callback for error messages
  onError?: (message: string) => void;
}

/**
 * AllergiesSection Component
 * @param AllergiesSectionProps but as destructured props
 * @returns A dropdown for selecting recipe allergies
 */
export function AllergiesSection({
  value,
  onChange,
  customValue,
  onCustomChange,
  style,
  onError
  }: AllergiesSectionProps ) {

  // Local state for the input display (allows any string while typing)
  const [displayCustom, setDisplayCustom] = useState('');
  const [isValid, setIsValid] = useState(false);

  const [expanded, setExpanded] = useState(false);
  const handlePress = () => setExpanded(!expanded);


  // Handler for adding custom allergies
  const handleCustomAdd = () => {
    const trimmed = displayCustom.trim();
    // Case invalid format
    if (!CUSTOM_REGEX.test(trimmed)) {
      onError?.("Invalid allergies. Use only letters, spaces, and hyphens (1-20 characters)");
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    const normalized = trimmed.toLowerCase().replace(/\s+/g, '-');
    // Case duplicate
    if (customValue.includes(normalized)) {
      onError?.("Duplicate allergy" + `"${normalized}" is already in the list`);
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    // Case conflict with predefined allergies
    if (ALLERGIES.includes(normalized as Allergy)) {
      // auto-select instead of error
      if (!value.includes(normalized as Allergy)) {
        onChange([...value, normalized as Allergy]);
        onError?.(`Selected predefined allergy "${trimmed}" has been selected from predefined options`);
      } else {
        onError?.("Already selected" + `"${trimmed}" is already checked`);  //TODO: this should be info, not error
        // toast.info("Already selected", {
        //   description: `"${trimmed}" is already checked`,
        // });
      }
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    // Case max reached
    if (customValue.length >= MAX_CUSTOM_ALLERGIES) {
      onError?.(`Maximum reached. You can only add up to ${MAX_CUSTOM_ALLERGIES} custom allergies`);
      setDisplayCustom('');
      setIsValid(false);
      return;
    }
    onCustomChange([...customValue, normalized]);
    setDisplayCustom('');
    setIsValid(true);
  };

  // Reset custom input when switching away from 'other'
  // NOTE: First argument is the code to run, second argument determines when to run it
  useEffect(
    // FIRST ARGUMENT: The effect function
    () => {
      if (!value.includes('other')) {
        setDisplayCustom('');
        setIsValid(false);
        // do not clear already added custom allergies
      }
    },
    // SECOND ARGUMENT: Dependency array
    [value, onCustomChange]);

  const handleToggle = (allergy: Allergy) => {
    if (value.includes(allergy)) {
      onChange(value.filter(a => a !== allergy));
    } else {
      onChange([...value, allergy]);
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
        title="Allergies"
        titleStyle={{ fontSize: 18, color: '#000' }}
        expanded={expanded}
        onPress={handlePress}
        style={{
          width: '100%',
          maxWidth: 360,
          minWidth: 180,
          backgroundColor: '#ffffff',
        }}
        >

        <View
          style={{
            backgroundColor: '#ffffff',
            paddingVertical: 8,
          }}>
          {/* Checkbox list for allergies */}
          {ALLERGIES.map((allergy) => (
          <View
            key={allergy}
            style={{
              flexDirection: 'row',
              width: '100%',
              maxWidth: 480,
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#ffffff'
              }}>
              <Checkbox.Android // enforce Android style for better UX
                status={value.includes(allergy) ? 'checked' : 'unchecked'}
                onPress={() => {
                  handleToggle(allergy);
                }}
                color="#007AFF"
                uncheckedColor="#666"
              />
            <Text style={{ fontSize: 16, color: '#000' }}>
              {allergy.charAt(0).toUpperCase() + allergy.slice(1).replace('-', ' ')}
            </Text>
          </View>
          ))}

          {/* custom input only shows if 'other' is selected */}
          {value.includes('other') && (
            <CustomTextInput
              value={displayCustom}
              onChangeText={setDisplayCustom}
              onBlur={handleCustomAdd} //handleCustomAdd?
              onSubmitEditing={handleCustomAdd}
              placeholder="Enter allergies"
              placeholderTextColor="#5a5f67"
              maxLength={20}
              returnKeyType='done'
              validationState={isValid ? 'valid' : 'invalid'} // never undefined
            />
          )}
        </View>
      </List.Accordion>

      {/* Display selected allergies as badges */}
      {(value.length > 0 || customValue.length > 0) && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
          {/* Predefined allergies */}
          {value.filter(a => a !== 'other').map((allergy) => (
            <Chip
              key={allergy}
              onClose={() => handleToggle(allergy)}
            >
              {allergy.charAt(0).toUpperCase() + allergy.slice(1).replaceAll('-', ' ')}
            </Chip>
          ))}
          {/* Custom allergies */}
          {customValue.map((allergy) => (
            <Chip
              key={allergy}
              onClose={() => {
                const newCustom = customValue.filter((_, i) => i !== customValue.indexOf(allergy));
                onCustomChange(newCustom);
              }}
            >
              {allergy.charAt(0).toUpperCase() + allergy.slice(1).replaceAll('-', ' ')}
            </Chip>
          ))}
        </View>
      )}
    </View>
  );
}