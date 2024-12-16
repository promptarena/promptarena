// import { defineConfig } from 'vite';
// import { config } from 'dotenv';
// import react from '@vitejs/plugin-react';
// import compression from 'vite-plugin-compression';
// import { VitePWA } from 'vite-plugin-pwa';
// import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

// // Load environment variables from .env file
// config();

// // https://vitejs.dev/config/
// export default defineConfig(({ mode }) => {
//   // Log the current mode (development or production)
//   console.log(`Current mode: ${mode}`);

//   return {
//     server: {
//       port: process.env.PORT || 5173,
//       historyApiFallback: true,
//     },
//     build: {
//       rollupOptions: {
//         output: {
//           manualChunks: {
//             vendor: ['react', 'react-dom', '@react-oauth/google'],
//           },
//         },
//       },
//     },
//     plugins: [
//       ViteImageOptimizer({
//         optipng: {
//           optimizationLevel: 7,
//         },
//         pngquant: {
//           quality: [0.8, 0.9],
//         },
//       }),
//       compression({
//         algorithm: 'brotliCompress',
//         ext: '.br',
//         threshold: 10240,
//       }),
//       react(),
//       VitePWA({
//         strategies: 'injectManifest',
//         srcDir: 'src/service-worker',
//         filename: 'sw.js',
//         injectManifest: {
//           maximumFileSizeToCacheInBytes: 5000000, // 5MB
//         },
//         registerType: 'autoUpdate',
//         manifest: {
//           name: 'PromptArena',
//           short_name: 'PromptArena',
//           start_url: '.',
//           display: 'standalone',
//           theme_color: '#000000',
//           background_color: '#ffffff',
//           icons: [
//             {
//               src: '/android-icon-36x36.png',
//               sizes: '36x36',
//               type: 'image/png',
//               density: '0.75',
//             },
//             {
//               src: '/android-icon-48x48.png',
//               sizes: '48x48',
//               type: 'image/png',
//               density: '1.0',
//             },
//             {
//               src: '/android-icon-72x72.png',
//               sizes: '72x72',
//               type: 'image/png',
//               density: '1.5',
//             },
//             {
//               src: '/android-icon-96x96.png',
//               sizes: '96x96',
//               type: 'image/png',
//               density: '2.0',
//             },
//             {
//               src: '/android-icon-144x144.png',
//               sizes: '144x144',
//               type: 'image/png',
//               density: '3.0',
//             },
//             {
//               src: '/android-icon-192x192.png',
//               sizes: '192x192',
//               type: 'image/png',
//               density: '4.0',
//             },
//           ],
//           screenshots: [
//             {
//               src: '/screenshot-desktop.png',
//               sizes: '1280x720',
//               type: 'image/png',
//               form_factor: 'wide',
//             },
//             {
//               src: '/screenshot-mobile.png',
//               sizes: '324x687',
//               type: 'image/png',
//               form_factor: 'narrow',
//             },
//           ],
//         },
//       }),
//     ],

//     envDir: './',
//     resolve: {
//       alias: { '@': '/src' },
//     },
//     base: './',
//     define: {
//       // Set process.env.NODE_ENV based on the mode
//       'process.env.NODE_ENV': JSON.stringify(mode),
//       // Expose other environment variables
//       'process.env': {
//         ...process.env,
//       },
//     },
//   };
// });

import { defineConfig } from 'vite';
import { config } from 'dotenv';
import react from '@vitejs/plugin-react';
import compression from 'vite-plugin-compression';
import { VitePWA } from 'vite-plugin-pwa';
import { ViteImageOptimizer } from 'vite-plugin-image-optimizer';

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
        threshold: 10240, // Files larger than 10KB will be compressed
      }),
      react(),
      VitePWA({
        strategies: 'injectManifest',
        srcDir: 'src/service-worker',
        filename: 'sw.js',
        injectManifest: {
          maximumFileSizeToCacheInBytes: 5000000, // 5MB
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
