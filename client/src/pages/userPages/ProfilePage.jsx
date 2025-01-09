import React from 'react';
import UserProfilez from '../../components/userProfile/UserProfilez';
import { useAuthStore } from '../../store/authStore';
import { getCurrentSiteUrl } from '../../utils/getCurrentSiteUrl';
import Footer from '../../components/global/Footer';

const ProfilePage = () => {
  const { user: authUser, isAuthenticated } = useAuthStore();

  return (
    <>
      <UserProfilez
        usernameFromProfilePage={isAuthenticated ? authUser.username : null}
      />
      <Footer />
    </>
  );
};

export default ProfilePage;
