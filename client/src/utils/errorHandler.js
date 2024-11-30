// // src/utils/errorHandler.js

// export const handleError = (error, setError) => {
//   const errorMessage =
//     error?.response?.data?.message || 'An unexpected error occurred';
//   console.error(errorMessage); // Log error for debugging
//   setError(errorMessage); // Update error state in your store or component
// };

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
