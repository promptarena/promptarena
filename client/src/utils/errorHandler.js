// src/utils/errorHandler.js
import toast from 'react-hot-toast';

export const handleError = (error, setError) => {
  const errorMessage =
    error?.response?.data?.message || 'An unexpected error occurred';
  console.error(errorMessage);

  // Display error using toast
  toast.error(errorMessage);

  // Update error state if setError is provided
  if (setError) {
    setError(errorMessage);
  }
};
