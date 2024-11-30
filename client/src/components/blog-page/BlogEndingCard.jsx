import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Loader, Loader2, Zap } from 'lucide-react';
import {
  avatar1,
  avatar10,
  avatar11,
  avatar12,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
} from '../../assets/img/blogpage';
import { Link, useNavigate } from 'react-router-dom';
import axiosInstance from '../../services/axiosInstance';
import toast from 'react-hot-toast';
import { useNewsletterStore } from '../../store/useNewsletterStore';
import { useAuthStore } from '../../store/authStore';

// Array of avatar images for easier mapping
const avatars = [
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
  avatar8,
  avatar9,
  avatar10,
  avatar11,
  avatar12,
];

// Component for individual avatar images
const AvatarImage = ({ src, alt }) => (
  <div className="overflow-hidden h-[100px] w-full flex-shrink-0">
    <img
      src={src}
      alt={alt}
      className="w-full h-full object-cover rounded-xl"
    />
  </div>
);

// Animated column component with continuous wraparound scroll
const ScrollColumn = ({ images, direction }) => (
  <motion.div
    className="flex flex-col space-y-3"
    animate={{
      y:
        direction === 'topToBottom'
          ? [0, -images.length * 100, 0]
          : [0, images.length * 100, 0],
    }}
    transition={{
      duration: 20,
      repeat: Infinity,
      ease: 'linear',
    }}
    style={{ overflow: 'hidden' }}
  >
    {[...images, ...images].map((src, index) => (
      <AvatarImage key={index} src={src} alt={`Avatar ${index + 1}`} />
    ))}
  </motion.div>
);

export default function BlogEndingCard() {
  const { user, isAuthenticated } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [email, setEmail] = useState('');

  // Pre-fill email if user is authenticated
  useEffect(() => {
    if (isAuthenticated && user && user.email) {
      setEmail(user.email);
    }
  }, [isAuthenticated, user]);

  const handleDiscordClick = async () => {
    setIsLoading(true); // Set loading state to true when the request starts
    try {
      const response = await axiosInstance.post('/newsletter/subscribe', {
        email,
      });
      console.log('response: ', response);
      setEmail('');
      toast.success('Successfully subscribed to the newsletter!'); // Optional success message
    } catch (error) {
      if (!isAuthenticated) {
        toast.error('You must be logged in to subscribe to the newsletter.');
        navigate('/login');
      } else {
        toast.error(
          error.response.data.message ||
            'Something went wrong. Please try again.'
        );
      }
    } finally {
      setIsLoading(false); // Set loading state to false when the request is complete
    }
  };

  return (
    <div className="relative py-5 w-full bg-gradient-to-b from-[#2e1550] to-[#2d1b4e] z-0 overflow-hidden">
      {/* Overlay Background */}
      <div className="absolute rotate-180 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[-1] opacity-80"></div>

      <div className="flex items-center justify-center p-4">
        <div className="w-full max-w-[1200px] md:h-[400px] h-[800px] bg-[#111111] overflow-hidden shadow-2xl backdrop-blur-3xl rounded-3xl px-6 md:px-8 text-white">
          {/* Content Container */}
          <div className="flex flex-col md:flex-row gap-8">
            {/* Left Column */}
            <div className="lg:w-1/2 py-6 md:py-8 space-y-6">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-[#4D7FFF]" />
                <span className="text-[#4D7FFF] font-medium text-sm md:text-base">
                  AI Creation
                </span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold leading-tight">
                {/* Produce Videos that Cater to the 👍
                <br />
                Diversity of your Viewers. */}
                {/* Get the latest on AI prompt🤖
                <br /> creators, and innovations!{' '} */}
                {/* New prompt releases📬 <br /> and trending topics */}
                New prompt releases📰 <br /> and trending topics🏆
              </h2>
              <ul className="space-y-2 text-gray-400 text-sm md:text-base">
                {/* <li>• New prompt releases and trending topics.</li> */}
                <li>• Stay updated on the latest AI trends and tools.</li>
                <li>• Exclusive tips, tutorials, and community spotlights.</li>
                <li>• Platform updates and exciting announcements.</li>
              </ul>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={handleDiscordClick}
                  disabled={isLoading}
                  className="inline-flex px-4 py-2 md:px-6 md:py-3 items-center justify-center rounded-lg border border-gray-800 bg-gradient-to-t from-[#8678f9] from-0% to-[#c7d2fe] font-medium text-gray-950 transition-colors focus:outline-none"
                >
                  {isLoading ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader />
                      <span>Getting...</span>
                    </span>
                  ) : (
                    'Get AI Updates'
                  )}
                </button>
                {/* <button className="inline-flex px-4 py-2 md:px-6 md:py-3 items-center justify-center rounded-lg border border-gray-800 bg-gradient-to-t from-[#8678f9] from-0% to-[#c7d2fe] font-medium text-gray-950 transition-colors focus:outline-none">
                  Get AI Updates
                </button> */}
                <button className="px-4 py-2 md:px-6 md:py-3 rounded-lg font-medium text-sm md:text-base border border-[#FF6B6B] text-[#FF6B6B]">
                  <Link to={'/explore'}>Explore all Prompts </Link>
                </button>
              </div>
            </div>

            {/* Right Column - Avatar Grid with Continuous Scroll */}
            <div className="lg:w-1/2 overflow-hidden grid grid-cols-4 gap-3">
              <ScrollColumn
                images={avatars.slice(0, 3)}
                direction="topToBottom"
              />
              <ScrollColumn
                images={avatars.slice(3, 7)}
                direction="topToBottom"
              />
              <ScrollColumn
                images={avatars.slice(6, 9)}
                direction="topToBottom"
              />
              <ScrollColumn images={avatars.slice(9)} direction="topToBottom" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
// import React from 'react';
// import { motion } from 'framer-motion';
// import { Zap } from 'lucide-react';
// import {
//   avatar1,
//   avatar10,
//   avatar11,
//   avatar12,
//   avatar2,
//   avatar3,
//   avatar4,
//   avatar5,
//   avatar6,
//   avatar7,
//   avatar8,
//   avatar9,
// } from '../../assets/img/blogpage';

// // Array of avatar images for easier mapping
// const avatars = [
//   avatar1,
//   avatar2,
//   avatar3,
//   avatar4,
//   avatar5,
//   avatar6,
//   avatar7,
//   avatar8,
//   avatar9,
//   avatar10,
//   avatar11,
//   avatar12,
// ];

// // Component for individual avatar images
// const AvatarImage = ({ src, alt }) => (
//   <div className="overflow-hidden h-[100px] w-full flex-shrink-0">
//     <img
//       src={src}
//       alt={alt}
//       className="w-full h-full object-cover rounded-xl"
//     />
//   </div>
// );

// // Animated column component with continuous wraparound scroll
// const ScrollColumn = ({ images, direction }) => (
//   <motion.div
//     className="flex flex-col space-y-3"
//     animate={{
//       y:
//         direction === 'topToBottom'
//           ? [0, -images.length * 100, 0]
//           : [0, images.length * 100, 0],
//     }}
//     transition={{
//       duration: 20,
//       repeat: Infinity,
//       ease: 'linear',
//     }}
//     style={{ overflow: 'hidden' }}
//   >
//     {[...images, ...images].map((src, index) => (
//       <AvatarImage key={index} src={src} alt={`Avatar ${index + 1}`} />
//     ))}
//   </motion.div>
// );

// export default function BlogEndingCard() {
//   return (
//     <div className="relative w-full bg-gradient-to-b from-[#2e1550] to-[#2d1b4e] z-0 overflow-hidden">
//       {/* Overlay Background */}
//       <div className="absolute rotate-180 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[-1] opacity-80"></div>

//       <div className="flex items-center justify-center p-4">
//         <div className="w-full max-w-[1200px] h-[400px] bg-[#111111] overflow-hidden shadow-2xl backdrop-blur-3xl rounded-3xl px-8 text-white">
//           {/* Content Container */}
//           <div className="flex flex-col lg:flex-row gap-8">
//             {/* Left Column */}
//             <div className="lg:w-1/2 py-8 space-y-6">
//               <div className="flex items-center gap-2">
//                 <Zap className="w-5 h-5 text-[#4D7FFF]" />
//                 <span className="text-[#4D7FFF] font-medium">AI Avatars</span>
//               </div>
//               <h2 className="text-3xl font-bold leading-tight">
//                 Produce Videos that Cater to the 👍
//                 <br />
//                 Diversity of your Viewers.
//               </h2>
//               <ul className="space-y-2 text-gray-400">
//                 <li>• Engage your viewers with over 140 AI Avatars.</li>
//                 <li>• Make your videos more inclusive & diverse.</li>
//                 <li>• Create your own AI Avatar (your digital twin)</li>
//               </ul>
//               <div className="flex gap-4">
//                 <button className="inline-flex px-6 py-2 items-center justify-center rounded-lg border border-gray-800 bg-gradient-to-t from-[#8678f9] from-0% to-[#c7d2fe] font-medium text-gray-950 transition-colors focus:outline-none">
//                   Generate Now
//                 </button>
//                 <button className="px-6 py-2 rounded-lg font-medium text-sm border border-[#FF6B6B] text-[#FF6B6B]">
//                   See all Avatar
//                 </button>
//               </div>
//             </div>

//             {/* Right Column - Avatar Grid with Continuous Scroll */}
//             <div className="lg:w-1/2 grid grid-cols-4 gap-3">
//               {/* Each column scrolls in alternate directions */}
//               {/* Each column scrolls in alternate directions */}
//               <ScrollColumn
//                 images={avatars.slice(0, 3)}
//                 direction="topToBottom"
//               />
//               <ScrollColumn
//                 images={avatars.slice(3, 7)}
//                 direction="topToBottom"
//               />
//               <ScrollColumn
//                 images={avatars.slice(6, 9)}
//                 direction="topToBottom"
//               />
//               <ScrollColumn images={avatars.slice(9)} direction="topToBottom" />
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
