/**
 * GenerateButton.tsx
 * A button component to trigger recipe generation.
 */
import { ActivityIndicator, Pressable, StyleProp, StyleSheet, Text, TextStyle, ViewStyle } from 'react-native';

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
 * @returns A styled button that shows loading state and handles disabled state
 */
export function GenerateButton({ onPress, disabled, isLoading, style }: GenerateButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled || isLoading}  // Prevent press when disabled OR loading
      style={({ pressed }) => [
        {
          marginVertical: 24,
          paddingVertical: 16,
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: 360,
          minWidth: 220,
          height: 80,
          backgroundColor: disabled
            ? '#86efac'
            : pressed
              ? '#16a34a'
              : '#22c55e',
          borderRadius: 50,
          borderWidth: 3,
          borderColor: disabled
            ? '#4ade80'
            : pressed
              ? '#15803d'
              : '#16a34a',
        },
        style
      ]}
    >
      {isLoading ? (
        <ActivityIndicator
          color="#2c2cfb"
          size="large"
        />
      ) : (
        <Text style={styles.text}>Generate Menu</Text>
      )}
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


// NOTE: Paper version is simpler but less customizable.
// export function GenerateButton({ onPress, disabled, isLoading, style }: GenerateButtonProps) {
//   return (
//     <Button
//       mode="contained"
//       onPress={onPress}
//       disabled={disabled}
//       loading={isLoading}
//       buttonColor="#22c55e"
//       style={[
//         {
//           marginVertical: 24,
//           borderRadius: 12,
//           width: '100%',
//           maxWidth: 360,
//           minWidth: 240,
//         },
//         style
//       ]}
//       contentStyle={{
//         paddingVertical: 32,
//         alignItems: 'center',
//       }}
//       labelStyle={{
//         fontSize: 24,
//         fontWeight: '600',
//       }}
//     >
//       {isLoading ? 'Generating...' : 'Generate Menu'}
//     </Button>
//   );
// }