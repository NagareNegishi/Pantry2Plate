/**
 * GenerateButton.tsx
 * A button component to trigger recipe generation.
 */
import { StyleProp, ViewStyle } from 'react-native';
import { Button } from 'react-native-paper';

/**
 * Props for the GenerateButton component.
 */
interface GenerateButtonProps {
  onPress: () => void;
  disabled: boolean;
  isLoading: boolean;
  // Optional styling
  style?: StyleProp<ViewStyle>;
}

/**
 * GenerateButton Component
 * @param GenerateButtonProps but as destructured props
 * @returns An input field to add ingredients with validation and a list to display added ingredients
 */
export function GenerateButton({ onPress, disabled, isLoading, style }: GenerateButtonProps) {
  return (
    <Button
      mode="contained"
      onPress={onPress}
      disabled={disabled}
      loading={isLoading}
      buttonColor="#22c55e"
      style={[
        {
          marginVertical: 24,
          borderRadius: 12,
        },
        style
      ]}
      contentStyle={{
        paddingVertical: 32,
        alignItems: 'center',
      }}
      labelStyle={{
        fontSize: 24,
        fontWeight: '600',
      }}
    >
      {isLoading ? 'Generating...' : 'Generate Menu'}
    </Button>
  );
}