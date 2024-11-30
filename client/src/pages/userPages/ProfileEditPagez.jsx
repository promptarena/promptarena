import { CircleXIcon, Edit, Settings2Icon, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useUserProfileStore } from '../../store/userProfileStore';
import ProfileDetails from '../../components/userProfile/ProfileDetails';
import UpdateProfileForm from '../../components/userProfile/UpdateProfileForm';
import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
import UploadProfileImage from '../../components/userProfile/UploadProfileImage';
import ChangePasswordForm from '../../components/userProfile/ChangePasswordForm';

function ProfileEditPagez() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Profile Details');
  const sidebarRef = useRef(null);
  const { fetchUserProfile, user, isLoading } = useUserProfileStore();

  // Fetch user profile on mount
  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  // Function to close sidebar when clicking outside
  const handleClickOutside = useCallback(event => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false);
    }
  }, []);

  // Adding and cleaning up the event listener for closing the sidebar when clicking outside
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handleClickOutside]);

  // Render loading spinner if data is loading
  if (isLoading) {
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  }

  // Show error message if user data is not found
  if (!user) {
    return <div>User not found.</div>;
  }

  // Memoized rendering of content for active menu item
  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Profile Details':
        return (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Profile Details</h2>
            <ProfileDetails user={user} />
          </div>
        );
      case 'Update Profile Info':
        return (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Update Profile Info</h2>
            <UpdateProfileForm />
          </div>
        );
      case 'Update Image':
        return (
          <div>
            <h2 className="text-3xl font-semibold mb-6">
              Update Profile Image
            </h2>
            <UploadProfileImage />
          </div>
        );

      case 'Change Password':
        return (
          <div>
            <h2 className="text-3xl font-semibold mb-6">Change Password</h2>
            <ChangePasswordForm />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white dark:bg-dark-background w-full flex flex-col md:flex-row gap-8 px-4 lg:px-20 xl:px-32 text-[#161931] dark:text-dark-text">
      {/* Sidebar */}
      <aside
        ref={sidebarRef}
        className={`fixed rounded-lg border-r-2 border-neutral-400 md:static my-4 top-0 left-0 z-[10] w-64 h-full bg-white dark:bg-dark-surface shadow-lg transform ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 transition-transform`}
      >
        <div className="flex flex-col h-full p-6 border-r border-gray-200 dark:border-dark-surface">
          {/* Close Button for Mobile */}

          <h2 className="text-2xl font-semibold md:m-2 mt-16 mb-6">
            Edit Profile
          </h2>
          {[
            { label: 'Profile Details', value: 'Profile Details' },
            { label: 'Update Profile Info', value: 'Update Profile Info' },
            { label: 'Update Image', value: 'Update Image' },
            { label: 'Change Password', value: 'Change Password' },
          ].map(item => (
            <button
              key={item.value}
              onClick={() => {
                setActiveMenuItem(item.value);
                setSidebarOpen(false);
              }}
              className={`flex items-center px-4 py-2.5 rounded-full font-semibold ${
                activeMenuItem === item.value
                  ? 'bg-indigo-100 text-indigo-900 dark:bg-dark-surface dark:text-dark-text border dark:border-dark-disabled'
                  : 'hover:text-indigo-900 dark:hover:text-dark-primary hover:bg-gray-100 dark:hover:bg-dark-background'
              }`}
            >
              {item.label}
            </button>
          ))}
          <button
            className="md:hidden flex-center self-end mt-4 ring-1 ring-neutral-400 px-2 rounded-xl"
            onClick={() => setSidebarOpen(false)}
          >
            <CircleXIcon className="w-4 h-5 mr-1 " /> Close
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="w-full md:w-3/4 lg:w-4/5 min-h-screen py-4">
        {/* Mobile Sidebar Toggle */}
        <button
          className="md:hidden flex-center mb-6 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
          onClick={() => setSidebarOpen(!isSidebarOpen)}
        >
          <Settings2Icon className="mr-2 w-full" /> Edit
        </button>

        <motion.div
          className="max-w-5xl mx-auto p-6 bg-white dark:bg-dark-surface rounded-lg shadow-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
}

export default ProfileEditPagez;

// import React, { useEffect, useMemo, useState } from 'react';
// import { useUserProfileStore } from '../../store/userProfileStore';
// import ProfileDetails from '../../components/userProfile/ProfileDetails';
// import UpdateProfileForm from '../../components/userProfile/UpdateProfileForm';
// import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
// import UploadProfileImage from '../../components/userProfile/UploadProfileImage';
// import ChangePasswordForm from '../../components/userProfile/ChangePasswordForm';
// import { motion } from 'framer-motion';

// const ProfileEditPagez = () => {
//       const [isSidebarOpen, setSidebarOpen] = useState(false);

//   const { fetchUserProfile, user, isLoading } = useUserProfileStore();

//   useEffect(() => {
//     fetchUserProfile();
//   }, [fetchUserProfile]);

//   const memoizedUser = useMemo(() => user, [user]);

//   const motionProps = useMemo(
//     () => ({
//       initial: { opacity: 0 },
//       animate: { opacity: 1 },
//       exit: { opacity: 0 },
//     }),
//     []
//   );

//   if (isLoading)
//     return (
//       <div>
//         <LoadingSpinner />
//       </div>
//     );
//   if (!memoizedUser) return <div>User not found.</div>;

//   return (
//     <div className="bg-white dark:bg-dark-background w-full flex flex-col md:flex-row gap-8 px-4 lg:px-20 xl:px-32 text-[#161931] dark:text-dark-text">
//       {/* Sidebar */}
//       <aside
//         className={`fixed md:static top-0 left-0 z-50 w-64 h-full bg-white dark:bg-dark-surface shadow-lg transform ${
//           isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
//         } md:translate-x-0 transition-transform`}
//       >
//         <div className="flex flex-col h-full p-6 border-r border-gray-200 dark:border-dark-surface">
//           {/* Close Button for Mobile */}
//           <button
//             className="md:hidden self-end mb-6 text-indigo-700 dark:text-dark-primary"
//             onClick={() => setSidebarOpen(false)}
//           >
//             ✖ Close
//           </button>
//           <h2 className="text-2xl font-semibold mb-6">Settings</h2>
//           {[
//             { label: 'Public Profile', href: '#', active: true },
//             { label: 'Account Settings', href: '#' },
//             { label: 'Notifications', href: '#' },
//             { label: 'PRO Account', href: '#' },
//           ].map((item, index) => (
//             <a
//               key={index}
//               href={item.href}
//               className={`flex items-center px-4 py-2.5 rounded-full font-semibold ${
//                 item.active
//                   ? 'bg-indigo-100 text-indigo-900 dark:bg-dark-surface dark:text-dark-text border dark:border-dark-disabled'
//                   : 'hover:text-indigo-900 dark:hover:text-dark-primary hover:bg-gray-100 dark:hover:bg-dark-background'
//               }`}
//             >
//               {item.label}
//             </a>
//           ))}
//         </div>
//       </aside>

//       {/* Main Content */}
//       <main className="w-full md:w-3/4 lg:w-4/5 min-h-screen py-4">
//         {/* Mobile Sidebar Toggle */}
//         <button
//           className="md:hidden mb-6 px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-300"
//           onClick={() => setSidebarOpen(!isSidebarOpen)}
//         >
//           ☰ Menu
//         </button>

//         <div className="max-w-5xl mx-auto p-6 bg-white dark:bg-dark-surface rounded-lg shadow-lg">
//           {/* Title */}
//           <h2 className="text-2xl font-bold mb-8">Public Profile</h2>

//           {/* Profile Picture Section */}
//           <div className="flex flex-col md:flex-row items-center gap-6 mb-10">
//             <img
//               className="w-36 h-36 rounded-full ring-2 ring-indigo-300 dark:ring-dark-primary object-cover"
//               src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZhY2V8ZW58MHx8MHx8fDA%3D&auto=format&fit=crop&w=500&q=60"
//               alt="Bordered avatar"
//             />
//             <div className="flex flex-col gap-4">
//               <button className="py-3 px-6 text-white bg-indigo-600 dark:bg-dark-primary rounded-lg hover:bg-indigo-700 dark:hover:bg-dark-primary-dark focus:ring-4 focus:ring-indigo-300 dark:focus:ring-dark-primary">
//                 Change Picture
//               </button>
//               <button className="py-3 px-6 text-indigo-900 dark:text-dark-text bg-gray-100 dark:bg-dark-surface rounded-lg border hover:bg-gray-200 dark:hover:bg-dark-background focus:ring-4 focus:ring-indigo-300 dark:focus:ring-dark-primary">
//                 Delete Picture
//               </button>
//             </div>
//           </div>

//           {/* Form Section */}
//           <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//             <div>
//               <label
//                 htmlFor="first_name"
//                 className="block text-sm font-medium mb-2"
//               >
//                 First Name
//               </label>
//               <input
//                 type="text"
//                 id="first_name"
//                 className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-dark-surface dark:border-dark-disabled focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Your first name"
//                 value="Jane"
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="last_name"
//                 className="block text-sm font-medium mb-2"
//               >
//                 Last Name
//               </label>
//               <input
//                 type="text"
//                 id="last_name"
//                 className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-dark-surface dark:border-dark-disabled focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Your last name"
//                 value="Ferguson"
//                 required
//               />
//             </div>
//             <div className="sm:col-span-2">
//               <label htmlFor="email" className="block text-sm font-medium mb-2">
//                 Email
//               </label>
//               <input
//                 type="email"
//                 id="email"
//                 className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-dark-surface dark:border-dark-disabled focus:ring-2 focus:ring-indigo-500"
//                 placeholder="your.email@mail.com"
//                 required
//               />
//             </div>
//             <div className="sm:col-span-2">
//               <label
//                 htmlFor="profession"
//                 className="block text-sm font-medium mb-2"
//               >
//                 Profession
//               </label>
//               <input
//                 type="text"
//                 id="profession"
//                 className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-dark-surface dark:border-dark-disabled focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Your profession"
//                 required
//               />
//             </div>
//             <div className="sm:col-span-2">
//               <label htmlFor="bio" className="block text-sm font-medium mb-2">
//                 Bio
//               </label>
//               <textarea
//                 id="bio"
//                 rows="4"
//                 className="w-full p-3 border rounded-lg bg-gray-50 dark:bg-dark-surface dark:border-dark-disabled focus:ring-2 focus:ring-indigo-500"
//                 placeholder="Write your bio here..."
//               ></textarea>
//             </div>
//             <div className="sm:col-span-2 flex justify-end">
//               <button
//                 type="submit"
//                 className="py-3 px-6 bg-indigo-700 text-white rounded-lg hover:bg-indigo-800 focus:ring-4 focus:ring-indigo-300"
//               >
//                 Save
//               </button>
//             </div>
//           </form>
//         </div>
//       </main>
//     </div>
//   );
// };

// export default ProfileEditPagez;
