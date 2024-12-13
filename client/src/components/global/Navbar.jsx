import React, { useState, memo, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useLocation, Link } from 'react-router-dom';
import { MemoizedSearchBar } from '../framer-motion/ui/SearchBar';
import { siteName } from '../../config/envConfig';
import { useAuthStore } from '../../store/authStore';
import NotificationBell from './NotificationBell';
import ProfileDropdown from '../base/ProfileDropdown';
import '../../assets/css/base/font.css';
import EventLoggingButton from './EventLoggingButton';

const Navbar = ({ isAuthenticated }) => {
  const { isLoading, user, logout } = useAuthStore();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Logout handler
  const handleLogout = useCallback(() => {
    logout();
  }, [logout]);

  // Links array for consistency
  const links = ['/', '/explore', '/blog', '/about', '/contact'];

  // Render links as a function
  const renderLinks = type => {
    return links.map((path, index) => {
      const isActive = location.pathname === path;
      const commonClasses =
        'text-neutral-200 rounded-lg transition-colors duration-200';
      const activeClasses = 'bg-neutral-500/50 ring-[1px] ring-neutral-600';
      const baseClasses =
        type === 'desktop' ? 'px-3 py-1.5 text-sm' : 'px-4 py-2 text-base';

      return (
        <motion.div
          key={index}
          whileHover="hover"
          className={`${commonClasses} ${isActive ? activeClasses : ''} ${baseClasses}`}
        >
          <Link
            to={path}
            onClick={() => type === 'mobile' && setMenuOpen(false)}
          >
            {
              <EventLoggingButton
                category="navbar"
                action="navigate"
                label={`${path === '/' ? 'home' : path.slice(1)}`}
              >
                {path === '/'
                  ? 'Home'
                  : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
              </EventLoggingButton>
            }
          </Link>
        </motion.div>
      );
    });
  };

  // Hamburger menu icon animation
  const hamburgerMenu = (
    <>
      <motion.div
        animate={menuOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
        className="w-6 h-1 bg-white transition-all duration-300"
      />
      <motion.div
        animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
        className="w-6 h-1 bg-white my-1 transition-opacity duration-300"
      />
      <motion.div
        animate={menuOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
        className="w-6 h-1 bg-white transition-all duration-300"
      />
    </>
  );

  return (
    <div className="sticky top-0 left-0 right-0 z-50">
      <div className="w-full flex items-start justify-center pt-4 sm:px-4 px-1">
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
          className="w-full max-w-7xl 2xl:max-w-[90rem] bg-plain-black-background/0 backdrop-blur-xl border-[0.5px] border-neutral-200 rounded-2xl px-5 md:px-6 py-3.5 flex items-center justify-between"
          role="navigation"
          aria-label="Main Navigation"
        >
          {/* Left Section */}
          <div className="flex items-center gap-6">
            {/* Hamburger for Mobile */}
            <div className="lg:hidden">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="text-neutral-200 focus:outline-none"
                aria-label="Toggle Menu"
              >
                {hamburgerMenu}
              </button>
            </div>
            {/* Links - Visible on larger screens */}
            <div className="hidden lg:flex items-center gap-6">
              {renderLinks('desktop')}
            </div>
          </div>

          {/* Center Logo */}
          <div className="absolute left-1/2 block transform -translate-x-[65%] md:-translate-x-1/2">
            <span className="text-white text-2xl tracking-widest font-anton text-shadow">
              <Link to="/">{siteName}</Link>
            </span>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-2 sm:gap-4">
            {isAuthenticated ? (
              <>
                <NotificationBell />
                <ProfileDropdown user={user} handleLogout={handleLogout} />
              </>
            ) : (
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-1.5 rounded-lg transition-colors duration-200"
              >
                <Link to="/login">
                  <EventLoggingButton
                    category="navbar"
                    action="navigate"
                    label="login-button"
                  >
                    Login
                  </EventLoggingButton>
                </Link>
              </motion.div>
            )}
          </div>

          {/* Mobile Menu */}
          <motion.div
            className={`lg:hidden absolute top-[calc(100%+0.5rem)] left-0 w-full bg-neutral-900 border-[1px] border-neutral-200 p-6 rounded-b-lg shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] ${
              menuOpen ? 'block' : 'hidden'
            }`}
            initial={{ opacity: 0, x: '-100%' }}
            animate={
              menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }
            }
            transition={{ duration: 0.4 }}
          >
            <div className="flex flex-col gap-4">{renderLinks('mobile')}</div>
          </motion.div>
        </motion.nav>
      </div>
    </div>
  );
};

export default memo(Navbar);

// // src/components/global/Navbar.js
// import React, { useState, useMemo, memo, useCallback } from 'react';
// import { motion } from 'framer-motion';
// import { useLocation, Link } from 'react-router-dom';
// import { MemoizedSearchBar } from '../framer-motion/ui/SearchBar';
// import { siteName } from '../../config/envConfig';
// import { useAuthStore } from '../../store/authStore';
// import NotificationBell from './NotificationBell';
// import ProfileDropdown from '../base/ProfileDropdown';

// const Navbar = ({ isAuthenticated }) => {
//   const { isLoading, user, logout } = useAuthStore();
//   const location = useLocation();
//   const [menuOpen, setMenuOpen] = useState(false);

//   // Logout handler
//   const handleLogout = useCallback(() => {
//     logout();
//   }, [logout]);

//   // Desktop Links Memoized
//   const desktopLinks = useMemo(
//     () =>
//       ['/', '/explore', '/blog', '/about', '/contact'].map((path, index) => (
//         <motion.div
//           key={index}
//           whileHover="hover"
//           className={
//             location.pathname === path
//               ? 'text-neutral-200 text-sm bg-neutral-500/50 ring-[1px] ring-neutral-600 px-4 py-1.5 rounded-lg transition-colors duration-200'
//               : 'text-neutral-200 text-sm px-3 py-1.5 rounded-lg transition-colors duration-200'
//           }
//         >
//           <Link to={path}>
//             {path === '/'
//               ? 'Home'
//               : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
//           </Link>
//         </motion.div>
//       )),
//     [location.pathname]
//   );

//   // Mobile Links Memoized
//   const mobileLinks = useMemo(
//     () => (
//       <div className="flex flex-col gap-4">
//         {['/', '/explore', '/about', '/blog', '/contact'].map((path, index) => (
//           <Link
//             key={index}
//             to={path}
//             onClick={() => setMenuOpen(false)}
//             className={
//               location.pathname === path
//                 ? 'text-neutral-200 bg-neutral-500/50 ring-[1px] ring-neutral-600 px-4 py-2 rounded-lg'
//                 : 'text-neutral-200 px-4 py-2 rounded-lg'
//             }
//           >
//             {path === '/home'
//               ? 'Home'
//               : path.slice(1).charAt(0).toUpperCase() + path.slice(2)}
//           </Link>
//         ))}
//       </div>
//     ),
//     [location.pathname]
//   );

//   // Hamburger menu icon animation
//   const hamburgerMenu = (
//     <>
//       <motion.div
//         animate={menuOpen ? { rotate: 45 } : { rotate: 0 }}
//         className="w-6 h-1 bg-white mb-1 transition-transform duration-300"
//       />
//       <motion.div
//         animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
//         className="w-6 h-1 bg-white mb-1 transition-opacity duration-300"
//       />
//       <motion.div
//         animate={menuOpen ? { rotate: -45 } : { rotate: 0 }}
//         className="w-6 h-1 bg-white transition-transform duration-300"
//       />
//     </>
//   );

//   return (
//     <div className="sticky top-0 left-0 right-0 z-50">
//       <div className="w-full flex items-start justify-center pt-4 px-4">
//         <motion.nav
//           initial={{ opacity: 0, y: -20 }}
//           animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
//           className="w-full max-w-7xl bg-plain-black-background/0 backdrop-blur-xl border border-neutral-600 rounded-2xl px-6 py-3.5 flex items-center justify-between lg:justify-between"
//         >
//           {/* Left Section */}
//           <div className="flex items-center gap-6">
//             {/* Hamburger for Mobile */}
//             <div className="lg:hidden">
//               <button
//                 onClick={() => setMenuOpen(!menuOpen)}
//                 className="text-neutral-200 focus:outline-none"
//               >
//                 {hamburgerMenu}
//               </button>
//             </div>
//             {/* Links - Visible on larger screens */}
//             <div className="hidden lg:flex items-center gap-6">
//               {desktopLinks}
//             </div>
//           </div>

//           {/* Center Logo */}
//           <div className="absolute left-1/2 block transform -translate-x-[65%] md:-translate-x-1/2">
//             <span className="text-white text-2xl font-semibold font-jetbrains-mono text-shadow">
//               <Link to="/">{siteName}</Link>
//             </span>
//           </div>

//           {/* Right Section */}
//           <div className="flex items-center gap-4">
//             {/* Auth Button */}
//             {isAuthenticated ? (
//               <>
//                 <NotificationBell />
//                 <ProfileDropdown user={user} handleLogout={handleLogout} />
//               </>
//             ) : (
//               <motion.div
//                 whileHover={{ scale: 1.02 }}
//                 whileTap={{ scale: 0.98 }}
//                 className="bg-indigo-600 hover:bg-indigo-500 text-white text-sm px-4 py-1.5 rounded-lg transition-colors duration-200"
//               >
//                 <Link to="/login">Log in</Link>
//               </motion.div>
//             )}
//           </div>

//           {/* Mobile Menu */}
//           <motion.div
//             className="lg:hidden absolute top-16 left-0 w-full bg-neutral-800 p-6"
//             initial={{ opacity: 0, x: '-100%' }}
//             animate={
//               menuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '-100%' }
//             }
//             transition={{ duration: 0.4 }}
//           >
//             {mobileLinks}
//           </motion.div>
//         </motion.nav>
//       </div>
//     </div>
//   );
// };

// export default memo(Navbar);
