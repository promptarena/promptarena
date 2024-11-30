// src/components/admin/UserManagement.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

const UserManagement = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    async function fetchUsers() {
      const response = await axios.get('/api/admin/users', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
      });
      setUsers(response.data);
    }
    fetchUsers();
  }, []);

  const handleRoleChange = async (userId, newRole) => {
    await axios.put(`/api/admin/users/${userId}`, { role: newRole });
  };

  const handleDeleteUser = async userId => {
    await axios.delete(`/api/admin/users/${userId}`);
    setUsers(users.filter(user => user._id !== userId));
  };

  return (
    <div>
      <h1>User Management</h1>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user._id}>
              <td>{user.email}</td>
              <td>
                <select
                  value={user.role}
                  onChange={e => handleRoleChange(user._id, e.target.value)}
                >
                  <option value="buyer">Buyer</option>
                  <option value="seller">Seller</option>
                  <option value="admin">Admin</option>
                </select>
              </td>
              <td>
                <button onClick={() => handleDeleteUser(user._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserManagement;
