/* eslint-disable react/display-name */
// // MinimalPromptCard.jsx
// import React, { memo, useState, useEffect, useMemo } from 'react';
// import { Clock, User } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useUserProfileStore } from '../../store/userProfileStore';
// import { formatRelativeTime } from '../../utils/date';
// import '../../assets/css/prompt/MinimalPromptCard.css';

// // CollageImages component for rendering images in a grid
// const CollageImages = memo(({ images }) => (
//   <div className="grid grid-cols-2 gap-0 absolute inset-0 collage-image">
//     {images.slice(0, 2).map((image, index) => (
//       <img
//         key={index}
//         src={image}
//         alt={`collage-image-${index}`}
//         className="w-full h-full object-cover"
//       />
//     ))}
//   </div>
// ));

// const MinimalPromptCard = memo(({ prompt }) => {
//   const { fetchUserProfileByUsername } = useUserProfileStore();

//   const [sellerProfile, setSellerProfile] = useState(null);
//   const [isLoadingSellerProfile, setIsLoadingSellerProfile] = useState(false);

//   const {
//     title = 'Untitled Prompt',
//     category = 'General',
//     tags = [],
//     media: { images = [] } = {},
//     createdAt = new Date().toISOString(),
//     seller = {},
//     _id: promptId,
//   } = prompt || {};

//   // Collage images are derived here to show two images in a grid.
//   const collageImages = useMemo(
//     () => Array.from({ length: 2 }, (_, i) => images[i % images.length]),
//     [images]
//   );

//   // Fetch seller profile based on the provided username
//   useEffect(() => {
//     if (seller.username) {
//       const fetchSellerProfile = async () => {
//         setIsLoadingSellerProfile(true);
//         try {
//           const profile = await fetchUserProfileByUsername(seller.username);
//           setSellerProfile(profile);
//         } catch (error) {
//           console.error('Error fetching seller profile:', error);
//         } finally {
//           setIsLoadingSellerProfile(false);
//         }
//       };
//       fetchSellerProfile();
//     }
//   }, [seller.username, fetchUserProfileByUsername]);

//   return (
//     <Link to={`/prompt/${promptId}`}>
//       <div className="card">
//         <div className="image-wrapper">
//           <CollageImages images={collageImages} />
//           <div className="label py-[0.20rem] shadow-2xl px-[0.35rem] rounded-md glass-panel">
//             {category}
//           </div>
//         </div>
//         <div className="overlay">
//           <h2 className="title">{title}</h2>
//           <div className="additional-info">
//             <div className="space-x-2 mb-1">
//               {tags.slice(0, 2).map((tag, idx) => (
//                 <Link
//                   key={idx}
//                   to={`/prompts/tags/${tag}`}
//                   className="hover:underline"
//                 >
//                   <span
//                     className={`badge px-[0.30rem] py-[0px] rounded bg-text ring-1 text-shadow text-xs font-thin text-white ${idx === 0 ? 'ring-cyber-green/50' : 'ring-cyber-blue/50'}`}
//                   >
//                     {tag}
//                   </span>
//                 </Link>
//               ))}
//             </div>
//             <div className="flex items-center gap-2">
//               <User size={14} />
//               <span>
//                 {isLoadingSellerProfile
//                   ? 'Loading...'
//                   : sellerProfile?.name || seller.username || 'Anonymous'}
//               </span>
//               <Clock size={14} />
//               <span>{formatRelativeTime(createdAt)}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </Link>
//   );
// });

// export default MinimalPromptCard;

// MinimalPromptCard.jsx
import React, { memo, useState, useEffect, useMemo } from 'react';
import { Clock, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useUserProfileStore } from '../../store/userProfileStore';
import { formatRelativeTime } from '../../utils/date';
import '../../assets/css/prompt/MinimalPromptCard.css';
import OptimizedImage from '../base/OptimizedImage';
import EventLoggingButton from '../global/EventLoggingButton';

// CollageImages component for rendering images in a grid
const CollageImages = memo(({ images }) => (
  <div className="grid grid-cols-2 gap-0 absolute inset-0 collage-image">
    {images.slice(0, 2).map((image, index) => (
      <OptimizedImage
        key={index}
        src={image}
        alt={`collage-image-${index}`}
        className="w-full h-full object-cover"
      />
    ))}
  </div>
));

const MinimalPromptCard = memo(({ prompt }) => {
  const { fetchUserProfileByUsername } = useUserProfileStore();

  const [sellerProfile, setSellerProfile] = useState(null);
  const [isLoadingSellerProfile, setIsLoadingSellerProfile] = useState(false);

  const {
    title = 'Untitled Prompt',
    category = 'General',
    tags = [],
    media: { images = [] } = {},
    createdAt = new Date().toISOString(),
    seller = {},
    _id: promptId,
  } = prompt || {};

  // Collage images are derived here to show two images in a grid.
  const collageImages = useMemo(
    () => Array.from({ length: 2 }, (_, i) => images[i % images.length]),
    [images]
  );

  // Fetch seller profile based on the provided username
  useEffect(() => {
    if (seller.username) {
      const fetchSellerProfile = async () => {
        setIsLoadingSellerProfile(true);
        try {
          const profile = await fetchUserProfileByUsername(seller.username);
          setSellerProfile(profile);
        } catch (error) {
          console.error('Error fetching seller profile:', error);
        } finally {
          setIsLoadingSellerProfile(false);
        }
      };
      fetchSellerProfile();
    }
  }, [seller.username, fetchUserProfileByUsername]);

  return (
    <EventLoggingButton category="prompts" action="view" label={title}>
      <Link to={`/prompt/${promptId}`}>
        <div className="card">
          <div className="image-wrapper">
            <CollageImages images={collageImages} />
            <div className="label sm:py-[0.20rem] sm:px-[0.35rem] px-[0.25rem] py-[0.10rem] sm:text-[0.7rem] text-[0.6rem] shadow-2xl rounded-md glass-panel">
              <Link to={`/prompts/category/${category}`}>{category}</Link>
            </div>
          </div>
          <div className="overlay sm:p-[0.5rem] p-[0.3rem]">
            <h4 className="title font-semibold text-sm md:text-base">
              {title.length > 20 ? `${title.slice(0, 20)}...` : title}
            </h4>
            <div className="additional-info">
              <div className="space-x-2 mb-1">
                {tags.slice(0, 2).map((tag, idx) => (
                  <Link
                    key={idx}
                    to={`/prompts/tag/${tag}`}
                    className="hover:underline"
                  >
                    <span
                      className={`badge sm:px-[0.30rem] px-[0.20rem] py-[0px] rounded bg-text ring-1 text-shadow sm:text-xs text-[10px] font-thin text-white ${idx === 0 ? 'ring-cyber-green/50' : 'ring-cyber-blue/50'}`}
                    >
                      {tag}
                    </span>
                  </Link>
                ))}
              </div>
              <div className="flex justify-between items-center sm:gap-2">
                <div className="flex items-center space-x-1">
                  <User size={14} />
                  <span className="sm:text-xs text-[10px] text-nowrap">
                    {isLoadingSellerProfile
                      ? 'Loading...'
                      : sellerProfile?.name || window.innerWidth > 425
                        ? seller.username
                        : seller.username.length > 10
                          ? `${seller.username.slice(0, 6)}...`
                          : seller.username || 'Anonymous'}
                  </span>
                </div>
                <div className="flex items-center space-x-1">
                  <Clock size={14} />
                  <span className="sm:text-xs text-[10px] text-nowrap">
                    {formatRelativeTime(createdAt)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </EventLoggingButton>
  );
});

export default MinimalPromptCard;
