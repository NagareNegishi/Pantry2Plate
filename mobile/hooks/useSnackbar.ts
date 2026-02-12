/**
 * Custom hook to manage snackbar state and behavior.
 */
import { useState } from 'react';

type SnackbarType = 'error' | 'success' | 'info';

export const useSnackbar = () => {
  // Snackbar state
  const [snackbar, setSnackbar] = useState({
    visible: false,
    message: '',
    type: 'error' as SnackbarType
  });

  // Function to show snackbar messages
  const showSnackbar = (
    message: string,
    type: SnackbarType = 'error'
  ) => {
    setSnackbar({ visible: true, message, type });
  };

  const hideSnackbar = () => {
    setSnackbar(prev => ({ ...prev, visible: false }));
  };

  return {
    snackbar,
    showSnackbar,
    hideSnackbar
  };
};