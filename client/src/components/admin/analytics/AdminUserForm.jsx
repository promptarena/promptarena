import React, { useState } from 'react';
import { useUserStore } from '../../../store/userStore';
import { handleError } from '../../../utils/errorHandler';
// import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
import { toast } from 'react-hot-toast';

const AdminUserForm = () => {
  const { createUser, updateUser } = useUserStore();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('buyer'); // Default role
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async event => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (updateUser) {
        // Update existing user
        const response = await updateUser({
          userId: updateUser.id,
          username,
          email,
          password,
          role,
        });
        console.log(
          '🚀 ~ file: AdminUserForm.jsx:handleSubmit ~ response',
          response
        );
        if (response.status === 200) {
          // Reset form or handle further actions
        } else {
          handleError(response, setError);
        }
      } else {
        // Create new user
        const response = await createUser({
          username,
          email,
          password,
          role,
        });
        console.log(
          '🚀 ~ file: AdminUserForm.jsx:handleSubmit ~ response',
          response
        );
        if (response.status === 201) {
          toast.success('User created successfully!');
          // Reset form or handle further actions
        } else {
          handleError(response, setError);
        }
      }
    } catch (error) {
      handleError(error, setError);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-gray-700 font-bold mb-2"
        >
          Username:
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={e => setUsername(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="email" className="block text-gray-700 font-bold mb-2">
          Email:
        </label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="password"
          className="block text-gray-700 font-bold mb-2"
        >
          Password:
        </label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
          Role:
        </label>
        <select
          id="role"
          value={role}
          onChange={e => setRole(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="buyer">Buyer</option>
          <option value="seller">Seller</option>
          {/* Add more roles as needed */}
        </select>
      </div>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      <button
        type="submit"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        disabled={isLoading}
      >
        {isLoading ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
};

export default AdminUserForm;
