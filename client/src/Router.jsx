// Import Statements
import React, { Suspense, useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuthStore } from './store/authStore';
import LoadingSpinner from './components/animations/loader/LoadingSpinner';

// Layouts
import UserLayout from './layouts/UserLayout';
import UserAuthLayout from './layouts/UserAuthLayout';

// Common Pages
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';

// Protected Routes
import ProtectedRoute from './routes/ProtectedRoute';
import RedirectAuthenticatedUsers from './routes/RedirectAuthenticatedUsers';
import AdminProtectedRoute from './routes/AdminProtectedRoute';

// User Auth Pages
import LoginPage from './pages/authPages/LoginPage';
import SignUpPage from './pages/authPages/SignUpPage';
import ForgotPasswordPage from './pages/authPages/ForgotPasswordPage';
import ResetPasswordPage from './pages/authPages/ResetPasswordPage';
import EmailVerificationPage from './pages/authPages/EmailVerificationPage';

// Prompt Pages
import FilteredPrompts from './pages/promptPages/FilteredPrompts';
import UserProfile from './components/userProfile/UserProfilez';
import AdminNotificationForm from './components/admin/notifications/AdminNotificationForm';
import AdminBlogList from './components/admin/blog/AdminBlogList';
import AdminBlogForm from './components/admin/blog/AdminBlogForm';
import BlogPage from './pages/BlogPage';
import ModernBlogPost from './components/blog-page/ModernBlogPost';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminUserForm from './components/admin/analytics/AdminUserForm';
import SettingsPage from './pages/userPages/SettingsPage';
import ExplorePage from './pages/ExplorePage';
import ProfilePage from './pages/userPages/ProfilePage';
import AdminDashboardz from './pages/admin/AdminDashboardz';

// Lazy-loaded Pages
const DashboardPage = React.lazy(
  () => import('./pages/userPages/DashboardPage')
);
const ProfileEditPage = React.lazy(
  () => import('./pages/userPages/ProfileEditPagez')
);
const PromptPage = React.lazy(() => import('./pages/promptPages/PromptPage'));
const PromptPagination = React.lazy(
  () => import('./pages/promptPages/PromptPagination')
);
const UpdatePromptForm = React.lazy(
  () => import('./components/prompt/UpdatePromptForm')
);
const PromptDetails = React.lazy(
  () => import('./pages/promptPages/PromptDetailz')
);

export default function Router() {
  const { checkAuth, isCheckingAuth } = useAuthStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 3000);
    checkAuth(); // Check authentication on mount

    return () => clearTimeout(timeout); // Cleanup timeout
  }, [checkAuth]);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        {/* Common Routes */}
        <Route element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path="explore" element={<ExplorePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog/:blogId" element={<ModernBlogPost />} />
          <Route path="/prompt" element={<PromptPagination />} />

          {/* Protected Prompt Routes */}
          <Route
            path="/prompt/create"
            element={
              <ProtectedRoute>
                <PromptPage />
              </ProtectedRoute>
            }
          />
          <Route path="/prompt/:promptId" element={<PromptDetails />} />
          <Route
            path="/prompts/category/:category"
            element={<FilteredPrompts />}
          />
          <Route path="/prompts/tag/:tag" element={<FilteredPrompts />} />

          {/* User Protected Routes */}
          <Route
            path="/profile/dashboard"
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile/edit"
            element={
              <ProtectedRoute>
                <ProfileEditPage />
              </ProtectedRoute>
            }
          />
          <Route path="/profile/username/:username" element={<UserProfile />} />
          <Route
            path="/profile/settings"
            element={
              <ProtectedRoute>
                <SettingsPage />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* Auth Routes */}
        <Route element={<UserAuthLayout />}>
          <Route
            path="/login"
            element={
              <RedirectAuthenticatedUsers>
                <LoginPage />
              </RedirectAuthenticatedUsers>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectAuthenticatedUsers>
                <SignUpPage />
              </RedirectAuthenticatedUsers>
            }
          />
          <Route path="/forget-password" element={<ForgotPasswordPage />} />
          <Route
            path="/reset-password/:token"
            element={<ResetPasswordPage />}
          />
          <Route path="/verify-email" element={<EmailVerificationPage />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute>
              <AdminDashboardz />
            </AdminProtectedRoute>
          }
        />


        <Route
          path="/admin/blog/edit/:blogId"
          element={
            <AdminProtectedRoute>
              <AdminBlogForm />
            </AdminProtectedRoute>
          }
        />
        <Route
          path="/admin/user/:id"
          element={
            <AdminProtectedRoute>
              <AdminUserForm />
            </AdminProtectedRoute>
          }
        />

        {/* Custom 404 Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
  );
}

// import React, { Suspense, useEffect, useState } from 'react';
// import { Routes, Route } from 'react-router-dom';
// import { useAuthStore } from './store/authStore';
// import LoadingSpinner from './components/animations/loader/LoadingSpinner';

// // Layouts
// import UserLayout from './layouts/UserLayout';
// import UserAuthLayout from './layouts/UserAuthLayout';

// // Common Pages
// import HomePage from './pages/HomePage';
// import AboutPage from './pages/AboutPage';
// import ContactPage from './pages/ContactPage';
// import NotFoundPage from './pages/NotFoundPage';

// // Protected Routes
// import ProtectedRoute from './routes/ProtectedRoute';
// import RedirectAuthenticatedUsers from './routes/RedirectAuthenticatedUsers';
// import AdminProtectedRoute from './routes/AdminProtectedRoute';

// // User Auth Pages
// import LoginPage from './pages/authPages/LoginPage';
// import SignUpPage from './pages/authPages/SignUpPage';
// import ForgotPasswordPage from './pages/authPages/ForgotPasswordPage';
// import ResetPasswordPage from './pages/authPages/ResetPasswordPage';
// import EmailVerificationPage from './pages/authPages/EmailVerificationPage';

// // Prompt Pages
// import FilteredPrompts from './pages/promptPages/FilteredPrompts';
// // import UserProfile from './components/userProfile/UserProfile';
// import UserProfile from './components/userProfile/UserProfilez';
// import AdminNotificationForm from './components/admin/notifications/AdminNotificationForm';
// import AdminBlogList from './components/admin/blog/AdminBlogList';
// import AdminBlogForm from './components/admin/blog/AdminBlogForm';
// import BlogPage from './pages/BlogPage';
// import BlogDetailsPage from './pages/BlogDetailsPage';
// import AdminDashboard from './pages/admin/AdminDashboard';
// import AdminUserForm from './components/admin/analytics/AdminUserForm';
// import SettingsPage from './pages/userPages/SettingsPage';
// import ExplorePage from './pages/ExplorePage';
// import ProfilePage from './pages/userPages/ProfilePage';
// import ModernBlogPost from './components/blog-page/ModernBlogPost';
// import PromptList from './components/prompt/PromptList';

// // Lazy-loaded User Pages
// const DashboardPage = React.lazy(
//   () => import('./pages/userPages/DashboardPage')
// );
// const ProfileEditPage = React.lazy(
//   () => import('./pages/userPages/ProfileEditPagez')
// );
// const PromptPage = React.lazy(() => import('./pages/promptPages/PromptPage'));
// const PromptPagination = React.lazy(
//   () => import('./pages/promptPages/PromptPagination')
// );
// // const PromptList = React.lazy(() => import('./components/prompt/PromptList'));
// const UpdatePromptForm = React.lazy(
//   () => import('./components/prompt/UpdatePromptForm')
// );
// const PromptDetails = React.lazy(
//   () => import('./pages/promptPages/PromptDetailz')
// );

// export default function Router() {
//   const { checkAuth, isCheckingAuth } = useAuthStore();
//   const [showSpinner, setShowSpinner] = useState(true);

//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       setShowSpinner(false); // Hide spinner after a minimum duration
//     }, 3000); // Adjust the duration as needed

//     checkAuth(); // Check authentication on mount

//     return () => clearTimeout(timeout); // Cleanup timeout on unmount
//   }, [checkAuth]);

//   // useEffect(() => {
//   //   checkAuth(); // Check authentication on mount
//   // }, [checkAuth]);

//   // Show loading spinner while checking authentication
//   if (isCheckingAuth) {
//     return <LoadingSpinner />;
//   }

//   // Show loading spinner while checking authentication
//   if (isCheckingAuth || showSpinner) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <Suspense fallback={<LoadingSpinner />}>
//       <Routes>
//         {/* Common Routes */}
//         <Route element={<UserLayout />}>
//           <Route index element={<HomePage />} />
//           <Route path="explore" element={<ExplorePage />} />

//           <Route path="about" element={<AboutPage />} />
//           <Route path="contact" element={<ContactPage />} />

//           <Route path="blog" element={<BlogPage />} />
//           <Route path="blog/:blogId" element={<ModernBlogPost />} />
//           {/* <Route path="blog/:blogId" element={<BlogDetailsPage />} /> */}
//           {/* Prompt Routes */}
//           <Route path="/prompt" element={<PromptPagination />} />

//           <Route
//             path="/prompt/create"
//             element={
//               <ProtectedRoute>
//                 <PromptPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/prompt/:promptId" element={<PromptDetails />} />
//           {/* Filtered Prompts */}
//           <Route
//             path="/prompts/category/:category"
//             element={<FilteredPrompts />}
//           />
//           <Route path="/prompts/tag/:tag" element={<FilteredPrompts />} />

//           {/* User Protected Routes */}
//           <Route
//             path="/profile/dashboard"
//             element={
//               <ProtectedRoute>
//                 <DashboardPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="profile"
//             element={
//               <ProtectedRoute>
//                 <ProfilePage />
//               </ProtectedRoute>
//             }
//           />
//           <Route
//             path="profile/edit"
//             element={
//               <ProtectedRoute>
//                 <ProfileEditPage />
//               </ProtectedRoute>
//             }
//           />
//           <Route path="/profile/username/:username" element={<ProfilePage />} />
//           <Route
//             path="/profile/settings"
//             element={
//               <ProtectedRoute>
//                 <SettingsPage />
//               </ProtectedRoute>
//             }
//           />
//         </Route>

//         {/* Auth Routes */}
//         <Route element={<UserAuthLayout />}>
//           <Route
//             path="/login"
//             element={
//               <RedirectAuthenticatedUsers>
//                 <LoginPage />
//               </RedirectAuthenticatedUsers>
//             }
//           />
//           <Route
//             path="/signup"
//             element={
//               <RedirectAuthenticatedUsers>
//                 <SignUpPage />
//               </RedirectAuthenticatedUsers>
//             }
//           />
//           <Route path="/forget-password" element={<ForgotPasswordPage />} />
//           <Route
//             path="/reset-password/:token"
//             element={<ResetPasswordPage />}
//           />
//           <Route path="/verify-email" element={<EmailVerificationPage />} />
//         </Route>

//         <Route
//           path="/prompt/update/:promptId"
//           element={
//             <ProtectedRoute>
//               <UpdatePromptForm />
//             </ProtectedRoute>
//           }
//         />
//         {/* <Route path="/prompt/:promptId" element={<PromptDetails />} /> */}

//         {/* Admin Routes */}
//         <Route
//           path="/admin"
//           element={
//             <AdminProtectedRoute>
//               <AdminDashboard />
//             </AdminProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/notification"
//           element={
//             <AdminProtectedRoute>
//               <AdminNotificationForm />
//             </AdminProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/blog"
//           element={
//             <AdminProtectedRoute>
//               <AdminBlogList />
//             </AdminProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/blog/create"
//           element={
//             <AdminProtectedRoute>
//               <AdminBlogForm />
//             </AdminProtectedRoute>
//           }
//         />
//         <Route
//           path="/admin/blog/edit/:blogId"
//           element={
//             <AdminProtectedRoute>
//               <AdminBlogForm />
//             </AdminProtectedRoute>
//           }
//         />

//         <Route path="/admin/user/:id" element={<AdminUserForm />} />

//         {/* Custom 404 Page */}
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </Suspense>
//   );
// }
