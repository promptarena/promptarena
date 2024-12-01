// import React, { useCallback, useEffect, useMemo, useState } from 'react';
// import { useParams, Link } from 'react-router-dom';
// import { usePromptStore } from '../../store/promptStore';
// import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
// import { AnimatePresence, motion } from 'framer-motion';
// import { useReviewStore } from '../../store/reviewStore';
// import { useAuthStore } from '../../store/authStore';
// import {
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   Copy,
//   LogIn,
// } from 'lucide-react';
// import PromptBottomCard from '../../components/prompt/PromptBottomCard';
// import toast from 'react-hot-toast';
// import { BorderTrail } from '../../components/framer-motion/animations/BorderTrail';
// import { repeat } from 'lodash';
// import PageLoader from '../../components/animations/loader/PageLoader';
// import Footer from '../../components/global/Footer';

// export default function PromptDetailz() {
//   const { promptId } = useParams();
//   const { fetchPromptById, currentPrompt, isLoading, error } = usePromptStore();

//   const [isExpanded, setIsExpanded] = useState(false);
//   const [isExampleResonspeIsExpanded, setIsExampleResonspeIsExpanded] =
//     useState(false);

//   const {
//     fetchReviewsForPrompt,
//     reviews,
//     isLoading: reviewsLoading,
//     error: reviewsError,
//     averageRatingForPrompt,
//   } = useReviewStore();
//   const { user, isAuthenticated } = useAuthStore();
//   console.log('user: ', user);
//   const [editReview, setEditReview] = useState(null);

//   // Unconditional useEffect calls
//   useEffect(() => {
//     fetchPromptById(promptId);
//     fetchReviewsForPrompt(promptId);
//   }, [promptId, fetchPromptById, fetchReviewsForPrompt]);

//   // useEffect(() => {
//   //   if (currentPrompt) {
//   //     const fetchFilteredPrompts = async () => {
//   //       setLoadingFiltered(true);
//   //       try {
//   //         const params = {
//   //           category: currentPrompt.category,
//   //           tags: currentPrompt.tags.join(','),
//   //         };
//   //         const response = await axiosInstance.get('/prompt/all', { params });
//   //         setFilteredPrompts(
//   //           response.data?.data?.prompts?.filter(p => p._id !== promptId) || []
//   //         );

//   //       } catch (error) {
//   //         handleError(error, console.error);
//   //       } finally {
//   //         setLoadingFiltered(false);
//   //       }
//   //     };
//   //     fetchFilteredPrompts();
//   //   }
//   // }, [currentPrompt, promptId]);

//   const rating = useMemo(
//     () =>
//       averageRatingForPrompt
//         ? averageRatingForPrompt(promptId)?.toFixed(1)
//         : 'N/A',
//     [promptId, averageRatingForPrompt]
//   );

//   const reviewsCount = prompt.reviews?.length || 0;

//   const handleEditReview = useCallback(review => setEditReview(review), []);
//   const handleCancelEdit = useCallback(() => setEditReview(null), []);
//   const existingReview = useMemo(() => editReview || {}, [editReview]);

//   const [currentSlide, setCurrentSlide] = useState(1);
//   const totalSlides = currentPrompt?.media?.images?.length || 1;

//   const nextSlide = () =>
//     setCurrentSlide(prev => (prev === totalSlides ? 1 : prev + 1));
//   const prevSlide = () =>
//     setCurrentSlide(prev => (prev === 1 ? totalSlides : prev - 1));

//   if (isLoading) return <LoadingSpinner />;
//   if (error) return <div className="text-red-500">{error}</div>;
//   if (!currentPrompt)
//     return (
//       <div>
//         <PageLoader />
//       </div>
//     );

//   // Split description into words
//   const words = currentPrompt.description.split(' ');
//   const isLongDescription = words.length > 100; // Check if description has more than 100 words
//   const initialText = isLongDescription
//     ? words.slice(0, 100).join(' ')
//     : currentPrompt.description;
//   // Toggle expanded state when "Learn more" is clicked
//   const toggleExpanded = () => {
//     setIsExpanded(!isExpanded);
//   };

//   // Split example response into words
//   const exampleWords = currentPrompt.exampleResponse.split(' ');
//   const isLongExample = exampleWords.length > 100; // Check if example has more than 100 words
//   const initialExample = isLongExample
//     ? exampleWords.slice(0, 100).join(' ')
//     : currentPrompt.exampleResponse;

//   // Toggle expanded state when "Learn more" is clicked
//   const toggleExampleExpanded = () => {
//     setIsExampleResonspeIsExpanded(!isExampleResonspeIsExpanded);
//   };

//   return (
//     <>
//       {/* // <section className=" w-full min-h-screen bg-gray-900"> */}
//       <motion.section
//         initial={{ opacity: 0 }}
//         animate={{ opacity: 1 }}
//         transition={{ duration: 0.8, ease: 'easeOut' }}
//         className=" w-full min-h-screen relative bg-gradient-to-b from-[#1a0b2e] to-[#2d1b4e] "
//       >
//         <div className="absolute rotate-180 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[-1] opacity-80"></div>

//         <div className="flex flex-col-reverse container mx-auto lg:flex-row text-white lg:py-5 pt-5 pb-0">
//           {/* Left Side Content */}
//           <div className="flex flex-col w-full lg:w-1/2 pr-0 lg:pr-8 mb-0 lg:mb-0">
//             {/* Content and buttons */}
//             <div className="space-y-4 mt-5 md:mt-0">
//               {
//                 <h2 className="h2 font-semibold leading-tight text-shadow">
//                   {currentPrompt.title}
//                 </h2>
//               }
//             </div>

//             {/* More text and content */}
//             <div>
//               <p className="my-4 text-gray-300 leading-relaxed">
//                 <h1>
//                   <span className="text-gray-400 h6 font-extrabold">
//                     Description:
//                   </span>
//                 </h1>
//                 {isExpanded || !isLongDescription
//                   ? currentPrompt.description
//                   : `${initialText}...`}
//               </p>
//               {isLongDescription && (
//                 <motion.button
//                   onClick={toggleExpanded}
//                   whileHover={{
//                     scale: 1.05,
//                     boxShadow: '0px 4px 10px rgba(100, 100, 255, 0.5)',
//                     transition: { type: 'spring', stiffness: 300, damping: 15 },
//                   }}
//                   whileTap={{ scale: 0.95 }}
//                   className="flex mb-4 items-center gap-2 bg-gray-800 border border-purple-500 rounded-full px-4 py-2 hover:bg-gray-700 transition-colors"
//                 >
//                   <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
//                     <ArrowRight className="w-4 h-4 rotate-90 text-white" />
//                   </div>
//                   {isExpanded ? 'Show less' : 'Learn more'}
//                 </motion.button>
//               )}
//             </div>

//             {/* Tags */}
//             {/* <h1>
//             <span className="text-gray-400 h6 font-extrabold">Tags:</span>
//           </h1>
//           <div className="bg-purple-900 rounded-3xl px-6 py-5 text-white mb-8">
//             <div className="flex flex-wrap gap-3">
//               {currentPrompt.tags.map(tag => (
//                 <Link key={tag} to={`/prompts/tag/${tag}`}>
//                   <span className="bg-purple-800 shadow-2xl text-shadow px-4 py-2 rounded-full text-sm">
//                     #{tag}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//           </div> */}

//             {/* Prompt */}
//             {isAuthenticated ? (
//               currentPrompt && (
//                 <>
//                   <div className="flex items-center justify-between bg-purple-900 rounded-2xl p-4 transition-colors">
//                     <div className="flex items-center gap-4">
//                       <div>
//                         <div className="flex items-center justify-between gap-4">
//                           <h3 className="font-semibold ">Prompt:</h3>
//                           {/* Copy Button */}
//                           {/* <button
//                           onClick={() => {
//                             navigator.clipboard.writeText(currentPrompt.prompt);
//                             {
//                               toast.success('Prompt copied to clipboard');
//                             }
//                           }}
//                           className="bg-purple-800 shadow-2xl text-white px-2 py-2 rounded-lg hover:bg-purple-800 transition-colors"
//                           // className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-400 transition-colors"
//                         >
//                           <Copy className="w-4 h-4" />
//                         </button> */}

//                           <motion.button
//                             whileTap={{
//                               scale: 0.9,
//                               transition: {
//                                 type: 'spring',
//                                 stiffness: 300,
//                                 damping: 15,
//                               },
//                             }}
//                             onClick={() => {
//                               navigator.clipboard.writeText(
//                                 currentPrompt.prompt
//                               );
//                               toast.success('Prompt copied to clipboard');
//                             }}
//                             className="bg-purple-800 shadow-2xl text-white px-2 py-2 rounded-lg hover:bg-purple-800 transition-colors"
//                           >
//                             <Copy className="w-4 h-4" />
//                           </motion.button>
//                         </div>
//                         <p className="text-sm text-white italic">
//                           {currentPrompt.prompt}{' '}
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </>
//               )
//             ) : (
//               <div className="flex items-center justify-between bg-gray-800 rounded-2xl p-4 transition-colors">
//                 <h1 className="text-gray-300 whitespace-pre-line">
//                   Please{' '}
//                   <Link to="/login" className=" text-blue-500">
//                     login
//                   </Link>{' '}
//                   to Get the prompt
//                 </h1>
//                 <button>
//                   <Link
//                     to="/login"
//                     className="text-white flex-center px-4 py-1 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
//                   >
//                     Login <LogIn className="w-4 h-4 ml-2" />
//                   </Link>
//                 </button>
//               </div>
//             )}

//             <div className="space-y-4 mt-4">
//               {user && (
//                 <div className="flex items-center justify-between rounded-2xl p-4 bg-purple-900 hover:bg-purple-800 transition-colors">
//                   <div className="flex items-center gap-4">
//                     <img
//                       src={user.profileImage}
//                       className="rounded-full w-10 h-10 ring-1 ring-neutral-300"
//                       alt={user.username}
//                     />
//                     <div>
//                       <h3 className="font-semibold">Creator</h3>
//                       <p className="text-sm text-gray-100">
//                         {currentPrompt.seller.username}
//                       </p>
//                     </div>
//                   </div>
//                   <Link
//                     to={`/profile/username/${currentPrompt.seller.username}`}
//                   >
//                     <ArrowRight className="w-6 h-6 text-purple-500" />
//                   </Link>
//                 </div>
//               )}

//               {currentPrompt && (
//                 <div className="flex items-center justify-between bg-purple-900 rounded-2xl px-4 py-3 hover:bg-purple-800 transition-colors">
//                   <div className="flex items-center gap-4">
//                     <div>
//                       <h3 className="font-semibold">Tags:</h3>
//                       {/* <p className="text-sm text-gray-400">
//                       {formatDate(currentPrompt.createdAt)}
//                     </p> */}
//                       <div className="flex flex-wrap space-x-2">
//                         {currentPrompt.tags.map(tag => (
//                           <Link key={tag} to={`/prompts/tag/${tag}`}>
//                             <span className="bg-purple-600 shadow-2xl text-shadow px-2 rounded-full text-sm">
//                               #{tag}
//                             </span>
//                           </Link>
//                         ))}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="mt-8">
//               {currentPrompt.exampleResponse && (
//                 <>
//                   <p className="mb-4 text-gray-300">
//                     <span className="font-semibold block mb-2">
//                       Example Response:
//                     </span>{' '}
//                     {isExampleResonspeIsExpanded || !isLongExample
//                       ? currentPrompt.exampleResponse
//                       : `${initialExample}...`}
//                   </p>
//                   {isLongExample && (
//                     <button
//                       onClick={toggleExampleExpanded}
//                       className="flex items-center gap-2 bg-purple-600 text-white rounded-full px-6 py-1 hover:bg-purple-700 transition-colors"
//                     >
//                       {isExampleResonspeIsExpanded ? 'Show Less' : 'Show More'}{' '}
//                       <ArrowRight className="w-4 h-4" />
//                     </button>
//                   )}
//                 </>
//               )}
//             </div>
//           </div>

//           {/* Right Side - Sticky Carousel */}
//           <div className="w-full lg:w-1/2 relative lg:sticky top-0 md:top-28 h-80 lg:h-[80vh]">
//             <div className="relative h-full flex justify-center items-center rounded-3xl overflow-hidden">
//               <BorderTrail
//                 size={10000}
//                 transition={{
//                   repeat: Infinity,
//                 }}
//               />
//               {/* <img
//               src={currentPrompt.media.images[currentSlide - 1]}
//               alt={`Slide ${currentSlide}`}
//               className="w-full h-auto object-cover rounded-3xl aspect-square"
//             /> */}
//               <AnimatePresence mode="wait">
//                 {currentPrompt.media.images.length > 0 && (
//                   <motion.img
//                     key={currentSlide}
//                     src={currentPrompt.media.images[currentSlide - 1]}
//                     alt={`Slide ${currentSlide}`}
//                     className="w-full h-auto object-cover rounded-3xl aspect-square"
//                     initial={{ opacity: 0.5, scale: 1.05 }}
//                     animate={{
//                       opacity: 1,
//                       scale: 1,
//                       transition: { duration: 0.6, ease: 'easeOut' },
//                     }}
//                     exit={{
//                       opacity: 0.5,
//                       scale: 1.05,
//                       transition: { duration: 0.6, ease: 'easeIn' },
//                     }}
//                   />
//                 )}
//               </AnimatePresence>

//               {/* Carousel Navigation */}
//               <div className="absolute bottom-4 flex items-center gap-2">
//                 <button
//                   onClick={prevSlide}
//                   className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
//                   aria-label="Previous slide"
//                 >
//                   <ChevronLeft className="w-6 h-6" />
//                 </button>

//                 <div className="bg-gray-800 text-white rounded-full px-3 py-1">
//                   {currentSlide}/{totalSlides}
//                 </div>

//                 <button
//                   onClick={nextSlide}
//                   className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
//                   aria-label="Next slide"
//                 >
//                   <ChevronRight className="w-6 h-6" />
//                 </button>
//               </div>

//               {/* Thumbnail Preview */}

//               {currentPrompt.media?.images?.length === 0 &&
//                 currentPrompt.media?.videos?.length === 0 &&
//                 currentPrompt.media?.pdfs?.length === 0 && (
//                   <p className="text-gray-600">No media found</p>
//                 )}

//               <div className="absolute bottom-16 left-4 flex gap-2">
//                 {currentPrompt.media.images.map((image, index) => (
//                   <img
//                     key={index}
//                     src={image}
//                     alt={`Thumbnail ${index + 1}`}
//                     onClick={() => setCurrentSlide(index + 1)}
//                     className={`w-12 lg:w-16 h-12 lg:h-16 object-cover rounded-md cursor-pointer ${
//                       currentSlide === index + 1
//                         ? 'border-2 border-purple-600'
//                         : 'border border-gray-500'
//                     }`}
//                   />
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div>
//           <PromptBottomCard
//             user={user}
//             reviews={reviews}
//             isAuthenticated={isAuthenticated}
//             editReview={editReview}
//             existingReview={existingReview}
//             handleCancelEdit={handleCancelEdit}
//             averageRating={rating}
//             currentPrompt={currentPrompt}
//             reviewsCount={reviewsCount}
//             promptId={currentPrompt._id}
//             handleEditReview={handleEditReview}
//             reviewsLoading={reviewsLoading}
//             reviewsError={reviewsError}
//           />
//         </div>
//       </motion.section>
//       <div>
//         <div className="relative w-full bg-[#2d1b4e] z-0">
//           {/* Overlay Background */}

//           <div className="w-full bottom-0 h-4 lg:h-10">
//             <svg
//               viewBox="0 0 1440 100"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
//                 className="fill-current dark:text-dark-primary-dark text-dark-primary shadow-2xl"
//               ></path>
//             </svg>
//           </div>
//         </div>
//         <Footer />
//       </div>
//     </>
//   );
// }

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { usePromptStore } from '../../store/promptStore';
import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
import { AnimatePresence, motion } from 'framer-motion';
import { useReviewStore } from '../../store/reviewStore';
import { useAuthStore } from '../../store/authStore';
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Copy,
  LogIn,
} from 'lucide-react';
import PromptBottomCard from '../../components/prompt/PromptBottomCard';
import toast from 'react-hot-toast';
import { BorderTrail } from '../../components/framer-motion/animations/BorderTrail';
import { repeat } from 'lodash';
import Footer from '../../components/global/Footer';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';
import { getCurrentSiteUrl } from '../../utils/getCurrentSiteUrl';
import SEO from '../../components/seo/SEO';

export default function PromptDetailz() {
  const { promptId } = useParams();
  const { fetchPromptById, currentPrompt, isLoading, error } = usePromptStore();

  const [isExpanded, setIsExpanded] = useState(false);
  const [isExampleResonspeIsExpanded, setIsExampleResonspeIsExpanded] =
    useState(false);

  const {
    fetchReviewsForPrompt,
    reviews,
    isLoading: reviewsLoading,
    error: reviewsError,
    averageRatingForPrompt,
  } = useReviewStore();
  const { user, isAuthenticated } = useAuthStore();
  const [editReview, setEditReview] = useState(null);

  // Unconditional useEffect calls
  useEffect(() => {
    fetchPromptById(promptId);
    fetchReviewsForPrompt(promptId);
  }, [promptId, fetchPromptById, fetchReviewsForPrompt]);

  const rating = useMemo(
    () =>
      averageRatingForPrompt
        ? averageRatingForPrompt(promptId)?.toFixed(1)
        : 'N/A',
    [promptId, averageRatingForPrompt]
  );

  const reviewsCount = prompt.reviews?.length || 0;

  const handleEditReview = useCallback(review => setEditReview(review), []);
  const handleCancelEdit = useCallback(() => setEditReview(null), []);
  const existingReview = useMemo(() => editReview || {}, [editReview]);

  const [currentSlide, setCurrentSlide] = useState(1);
  const totalSlides = currentPrompt?.media?.images?.length || 1;

  const nextSlide = () =>
    setCurrentSlide(prev => (prev === totalSlides ? 1 : prev + 1));
  const prevSlide = () =>
    setCurrentSlide(prev => (prev === 1 ? totalSlides : prev - 1));

  if (isLoading) return <LoadingSpinner />;
  if (error)
    return (
      <div className="min-h-screen flex-center">
        <div className="text-red-500">{error}</div>
      </div>
    );
  if (!currentPrompt) {
    return (
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="w-full min-h-screen relative bg-gradient-to-b from-[#1a0b2e] to-[#2d1b4e]"
      >
        <div className="absolute rotate-180 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] z-[-1] opacity-80"></div>

        <div className="flex flex-col-reverse container mx-auto lg:flex-row text-white lg:py-5 pt-5 pb-0">
          {/* Left Side Skeleton */}
          <div className="flex flex-col w-full lg:w-1/2 pr-0 lg:pr-8 mb-0 lg:mb-0">
            {/* Title Placeholder */}
            <div className="bg-gray-700 h-8 w-3/4 rounded-md animate-pulse mt-5"></div>

            {/* Description Placeholder */}
            <div className="space-y-2 mt-4">
              <div className="bg-gray-700 h-4 w-full rounded-md animate-pulse"></div>
              <div className="bg-gray-700 h-4 w-5/6 rounded-md animate-pulse"></div>
            </div>

            {/* Button Placeholder */}
            <div className="bg-gray-700 h-10 w-32 rounded-md animate-pulse mt-6"></div>

            {/* Prompt Section */}
            <div className="bg-gray-800 rounded-2xl p-4 mt-6 space-y-2 animate-pulse">
              <div className="bg-gray-600 h-4 w-20 rounded-md"></div>
              <div className="bg-gray-600 h-4 w-5/6 rounded-md"></div>
            </div>

            {/* Tags Placeholder */}
            <div className="mt-4 flex space-x-2">
              <div className="bg-purple-600 h-6 w-12 rounded-full animate-pulse"></div>
              <div className="bg-purple-600 h-6 w-16 rounded-full animate-pulse"></div>
              <div className="bg-purple-600 h-6 w-10 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Right Side Skeleton */}
          <div className="w-full lg:w-1/2 relative lg:sticky top-0 md:top-28 h-80 lg:h-[80vh]">
            <div className="relative h-full flex justify-center items-center rounded-3xl overflow-hidden">
              {/* Image Placeholder */}
              <div className="bg-gray-700 h-full w-full rounded-3xl animate-pulse"></div>

              {/* Navigation Placeholder */}
              <div className="absolute bottom-4 flex items-center gap-2">
                <div className="bg-gray-800 h-10 w-10 rounded-full animate-pulse"></div>
                <div className="bg-gray-800 h-6 w-20 rounded-full animate-pulse"></div>
                <div className="bg-gray-800 h-10 w-10 rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </motion.section>
    );
  }

  // Split description into words
  const words = currentPrompt.description.split(' ');
  const isLongDescription = words.length > 100; // Check if description has more than 100 words
  const initialText = isLongDescription
    ? words.slice(0, 100).join(' ')
    : currentPrompt.description;
  // Toggle expanded state when "Learn more" is clicked
  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  // Split example response into words
  const exampleWords = currentPrompt.exampleResponse.split(' ');
  const isLongExample = exampleWords.length > 100; // Check if example has more than 100 words
  const initialExample = isLongExample
    ? exampleWords.slice(0, 100).join(' ')
    : currentPrompt.exampleResponse;

  // Toggle expanded state when "Learn more" is clicked
  const toggleExampleExpanded = () => {
    setIsExampleResonspeIsExpanded(!isExampleResonspeIsExpanded);
  };

  const promptForSEO = {
    title: currentPrompt.title,
    description: currentPrompt.description || '',
    image: currentPrompt.media.images[0] || '',
    keywords: currentPrompt.tags || [],
    category: currentPrompt.category || '',
    aiModels: currentPrompt.model || '',
    publishedTime: currentPrompt.createdAt,
    modifiedTime: currentPrompt.updatedAt,
  };
  return (
    <>
      <SEO
        title={`Free AI Prompt: ${promptForSEO.title} - PromptArena`}
        description={`${promptForSEO.description.slice(0, 150)}.  Get this free AI prompt for ${promptForSEO.category} and use it with ${promptForSEO.aiModels}. Explore more free prompts on PromptArena!`}
        keywords={`free AI prompt, ${promptForSEO.keywords}, ${promptForSEO.category}, ${promptForSEO.aiModels}, AI art prompts, AI writing prompts, text generation, image generation, code generation`}
        url={getCurrentSiteUrl() + `/prompt/${promptId}`}
        image={promptForSEO.image}
        article={{
          publishedTime: promptForSEO.publishedTime,
          modifiedTime: promptForSEO.modifiedTime,
          tags: promptForSEO.keywords,
        }}
      />

      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className=" w-full min-h-screen relative bg-gradient-to-b from-[#1a0b2e] to-[#2d1b4e] "
      >
        <div className="absolute rotate-180 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[-1] opacity-80"></div>

        <div className="flex flex-col-reverse container mx-auto lg:flex-row text-white lg:py-5 pt-5 pb-0">
          {/* Left Side Content */}
          <div className="flex flex-col w-full lg:w-1/2 pr-0 lg:pr-8 mb-0 lg:mb-0">
            {/* Content and buttons */}
            <div className="space-y-4 mt-5 md:mt-0">
              {
                <h1 className="h2 font-semibold leading-tight text-shadow">
                  {currentPrompt.title}
                </h1>
              }
            </div>

            {/* More text and content */}
            <div>
              <p className="my-4 text-gray-300 leading-relaxed">
                <h2>
                  <span className="text-gray-400 h6 font-extrabold">
                    Description:
                  </span>
                </h2>
                {isExpanded || !isLongDescription
                  ? currentPrompt.description
                  : `${initialText}...`}
              </p>
              {isLongDescription && (
                <motion.button
                  onClick={toggleExpanded}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: '0px 4px 10px rgba(100, 100, 255, 0.5)',
                    transition: { type: 'spring', stiffness: 300, damping: 15 },
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="flex mb-4 items-center gap-2 bg-gray-800 border border-purple-500 rounded-full px-4 py-2 hover:bg-gray-700 transition-colors"
                >
                  <div className="w-6 h-6 bg-purple-600 rounded-full flex items-center justify-center">
                    <ArrowRight className="w-4 h-4 rotate-90 text-white" />
                  </div>
                  {isExpanded ? 'Show less' : 'Learn more'}
                </motion.button>
              )}
            </div>

            {/* Prompt */}
            {isAuthenticated ? (
              currentPrompt && (
                <>
                  <div className="flex items-center justify-between bg-purple-900 rounded-2xl p-4 transition-colors">
                    <div className="flex items-center gap-4">
                      <div>
                        <div className="flex items-center justify-between gap-4">
                          <h3 className="font-semibold ">Prompt:</h3>

                          <motion.button
                            whileTap={{
                              scale: 0.9,
                              transition: {
                                type: 'spring',
                                stiffness: 300,
                                damping: 15,
                              },
                            }}
                            onClick={() => {
                              navigator.clipboard.writeText(
                                currentPrompt.prompt
                              );
                              toast.success('Prompt copied to clipboard');
                            }}
                            className="bg-purple-800 shadow-2xl text-white px-2 py-2 rounded-lg hover:bg-purple-800 transition-colors"
                          >
                            <Copy className="w-4 h-4" />
                          </motion.button>
                        </div>
                        <p className="text-sm text-white italic">
                          {currentPrompt.prompt}{' '}
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )
            ) : (
              <div className="flex items-center justify-between bg-gray-800 rounded-2xl p-4 transition-colors">
                <h1 className="text-gray-300 whitespace-pre-line">
                  Please{' '}
                  <Link to="/login" className=" text-blue-500">
                    login
                  </Link>{' '}
                  to Get the prompt
                </h1>
                <button>
                  <Link
                    to="/login"
                    className="text-white flex-center px-4 py-1 rounded-lg bg-purple-500 hover:bg-purple-600 transition-colors"
                  >
                    Login <LogIn className="w-4 h-4 ml-2" />
                  </Link>
                </button>
              </div>
            )}

            <div className="space-y-4 mt-4">
              {user && (
                <div className="flex items-center justify-between rounded-2xl p-4 bg-purple-900 hover:bg-purple-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <img
                      src={getOptimizedImageUrl(user.profileImage, {
                        w: 50,
                        h: 50,
                        q: 'auto',
                      })}
                      className="rounded-full w-10 h-10 ring-1 ring-neutral-300"
                      alt={user.username}
                    />
                    <div>
                      <h3 className="font-semibold">Creator</h3>
                      <p className="text-sm text-gray-100">
                        {currentPrompt.seller.username}
                      </p>
                    </div>
                  </div>
                  <Link
                    to={`/profile/username/${currentPrompt.seller.username}`}
                  >
                    <ArrowRight className="w-6 h-6 text-purple-500" />
                  </Link>
                </div>
              )}

              {currentPrompt && (
                <div className="flex items-center justify-between bg-purple-900 rounded-2xl px-4 py-3 hover:bg-purple-800 transition-colors">
                  <div className="flex items-center gap-4">
                    <div>
                      <h3 className="font-semibold">Tags:</h3>

                      <div className="flex flex-wrap space-x-2">
                        {currentPrompt.tags.map(tag => (
                          <Link key={tag} to={`/prompts/tag/${tag}`}>
                            <span className="bg-purple-600 shadow-2xl text-shadow px-2 rounded-full text-sm">
                              #{tag}
                            </span>
                          </Link>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-8">
              {currentPrompt.exampleResponse && (
                <>
                  <p className="mb-4 text-gray-300">
                    <span className="font-semibold block mb-2">
                      Example Response:
                    </span>{' '}
                    {isExampleResonspeIsExpanded || !isLongExample
                      ? currentPrompt.exampleResponse
                      : `${initialExample}...`}
                  </p>
                  {isLongExample && (
                    <button
                      onClick={toggleExampleExpanded}
                      className="flex items-center gap-2 bg-purple-600 text-white rounded-full px-6 py-1 hover:bg-purple-700 transition-colors"
                    >
                      {isExampleResonspeIsExpanded ? 'Show Less' : 'Show More'}{' '}
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>

          {/* Right Side - Sticky Carousel */}
          <div className="w-full lg:w-1/2 relative lg:sticky top-0 md:top-28 h-80 lg:h-[80vh]">
            <div className="relative h-full flex justify-center items-center rounded-3xl overflow-hidden">
              <BorderTrail
                size={10000}
                transition={{
                  repeat: Infinity,
                }}
              />
          
              <AnimatePresence mode="wait">
                {currentPrompt.media.images.length > 0 && (
                  <motion.img
                    key={currentSlide}
                    src={currentPrompt.media.images[currentSlide - 1]}
                    alt={`Slide ${currentSlide}`}
                    className="w-full h-auto object-cover rounded-3xl aspect-square"
                    initial={{ opacity: 0.5, scale: 1.05 }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                      transition: { duration: 0.6, ease: 'easeOut' },
                    }}
                    exit={{
                      opacity: 0.5,
                      scale: 1.05,
                      transition: { duration: 0.6, ease: 'easeIn' },
                    }}
                  />
                )}
              </AnimatePresence>

              {/* Carousel Navigation */}
              <div className="absolute bottom-4 flex items-center gap-2">
                <button
                  onClick={prevSlide}
                  className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
                  aria-label="Previous slide"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <div className="bg-gray-800 text-white rounded-full px-3 py-1">
                  {currentSlide}/{totalSlides}
                </div>

                <button
                  onClick={nextSlide}
                  className="bg-gray-800 text-white rounded-full p-2 hover:bg-gray-700 transition-colors"
                  aria-label="Next slide"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Thumbnail Preview */}

              {currentPrompt.media?.images?.length === 0 &&
                currentPrompt.media?.videos?.length === 0 &&
                currentPrompt.media?.pdfs?.length === 0 && (
                  <p className="text-gray-600">No media found</p>
                )}

              <div className="absolute bottom-16 left-4 flex gap-2">
                {currentPrompt.media.images.map((image, index) => (
                  <img
                    key={index}
                    src={getOptimizedImageUrl(image, { w: 100, h: 100 })}
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setCurrentSlide(index + 1)}
                    className={`w-12 lg:w-16 h-12 lg:h-16 object-cover rounded-md cursor-pointer ${
                      currentSlide === index + 1
                        ? 'border-2 border-purple-600'
                        : 'border border-gray-500'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <PromptBottomCard
            user={user}
            reviews={reviews}
            isAuthenticated={isAuthenticated}
            editReview={editReview}
            existingReview={existingReview}
            handleCancelEdit={handleCancelEdit}
            averageRating={rating}
            currentPrompt={currentPrompt}
            reviewsCount={reviewsCount}
            promptId={currentPrompt._id}
            handleEditReview={handleEditReview}
            reviewsLoading={reviewsLoading}
            reviewsError={reviewsError}
          />
        </div>
      </motion.section>
      <div>
        <div className="relative w-full bg-[#2d1b4e] z-0">
          {/* Overlay Background */}

          <div className="w-full bottom-0 h-4 lg:h-10">
            <svg
              viewBox="0 0 1440 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
                className="fill-current dark:text-dark-primary-dark text-dark-primary shadow-2xl"
              ></path>
            </svg>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
}
