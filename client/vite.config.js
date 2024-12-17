import { defineConfig } from 'vite';
import { config } from 'dotenv';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';
import removeConsole from 'vite-plugin-remove-console';


// Load environment variables from .env file
config();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Log the current mode (development or production)
  console.log(`Current mode: ${mode}`);

  return {
    server: {
      port: process.env.PORT || 5173,
      historyApiFallback: true,
    },
    build: {
      chunkSizeWarningLimit: 1000, // Increase threshold for warnings to 1MB
      rollupOptions: {
        output: {
          manualChunks(id) {
            // Split large dependencies into separate chunks
            if (id.includes('node_modules')) {
              return 'vendor'; // Vendor chunk for all third-party libraries
            }
            if (id.includes('@react-oauth/google')) {
              return 'react-oauth'; // Custom chunk for @react-oauth/google
            }
            if (id.includes('@studio-freight/lenis')) {
              return 'lenis'; // Custom chunk for @studio-freight/lenis
            }
            if (id.includes('@pollinations/react')) {
              return 'pollinations'; // Custom chunk for @pollinations/react
            }
            if (id.includes('@tsparticles/react')) {
              return 'tsparticles'; // Custom chunk for @tsparticles/react
            }
            if (id.includes('draft-js')) {
              return 'draft-js'; // Custom chunk for draft-js
            }
            if (id.includes('lottie-react')) {
              return 'lottie-react'; // Custom chunk for lottie-react
            }

            if (id.includes('dompurify')) {
              return 'dompurify'; // Custom chunk for dompurify
            }
            return 'main';
          },
        },
      },
    },
    plugins: [
      ViteImageOptimizer({
        optipng: {
          optimizationLevel: 7,
        },
        pngquant: {
          quality: [0.8, 0.9],
        },
      }),
      compression({
        algorithm: 'gzip',
        ext: '.br',
        threshold: 10240,
      }),
      react(),
      removeConsole({ 
      include: ['log', 'info', 'warn', 'error', 'debug'] 
    }),
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src/service-worker',
        filename: 'sw.js',
        injectManifest: {
          maximumFileSizeToCacheInBytes: 5000000,
        },
        registerType: 'autoUpdate',
      }),
    ],
    envDir: './',
    resolve: {
      alias: { '@': '/src' },
    },
    base: '/',
    define: {
      'process.env.NODE_ENV': JSON.stringify(mode),
      'process.env': {
        ...process.env,
      },
    },
  };
});
