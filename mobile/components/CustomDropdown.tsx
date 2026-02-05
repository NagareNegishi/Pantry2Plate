/**
 * CustomDropdownnnn Component
 * A reusable dropdown component that adapts to different platforms (iOS, Android, Web)
 * For iOS, it uses a custom modal picker to maintain consistent styling with the app
 * For Android and Web, it uses the native Picker component for better performance and platform integration
 */
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import {
  Modal, // Creates the overlay popup for iOS picker
  Platform, // Detects OS (ios/android/web) to render different UI
  Text,
  TouchableOpacity, // Tappable element (the input field + Done button)
  View,
  ViewStyle
} from 'react-native';
import { Text as PaperText } from 'react-native-paper';


/**
 * Props for the CustomDropdow component
 */
interface CustomDropdownProps {
  // Current value of the difficulty select
  value: any;
  // Function parent component provides to handle value changes
  onChange: (value: any) => void;
  // Optional styling
  style? : ViewStyle;
  // Array of value, label is not needed since we can just capitalize the value for display
  options: any[];
  // Label for the dropdown
  label: string;
}


/**
 * CustomDropdown Component
 * NOTE: React Native Paper has NO select/dropdown component, so we attempt to use react-native-picker
 * https://docs.expo.dev/versions/latest/sdk/picker/
 * However, picker is platform-native, which means it looks different on iOS vs Android
 * To address this, we implement a custom modal picker for iOS, while using native picker for Android & Web
 * @param CustomDropdownProps but as destructured props
 * @returns A dropdown for selecting a value from the provided options
 */
export function CustomDropdown({ value, onChange, style, options, label }: CustomDropdownProps) {
  const [isVisible, setIsVisible] = useState(false);

  // iOS: Custom touchable with modal picker
  if (Platform.OS === 'ios') {
    return (
      <View style={[{
        flexDirection: 'column',
        width: '100%',
        maxWidth: 100,
        gap: 6,
      }, style]}>
        <PaperText style={{ fontSize: 20, color: '#000' }}>
          {label}
        </PaperText>
        
        {/* Input field to open picker modal */}
        <TouchableOpacity
          onPress={() => setIsVisible(true)}
          style={{
            paddingVertical: 12,
            paddingHorizontal: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            borderRadius: 5,
            backgroundColor: '#fff',
            minHeight: 44,
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 16, color: '#000'}}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Text>
        </TouchableOpacity>

        {/* Popup: https://reactnative.dev/docs/modal */}
        <Modal
          visible={isVisible}
          transparent={true}
          animationType="fade"
          onRequestClose={() => setIsVisible(false)}
        >
          <View style={{
            flex: 1, // Fullscreen
            justifyContent: 'flex-end' // Align picker to bottom
          }}>
            {/* Backdrop */}
            <TouchableOpacity
              style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
              activeOpacity={1} // Prevents opacity change on press
              onPress={() => setIsVisible(false)}
            />
            
            {/* Picker container */}
            <View style={{ backgroundColor: '#fff' }}>

              {/* Done button to close picker */}
              <View style={{
                flexDirection: 'row',
                justifyContent: 'flex-end', // Push children to right side (Done button on right)
                padding: 16,
                borderBottomWidth: 1,
                borderBottomColor: '#ccc'
              }}>
                <TouchableOpacity onPress={() => setIsVisible(false)}>
                  <Text style={{ fontSize: 18, color: '#007AFF', fontWeight: '600' }}>Done</Text>
                </TouchableOpacity>
              </View>

              {/* Actual Picker */}
              <Picker
                selectedValue={value}
                onValueChange={(value) => {
                  onChange(value);
                  setIsVisible(false);  // Auto-close on selection
                }}
                style={{
                  backgroundColor: '#fff',
                  height: 200,
                }}
                itemStyle={{
                  color: '#000',
                  fontSize: 20,
                }}
              >
                {options.map((option) => (
                  <Picker.Item
                    key={option}
                    label={option.charAt(0).toUpperCase() + option.slice(1)}
                    value={option} color="#000"
                  />
                ))}
              </Picker>
            </View>
          </View>
        </Modal>
      </View>
    );
  }

  // Web, Android, Windows, macOS: Use native picker directly
  return (
    <View style={[{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 180,
      alignItems: 'flex-start', // or 'center'
      gap: 6,
    }, style]}>
      <PaperText style={{ fontSize: 20, color: '#000' }}>
        {label}
      </PaperText>
      <Picker
        selectedValue={value}
        onValueChange={onChange}
        style={{ width: '100%', maxWidth: 100, height: 40, textAlign: "left", borderRadius: 5 }} // without explicit width, it's not visible
      >

        {/* Dynamically render options */}
        {options.map((option) => (
          <Picker.Item
            key={option}
            label={option.charAt(0).toUpperCase() + option.slice(1)}
            value={option}
          />
        ))}
      </Picker>
    </View>
  );
}