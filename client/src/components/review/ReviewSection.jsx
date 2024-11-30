// import React, { useEffect } from 'react';
// import { useReviewStore } from '../../store/reviewStore';
// import ReviewForm from './ReviewForm';
// import ReviewList from './ReviewList';
// import LoadingSpinner from '../animations/loader/LoadingSpinner';

// const ReviewSection = ({ promptId }) => {
//   const { fetchReviewsForPrompt, reviews, isLoading, error } = useReviewStore();

//   useEffect(() => {
//     fetchReviewsForPrompt(promptId).catch(console.error);
//   }, [promptId, fetchReviewsForPrompt]);

//   return (
//     <div className='mt-8'>
//       <h3 className='text-xl font-semibold mb-4'>Reviews</h3>
//       {isLoading ? (
//         <LoadingSpinner />
//       ) : error ? (
//         <p className='text-red-500'>{error}</p>
//       ) : (
//         <>
//           <ReviewList reviews={reviews[promptId] || []} promptId={promptId} />
//           <ReviewForm promptId={promptId} />
//         </>
//       )}
//     </div>
//   );
// };

// export default ReviewSection;
