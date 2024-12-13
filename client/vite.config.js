import { defineConfig } from 'vite';
import { config } from 'dotenv';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';

// Load environment variables from .env file
config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Log the current mode (development or production)
  console.log(`Current mode: ${mode}`);

  return {
    server: {
      // Set the port from env variable
      port: process.env.PORT || 5173,
      historyApiFallback: true,
    },
    plugins: [
      compression({
        algorithm: 'brotliCompress',
        ext: '.br',
        threshold: 10240,
      }),
      react(),
    ],
    // plugins: [MillionLint.vite()],

    envDir: './',
    resolve: {
      alias: { '@': '/src' },
    },
    base: './',

    define: {
      // Set process.env.NODE_ENV based on the mode
      'process.env.NODE_ENV': JSON.stringify(mode),
      // Expose other environment variables
      'process.env': {
        ...process.env,
      },
    },
  };
});
