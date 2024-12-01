// // src/components/auth/GoogleButtons.jsx
// import React from 'react';
// import { GoogleLogin } from '@react-oauth/google';
// import axios from '../../services/axiosInstance';
// import toast from 'react-hot-toast';

// const GoogleButtons = ({ chooseBtn = 'login' }) => {
//   const handleGoogleLogin = async response => {
//     try {
//       const token = response.credential;
//       const res = await axios.post('/auth/google', { token, action: 'login' });
//       toast.success(res.data.message || 'Logged in successfully');
//       localStorage.setItem('authToken', res.data.token);
//       // window.location.href = '/';
//     } catch (error) {
//       console.error('Google login failed:', error);
//     }
//   };

//   const handleGoogleSignup = async response => {
//     try {
//       const token = response.credential;
//       const res = await axios.post('/auth/google', { token, action: 'signup' });
//       toast.success(res.data.message || 'Signed up successfully');
//       localStorage.setItem('authToken', res.data.token);
//       // window.location.href = '/';
//     } catch (error) {
//       console.error('Google signup failed:', error);
//     }
//   };

//   return (
//     <div
//       className={
//         'rounded-md w-full border-none bg-[linear-gradient(325deg,#0044ff_0%,#2ccfff_55%,#0044ff_90%)] bg-[280%_auto] font-medium text-white shadow-[0px_0px_20px_rgba(71,184,255,0.5),0px_5px_5px_-1px_rgba(58,125,233,0.25),inset_4px_4px_8px_rgba(175,230,255,0.5),inset_-4px_-4px_8px_rgba(19,95,216,0.35)] transition-[background] duration-700 hover:bg-right-top focus:outline-none focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus-visible:ring-2 dark:focus:ring-blue-500 dark:focus:ring-offset-black'
//       }
//     >
//       {chooseBtn === 'login' ? (
//         <GoogleLogin
//           auto_select
//           shape="rectangular"
//           type="standard"
//           useOneTap
//           text="signin_with"
//           theme="filled_blue"
//           onSuccess={handleGoogleLogin}
//           onError={handleGoogleLogin}
//         />
//       ) : (
//         <GoogleLogin
//           auto_select
//           shape="rectangular"
//           type="standard"
//           useOneTap
//           text="signin_with"
//           theme="filled_blue"
//           text="signup_with"
//           onSuccess={handleGoogleSignup}
//           onError={handleGoogleSignup}
//         />
//       )}
//     </div>
//   );
// };

// export default GoogleButtons;

// src/components/auth/GoogleButtons.jsx
import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import axios from '../../services/axiosInstance';
import toast from 'react-hot-toast';

const GoogleButtons = ({ chooseBtn = 'login' }) => {
  const handleGoogleLogin = async response => {
    try {
      const token = response.credential;
      const res = await axios.post('/auth/google', { token, action: 'login' });
      toast.success(res.data.message || 'Logged in successfully');
      localStorage.setItem('authToken', res.data.token);
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('Internal server error:', error);
        toast.error(
          'An error occurred while authenticating with Google. Please try again later.'
        );
      } else {
        console.debug('Error authenticating with Google:', error);
        toast.error(error.response.data.message || 'Login failed');
      }
      console.error('Google login failed:', error);
    }
  };

  const handleGoogleSignup = async response => {
    try {
      const token = response.credential;
      const res = await axios.post('/auth/google', { token, action: 'signup' });
      toast.success(res.data.message || 'Signed up successfully');
      localStorage.setItem('authToken', res.data.token);
      window.location.href = '/';
    } catch (error) {
      if (error.response && error.response.status === 500) {
        console.error('Internal server error:', error);
        toast.error(
          'An error occurred while authenticating with Google. Please try again later.'
        );
      } else {
        console.debug('Error authenticating with Google:', error);
        toast.error(error.response.data.message || 'Signup failed');
      }
      console.error('Google signup failed:', error);
    }
  };

  return (
    <div
      className={
        'rounded-md w-full border-none bg-[linear-gradient(325deg,#0044ff_0%,#2ccfff_55%,#0044ff_90%)] bg-[280%_auto] font-medium text-white shadow-[0px_0px_20px_rgba(71,184,255,0.5),0px_5px_5px_-1px_rgba(58,125,233,0.25),inset_4px_4px_8px_rgba(175,230,255,0.5),inset_-4px_-4px_8px_rgba(19,95,216,0.35)] transition-[background] duration-700 hover:bg-right-top focus:outline-none focus:ring-blue-400 focus:ring-offset-1 focus:ring-offset-white focus-visible:ring-2 dark:focus:ring-blue-500 dark:focus:ring-offset-black'
      }
    >
      {chooseBtn === 'login' ? (
        <GoogleLogin
          auto_select
          shape="rectangular"
          type="standard"
          useOneTap
          text="signin_with"
          theme="filled_blue"
          onSuccess={handleGoogleLogin}
          onError={handleGoogleLogin}
        />
      ) : (
        <GoogleLogin
          auto_select
          shape="rectangular"
          type="standard"
          useOneTap
          text="signup_with"
          theme="filled_blue"
          onSuccess={handleGoogleSignup}
          onError={handleGoogleSignup}
        />
      )}
    </div>
  );
};

export default GoogleButtons;
