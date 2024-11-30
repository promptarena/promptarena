// src/store/notificationStore.js
import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance';
import { handleError } from '../utils/errorHandler';
import { handleResponse } from '../utils/responseHandler';
import toast from 'react-hot-toast';

export const useNotificationStore = create((set, get) => ({
  notifications: [],
  isLoading: false,
  error: null,
  unreadCount: 0,

  fetchNotifications: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.get('/notification/all');
      handleResponse(response, data => {
        set({
          notifications: data,
          isLoading: false,
          unreadCount: data.filter(notification => !notification.read).length,
        });
      });
    } catch (error) {
      handleError(error, message => set({ error: message, isLoading: false }));
    }
  },

  markNotificationAsRead: async notificationId => {
    try {
      await axiosInstance.put(`/notification/${notificationId}/read`);
      set(state => ({
        notifications: state.notifications.map(notification =>
          notification._id === notificationId
            ? { ...notification, read: true }
            : notification
        ),
        unreadCount: state.unreadCount - 1,
      }));
    } catch (error) {
      handleError(error, message => set({ error: message }));
    }
  },

  markAllNotificationsAsRead: async () => {
    try {
      await axiosInstance.put('/notification/mark-all-as-read');
      // Update all notifications in the store to be read
      set(state => ({
        notifications: state.notifications.map(notification => ({
          ...notification,
          read: true,
        })),
        unreadCount: 0, // Reset unread count
      }));
    } catch (error) {
      handleError(error, message => set({ error: message }));
    }
  },

  deleteNotification: async notificationId => {
    try {
      await axiosInstance.delete(`/notification/${notificationId}`);
      set(state => ({
        notifications: state.notifications.filter(
          notification => notification._id !== notificationId
        ),
        unreadCount: state.unreadCount - 1, // Decrement unread count if the deleted notification was unread
      }));
      toast.success('Notification deleted!');
    } catch (error) {
      handleError(error, message => set({ error: message }));
      toast.error('Error deleting notification.');
    }
  },

  deleteAllNotifications: async () => {
    try {
      await axiosInstance.delete('/notification/');
      set({ notifications: [], unreadCount: 0 });
      toast.success('All notifications deleted successfully!');
    } catch (error) {
      handleError(error, message => set({ error: message }));
      toast.error('Error deleting notifications.');
    }
  },
}));
