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
import {
  googleClientId,
  MICROSOFT_CLARITY_PROJECT_ID,
} from './config/envConfig.js';
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/react';
import MicrosoftClarityTracker from './hooks/MicrosoftClarityTracker.jsx';
import MicrosoftClarityProvider from './contexts/MicrosoftClarityProvider.jsx';

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
        <BrowserRouter
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          <ThemeProvider>
            <CustomCursorWithFramer />
            <MicrosoftClarityProvider projectId={MICROSOFT_CLARITY_PROJECT_ID}>
              <MicrosoftClarityTracker />
              <App />
            </MicrosoftClarityProvider>
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </BrowserRouter>
      </HelmetProvider>
    </GoogleOAuthProvider>
  </StrictMode>
);
