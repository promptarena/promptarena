// src/store/adminStore.js
import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import toast from 'react-hot-toast';

export const useAdminStore = create((set, get) => ({
  analytics: null,
  isLoading: false,
  error: null,

  users: [],
  isLoadingUsers: false,
  errorUsers: null,

  prompts: [],
  isLoadingPrompts: false,
  errorPrompts: null,

  supportTickets: [],
  isLoadingTickets: false,
  errorTickets: null,

  reports: [], // Array to store reports
  isLoadingReports: false,
  errorReports: null,

  fetchDetailedAnalytics: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/admin/dashboard');
      handleResponse(response, data =>
        set({ analytics: data, isLoading: false })
      );
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
  fetchUsers: async () => {
    set({ isLoadingUsers: true, errorUsers: null });
    try {
      const response = await axiosInstance.get('/admin/users');
      handleResponse(response, data =>
        set({ users: data, isLoadingUsers: false })
      );
    } catch (error) {
      handleError(error, message =>
        set({ errorUsers: message, isLoadingUsers: false })
      );
    }
  },
  deleteUser: async userId => {
    set({ isLoadingUsers: true, errorUsers: null });
    try {
      const response = await axiosInstance.delete(`/admin/users/${userId}`);
      handleResponse(response, () => {
        set({ isLoadingUsers: false });
        toast.success('User deleted successfully!');
        get().fetchUsers(); // Refetch users after deletion
      });
    } catch (error) {
      handleError(error, message =>
        set({ errorUsers: message, isLoadingUsers: false })
      );
    }
  },
  updateUser: async (userId, updateData) => {
    set({ isLoadingUsers: true, errorUsers: null });
    try {
      const response = await axiosInstance.put(
        `/admin/users/${userId}`,
        updateData
      );
      handleResponse(response, () => {
        set({ isLoadingUsers: false });
        toast.success('User updated successfully!');
        get().fetchUsers(); // Refetch users after update
      });
    } catch (error) {
      handleError(error, message =>
        set({ errorUsers: message, isLoadingUsers: false })
      );
    }
  },

  // fetchPrompts: async () => {
  //   set({ isLoadingPrompts: true, errorPrompts: null });
  //   try {
  //     const response = await axiosInstance.get('/admin/prompts');
  //     console.log('response: ', response);
  //     handleResponse(response, data =>
  //       set({ prompts: data, isLoadingPrompts: false })
  //     );
  //   } catch (error) {
  //     console.log('error: ', error);
  //     handleError(error, message =>
  //       set({ errorPrompts: message, isLoadingPrompts: false })
  //     );
  //   }
  // },
  approvePrompt: async promptId => {
    set({ isLoadingPrompts: true, errorPrompts: null });
    try {
      const response = await axiosInstance.put(`/admin/prompts/${promptId}`, {
        status: 'approved',
      });
      handleResponse(response, () => {
        set({ isLoadingPrompts: false });
        toast.success('Prompt approved successfully!');
        get().fetchPrompts(); // Refetch prompts after approval
      });
    } catch (error) {
      handleError(error, message =>
        set({ errorPrompts: message, isLoadingPrompts: false })
      );
    }
  },
  rejectPrompt: async promptId => {
    set({ isLoadingPrompts: true, errorPrompts: null });
    try {
      const response = await axiosInstance.put(`/admin/prompts/${promptId}`, {
        status: 'rejected',
      });
      handleResponse(response, () => {
        set({ isLoadingPrompts: false });
        toast.success('Prompt rejected successfully!');
        get().fetchPrompts(); // Refetch prompts after rejection
      });
    } catch (error) {
      handleError(error, message =>
        set({ errorPrompts: message, isLoadingPrompts: false })
      );
    }
  },

  fetchSupportTickets: async () => {
    set({ isLoadingTickets: true, errorTickets: null });
    try {
      const response = await axiosInstance.get('/admin/support-tickets');
      handleResponse(response, data =>
        set({ supportTickets: data, isLoadingTickets: false })
      );
    } catch (error) {
      handleError(error, message =>
        set({ errorTickets: message, isLoadingTickets: false })
      );
    }
  },

  resolveSupportTicket: async ticketId => {
    set({ isLoadingTickets: true, errorTickets: null });
    try {
      const response = await axiosInstance.put(
        `/admin/support-tickets/${ticketId}`,
        { status: 'resolved' }
      );
      handleResponse(response, () => {
        set({ isLoadingTickets: false });
        toast.success('Support ticket resolved successfully!');
        get().fetchSupportTickets(); // Refetch tickets after resolution
      });
    } catch (error) {
      handleError(error, message =>
        set({ errorTickets: message, isLoadingTickets: false })
      );
    }
  },

  // Fetch reports for the admin dashboard
  fetchReports: async () => {
    set({ isLoadingReports: true, errorReports: null });
    try {
      const response = await axiosInstance.get('/admin/reports');
      handleResponse(response, data => {
        set({ reports: data, isLoadingReports: false });
      });
    } catch (error) {
      handleError(error, message => {
        set({ errorReports: message, isLoadingReports: false });
      });
    }
  },

  sendAdminNotification: async (message, userIds) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/admin/notifications', {
        message,
        userIds,
      });
      handleResponse(response, () => {
        set({ isLoading: false });
        toast.success('Admin notification sent successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
}));
