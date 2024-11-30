// import React, { useEffect } from 'react';
// import UserProfilez from '../../components/userProfile/UserProfilez';
// import { useAuthStore } from '../../store/authStore';
// import BackToHome from '../../components/base/BackToHome';
// import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
// import { useUserProfileStore } from '../../store/userProfileStore';
// import { useParams } from 'react-router-dom';

// const ProfilePage = () => {
//   let { username } = useParams();

//   const {
//     fetchUserProfileByUsername,
//     user,
//     isLoading,
//     error,
//     followers,
//     following,
//     isLoadingFollowers,
//     isLoadingFollowing,
//     fetchFollowers,
//     fetchFollowing,
//   } = useUserProfileStore();
//   const { user: authUser, isAuthenticated } = useAuthStore();

//   if (!username && authUser && authUser.username) {
//     username = authUser.username;
//   }

//   console.log('authUser: ', authUser);

//   useEffect(() => {
//     fetchUserProfileByUsername(username);
//   }, [username, fetchUserProfileByUsername]);

//   // Fetch followers and following only after user object is fetched successfully
//   useEffect(() => {
//     if (user) {
//       fetchFollowers(user._id);
//       fetchFollowing(user._id);
//     }
//   }, [user, fetchFollowers, fetchFollowing]);

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   console.log('user: ', user);
//   console.log('followers: ', followers);
//   console.log('following: ', following);

//   if (!user) {
//     return (
//       <div className="text-gray-600 h-screen flex-center">
//         <div>
//           <p>User not found.</p>
//           {error && (
//             <p>
//               <b>Error:</b> {error}
//             </p>
//           )}
//           <i>
//             {
//               'If you think this is an error, please contact us. Alternatively, you can try searching for the user again.'
//             }
//           </i>
//           <b>
//             <BackToHome />
//           </b>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <>
//       <UserProfilez
//         user={user}
//         isLoading={isLoading}
//         error={error}
//         followers={followers}
//         following={following}
//         isLoadingFollowers={isLoadingFollowers}
//         isLoadingFollowing={isLoadingFollowing}
//         fetchFollowers={fetchFollowers}
//         fetchFollowing={fetchFollowing}
//         authUser={authUser}
//         isAuthenticated={isAuthenticated}
//       />
//     </>
//   );
// };

// export default ProfilePage;

import React from 'react';
import UserProfilez from '../../components/userProfile/UserProfilez';
import { useAuthStore } from '../../store/authStore';
import { getCurrentSiteUrl } from '../../utils/getCurrentSiteUrl';
import SEO from '../../components/seo/SEO';

const ProfilePage = () => {
  const { user: authUser, isAuthenticated } = useAuthStore();

  return (
    <>
      <UserProfilez
        usernameFromProfilePage={isAuthenticated ? authUser.username : null}
      />
    </>
  );
};

export default ProfilePage;
