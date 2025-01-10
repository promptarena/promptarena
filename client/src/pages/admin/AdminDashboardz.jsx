import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import {
  DollarSign,
  Users,
  FileText,
  Star,
  MessageCircle,
  CircleXIcon,
  X,
  Menu,
  Plus,
  ChartBar,
  Bot,
  BotOff,
} from 'lucide-react';
import AdminNotificationForm from '../../components/admin/notifications/AdminNotificationForm';
import AdminBlogForm from '../../components/admin/blog/AdminBlogForm';
import ThemeSwitcher from '../../components/base/ThemeSwitcher';
import AdminBlogList from '../../components/admin/blog/AdminBlogList';
import { formatDate } from '../../utils/date';
import toast from 'react-hot-toast';
import useAlert from '../../hooks/useAlert';
import Sidebar from '../../components/admin/common/SideBar';
import ProfileDropdown from '../../components/base/ProfileDropdown';
import HeaderBar from '../../components/admin/common/HeaderBar';
import ProfileDetails from '../../components/userProfile/ProfileDetails';
import UpdateProfileForm from '../../components/userProfile/UpdateProfileForm';
import ChangePasswordForm from '../../components/userProfile/ChangePasswordForm';
import AdminChatBOT from '../../components/admin/common/AdminChatBOT';

const AdminDashboardz = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isAISidebarOpen, setAISidebarOpen] = useState(false);
  const [activeMenuItem, setActiveMenuItem] = useState('Dashboard');
  const sidebarRef = useRef(null);

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

  const COLORS = ['#AB78E1', '#00C49F', '#FFBB28', '#FF8042'];

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-red-500">{error}</div>;

  const menuItems = [
    {
      title: 'Main',
      links: [
        { label: 'Dashboard', value: 'Dashboard' },
        { label: 'Create Blog', value: 'Create Blog' },
        { label: 'View Blogs', value: 'View Blogs' },
        { label: 'Notifications', value: 'Notifications' },
        { label: 'User Management', value: 'User Management' },
      ],
    },
    {
      title: 'Profile',
      links: [
        { label: 'Profile Details', value: 'Profile Details' },
        {
          label: 'Update Profile Info',
          value: 'Update Profile Info',
        },
        { label: 'Change Password', value: 'Change Password' },
      ],
    },
  ];

  const renderContent = () => {
    switch (activeMenuItem) {
      case 'Profile Details':
        return (
          <div className="glass-panel rounded-xl">
            <div className="bg-indigo-400 border border-indigo-200 rounded-xl p-6">
              <h2 className="text-3xl font-semibold mb-6">Profile Details</h2>
              <ProfileDetails user={user} />
            </div>
          </div>
        );
      case 'Dashboard':
        return (
          <div className="glass-panel rounded-xl">
            <div className="flex flex-col lg:flex-row gap-4 mb-6">
              <div className="flex-1 bg-indigo-100 border border-indigo-200 rounded-xl animate-fade-in">
                <div className="bg-[#1f1f1f] rounded-xl shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up">
                  <div className="bg-gray-800 bg-opacity-50 rounded-lg border p-5 border-gray-700">
                    <div className="flex items-center mb-2">
                      <Users className="w-6 h-6 text-purple-400" />
                      <h3 className="text-xl font-semibold text-purple-400 ml-2">
                        User Analytics
                      </h3>
                    </div>
                    <p className="text-gray-300">
                      Total Users: {analytics?.userAnalytics?.totalUsers}
                    </p>
                    <p className="text-gray-300">
                      New Users (Last 30 Days):{' '}
                      {analytics?.userAnalytics?.newUsers}
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
                              value:
                                analytics?.userAnalytics?.sellersCount || 0,
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
                </div>
              </div>

              <div className="flex-1 bg-[#1f1f1f] border border-blue-200 rounded-xl animate-fade-in">
                {/* Prompt Analytics */}
                <div className="bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 p-4">
                  <div className="flex items-center mb-4">
                    <MessageCircle className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-semibold text-purple-400 ml-2">
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
                              analytics?.notificationAnalytics
                                ?.totalNotifications || 0,
                          },
                          {
                            name: 'Read',
                            value:
                              analytics?.notificationAnalytics
                                ?.readNotifications || 0,
                          },
                        ]}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#FFBB28"
                        label
                      >
                        <Cell fill="#FFBB28" />
                        <Cell fill="#AB78E1" />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="bg-[#1f1f1f] rounded-lg border border-gray-700 p-4">
                <div className="flex items-center mb-2">
                  <Star className="w-6 h-6 text-purple-400" />
                  <h3 className="text-xl font-semibold text-purple-400 ml-2">
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
                      fill="#9434EA"
                      label
                    >
                      <Cell fill="#9434EA" />
                      <Cell fill="#AB78E1" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-[#1f1f1f] rounded-xl col-span-2 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl animate-slide-up">
                <div className=" bg-opacity-50 rounded-lg border border-gray-700 p-4">
                  <div className="flex items-center mb-2">
                    <FileText className="w-6 h-6 text-purple-400" />
                    <h3 className="text-xl font-semibold text-purple-400 ml-2">
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
                          value:
                            analytics?.promptAnalytics?.inactivePrompts || 0,
                        },
                        {
                          name: 'New',
                          value:
                            analytics?.promptAnalytics
                              ?.promptsCreatedLast30Days || 0,
                        },
                      ]}
                    >
                      <CartesianGrid stroke="#ccc" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#AB78E1" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          </div>
        );
      case 'Create Blog':
        return (
          <div className="glass-panel rounded-xl">
            <div className="bg-indigo-100 border border-indigo-200 rounded-xl p-6">
              <AdminBlogForm />
            </div>
          </div>
        );
      case 'View Blogs':
        return (
          <div className="glass-panel rounded-xl">
            <div className="bg-indigo-200 border border-indigo-200 rounded-xl p-6">
              <h2 className="text-3xl font-semibold mb-6">View All Blogs</h2>
              <AdminBlogList />
            </div>
          </div>
        );
      case 'Notifications':
        return (
          <div className="glass-panel rounded-xl">
            <div className="bg-indigo-300 border border-indigo-200 rounded-xl p-6">
              <h2 className="text-3xl font-semibold mb-6">Notifications</h2>
              <AdminNotificationForm />
            </div>
          </div>
        );
      case 'User Management':
        return (
          <div className="bg-indigo-400 border border-indigo-200 rounded-xl p-6">
            <h2 className="text-2xl font-semibold mb-4">User Management</h2>
            <div className="md:overflow-hidden md:w-full sm:w-[75%] 3sm:w-[90%] 2xs:w-[45%] w-[40%] md:p-0 p-2 overflow-x-scroll">
              <table className="table-auto w-full bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700">
                <thead>
                  <tr>
                    <th className="px-4 py-2 text-plain-white-background border">
                      No.
                    </th>
                    <th className="px-4 py-2 text-plain-white-background border">
                      Username
                    </th>
                    <th className="px-4 py-2 text-plain-white-background border">
                      Email
                    </th>
                    <th className="px-4 py-2 text-plain-white-background border">
                      Profile
                    </th>
                    <th className="px-4 py-2 text-plain-white-background border">
                      Role
                    </th>
                    <th className="px-4 py-2 text-plain-white-background border">
                      Actions
                    </th>
                    <th className="px-4 py-2 text-plain-white-background border">
                      Change Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user._id}>
                      <td className="border text-plain-white-background px-4 py-2">
                        {users.indexOf(user) + 1}
                      </td>
                      <td className="border text-plain-white-background px-4 py-2">
                        {user.username}
                      </td>
                      <td className="border text-plain-white-background px-4 py-2">
                        {user.email}
                      </td>
                      <td className="border text-plain-white-background p-1">
                        {user.profileImage ? (
                          <img
                            src={user.profileImage}
                            alt={user.username}
                            className="rounded size-24 aspect-square"
                          />
                        ) : (
                          'N/A'
                        )}
                      </td>
                      <td className="border text-plain-white-background px-4 py-2">
                        {user.role}
                      </td>
                      <td className="border px-2 py-2">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleDeleteUser(user._id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                          >
                            Delete
                          </button>
                          <button>
                            <Link
                              to={`/profile/username/${user.username}`}
                              className="bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
                            >
                              View
                            </Link>
                          </button>
                        </div>
                      </td>
                      <td className="border px-2 py-2">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleUpdateUser(user._id, 'buyer')}
                            className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600"
                          >
                            Buyer
                          </button>
                          <button
                            onClick={() => handleUpdateUser(user._id, 'seller')}
                            className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600"
                          >
                            Seller
                          </button>
                          <button
                            onClick={() => handleUpdateUser(user._id, 'admin')}
                            className="bg-blue-500 text-white px-2 py-2 rounded-md hover:bg-blue-600"
                          >
                            Admin
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'Update Profile Info':
        return (
          <div className="glass-panel rounded-xl">
            <div className="bg-indigo-400 border border-indigo-200 rounded-xl p-6">
              <h2 className="text-3xl font-semibold mb-6">
                Update Profile Info
              </h2>
              <UpdateProfileForm />
            </div>
          </div>
        );
      case 'Change Password':
        return (
          <div className="glass-panel rounded-xl">
            <div className="bg-indigo-400 border border-indigo-200 rounded-xl p-6">
              <h2 className="text-3xl font-semibold mb-6">Change Password</h2>
              <ChangePasswordForm />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      <body className="bg-indigo-50 min-h-screen overflow-x-hidden">
        <div className="overlay fixed inset-0 bg-indigo-900/50 z-40 hidden opacity-0 transition-opacity duration-300"></div>

        <HeaderBar user={user} handleLogout={handleLogout} />

        <div className="pt-16 relative max-w-7xl mx-auto flex">
          {/* <Sidebar /> */}

          <button
            className="lg:hidden fixed top-4 left-4 z-50 bg-indigo-600 text-white p-2 rounded-md shadow-lg focus:outline-none"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          <aside
            ref={sidebarRef}
            className={`fixed lg:static inset-x-0 w-[240px] bg-indigo-50 h-[calc(100vh-4rem)] lg:h-auto transform ${
              isSidebarOpen
                ? 'translate-x-0 shadow-lg p-4'
                : '-translate-x-full shadow-none p-0 mt-4'
            } lg:translate-x-0 transition-transform duration-300 z-40 overflow-y-auto`}
          >
            {menuItems.map((item, index) => (
              <div
                key={index}
                className="bg-white text-black rounded-xl shadow-md mb-6 p-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  {item.title}
                </h3>
                {item.links.map((item, index) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      setActiveMenuItem(item.value);
                      setSidebarOpen(false);
                    }}
                    className={`flex items-center w-full py-2.5 rounded px-2 font-semibold ${
                      activeMenuItem === item.value
                        ? 'bg-indigo-100 text-indigo-900 dark:bg-dark-surface dark:text-dark-text border dark:border-dark-disabled'
                        : 'hover:text-indigo-900 dark:hover:text-dark-primary hover:bg-gray-100 dark:hover:bg-dark-background'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            ))}
            <div>
              <div className="mt-4 flex justify-center">
                <button
                  onClick={handleLogout}
                  className="py-3 px-4 bg-gradient-to-r from-purple-500 to-purple-600 text-white font-bold rounded-lg shadow-lg hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-900"
                >
                  Logout
                </button>
              </div>
              <div className="mt-4 flex justify-center">
                <ThemeSwitcher />
              </div>
            </div>
            <button
              className="lg:hidden float-right text-gray-600 hover:text-gray-900 focus:outline-none"
              onClick={() => setSidebarOpen(false)}
            >
              <X size={24} />
            </button>
          </aside>

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex-1 p-4"
          >
            {renderContent()}
          </motion.main>

          <aside
            className={`fixed lg:static inset-x-0 w-auto md:w-[340px] rounded-xl h-[calc(100vh-4rem)] lg:h-auto transform ${
              isAISidebarOpen ? 'hidden' : 'translate-x-0 shadow-none p-0 mt-4 '
            } lg:translate-x-0 transition-transform duration-300 z-40 overflow-y-auto`}
          >
            <AdminChatBOT />
          </aside>
        </div>
        <button
          onClick={() => setAISidebarOpen(!isAISidebarOpen)}
          className="fixed bottom-2 right-0 text-stone-50 bg-purple-500 p-3 rounded shadow-lg hover:bg-purple-700 focus:outline-none z-50"
        >
          {isAISidebarOpen ? <Bot size={24} /> : <BotOff size={24} />}
          
        </button>
      </body>
      {AlertModalComponent}
    </div>
  );
};

export default AdminDashboardz;
