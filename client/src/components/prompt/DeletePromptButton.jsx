// // src/components/prompt/DeletePromptButton.jsx
// import React from 'react';
// import { usePromptStore } from '../../store/promptStore';

// const DeletePromptButton = ({ promptId }) => {
//   const { deletePrompt, isLoading } = usePromptStore();

//   const handleDelete = async () => {
//     if (window.confirm('Are you sure you want to delete this prompt?')) {
//       try {
//         await deletePrompt(promptId);
//       } catch (error) {
//         console.error('Error deleting prompt:', error);
//       }
//     }
//   };

//   return (
//     <button
//       onClick={handleDelete}
//       disabled={isLoading}
//       className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//     >
//       {isLoading ? 'Deleting...' : 'Delete'}
//     </button>
//   );
// };

// export default DeletePromptButton;

// src/components/prompt/DeletePromptButton.jsx
import React from 'react';
import { usePromptStore } from '../../store/promptStore';
import useAlert from '../../hooks/useAlert'; // Import the useAlert hook

const DeletePromptButton = ({ promptId }) => {
  const { deletePrompt, isLoading } = usePromptStore();
  const { customConfirm, AlertModalComponent } = useAlert(); // Destructure customConfirm and AlertModalComponent from useAlert

  const handleDelete = async () => {
    // Use the customConfirm to ask for user confirmation
    customConfirm('Are you sure you want to delete this prompt?', async () => {
      try {
        await deletePrompt(promptId);
      } catch (error) {
        console.error('Error deleting prompt:', error);
      }
    });
  };

  return (
    <div>
      <button
        onClick={handleDelete}
        disabled={isLoading}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {isLoading ? 'Deleting...' : 'Delete'}
      </button>

      {/* Render the AlertModalComponent here */}
      {AlertModalComponent}
    </div>
  );
};

export default DeletePromptButton;
