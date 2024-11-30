import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import toast from 'react-hot-toast';

export const usePromptStore = create((set, get) => ({
  prompts: [],
  isLoading: false,
  error: null,
  categories: [],
  uploadProgress: {},
  currentPrompt: null,

  createPrompt: async promptData => {
    set({ isLoading: true, error: null, uploadProgress: {} });
    try {
      const response = await axiosInstance.post('/prompt/create', promptData, {
        // Manually set Content-Type for FormData
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: progressEvent => {
          if (progressEvent.target && progressEvent.target.name) {
            const fileKey = progressEvent.target.name;
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            set(state => ({
              uploadProgress: {
                ...state.uploadProgress,
                [fileKey]: progress,
              },
            }));
          }
        },
      });

      handleResponse(response, data => {
        set({ isLoading: false, uploadProgress: {} });
        toast.success('Prompt created successfully!');

        const newCategory = data.category;
        if (newCategory && !get().categories.includes(newCategory)) {
          set(state => ({
            categories: [...state.categories, newCategory],
          }));
        }

        get().fetchPrompts(); // Refresh the prompt list
      });
    } catch (error) {
      handleError(error, message =>
        set({ error: message, isLoading: false, uploadProgress: {} })
      );
    }
  },

  updatePrompt: async (promptId, promptData) => {
    set({ isLoading: true, error: null, uploadProgress: {} });
    try {
      const response = await axiosInstance.put(
        `/prompt/update/${promptId}`,
        promptData,
        {
          // Manually set Content-Type for FormData
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: progressEvent => {
            if (progressEvent.target && progressEvent.target.name) {
              const fileKey = progressEvent.target.name;
              const progress = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              set(state => ({
                uploadProgress: {
                  ...state.uploadProgress,
                  [fileKey]: progress,
                },
              }));
            }
          },
        }
      );
      handleResponse(response, data => {
        set({ isLoading: false, uploadProgress: {} });
        toast.success('Prompt updated successfully!');

        set(state => ({
          prompts: state.prompts.map(prompt =>
            prompt._id === promptId ? data : prompt
          ),
        }));

        get().fetchPromptById(promptId);
      });
    } catch (error) {
      handleError(error, message =>
        set({ error: message, isLoading: false, uploadProgress: {} })
      );
    }
  },

  deletePrompt: async promptId => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.delete(`/prompt/delete/${promptId}`);
      handleResponse(response, () => {
        set(state => ({
          prompts: state.prompts.filter(prompt => prompt._id !== promptId),
          isLoading: false,
        }));
        get().fetchPrompts(); // Refreshes the prompt list
        toast.success('Prompt deleted successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  fetchPrompts: async (queryParams = {}) => {
    set({ isLoading: true, error: null });
    try {
      const queryString = new URLSearchParams(queryParams).toString();
      const response = await axiosInstance.get(`/prompt/all?${queryString}`);

      handleResponse(response, data =>
        set({
          prompts: data.prompts,
          isLoading: false,
          totalCount: data.totalCount, // You can keep this if you want to know the total count of fetched prompts
        })
      );

      console.log('prompts: ', get().prompts);
      return response.data;
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
  fetchPromptById: async promptId => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get(`/prompt/${promptId}`);
      handleResponse(response, data => {
        set({ currentPrompt: data, isLoading: false });
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  fetchCategories: async () => {
    if (get().categories.length > 0) {
      return;
    }
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/prompt/categories');
      handleResponse(response, data =>
        set({ categories: data, isLoading: false })
      );
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
}));
