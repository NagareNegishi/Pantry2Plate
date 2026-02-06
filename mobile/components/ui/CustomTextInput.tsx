/**
 * CustomTextInput Component
 * A reusable text input component with built-in validation and styling.
 * Can be used for various text inputs across the app, such as custom meal type.
 */
import { StyleProp, TextInput, TextStyle } from 'react-native';


/**
 * Props for the CustomTextInput component
 */
interface CustomTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  onBlur?: () => void;
  onSubmitEditing?: () => void;
  placeholder?: string;
  placeholderTextColor?: string;
  maxLength?: number;
  returnKeyType?: 'done' | 'go' | 'next' | 'search' | 'send';
  validationState?: 'valid' | 'invalid';
  style?: StyleProp<TextStyle>;
  
}


/**
 * CustomTextInput Component
 * @param CustomTextInputProps but as destructured props
 * @returns A styled TextInput with validation feedback
 */
export function CustomTextInput({
  value,
  onChangeText,
  onBlur,
  onSubmitEditing,
  placeholder = "Enter text",
  placeholderTextColor = "#5a5f67",
  maxLength = 20,
  returnKeyType = 'done',
  validationState,
  style
}: CustomTextInputProps) {
  // Determine border/background based on validation state
  const validationStyles =
    validationState === 'valid'
      ? { borderColor: '#4ade80', backgroundColor: '#d1fae5' }
      : validationState === 'invalid'
      ? { borderColor: '#f87171', backgroundColor: '#fee2e2' }
      : { borderColor: '#d1d5db', backgroundColor: '#fff' }; // neutral when undefined

  return (
    <TextInput
      placeholder={placeholder}
      placeholderTextColor={placeholderTextColor}
      value={value}
      onChangeText={onChangeText}
      onBlur={onBlur}
      onSubmitEditing={onSubmitEditing}
      maxLength={maxLength}
      returnKeyType={returnKeyType}
      style={[
        {
          width: '100%',
          maxWidth: 320,
          height: 40,
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderWidth: 1,
          borderRadius: 4,
          fontSize: 16,
          color: '#000',
        },
        validationStyles,
        style // Allow parent overrides
      ]}
    />
  );
}


/**
 * NOTE: Paper TextInput version, unfortunately it has unfixed bugs.
 * - While typing, some letter (g, j, p) get cut off at the bottom.
 * - it can be fixed by using mode="flat" or just accept default hight of the TextInput,
 *   but then the styling looks off compared to other inputs. So we use custom TextInput for now.
 */
  // { value === 'other' && (
  //   <TextInput
  //     mode="outlined"
  //     placeholder="Enter meal type"
  //     value={displayCustom}
  //     onChangeText={setDisplayCustom}
  //     onBlur={handleAdd}
  //     onSubmitEditing={handleAdd}
  //     maxLength={20}
  //     returnKeyType="done"
  //     // Override default outline color
  //     outlineColor={isValid ? '#4ade80' : '#f87171'}
  //     activeOutlineColor={isValid ? '#4ade80' : '#f87171'}
  //     style={[
  //       {
  //         width: '100%',
  //         maxWidth: 320,
  //         height: 40,
  //         textAlign: 'left',
  //       },
  //       isValid === true
  //         ? { backgroundColor: '#d1fae5' }
  //         : { backgroundColor: '#fee2e2' },
  //     ]}
  //   />
  // )}