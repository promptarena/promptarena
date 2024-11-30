// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { usePromptStore } from '../../store/promptStore';
// import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
// import { formatDate } from '../../utils/date';
// import { motion } from 'framer-motion';
// import axiosInstance from '../../services/axiosInstance';
// import { handleError } from '../../utils/errorHandler';

// const PromptDetails = () => {
//   const { promptId } = useParams();
//   const { fetchPromptById, currentPrompt, isLoading, error } = usePromptStore();
//   const [filteredPrompts, setFilteredPrompts] = useState([]);
//   const [loadingFiltered, setLoadingFiltered] = useState(true);

//   useEffect(() => {
//     const getPrompt = async () => {
//       try {
//         await fetchPromptById(promptId);
//       } catch (err) {
//         handleError(err, (message) => console.error(message));
//       }
//     };

//     getPrompt();
//   }, [promptId, fetchPromptById]);

//   // Fetch prompts based on category and tags when currentPrompt changes
//   useEffect(() => {
//     const fetchFilteredPrompts = async () => {
//       setLoadingFiltered(true);
//       try {
//         if (currentPrompt) {
//           const params = {};
//           if (currentPrompt.category) params.category = currentPrompt.category;
//           if (currentPrompt.tags) params.tags = currentPrompt.tags.join(',');

//           const response = await axiosInstance.get('/prompt/all', { params });
//           const prompts = response.data?.data?.prompts || [];
//           setFilteredPrompts(prompts);
//         }
//       } catch (error) {
//         handleError(error, (message) => console.error(message));
//       } finally {
//         setLoadingFiltered(false);
//       }
//     };

//     fetchFilteredPrompts();
//   }, [currentPrompt]);

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <div className='text-red-500'>{error}</div>;
//   }

//   if (!currentPrompt) {
//     return <div className='text-red-500'>Prompt not found</div>;
//     }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className='container mx-auto p-4'
//     >
//       <div className='bg-white p-6 rounded-lg shadow'>
//         <h1 className='text-3xl font-bold mb-4'>{currentPrompt.title}</h1>
//         <div className='flex justify-between items-center mb-4'>
//           <div className='flex items-center space-x-2'>
//             {currentPrompt.seller && (
//               <Link
//                 to={`/profile/username/${currentPrompt.seller.username}`}
//                 className='text-gray-600 hover:underline'
//               >
//                 By {currentPrompt.seller.username}
//               </Link>
//             )}
//             <span className='text-gray-500 text-sm'>
//               Created: {formatDate(currentPrompt.createdAt)}
//             </span>
//           </div>
//           <span className='text-green-600 font-medium text-lg'>
//             ${currentPrompt.price}
//           </span>
//         </div>

//         {/* Display other prompt details here */}
//         <p className='text-gray-700 mb-4'>{currentPrompt.description}</p>

//         {/* Prompt Type */}
//         <div className='mb-4'>
//           <h3 className='font-semibold mb-2'>Prompt Type:</h3>
//           <p className='text-gray-600'>{currentPrompt.promptType}</p>
//         </div>

//         {/* Prompt */}
//         <div className='mb-4'>
//           <h3 className='font-semibold mb-2'>Prompt:</h3>
//           <p className='text-gray-600 whitespace-pre-line'>
//             {currentPrompt.prompt}
//           </p>
//         </div>

//         {currentPrompt.exampleResponse && (
//           <div className='mb-4'>
//             <h3 className='font-semibold mb-2'>Example Response:</h3>
//             <p className='text-gray-600 whitespace-pre-line'>
//               {currentPrompt.exampleResponse}
//             </p>
//           </div>
//         )}

//         {/* Category */}
//         <div className='flex items-center mb-4'>
//           <span className='text-gray-600'>
//             <strong>Category:</strong>{' '}
//             <Link
//               to={`/prompts/category/${currentPrompt.category}`}
//               className='text-blue-600 hover:underline'
//             >
//               {currentPrompt.category}
//             </Link>
//           </span>
//         </div>

//         {/* Tags */}
//         <div className='flex items-center mb-4'>
//           <span className='text-gray-600'>
//             <strong>Tags:</strong>{' '}
//             {currentPrompt.tags.map((tag) => (
//               <Link
//                 key={tag}
//                 to={`/prompts/tag/${tag}`}
//                 className='text-blue-600 hover:underline mr-2'
//               >
//                 #{tag}
//               </Link>
//             ))}
//           </span>
//         </div>

//         {/* Display media (images, videos, pdfs) */}
//         <div className='mt-4'>
//           <h3 className='font-semibold mb-2'>Media:</h3>
//           {currentPrompt.media.images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Prompt Image ${index}`}
//               className='mt-2 max-w-full'
//             />
//           ))}
//           {/* Similarly, display videos and pdfs */}
//         </div>
//       </div>

//       {/* Filtered prompts section */}
//       <div className='mt-8'>
//         <h2 className='text-2xl font-bold mb-4'>Related Prompts</h2>
//         {loadingFiltered ? (
//           <LoadingSpinner />
//         ) : filteredPrompts.length === 0 ? (
//           <div className='text-gray-600'>No related prompts found.</div>
//         ) : (
//           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
//             {filteredPrompts.map((prompt) => (
//               <Link key={prompt._id} to={`/prompt/${prompt._id}`}>
//                 <div className='bg-white p-4 rounded-lg shadow'>
//                   <h3 className='font-semibold text-lg'>{prompt.title}</h3>
//                   <p className='text-gray-600 mb-2'>
//                     {prompt.description.substring(0, 50)}...
//                   </p>
//                   <p className='text-green-600 font-medium'>
//                     Price: ${prompt.price}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default PromptDetails;

// ---------------------------------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { usePromptStore } from '../../store/promptStore';
// import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
// import { formatDate } from '../../utils/date';
// import { motion } from 'framer-motion';
// import axiosInstance from '../../services/axiosInstance';
// import { handleError } from '../../utils/errorHandler';
// import { useReviewStore } from '../../store/reviewStore';
// import ReviewForm from '../../components/review/ReviewForm';
// import { useAuthStore } from '../../store/authStore';
// // import BuyPromptButton from '../../components/prompt/BuyPromptButton';

// const PromptDetails = () => {
//   const { promptId } = useParams();
//   const { fetchPromptById, currentPrompt, isLoading, error } = usePromptStore();
//   const [filteredPrompts, setFilteredPrompts] = useState([]);
//   const [loadingFiltered, setLoadingFiltered] = useState(true);
//   const {
//     fetchReviewsForPrompt,
//     reviews,
//     isLoading: reviewsLoading,
//     error: reviewsError,
//   } = useReviewStore();
//   const { user, isAuthenticated } = useAuthStore();

//   useEffect(() => {
//     const getPrompt = async () => {
//       try {
//         await fetchPromptById(promptId);
//       } catch (err) {
//         handleError(err, (message) => console.error(message));
//       }
//     };

//     getPrompt();
//   }, [promptId, fetchPromptById]);

//   // Fetch prompts based on category and tags when currentPrompt changes
//   useEffect(() => {
//     const fetchFilteredPrompts = async () => {
//       setLoadingFiltered(true);
//       try {
//         if (currentPrompt) {
//           const params = {};
//           if (currentPrompt.category) params.category = currentPrompt.category;
//           if (currentPrompt.tags) params.tags = currentPrompt.tags.join(',');

//           const response = await axiosInstance.get('/prompt/all', { params });
//           const prompts = response.data?.data?.prompts || [];

//           // Filter out the current prompt from related prompts
//           const relatedPrompts = prompts.filter(
//             (prompt) => prompt._id !== promptId
//           );

//           setFilteredPrompts(relatedPrompts);
//         }
//       } catch (error) {
//         handleError(error, (message) => console.error(message));
//       } finally {
//         setLoadingFiltered(false);
//       }
//     };

//     fetchFilteredPrompts();
//   }, [currentPrompt, promptId]);

//   useEffect(() => {
//     fetchReviewsForPrompt(promptId);
//   }, [promptId, fetchReviewsForPrompt]);

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <div className='text-red-500'>{error}</div>;
//   }

//   if (!currentPrompt) {
//     return <div className='text-red-500'>Prompt not found</div>;
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className='container mx-auto p-4'
//     >
//       <div className='bg-white p-6 rounded-lg shadow'>
//         <h1 className='text-3xl font-bold mb-4'>{currentPrompt.title}</h1>
//         <div className='flex justify-between items-center mb-4'>
//           <div className='flex items-center space-x-2'>
//             {currentPrompt.seller && (
//               <Link
//                 to={`/profile/username/${currentPrompt.seller.username}`}
//                 className='text-gray-600 hover:underline'
//               >
//                 By {currentPrompt.seller.username}
//               </Link>
//             )}
//             <span className='text-gray-500 text-sm'>
//               Created: {formatDate(currentPrompt.createdAt)}
//             </span>
//           </div>
//           <span className='text-green-600 font-medium text-lg'>
//             ${currentPrompt.price}
//           </span>
//         </div>

//         {/* Display other prompt details here */}
//         <p className='text-gray-700 mb-4'>{currentPrompt.description}</p>

//         {/* Prompt Type */}
//         <div className='mb-4'>
//           <h3 className='font-semibold mb-2'>Prompt Type:</h3>
//           <p className='text-gray-600'>{currentPrompt.promptType}</p>
//         </div>

//         {/* Prompt */}
//         <div className='mb-4'>
//           <h3 className='font-semibold mb-2'>Prompt:</h3>
//           <p className='text-gray-600 whitespace-pre-line'>
//             {currentPrompt.prompt}
//           </p>
//         </div>

//         {currentPrompt.exampleResponse && (
//           <div className='mb-4'>
//             <h3 className='font-semibold mb-2'>Example Response:</h3>
//             <p className='text-gray-600 whitespace-pre-line'>
//               {currentPrompt.exampleResponse}
//             </p>
//           </div>
//         )}

//         {/* Category */}
//         <div className='flex items-center mb-4'>
//           <span className='text-gray-600'>
//             <strong>Category:</strong>{' '}
//             <Link
//               to={`/prompts/category/${currentPrompt.category}`}
//               className='text-blue-600 hover:underline'
//             >
//               {currentPrompt.category}
//             </Link>
//           </span>
//         </div>

//         {/* Tags */}
//         <div className='flex items-center mb-4'>
//           <span className='text-gray-600'>
//             <strong>Tags:</strong>{' '}
//             {currentPrompt.tags.map((tag) => (
//               <Link
//                 key={tag}
//                 to={`/prompts/tag/${tag}`}
//                 className='text-blue-600 hover:underline mr-2'
//               >
//                 #{tag}
//               </Link>
//             ))}
//           </span>
//         </div>

//         {/* Display media (images, videos, pdfs) */}
//         <div className='mt-4'>
//           <h3 className='font-semibold mb-2'>Media:</h3>
//           {currentPrompt.media.images.map((image, index) => (
//             <img
//               key={index}
//               src={image}
//               alt={`Prompt Image ${index}`}
//               className='mt-2 max-w-full'
//             />
//           ))}
//           {/* Similarly, display videos and pdfs */}
//         </div>

//         {/* Buy Now Button (for buyers) */}
//         {/* {isAuthenticated && user && user.role === 'buyer' && (
//           <BuyPromptButton
//             promptId={currentPrompt._id}
//             price={currentPrompt.price}
//           />
//         )} */}

//         {/* Reviews Section */}
//         <div className='mt-8'>
//           <h3 className='text-xl font-semibold mb-4'>Reviews</h3>
//           {reviewsLoading && <p>Loading reviews...</p>}
//           {reviewsError && <p className='text-red-500'>{reviewsError}</p>}
//           {reviews[promptId] && reviews[promptId].length === 0 && (
//             <p>No reviews yet. Be the first to review!</p>
//           )}
//           {reviews[promptId] && reviews[promptId].length > 0 && (
//             <ul>
//               {reviews[promptId].map((review) => (
//                 <li key={review._id} className='mb-4 p-4 border rounded-lg'>
//                   <div className='flex items-center mb-2'>
//                     <span className='font-semibold mr-2'>
//                       {review.user.username}
//                     </span>
//                     <span className='text-gray-600 text-sm'>
//                       {formatDate(review.createdAt)}
//                     </span>
//                   </div>
//                   <p className='text-gray-700'>{review.comment}</p>
//                 </li>
//               ))}
//             </ul>
//           )}
//           {/* Review Form (only for authenticated users) */}
//           {isAuthenticated && <ReviewForm promptId={promptId} />}
//         </div>
//       </div>

//       {/* Filtered prompts section */}
//       <div className='mt-8'>
//         <h2 className='text-2xl font-bold mb-4'>Related Prompts</h2>
//         {loadingFiltered ? (
//           <LoadingSpinner />
//         ) : filteredPrompts.length === 0 ? (
//           <div className='text-gray-600'>No related prompts found.</div>
//         ) : (
//           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
//             {filteredPrompts.map((prompt) => (
//               <Link key={prompt._id} to={`/prompt/${prompt._id}`}>
//                 <div className='bg-white p-4 rounded-lg shadow'>
//                   <h3 className='font-semibold text-lg'>{prompt.title}</h3>
//                   <p className='text-gray-600 mb-2'>
//                     {prompt.description.substring(0, 50)}...
//                   </p>
//                   <p className='text-green-600 font-medium'>
//                     Price: ${prompt.price}
//                   </p>
//                 </div>
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default PromptDetails;
// ---------------------------------------------------------------------------------

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { usePromptStore } from '../../store/promptStore';
// import { motion } from 'framer-motion';
// import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
// import { formatDate } from '../../utils/date';
// import ReviewSection from '../../components/review/ReviewSection';
// import RelatedPrompts from '../../components/prompt/RelatedPrompts';

// const PromptDetails = () => {
//   const { promptId } = useParams();
//   const { fetchPromptById, currentPrompt, isLoading, error } = usePromptStore();

//   useEffect(() => {
//     fetchPromptById(promptId).catch(console.error);
//   }, [promptId, fetchPromptById]);

//   if (isLoading) return <LoadingSpinner />;
//   if (error) return <div className='text-red-500'>{error}</div>;
//   if (!currentPrompt)
//     return <div className='text-red-500'>Prompt not found</div>;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className='container mx-auto p-4'
//     >
//       <div className='bg-white p-6 rounded-lg shadow'>
//         <h1 className='text-3xl font-bold mb-4'>{currentPrompt.title}</h1>
//         <div className='flex justify-between items-center mb-4'>
//           <div className='flex items-center space-x-2'>
//             <span className='text-gray-600'>
//               {currentPrompt.seller?.username}
//             </span>
//             <span className='text-gray-500 text-sm'>
//               Created: {formatDate(currentPrompt.createdAt)}
//             </span>
//           </div>
//           <span className='text-green-600 font-medium text-lg'>
//             ${currentPrompt.price}
//           </span>
//         </div>

//         <p className='text-gray-700 mb-4'>{currentPrompt.description}</p>

//         <div className='mb-4'>
//           <h3 className='font-semibold mb-2'>Prompt Type:</h3>
//           <p className='text-gray-600'>{currentPrompt.promptType}</p>
//         </div>

//         <div className='mb-4'>
//           <h3 className='font-semibold mb-2'>Prompt:</h3>
//           <p className='text-gray-600 whitespace-pre-line'>
//             {currentPrompt.prompt}
//           </p>
//         </div>

//         <ReviewSection promptId={promptId} />
//       </div>

//       <RelatedPrompts currentPrompt={currentPrompt} />
//     </motion.div>
//   );
// };

// export default PromptDetails;

// --------------------------------------------
// Working Code

// import React, { useEffect, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { usePromptStore } from '../../store/promptStore';
// import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
// import { formatDate } from '../../utils/date';
// import { motion } from 'framer-motion';
// import axiosInstance from '../../services/axiosInstance';
// import { handleError } from '../../utils/errorHandler';
// import { useReviewStore } from '../../store/reviewStore';
// import ReviewForm from '../../components/review/ReviewForm';
// import ReviewList from '../../components/review/ReviewList';
// import { useAuthStore } from '../../store/authStore';
// import PromptCard from '../../components/prompt/PromptCard';

// const PromptDetails = () => {
//   const { promptId } = useParams();
//   const { fetchPromptById, currentPrompt, isLoading, error } = usePromptStore();
//   const [filteredPrompts, setFilteredPrompts] = useState([]);
//   const [loadingFiltered, setLoadingFiltered] = useState(true);
//   const {
//     fetchReviewsForPrompt,
//     reviews,
//     isLoading: reviewsLoading,
//     error: reviewsError,
//   } = useReviewStore();
//   const { user, isAuthenticated } = useAuthStore();
//   const [editReview, setEditReview] = useState(null); // Track review being edited

//   useEffect(() => {
//     fetchPromptById(promptId);
//     fetchReviewsForPrompt(promptId);
//   }, [promptId, fetchPromptById, fetchReviewsForPrompt]);

//   useEffect(() => {
//     if (currentPrompt) {
//       const fetchFilteredPrompts = async () => {
//         setLoadingFiltered(true);
//         try {
//           const params = {
//             category: currentPrompt.category,
//             tags: currentPrompt.tags.join(','),
//           };
//           const response = await axiosInstance.get('/prompt/all', { params });
//           setFilteredPrompts(
//             response.data?.data?.prompts.filter((p) => p._id !== promptId)
//           );
//         } catch (error) {
//           handleError(error, console.error);
//         } finally {
//           setLoadingFiltered(false);
//         }
//       };
//       fetchFilteredPrompts();
//     }
//   }, [currentPrompt, promptId]);

//   if (isLoading) return <LoadingSpinner />;
//   if (error) return <div className='text-red-500'>{error}</div>;
//   if (!currentPrompt)
//     return <div className='text-red-500'>Prompt not found</div>;

//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 20 }}
//       animate={{ opacity: 1, y: 0 }}
//       transition={{ duration: 0.5 }}
//       className='container mx-auto p-4'
//     >
//       <div className='bg-white p-6 rounded-lg shadow'>
//         <h1 className='text-3xl font-bold mb-4'>{currentPrompt.title}</h1>
//         <div className='flex justify-between items-center mb-4'>
//           <div className='flex items-center space-x-2'>
//             {currentPrompt.seller && (
//               <Link
//                 to={`/profile/username/${currentPrompt.seller?.username}`}
//                 className='text-gray-600 hover:underline'
//               >
//                 By {currentPrompt.seller?.username}
//               </Link>
//             )}
//             <span className='text-gray-500 text-sm'>
//               Created: {formatDate(currentPrompt.createdAt)}
//             </span>
//           </div>
//           <span className='text-green-600 font-medium text-lg'>
//             ${currentPrompt.price}
//           </span>
//         </div>
//         <p className='text-gray-700 mb-4'>{currentPrompt.description}</p>
//         <div className='mb-4'>
//           <h3 className='font-semibold mb-2'>Prompt Type:</h3>
//           <p className='text-gray-600'>{currentPrompt.promptType}</p>
//         </div>
//         {/* say please login to view the prompt */}
//         {isAuthenticated ? (
//           <div className='mb-4'>
//             <h3 className='font-semibold mb-2'>Prompt:</h3>
//             <p className='text-gray-600 whitespace-pre-line'>
//               {currentPrompt.prompt}
//             </p>
//           </div>
//         ) : (
//           <div className='mb-4'>
//             <h3 className='font-semibold mb-2'>Prompt:</h3>
//             <p className='text-gray-600 whitespace-pre-line'>
//               Please{' '}
//               <Link to='/login' className=' text-blue-500'>
//                 login
//               </Link>{' '}
//               to Get the prompt
//             </p>
//           </div>
//         )}
//         {currentPrompt.exampleResponse && (
//           <div className='mb-4'>
//             <h3 className='font-semibold mb-2'>Example Response:</h3>
//             <p className='text-gray-600 whitespace-pre-line'>
//               {currentPrompt.exampleResponse}
//             </p>
//           </div>
//         )}
//         {/* Category */}
//         <div className='flex items-center mb-4'>
//           <span className='text-gray-600'>
//             <strong>Category:</strong>{' '}
//             <Link
//               to={`/prompts/category/${currentPrompt.category}`}
//               className='text-blue-600 hover:underline'
//             >
//               {currentPrompt.category}
//             </Link>
//           </span>
//         </div>
//         {/* Tags */}
//         <div className='flex items-center mb-4'>
//           <span className='text-gray-600'>
//             <strong>Tags:</strong>{' '}
//             {currentPrompt.tags.map((tag) => (
//               <Link
//                 key={tag}
//                 to={`/prompts/tag/${tag}`}
//                 className='text-blue-600 hover:underline mr-2'
//               >
//                 #{tag}
//               </Link>
//             ))}
//           </span>
//         </div>
//         {/* Display media (images, videos, pdfs) */}
//         {/* // Null check on currentPrompt.media */}
//         {currentPrompt.media?.images?.length === 0 &&
//           currentPrompt.media?.videos?.length === 0 &&
//           currentPrompt.media?.pdfs?.length === 0 && (
//             <p className='text-gray-600'>No media found</p>
//           )}
//         {/* show media if images or videos or pdfs, only show media */}
//         {currentPrompt.media.images.length > 0 && (
//           <div className='mb-4'>
//             <h3 className='font-semibold mb-2'>Images:</h3>
//             {currentPrompt.media.images.map((image, index) => (
//               <img
//                 key={index}
//                 src={image}
//                 alt={`Prompt Image ${index}`}
//                 className='mt-2 max-w-full'
//               />
//             ))}
//           </div>
//         )}
//         {currentPrompt.media.videos.length > 0 && (
//           <div className='mb-4'>
//             <h3 className='font-semibold mb-2'>Videos:</h3>
//             {currentPrompt.media.videos.map((video, index) => (
//               <video
//                 key={index}
//                 src={video}
//                 controls
//                 muted
//                 autoPlay
//                 loop
//                 className='mt-2 max-w-full'
//               />
//             ))}
//           </div>
//         )}
//         {currentPrompt.media.pdfs.length > 0 && (
//           <div className='mb-4'>
//             <h3 className='font-semibold mb-2'>PDFS:</h3>
//             {currentPrompt.media.pdfs.map((pdf, index) => (
//               <a
//                 key={index}
//                 href={pdf}
//                 download
//                 className='text-blue-600 hover:underline'
//               >
//                 Download PDF {index + 1}
//               </a>
//             ))}
//           </div>
//         )}
//         {/* Reviews Section */}
//         <div className='mt-8'>
//           <h3 className='text-xl font-semibold mb-4'>Reviews</h3>
//           {reviewsLoading && <p>Loading reviews...</p>}
//           {reviewsError && <p className='text-red-500'>{reviewsError}</p>}
//           <ReviewList
//             reviews={reviews[promptId]}
//             promptId={promptId}
//             onEdit={(review) => setEditReview(review)}
//           />
//           {isAuthenticated && (
//             <ReviewForm
//               promptId={promptId}
//               isEditingMode={!!editReview}
//               existingReview={editReview || {}} // Ensure it's an object
//               onCancel={() => setEditReview(null)} // Cancel function
//             />
//           )}
//         </div>
//       </div>

//       {/* Related Prompts Section */}
//       <div className='mt-8'>
//         <h2 className='text-2xl font-bold mb-4'>Related Prompts</h2>
//         {loadingFiltered ? (
//           <LoadingSpinner />
//         ) : filteredPrompts.length === 0 ? (
//           <div className='text-gray-600'>No related prompts found.</div>
//         ) : (
//           <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
//             {filteredPrompts.map((prompt) => (
//               <Link key={prompt._id} to={`/prompt/${prompt._id}`}>
//                 <PromptCard prompt={prompt} />
//               </Link>
//             ))}
//           </div>
//         )}
//       </div>
//     </motion.div>
//   );
// };

// export default PromptDetails;

// -------------------------------------------------------

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePromptStore } from '../../store/promptStore';
import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
import { formatDate } from '../../utils/date';
import { motion } from 'framer-motion';
import axiosInstance from '../../services/axiosInstance';
import { handleError } from '../../utils/errorHandler';
import { useReviewStore } from '../../store/reviewStore';
import ReviewForm from '../../components/review/ReviewForm';
import ReviewList from '../../components/review/ReviewList';
import { useAuthStore } from '../../store/authStore';
import PromptCard from '../../components/prompt/PromptCard';

const PromptDetails = () => {
  const { promptId } = useParams();
  const { fetchPromptById, currentPrompt, isLoading, error } = usePromptStore();
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [loadingFiltered, setLoadingFiltered] = useState(true);
  const {
    fetchReviewsForPrompt,
    reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
  } = useReviewStore();
  const { user, isAuthenticated } = useAuthStore();
  const [editReview, setEditReview] = useState(null); // Track review being edited

  useEffect(() => {
    fetchPromptById(promptId);
    fetchReviewsForPrompt(promptId);
  }, [promptId, fetchPromptById, fetchReviewsForPrompt]);

  useEffect(() => {
    if (currentPrompt) {
      const fetchFilteredPrompts = async () => {
        setLoadingFiltered(true);
        try {
          const params = {
            category: currentPrompt.category,
            tags: currentPrompt.tags.join(','),
          };
          const response = await axiosInstance.get('/prompt/all', { params });
          setFilteredPrompts(
            response.data?.data?.prompts?.filter(p => p._id !== promptId) || []
          );
        } catch (error) {
          handleError(error, console.error);
        } finally {
          setLoadingFiltered(false);
        }
      };
      fetchFilteredPrompts();
    }
  }, [currentPrompt, promptId]);

  const motionProps = useMemo(
    () => ({
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 },
    }),
    []
  );

  const handleEditReview = useCallback(review => {
    setEditReview(review);
  }, []);

  const handleCancelEdit = useCallback(() => {
    setEditReview(null);
  }, []);

  const existingReview = useMemo(() => editReview || {}, [editReview]);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!currentPrompt)
    return <div className="text-red-500">Prompt not found</div>;

  return (
    <motion.div {...motionProps} className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow">
        <h1 className="text-3xl font-bold mb-4">{currentPrompt.title}</h1>
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            {currentPrompt.seller && (
              <Link
                to={`/profile/username/${currentPrompt.seller?.username}`}
                className="text-gray-600 hover:underline"
              >
                By {currentPrompt.seller?.username}
              </Link>
            )}
            <span className="text-gray-500 text-sm">
              Created: {formatDate(currentPrompt.createdAt)}
            </span>
          </div>
          <span className="text-green-600 font-medium text-lg">
            ${currentPrompt.price}
          </span>
        </div>
        <p className="text-gray-700 mb-4">{currentPrompt.description}</p>

        <div className="mb-4">
          <h3 className="font-semibold mb-2">Prompt Type:</h3>
          <p className="text-gray-600">{currentPrompt.promptType}</p>
        </div>

        {isAuthenticated ? (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Prompt:</h3>
            <p className="text-gray-600 whitespace-pre-line">
              {currentPrompt.prompt}
            </p>
          </div>
        ) : (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Prompt:</h3>
            <p className="text-gray-600 whitespace-pre-line">
              Please{' '}
              <Link to="/login" className=" text-blue-500">
                login
              </Link>{' '}
              to Get the prompt
            </p>
          </div>
        )}

        {currentPrompt.exampleResponse && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Example Response:</h3>
            <p className="text-gray-600 whitespace-pre-line">
              {currentPrompt.exampleResponse}
            </p>
          </div>
        )}

        <div className="flex items-center mb-4">
          <span className="text-gray-600">
            <strong>Category:</strong>{' '}
            <Link
              to={`/prompts/category/${currentPrompt.category}`}
              className="text-blue-600 hover:underline"
            >
              {currentPrompt.category}
            </Link>
          </span>
        </div>

        <div className="flex items-center mb-4">
          <span className="text-gray-600">
            <strong>Tags:</strong>{' '}
            {currentPrompt.tags.map(tag => (
              <Link
                key={tag}
                to={`/prompts/tag/${tag}`}
                className="text-blue-600 hover:underline mr-2"
              >
                #{tag}
              </Link>
            ))}
          </span>
        </div>

        {currentPrompt.media?.images?.length === 0 &&
          currentPrompt.media?.videos?.length === 0 &&
          currentPrompt.media?.pdfs?.length === 0 && (
            <p className="text-gray-600">No media found</p>
          )}

        {currentPrompt.media?.images?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Images:</h3>
            {currentPrompt.media.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Prompt Image ${index}`}
                className="mt-2 max-w-full"
              />
            ))}
          </div>
        )}

        {currentPrompt.media?.videos?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Videos:</h3>
            {currentPrompt.media.videos.map((video, index) => (
              <video
                key={index}
                src={video}
                controls
                muted
                autoPlay
                loop
                className="mt-2 max-w-full"
              />
            ))}
          </div>
        )}

        {currentPrompt.media?.pdfs?.length > 0 && (
          <div className="mb-4">
            <h3 className="font-semibold mb-2">PDFS:</h3>
            {currentPrompt.media.pdfs.map((pdf, index) => (
              <a
                key={index}
                href={pdf}
                download
                className="text-blue-600 hover:underline"
              >
                Download PDF {index + 1}
              </a>
            ))}
          </div>
        )}

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Reviews</h3>
          {reviewsLoading && <p>Loading reviews...</p>}
          {reviewsError && <p className="text-red-500">{reviewsError}</p>}
          <ReviewList
            reviews={reviews[promptId] || []}
            promptId={promptId}
            onEdit={handleEditReview}
          />
          {isAuthenticated && (
            <ReviewForm
              promptId={promptId}
              isEditingMode={!!editReview}
              existingReview={existingReview}
              onCancel={handleCancelEdit}
            />
          )}
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Related Prompts</h2>
        {loadingFiltered ? (
          <LoadingSpinner />
        ) : filteredPrompts.length === 0 ? (
          <div className="text-gray-600">No related prompts found.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredPrompts.map(prompt => (
              <Link key={prompt._id} to={`/prompt/${prompt._id}`}>
                <PromptCard prompt={prompt} />
              </Link>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default PromptDetails;
