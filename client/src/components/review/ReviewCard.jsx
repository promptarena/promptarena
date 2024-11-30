// import React from 'react';
// import { useAuthStore } from '../../store/authStore';
// import { formatDate } from '../../utils/date';
// import { useReviewStore } from '../../store/reviewStore';

// const ReviewCard = ({ review, promptId }) => {
//   const { user } = useAuthStore();
//   const { deleteReview } = useReviewStore();

//   const handleDelete = () => {
//     if (window.confirm('Are you sure you want to delete this review?')) {
//       deleteReview(review._id, promptId).catch(console.error);
//     }
//   };

//   return (
//     <li className='mb-4 p-4 border rounded-lg'>
//       <div className='flex items-center mb-2'>
//         <span className='font-semibold mr-2'>{review.user.username}</span>
//         <span className='text-gray-600 text-sm'>
//           {formatDate(review.createdAt)}
//         </span>
//       </div>
//       <p className='text-gray-700'>{review.comment}</p>
//       <div className='flex space-x-2'>
//         {user && user._id === review.user._id && (
//           <>
//             <button
//               className='text-blue-600 hover:underline'
//               onClick={() => console.log('Edit functionality here')}
//             >
//               Edit
//             </button>
//             <button
//               className='text-red-600 hover:underline'
//               onClick={handleDelete}
//             >
//               Delete
//             </button>
//           </>
//         )}
//       </div>
//     </li>
//   );
// };

// export default ReviewCard;
