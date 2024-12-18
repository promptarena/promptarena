// import React, { useEffect } from 'react';
// import { motion } from 'framer-motion';
// import {
//   Users,
//   Eye,
//   MessageSquare,
//   Activity,
//   Star,
//   Award,
//   CheckCircle,
//   Mail,
//   Phone,
//   CalendarClock,
//   Globe,
//   ShieldCheck,
//   Calendar,
//   User,
//   CalendarCheck,
// } from 'lucide-react';
// import BackToHome from '../base/BackToHome';
// import LoadingSpinner from '../animations/loader/LoadingSpinner';
// import { useUserProfileStore } from '../../store/userProfileStore';
// import { useAuthStore } from '../../store/authStore';
// import { Link, useParams } from 'react-router-dom';
// import FollowButton from './FollowButton';
// import { formatDate } from '../../utils/date';
// import { BorderBeam } from '../framer-motion/ui/BorderBeam';
// import ProfileHeader from './ProfileHeader';

// export default function UserProfilez({
//   fetchUserProfileByUsername,
//   user,
//   isLoading,
//   error,
//   followers,
//   following,
//   isLoadingFollowers,
//   isLoadingFollowing,
//   fetchFollowers,
//   fetchFollowing,
//   authUser,
//   isAuthenticated,
// }) {
//   return (
//     <>
//       <style type="text/css">
//         {`
//           @keyframes twinkle {
//             0% { opacity: 0; }
//             50% { opacity: 1; }
//             100% { opacity: 0; }
//           }

//         `}
//       </style>
//       <div className="bg-gradient-to-br relative from-black via-purple-900/40 to-black">
//         <div className="absolute inset-0 bg-svg opacity-25 z-0" />
//         <ProfileHeader
//           key={user._id}
//           isAuthenticated={isAuthenticated}
//           authUser={authUser}
//           user={user}
//         />
//       </div>
//       <>
//         <div
//           id="details"
//           className="relative min-h-screen container mx-auto flex items-center justify-center bg-gradient-to-br from-black via-purple-900/40 to-black text-white"
//         >
//           {/* Background Enhancements */}
//           <div className="absolute inset-0 bg-svg rotate-180 opacity-25 z-0" />

//           {/* Main Profile Card */}
//           <motion.div
//             initial={{ opacity: 0, scale: 0.95 }}
//             animate={{ opacity: 1, scale: 1, y: -50 }}
//             transition={{ duration: 0.8 }}
//             className="relative md:w-[90%] lg:w-[70%]  overflow-hidden w-full mx-auto bg-[#2b2d3a]/80 backdrop-blur-lg rounded-3xl p-5 sm:p-12 shadow-2xl"
//           >
//             {/* Profile Header */}
//             <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-8 md:space-y-0">
//               {/* Profile Picture and User Information */}
//               <div className="flex items-center space-x-4 md:space-x-8">
//                 <div className="relative md:w-36 md:h-36 w-28 h-28">
//                   <motion.div
//                     initial={{ scale: 0.8, opacity: 0 }}
//                     animate={{ scale: 1, opacity: 1 }}
//                     transition={{ delay: 0.3, duration: 0.5 }}
//                     className="absolute inset-0 rounded-full animate-glow bg-[#9657e993] opacity-50 blur-lg"
//                   />

//                   {user.profileImage && (
//                     <img
//                       src={user.profileImage}
//                       alt={user.username}
//                       className="rounded-full ring-1 ring-neutral-200 w-full h-full object-cover relative z-10"
//                     />
//                   )}
//                 </div>
//                 <div>
//                   <h1 className="md:h3 h5 text-shadow font-bold">
//                     {user.name}
//                   </h1>
//                   <p className="text-[#8b8b8b] text-md">
//                     <Link to={`/user/${user.username}`}>@{user.username}</Link>
//                   </p>
//                   <p className="text-sm max-w-xs mt-3 leading-relaxed">
//                     {user.bio ? user.bio : 'No bio provided.'}
//                   </p>
//                   {user.role === 'admin' && (
//                     <div className="my-4">
//                       <span className="text-gray-100 md:text-base text-xs ring-1 ring-gray-100 px-4 py-2 rounded font-extrabold">
//                         You are an {user.role === 'admin' && 'Admin'}
//                       </span>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* Profile Stats and Follow Button */}
//               <div className="flex flex-col items-center md:items-end space-y-3">
//                 {isAuthenticated && (
//                   <motion.button
//                     whileHover={{ scale: 1.05 }}
//                     className="bg-[#3d3f4b] text-[#8b8b8b] px-6 py-2 rounded-full text-sm"
//                   >
//                     <Link to={`/profile/edit`}>Edit Profile</Link>
//                   </motion.button>
//                 )}
//                 <div className="bg-[#2b2d3a] w-48 h-48 rounded-xl flex flex-col items-center justify-center border border-[#3d3f4b] shadow-lg">
//                   <motion.h2
//                     className="text-5xl font-bold text-shadow "
//                     initial={{ scale: 0 }}
//                     animate={{ scale: 1 }}
//                     transition={{ delay: 0.3 }}
//                   >
//                     {user.followers.length}
//                   </motion.h2>
//                   <p className="text-[#8b8b8b] text-sm">FOLLOWERS</p>
//                   <motion.button
//                     whileHover={{ scale: 1.1 }}
//                     // className="bg-[#00ffff] text-black font-bold py-2 px-6 rounded-full text-sm mt-4"
//                   >
//                     {/* FOLLOW */}
//                     <FollowButton
//                       key={user._id}
//                       userId={user._id}
//                       followingStyles=" bg-[#3d3f4b] text-white "
//                       unfollowingStyles="bg-[#00ffff] text-black "
//                       mainStyles={
//                         'font-bold py-2 px-6 rounded-full text-sm mt-4'
//                       }
//                     />
//                   </motion.button>
//                 </div>
//               </div>
//             </div>

//             {/* Additional Information Section */}
//             <h2 className="text-xl font-semibold mb-4">
//               Additional Information
//             </h2>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
//               {' '}
//               {/* Bento Grid */}
//               {/* Row 1 */}
//               <motion.div
//                 className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
//                 whileHover={{ scale: 1.1 }}
//               >
//                 <Mail size={32} className="text-white mb-2" />
//                 <p className="text-sm font-medium text-white">{user.email}</p>
//               </motion.div>
//               <motion.div
//                 className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
//                 whileHover={{ scale: 1.1 }}
//               >
//                 <CalendarCheck size={32} className="text-white mb-2" />
//                 <p className="text-sm font-medium text-white">
//                   {formatDate(user.lastLogin)}
//                 </p>
//               </motion.div>
//               {user.phoneNumber ? (
//                 <motion.div
//                   className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
//                   whileHover={{ scale: 1.1 }}
//                 >
//                   <Phone size={32} className="text-white mb-2" />
//                   <p className="text-sm font-medium text-white">
//                     {user.phoneNumber}
//                   </p>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
//                   whileHover={{ scale: 1.1 }}
//                 >
//                   <Calendar size={32} className="text-white mb-2" />
//                   <p className="text-sm font-medium text-white">
//                     Joined: {formatDate(user.joinedAt)}
//                   </p>
//                 </motion.div>
//               )}
//               {/* Row 2 (Conditional Rendering based on data) */}
//               {user.role && (
//                 <motion.div
//                   className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
//                   whileHover={{ scale: 1.1 }}
//                 >
//                   <ShieldCheck size={32} className="text-white mb-2" />
//                   <p className="text-sm font-medium text-white">
//                     Role: {user.role}
//                   </p>
//                 </motion.div>
//               )}
//               <motion.div
//                 className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
//                 whileHover={{ scale: 1.1 }}
//               >
//                 <ShieldCheck size={32} className="text-white mb-2" />
//                 <p className="text-sm font-medium text-white">
//                   {user.isVerified
//                     ? 'Account Verified'
//                     : 'Account Not Verified'}
//                 </p>
//               </motion.div>
//               {user.following.length > 0 && (
//                 <motion.div
//                   className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
//                   whileHover={{ scale: 1.1 }}
//                 >
//                   <Globe size={32} className="text-white mb-2" />
//                   <p className="text-sm font-medium text-white">
//                     Following: {user.following.length}
//                   </p>
//                 </motion.div>
//               )}
//               {/* Add more sections as needed */}
//             </div>

//             {/* Bio and Following Sections */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
//               {/* Bio Section */}
//               {user.bio ? (
//                 <motion.div
//                   whileHover={{ y: -5 }}
//                   className="bg-[#1c1d26] rounded-xl p-6 shadow-lg"
//                 >
//                   <h3 className="text-lg font-bold mb-4">Bio</h3>
//                   <p className="text-[#8b8b8b] text-sm leading-relaxed mb-4">
//                     {user.bio}
//                   </p>
//                 </motion.div>
//               ) : (
//                 <motion.div
//                   whileHover={{ y: -5 }}
//                   className="bg-[#1c1d26] rounded-xl p-6 shadow-lg"
//                 >
//                   <h3 className="text-lg font-bold mb-4">Bio</h3>
//                   <p className="text-[#8b8b8b] text-sm leading-relaxed mb-4">
//                     No bio available
//                   </p>
//                 </motion.div>
//               )}

//               {/* Following Section */}
//               <motion.div
//                 whileHover={{ y: -5 }}
//                 className="bg-[#1c1d26] rounded-xl p-6 shadow-lg"
//               >
//                 <h3 className="text-lg font-bold mb-4">
//                   Following (
//                   {user.following.length === 0 ? '' : user.following.length})
//                 </h3>
//                 <div className="space-y-4">
//                   {isLoadingFollowing ? (
//                     // Skeleton loader when data is still loading
//                     <div>
//                       {[...Array(5)].map((_, index) => (
//                         <div
//                           key={index}
//                           className="flex items-center ring-1 justify-between p-3 animate-pulse"
//                         >
//                           <div className="flex items-center space-x-3">
//                             <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center"></div>
//                             <span className="h-4 w-24 bg-gray-300 rounded"></span>
//                           </div>
//                           <span className="h-4 w-16 bg-gray-300 rounded"></span>
//                         </div>
//                       ))}
//                     </div>
//                   ) : following.length === 0 ? (
//                     <div className="text-center text-white">No Followers</div>
//                   ) : (
//                     following.map(followedUser => (
//                       <div
//                         key={followedUser._id}
//                         title={`Click to view ${followedUser.username}'s profile`}
//                         className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#1F2937] p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-full sm:max-w-full max-h-[350px] sm:max-h-[300px] overflow-hidden"
//                       >
//                         <div className="flex items-center space-x-2 mb-2 sm:mb-0 w-full sm:w-auto">
//                           {/* Profile Image */}
//                           <div className="h-16 w-16 rounded overflow-hidden">
//                             <img
//                               src={followedUser.profileImage}
//                               alt={followedUser.username}
//                               className="w-full h-full object-cover"
//                             />
//                           </div>

//                           {/* Username, Bio, and Username */}
//                           <div className="flex space-y-[0.5px] flex-col w-full sm:w-auto">
//                             <p className="text-base text-shadow font-semibold text-white">
//                               {followedUser.username &&
//                               followedUser.username.length > 15
//                                 ? followedUser.username.slice(0, 15) + '...'
//                                 : followedUser.username}
//                             </p>
//                             {followedUser.bio ? (
//                               <p className="text-xs text-[#9CA3AF]">
//                                 {followedUser.bio.length > 15
//                                   ? followedUser.bio.slice(0, 15) + '...'
//                                   : followedUser.bio}
//                               </p>
//                             ) : (
//                               <p className="text-xs text-[#9CA3AF]">
//                                 No bio available
//                               </p>
//                             )}

//                             {/* Username */}
//                             <p className="text-xs text-[#9CA3AF]">
//                               @{followedUser.username}
//                             </p>
//                           </div>
//                         </div>

//                         {/* View Profile Button */}
//                         <div className="flex flex-col justify-between items-end w-full sm:w-auto">
//                           <button className="py-1 px-2 rounded-lg text-xs font-medium transition-all duration-200 bg-[#7624C2] text-white hover:bg-[#6A23A1]">
//                             <Link
//                               to={`/profile/username/${followedUser.username}`}
//                               className="w-full text-center"
//                             >
//                               View Profile
//                             </Link>
//                           </button>
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </motion.div>
//             </div>

//             {/* Followers Section */}
//             <div className="bg-[#1c1d26] rounded-xl p-6 mb-10 shadow-lg">
//               <h3 className="text-lg font-bold mb-4">Followers</h3>
//               <div className="space-y-4">
//                 {isLoadingFollowers ? (
//                   // Skeleton loader when data is still loading
//                   <div>
//                     {[...Array(5)].map((_, index) => (
//                       <div
//                         key={index}
//                         className="flex w-full items-center ring-1 justify-between p-3 animate-pulse"
//                       >
//                         <div className="flex items-center space-x-3">
//                           <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center"></div>
//                           <span className="h-4 w-24 bg-gray-300 rounded"></span>
//                         </div>
//                         <span className="h-4 w-16 bg-gray-300 rounded"></span>
//                       </div>
//                     ))}
//                   </div>
//                 ) : followers.length === 0 ? (
//                   <div className="text-center text-white">No Followers</div>
//                 ) : (
//                   followers.map(follower => (
//                     <div
//                       key={follower._id}
//                       title={`Click to view ${follower.username}'s profile`}
//                       className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#1F2937] p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-full sm:max-w-full max-h-[350px] sm:max-h-[300px] overflow-hidden"
//                     >
//                       <div className="flex items-center space-x-2 mb-2 sm:mb-0 w-full sm:w-auto">
//                         {/* Profile Image */}
//                         <div className="h-16 w-16 rounded overflow-hidden">
//                           <img
//                             src={follower.profileImage}
//                             alt={follower.username}
//                             className="w-full aspect-square h-full object-cover"
//                           />
//                         </div>

//                         {/* Username, Bio, and Username */}
//                         <div className="flex space-y-[0.5px] flex-col w-full sm:w-auto">
//                           <p className="text-base text-shadow font-semibold text-white">
//                             {follower.username && follower.username.length > 15
//                               ? follower.username.slice(0, 15) + '...'
//                               : follower.username}
//                           </p>

//                           {/* Bio */}
//                           {follower.bio ? (
//                             <p className="text-xs text-[#9CA3AF]">
//                               {follower.bio.length > 15
//                                 ? follower.bio.slice(0, 15) + '...'
//                                 : follower.bio}
//                             </p>
//                           ) : (
//                             <p className="text-xs text-[#9CA3AF]">
//                               No bio available
//                             </p>
//                           )}

//                           {/* Username */}
//                           <p className="text-xs text-[#9CA3AF]">
//                             @{follower.username}
//                           </p>
//                         </div>
//                       </div>

//                       {/* View Profile Button */}
//                       <div className="flex flex-col justify-between items-end w-full sm:w-auto">
//                         <button className="py-1 px-2 rounded-lg text-xs font-medium transition-all duration-200 bg-[#7624C2] text-white hover:bg-[#6A23A1]">
//                           <a
//                             href={`/profile/username/${follower.username}`}
//                             className="w-full text-center"
//                           >
//                             View Profile
//                           </a>
//                         </button>
//                       </div>
//                     </div>
//                   ))
//                 )}
//               </div>
//             </div>
//           </motion.div>
//         </div>
//       </>
//     </>
//   );
// }

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  Eye,
  MessageSquare,
  Activity,
  Star,
  Award,
  CheckCircle,
  Mail,
  Phone,
  CalendarClock,
  Globe,
  ShieldCheck,
  Calendar,
  User,
  CalendarCheck,
} from 'lucide-react';
import BackToHome from '../base/BackToHome';
import LoadingSpinner from '../animations/loader/LoadingSpinner';
import { useUserProfileStore } from '../../store/userProfileStore';
import { useAuthStore } from '../../store/authStore';
import { Link, useParams } from 'react-router-dom';
import FollowButton from './FollowButton';
import { formatDate } from '../../utils/date';
import { BorderBeam } from '../framer-motion/ui/BorderBeam';
import ProfileHeader from './ProfileHeader';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';
import OptimizedImage from '../base/OptimizedImage';
import SEO from '../seo/SEO';
import { getCurrentSiteUrl } from '../../utils/getCurrentSiteUrl';

export default function UserProfilez({ usernameFromProfilePage }) {
  let { username } = useParams();

  // If username from URL is not present, use usernameFromProfilePage
  if (!username) {
    username = usernameFromProfilePage;
  }

  const {
    fetchUserProfileByUsername,
    user,
    isLoading,
    error,
    followers,
    following,
    isLoadingFollowers,
    isLoadingFollowing,
    fetchFollowers,
    fetchFollowing,
  } = useUserProfileStore();
  const { user: authUser, isAuthenticated } = useAuthStore();
  console.log('authUser: ', authUser);

  useEffect(() => {
    fetchUserProfileByUsername(username);
  }, [username, fetchUserProfileByUsername]);

  // Fetch followers and following only after user object is fetched successfully
  useEffect(() => {
    if (user) {
      fetchFollowers(user._id);
      fetchFollowing(user._id);
    }
  }, [user, fetchFollowers, fetchFollowing]);

  if (isLoading) {
    return (
      <div className="pb-10 text-white overflow-hidden relative">
        {/* Background stars skeleton */}
        <div className="absolute inset-0 z-[0]">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gray-700/20 rounded-full"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </div>

        <div className="container relative mx-auto px-4 py-8 flex flex-wrap items-start gap-4 md:gap-8 overflow-hidden z-10">
          {/* Circular profile skeleton */}
          <div className="relative mx-auto md:mx-0">
            <div className="w-[70vw] h-[70vw] max-w-[400px] max-h-[400px] rounded-full bg-gray-700 animate-pulse mx-auto" />
          </div>

          {/* Content section skeleton */}
          <div className="flex-1">
            {/* Header skeleton */}
            <div className="flex flex-wrap items-center gap-4 mb-4">
              <div className="w-24 h-24 md:w-36 md:h-36 rounded-full bg-gray-700 animate-pulse" />
              <div className="border-l-4 pl-4">
                <div className="w-32 h-4 bg-gray-700 animate-pulse mb-2" />
                <div className="w-20 h-4 bg-gray-700 animate-pulse" />
              </div>
            </div>

            {/* Profile title skeleton */}
            <div className="h-8 bg-gray-700 animate-pulse w-1/2 mb-6" />

            {/* Paragraph skeleton */}
            <div className="space-y-3 mb-5">
              <div className="h-4 bg-gray-700 animate-pulse w-full" />
              <div className="h-4 bg-gray-700 animate-pulse w-3/4" />
              <div className="h-4 bg-gray-700 animate-pulse w-1/2" />
            </div>

            {/* Buttons skeleton */}
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <div className="px-6 py-2 bg-gray-700 animate-pulse rounded-full w-28 h-8" />
              <div className="px-6 py-2 bg-gray-700 animate-pulse rounded-full w-28 h-8" />
              <div className="px-6 py-2 bg-gray-700 animate-pulse rounded-full w-36 h-8" />
            </div>
          </div>

          {/* Sidebar skeleton */}
          <div className="flex flex-col gap-6">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gray-700 animate-pulse"
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  console.log('user: ', user);
  console.log('followers: ', followers);
  console.log('following: ', following);

  if (!user) {
    return (
      <div className="text-gray-600 h-screen flex-center">
        <div>
          <p>User not found.</p>
          {error && (
            <p>
              <b>Error:</b> {error}
            </p>
          )}
          <i>
            {
              'If you think this is an error, please contact us. Alternatively, you can try searching for the user again.'
            }
          </i>
          <b>
            <BackToHome />
          </b>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`${user.username.slice(0, 1).toUpperCase() + user.username.slice(1)}'s Profile - PromptArena`}
        description={`${user.username} is a ${user.role} on PromptArena.  Explore their ${user.role === 'seller' ? 'AI prompts' : 'saved prompts and activity'}.`}
        keywords={`AI prompts, ${user.username}, PromptArena user, ${user.role}, ${user.role === 'seller' ? 'prompt seller' : 'prompt buyer'}, AI art, AI writing, PromptArena, free AI prompts, AI prompt library, PromptArena team, our mission, contact us, get involved, AI community, about us`}
        url={getCurrentSiteUrl() + `/profile/username/${user.username}`}
        image={user.profileImage}
      />

      <style type="text/css">
        {`
          @keyframes twinkle {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }

        `}
      </style>
      <div className="bg-gradient-to-br relative from-black via-purple-900/40 to-black">
        <div className="absolute inset-0 bg-svg opacity-25 z-0" />
        <ProfileHeader
          key={user._id}
          isAuthenticated={isAuthenticated}
          authUser={authUser}
          user={user}
          // isLoading={isLoading}
        />
      </div>
      <>
        <div className="bg-gradient-to-br from-black via-purple-900/40 to-black text-white">
          <div className="absolute inset-0 bg-svg rotate-180 opacity-25 z-0" />
          <div
            id="details"
            className="relative min-h-screen container mx-auto flex items-center justify-center "
          >
            {/* Background Enhancements */}

            {/* Main Profile Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1, y: -50 }}
              transition={{ duration: 0.8 }}
              className="relative md:w-[90%] lg:w-[70%] overflow-hidden w-full mx-auto bg-[#2b2d3a]/80 backdrop-blur-lg rounded-3xl p-5 sm:p-12 shadow-2xl"
            >
              {/* Profile Header */}
              <div className="flex flex-col md:flex-row justify-between items-center mb-10 space-y-8 md:space-y-0">
                {/* Profile Picture and User Information */}
                <div className="flex items-center space-x-4 md:space-x-8">
                  <div className="relative md:w-36 md:h-36 w-28 h-28">
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="absolute inset-0 rounded-full animate-glow bg-[#9657e993] opacity-50 blur-lg"
                    />

                    {user.profileImage && (
                      <OptimizedImage
                        src={user.profileImage}
                        alt={user.username}
                        className="rounded-full ring-1 ring-neutral-200 w-full h-full object-cover relative z-10"
                        transformations={{
                          f: 'auto', // Automatic format (WebP, AVIF, etc.)
                          q: 'auto', // Automatic quality adjustment
                          g: 'auto', // Auto-focus on the image content (e.g., faces)
                        }}
                      />
                    )}
                    {/* {user.profileImage && (
                    <img
                      src={user.profileImage}
                      alt={user.username}
                      loading="lazy"
                      className="rounded-full ring-1 ring-neutral-200 w-full h-full object-cover relative z-10"
                    />
                  )} */}
                  </div>
                  <div>
                    <h1 className="md:h3 h5 text-shadow font-bold">
                      {user.name}
                    </h1>
                    <p className="text-[#8b8b8b] text-md">
                      <>@{user.username}</>
                    </p>
                    <p className="text-sm max-w-xs mt-3 leading-relaxed">
                      {user.bio ? user.bio : 'No bio provided.'}
                    </p>
                    {user.role === 'admin' && (
                      <div className="my-4">
                        <span className="text-gray-100 md:text-base text-xs ring-1 ring-gray-100 px-4 py-2 rounded font-extrabold">
                          You are an {user.role === 'admin' && 'Admin'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Profile Stats and Follow Button */}
                <div className="flex flex-col items-center md:items-end space-y-3">
                  {/* {user._id === authUser._id && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    className="bg-[#3d3f4b] text-[#8b8b8b] px-6 py-2 rounded-full text-sm"
                  >
                    <Link to={`/profile/edit`}>Edit Profile</Link>
                  </motion.button>
                )} */}
                  <div className="bg-[#2b2d3a] w-48 h-48 rounded-xl flex flex-col items-center justify-center border border-[#3d3f4b] shadow-lg">
                    <motion.h2
                      className="text-5xl font-bold"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      {user.followers.length}
                    </motion.h2>
                    <p className="text-[#8b8b8b] text-sm">FOLLOWERS</p>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      // className="bg-[#00ffff] text-black font-bold py-2 px-6 rounded-full text-sm mt-4"
                    >
                      {/* FOLLOW */}
                      <FollowButton
                        key={user._id}
                        userId={user._id}
                        followingStyles=" bg-[#3d3f4b] text-white "
                        unfollowingStyles="bg-[#00ffff] text-black "
                        mainStyles={
                          'font-bold py-2 px-6 rounded-full text-sm mt-4'
                        }
                      />
                    </motion.button>
                  </div>
                </div>
              </div>

              {/* Additional Information Section */}
              <h2 className="text-xl font-semibold mb-4">
                Additional Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
                {' '}
                {/* Bento Grid */}
                {/* Row 1 */}
                {/* <motion.div
                className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
                whileHover={{ scale: 1.1 }}
              >
                <Mail size={32} className="text-white mb-2" />
                <p className="text-sm font-medium text-white">{user.email}</p>
              </motion.div> */}
                {/* <motion.div
                  className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <CalendarCheck size={32} className="text-white mb-2" />
                  <p className="text-sm font-medium text-white">
                    {formatDate(user.lastLogin)}
                  </p>
                </motion.div> */}
                {/* {user.phoneNumber ? (
                <motion.div
                  className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <Phone size={32} className="text-white mb-2" />
                  <p className="text-sm font-medium text-white">
                    {user.phoneNumber}
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <Calendar size={32} className="text-white mb-2" />
                  <p className="text-sm font-medium text-white">
                    Joined: {formatDate(user.joinedAt)}
                  </p>
                </motion.div>
              )} */}
                <motion.div
                  className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <Calendar size={32} className="text-white mb-2" />
                  <p className="text-sm font-medium text-white">
                    {formatDate(user.joinedAt)}
                  </p>
                </motion.div>
                {/* Row 2 (Conditional Rendering based on data) */}
                {user.role && (
                  <motion.div
                    className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <ShieldCheck size={32} className="text-white mb-2" />
                    <p className="text-sm font-medium text-white">
                      Role: {user.role}
                    </p>
                  </motion.div>
                )}
                <motion.div
                  className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
                  whileHover={{ scale: 1.1 }}
                >
                  <ShieldCheck size={32} className="text-white mb-2" />
                  <p className="text-sm font-medium text-white">
                    {user.isVerified
                      ? 'Account Verified'
                      : 'Account Not Verified'}
                  </p>
                </motion.div>
                {user.following.length > 0 && (
                  <motion.div
                    className="bg-[#3d3f4b] p-4 rounded-lg shadow-lg flex flex-col items-center"
                    whileHover={{ scale: 1.1 }}
                  >
                    <Globe size={32} className="text-white mb-2" />
                    <p className="text-sm font-medium text-white">
                      Following: {user.following.length}
                    </p>
                  </motion.div>
                )}
                {/* Add more sections as needed */}
              </div>

              {/* Bio and Following Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                {/* Bio Section */}
                {user.bio ? (
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-[#1c1d26] rounded-xl p-6 shadow-lg"
                  >
                    <h3 className="text-lg font-bold mb-4">Bio</h3>
                    <p className="text-[#8b8b8b] text-sm leading-relaxed mb-4">
                      {user.bio}
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    whileHover={{ y: -5 }}
                    className="bg-[#1c1d26] rounded-xl p-6 shadow-lg"
                  >
                    <h3 className="text-lg font-bold mb-4">Bio</h3>
                    <p className="text-[#8b8b8b] text-sm leading-relaxed mb-4">
                      No bio available
                    </p>
                  </motion.div>
                )}

                {/* Following Section */}
                <motion.div
                  whileHover={{ y: -5 }}
                  className="bg-[#1c1d26] rounded-xl p-6 shadow-lg"
                >
                  <h3 className="text-lg font-bold mb-4">
                    Following (
                    {user.following.length === 0 ? '' : user.following.length})
                  </h3>
                  <div className="space-y-4">
                    {isLoadingFollowing ? (
                      // Skeleton loader when data is still loading
                      <div>
                        {[...Array(5)].map((_, index) => (
                          <div
                            key={index}
                            className="flex items-center ring-1 justify-between p-3 animate-pulse"
                          >
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center"></div>
                              <span className="h-4 w-24 bg-gray-300 rounded"></span>
                            </div>
                            <span className="h-4 w-16 bg-gray-300 rounded"></span>
                          </div>
                        ))}
                      </div>
                    ) : following.length === 0 ? (
                      <div className="text-center text-white">No Followers</div>
                    ) : (
                      following.map(followedUser => (
                        <div
                          key={followedUser._id}
                          title={`Click to view ${followedUser.username}'s profile`}
                          className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#1F2937] p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-full sm:max-w-full max-h-[350px] sm:max-h-[300px] overflow-hidden"
                        >
                          <div className="flex items-center space-x-2 mb-2 sm:mb-0 w-full sm:w-auto">
                            {/* Profile Image */}
                            <div className="h-16 w-16 rounded overflow-hidden">
                              {/* <img
                              src={followedUser.profileImage}
                              alt={followedUser.username}
                              className="w-full h-full object-cover"
                            /> */}
                              <OptimizedImage
                                src={followedUser.profileImage}
                                alt={followedUser.username}
                                className="w-full h-full object-cover"
                                transformations={{ w: 200, h: 200, c: 'fill' }}
                              />
                            </div>

                            {/* Username, Bio, and Username */}
                            <div className="flex space-y-[0.5px] flex-col w-full sm:w-auto">
                              <p className="text-base text-shadow font-semibold text-white">
                                {followedUser.username &&
                                followedUser.username.length > 15
                                  ? followedUser.username.slice(0, 15) + '...'
                                  : followedUser.username}
                              </p>
                              {followedUser.bio ? (
                                <p className="text-xs text-[#9CA3AF]">
                                  {followedUser.bio.length > 15
                                    ? followedUser.bio.slice(0, 15) + '...'
                                    : followedUser.bio}
                                </p>
                              ) : (
                                <p className="text-xs text-[#9CA3AF]">
                                  No bio available
                                </p>
                              )}

                              {/* Username */}
                              <p className="text-xs text-[#9CA3AF]">
                                @{followedUser.username}
                              </p>
                            </div>
                          </div>

                          {/* View Profile Button */}
                          <div className="flex flex-col justify-between items-end w-full sm:w-auto">
                            <button className="py-1 px-2 rounded-lg text-xs font-medium transition-all duration-200 bg-[#7624C2] text-white hover:bg-[#6A23A1]">
                              <a
                                href={`/profile/username/${followedUser.username}`}
                                className="w-full text-center"
                              >
                                View Profile
                              </a>
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </motion.div>
              </div>

              {/* Followers Section */}
              <div className="bg-[#1c1d26] rounded-xl p-6 mb-10 shadow-lg">
                <h3 className="text-lg font-bold mb-4">Followers</h3>
                <div className="space-y-4">
                  {isLoadingFollowers ? (
                    // Skeleton loader when data is still loading
                    <div>
                      {[...Array(5)].map((_, index) => (
                        <div
                          key={index}
                          className="flex w-full items-center ring-1 justify-between p-3 animate-pulse"
                        >
                          <div className="flex items-center space-x-3">
                            <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center"></div>
                            <span className="h-4 w-24 bg-gray-300 rounded"></span>
                          </div>
                          <span className="h-4 w-16 bg-gray-300 rounded"></span>
                        </div>
                      ))}
                    </div>
                  ) : followers.length === 0 ? (
                    <div className="text-center text-white">No Followers</div>
                  ) : (
                    followers.map(follower => (
                      <div
                        key={follower._id}
                        title={`Click to view ${follower.username}'s profile`}
                        className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-[#1F2937] p-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 w-full max-w-full sm:max-w-full max-h-[350px] sm:max-h-[300px] overflow-hidden"
                      >
                        <div className="flex items-center space-x-2 mb-2 sm:mb-0 w-full sm:w-auto">
                          {/* Profile Image */}
                          <div className="h-16 w-16 rounded overflow-hidden">
                            {/* <img
                            src={follower.profileImage}
                            alt={follower.username}
                            className="w-full aspect-square h-full object-cover"
                          /> */}
                            <OptimizedImage
                              src={follower.profileImage}
                              alt={follower.username}
                              className="w-full aspect-square h-full object-cover"
                              transformations={{ w: 200, h: 200, c: 'fill' }}
                            />
                          </div>

                          {/* Username, Bio, and Username */}
                          <div className="flex space-y-[0.5px] flex-col w-full sm:w-auto">
                            <p className="text-base text-shadow font-semibold text-white">
                              {follower.username &&
                              follower.username.length > 15
                                ? follower.username.slice(0, 15) + '...'
                                : follower.username}
                            </p>

                            {/* Bio */}
                            {follower.bio ? (
                              <p className="text-xs text-[#9CA3AF]">
                                {follower.bio.length > 15
                                  ? follower.bio.slice(0, 15) + '...'
                                  : follower.bio}
                              </p>
                            ) : (
                              <p className="text-xs text-[#9CA3AF]">
                                No bio available
                              </p>
                            )}

                            {/* Username */}
                            <p className="text-xs text-[#9CA3AF]">
                              @{follower.username}
                            </p>
                          </div>
                        </div>

                        {/* View Profile Button */}
                        <div className="flex flex-col justify-between items-end w-full sm:w-auto">
                          <button className="py-1 px-2 rounded-lg text-xs font-medium transition-all duration-200 bg-[#7624C2] text-white hover:bg-[#6A23A1]">
                            <a
                              href={`/profile/username/${follower.username}`}
                              className="w-full text-center"
                            >
                              View Profile
                            </a>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </>
    </>
  );
}
