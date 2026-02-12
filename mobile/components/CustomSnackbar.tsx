/**
 * CustomSnackbar component to display styled snackbar messages.
 */
import { Snackbar, Text } from 'react-native-paper';

const SNACKBAR_COLORS = {
  error: '#ce2f2f',
  success: '#4caf50',
  info: '#2196f3'
};

/**
 * Props for the CustomSnackbar component.
 */
interface CustomSnackbarProps {
  visible: boolean;
  message: string;
  type: 'error' | 'success' | 'info';
  onDismiss: () => void;
  duration?: number;
}

/**
 * CustomSnackbar component to display styled snackbar messages based on type.
 * @param CustomSnackbarProps as destructured props
 * @returns A styled Snackbar component from react-native-paper
 */
export const CustomSnackbar = ({
  visible,
  message,
  type,
  onDismiss,
  duration = 3000
}: CustomSnackbarProps) => (
  <Snackbar
    visible={visible}
    onDismiss={onDismiss}
    duration={duration}
    style={{
      backgroundColor: '#000000',
      marginBottom: 80,
      borderWidth: 1,
      borderColor: SNACKBAR_COLORS[type],
      borderRadius: 4
    }}
    wrapperStyle={{
      width: '90%',
      minWidth: 400,
      maxWidth: 600,
      alignSelf: 'center'
    }}
  >
    <Text style={{
      color: SNACKBAR_COLORS[type],
      textAlign: 'center',
    }}>
      {message}
    </Text>
  </Snackbar>
);