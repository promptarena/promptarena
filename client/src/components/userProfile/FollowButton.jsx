// // import React, { useState, useEffect } from 'react';
// // import { useAuthStore } from '../../store/authStore';
// // import { useUserProfileStore } from '../../store/userProfileStore';

// // const FollowButton = ({ userId }) => {
// //   const { user: authUser, isAuthenticated } = useAuthStore();
// //   const { followUser, unfollowUser, user: profileUser } = useUserProfileStore();
// //   const [isFollowing, setIsFollowing] = useState(false);

// //   useEffect(() => {
// //     if (authUser && profileUser) {
// //       setIsFollowing(profileUser.followers.includes(authUser._id));
// //     }
// //   }, [authUser, profileUser]);

// //   const handleFollow = () => {
// //     if (!authUser) {
// //       // Redirect to login or show a message
// //       console.error('User not authenticated. Cannot follow.');
// //       return;
// //     }
// //     followUser(userId);
// //   };

// //   const handleUnfollow = () => {
// //     unfollowUser(userId);
// //   };

// //   return (
// //     isAuthenticated && (
// //       <button
// //         onClick={isFollowing ? handleUnfollow : handleFollow}
// //         className={`px-4 py-2 rounded-md ${
// //           isFollowing
// //             ? 'bg-gray-300 hover:bg-gray-400 text-gray-800'
// //             : 'bg-blue-500 hover:bg-blue-700 text-white'
// //         } font-medium transition duration-200`}
// //         disabled={!authUser} // Disable if not logged in
// //       >
// //         {isFollowing ? 'Unfollow' : 'Follow'}
// //       </button>
// //     )
// //   );
// // };

// // export default FollowButton;

// import React, { useState, useEffect } from 'react';
// import { useAuthStore } from '../../store/authStore';
// import { useUserProfileStore } from '../../store/userProfileStore';

// const FollowButton = ({ userId, followingStyles, unfollowingStyles, mainStyles }) => {
//   const { user: authUser, isAuthenticated } = useAuthStore();
//   const { followUser, unfollowUser, user: profileUser } = useUserProfileStore();
//   const [isFollowing, setIsFollowing] = useState(false);

//   useEffect(() => {
//     if (authUser && profileUser) {
//       setIsFollowing(profileUser.followers.includes(authUser._id));
//     }
//   }, [authUser, profileUser]);

//   const handleFollow = () => {
//     if (!authUser) {
//       // Redirect to login or show a message
//       console.error('User not authenticated. Cannot follow.');
//       return;
//     }
//     followUser(userId);
//   };

//   const handleUnfollow = () => {
//     unfollowUser(userId);
//   };

//   return (
//     isAuthenticated &&   (
//       <button
//         onClick={isFollowing ? handleUnfollow : handleFollow}
//         className={` ${
//           isFollowing ? `${followingStyles}` : `${unfollowingStyles}`
//         }transition duration-200 ${mainStyles}`}
//         disabled={!authUser} // Disable if not logged in
//       >
//         {isFollowing ? 'Unfollow' : 'Follow'}
//       </button>
//     )
//   );
// };

// export default FollowButton;

import React, { useState, useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useUserProfileStore } from '../../store/userProfileStore';

const FollowButton = ({
  userId,
  followingStyles,
  unfollowingStyles,
  mainStyles,
  followTxt = 'Follow',
  UnfollowTxt = 'Unfollow',
}) => {
  const { user: authUser, isAuthenticated } = useAuthStore();
  const { followUser, unfollowUser, user: profileUser } = useUserProfileStore();
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (authUser && profileUser) {
      setIsFollowing(profileUser.followers.includes(authUser._id));
    }
  }, [authUser, profileUser]);

  // Check if the logged-in user is viewing their own profile
  const isOwnProfile = authUser && authUser._id === userId;

  const handleFollow = () => {
    if (!authUser) {
      console.error('User not authenticated. Cannot follow.');
      return;
    }
    followUser(userId);
  };

  const handleUnfollow = () => {
    unfollowUser(userId);
  };

  return (
    isAuthenticated &&
    !isOwnProfile && ( // Only render if not own profile
      <button
        onClick={isFollowing ? handleUnfollow : handleFollow}
        className={` ${
          isFollowing ? `${followingStyles}` : `${unfollowingStyles}`
        } transition duration-200 ${mainStyles}`}
        disabled={!authUser} // Disable if not logged in
      >
        {isFollowing ? UnfollowTxt : followTxt}
      </button>
    )
  );
};

export default FollowButton;
