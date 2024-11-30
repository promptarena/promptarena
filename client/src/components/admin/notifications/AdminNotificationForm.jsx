// src/components/admin/notifications/AdminNotificationForm.jsx
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../services/axiosInstance';
import toast from 'react-hot-toast';
import Select from 'react-select'; // You'll need to install react-select: npm install react-select

const AdminNotificationForm = () => {
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axiosInstance.get('/admin/users'); // Your API endpoint to get all users
        const usersData = response.data.data.map(user => ({
          value: user._id,
          label: user.username,
        }));
        setUsers(usersData);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleSubmit = async e => {
    e.preventDefault();
    const userIds = selectedUsers.map(user => user.value);

    try {
      const response = await axiosInstance.post('/admin/notifications', {
        message,
        userIds: userIds.length > 0 ? userIds : undefined, // Send userIds only if selected
      });

      if (response.status === 200) {
        toast.success('Notification sent successfully!');
        setMessage('');
        setSelectedUsers([]); // Clear selected users
      } else {
        toast.error('Error sending notification. Please try again.');
      }
    } catch (error) {
      toast.error('Error sending notification. Please try again.');
      console.error('Error sending notification:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message:
        </label>
        <textarea
          id="message"
          value={message}
          onChange={e => setMessage(e.target.value)}
          placeholder="Enter your notification message..."
          required
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label htmlFor="users" className="block text-gray-700 font-bold mb-2">
          Select Users (Optional):
        </label>
        <Select
          isMulti // Enable multi-select
          id="users"
          options={users}
          value={selectedUsers}
          onChange={setSelectedUsers}
          className="basic-multi-select"
          classNamePrefix="select"
          placeholder="Select users..."
        />
      </div>

      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Send Notification
      </button>
    </form>
  );
};

export default AdminNotificationForm;
