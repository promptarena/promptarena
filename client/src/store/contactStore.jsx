// src/store/contactStore.js
import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import toast from 'react-hot-toast';

export const useContactStore = create(set => ({
  isLoading: false,
  error: null,

  submitContactForm: async (firstName, lastName, phone, email, message) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('/contact/submit', {
        firstName,
        lastName,
        phone,
        email,
        message,
      });
      handleResponse(response, () => set({ isLoading: false }));
      toast.success('Message sent successfully!');
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
}));
