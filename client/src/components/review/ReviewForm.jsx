// import React, { useState, useEffect } from 'react';
// import { useAuthStore } from '../../store/authStore';
// import { useReviewStore } from '../../store/reviewStore';
// import toast from 'react-hot-toast';

// const ReviewForm = ({
//   promptId,
//   isEditingMode = false,
//   existingReview = {},
//   onCancel,
// }) => {
//   const [rating, setRating] = useState(5); // Default rating
//   const [comment, setComment] = useState('');
//   const { createReview, updateReview } = useReviewStore();
//   const { user } = useAuthStore();

//   // Set up form for editing
//   useEffect(() => {
//     if (isEditingMode && existingReview) {
//       setRating(existingReview.rating || 5); // Ensure we have a valid rating
//       setComment(existingReview.comment || '');
//     } else {
//       setRating(5); // Reset to default when not editing
//       setComment('');
//     }
//   }, [isEditingMode, existingReview]);

//   const handleSubmit = async e => {
//     e.preventDefault();

//     // Validate comment and rating
//     if (
//       !comment.trim() ||
//       comment.trim().length < 3 ||
//       comment.trim().length > 100
//     ) {
//       toast.error('Comment must be between 3 and 100 characters long.');
//       return;
//     }

//     if (rating < 1 || rating > 5) {
//       toast.error('Please select a rating between 1 and 5.');
//       return;
//     }
//     if (!user) {
//       toast.error('Please login to submit a review.');
//       return;
//     }

//     // Prevent redundant updates
//     if (isEditingMode && existingReview._id) {
//       if (
//         existingReview.rating === rating &&
//         existingReview.comment === comment
//       ) {
//         toast.error('Review is already up to date.');
//         return;
//       }
//     }

//     try {
//       if (isEditingMode && existingReview._id) {
//         await updateReview(existingReview._id, promptId, rating, comment);
//       } else {
//         await createReview(promptId, rating, comment);
//       }
//       setRating(5);
//       setComment('');
//       onCancel(); // Close edit mode
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       toast.error(error || 'Error submitting review');
//     }
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow mt-4">
//       <h3 className="text-xl font-semibold mb-4">
//         {isEditingMode ? 'Edit Your Review' : 'Write a Review'}
//       </h3>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="rating">
//             Rating
//           </label>
//           <div className="flex space-x-1">
//             {[1, 2, 3, 4, 5].map(star => (
//               <svg
//                 key={star}
//                 onClick={() => setRating(star)}
//                 xmlns="http://www.w3.org/2000/svg"
//                 className={`h-6 w-6 cursor-pointer ${
//                   star <= rating ? 'text-yellow-500' : 'text-gray-300'
//                 }`}
//                 fill="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path d="M12 .587l3.668 7.431 8.232 1.194-5.95 5.787 1.407 8.193L12 18.896l-7.357 3.866 1.407-8.193-5.95-5.787 8.232-1.194z" />
//               </svg>
//             ))}
//           </div>
//           <p>Your rating: {rating}</p>
//         </div>
//         <div className="mb-4">
//           <label className="block text-gray-700" htmlFor="comment">
//             Comment
//           </label>
//           <textarea
//             id="comment"
//             value={comment}
//             onChange={e => setComment(e.target.value)}
//             className="border rounded-md p-2 w-full"
//             rows="4"
//             maxLength="100"
//           />
//           <p className="text-gray-500">{comment.length}/100 characters</p>
//         </div>
//         <div className="flex justify-between">
//           <button
//             type="submit"
//             className="bg-blue-500 text-white px-4 py-2 rounded"
//           >
//             {isEditingMode ? 'Update Review' : 'Submit Review'}
//           </button>
//           {isEditingMode && (
//             <button
//               type="button"
//               className="text-gray-500 underline"
//               onClick={onCancel}
//             >
//               Cancel
//             </button>
//           )}
//         </div>
//       </form>
//     </div>
//   );
// };

// export default ReviewForm;

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useReviewStore } from '../../store/reviewStore';
import toast from 'react-hot-toast';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const ReviewForm = ({
  promptId,
  isEditingMode = false,
  existingReview = {},
  onCancel,
}) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const { createReview, updateReview } = useReviewStore();
  const { user } = useAuthStore();

  useEffect(() => {
    if (isEditingMode && existingReview) {
      setRating(existingReview.rating || 5);
      setComment(existingReview.comment || '');
    } else {
      setRating(5);
      setComment('');
    }
  }, [isEditingMode, existingReview]);

  const handleSubmit = async e => {
    e.preventDefault();

    if (
      !comment.trim() ||
      comment.trim().length < 3 ||
      comment.trim().length > 100
    ) {
      toast.error('Comment must be between 3 and 100 characters long.');
      return;
    }

    if (rating < 1 || rating > 5) {
      toast.error('Please select a rating between 1 and 5.');
      return;
    }
    if (!user) {
      toast.error('Please login to submit a review.');
      return;
    }

    if (isEditingMode && existingReview._id) {
      if (
        existingReview.rating === rating &&
        existingReview.comment === comment
      ) {
        toast.error('Review is already up to date.');
        return;
      }
    }

    try {
      if (isEditingMode && existingReview._id) {
        await updateReview(existingReview._id, promptId, rating, comment);
      } else {
        await createReview(promptId, rating, comment);
      }
      setRating(5);
      setComment('');
      onCancel();
    } catch (error) {
      console.error('Error submitting review:', error);
      toast.error(error || 'Error submitting review');
    }
  };

  return (
    <motion.div
      className="bg-gray-900 p-6 rounded-lg shadow mt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h3 className="text-xl font-semibold text-white mb-4">
        {isEditingMode ? 'Edit Your Review' : 'Write a Review'}
      </h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-400" htmlFor="rating">
            Rating
          </label>
          <div className="flex space-x-1">
            {[1, 2, 3, 4, 5].map(star => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                className={`h-6 w-6 cursor-pointer transition-colors ${
                  star <= rating ? 'text-yellow-500' : 'text-gray-600'
                }`}
                fill={star <= rating ? 'currentColor' : 'none'}
              />
            ))}
          </div>
          <p className="text-gray-400">Your rating: {rating}</p>
        </div>
        <div className="mb-4">
          <label className="block text-gray-400" htmlFor="comment">
            Comment
          </label>
          <textarea
            id="comment"
            value={comment}
            onChange={e => setComment(e.target.value)}
            className="bg-gray-800 border border-gray-700 text-white rounded-md p-2 w-full focus:border-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-500"
            rows="4"
            maxLength="100"
          />
          <p className="text-gray-500">{comment.length}/100 characters</p>
        </div>
        <div className="flex justify-between">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded transition-all duration-200"
          >
            {isEditingMode ? 'Update Review' : 'Submit Review'}
          </motion.button>
          {isEditingMode && (
            <button
              type="button"
              className="text-gray-500 underline hover:text-gray-300 transition duration-150"
              onClick={onCancel}
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </motion.div>
  );
};

export default ReviewForm;
