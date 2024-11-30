import React from 'react';
import { Link } from 'react-router-dom';

const AdminUserList = ({ users, onDeleteUser }) => {
  return (
    <table className="table-auto w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Username</th>
          <th className="px-4 py-2">Email</th>
          <th className="px-4 py-2">Role</th>
          <th className="px-4 py-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr key={user._id}>
            <td className="border px-4 py-2">{user.username}</td>
            <td className="border px-4 py-2">{user.email}</td>
            <td className="border px-4 py-2">{user.role}</td>
            <td className="border px-4 py-2">
              <Link
                to={`/admin/user/${user._id}`}
                className="text-blue-500 hover:underline mr-2"
              >
                Edit
              </Link>
              <button
                onClick={() => onDeleteUser(user._id)}
                className="text-red-500 hover:underline"
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminUserList;
