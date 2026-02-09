/**
 * SaveRecipeButton.tsx
 * A button component for saving a recipe in a mobile application.
 */
import { StyleProp, ViewStyle } from 'react-native';
import { IconButton } from 'react-native-paper';

/**
 * Props for the SaveRecipeButton component.
 */
interface SaveRecipeButtonProps {
  onPress: () => void;
  isSaved: boolean;
  disabled: boolean;
  // Optional styling
  style?: StyleProp<ViewStyle>;
}


/**
 * SaveRecipeButton Component
 * @param SaveRecipeButtonProps but as destructured props
 * @returns A styled button that shows loading state and handles disabled state
 */
export function SaveRecipeButton({ onPress, isSaved, disabled, style }: SaveRecipeButtonProps) {
  return (
    <IconButton
      icon={isSaved ? "star" : "star-outline"}
      iconColor={isSaved ? "#fbbf24" : "#d1d5db"}
      size={32}
      onPress={onPress}
      disabled={disabled}
      style={style}
    />
  );
}