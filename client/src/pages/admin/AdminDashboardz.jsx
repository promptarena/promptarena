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
// import AdminBlogList from '../../components/admin/blog/AdminBlogList';
// import { formatDate } from '../../utils/date';
// import toast from 'react-hot-toast';
// import useAlert from '../../hooks/useAlert';
// import Sidebar from '../../components/admin/common/SideBar';
// import ProfileDropdown from '../../components/base/ProfileDropdown';
// import HeaderBar from '../../components/admin/common/HeaderBar';

// const AdminDashboardz = () => {
//     const [isSidebarOpen, setSidebarOpen] = useState(false);
//     const [activeMenuItem, setActiveMenuItem] = useState('Profile Details');
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

//     sendAdminNotification,
//   } = useAdminStore();

//   const navigate = useNavigate();
//   const { customConfirm, AlertModalComponent } = useAlert(); // Destructure customConfirm and AlertModalComponent from useAlert

//   useEffect(() => {
//     fetchDetailedAnalytics();
//     fetchUsers();
//     // fetchPrompts();
//   }, [fetchDetailedAnalytics, fetchUsers]);

//   const handleLogout = () => logout();

//   // const handleDeleteUser = async userId => {
//   //   if (window.confirm('Are you sure you want to delete this user?')) {
//   //     try {
//   //       await deleteUser(userId);
//   //       fetchUsers();
//   //     } catch (error) {
//   //       console.error('Error deleting user:', error);
//   //     }
//   //   }
//   // };

//   const handleDeleteUser = async userId => {
//     // Use the customConfirm function from useAlert
//     customConfirm('Are you sure you want to delete this user?', async () => {
//       try {
//         await deleteUser(userId);
//         fetchUsers(); // Refresh the users list after deletion
//       } catch (error) {
//         console.error('Error deleting user:', error);
//       }
//     });
//   };

//   const handleUpdateUser = async (userId, newRole) => {
//     try {
//       await updateUser(userId, { role: newRole });
//       fetchUsers();
//     } catch (error) {
//       console.error('Error updating user:', error);
//     }
//   };

//   // const handleApprovePrompt = async promptId => {
//   //   try {
//   //     await approvePrompt(promptId);
//   //     fetchPrompts();
//   //   } catch (error) {
//   //     console.error('Error approving prompt:', error);
//   //   }
//   // };

//   // const handleRejectPrompt = async promptId => {
//   //   try {
//   //     await rejectPrompt(promptId);
//   //     fetchPrompts();
//   //   } catch (error) {
//   //     console.error('Error rejecting prompt:', error);
//   //   }
//   // };

//   const handleSendAdminNotification = async () => {
//     const message = prompt('Enter the notification message:');
//     const userIds = prompt(
//       'Enter comma-separated user IDs (leave blank for all users):'
//     );
//     const parsedUserIds = userIds
//       ? userIds.split(',').map(id => id.trim())
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
//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <div>
//       <body className="bg-indigo-50 min-h-screen overflow-x-hidden">
//         <div className="overlay fixed inset-0 bg-indigo-900/50 z-40 hidden opacity-0 transition-opacity duration-300"></div>

//         <HeaderBar user={user} handleLogout={handleLogout} />

//         <div className="pt-16 max-w-7xl mx-auto flex">
//           <Sidebar />

//           <main className="flex-1 p-4">
//             <div className="flex flex-col lg:flex-row gap-4 mb-6">
//               {/* <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
//                 <h2 className="text-4xl md:text-5xl text-blue-900">
//                   Welcome <br />
//                   <strong>Dash</strong>
//                 </h2>
//                 <span className="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">
//                   01:51
//                 </span>
//               </div> */}
//               <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl animate-fade-in">
//                 <div className="bg-[#1f1f1f] rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up">
//                   <div className="bg-gray-800 bg-opacity-50 rounded-lg border p-5 border-gray-700">
//                     <div className="flex items-center mb-2">
//                       <Users className="w-6 h-6 text-green-400" />
//                       <h3 className="text-xl font-semibold text-green-400 ml-2">
//                         User Analytics
//                       </h3>
//                     </div>
//                     <p className="text-gray-300">
//                       Total Users: {analytics?.userAnalytics?.totalUsers}
//                     </p>
//                     <p className="text-gray-300">
//                       New Users (Last 30 Days):{' '}
//                       {analytics?.userAnalytics?.newUsers}
//                     </p>
//                     <ResponsiveContainer width="100%" height={250}>
//                       <PieChart>
//                         <Pie
//                           data={[
//                             {
//                               name: 'Buyers',
//                               value: analytics?.userAnalytics?.buyersCount || 0,
//                             },
//                             {
//                               name: 'Sellers',
//                               value:
//                                 analytics?.userAnalytics?.sellersCount || 0,
//                             },
//                             {
//                               name: 'Admins',
//                               value: analytics?.userAnalytics?.adminsCount || 0,
//                             },
//                           ]}
//                           dataKey="value"
//                           cx="50%"
//                           cy="50%"
//                           outerRadius={80}
//                           fill="#8884d8"
//                           label
//                         >
//                           {COLORS.map((color, index) => (
//                             <Cell key={`cell-${index}`} fill={color} />
//                           ))}
//                         </Pie>
//                         <Tooltip />
//                       </PieChart>
//                     </ResponsiveContainer>
//                   </div>
//                 </div>
//               </div>

//               <div className="flex-1 bg-[#1f1f1f] border border-blue-200 rounded-xl animate-fade-in">
//                 {/* Prompt Analytics */}
//                 <div className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4">
//                   <div className="flex items-center mb-4">
//                     <MessageCircle className="w-6 h-6 text-green-400" />
//                     <h3 className="text-xl font-semibold text-green-400 ml-2">
//                       Notification Analytics
//                     </h3>
//                   </div>
//                   <p className="text-gray-300">
//                     Total Notifications:{' '}
//                     {analytics?.notificationAnalytics?.totalNotifications}
//                   </p>
//                   <p className="text-gray-300">
//                     Read Notifications:{' '}
//                     {analytics?.notificationAnalytics?.readNotifications}
//                   </p>
//                   <ResponsiveContainer width="100%" height={250}>
//                     <PieChart>
//                       <Pie
//                         data={[
//                           {
//                             name: 'Total',
//                             value:
//                               analytics?.notificationAnalytics
//                                 ?.totalNotifications || 0,
//                           },
//                           {
//                             name: 'Read',
//                             value:
//                               analytics?.notificationAnalytics
//                                 ?.readNotifications || 0,
//                           },
//                         ]}
//                         dataKey="value"
//                         cx="50%"
//                         cy="50%"
//                         outerRadius={80}
//                         fill="#82ca9d"
//                         label
//                       >
//                         <Cell fill="#82ca9d" />
//                         <Cell fill="#8884d8" />
//                       </Pie>
//                       <Tooltip />
//                     </PieChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//               <div className="bg-[#1f1f1f] rounded-lg border border-gray-700 p-4">
//                 <div className="flex items-center mb-2">
//                   <Star className="w-6 h-6 text-green-400" />
//                   <h3 className="text-xl font-semibold text-green-400 ml-2">
//                     Review Analytics
//                   </h3>
//                 </div>
//                 <p className="text-gray-300">
//                   Total Reviews: {analytics?.reviewAnalytics?.totalReviews}
//                 </p>
//                 <p className="text-gray-300">
//                   Average Rating:{' '}
//                   {analytics?.reviewAnalytics?.averageRating?.toFixed(2)}
//                 </p>
//                 <ResponsiveContainer width="100%" height={250}>
//                   <PieChart>
//                     <Pie
//                       data={[
//                         {
//                           name: 'Total Reviews',
//                           value: analytics?.reviewAnalytics?.totalReviews || 0,
//                         },
//                         {
//                           name: 'Average Rating',
//                           value: analytics?.reviewAnalytics?.averageRating || 0,
//                         },
//                       ]}
//                       dataKey="value"
//                       cx="50%"
//                       cy="50%"
//                       outerRadius={80}
//                       fill="#82ca9d"
//                       label
//                     >
//                       <Cell fill="#82ca9d" />
//                       <Cell fill="#8884d8" />
//                     </Pie>
//                     <Tooltip />
//                   </PieChart>
//                 </ResponsiveContainer>
//               </div>
//               <div className="bg-[#1f1f1f] rounded-xl col-span-2 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up">
//                 <div className=" bg-opacity-50 rounded-lg border border-gray-700 p-4">
//                   <div className="flex items-center mb-2">
//                     <FileText className="w-6 h-6 text-green-400" />
//                     <h3 className="text-xl font-semibold text-green-400 ml-2">
//                       Prompt Analytics
//                     </h3>
//                   </div>
//                   <p className="text-gray-300">
//                     Total Prompts: {analytics?.promptAnalytics?.totalPrompts}
//                   </p>
//                   <p className="text-gray-300">
//                     Active Prompts: {analytics?.promptAnalytics?.activePrompts}
//                   </p>
//                   <ResponsiveContainer width="100%" height={250}>
//                     <BarChart
//                       data={[
//                         {
//                           name: 'Active',
//                           value: analytics?.promptAnalytics?.activePrompts || 0,
//                         },
//                         {
//                           name: 'Inactive',
//                           value:
//                             analytics?.promptAnalytics?.inactivePrompts || 0,
//                         },
//                         {
//                           name: 'New',
//                           value:
//                             analytics?.promptAnalytics
//                               ?.promptsCreatedLast30Days || 0,
//                         },
//                       ]}
//                     >
//                       <CartesianGrid stroke="#ccc" />
//                       <XAxis dataKey="name" />
//                       <YAxis />
//                       <Tooltip />
//                       <Bar dataKey="value" fill="#82ca9d" />
//                     </BarChart>
//                   </ResponsiveContainer>
//                 </div>
//               </div>
//             </div>
//           </main>
//         </div>
//       </body>
//     </div>
//   );
// };

// export default AdminDashboardz;


<body class="bg-indigo-50 min-h-screen overflow-x-hidden">
    <div class="overlay fixed inset-0 bg-indigo-900/50 z-40 hidden opacity-0 transition-opacity duration-300"></div>
    
    <header class="fixed w-full bg-white text-indigo-800 z-50 shadow-lg animate-slide-down">
        <div class="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between h-16">
            <button class="mobile-menu-button p-2 lg:hidden">
                <span class="material-icons-outlined text-2xl">menu</span>
            </button>
            <div class="text-xl font-bold text-blue-900">
                Admin<span class="text-indigo-800">Panel</span>
            </div>
            <div class="flex items-center space-x-2">
                <span class="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">search</span>
                <span class="material-icons-outlined p-2 text-2xl cursor-pointer hover:text-indigo-800 transition-transform duration-300 hover:scale-110 hidden md:block">notifications</span>
                <img class="w-10 h-10 rounded-full transition-transform duration-300 hover:scale-110 object-cover" 
                     src="https://i.pinimg.com/564x/de/0f/3d/de0f3d06d2c6dbf29a888cf78e4c0323.jpg" 
                     alt="Profile">
            </div>
        </div>
    </header>

    <div class="pt-16 max-w-7xl mx-auto flex">
        <aside class="sidebar fixed lg:static w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform -translate-x-full lg:translate-x-0 transition-transform duration-300 z-45 overflow-y-auto p-4">
            <div class="bg-white rounded-xl shadow-lg mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <a href="#" class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                    <span class="material-icons-outlined mr-2">dashboard</span>
                    Home
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                </a>
                <a href="#" class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                    <span class="material-icons-outlined mr-2">tune</span>
                    Some menu item
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                </a>
                <a href="#" class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                    <span class="material-icons-outlined mr-2">file_copy</span>
                    Another menu item
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                </a>
            </div>

            <div class="bg-white rounded-xl shadow-lg p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <a href="#" class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                    <span class="material-icons-outlined mr-2">face</span>
                    Profile
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                </a>
                <a href="#" class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                    <span class="material-icons-outlined mr-2">settings</span>
                    Settings
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                </a>
                <a href="#" class="flex items-center text-gray-600 hover:text-indigo-800 py-4 transition-all duration-300 hover:translate-x-1">
                    <span class="material-icons-outlined mr-2">power_settings_new</span>
                    Log out
                    <span class="material-icons-outlined ml-auto">keyboard_arrow_right</span>
                </a>
            </div>
        </aside>

        <main class="flex-1 p-4">
            <div class="flex flex-col lg:flex-row gap-4 mb-6">
                <div class="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl p-6 animate-fade-in">
                    <h2 class="text-4xl md:text-5xl text-blue-900">
                        Welcome <br><strong>Dash</strong>
                    </h2>
                    <span class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-indigo-800">
                        01:51
                    </span>
                </div>

                <div class="flex-1 bg-blue-100 border border-blue-200 rounded-xl p-6 animate-fade-in">
                    <h2 class="text-4xl md:text-5xl text-blue-900">
                        Inbox <br><strong>23</strong>
                    </h2>
                    <a href="#" class="inline-block mt-8 px-8 py-2 rounded-full text-xl font-bold text-white bg-blue-800 hover:bg-blue-900 transition-transform duration-300 hover:scale-105">
                        See messages
                    </a>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div class="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up" style="animation-delay: 0.1s">
                    <h3 class="text-xl font-bold text-indigo-800">Stats Card 1</h3>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up" style="animation-delay: 0.2s">
                    <h3 class="text-xl font-bold text-indigo-800">Stats Card 2</h3>
                </div>
                <div class="bg-white rounded-xl shadow-lg p-6 h-64 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up" style="animation-delay: 0.3s">
                    <h3 class="text-xl font-bold text-indigo-800">Stats Card 3</h3>
                </div>
            </div>
        </main>
    </div>

    </body>