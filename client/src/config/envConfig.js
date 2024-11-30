// src/config/envConfig.js

// Set the site name
export const siteName = process.env.PUBLIC_SITE_NAME || 'Vite + React';
// Set API URL
export const apiUrl =
  import.meta.env.MODE === 'development'
    ? process.env.PUBLIC_API_URL
    : process.env.PUBLIC_API_URL;
console.log('apiUrl: ', apiUrl);

export const config = () => {
  if (!process.env.PUBLIC_SITE_NAME) {
    throw new Error(
      'Missing environment variables. Please check your .env file.'
    );
  }
};

config();
