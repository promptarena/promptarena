// import { EditIcon, Star, UserCircle2 } from 'lucide-react';
// import { useAuthStore } from '../../store/authStore';
// import { useReviewStore } from '../../store/reviewStore';
// import { formatDate, formatRelativeTime } from '../../utils/date';
// import { Link } from 'react-router-dom';

// export default function ReviewListz({ reviews, promptId, onEdit }) {
//   const { deleteReview } = useReviewStore();
//   const { user: authUser, isAuthenticated } = useAuthStore();

//   return (
//     <div className="space-y-6">
//       {reviews?.length === 0 && (
//         <p className="text-center text-gray-400">
//           No reviews yet. Be the first to review!
//         </p>
//       )}
//       {reviews?.map(review => (
//         <div
//           key={review._id}
//           className="w-full bg-gray-800 ring-1 ring-gray-700 rounded-lg shadow-md transition duration-200 hover:shadow-lg"
//         >
//           <div className="p-6 flex space-x-4 items-start">
//             {review.user?.profileImage ? (
//               <img
//                 src={review.user.profileImage}
//                 alt={review.user.name}
//                 className="w-16 h-16 rounded-xl object-cover"
//               />
//             ) : (
//               <UserCircle2 className="w-16 h-16 text-gray-600" />
//             )}
//             <div className="flex-1 min-w-0">
//               <div className="flex justify-between items-start">
//                 <div>
//                   <h3 className="text-lg font-semibold text-gray-100 capitalize">
//                     {review.user.username}
//                     <span className="ml-2 text-gray-400 text-sm font-normal">
//                       {'-'} {formatDate(review.createdAt)}
//                     </span>
//                   </h3>
//                   <h1 className="text-xxs font-thin text-blue-400">
//                     <Link to={`/profile/username/${review.user.username}`}>
//                       <span>@{review.user.username}</span>
//                       {isAuthenticated && (
//                         <>
//                           <span className="mx-1">•</span>
//                           {authUser._id === review.user._id && (
//                             <span className="text-red-400">You</span>
//                           )}
//                           {authUser._id !== review.user._id && (
//                             <span className="text-red-400">Author</span>
//                           )}
//                         </>
//                       )}
//                     </Link>
//                   </h1>
//                   <p className="text-xs text-gray-500 mt-1">
//                     {formatRelativeTime(review.createdAt)}
//                   </p>
//                 </div>
//                 {isAuthenticated && authUser._id === review.user._id && (
//                   <div className="flex space-x-2">
//                     <button
//                       className="text-xs text-white hover:underline px-2 py-1 bg-gray-700 rounded"
//                       onClick={() => onEdit(review)}
//                     >
//                       Edit
//                     </button>
//                     <button
//                       className="text-xs text-white hover:underline px-2 py-1 bg-red-600 rounded"
//                       onClick={() => deleteReview(review._id)}
//                     >
//                       Delete
//                     </button>
//                   </div>
//                 )}
//               </div>

//               <blockquote className="text-gray-300 text-sm leading-relaxed mt-4 border-l-4 border-blue-500 pl-4 italic">
//                 "{review.comment}"
//               </blockquote>

//               {/* <div className="mt-3 flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 ${
//                       i < review.rating ? 'text-yellow-400' : 'text-gray-600'
//                     }`}
//                   />
//                 ))}
//               </div> */}
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
import { EditIcon, Star, UserCircle2 } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useReviewStore } from '../../store/reviewStore';
import { formatDate, formatRelativeTime } from '../../utils/date';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';

export default function ReviewListz({ reviews, promptId, onEdit }) {
  const { deleteReview } = useReviewStore();
  const { user: authUser, isAuthenticated } = useAuthStore();

  // Define animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Stagger timing for each child
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {reviews?.length === 0 && (
        <div className="flex flex-col items-center justify-center w-full h-full text-gray-200">
          <div className="text-center">
            <h2 className="text-lg font-semibold mb-2 text-shadow">
              No Reviews Yet
            </h2>
            <p className="mb-4">Be the first to share your thoughts!</p>
          </div>
        </div>
      )}
      {reviews?.map(review => (
        <motion.div
          key={review._id}
          className="w-full bg-gray-800 ring-1 ring-gray-700 rounded-lg shadow-md"
          variants={itemVariants}
          whileInView="visible"
          initial="hidden"
          viewport={{ once: true, amount: 0.2 }}
          whileHover={{ scale: 1.03 }}
        >
          <div className="p-4 md:p-6 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 items-start">
            {review.user?.profileImage ? (
              <img
                src={getOptimizedImageUrl(review.user.profileImage, {
                  w: 100,
                  h: 100,
                  q: 'auto',
                  f: 'auto',
                })}
                alt={
                  review.user.name || review.user.username || 'UserProfileImage'
                }
                className="w-12 h-12 md:w-16 md:h-16 rounded-xl object-cover"
              />
            ) : (
              <UserCircle2 className="w-12 h-12 md:w-16 md:h-16 text-gray-600" />
            )}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
                <div>
                  <h3 className="text-base md:text-lg font-semibold text-gray-100 capitalize">
                    {review.user.username}
                    <span className="ml-2 text-gray-400 text-xs md:text-sm font-normal">
                      {'-'} {formatDate(review.createdAt)}
                    </span>
                  </h3>
                  <h5 className="text-xs md:text-sm font-thin text-blue-400">
                    <Link to={`/profile/username/${review.user.username}`}>
                      <span>@{review.user.username}</span>
                      {isAuthenticated && (
                        <>
                          {authUser._id === review.user._id && (
                            <>
                              <span className="mx-1">•</span>
                              <span className="text-red-400">You</span>
                            </>
                          )}
                        </>
                      )}
                    </Link>
                  </h5>
                  <p className="text-xs md:text-sm text-gray-500 mt-1">
                    {formatRelativeTime(review.createdAt)}
                  </p>
                </div>
                {isAuthenticated && authUser._id === review.user._id && (
                  <div className="flex space-x-2 mt-2 md:mt-0">
                    <button
                      className="text-xs md:text-sm text-white hover:underline px-2 py-1 bg-gray-700 rounded"
                      onClick={() => onEdit(review)}
                    >
                      Edit
                    </button>
                    <button
                      className="text-xs md:text-sm text-white hover:underline px-2 py-1 bg-red-600 rounded"
                      onClick={() => deleteReview(review._id, promptId)}
                    >
                      Delete
                    </button>
                  </div>
                )}
              </div>

              <blockquote className="text-gray-300 text-xs md:text-sm leading-relaxed mt-4 border-l-4 border-blue-500 pl-4 italic">
                "{review.comment}"
              </blockquote>

              {/* Optional star rating */}
              {/* <div className="mt-3 flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < review.rating ? 'text-yellow-400' : 'text-gray-600'
                    }`}
                  />
                ))}
              </div> */}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
