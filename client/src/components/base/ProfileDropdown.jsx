import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaUserCircle,
  FaCog,
  FaQuestionCircle,
  FaSignOutAlt,
} from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Edit } from 'lucide-react';
import { getOptimizedImageUrl } from '../../utils/imageOptimizer';

const ProfileDropdown = ({ user, handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  // Close the dropdown when clicking outside of it
  useEffect(() => {
    const handleClickOutside = event => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const dropdownVariants = {
    open: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
        staggerChildren: 0.1,
      },
    },
    closed: {
      opacity: 0,
      scale: 0.9,
      y: -10,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
      },
    },
  };

  const animatedDropdown = useMemo(
    () => (
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial="closed"
            animate="open"
            exit="closed"
            variants={dropdownVariants}
            className="absolute top-20 right-0 w-full max-w-sm bg-white dark:bg-dark-background p-3 rounded-lg divide-y divide-gray-200 border-t-2 border-l-2 border-cyber-purple ring-1 dark:divide-gray-800 shadow-[5px_5px_0px_0px_rgba(109,40,217)]"
          >
            {/* Header */}
            <div
              aria-label="header"
              className="flex items-center space-x-4 p-4"
            >
              <img
                src={
                  user.profileImage
                    ? getOptimizedImageUrl(user.profileImage)
                    : null
                }
                alt={user.username || user.name}
                className="w-16 h-16 rounded-full border-2 border-primary animate-pulse"
              />
              <div className="flex flex-col flex-1 truncate">
                <div className="text-xl font-medium text-gray-900 dark:text-white">
                  {user.name}
                </div>
                <p className="text-gray-500 dark:text-gray-400">{user.email}</p>
              </div>
              <Link to={'/profile/settings'} onClick={() => setIsOpen(false)}>
                <FaCog className="w-6 h-6 text-gray-400 dark:text-gray-500" />
              </Link>
            </div>

            {/* Navigation Links */}
            <div aria-label="navigation" className="py-2 space-y-1">
              <motion.span
                whileHover={{ scale: 1.03, backgroundColor: '#e5e7eb' }}
              >
                <Link
                  to={'/profile'}
                  className="flex items-center py-2 px-4 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-all duration-150 ease-in-out"
                  onClick={() => setIsOpen(false)}
                >
                  <FaUserCircle className="w-6 h-6 text-cyan-500" />
                  <span className="ml-3">View Profile</span>
                </Link>
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.03, backgroundColor: '#e5e7eb' }}
              >
                <Link
                  to={'/profile/edit'}
                  className="flex items-center py-2 px-4 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-all duration-150 ease-in-out"
                  onClick={() => setIsOpen(false)}
                >
                  <Edit className="w-6 h-6 text-green-500" />
                  <span className="ml-3">Edit Profile</span>
                </Link>
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.03, backgroundColor: '#e5e7eb' }}
              >
                <Link
                  to={'/profile/dashboard'}
                  className="flex items-center py-2 px-4 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-all duration-150 ease-in-out"
                  onClick={() => setIsOpen(false)}
                >
                  <FaQuestionCircle className="w-6 h-6 text-yellow-500" />
                  <span className="ml-3">Dashboard</span>
                </Link>
              </motion.span>
              <motion.span
                whileHover={{ scale: 1.03, backgroundColor: '#e5e7eb' }}
              >
                <Link
                  to={'/profile/settings'}
                  className="flex items-center py-2 px-4 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-all duration-150 ease-in-out"
                  onClick={() => setIsOpen(false)}
                >
                  <FaCog className="w-6 h-6 text-blue-500" />
                  <span className="ml-3">Settings</span>
                </Link>
              </motion.span>
              <motion.a
                href="/"
                whileHover={{ scale: 1.03, backgroundColor: '#e5e7eb' }}
                className="flex items-center py-2 px-4 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-all duration-150 ease-in-out"
                onClick={() => setIsOpen(false)}
              >
                <FaQuestionCircle className="w-6 h-6 text-pink-500" />
                <span className="ml-3">Helper Center</span>
              </motion.a>
            </div>

            <div aria-label="footer" className="pt-2">
              <motion.button
                type="button"
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                whileHover={{ scale: 1.05, backgroundColor: '#e5e7eb' }}
                className="flex items-center w-full py-3 px-4 text-lg text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition-all duration-150 ease-in-out"
              >
                <FaSignOutAlt className="w-6 h-6 text-red-500" />
                <span className="ml-3">Logout</span>
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    ),
    [isOpen, user, handleLogout]
  );

  return (
    <div
      className="flex items-center justify-center box-border"
      ref={dropdownRef}
    >
      <div
        onClick={toggleDropdown}
        className="flex items-center cursor-pointer space-x-2 px-1 py-[3px] box-border bg-indigo-600 hover:bg-indigo-500 rounded-full"
      >
        <img
          src={getOptimizedImageUrl(user.profileImage, {
            w: 50,
            h: 50,
            q: 'auto',
          })}
          alt={user.username}
          className="w-10 h-10 rounded-full"
        />

        {window.innerWidth > 768 && (
          <span className="font-medium text-text dark:text-dark-text">
            {user.username.length > 8
              ? `${user.username.slice(0, 8)}...`
              : user.username}
          </span>
        )}
      </div>

      {animatedDropdown}
    </div>
  );
};

export default React.memo(ProfileDropdown);