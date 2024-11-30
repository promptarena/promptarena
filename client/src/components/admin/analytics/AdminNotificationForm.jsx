import React, { useState } from 'react';
import { useNotificationStore } from '../store/notificationStore';
import { useAuthStore } from '../store/authStore';
import axiosInstance from '../../services/axiosInstance';
import toast from 'react-hot-toast';
import { handleError } from '../../utils/errorHandler';

const AdminNotificationForm = () => {
  const { user } = useAuthStore();
  const { fetchNotifications } = useNotificationStore();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userIds, setUserIds] = useState('');

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await axiosInstance.post('/admin/notifications', {
        message,
        userIds: userIds ? userIds.split(',').map(id => id.trim()) : [],
      });

      if (response.status === 201) {
        toast.success('Admin notification sent successfully!');
        setMessage('');
        setUserIds('');
        fetchNotifications();
        setIsLoading(false);
      } else {
        setError(response.data.message || 'Error submitting notification.');
        setIsLoading(false);
      }
    } catch (error) {
      handleError(error, setError);
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="message"
            className="block text-gray-700 font-bold mb-2"
          >
            Message:
          </label>
          <textarea
            id="message"
            value={message}
            onChange={e => setMessage(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="userIds"
            className="block text-gray-700 font-bold mb-2"
          >
            User IDs (comma-separated):
          </label>
          <input
            type="text"
            id="userIds"
            value={userIds}
            onChange={e => setUserIds(e.target.value)}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>

        {error && <div className="text-red-500 mb-4">{error}</div>}

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Send Notification'}
        </button>
      </form>
    </div>
  );
};

export default AdminNotificationForm;
