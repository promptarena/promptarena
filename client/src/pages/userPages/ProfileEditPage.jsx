import React, { useEffect, useMemo } from 'react';
import { useUserProfileStore } from '../../store/userProfileStore';
import ProfileDetails from '../../components/userProfile/ProfileDetails';
import UpdateProfileForm from '../../components/userProfile/UpdateProfileForm';
import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
import UploadProfileImage from '../../components/userProfile/UploadProfileImage';
import ChangePasswordForm from '../../components/userProfile/ChangePasswordForm';
import { motion } from 'framer-motion';

const ProfileEditPage = () => {
  const { fetchUserProfile, user, isLoading } = useUserProfileStore();

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const memoizedUser = useMemo(() => user, [user]);

  const motionProps = useMemo(
    () => ({
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      exit: { opacity: 0 },
    }),
    []
  );

  if (isLoading)
    return (
      <div>
        <LoadingSpinner />
      </div>
    );
  if (!memoizedUser) return <div>User not found.</div>;

  return (
    <motion.div className="container mx-auto p-4" {...motionProps}>
      <h1 className="text-3xl font-bold mb-4">My Profile</h1>
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-6"
        variants={{
          hidden: { transition: { staggerChildren: 0.2 } },
          show: { transition: { staggerChildren: 0.2 } },
        }}
        initial="hidden"
        animate="show"
      >
        <motion.div
          variants={{
            hidden: { opacity: 0, x: -20 },
            show: { opacity: 1, x: 0 },
          }}
          exit={{
            opacity: 0,
            x: -20,
            transition: { duration: 0.3 },
          }}
        >
          <ProfileDetails user={memoizedUser} />
        </motion.div>

        <motion.div
          variants={{
            hidden: { opacity: 0, x: 20 },
            show: { opacity: 1, x: 0 },
          }}
          exit={{
            opacity: 0,
            x: 20,
            transition: { duration: 0.3 },
          }}
        >
          <UpdateProfileForm />
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
        transition={{ delay: 0.6, duration: 0.3 }}
        className="mt-6"
      >
        <UploadProfileImage />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20, transition: { duration: 0.3 } }}
        transition={{ delay: 0.8, duration: 0.3 }}
        className="mt-6"
      >
        <ChangePasswordForm />
      </motion.div>
    </motion.div>
  );
};

export default ProfileEditPage;
