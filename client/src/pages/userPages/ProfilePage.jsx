import React from 'react';
import UserProfilez from '../../components/userProfile/UserProfilez';
import { useAuthStore } from '../../store/authStore';
import { getCurrentSiteUrl } from '../../utils/getCurrentSiteUrl';

const ProfilePage = () => {
  const { user: authUser, isAuthenticated } = useAuthStore();

  return (
    <>
      <UserProfilez
        usernameFromProfilePage={isAuthenticated ? authUser.username : null}
      />
    </>
  );
};

export default ProfilePage;
