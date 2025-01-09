// import { motion } from 'framer-motion';
// import { useAuthStore } from '../../store/authStore';
// import { formatDate } from '../../utils/date';
// import ThemeSwitcher from '../../components/base/ThemeSwitcher';
// import React, { useEffect } from 'react';
// import { Link } from 'react-router-dom';

// const DashboardPage = () => {
//   const { user, isCheckingAuth, logout } = useAuthStore();
//   console.log('user: ', user);

//   useEffect(() => {
//     if (!isCheckingAuth && !user) {
//       console.log('User is not authenticated. Redirecting to login page...');
//       logout();
//     }
//   }, [user, isCheckingAuth]);

//   const handleLogout = () => {
//     logout();
//   };

//   if (!user) {
//     return <div>Please log in to view your dashboard.</div>;
//   }

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ duration: 0.5 }}
//       className="max-w-md w-full mx-auto mt-10 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
//     >
//       <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-indigo-600 text-transparent bg-clip-text">
//         Dashboard
//       </h2>

//       <div className="space-y-6">
//         <motion.div
//           className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.2 }}
//         >
//           <h3 className="text-xl font-semibold text-purple-400 mb-3">
//             Profile Information
//           </h3>
//           <p className="text-gray-300">Name: {user.name}</p>
//           <p className="text-gray-300">Username: {user.username}</p>
//           <p className="text-gray-300">Email: {user.email}</p>
//           <p className="text-gray-300">Phone: {user.phoneNumber}</p>
//           <p className="text-gray-300">Bio: {user.bio}</p>
//         </motion.div>

// <motion.div
//   className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
//   initial={{ opacity: 0, y: 20 }}
//   animate={{ opacity: 1, y: 0 }}
//   transition={{ delay: 0.4 }}
// >
//   <h3 className="text-xl font-semibold text-purple-400 mb-3">
//     Account Activity
//   </h3>
//   <p className="text-gray-300">
//     <span className="font-bold">Joined: </span>
//     {new Date(user.joinedAt).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric',
//     })}
//   </p>
//   <p className="text-gray-300">
//     <span className="font-bold">Last Login: </span>
//     {formatDate(user.lastLogin)}
//   </p>
//   <p className="text-gray-300">
//     <span className="font-bold">Verified: </span>
//     {user.isVerified ? 'Yes' : 'No'}
//   </p>
// </motion.div>

//         <motion.div
//           className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ delay: 0.6 }}
//         >
//           <h3 className="text-xl font-semibold text-purple-400 mb-3">
//             Social Information
//           </h3>
//           <p className="text-gray-300">Followers: {user.followers.length}</p>
//           <p className="text-gray-300">Following: {user.following.length}</p>
//         </motion.div>
//       </div>

//       <div className="border-t border-gray-700 mt-4 pt-4">
//         <p className="text-gray-300">
//           Last Updated: {formatDate(user.updatedAt)}
//         </p>
//       </div>

//       <div className="my-4 flex-center">
//         <ThemeSwitcher />
//       </div>

//       <Link to="/profile/edit">
//         <button
//           className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white
//             font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700
//             focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//         >
//           Edit Profile
//         </button>
//       </Link>

//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.8 }}
//         className="mt-4"
//       >
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleLogout}
//           className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white
//           font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700
//           focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
//         >
//           Logout
//         </motion.button>
//       </motion.div>
//     </motion.div>
//   );
// };

// export default DashboardPage;

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAuthStore } from '../../store/authStore';
import { formatDate } from '../../utils/date';
import ThemeSwitcher from '../../components/base/ThemeSwitcher';
import { Link } from 'react-router-dom';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import Footer from '../../components/global/Footer';

const DashboardPage = () => {
  const { user, isCheckingAuth, logout } = useAuthStore();

  useEffect(() => {
    if (!isCheckingAuth && !user) {
      logout();
    }
  }, [user, isCheckingAuth]);

  const handleLogout = () => {
    logout();
  };

  if (!user) {
    return <div>Please log in to view your dashboard.</div>;
  }

  // Generate data for charts from user data
  const followersGrowthData = user.followers.map((follower, index) => ({
    date: new Date(user.joinedAt).setDate(
      new Date(user.joinedAt).getDate() + index * 7
    ), // Simulating weekly growth
    followers: index + 1,
  }));

  const accountActivityData = [
    {
      date: new Date(user.joinedAt).toISOString().split('T')[0],
      activity: 5,
    },
    {
      date: new Date(user.lastLogin).toISOString().split('T')[0],
      activity: 15,
    },
  ];

  return (
    <>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl w-full mx-auto md:mt-5 mt-3 p-8 bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-neutral-600"
      >
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-purple-400 to-indigo-600 text-transparent bg-clip-text">
          Dashboard
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              Profile Information
            </h3>
            <p className="text-gray-300">Name: {user.name}</p>
            <p className="text-gray-300">Username: {user.username}</p>
            <p className="text-gray-300">Email: {user.email}</p>
            <p className="text-gray-300">Phone: {user.phoneNumber}</p>
            <p className="text-gray-300">Bio: {user.bio}</p>
          </motion.div>

          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              Followers Growth
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={followersGrowthData}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis
                  dataKey="date"
                  tickFormatter={date => new Date(date).toLocaleDateString()}
                  stroke="#ccc"
                />
                <YAxis stroke="#ccc" />
                <Tooltip
                  labelFormatter={label =>
                    `Date: ${new Date(label).toLocaleDateString()}`
                  }
                />
                <Line type="monotone" dataKey="followers" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              Account Activity
            </h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={accountActivityData}>
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey="date" stroke="#ccc" />
                <YAxis stroke="#ccc" />
                <Tooltip />
                <Bar dataKey="activity" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div
            className="p-4 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="text-xl font-semibold text-purple-400 mb-3">
              Account Activity
            </h3>
            <p className="text-gray-300">
              <span className="font-bold">Joined: </span>
              {new Date(user.joinedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Last Login: </span>
              {formatDate(user.lastLogin)}
            </p>
            <p className="text-gray-300">
              <span className="font-bold">Verified: </span>
              {user.isVerified ? 'Yes' : 'No'}
            </p>
          </motion.div>
        </div>

        <div className="border-t border-gray-700 mt-4 pt-4">
          <p className="text-gray-300">
            Last Updated: {formatDate(user.updatedAt)}
          </p>
        </div>

        <div className="my-4 flex-center">
          <ThemeSwitcher />
        </div>

        <div className="my-4 md:w-[50%] mx-auto">
          <Link to="/profile/edit">
            <button
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white
            font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Edit Profile
            </button>
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-4 w-[60%] mx-auto"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleLogout}
              className="w-full py-3 px-4 bg-gradient-to-r from-purple-500 to-indigo-600 text-white 
          font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-indigo-700
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-900"
            >
              Logout
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
      <div>
        <div className="relative w-full mt-5 z-0">
          <div className="absolute rotate-180 inset-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[-1] opacity-80"></div>

          {/* <div className="relative w-full bg-[#2d1b4e] z-0"> */}
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
};

export default DashboardPage;
