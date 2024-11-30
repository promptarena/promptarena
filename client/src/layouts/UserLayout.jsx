// // src/layouts/UserLayout.js
// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import ParticlesBackground from '../components/base/ParticlesBackground';
// import FloatingShape from '../components/framer-motion/animations/FloatingShape';
// import Navbar from '../components/global/Navbar';
// import { useAuthStore } from '../store/authStore';

// const UserLayout = () => {
//   const { user, isAuthenticated } = useAuthStore();

//   return (
//     <section
//       className=" bg-background dark:bg-dark-background
//         text-text dark:text-text-subdued"
//     >
//       <Navbar isAuthenticated={isAuthenticated} />
//       <section
//         className="min-h-screen

//          relative overflow-hidden z-0"
//       >
//         <>
//           {/* Navbar Component */}

//           {/* Main Content Area */}
//           <main>
//             <div className="relative z-[8]">
//               <ParticlesBackground />
//               <Outlet />
//               {/* <FloatingShape
//                 color='dark:bg-cyber-purple bg-cyber-blue'
//                 size='w-64 h-64'
//                 top='-5%'
//                 left='10%'
//                 delay={0}
//               />
//               <FloatingShape
//                 color='bg-dark-text-subdued'
//                 size='w-48 h-48'
//                 top='70%'
//                 left='80%'
//                 delay={5}
//               />
//               <FloatingShape
//                 color='bg-dark-tertiary'
//                 size='w-32 h-32'
//                 top='40%'
//                 left='-10%'
//                 delay={2}
//               /> */}
//             </div>
//           </main>

//           {/* Sidebar Component */}

//           {/* Sidebar Component */}
//           <h1 className="h1">
//             sdusbdvbdskwehfiowehfihweihfoiewhfiwehfohewofihweoifhoewifivbdsvbsdiubvivbsidjvbsdivbdsuvbdsibvs
//             jsdjbcvibdsciucbgewyvcyevuyc loremjkcsbjsdb
//             cdsbjbcsdkjbckjbjdsbckjdbckjsbckjdsbkcjbdsvhbdsbvldvclhshvcuhdsv
//             cjhdsbscsjabhcbasjhcvasgcv shgackvshac
//           </h1>

//           {/* Footer */}
//           <footer className="bg-gray-700 text-white text-center py-2">
//             © {new Date().getFullYear()} PromptArena
//           </footer>
//         </>
//       </section>
//     </section>
//   );
// };

// export default UserLayout;

// src/layouts/UserLayout.js
import React, { useMemo } from 'react';
import { Outlet } from 'react-router-dom';
import ParticlesBackground from '../components/base/ParticlesBackground';
import FloatingShape from '../components/framer-motion/animations/FloatingShape';
import Navbar from '../components/global/Navbar';
import { useAuthStore } from '../store/authStore';
import Footer from '../components/global/Footer';

const UserLayout = () => {
  const { isAuthenticated } = useAuthStore();

  // Memoize the particles background to prevent re-renders
  const memoizedParticlesBackground = useMemo(
    () => <ParticlesBackground />,
    []
  );

  // Memoize the Navbar to prevent re-renders when isAuthenticated does not change
  const memoizedNavbar = useMemo(
    () => <Navbar isAuthenticated={isAuthenticated} />,
    [isAuthenticated]
  );

  return (
    // bg-background dark:bg-dark-background text-text dark:text-text-subdued min-h-screen  overflow-hidden
    // <div className="bg-[#0A0F18]">
    <div className="bg-[#0A0F18]">
      {/* Navbar */}
      {memoizedNavbar}
      {/* Main Content Area */}
      <main className="relative">
        {/* Main Page Outlet */}
        <Outlet />
        {/* Conditionally Render Background for Performance */}
        {memoizedParticlesBackground}

        {/* Floating Shapes - Uncomment if needed */}
        {/* 
        <FloatingShape
          color="dark:bg-cyber-purple bg-cyber-blue"
          size="w-64 h-64"
          top="-5%"
          left="10%"
          delay={0}
        />
        <FloatingShape
          color="bg-dark-text-subdued"
          size="w-48 h-48"
          top="70%"
          left="80%"
          delay={5}
        />
        <FloatingShape
          color="bg-dark-tertiary"
          size="w-32 h-32"
          top="40%"
          left="-10%"
          delay={2}
        />
        */}

        {/* Sample Placeholder Text */}
        {/* <h1 className="h1">
          Welcome to PromptArena! Discover a vast range of AI-powered prompts
          tailored for creativity, productivity, and beyond.
        </h1> */}
      </main>

      {/* Footer */}
      {/* <footer>
       <Footer />
      </footer> */}
    </div>
  );
};

export default UserLayout;
