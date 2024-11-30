// import React from 'react';
// import { formatDate } from '../../utils/date';
// import { useReviewStore } from '../../store/reviewStore';
// import { useAuthStore } from '../../store/authStore';
// import { Link } from 'react-router-dom';

// const ReviewList = ({ reviews, promptId, onEdit }) => {
//   const { deleteReview } = useReviewStore();
//   const { user: authUser, isAuthenticated } = useAuthStore();
//   console.log('authUser: ', authUser);

//   return (
//     <>
//       <div>
//         {reviews?.length === 0 && (
//           <p>No reviews yet. Be the first to review!</p>
//         )}
//         {reviews?.map((review) => (
//           <div key={review._id} className='border rounded-lg p-4 mb-4'>
//             <div className='flex items-center justify-between'>
//               <div>
//                 <img
//                   src={review.user?.profileImage}
//                   className='w-8 h-8 rounded-full mr-2'
//                 />
//                 <h4 className='font-semibold'>{review.user?.username}</h4>{' '}
//                 {/* Safely access username */}
//                 <h1 className='text-xxs font-thin text-blue-400'>
//                   <Link to={`/profile/username/${review.user?.username}`}>
//                     <span>@{review.user?.username}</span>
//                     {isAuthenticated && (
//                       <>
//                         <span className='mx-1'>•</span>
//                         {authUser.role === 'admin' && (
//                           <>
//                             <span className='text-red-400'>Admin</span>
//                             <span className='mx-1'>•</span>
//                           </>
//                         )}
//                         {authUser._id === review.user._id && (
//                           <span className='text-red-400'>You</span>
//                         )}
//                         {authUser._id !== review.user._id && (
//                           <span className='text-red-400'>Author</span>
//                         )}
//                       </>
//                     )}
//                   </Link>
//                 </h1>
//                 <span className='text-gray-500 text-sm'>
//                   {formatDate(review.createdAt)}
//                 </span>
//               </div>
//               {isAuthenticated &&
//                 (review.user._id === authUser._id ||
//                   authUser.role === 'admin') && (
//                   <div>
//                     <button
//                       className='text-blue-500 hover:underline mr-2'
//                       onClick={() => onEdit(review)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className='text-red-500 hover:underline'
//                       onClick={() => deleteReview(review._id, promptId)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//             </div>
//             <p>{review.comment}</p>
//           </div>
//         ))}
//       </div>
//       {reviews?.length !== 0 && (
//         <p>
//           {!isAuthenticated && (
//             <>
//               <p className='text-gray-500 text-sm'>
//                 You can also{' '}
//                 <Link to='/login' className='text-blue-500 hover:underline'>
//                   log in
//                 </Link>{' '}
//                 to write a review.
//               </p>
//             </>
//           )}
//         </p>
//       )}
//     </>
//   );
// };

// export default memo(ReviewList);

// --------------------------------------------

import React, { memo } from 'react';
import { formatDate } from '../../utils/date';
import { useReviewStore } from '../../store/reviewStore';
import { useAuthStore } from '../../store/authStore';
import { Link } from 'react-router-dom';

const ReviewList = ({ reviews, promptId, onEdit }) => {
  const { deleteReview } = useReviewStore();
  const { user: authUser, isAuthenticated } = useAuthStore();

  return (
    <>
      <div>
        {reviews?.length === 0 && (
          <p>No reviews yet. Be the first to review!</p>
        )}
        {reviews?.map(review => (
          <div key={review._id} className="border rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between">
              <div>
                {review.user ? (
                  <>
                    <img
                      src={review.user.profileImage}
                      className="w-8 h-8 rounded-full mr-2"
                      alt={review.user.username}
                    />
                    <h4 className="font-semibold">{review.user.username}</h4>
                    <h1 className="text-xxs font-thin text-blue-400">
                      <Link to={`/profile/username/${review.user.username}`}>
                        <span>@{review.user.username}</span>
                        {isAuthenticated && (
                          <>
                            <span className="mx-1">•</span>
                            {authUser.role === 'admin' && (
                              <>
                                <span className="text-red-400">Admin</span>
                                <span className="mx-1">•</span>
                              </>
                            )}
                            {authUser._id === review.user._id && (
                              <span className="text-red-400">You</span>
                            )}
                            {authUser._id !== review.user._id && (
                              <span className="text-red-400">Author</span>
                            )}
                          </>
                        )}
                      </Link>
                    </h1>
                    <span className="text-gray-500 text-sm">
                      {formatDate(review.createdAt)}
                    </span>
                  </>
                ) : (
                  <h4 className="font-semibold text-red-500">
                    User account deleted
                  </h4>
                )}
              </div>
              {isAuthenticated &&
                review.user &&
                (review.user._id === authUser._id ||
                  authUser.role === 'admin') && (
                  <div>
                    <button
                      className="text-blue-500 hover:underline mr-2"
                      onClick={() => onEdit(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => deleteReview(review._id, promptId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
            </div>
            {review.user ? (
              <p>{review.comment}</p>
            ) : (
              <p className="text-gray-500">
                This review was made by a deleted user.
              </p>
            )}
          </div>
        ))}
      </div>
      {reviews?.length !== 0 && (
        <p>
          {!isAuthenticated && (
            <p className="text-gray-500 text-sm">
              You can also{' '}
              <Link to="/login" className="text-blue-500 hover:underline">
                log in
              </Link>{' '}
              to write a review.
            </p>
          )}
        </p>
      )}
    </>
  );
};

export default memo(ReviewList);
