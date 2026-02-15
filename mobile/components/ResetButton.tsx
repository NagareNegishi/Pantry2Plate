/**
 * ResetButton.tsx
 * A button component to reset/clear all form inputs.
 */
import { Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

interface ResetButtonProps {
  onPress: () => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function ResetButton({ onPress, disabled = false, style }: ResetButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        {
          marginVertical: 24,
          paddingVertical: 16,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 360,
          minWidth: 240,
          height: 80,
          backgroundColor: disabled
            ? '#fca5a5'
            : pressed
              ? '#dc2626'
              : '#ef4444',
          borderRadius: 50,
          borderWidth: 3,
          borderColor: disabled
            ? '#f87171'
            : pressed
              ? '#b91c1c'
              : '#dc2626',
        },
        style
      ]}
    >
      <Text style={styles.text}>Reset</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: '600',
    color: '#f4fb76',
    textShadowColor: '#000000',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 2,
  } as TextStyle,
});