import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance'; // Assuming you have a setup for axios instance

export const useUserStore = create(set => ({
  users: [],
  isLoading: false,
  error: null,
  fetchUsers: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/admin/users');
      console.log('response for fetch users: ', response);
      if (response.status === 200) {
        set({ users: response.data.data, isLoading: false }); // Assuming API returns data in a 'data' field
      } else {
        set({ error: response.data.message || 'Error fetching users.' });
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      set({ error: error.message || 'Error fetching users.' });
    } finally {
      set({ isLoading: false });
    }
  },
  updateUser: async (userId, updatedUserData) => {
    console.log('updatedUserData: ', updatedUserData);
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.patch(
        `/admin/users/${userId}`,
        updatedUserData
      );
      console.log('response for update user: ', response);
      if (response.status === 200) {
        // Update the users array in the store's state
        set(state => ({
          users: state.users.map(user =>
            user._id === userId ? response.data : user
          ),
          isLoading: false,
        }));
      } else {
        set({ error: response.data.message || 'Error updating user.' });
      }
    } catch (error) {
      console.error('Error updating user:', error);
      set({ error: error.message || 'Error updating user.' });
    } finally {
      set({ isLoading: false });
    }
  },
  deleteUser: async userId => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/admin/users/${userId}`);
      console.log('response for delete user: ', response);
      if (response.status === 200) {
        // Remove the user from the users array in the store's state
        set(state => ({
          users: state.users.filter(user => user._id !== userId),
          isLoading: false,
        }));
      } else {
        set({ error: response.data.message || 'Error deleting user.' });
      }
    } catch (error) {
      set({ error: error.message || 'Error deleting user.' });
    } finally {
      set({ isLoading: false });
    }
  },
}));
