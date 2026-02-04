/**
 * DifficultySelect Component
 * A reusable input component for selecting the difficulty level of a recipe.
 * Allows users to choose from predefined difficulty levels: 'any', 'easy', 'medium', 'hard'.
 */
import type { Difficulty } from '@pantry2plate/shared';
import { Picker } from '@react-native-picker/picker';
import { useState } from 'react';
import { Modal, Platform, Text as RNText, TouchableOpacity, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

/**
 * Props for the DifficultySelect component
 */
interface DifficultySelectProps {
  // Current value of the difficulty select
  value: Difficulty;
  // Function parent component provides to handle value changes
  onChange: (value: Difficulty) => void;
  // Optional styling
  style? : ViewStyle;
}


export function DifficultySelect({ value, onChange, style }: DifficultySelectProps) {
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  
  const getDisplayText = () => {
    if (!value) return 'Select difficulty';
    return value.charAt(0).toUpperCase() + value.slice(1);
  };

  // Web & Android: Use native picker directly
  if (Platform.OS === 'web' || Platform.OS === 'android') {
    return (
      <View style={[{
        flexDirection: 'column',
        width: '100%',
        maxWidth: 180,
        gap: 6,
      }, style]}>
        <Text style={{ fontSize: 20, color: '#000' }}>Difficulty</Text>
        <Picker
          selectedValue={value}
          onValueChange={onChange}
          style={{ width: '100%', height: 50 }}
        >
          <Picker.Item label="Any" value="any" />
          <Picker.Item label="Easy" value="easy" />
          <Picker.Item label="Medium" value="medium" />
          <Picker.Item label="Hard" value="hard" />
        </Picker>
      </View>
    );
  }

  // iOS: Custom touchable with modal picker
  return (
    <View style={[{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 180,
      gap: 6,
    }, style]}>
      <Text style={{ fontSize: 20, color: '#000' }}>Difficulty</Text>
      
      <TouchableOpacity
        onPress={() => setIsPickerVisible(true)}
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
        <RNText style={{ fontSize: 16, color: value ? '#000' : '#999' }}>
          {getDisplayText()}
        </RNText>
      </TouchableOpacity>

      <Modal
        visible={isPickerVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setIsPickerVisible(false)}
      >
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          {/* Backdrop */}
          <TouchableOpacity
            style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.5)' }}
            activeOpacity={1}
            onPress={() => setIsPickerVisible(false)}
          />
          
          {/* Picker container */}
          <View style={{ backgroundColor: '#fff' }}>
            <View style={{ 
              flexDirection: 'row', 
              justifyContent: 'flex-end', 
              padding: 16,
              borderBottomWidth: 1,
              borderBottomColor: '#ccc'
            }}>
              <TouchableOpacity onPress={() => setIsPickerVisible(false)}>
                <RNText style={{ fontSize: 18, color: '#007AFF', fontWeight: '600' }}>Done</RNText>
              </TouchableOpacity>
            </View>
            <Picker
              selectedValue={value}
              onValueChange={(itemValue) => {
                onChange(itemValue as Difficulty);
                setIsPickerVisible(false);  // Auto-close on selection
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
              <Picker.Item label="Any" value="any" color="#000" />
              <Picker.Item label="Easy" value="easy" color="#000" />
              <Picker.Item label="Medium" value="medium" color="#000" />
              <Picker.Item label="Hard" value="hard" color="#000" />
            </Picker>
          </View>
        </View>
      </Modal>
    </View>
  );
}



// /**
//  * DifficultySelect Component
//  * @param DifficultySelectProps but as destructured props
//  * @returns A dropdown for selecting recipe difficulty
//  */
// export function DifficultySelect({ value, onChange, style }: DifficultySelectProps ) {
  
//   return (
//     // <div style={cn("flex flex-col w-full max-w-48 items-center gap-1.5", style)}>
//     <View style={[{
//       flexDirection: 'column',
//       width: '100%',
//       maxWidth: 180,
//       alignItems: 'flex-start', // or 'center'
//       gap: 6,
//     }, style]}>
//       <Text style={{ fontSize: 20, color: '#000' }}>
//         Difficulty
//       </Text>



// {/* placeholder="Select a Difficulty"? style="w-full max-w-48"  */}
//       <Picker
//         selectedValue={value}
//         onValueChange={(value) => onChange(value as Difficulty)}
//         style={{ width: '100%', maxWidth: 100, height: 40, textAlign: "left", borderRadius: 5 }} // without explicit width, it's not visible
//       >
//         <Picker.Item label="Any" value="any" />
//         <Picker.Item label="Easy" value="easy" />
//         <Picker.Item label="Medium" value="medium" />
//         <Picker.Item label="Hard" value="hard" />
//       </Picker>
//     </View>
//   );
// }



// React Native Paper has NO select/dropdown component, so we attempt to use react-native-picker
// https://docs.expo.dev/versions/latest/sdk/picker/
// However, picker is platform-native, which means it looks different on iOS vs Android
//
// import { Picker } from '@react-native-picker/picker';
// <Picker
//   selectedValue={value}
//   onValueChange={(value) => onChange(value as Difficulty)}
//   style={{ width: '100%', maxWidth: 180 }} // without explicit width, it's not visible
// >
//   <Picker.Item label="Any" value="any" />
//   <Picker.Item label="Easy" value="easy" />
//   <Picker.Item label="Medium" value="medium" />
//   <Picker.Item label="Hard" value="hard" />
// </Picker>