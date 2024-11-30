// src/utils/responseHandler.js

export const handleResponse = (response, setData, setLoading = () => {}) => {
  if (response?.data) {
    setData(response.data.data || response.data); // Update data state with the response data
  }
  if (typeof setLoading === 'function') {
    setLoading(false); // Set loading to false once the response is handled
  }
};
