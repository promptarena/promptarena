// import { StrictMode } from 'react';
// import { createRoot } from 'react-dom/client';
// import App from './App.jsx';
// import './index.css';
// import { ThemeProvider } from './contexts/ThemeContext.jsx';
// import { BrowserRouter } from 'react-router-dom';
// import CustomCursorWithFramer from './components/base/CustomCursorWithFramer.jsx';
// import React from 'react';
// import { HelmetProvider } from 'react-helmet-async';
// import { GoogleOAuthProvider } from '@react-oauth/google';
// import { googleClientId } from './config/envConfig.js';

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <GoogleOAuthProvider clientId={googleClientId}>
//       <HelmetProvider>
//         <BrowserRouter>
//           <ThemeProvider>
//             <CustomCursorWithFramer />
//             <App />
//           </ThemeProvider>
//         </BrowserRouter>
//       </HelmetProvider>
//     </GoogleOAuthProvider>
//   </StrictMode>
// );


import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './contexts/ThemeContext.jsx';
import { BrowserRouter } from 'react-router-dom';
import CustomCursorWithFramer from './components/base/CustomCursorWithFramer.jsx';
import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleClientId } from './config/envConfig.js';

// Register the service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/sw.js')
      .then(registration => {
        console.log('Service worker registered:', registration);

        registration.onupdatefound = () => {
          const installingWorker = registration.installing;
          installingWorker.onstatechange = () => {
            if (
              installingWorker.state === 'installed' &&
              navigator.serviceWorker.controller
            ) {
              console.log('New version available, reloading...');
              window.location.reload();
            }
          };
        };
      })
      .catch(error => {
        console.error('Service worker registration failed:', error);
      });
  });
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={googleClientId}>
      <HelmetProvider>
        <BrowserRouter>
          <ThemeProvider>
            <CustomCursorWithFramer />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
