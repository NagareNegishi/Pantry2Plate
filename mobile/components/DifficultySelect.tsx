/**
 * DifficultySelect Component
 * A reusable input component for selecting the difficulty level of a recipe.
 * Allows users to choose from predefined difficulty levels: 'any', 'easy', 'medium', 'hard'.
 */
import type { Difficulty } from '@pantry2plate/shared';
import { View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';

import { Picker } from '@react-native-picker/picker';

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

/**
 * DifficultySelect Component
 * @param DifficultySelectProps but as destructured props
 * @returns A dropdown for selecting recipe difficulty
 */
export function DifficultySelect({ value, onChange, style }: DifficultySelectProps ) {
  
  return (
    // <div style={cn("flex flex-col w-full max-w-48 items-center gap-1.5", style)}>
    <View style={[{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 180,
      alignItems: 'flex-start', // or 'center'
      gap: 6,
    }, style]}>
      <Text style={{ fontSize: 20, color: '#000' }}>
        Difficulty
      </Text>



{/* placeholder="Select a Difficulty"? style="w-full max-w-48"  */}
      <Picker
        selectedValue={value}
        onValueChange={(value) => onChange(value as Difficulty)}
        style={{ width: '100%', maxWidth: 100, height: 40, textAlign: "left", borderRadius: 5 }} // without explicit width, it's not visible
      >
        <Picker.Item label="Any" value="any" />
        <Picker.Item label="Easy" value="easy" />
        <Picker.Item label="Medium" value="medium" />
        <Picker.Item label="Hard" value="hard" />
      </Picker>
    </View>
  );
}



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