import { useCallback } from 'react';
import Toast, { ToastShowParams } from 'react-native-toast-message';

// Define types for the options you might pass in the showToast function
interface ToastOptions {
  visibilityTime?: number;
  position?: 'top' | 'bottom';
  // Add any other custom options you want to allow
}

const useToast = () => {
  // Show a toast notification
  const showToast = useCallback(
    (type: 'success' | 'error' | 'info' | 'customToast', title: string, message: string, options: ToastOptions = {}) => {
      const toastConfig: ToastShowParams = {
        type,           // 'success', 'error', 'info', or custom types
        text1: title,   // Main title text
        text2: message, // Subtitle text (optional)
        position: 'bottom', // Default position
        ...options,     // Additional options like visibilityTime, etc.
      };
      
      Toast.show(toastConfig);
    },
    []
  );

  // Pre-configured toasts for specific use cases
  const showSuccess = useCallback(
    (title: string, message: string, options: ToastOptions = {}) => {
      showToast('success', title, message, options);
    },
    [showToast]
  );

  const showError = useCallback(
    (title: string, message: string, options: ToastOptions = {}) => {
      showToast('error', title, message, options);
    },
    [showToast]
  );

  const showInfo = useCallback(
    (title: string, message: string, options: ToastOptions = {}) => {
      showToast('info', title, message, options);
    },
    [showToast]
  );

  return {
    showToast,
    showSuccess,
    showError,
    showInfo,
  };
};

export default useToast;
