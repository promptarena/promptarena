import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import toast from 'react-hot-toast';
import { useAuthStore } from './authStore';
const { user: authUser } = useAuthStore.getState(); // Gets the current auth state

export const useReviewStore = create((set, get) => ({
  reviews: {}, // Store reviews by promptId
  isLoading: false,
  error: null,

  fetchReviewsForPrompt: async promptId => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get(`/review/${promptId}/reviews`);
      handleResponse(response, data =>
        set(state => ({
          reviews: {
            ...state.reviews,
            [promptId]: data,
          },
          isLoading: false,
        }))
      );
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
  createReview: async (promptId, rating, comment) => {
    const { user: authUser } = useAuthStore.getState(); // Get the current auth user
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.post(`/review/${promptId}/review`, {
        rating,
        comment,
      });

      handleResponse(response, data => {
        set(state => ({
          reviews: {
            ...state.reviews,
            [promptId]: [
              ...(state.reviews[promptId] || []),
              {
                ...data, // Include the full review data
                user: {
                  username: authUser.username, // Now we have access to authUser
                  _id: authUser._id,
                },
              },
            ],
          },
          isLoading: false,
        }));

        toast.success('Review submitted successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },
  updateReview: async (reviewId, promptId, rating, comment) => {
    const { user: authUser } = useAuthStore.getState(); // Get the current auth user
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.put(
        `/review/${reviewId}`, // Assuming your backend has a route for updating reviews
        {
          rating,
          comment,
        }
      );

      console.log('response for update review: ', response);

      handleResponse(response, data => {
        set(state => ({
          reviews: {
            ...state.reviews,
            [promptId]: state.reviews[promptId].map(review =>
              review._id === reviewId
                ? {
                    ...data, // Include the updated review data
                    user: {
                      username: authUser.username, // Apply authUser data
                      _id: authUser._id,
                    },
                  }
                : review
            ),
          },
          isLoading: false,
        }));

        toast.success('Review updated successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  deleteReview: async (reviewId, promptId) => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.delete(
        `/review/${reviewId}` // Assuming your backend has a route for deleting reviews
      );

      handleResponse(response, () => {
        set(state => ({
          reviews: {
            ...state.reviews,
            [promptId]: state.reviews[promptId].filter(
              review => review._id !== reviewId
            ),
          },
          isLoading: false,
        }));

        toast.success('Review deleted successfully!');
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  averageRatingForPrompt: promptId => {
    const reviewsForPrompt = get().reviews[promptId];
    if (!reviewsForPrompt || reviewsForPrompt.length === 0) {
      return null;
    }

    const totalRating = reviewsForPrompt.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    console.log(
      'totalRating / reviewsForPrompt.length',
      totalRating / reviewsForPrompt.length
    );

    return totalRating / reviewsForPrompt.length;
  },
}));
