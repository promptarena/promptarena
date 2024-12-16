import React from 'react';
import { motion } from 'framer-motion';
import {
  Bell,
  MessageCircle,
  User,
  Settings,
  Telescope,
  LayoutDashboard,
  Earth,
  Contact,
} from 'lucide-react';
import FollowButton from './FollowButton';
import { Link, useNavigate } from 'react-router-dom';
import { BorderBeam } from '../framer-motion/ui/BorderBeam';
import { BorderTrail } from '../framer-motion/animations/BorderTrail';
import LottieAnimation from '../../assets/lottieFiles/LottieAnimation';
import { metaverse } from '../../assets/lottieFiles';
import OptimizedImage from '../base/OptimizedImage';

const ProfileHeader = ({ user, isAuthenticated, authUser }) => {
  console.log('user from ProfileHeader: ', user);

  const navigate = useNavigate();

  const sideBarItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      link: '/profile/dashboard',
    },
    {
      icon: Contact,
      label: 'Contact',
      link: '/contact',
    },
    {
      icon: Earth,
      label: 'Explore',
      link: '/explore',
    },
    {
      icon: Settings,
      label: 'Settings',
      link: '/profile/edit',
    },
  ];

  return (
    <>
      {/* CSS Styles */}
      <div className="pb-10 text-white overflow-hidden relative">
        {/* Background stars */}
        <div className="absolute inset-0 z-[0]">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
              }}
            />
          ))}
        </div>

        <div className="container relative mx-auto px-4 py-8 flex flex-wrap items-start gap-4 md:gap-8 overflow-hidden z-10">
          {/* Main circular profile image with interactive border */}
          <div className="relative p-1 rounded-full mx-auto md:mx-0">
            <BorderTrail
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
              size={1000}
              style={{
                background:
                  'linear-gradient(to right, #8A2BE2, #00FFFF), radial-gradient(ellipse at center, #8A2BE2 0%, #00FFFF 100%)',
              }}
            />
            <div className="relative p-1 rounded-full">
              <BorderTrail
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                size={500}
                color="rgba(255, 255, 255, 0.5)"
                style={{ backgroundColor: '#00FFFF' }}
              />
              <div className="relative w-[70vw] h-[70vw] max-w-[400px] max-h-[400px] mx-auto">
                <BorderBeam
                  colorFrom="#ffffff"
                  size={2000}
                  borderWidth={2}
                  className="rounded-full shadow-glow-primary"
                  duration={22}
                  delay={18}
                />
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      'conic-gradient(from 0deg, transparent 0deg 340deg, #00FFFF 340deg 360deg)',
                  }}
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: 'linear',
                  }}
                />
                <motion.div
                  className="absolute inset-2 rounded-full overflow-hidden"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {/* <img
                    src={user.profileImage || 'https://placehold.co/400x400'}
                    alt={user.name || user.username || 'Guest'}
                    className="w-full h-full object-cover"
                  /> */}
                  <OptimizedImage
                    src={user.profileImage || 'https://placehold.co/400x400'}
                    alt={user.name || user.username || 'Guest'}
                    className="w-full h-full object-cover"
                    transformations={{
                      q: 'auto', // Automatic quality
                      w: 400, // Width (matching class 'w-48')
                      h: 400, // Height (matching class 'h-48')
                      c: 'fill', // Fill cropping
                      g: 'auto', // Focus on the subject
                      f: 'auto',
                    }}
                  />
                </motion.div>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="flex-1">
            {/* Header with small profile picture */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full overflow-hidden flex-center mx-auto md:mx-0">
                <LottieAnimation
                  style={{
                    dropShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
                  }}
                  loop
                  autoplay
                  animationData={metaverse}
                />
              </div>
              <div className="border-l-4 pl-4">
                <h2 className="text-gray-400 font-syncopate text-sm md:text-xs">
                  {user.name || user.username}
                </h2>
                <h3 className="text-blue-400 uppercase font-syncopate text-[.75rem] md:text-[.55rem]">
                  {user.role === 'buyer' || 'seller' ? 'CreatoR' : 'Guest'}
                </h3>
              </div>
            </div>

            {/* Main profile content */}
            <h1 className="h2 mb-6 font-syncopate text-center md:text-left">
              {user.name || user.username || 'Guest'}'s <br /> Profile
            </h1>

            <p className="text-gray-400 mb-5 font-share-tech-mono leading-relaxed max-w-2xl">
              {user.name || user.username || 'Guest'} is a prolific prompt
              engineer with a passion for brainstorming ideas. Discover their
              unique prompts and unlock your own creative potential.
            </p>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              {!isAuthenticated && authUser === null && (
                <button className="px-6 py-2 font-syncopate text-[.55rem] md:text-xs tracking-wider text-shadow bg-purple-500 text-white rounded-full hover:bg-purple-600">
                  <Link to={`/login`}>Follow {user.username}!</Link>
                </button>
              )}
              <FollowButton
                followTxt={`Follow ${user.username}!`}
                UnfollowTxt={`Unfollow ${user.username}!`}
                userId={user._id}
                followingStyles="bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
                unfollowingStyles="bg-purple-500 text-white rounded-full hover:bg-purple-600"
                mainStyles="px-6 py-2 font-syncopate text-[.55rem] md:text-xs tracking-wider text-shadow"
              />
              <button className="px-6 py-2 font-syncopate text-[.55rem] md:text-xs tracking-wider border border-purple-400 text-purple-400 rounded-full hover:bg-purple-400/10 transition-colors">
                <a href="#details" title={`Know More About ${user.username}!`}>
                  Know More About {user.username}?
                </a>
              </button>
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex flex-col gap-6">
            {sideBarItems.map((item, index) => (
              <motion.div
                key={index}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.1 }}
                onClick={() => navigate(item.link)}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-900/30 flex items-center justify-center cursor-pointer group"
              >
                <item.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      ;
    </>
  );
};

export default ProfileHeader;

// import React from 'react';
// import { motion } from 'framer-motion';
// import {
//   Bell,
//   MessageCircle,
//   User,
//   Settings,
//   Telescope,
//   LayoutDashboard,
//   Earth,
//   Contact,
// } from 'lucide-react';
// import FollowButton from './FollowButton';
// import { Link, useNavigate } from 'react-router-dom';
// import { BorderBeam } from '../framer-motion/ui/BorderBeam';
// import { BorderTrail } from '../framer-motion/animations/BorderTrail';
// import LottieAnimation from '../../assets/lottieFiles/LottieAnimation';
// import { metaverse } from '../../assets/lottieFiles';

// const ProfileHeader = ({ user, isAuthenticated, authUser }) => {
//   console.log('user from ProfileHeader: ', user);

//   const navigate = useNavigate();

//   const sideBarItems = [
//     {
//       icon: LayoutDashboard,
//       label: 'Dashboard',
//       link: '/profile/dashboard',
//     },
//     {
//       icon: Contact,
//       label: 'Contact',
//       link: '/contact',
//     },
//     {
//       icon: Earth,
//       label: 'Explore',
//       link: '/explore',
//     },
//     {
//       icon: Settings,
//       label: 'Settings',
//       link: '/profile/settings',
//     },
//   ];

//   return (
//     <>
//       {/* CSS Styles */}

//       <div className="pb-10 text-white overflow-hidden relative">
//         {/* Background stars */}
//         <div className="absolute inset-0 z-[0]">
//           {[...Array(50)].map((_, i) => (
//             <div
//               key={i}
//               className="absolute w-1 h-1 bg-blue-400/20 rounded-full"
//               style={{
//                 top: `${Math.random() * 100}%`,
//                 left: `${Math.random() * 100}%`,
//                 animation: `twinkle ${Math.random() * 5 + 3}s infinite`,
//               }}
//             />
//           ))}
//         </div>

//         <div className="container relative mx-auto px-4 py-8 flex items-start md:gap-8 gap-0 overflow-hidden z-10">
//           {/* Main circular profile image with interactive border */}
//           <div className="relative p-1 rounded-full">
//             <BorderTrail
//               transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
//               size={1000}
//               style={{
//                 background:
//                   'linear-gradient(to right, #8A2BE2, #00FFFF), radial-gradient(ellipse at center, #8A2BE2 0%, #00FFFF 100%)',
//               }}
//             />
//             <div className="relative p-1 rounded-full">
//               <BorderTrail
//                 transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
//                 size={500}
//                 color="rgba(255, 255, 255, 0.5)"
//                 style={{ backgroundColor: '#00FFFF' }}
//               />
//               <div className="relative w-[400px] h-[400px]">
//                 <BorderBeam
//                   colorFrom="#ffffff"
//                   size={2000}
//                   borderWidth={2}
//                   className={'rounded-full shadow-glow-primary'}
//                   duration={22}
//                   delay={18}
//                 />
//                 <motion.div
//                   className="absolute inset-0 rounded-full"
//                   style={{
//                     background:
//                       'conic-gradient(from 0deg, transparent 0deg 340deg, #00FFFF 340deg 360deg)',
//                   }}
//                   animate={{ rotate: 360 }}
//                   transition={{
//                     duration: 10,
//                     repeat: Infinity,
//                     ease: 'linear',
//                   }}
//                 />

//                 <motion.div
//                   className="absolute inset-2 rounded-full overflow-hidden"
//                   initial={{ scale: 0.9, opacity: 0 }}
//                   animate={{ scale: 1, opacity: 1 }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   <img
//                     src={user.profileImage || 'https://placehold.co/400x400'}
//                     alt={user.name || user.username || 'Guest'}
//                     className="w-full h-full object-cover"
//                   />
//                 </motion.div>
//               </div>
//             </div>
//           </div>

//           {/* Content section */}
//           <div className="flex-1">
//             {/* Header with small profile picture */}
//             <div className="flex items-center gap-4 mb-0">
//               <div className="w-36 h-36 rounded-full overflow-hidden flex-center">
//                 {/* <img
//                   src="https://placehold.co/100x100"
//                   alt="Small profile"
//                   className="w-full h-full object-cover"
//                 /> */}
//                 <LottieAnimation
//                   style={{
//                     dropShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
//                   }}
//                   loop={true}
//                   autoplay={true}
//                   animationData={metaverse}
//                 />
//               </div>
//               <div className="border-l-4 pl-4">
//                 <h2 className="text-gray-400 font-syncopate text-xs">
//                   {user.name || user.username}
//                 </h2>
//                 <h3 className="text-blue-400 uppercase font-syncopate text-[.55rem]">
//                   {(user.role && user.role === 'buyer') || 'seller'
//                     ? 'CreatoR'
//                     : 'Guest'}
//                 </h3>
//               </div>
//             </div>

//             {/* Main profile content */}
//             <h1 className="h2 mb-6 font-syncopate">
//               {user.name || user.username || 'Guest'}'s <br /> Profile
//             </h1>

//             <p className="text-gray-400 mb-5 font-share-tech-mono leading-relaxed max-w-2xl">
//               Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed vitae
//               justo vitae massa tincidunt aliquam. Donec auctor, nunc id aliquam
//               tincidunt, nisl nunc tincidunt nunc, vitae aliquam nunc nunc vitae
//               nunc. Sed non neque eget augue tincidunt tincidunt.
//             </p>

//             {/* Action buttons */}
//             <div className="flex gap-4">
//               {!isAuthenticated && authUser === null && (
//                 <button className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-blue-600">
//                   <Link to={`/login`}>Follow {user.username}!</Link>
//                 </button>
//               )}
//               {/* <button className="px-6 py-2 bg-purple-500 text-white rounded-full hover:bg-blue-600">
//               {`Follow ${user.username}!`}
//             </button> */}
//               <FollowButton
//                 followTxt={`Follow ${user.username}!`}
//                 UnfollowTxt={`Unfollow ${user.username}!`}
//                 userId={user._id}
//                 followingStyles={
//                   ' bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors'
//                 }
//                 unfollowingStyles={
//                   'bg-purple-500 text-white rounded-full hover:bg-purple-600'
//                 }
//                 mainStyles={
//                   'px-6 py-2 font-syncopate text-[.55rem] md:text-xs text-xs text-shadow tracking-wider'
//                 }
//               />
//               <button className="px-6 py-2 font-syncopate text-[.55rem] md:text-xs tracking-wider border border-purple-400 text-purple-400 rounded-full hover:bg-purple-400/10 transition-colors">
//                 <a
//                   href={`#details`}
//                   title={`Know More About ${user.username}!`}
//                 >
//                   Know More About {user.username}!?
//                 </a>
//               </button>
//             </div>
//           </div>

//           {/* Right side icons */}
//           <div className="flex flex-col gap-6">
//             {sideBarItems.map((item, index) => (
//               <motion.div
//                 key={index}
//                 whileTap={{ scale: 0.9 }}
//                 whileHover={{ scale: 1.1 }}
//                 onClick={() => navigate(item.link)}
//                 className="w-12 h-12 rounded-full bg-blue-900/30 flex items-center justify-center cursor-pointer group"
//               >
//                 <item.icon className="w-5 h-5 text-blue-400 group-hover:text-blue-300" />
//               </motion.div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default ProfileHeader;
