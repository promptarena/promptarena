// // src/pages/admin/AdminDashboardPage.jsx
// import React, { useState, useEffect } from 'react';
// import { useAuthStore } from '../../store/authStore';
// import { useAdminStore } from '../../store/adminStore';
// import { Link, useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
// import { motion } from 'framer-motion';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
// import {
//   DollarSign,
//   Users,
//   FileText,
//   MessageCircle,
//   Star,
//   BarChart2,
//   TrendingUp,
// } from 'lucide-react';
// import AdminNotificationForm from '../../components/admin/notifications/AdminNotificationForm';
// import ThemeSwitcher from '../../components/base/ThemeSwitcher';
// import { formatDate } from '../../utils/date';
// import toast from 'react-hot-toast';

// const AdminDashboardPage = () => {
//   const { user, logout } = useAuthStore();
//   const {
//     fetchDetailedAnalytics,
//     analytics,
//     isLoading,
//     error,
//     fetchUsers,
//     users,
//     deleteUser,
//     updateUser,
//     fetchPrompts,
//     prompts,
//     approvePrompt,
//     rejectPrompt,
//     fetchSupportTickets,
//     supportTickets,
//     resolveSupportTicket,
//     fetchReports,
//     reports,
//     sendAdminNotification,
//   } = useAdminStore();

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDetailedAnalytics();
//     fetchUsers();
//     fetchPrompts();
//     fetchSupportTickets();
//     fetchReports(); // Fetch reports on component mount
//   }, [
//     fetchDetailedAnalytics,
//     fetchUsers,
//     fetchPrompts,
//     fetchSupportTickets,
//     fetchReports,
//   ]);

//   const handleLogout = () => {
//     logout();
//   };

//   const handleDeleteUser = async (userId) => {
//     if (
//       window.confirm(
//         'Are you sure you want to delete this user account?'
//       )
//     ) {
//       try {
//         await deleteUser(userId);
//         fetchUsers(); // Refetch users after deletion
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   const handleUpdateUser = async (userId, newRole) => {
//     try {
//       await updateUser(userId, { role: newRole });
//       fetchUsers(); // Refetch users after update
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const handleApprovePrompt = async (promptId) => {
//     try {
//       await approvePrompt(promptId);
//       fetchPrompts(); // Refetch prompts after approval
//     } catch (error) {
//       console.error('Error approving prompt:', error);
//     }
//   };

//   const handleRejectPrompt = async (promptId) => {
//     try {
//       await rejectPrompt(promptId);
//       fetchPrompts(); // Refetch prompts after rejection
//     } catch (error) {
//       console.error('Error rejecting prompt:', error);
//     }
//   };

//   const handleResolveTicket = async (ticketId) => {
//     try {
//       await resolveSupportTicket(ticketId);
//       fetchSupportTickets(); // Refetch tickets after resolution
//     } catch (error) {
//       console.error('Error resolving support ticket:', error);
//     }
//   };

//   const handleSendAdminNotification = async () => {
//     const message = prompt('Enter the notification message:');
//     const userIds = prompt(
//       'Enter comma-separated user IDs (leave blank for all users):'
//     );
//     const parsedUserIds = userIds
//       ? userIds.split(',').map((id) => id.trim())
//       : null;

//     if (message && parsedUserIds) {
//       try {
//         await sendAdminNotification(message, parsedUserIds);
//         toast.success('Admin notification sent successfully!');
//       } catch (error) {
//         console.error('Error sending admin notification:', error);
//       }
//     } else if (message) {
//       try {
//         await sendAdminNotification(message, null);
//         toast.success('Admin notification sent successfully!');
//       } catch (error) {
//         console.error('Error sending admin notification:', error);
//       }
//     }
//   };

//   if (isLoading) {
//     return <LoadingSpinner />;
//   }

//   if (error) {
//     return <div className='text-red-500'>{error}</div>;
//   }

//   const salesData = []

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ duration: 0.5 }}
//       className='max-w-full mx-auto mt-10 p-8 bg-gray-900 dark:bg-gray-600 text-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
//     >
//       <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
//         Admin Dashboard
//       </h2>

//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4'>
//         {/* User Analytics */}
//         <div
//           className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4'
//         >
//           <div className='flex items-center mb-2'>
//             <Users className='w-6 h-6 text-green-400' />
//             <h3 className='text-xl font-semibold text-green-400 ml-2'>
//               User Analytics
//             </h3>
//           </div>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Total Users: </span>
//             {analytics?.userAnalytics?.totalUsers}
//           </p>
//           <p className='text-gray-300'>
//             <span className='font-bold'>New Users (Last 30 Days): </span>
//             {analytics?.userAnalytics?.newUsers}
//           </p>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Buyers: </span>
//             {analytics?.userAnalytics?.buyersCount}
//           </p>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Sellers: </span>
//             {analytics?.userAnalytics?.sellersCount}
//           </p>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Admins: </span>
//             {analytics?.userAnalytics?.adminsCount}
//           </p>
//         </div>

//         {/* Prompt Analytics */}
//         <div
//           className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4'
//         >
//           <div className='flex items-center mb-2'>
//             <FileText className='w-6 h-6 text-green-400' />
//             <h3 className='text-xl font-semibold text-green-400 ml-2'>
//               Prompt Analytics
//             </h3>
//           </div>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Total Prompts: </span>
//             {analytics?.promptAnalytics?.totalPrompts}
//           </p>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Active Prompts: </span>
//             {analytics?.promptAnalytics?.activePrompts}
//           </p>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Inactive Prompts: </span>
//             {analytics?.promptAnalytics?.inactivePrompts}
//           </p>
//           <p className='text-gray-300'>
//             <span className='font-bold'>New Prompts (Last 30 Days): </span>
//             {analytics?.promptAnalytics?.promptsCreatedLast30Days}
//           </p>
//         </div>

//         {/* Transaction Analytics */}
//         <div
//           className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4'
//         >
//           <div className='flex items-center mb-2'>
//             <DollarSign className='w-6 h-6 text-green-400' />
//             <h3 className='text-xl font-semibold text-green-400 ml-2'>
//               Transaction Analytics
//             </h3>
//           </div>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Total Revenue: </span>
//             ${analytics?.transactionAnalytics?.totalRevenue.toFixed(2)}
//           </p>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Total Transactions: </span>
//             {analytics?.transactionAnalytics?.totalTransactions}
//           </p>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Completed Transactions: </span>
//             {analytics?.transactionAnalytics?.completedTransactions}
//           </p>
//         </div>

//         {/* Review Analytics */}
//         <div
//           className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4'
//         >
//           <div className='flex items-center mb-2'>
//             <Star className='w-6 h-6 text-green-400' />
//             <h3 className='text-xl font-semibold text-green-400 ml-2'>
//               Review Analytics
//             </h3>
//           </div>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Total Reviews: </span>
//             {analytics?.reviewAnalytics?.totalReviews}
//           </p>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Average Rating: </span>
//             {analytics?.reviewAnalytics?.averageRating.toFixed(2)}
//           </p>
//         </div>

//         {/* Notification Analytics */}
//         <div
//           className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4'
//         >
//           <div className='flex items-center mb-2'>
//             <MessageCircle className='w-6 h-6 text-green-400' />
//             <h3 className='text-xl font-semibold text-green-400 ml-2'>
//               Notification Analytics
//             </h3>
//           </div>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Total Notifications: </span>
//             {analytics?.notificationAnalytics?.totalNotifications}
//           </p>
//           <p className='text-gray-300'>
//             <span className='font-bold'>Read Notifications: </span>
//             {analytics?.notificationAnalytics?.readNotifications}
//           </p>
//         </div>
//       </div>

//       {/* Chart Section (Example) */}
//       <div className='mt-8'>
//         <h3 className='text-xl font-semibold mb-4'>Sales Chart</h3>
//         <BarChart width={600} height={300} data={salesData}>
//           <CartesianGrid stroke="#ccc" />
//           <XAxis dataKey="month" />
//           <YAxis />
//           <Tooltip />
//           <Bar dataKey="sales" fill="#8884d8" />
//         </BarChart>
//       </div>

//       {/* User Management Section */}
//       <div className='mt-8'>
//         <h2 className='text-2xl font-semibold mb-4'>User Management</h2>
//         <div className='overflow-x-auto'>
//           <table className='table-auto w-full'>
//             <thead>
//               <tr>
//                 <th className='px-4 py-2'>Username</th>
//                 <th className='px-4 py-2'>Email</th>
//                 <th className='px-4 py-2'>Role</th>
//                 <th className='px-4 py-2'>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user._id}>
//                   <td className='border px-4 py-2'>{user.username}</td>
//                   <td className='border px-4 py-2'>{user.email}</td>
//                   <td className='border px-4 py-2'>{user.role}</td>
//                   <td className='border px-4 py-2 flex gap-2'>
//                     <button
//                       onClick={() =>
//                         handleUpdateUser(user._id, 'buyer')
//                       }
//                       className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
//                     >
//                       Buyer
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleUpdateUser(user._id, 'seller')
//                       }
//                       className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
//                     >
//                       Seller
//                     </button>
//                     <button
//                       onClick={() =>
//                         handleUpdateUser(user._id, 'admin')
//                       }
//                       className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
//                     >
//                       Admin
//                     </button>
//                     <button
//                       onClick={() => handleDeleteUser(user._id)}
//                       className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
//                     >
//                       Delete
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Prompt Moderation Section */}
//       <div className='mt-8'>
//         <h2 className='text-2xl font-semibold mb-4'>Prompt Moderation</h2>
//         <div className='overflow-x-auto'>
//           <table className='table-auto w-full'>
//             <thead>
//               <tr>
//                 <th className='px-4 py-2'>Title</th>
//                 <th className='px-4 py-2'>Category</th>
//                 <th className='px-4 py-2'>Price</th>
//                 <th className='px-4 py-2'>Status</th>
//                 <th className='px-4 py-2'>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {prompts.map((prompt) => (
//                 <tr key={prompt._id}>
//                   <td className='border px-4 py-2'>{prompt.title}</td>
//                   <td className='border px-4 py-2'>{prompt.category}</td>
//                   <td className='border px-4 py-2'>${prompt.price}</td>
//                   <td className='border px-4 py-2'>{prompt.status}</td>
//                   <td className='border px-4 py-2 flex gap-2'>
//                     <button
//                       onClick={() => handleApprovePrompt(prompt._id)}
//                       className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
//                       disabled={prompt.status !== 'pending'}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleRejectPrompt(prompt._id)}
//                       className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
//                       disabled={prompt.status !== 'pending'}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Support Ticket Section */}
//       <div className='mt-8'>
//         <h2 className='text-2xl font-semibold mb-4'>Support Tickets</h2>
//         <div className='overflow-x-auto'>
//           <table className='table-auto w-full'>
//             <thead>
//               <tr>
//                 <th className='px-4 py-2'>Subject</th>
//                 <th className='px-4 py-2'>Description</th>
//                 <th className='px-4 py-2'>Status</th>
//                 <th className='px-4 py-2'>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {supportTickets.map((ticket) => (
//                 <tr key={ticket._id}>
//                   <td className='border px-4 py-2'>{ticket.subject}</td>
//                   <td className='border px-4 py-2'>{ticket.description}</td>
//                   <td className='border px-4 py-2'>{ticket.status}</td>
//                   <td className='border px-4 py-2'>
//                     <button
//                       onClick={() => handleResolveTicket(ticket._id)}
//                       className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
//                       disabled={ticket.status !== 'open'}
//                     >
//                       Resolve
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Reports Section */}
//       <div className='mt-8'>
//         <h2 className='text-2xl font-semibold mb-4'>Reports</h2>
//         <div className='overflow-x-auto'>
//           <table className='table-auto w-full'>
//             <thead>
//               <tr>
//                 <th className='px-4 py-2'>Report Type</th>
//                 <th className='px-4 py-2'>Data</th>
//                 <th className='px-4 py-2'>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {reports.map((report) => (
//                 <tr key={report.reportType}>
//                   <td className='border px-4 py-2'>
//                     {report.reportType}
//                   </td>
//                   <td className='border px-4 py-2'>
//                     {/* Display report data */}
//                   </td>
//                   <td className='border px-4 py-2'>
//                     <button
//                       onClick={() =>
//                         navigate(`/admin/reports/${report.reportType}`)
//                       }
//                       className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
//                     >
//                       View
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       <div className='border-t border-gray-700 mt-4 pt-4'>
//         <p className='text-gray-300'>
//           Last Updated: {formatDate(user.updatedAt)}
//         </p>
//       </div>

//       <div>
//         <ThemeSwitcher />
//       </div>
//       <motion.div
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ delay: 0.6 }}
//         className='mt-4'
//       >
//         <motion.button
//           whileHover={{ scale: 1.05 }}
//           whileTap={{ scale: 0.95 }}
//           onClick={handleLogout}
//           className='py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white
// 				font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700
// 				 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
//         >
//           Logout
//         </motion.button>
//       </motion.div>
//       <div className='mt-4'>
//         <AdminNotificationForm />
//       </div>
//     </motion.div>
//   );
// };

// export default AdminDashboardPage;

// src/pages/admin/AdminDashboardPage.jsx
// src/pages/admin/AdminDashboardPage.jsx
// import React, { useEffect } from 'react';
// import { useAuthStore } from '../../store/authStore';
// import { useAdminStore } from '../../store/adminStore';
// import { Link, useNavigate } from 'react-router-dom';
// import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
// import { motion } from 'framer-motion';
// import {
//   PieChart,
//   Pie,
//   Cell,
//   BarChart,
//   Bar,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   ResponsiveContainer,
// } from 'recharts';
// import { DollarSign, Users, FileText, Star, MessageCircle } from 'lucide-react';
// import AdminNotificationForm from '../../components/admin/notifications/AdminNotificationForm';
// import AdminBlogForm from '../../components/admin/blog/AdminBlogForm';
// import ThemeSwitcher from '../../components/base/ThemeSwitcher';
// import { formatDate } from '../../utils/date';
// import toast from 'react-hot-toast';
// import AdminBlogList from '../../components/admin/blog/AdminBlogList';

// const AdminDashboardPage = () => {
//   const { user, logout } = useAuthStore();
//   const {
//     fetchDetailedAnalytics,
//     analytics,
//     isLoading,
//     error,
//     fetchUsers,
//     users,
//     deleteUser,
//     updateUser,
//     fetchPrompts,
//     prompts,
//     approvePrompt,
//     rejectPrompt,
//     sendAdminNotification,
//   } = useAdminStore();

//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchDetailedAnalytics();
//     fetchUsers();
//     fetchPrompts();
//   }, [fetchDetailedAnalytics, fetchUsers, fetchPrompts]);

//   const handleLogout = () => logout();

//   const handleDeleteUser = async (userId) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       try {
//         await deleteUser(userId);
//         fetchUsers();
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     }
//   };

//   const handleUpdateUser = async (userId, newRole) => {
//     try {
//       await updateUser(userId, { role: newRole });
//       fetchUsers();
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   const handleApprovePrompt = async (promptId) => {
//     try {
//       await approvePrompt(promptId);
//       fetchPrompts();
//     } catch (error) {
//       console.error('Error approving prompt:', error);
//     }
//   };

//   const handleRejectPrompt = async (promptId) => {
//     try {
//       await rejectPrompt(promptId);
//       fetchPrompts();
//     } catch (error) {
//       console.error('Error rejecting prompt:', error);
//     }
//   };

//   const handleSendAdminNotification = async () => {
//     const message = prompt('Enter the notification message:');
//     const userIds = prompt(
//       'Enter comma-separated user IDs (leave blank for all users):'
//     );
//     const parsedUserIds = userIds
//       ? userIds.split(',').map((id) => id.trim())
//       : null;

//     if (message) {
//       try {
//         await sendAdminNotification(message, parsedUserIds);
//         toast.success('Admin notification sent successfully!');
//       } catch (error) {
//         console.error('Error sending admin notification:', error);
//       }
//     }
//   };

//   const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

//   if (isLoading) return <LoadingSpinner />;
//   if (error) return <div className='text-red-500'>{error}</div>;

//   return (
//     <motion.div
//       initial={{ opacity: 0, scale: 0.9 }}
//       animate={{ opacity: 1, scale: 1 }}
//       exit={{ opacity: 0, scale: 0.9 }}
//       transition={{ duration: 0.5 }}
//       className='max-w-full mx-auto mt-10 p-8 bg-gray-900 dark:bg-gray-600 text-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800'
//     >
//       <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text'>
//         Admin Dashboard
//       </h2>

//       {/* Analytics Section */}
//       <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8'>
//         {/* User Analytics */}
//         <div className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4'>
//           <div className='flex items-center mb-2'>
//             <Users className='w-6 h-6 text-green-400' />
//             <h3 className='text-xl font-semibold text-green-400 ml-2'>
//               User Analytics
//             </h3>
//           </div>
//           <p className='text-gray-300'>
//             Total Users: {analytics?.userAnalytics?.totalUsers}
//           </p>
//           <p className='text-gray-300'>
//             New Users (Last 30 Days): {analytics?.userAnalytics?.newUsers}
//           </p>
//           <ResponsiveContainer width='100%' height={250}>
//             <PieChart>
//               <Pie
//                 data={[
//                   {
//                     name: 'Buyers',
//                     value: analytics?.userAnalytics?.buyersCount || 0,
//                   },
//                   {
//                     name: 'Sellers',
//                     value: analytics?.userAnalytics?.sellersCount || 0,
//                   },
//                   {
//                     name: 'Admins',
//                     value: analytics?.userAnalytics?.adminsCount || 0,
//                   },
//                 ]}
//                 dataKey='value'
//                 cx='50%'
//                 cy='50%'
//                 outerRadius={80}
//                 fill='#8884d8'
//                 label
//               >
//                 {COLORS.map((color, index) => (
//                   <Cell key={`cell-${index}`} fill={color} />
//                 ))}
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Prompt Analytics */}
//         <div className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4'>
//           <div className='flex items-center mb-2'>
//             <FileText className='w-6 h-6 text-green-400' />
//             <h3 className='text-xl font-semibold text-green-400 ml-2'>
//               Prompt Analytics
//             </h3>
//           </div>
//           <p className='text-gray-300'>
//             Total Prompts: {analytics?.promptAnalytics?.totalPrompts}
//           </p>
//           <p className='text-gray-300'>
//             Active Prompts: {analytics?.promptAnalytics?.activePrompts}
//           </p>
//           <ResponsiveContainer width='100%' height={250}>
//             <BarChart
//               data={[
//                 {
//                   name: 'Active',
//                   value: analytics?.promptAnalytics?.activePrompts || 0,
//                 },
//                 {
//                   name: 'Inactive',
//                   value: analytics?.promptAnalytics?.inactivePrompts || 0,
//                 },
//                 {
//                   name: 'New',
//                   value:
//                     analytics?.promptAnalytics?.promptsCreatedLast30Days || 0,
//                 },
//               ]}
//             >
//               <CartesianGrid stroke='#ccc' />
//               <XAxis dataKey='name' />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey='value' fill='#82ca9d' />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Transaction Analytics */}
//         <div className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4'>
//           <div className='flex items-center mb-2'>
//             <DollarSign className='w-6 h-6 text-green-400' />
//             <h3 className='text-xl font-semibold text-green-400 ml-2'>
//               Transaction Analytics
//             </h3>
//           </div>
//           <p className='text-gray-300'>
//             Total Revenue: $
//             {analytics?.transactionAnalytics?.totalRevenue?.toFixed(2)}
//           </p>
//           <p className='text-gray-300'>
//             Total Transactions:{' '}
//             {analytics?.transactionAnalytics?.totalTransactions}
//           </p>
//           <ResponsiveContainer width='100%' height={250}>
//             <BarChart
//               data={[
//                 {
//                   name: 'Total Transactions',
//                   value:
//                     analytics?.transactionAnalytics?.totalTransactions || 0,
//                 },
//                 {
//                   name: 'Completed',
//                   value:
//                     analytics?.transactionAnalytics?.completedTransactions || 0,
//                 },
//               ]}
//             >
//               <CartesianGrid stroke='#ccc' />
//               <XAxis dataKey='name' />
//               <YAxis />
//               <Tooltip />
//               <Bar dataKey='value' fill='#8884d8' />
//             </BarChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Review Analytics */}
//         <div className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4'>
//           <div className='flex items-center mb-2'>
//             <Star className='w-6 h-6 text-green-400' />
//             <h3 className='text-xl font-semibold text-green-400 ml-2'>
//               Review Analytics
//             </h3>
//           </div>
//           <p className='text-gray-300'>
//             Total Reviews: {analytics?.reviewAnalytics?.totalReviews}
//           </p>
//           <p className='text-gray-300'>
//             Average Rating:{' '}
//             {analytics?.reviewAnalytics?.averageRating?.toFixed(2)}
//           </p>
//           <ResponsiveContainer width='100%' height={250}>
//             <PieChart>
//               <Pie
//                 data={[
//                   {
//                     name: 'Total Reviews',
//                     value: analytics?.reviewAnalytics?.totalReviews || 0,
//                   },
//                   {
//                     name: 'Average Rating',
//                     value: analytics?.reviewAnalytics?.averageRating || 0,
//                   },
//                 ]}
//                 dataKey='value'
//                 cx='50%'
//                 cy='50%'
//                 outerRadius={80}
//                 fill='#82ca9d'
//                 label
//               >
//                 <Cell fill='#82ca9d' />
//                 <Cell fill='#8884d8' />
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>

//         {/* Notification Analytics */}
//         <div className='bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4'>
//           <div className='flex items-center mb-2'>
//             <MessageCircle className='w-6 h-6 text-green-400' />
//             <h3 className='text-xl font-semibold text-green-400 ml-2'>
//               Notification Analytics
//             </h3>
//           </div>
//           <p className='text-gray-300'>
//             Total Notifications:{' '}
//             {analytics?.notificationAnalytics?.totalNotifications}
//           </p>
//           <p className='text-gray-300'>
//             Read Notifications:{' '}
//             {analytics?.notificationAnalytics?.readNotifications}
//           </p>
//           <ResponsiveContainer width='100%' height={250}>
//             <PieChart>
//               <Pie
//                 data={[
//                   {
//                     name: 'Total',
//                     value:
//                       analytics?.notificationAnalytics?.totalNotifications || 0,
//                   },
//                   {
//                     name: 'Read',
//                     value:
//                       analytics?.notificationAnalytics?.readNotifications || 0,
//                   },
//                 ]}
//                 dataKey='value'
//                 cx='50%'
//                 cy='50%'
//                 outerRadius={80}
//                 fill='#82ca9d'
//                 label
//               >
//                 <Cell fill='#82ca9d' />
//                 <Cell fill='#8884d8' />
//               </Pie>
//               <Tooltip />
//             </PieChart>
//           </ResponsiveContainer>
//         </div>
//       </div>

//       {/* Additional Features */}
//       <div className='mt-8'>
//         <h2 className='text-2xl font-semibold mb-4'>User Management</h2>
//         <div className='overflow-x-auto'>
//           <table className='table-auto w-full bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'>
//             <thead>
//               <tr>
//                 <th className='px-4 py-2 border'>Username</th>
//                 <th className='px-4 py-2 border'>Email</th>
//                 <th className='px-4 py-2 border'>Role</th>
//                 <th className='px-4 py-2 border'>Actions</th>
//                 <th className='px-4 py-2 border'>Change Role</th>
//               </tr>
//             </thead>
//             <tbody>
//               {users.map((user) => (
//                 <tr key={user._id}>
//                   <td className='border px-4 py-2'>{user.username}</td>
//                   <td className='border px-4 py-2'>{user.email}</td>
//                   <td className='border px-4 py-2'>{user.role}</td>
//                   <td className='border px-4 py-2 flex gap-2'>
//                     <button
//                       onClick={() => handleDeleteUser(user._id)}
//                       className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
//                     >
//                       Delete
//                     </button>
//                     <button>
//                       <Link
//                         to={`/profile/username/${user.username}`}
//                         className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
//                       >
//                         View
//                       </Link>
//                     </button>
//                   </td>
//                   <td className='border px-4 py-2'>
//                     <button
//                       onClick={() => handleUpdateUser(user._id, 'buyer')}
//                       className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
//                     >
//                       Buyer
//                     </button>
//                     <button
//                       onClick={() => handleUpdateUser(user._id, 'seller')}
//                       className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
//                     >
//                       Seller
//                     </button>
//                     <button
//                       onClick={() => handleUpdateUser(user._id, 'admin')}
//                       className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600'
//                     >
//                       Admin
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Prompt Moderation Section */}
//       <div className='mt-8'>
//         <h2 className='text-2xl font-semibold mb-4'>Prompt Moderation</h2>
//         <div className='overflow-x-auto'>
//           <table className='table-auto w-full bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700'>
//             <thead>
//               <tr>
//                 <th className='px-4 py-2'>Title</th>
//                 <th className='px-4 py-2'>Category</th>
//                 <th className='px-4 py-2'>Price</th>
//                 <th className='px-4 py-2'>Status</th>
//                 <th className='px-4 py-2'>Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {prompts.map((prompt) => (
//                 <tr key={prompt._id}>
//                   <td className='border px-4 py-2'>{prompt.title}</td>
//                   <td className='border px-4 py-2'>{prompt.category}</td>
//                   <td className='border px-4 py-2'>${prompt.price}</td>
//                   <td className='border px-4 py-2'>{prompt.status}</td>
//                   <td className='border px-4 py-2 flex gap-2'>
//                     <button
//                       onClick={() => handleApprovePrompt(prompt._id)}
//                       className='bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600'
//                       disabled={prompt.status !== 'pending'}
//                     >
//                       Approve
//                     </button>
//                     <button
//                       onClick={() => handleRejectPrompt(prompt._id)}
//                       className='bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600'
//                       disabled={prompt.status !== 'pending'}
//                     >
//                       Reject
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//       {/* Blog Management Section */}
//       <div className='mt-8'>
//         <h2 className='text-2xl font-semibold mb-4'>Blog Management</h2>
//         <div className='overflow-x-auto'>
//             <AdminBlogList />
//         </div>
//       </div>

//       {/* Admin Notification Section */}
//       <div className='mt-8'>
//         <h2 className='text-2xl font-semibold mb-4'>Send Notifications</h2>
//         <AdminNotificationForm
//           onSendNotification={handleSendAdminNotification}
//         />
//       </div>

//       {/* Dashboard Footer */}
//       <div className='border-t border-gray-700 mt-4 pt-4'>
//         <p className='text-gray-300'>
//           Last Updated: {formatDate(user.updatedAt)}
//         </p>
//       </div>
//       <div className='mt-4 flex justify-center'>
//         <button
//           onClick={handleLogout}
//           className='py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900'
//         >
//           Logout
//         </button>
//       </div>
//       <div className='mt-4 flex justify-center'>
//         <ThemeSwitcher />
//       </div>
//     </motion.div>
//   );
// };

// export default AdminDashboardPage;

// src/pages/admin/AdminDashboardPage.jsx
import React, { useEffect } from 'react';
import { useAuthStore } from '../../store/authStore';
import { useAdminStore } from '../../store/adminStore';
import { Link, useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
import { motion } from 'framer-motion';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { DollarSign, Users, FileText, Star, MessageCircle } from 'lucide-react';
import AdminNotificationForm from '../../components/admin/notifications/AdminNotificationForm';
import AdminBlogForm from '../../components/admin/blog/AdminBlogForm';
import ThemeSwitcher from '../../components/base/ThemeSwitcher';
import AdminBlogList from '../../components/admin/blog/AdminBlogList';
import { formatDate } from '../../utils/date';
import toast from 'react-hot-toast';
import useAlert from '../../hooks/useAlert';

const AdminDashboardPage = () => {
  const { user, logout } = useAuthStore();
  const {
    fetchDetailedAnalytics,
    analytics,
    isLoading,
    error,
    fetchUsers,
    users,
    deleteUser,
    updateUser,

    sendAdminNotification,
  } = useAdminStore();

  const navigate = useNavigate();
  const { customConfirm, AlertModalComponent } = useAlert(); // Destructure customConfirm and AlertModalComponent from useAlert

  useEffect(() => {
    fetchDetailedAnalytics();
    fetchUsers();
    // fetchPrompts();
  }, [fetchDetailedAnalytics, fetchUsers]);

  const handleLogout = () => logout();

  // const handleDeleteUser = async userId => {
  //   if (window.confirm('Are you sure you want to delete this user?')) {
  //     try {
  //       await deleteUser(userId);
  //       fetchUsers();
  //     } catch (error) {
  //       console.error('Error deleting user:', error);
  //     }
  //   }
  // };

  const handleDeleteUser = async userId => {
    // Use the customConfirm function from useAlert
    customConfirm('Are you sure you want to delete this user?', async () => {
      try {
        await deleteUser(userId);
        fetchUsers(); // Refresh the users list after deletion
      } catch (error) {
        console.error('Error deleting user:', error);
      }
    });
  };

  const handleUpdateUser = async (userId, newRole) => {
    try {
      await updateUser(userId, { role: newRole });
      fetchUsers();
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // const handleApprovePrompt = async promptId => {
  //   try {
  //     await approvePrompt(promptId);
  //     fetchPrompts();
  //   } catch (error) {
  //     console.error('Error approving prompt:', error);
  //   }
  // };

  // const handleRejectPrompt = async promptId => {
  //   try {
  //     await rejectPrompt(promptId);
  //     fetchPrompts();
  //   } catch (error) {
  //     console.error('Error rejecting prompt:', error);
  //   }
  // };

  const handleSendAdminNotification = async () => {
    const message = prompt('Enter the notification message:');
    const userIds = prompt(
      'Enter comma-separated user IDs (leave blank for all users):'
    );
    const parsedUserIds = userIds
      ? userIds.split(',').map(id => id.trim())
      : null;

    if (message) {
      try {
        await sendAdminNotification(message, parsedUserIds);
        toast.success('Admin notification sent successfully!');
      } catch (error) {
        console.error('Error sending admin notification:', error);
      }
    }
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="max-w-full mx-auto mt-10 p-8 bg-gray-900 dark:bg-gray-600 text-white bg-opacity-80 backdrop-filter backdrop-blur-lg rounded-xl shadow-2xl border border-gray-800"
    >
      <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-600 text-transparent bg-clip-text">
        Admin Dashboard
      </h2>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 mb-8">
        {/* User Analytics */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center mb-2">
            <Users className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-green-400 ml-2">
              User Analytics
            </h3>
          </div>
          <p className="text-gray-300">
            Total Users: {analytics?.userAnalytics?.totalUsers}
          </p>
          <p className="text-gray-300">
            New Users (Last 30 Days): {analytics?.userAnalytics?.newUsers}
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  {
                    name: 'Buyers',
                    value: analytics?.userAnalytics?.buyersCount || 0,
                  },
                  {
                    name: 'Sellers',
                    value: analytics?.userAnalytics?.sellersCount || 0,
                  },
                  {
                    name: 'Admins',
                    value: analytics?.userAnalytics?.adminsCount || 0,
                  },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {COLORS.map((color, index) => (
                  <Cell key={`cell-${index}`} fill={color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Prompt Analytics */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center mb-2">
            <FileText className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-green-400 ml-2">
              Prompt Analytics
            </h3>
          </div>
          <p className="text-gray-300">
            Total Prompts: {analytics?.promptAnalytics?.totalPrompts}
          </p>
          <p className="text-gray-300">
            Active Prompts: {analytics?.promptAnalytics?.activePrompts}
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                {
                  name: 'Active',
                  value: analytics?.promptAnalytics?.activePrompts || 0,
                },
                {
                  name: 'Inactive',
                  value: analytics?.promptAnalytics?.inactivePrompts || 0,
                },
                {
                  name: 'New',
                  value:
                    analytics?.promptAnalytics?.promptsCreatedLast30Days || 0,
                },
              ]}
            >
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Transaction Analytics */}
        {/* <div className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center mb-2">
            <DollarSign className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-green-400 ml-2">
              Transaction Analytics
            </h3>
          </div>
          <p className="text-gray-300">
            Total Revenue: $
            {analytics?.transactionAnalytics?.totalRevenue?.toFixed(2)}
          </p>
          <p className="text-gray-300">
            Total Transactions:{' '}
            {analytics?.transactionAnalytics?.totalTransactions}
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[
                {
                  name: 'Total Transactions',
                  value:
                    analytics?.transactionAnalytics?.totalTransactions || 0,
                },
                {
                  name: 'Completed',
                  value:
                    analytics?.transactionAnalytics?.completedTransactions || 0,
                },
              ]}
            >
              <CartesianGrid stroke="#ccc" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div> */}

        {/* Review Analytics */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center mb-2">
            <Star className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-green-400 ml-2">
              Review Analytics
            </h3>
          </div>
          <p className="text-gray-300">
            Total Reviews: {analytics?.reviewAnalytics?.totalReviews}
          </p>
          <p className="text-gray-300">
            Average Rating:{' '}
            {analytics?.reviewAnalytics?.averageRating?.toFixed(2)}
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  {
                    name: 'Total Reviews',
                    value: analytics?.reviewAnalytics?.totalReviews || 0,
                  },
                  {
                    name: 'Average Rating',
                    value: analytics?.reviewAnalytics?.averageRating || 0,
                  },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              >
                <Cell fill="#82ca9d" />
                <Cell fill="#8884d8" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Notification Analytics */}
        <div className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4">
          <div className="flex items-center mb-2">
            <MessageCircle className="w-6 h-6 text-green-400" />
            <h3 className="text-xl font-semibold text-green-400 ml-2">
              Notification Analytics
            </h3>
          </div>
          <p className="text-gray-300">
            Total Notifications:{' '}
            {analytics?.notificationAnalytics?.totalNotifications}
          </p>
          <p className="text-gray-300">
            Read Notifications:{' '}
            {analytics?.notificationAnalytics?.readNotifications}
          </p>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[
                  {
                    name: 'Total',
                    value:
                      analytics?.notificationAnalytics?.totalNotifications || 0,
                  },
                  {
                    name: 'Read',
                    value:
                      analytics?.notificationAnalytics?.readNotifications || 0,
                  },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#82ca9d"
                label
              >
                <Cell fill="#82ca9d" />
                <Cell fill="#8884d8" />
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Additional Features */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">User Management</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Username</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Role</th>
                <th className="px-4 py-2 border">Actions</th>
                <th className="px-4 py-2 border">Change Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td className="border px-4 py-2">{user.username}</td>
                  <td className="border px-4 py-2">{user.email}</td>
                  <td className="border px-4 py-2">{user.role}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleDeleteUser(user._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button>
                      <Link
                        to={`/profile/username/${user.username}`}
                        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      >
                        View
                      </Link>
                    </button>
                  </td>
                  <td className="border px-4 py-2">
                    <button
                      onClick={() => handleUpdateUser(user._id, 'buyer')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Buyer
                    </button>
                    <button
                      onClick={() => handleUpdateUser(user._id, 'seller')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Seller
                    </button>
                    <button
                      onClick={() => handleUpdateUser(user._id, 'admin')}
                      className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                    >
                      Admin
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Prompt Moderation Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Prompt Moderation</h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
            <thead>
              <tr>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Category</th>
                <th className="px-4 py-2">Price</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {/* {prompts.map(prompt => (
                <tr key={prompt._id}>
                  <td className="border px-4 py-2">{prompt.title}</td>
                  <td className="border px-4 py-2">{prompt.category}</td>
                  <td className="border px-4 py-2">${prompt.price}</td>
                  <td className="border px-4 py-2">{prompt.status}</td>
                  <td className="border px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleApprovePrompt(prompt._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                      disabled={prompt.status !== 'pending'}
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleRejectPrompt(prompt._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                      disabled={prompt.status !== 'pending'}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))} */}
            </tbody>
          </table>
        </div>
      </div>

      {/* Blog Management Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Blog Management</h2>
        <AdminBlogList />
      </div>

      {/* Admin Notification Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Send Notifications</h2>
        <AdminNotificationForm
          onSendNotification={handleSendAdminNotification}
        />
      </div>

      {/* Dashboard Footer */}
      <div className="border-t border-gray-700 mt-4 pt-4">
        <p className="text-gray-300">
          Last Updated: {formatDate(user.updatedAt)}
        </p>
      </div>
      <div className="mt-4 flex justify-center">
        <button
          onClick={handleLogout}
          className="py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold rounded-lg shadow-lg hover:from-green-600 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
        >
          Logout
        </button>
      </div>
      <div className="mt-4 flex justify-center">
        <ThemeSwitcher />
      </div>
      {/* Render the AlertModalComponent here */}
      {AlertModalComponent}
    </motion.div>
  );
};

export default AdminDashboardPage;
