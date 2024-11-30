import React, { useState } from 'react';
import { useUserProfileStore } from '../../store/userProfileStore';
import ErrorThrower from '../base/ErrorThrower';
import useAlert from '../../hooks/useAlert';

const ChangePasswordForm = () => {
  const { changePassword, isLoading, error } = useUserProfileStore();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { customAlert, AlertModalComponent } = useAlert(); // Destructure customAlert and AlertModalComponent

  const handleSubmit = async e => {
    e.preventDefault();

    // if (newPassword !== confirmPassword) {
    //   // Display error message: Passwords don't match
    //   alert("Passwords don't match");
    //   return;
    // }

    if (newPassword !== confirmPassword) {
      // Use customAlert to show the error message instead of alert
      customAlert("Passwords don't match");
      return;
    }

    await changePassword(oldPassword, newPassword);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="oldPassword"
            className="block text-gray-100 font-bold mb-2"
          >
            Old Password
          </label>
          <input
            placeholder="Enter your old password"
            type="password"
            id="oldPassword"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={oldPassword}
            onChange={e => setOldPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="newPassword"
            className="block text-gray-100 font-bold mb-2"
          >
            New Password
          </label>
          <input
            type="password"
            placeholder="Enter your new password"
            id="newPassword"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={newPassword}
            onChange={e => setNewPassword(e.target.value)}
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="confirmPassword"
            className="block text-gray-100 font-bold mb-2"
          >
            Confirm New Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            placeholder="Confirm your new password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={confirmPassword}
            onChange={e => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        <div className="mt-6">{error && <ErrorThrower error={error} />}</div>

        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Changing...' : 'Change Password'}
        </button>
      </form>
      {AlertModalComponent}
    </>
  );
};

export default React.memo(ChangePasswordForm);

// import React, { useState } from 'react';
// import { useUserProfileStore } from '../../store/userProfileStore';
// import ErrorThrower from '../base/ErrorThrower';
// import useAlert from '../../hooks/useAlert';

// const ChangePasswordForm = () => {
//   const { changePassword, isLoading, error } = useUserProfileStore();
//   const [oldPassword, setOldPassword] = useState('');
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const { customAlert, AlertModalComponent } = useAlert(); // Destructure customAlert and AlertModalComponent

//   const handleSubmit = async e => {
//     e.preventDefault();

//     // if (newPassword !== confirmPassword) {
//     //   // Display error message: Passwords don't match
//     //   alert("Passwords don't match");
//     //   return;
//     // }

//     if (newPassword !== confirmPassword) {
//       // Use customAlert to show the error message instead of alert
//       customAlert("Passwords don't match");
//       return;
//     }

//     await changePassword(oldPassword, newPassword);
//   };

//   return (
//     <div className="bg-white p-6 rounded-lg shadow">
//       <h2 className="text-xl font-semibold mb-4">Change Password</h2>
//       <form onSubmit={handleSubmit}>
//         <div className="mb-4">
//           <label
//             htmlFor="oldPassword"
//             className="block text-gray-700 font-bold mb-2"
//           >
//             Old Password
//           </label>
//           <input
//             type="password"
//             id="oldPassword"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             value={oldPassword}
//             onChange={e => setOldPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="newPassword"
//             className="block text-gray-700 font-bold mb-2"
//           >
//             New Password
//           </label>
//           <input
//             type="password"
//             id="newPassword"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             value={newPassword}
//             onChange={e => setNewPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-4">
//           <label
//             htmlFor="confirmPassword"
//             className="block text-gray-700 font-bold mb-2"
//           >
//             Confirm New Password
//           </label>
//           <input
//             type="password"
//             id="confirmPassword"
//             className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
//             value={confirmPassword}
//             onChange={e => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>

//         {error && <ErrorThrower error={error} />}

//         <button
//           type="submit"
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Changing...' : 'Change Password'}
//         </button>
//       </form>
//       {AlertModalComponent}
//     </div>
//   );
// };

// export default React.memo(ChangePasswordForm);
