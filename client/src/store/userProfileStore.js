import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import toast from 'react-hot-toast';

export const useUserProfileStore = create((set, get) => ({
  user: null,
  isLoading: false,
  error: null,
  uploadProgress: 0,
  followers: [], // Array to store followers of a specific user
  following: [], // Array to store users that a specific user is following
  isLoadingFollowers: false, // Loading state for followers
  isLoadingFollowing: false, // Loading state for following

  fetchUserProfile: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/user/profile');
      handleResponse(response, data => set({ user: data, isLoading: false }));
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  fetchUserProfileByUsername: async username => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get(`/user/profile/${username}`);
      handleResponse(response, data => set({ user: data, isLoading: false }));
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  updateUserProfile: async (name, bio, phoneNumber) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put('/user/profile', {
        name,
        bio,
        phoneNumber,
      });

      handleResponse(response, data => {
        set({ user: data, isLoading: false });
        toast.success('Profile updated successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
  uploadProfileImage: async imageData => {
    set({ isLoading: true, error: null, uploadProgress: 0 });
    try {
      const formData = new FormData();
      formData.append('profileImage', imageData);

      const response = await axiosInstance.post(
        '/user/profile/image',
        formData,
        {
          onUploadProgress: progressEvent => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            set({ uploadProgress: progress });
          },
        }
      );

      console.log('response for update profile image ', response);

      handleResponse(response, data => {
        set({ user: data, isLoading: false, uploadProgress: 100 });
        toast.success('Profile image updated!');
      });
    } catch (error) {
      console.log('error: ', error);
      handleError(error, message =>
        set({ error: message, isLoading: false, uploadProgress: 0 })
      );
      throw error;
    }
  },
  changePassword: async (oldPassword, newPassword) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.put('/user/profile/password', {
        oldPassword,
        newPassword,
      });
      handleResponse(response, () => {
        set({ isLoading: false });
        toast.success('Password changed successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
      throw error;
    }
  },
  deleteUserProfile: async password => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete('/user/profile', {
        data: {
          password,
        },
      });
      handleResponse(response, () => {
        set({ isLoading: false, user: null });
        toast.success('Account deleted successfully!');
      });
    } catch (error) {
      console.error('Error deleting account:', error);
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
  followUser: async userIdToFollow => {
    try {
      await axiosInstance.post(`/user/profile/${userIdToFollow}/follow`);
      // Refetch user profile (of the user who performed the follow action)
      get().fetchUserProfile();
      // Update followers list for the followed user (optional)
      if (get().user && get().user._id === userIdToFollow) {
        get().fetchFollowers(userIdToFollow);
      }
      toast.success('User followed successfully!');
    } catch (error) {
      handleError(error, message => set({ error: message }));
      toast.error('Error following user');
    }
  },

  unfollowUser: async userIdToUnfollow => {
    try {
      await axiosInstance.post(`/user/profile/${userIdToUnfollow}/unfollow`);
      // Refetch user profile (of the user who performed the unfollow action)
      get().fetchUserProfile();
      // Update followers list for the unfollowed user (optional)
      if (get().user && get().user._id === userIdToUnfollow) {
        get().fetchFollowers(userIdToUnfollow);
      }
      toast.success('User unfollowed successfully!');
    } catch (error) {
      handleError(error, message => set({ error: message }));
      toast.error('Error unfollowing user');
    }
  },

  // Fetch followers for a given userId
  fetchFollowers: async userId => {
    set({ isLoadingFollowers: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/user/profile/followers/${userId}`
      );
      handleResponse(response, data => {
        set({ followers: data, isLoadingFollowers: false });
      });
    } catch (error) {
      handleError(error, message =>
        set({ error: message, isLoadingFollowers: false })
      );
    }
  },

  // Fetch users that a given userId is following
  fetchFollowing: async userId => {
    set({ isLoadingFollowing: true, error: null });
    try {
      const response = await axiosInstance.get(
        `/user/profile/followings/${userId}`
      );
      handleResponse(response, data => {
        set({ following: data, isLoadingFollowing: false });
      });
    } catch (error) {
      handleError(error, message =>
        set({ error: message, isLoadingFollowing: false })
      );
    }
  },
}));
