import React, { useEffect, useMemo, useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { useUserProfileStore } from '../../store/userProfileStore';
import { useReviewStore } from '../../store/reviewStore';
import { formatRelativeTime } from '../../utils/date';
import { Tag, Clock, User, Star } from 'lucide-react';
import OptimizedImage from '../base/OptimizedImage';
import EventLoggingButton from '../global/EventLoggingButton';

const CollageImages = React.memo(({ images }) => {
  const collageImages = useMemo(
    () => Array.from({ length: 4 }, (_, i) => images[i % images.length]),
    [images]
  );

  return (
    <div className="grid grid-cols-2 grid-rows-2 gap-0 absolute inset-0">
      {collageImages.map((image, index) => (
        <OptimizedImage
          key={index}
          src={image}
          alt={`collage-image-${index}`}
          className="w-full h-full object-cover"
          loading="lazy" // Lazy load images
        />
      ))}
    </div>
  );
});

const Stars = React.memo(({ rating }) => {
  const stars = useMemo(() => {
    const filledStars = Math.min(
      5,
      Math.max(0, rating === 'N/A' ? 0 : +rating)
    );
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        size={12}
        strokeWidth={2}
        className={`mr-0.5 ${
          i < filledStars
            ? 'text-warning dark:text-dark-warning'
            : 'text-text-subdued dark:text-dark-text-subdued'
        }`}
      />
    ));
  }, [rating]);

  return <div className="flex ml-1">{stars}</div>;
});

const PromptCard = React.memo(({ prompt }) => {
  const { fetchUserProfileByUsername } = useUserProfileStore();
  const { fetchReviewsForPrompt, averageRatingForPrompt } = useReviewStore();

  const [sellerProfile, setSellerProfile] = useState(null);
  const [isLoadingSellerProfile, setIsLoadingSellerProfile] = useState(false);
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);

  const {
    title = 'Untitled Prompt',
    description = 'No description available',
    price = 'N/A',
    category = 'General',
    tags = [],
    media: { images = [] } = {},
    createdAt = new Date().toISOString(),
    seller = {},
    reviews = [],
  } = prompt || {};

  const fetchSellerProfile = useCallback(async () => {
    if (!seller?.username) return;

    setIsLoadingSellerProfile(true);
    try {
      const profile = await fetchUserProfileByUsername(seller.username);
      setSellerProfile(profile);
    } catch (error) {
      console.error('Error fetching seller profile:', error);
    } finally {
      setIsLoadingSellerProfile(false);
    }
  }, [seller?.username, fetchUserProfileByUsername]);

  useEffect(() => {
    fetchSellerProfile();
  }, [fetchSellerProfile]);

  useEffect(() => {
    const fetchReviews = async () => {
      setIsLoadingReviews(true);
      try {
        await fetchReviewsForPrompt(prompt._id);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      } finally {
        setIsLoadingReviews(false);
      }
    };

    fetchReviews();
  }, [prompt._id, fetchReviewsForPrompt]);

  const rating = useMemo(
    () => averageRatingForPrompt(prompt._id)?.toFixed(1) || 'N/A',
    [prompt._id, averageRatingForPrompt]
  );

  const displayTags = useMemo(() => {
    const selectedTags =
      tags.length >= 2 ? tags.slice(0, 2) : [...tags, category];
    return selectedTags.map((tag, index) => (
      <span
        key={index}
        className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100/50 backdrop-blur-sm text-xs text-white font-medium"
      >
        <Tag size={12} className="mr-1" />
        <Link className="hover:underline" to={`/prompts/tag/${tag}`}>
          {tag.length > 10 ? `${tag.slice(0, 8)}...` : tag}
        </Link>
      </span>
    ));
  }, [tags, category]);

  const memoizedUserAndTimestamp = useMemo(() => {
    if (isLoadingSellerProfile) {
      return (
        <span className="animate-pulse text-xs text-gray-500">Loading...</span>
      );
    }

    return (
      <button className="px-3 ring-1 shadow-2xl glass-panel py-1 rounded bg-gray-800/50 backdrop-blur-sm text-xs text-text-subdued dark:text-dark-text-subdued flex items-center gap-1">
        <User size={14} />
        <span>
          <Link
            className="hover:underline"
            to={`/profile/username/${sellerProfile?.name || seller.username}`}
          >
            {sellerProfile?.name || seller.username || 'Anonymous'}
          </Link>
        </span>
        <Clock size={12} className="ml-1" />
        <span>{formatRelativeTime(createdAt)}</span>
      </button>
    );
  }, [isLoadingSellerProfile, sellerProfile, seller.username, createdAt]);

  return (
    <EventLoggingButton
      className="text-left"
      category="prompts"
      action="view"
      label={title}
    >
      <div className="relative h-[580px] w-[300px] ring-1 ring-neutral-300 bg-[#1E293B] rounded-xl overflow-hidden font-space-grotesk">
        <div className="relative w-full h-0 pb-[100%] overflow-hidden rounded-tl-xl">
          <CollageImages images={images} />
          <div
            className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 cursor-pointer"
            title={title}
          />
          <div className="absolute top-2 right-2">
            <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#4B5563]/80 backdrop-blur-sm text-xs text-white font-medium">
              {prompt.model || 'Unknown'}
            </span>
          </div>
          <div className="absolute bottom-2 left-2">
            {memoizedUserAndTimestamp}
          </div>
        </div>
        <div className="p-4 shadow-inner space-y-2">
          <div className="flex items-center mb-2">
            <h2 className="text-2xl font-bold text-white leading-tight font-syncopate">
              {title.length > 20 ? `${title.slice(0, 20)}...` : title}
            </h2>
          </div>
          <p className="text-base text-[#9CA3AF] mb-3 font-space-grotesk">
            {description.length > 100
              ? `${description.substring(0, 100)}...`
              : description}
          </p>
          <div className="text-sm text-[#9CA3AF] font-jetbrains-mono mb-4 space-y-1">
            <div>
              <span className="font-semibold text-white">Category:</span>
              <Link
                className="hover:underline"
                to={`/prompts/category/${category}`}
              >
                {category.length > 10 ? `${category.slice(0, 8)}...` : category}
              </Link>
            </div>
            <div className="flex items-center">
              <span className="font-semibold text-white">Rating:</span>
              <Stars rating={rating} />
              <span className="ml-2">({reviews.length >= 0 ? reviews.length : 100} reviews)</span>
            </div>
            <div className="flex gap-1">{displayTags}</div>
          </div>
        </div>
      </div>
    </EventLoggingButton>
  );
});

export default PromptCard;

// import React, { useEffect, useMemo, useState, useCallback } from 'react';
// import { Link } from 'react-router-dom';
// import { useUserProfileStore } from '../../store/userProfileStore';
// import { useReviewStore } from '../../store/reviewStore';
// import { formatRelativeTime } from '../../utils/date';
// import { Tag, Clock, User, Star } from 'lucide-react';
// import OptimizedImage from '../base/OptimizedImage';
// import EventLoggingButton from '../global/EventLoggingButton';

// const CollageImages = React.memo(({ images }) => {
//   const collageImages = useMemo(
//     () => Array.from({ length: 4 }, (_, i) => images[i % images.length]),
//     [images]
//   );

//   return (
//     <div className="grid grid-cols-2 grid-rows-2 gap-0 absolute inset-0">
//       {collageImages.map((image, index) => (
//         <OptimizedImage
//           key={index}
//           src={image}
//           alt={`collage-image-${index}`}
//           className="w-full h-full object-cover"
//           loading="lazy" // Lazy load images
//         />
//       ))}
//     </div>
//   );
// });

// const Stars = React.memo(({ rating }) => {
//   const stars = useMemo(
//     () =>
//       [...Array(5)].map((_, i) => (
//         <Star
//           key={i}
//           size={12}
//           strokeWidth={2}
//           className={`mr-0.5 ${
//             i < (rating === 'N/A' ? 0 : rating)
//               ? 'text-warning dark:text-dark-warning'
//               : 'text-text-subdued dark:text-dark-text-subdued'
//           }`}
//         />
//       )),
//     [rating]
//   );

//   return <div className="flex ml-1">{stars}</div>;
// });

// const PromptCard = React.memo(({ prompt }) => {
//   const { fetchUserProfileByUsername } = useUserProfileStore();
//   const { fetchReviewsForPrompt, averageRatingForPrompt } = useReviewStore();

//   const [sellerProfile, setSellerProfile] = useState(null);
//   const [isLoadingSellerProfile, setIsLoadingSellerProfile] = useState(false);
//   const [isLoadingReviews, setIsLoadingReviews] = useState(false);

//   const {
//     title = 'Untitled Prompt',
//     description = 'No description available',
//     price = 'N/A',
//     category = 'General',
//     tags = [],
//     media: { images = [] } = {},
//     createdAt = new Date().toISOString(),
//     seller = {},
//   } = prompt || {};

//   const fetchSellerProfile = useCallback(async () => {
//     if (!seller?.username) return;

//     setIsLoadingSellerProfile(true);
//     try {
//       const profile = await fetchUserProfileByUsername(seller.username);
//       setSellerProfile(profile);
//     } catch (error) {
//       console.error('Error fetching seller profile:', error);
//     } finally {
//       setIsLoadingSellerProfile(false);
//     }
//   }, [seller?.username, fetchUserProfileByUsername]);

//   useEffect(() => {
//     fetchSellerProfile();
//   }, [fetchSellerProfile]);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       setIsLoadingReviews(true);
//       try {
//         await fetchReviewsForPrompt(prompt._id);
//       } catch (error) {
//         console.error('Error fetching reviews:', error);
//       } finally {
//         setIsLoadingReviews(false);
//       }
//     };

//     fetchReviews();
//   }, [prompt._id, fetchReviewsForPrompt]);

//   const rating = useMemo(
//     () => averageRatingForPrompt(prompt._id)?.toFixed(1) || 'N/A',
//     [prompt._id, averageRatingForPrompt]
//   );
//   const reviewsCount = prompt.reviews?.length || 0;

//   const displayTags = useMemo(
//     () => (tags.length >= 2 ? tags.slice(0, 2) : [...tags, category]),
//     [tags, category]
//   );

//   const memoizedTags = useMemo(
//     () =>
//       displayTags.map((tag, index) => (
//         <span
//           key={index}
//           className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100/50 backdrop-blur-sm text-xs text-white font-medium"
//         >
//           <Tag size={12} className="mr-1" />
//           <Link className="hover:underline" to={`/prompts/tag/${tag}`}>
//             {tag.length > 10 ? `${tag.slice(0, 8)}...` : tag}
//           </Link>
//         </span>
//       )),
//     [displayTags]
//   );

//   const memoizedUserAndTimestamp = useMemo(() => {
//     if (isLoadingSellerProfile) {
//       return (
//         <span className="animate-pulse text-xs text-gray-500">Loading...</span>
//       );
//     }

//     return (
//       <button className="px-3 ring-1 shadow-2xl glass-panel py-1 rounded bg-gray-800/50 backdrop-blur-sm text-xs text-text-subdued dark:text-dark-text-subdued flex items-center gap-1">
//         <User size={14} />
//         <span>
//           <Link
//             className="hover:underline"
//             to={`/profile/username/${sellerProfile?.name || seller.username}`}
//           >
//             {sellerProfile?.name || seller.username || 'Anonymous'}
//           </Link>
//         </span>
//         <Clock size={12} className="ml-1" />
//         <span>{formatRelativeTime(createdAt)}</span>
//       </button>
//     );
//   }, [isLoadingSellerProfile, sellerProfile, seller.username, createdAt]);

//   return (
//     <EventLoggingButton
//       className="text-left"
//       category="prompts"
//       action="view"
//       label={title}
//     >
//       <div className="relative overflow-hidden rounded-xl p-[2px] backdrop-blur-3xl transition-all">
//         <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

//         <div className="relative bg-[#1E293B] rounded-xl overflow-hidden font-space-grotesk">
//           <div className="relative w-full h-0 pb-[100%] overflow-hidden rounded-tl-xl">
//             <CollageImages images={images} />
//             <div
//               className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 cursor-pointer"
//               title={title}
//             />
//             <div className="absolute top-2 right-2">
//               <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#4B5563]/80 backdrop-blur-sm text-xs text-white font-medium">
//                 {prompt.model || 'Unknown'}
//               </span>
//             </div>
//             <div className="absolute bottom-2 left-2">
//               {memoizedUserAndTimestamp}
//             </div>
//           </div>

//           <div className="p-4 shadow-inner space-y-2">
//             <div className="flex items-center mb-2">
//               <h2 className="text-2xl font-bold text-white leading-tight font-syncopate">
//                 {title.length > 20 ? `${title.slice(0, 20)}...` : title}
//               </h2>
//             </div>

//             <p className="text-base text-[#9CA3AF] mb-3 font-space-grotesk">
//               {description.length > 100
//                 ? `${description.substring(0, 100)}...`
//                 : description}
//             </p>

//             <div className="text-sm text-[#9CA3AF] font-jetbrains-mono mb-4 space-y-1">
//               <div>
//                 <span className="font-semibold text-white">Category:</span>
//                 <Link
//                   className="hover:underline"
//                   to={`/prompts/category/${category}`}
//                 >
//                   {category.length > 10
//                     ? `${category.slice(0, 8)}...`
//                     : category}
//                 </Link>
//               </div>
//               <div className="flex items-center">
//                 <span className="font-semibold text-white">Rating:</span>
//                 <Stars rating={rating} />
//                 <span className="ml-2">({reviewsCount || 100} reviews)</span>
//               </div>
//               <div className="flex gap-1">{memoizedTags}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </EventLoggingButton>
//   );
// });

// export default PromptCard;

// import React, { useEffect, useMemo, useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useUserProfileStore } from '../../store/userProfileStore';
// import { useReviewStore } from '../../store/reviewStore';
// import { formatRelativeTime } from '../../utils/date';
// import { Tag, Clock, User, Star } from 'lucide-react';
// import OptimizedImage from '../base/OptimizedImage';
// import EventLoggingButton from '../global/EventLoggingButton';

// const CollageImages = React.memo(({ images }) => (
//   <div className="grid grid-cols-2 grid-rows-2 gap-0 absolute inset-0">
//     {images.map((image, index) => (
//       <OptimizedImage
//         key={index}
//         src={image}
//         alt={`collage-image-${index}`}
//         className="w-full h-full object-cover"
//       />
//     ))}
//   </div>
// ));

// const Stars = React.memo(({ rating }) => (
//   <div className="flex ml-1">
//     {[...Array(5)].map((_, i) => (
//       <Star
//         key={i}
//         size={12}
//         strokeWidth={2}
//         className={`mr-0.5 ${
//           i < (rating === 'N/A' ? 0 : rating)
//             ? 'text-warning dark:text-dark-warning'
//             : 'text-text-subdued dark:text-dark-text-subdued'
//         }`}
//       />
//     ))}
//   </div>
// ));

// const PromptCard = React.memo(({ prompt }) => {
//   const { fetchUserProfileByUsername } = useUserProfileStore();
//   const { fetchReviewsForPrompt, averageRatingForPrompt } = useReviewStore();

//   const [sellerProfile, setSellerProfile] = useState(null);
//   const [isLoadingSellerProfile, setIsLoadingSellerProfile] = useState(false);
//   const [isLoadingReviews, setIsLoadingReviews] = useState(false);

//   const {
//     title = 'Untitled Prompt',
//     description = 'No description available',
//     price = 'N/A',
//     category = 'General',
//     tags = [],
//     media: { images = [] } = {},
//     createdAt = new Date().toISOString(),
//     seller = {},
//   } = prompt || {};

//   const collageImages = useMemo(
//     () => Array.from({ length: 4 }, (_, i) => images[i % images.length]),
//     [images]
//   );

//   useEffect(() => {
//     let isMounted = true;
//     if (seller?.username) {
//       const fetchSellerProfile = async () => {
//         setIsLoadingSellerProfile(true);
//         try {
//           const profile = await fetchUserProfileByUsername(seller.username);
//           if (isMounted) setSellerProfile(profile);
//         } catch (error) {
//           console.error('Error fetching seller profile:', error);
//         } finally {
//           if (isMounted) setIsLoadingSellerProfile(false);
//         }
//       };
//       fetchSellerProfile();
//     }
//     return () => {
//       isMounted = false;
//     };
//   }, [seller?.username, fetchUserProfileByUsername]);

//   useEffect(() => {
//     const loadReviews = async () => {
//       setIsLoadingReviews(true);
//       await fetchReviewsForPrompt(prompt._id);
//       setIsLoadingReviews(false);
//     };
//     loadReviews();
//   }, [prompt._id, fetchReviewsForPrompt]);

//   const rating = useMemo(
//     () => averageRatingForPrompt(prompt._id)?.toFixed(1) || 'N/A',
//     [prompt._id, averageRatingForPrompt]
//   );
//   const reviewsCount = prompt.reviews?.length || 0;

//   const displayTags = useMemo(
//     () => (tags.length >= 2 ? tags.slice(0, 2) : [...tags, category]),
//     [tags, category]
//   );

//   const memoizedTags = useMemo(
//     () =>
//       displayTags.map((tag, index) => (
//         <span
//           key={index}
//           className="inline-flex items-center px-2 py-0.5 rounded bg-gray-100/50 backdrop-blur-sm text-xs text-white font-medium"
//         >
//           <Tag size={12} className="mr-1" />
//           {tag && (
//             <Link className="hover:underline" to={`/prompts/tag/${tag}`}>
//               {tag.length > 10 ? `${tag.slice(0, 8)}...` : tag}
//             </Link>
//           )}
//         </span>
//       )),
//     [displayTags]
//   );

//   const memoizedUserAndTimestamp = useMemo(
//     () => (
//       <button className="px-3 ring-1 shadow-2xl glass-panel py-1 rounded bg-gray-800/50 backdrop-blur-sm text-xs text-text-subdued dark:text-dark-text-subdued flex items-center gap-1">
//         <User size={14} />
//         <span>
//           <Link
//             className="hover:underline"
//             to={`/profile/username/${sellerProfile?.name || seller.username}`}
//           >
//             {sellerProfile?.name || seller.username || 'Anonymous'}
//           </Link>
//         </span>
//         <Clock size={12} className="ml-1" />
//         <span>{formatRelativeTime(createdAt)}</span>
//       </button>
//     ),
//     [sellerProfile, seller.username, createdAt]
//   );

//   return (
//     <EventLoggingButton className="text-left" category="prompts" action="view" label={title}>
//       <div className="relative overflow-hidden rounded-xl p-[2px] backdrop-blur-3xl transition-all">
//         <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />

//         <div className="relative bg-[#1E293B] rounded-xl overflow-hidden font-space-grotesk">
//           <div className="relative w-full h-0 pb-[100%] overflow-hidden rounded-tl-xl">
//             <CollageImages images={collageImages} />
//             <div
//               className="absolute inset-0 bg-gradient-to-b from-transparent to-black/40 cursor-pointer"
//               title={title}
//             />

//             <div className="absolute top-2 right-2">
//               <span className="inline-flex items-center px-2 py-0.5 rounded bg-[#4B5563]/80 backdrop-blur-sm text-xs text-white font-medium">
//                 {prompt.model || 'Unknown'}
//               </span>
//             </div>

//             <div className="absolute bottom-2 left-2">
//               {isLoadingSellerProfile ? (
//                 <span className="animate-pulse text-xs text-gray-500">
//                   Loading...
//                 </span>
//               ) : (
//                 memoizedUserAndTimestamp
//               )}
//             </div>
//           </div>

//           <div className="p-4 shadow-inner space-y-2">
//             <div className="flex items-center mb-2">
//               <h2 className="text-2xl font-bold text-white leading-tight font-syncopate">
//                 {title.length > 20 ? `${title.slice(0, 20)}...` : title}
//               </h2>
//             </div>

//             {/* Conditionally show description with truncation for large descriptions */}
//             <p className="text-base text-[#9CA3AF] mb-3 font-space-grotesk">
//               {description.length > 100
//                 ? `${description.substring(0, 100)}...`
//                 : description}
//             </p>

//             <div className="text-sm text-[#9CA3AF] font-jetbrains-mono mb-4 space-y-1">
//               <div>
//                 <span className="font-semibold text-white">Category:</span>
//                 <Link
//                   className="hover:underline"
//                   to={`/prompts/category/${category}`}
//                 >
//                   {category.length > 10
//                     ? `${category.slice(0, 8)}...`
//                     : category}
//                 </Link>
//               </div>
//               <div className="flex items-center">
//                 <span className="font-semibold text-white">Rating:</span>
//                 <Stars rating={rating} />
//                 <span className="ml-2">({reviewsCount || 100} reviews)</span>
//               </div>

//               <div className="flex gap-1">{memoizedTags}</div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </EventLoggingButton>
//   );
// });

// export default PromptCard;
