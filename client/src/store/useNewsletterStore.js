// src/store/newsletterStore.js
import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import toast from 'react-hot-toast';

export const useNewsletterStore = create(set => ({
  isLoading: false,
  error: null,

  subscribeToNewsletter: async email => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/newsletter/subscribe', {
        email,
      });
      handleResponse(response, () => set({ isLoading: false }));
      toast.success('Subscribed successfully!');
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
}));
