// reportStore.js
import { create } from 'zustand';
import axiosInstance from '../services/axiosInstance'; // Assuming you have a setup for axios instance

export const useReportStore = create(set => ({
  salesReport: [],
  userActivityReport: [],
  isLoading: false,
  error: null,
  fetchReports: async () => {
    set({ isLoading: true, error: null });

    try {
      const response = await axiosInstance.get('/admin/dashboard');
      if (response.status === 200) {
        set({
          salesReport: response.data.transactionAnalytics, // Assuming API returns sales data in 'transactionAnalytics'
          userActivityReport: response.data.userAnalytics, // Assuming API returns user activity data in 'userAnalytics'
          isLoading: false,
        });
      } else {
        set({ error: response.data.message || 'Error fetching reports.' });
      }
    } catch (error) {
      set({ error: error.message || 'Error fetching reports.' });
    } finally {
      set({ isLoading: false });
    }
  },
  // Add actions to generate specific reports
  // Example:
  // generateSalesReport: async (fromDate, toDate) => {
  //   set({ isLoading: true, error: null });
  //   try {
  //     const response = await axiosInstance.post('/reports/sales', { fromDate, toDate });
  //     if (response.status === 200) {
  //       set({ salesReport: response.data, isLoading: false });
  //     } else {
  //       set({ error: response.data.message || 'Error generating sales report.' });
  //     }
  //   } catch (error) {
  //     set({ error: error.message || 'Error generating sales report.' });
  //   } finally {
  //     set({ isLoading: false });
  //   }
  // },
  // generateUserActivityReport: async (fromDate, toDate) => {
  //   // ... logic for generating user activity report ...
  // },
}));
