// src/store/authStore.js
import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import { useNotificationStore } from './notificationStore';

export const useAuthStore = create(set => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,
  signup: async (email, password, username) => {
    set({ isLoading: true, error: null }); // Start with resetting error and loading state
    try {
      const response = await axiosInstance.post(`/auth/signup`, {
        email,
        password,
        username,
      });
      // Handle successful response and set the user data
      handleResponse(response, data => {
        set({
          user: data,
          isAuthenticated: true,
          isLoading: false,
          error: null, // Clear error on success
        });
      });
    } catch (error) {
      // If an error occurs, set the error state and stop loading
      handleError(error, message => set({ error: message, isLoading: false }));
      throw error; // Rethrow the error so that the UI knows not to navigate
    }
  },

  login: async (email, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`/auth/login`, {
        email,
        password,
      });
      handleResponse(
        response,
        data => set({ user: data, isAuthenticated: true }),
        loading => set({ isLoading: loading })
      );

      console.log('document.cookie', document.cookie);
      useNotificationStore.getState().fetchNotifications();
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
      throw error; // Rethrow the error so that the UI knows not to navigate
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post(`/auth/logout`);
      set({
        user: null,
        isAuthenticated: false,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
      throw error;
    }
  },

  verifyEmail: async code => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`/auth/verify-email`, { code });
      console.log('response: ', response);
      console.log('code: ', code);
      handleResponse(
        response,
        data => set({ user: data, isAuthenticated: true }),
        loading => set({ isLoading: loading })
      );
      return response.data;
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axiosInstance.get(`/auth/check-auth`);
      handleResponse(
        response,
        data => set({ user: data, isAuthenticated: true }),
        () => set({ isCheckingAuth: false })
      );
    } catch (error) {
      
      set({ isAuthenticated: false, isCheckingAuth: false, error: null });
    }
  },

  forgotPassword: async email => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`/auth/forgot-password`, {
        email,
      });
      handleResponse(
        response,
        message => set({ message }),
        loading => set({ isLoading: loading })
      );
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));

      throw error;
    }
  },

  resetPassword: async (token, password) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        { password }
      );
      handleResponse(
        response,
        message => set({ message }),
        loading => set({ isLoading: loading })
      );
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));

      throw error;
    }
  },
}));
