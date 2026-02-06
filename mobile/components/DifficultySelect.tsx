/**
 * DifficultySelect Component
 * A reusable input component for selecting the difficulty level of a recipe.
 * Allows users to choose from predefined difficulty levels: 'any', 'easy', 'medium', 'hard'.
 */
import type { Difficulty } from '@pantry2plate/shared';
import { StyleProp, View, ViewStyle } from 'react-native';
import { Text } from 'react-native-paper';
import { CustomDropdown } from './CustomDropdown';


/**
 * Props for the DifficultySelect component
 */
interface DifficultySelectProps {
  // Current value of the difficulty select
  value: Difficulty;
  // Function parent component provides to handle value changes
  onChange: (value: Difficulty) => void;
  // Optional styling
  style?: StyleProp<ViewStyle>;
}


/**
 * DifficultySelect Component
 * @param DifficultySelectProps but as destructured props
 * @returns A dropdown for selecting recipe difficulty
 */
export function DifficultySelect({ value, onChange, style }: DifficultySelectProps) {
  return (
    <View style={[{
      flexDirection: 'column',
      width: '100%',
      maxWidth: 160,
      alignItems: 'flex-start',
      gap: 6,
    }, style]}>
      <Text style={{ fontSize: 20, color: '#000', flexWrap: 'nowrap' }}>
        Difficulty
      </Text>
      <CustomDropdown<Difficulty>
        value={value}
        onChange={onChange}
        options={['any', 'easy', 'medium', 'hard']}
      />
    </View>
  );
}