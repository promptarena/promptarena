import React, { useEffect, useState } from 'react';
import { DiscIcon as Discord, Loader2, Twitter, Youtube } from 'lucide-react';
import MarqueeSlider from '../explore/MarqueeSlider';
import { purpleRobotRight } from '../../assets/img/promptpage';
import { useAuthStore } from '../../store/authStore';
import toast from 'react-hot-toast';
import { useNewsletterStore } from '../../store/useNewsletterStore';
import axiosInstance from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

const NewsLetterContact = () => {
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
    <div className="bg-[#341358] flex items-center justify-center p-4 md:p-8">
      {/* <div className="bg-[#341358] flex items-center justify-center p-4 md:p-8"> */}
      <div className="w-full h-full bg-[#000000] rounded-[40px] overflow-hidden relative flex flex-col md:flex-row items-center justify-between md:pr-16">
        {/* Wave pattern */}
        <div className="absolute top-0 hidden md:block right-1/2 transform translate-x-1/2 rotate-180 z-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="200"
            height="200"
            fill="none"
            viewBox="0 0 200 50"
          >
            <path
              fill="url(#paint0_linear_105_460)"
              fillRule="evenodd"
              d="M200 150c0-55.228-44.772-100-100-100S0 94.772 0 150h200Z"
              clipRule="evenodd"
            ></path>
            <defs>
              <linearGradient
                id="paint0_linear_105_460"
                x1="27.5"
                x2="69.942"
                y1="59.5"
                y2="168.136"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#341358"></stop>
                <stop offset="1" stopColor="#341358"></stop>
              </linearGradient>
            </defs>
          </svg>
        </div>

        {/* Background text */}
        <div className="absolute top-1/2 overflow-hidden left-1/2 transform -translate-x-1/2 -translate-y-1/2 md:mt-5 mt-0 z-10">
          <MarqueeSlider>
            <h1 className="text-[180px] md:text-[300px] text-shadow uppercase font-bold text-white opacity-10 leading-none tracking-tighter">
              PromptArena
            </h1>
          </MarqueeSlider>
        </div>

        {/* Left side Edge - Robot Image */}
        <div className="z-20 hidden md:block flex-1">
          <img
            src={purpleRobotRight}
            alt="Purple Robot"
            className="w-[300px] md:w-[600px] scale-150 h-[200px] md:h-[400px] object-contain"
          />
        </div>

        {/* Right side - Content */}
        <div className="z-20 flex-1 text-center md:text-right space-y-4 md:space-y-8 p-4">
          <div className="space-y-2">
            <h2 className="text-lg md:text-3xl tracking-widest font-jetbrains-mono text-shadow font-semibold">
              <span className="text-purple-400 uppercase">Prompt</span>
              <span className="text-white uppercase">arena</span>
            </h2>

            <h3 className="inline-flex font-share-tech-mono tracking-tighter animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text h1 leading-tight text-transparent">
              Join To Our
              <br /> Community
            </h3>
          </div>

          {/* Social links */}
          <div className="flex justify-center md:justify-end items-center gap-4">
            <button className="w-10 h-10 md:w-12 md:h-12 bg-[#2C2C2C] rounded-xl flex items-center justify-center hover:bg-[#3C3C3C] transition-colors">
              <Discord className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-[#2C2C2C] rounded-xl flex items-center justify-center hover:bg-[#3C3C3C] transition-colors">
              <Twitter className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </button>
            <button className="w-10 h-10 md:w-12 md:h-12 bg-[#2C2C2C] rounded-xl flex items-center justify-center hover:bg-[#3C3C3C] transition-colors">
              <Youtube className="h-5 w-5 md:h-6 md:w-6 text-white" />
            </button>
            <button
              onClick={handleDiscordClick}
              disabled={isLoading}
              className="inline-flex h-10 text-sm md:text-base md:h-11 items-center justify-center rounded-full border border-gray-800 bg-gradient-to-t from-[#8678f9] from-0% to-[#909ed4] px-4 md:px-6 font-medium text-neutral-100 text-shadow transition-colors focus:outline-none focus:ring-2 focus:ring-[#9D5CFF] duration-slow focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isLoading ? (
                <span>
                  <Loader2 className="h-5 w-5 md:h-6 md:w-6 animate-spin text-white" />
                </span>
              ) : (
                'Join Community'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterContact;

// import React from 'react';
// import { DiscIcon as Discord, Twitter, Youtube } from 'lucide-react';
// import MarqueeSlider from '../explore/MarqueeSlider';
// import { purpleRobotRight } from '../../assets/img/promptpage';

// const NewsLetterContact = () => {
//   return (
//     <div className="bg-[#341358] flex items-center justify-center p-4 md:p-8">
//       <div className="w-full h-full bg-[#000000] rounded-[40px] overflow-hidden relative flex flex-col md:flex-row items-center justify-between md:pr-16">
//         {/* Wave pattern */}
//         <div className="absolute top-0 hidden md:block right-1/2 transform translate-x-1/2 rotate-180 z-0">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="200"
//             height="200"
//             fill="none"
//             viewBox="0 0 200 50"
//           >
//             <path
//               fill="url(#paint0_linear_105_460)"
//               fillRule="evenodd"
//               d="M200 150c0-55.228-44.772-100-100-100S0 94.772 0 150h200Z"
//               clipRule="evenodd"
//             ></path>
//             <defs>
//               <linearGradient
//                 id="paint0_linear_105_460"
//                 x1="27.5"
//                 x2="69.942"
//                 y1="59.5"
//                 y2="168.136"
//                 gradientUnits="userSpaceOnUse"
//               >
//                 <stop stopColor="#341358"></stop>
//                 <stop offset="1" stopColor="#341358"></stop>
//               </linearGradient>
//             </defs>
//           </svg>
//         </div>

//         {/* Background text */}
//         <div className="absolute top-1/2 overflow-hidden left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-5 z-10">
//           <MarqueeSlider>
//             <h1 className="text-[180px] md:text-[300px] text-shadow uppercase font-bold text-white opacity-10 leading-none tracking-tighter">
//               PromptArena
//             </h1>
//           </MarqueeSlider>
//         </div>

//         {/* Left side Edge - Robot Image */}
//         <div className="z-20 hidden md:block flex-1">
//           <img
//             src={purpleRobotRight}
//             alt="Purple Robot"
//             className="w-[300px] md:w-[600px] scale-150 h-[200px] md:h-[400px] object-contain"
//           />
//         </div>

//         {/* Right side - Content */}
//         <div className="z-20 flex-1 text-center md:text-right space-y-4 md:space-y-8 p-4">
//           <div className="space-y-2">
//             <h2 className="text-lg md:text-3xl tracking-widest font-jetbrains-mono text-shadow font-semibold">
//               <span className="text-purple-400 uppercase">Prompt</span>
//               <span className="text-white uppercase">arena</span>
//             </h2>

//             <h3 className="inline-flex animate-text-gradient bg-gradient-to-r from-[#b2a8fd] via-[#8678f9] to-[#c7d2fe] bg-[200%_auto] bg-clip-text h1 leading-tight text-transparent">
//               Join To Our
//               <br /> Community
//             </h3>
//           </div>

//           {/* Social links */}
//           <div className="flex justify-center md:justify-end items-center gap-4">
//             <button className="w-10 h-10 md:w-12 md:h-12 bg-[#2C2C2C] rounded-xl flex items-center justify-center hover:bg-[#3C3C3C] transition-colors">
//               <Discord className="h-5 w-5 md:h-6 md:w-6 text-white" />
//             </button>
//             <button className="w-10 h-10 md:w-12 md:h-12 bg-[#2C2C2C] rounded-xl flex items-center justify-center hover:bg-[#3C3C3C] transition-colors">
//               <Twitter className="h-5 w-5 md:h-6 md:w-6 text-white" />
//             </button>
//             <button className="w-10 h-10 md:w-12 md:h-12 bg-[#2C2C2C] rounded-xl flex items-center justify-center hover:bg-[#3C3C3C] transition-colors">
//               <Youtube className="h-5 w-5 md:h-6 md:w-6 text-white" />
//             </button>
//             <button className="inline-flex h-10 text-sm md:text-base md:h-11 items-center justify-center rounded-full border border-gray-800 bg-gradient-to-t from-[#8678f9] from-0% to-[#909ed4] px-4 md:px-6 font-medium text-neutral-100 text-shadow transition-colors focus:outline-none focus:ring-2 focus:ring-[#9D5CFF] duration-slow focus:ring-offset-2 focus:ring-offset-gray-900 disabled:cursor-not-allowed disabled:opacity-50">
//               Join discord
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default NewsLetterContact;
