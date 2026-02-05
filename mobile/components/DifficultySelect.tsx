/**
 * DifficultySelect Component
 * A reusable input component for selecting the difficulty level of a recipe.
 * Allows users to choose from predefined difficulty levels: 'any', 'easy', 'medium', 'hard'.
 */
import type { Difficulty } from '@pantry2plate/shared';
import {
  ViewStyle
} from 'react-native';
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
  style? : ViewStyle;
}


/**
 * DifficultySelect Component
 * @param DifficultySelectProps but as destructured props
 * @returns A dropdown for selecting recipe difficulty
 */
export function DifficultySelect({ value, onChange, style }: DifficultySelectProps) {
  return (
    <CustomDropdown<Difficulty>
      value={value}
      onChange={onChange}
      style={style}
      options={['any', 'easy', 'medium', 'hard']}
      label="Difficulty"
    />
  );
}