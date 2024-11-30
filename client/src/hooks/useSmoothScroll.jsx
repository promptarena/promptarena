// src/hooks/useSmoothScroll.js
import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';

const useSmoothScroll = () => {
  useEffect(() => {
    // Create a Lenis instance with refined parameters
    const lenis = new Lenis({
      duration: 3.0, // Extended duration for maximum smoothness
      easing: t => 1 - Math.pow(1 - t, 4), // Very gradual easing curve
      smooth: true,
      smoothTouch: true,
      touchMultiplier: 1.2, // Lower touch sensitivity for smoother interactions
    });

    // Optimize requestAnimationFrame loop for better performance
    const handleRaf = time => {
      lenis.raf(time); // Delegate to Lenis
      requestAnimationFrame(handleRaf);
    };

    requestAnimationFrame(handleRaf);

    // Clean up on unmount
    return () => {
      lenis.destroy();
    };
  }, []);
};

export default useSmoothScroll;

// Working smooth scroll
// // src/hooks/useSmoothScroll.js
// import { useEffect } from 'react';
// import Lenis from '@studio-freight/lenis';

// const useSmoothScroll = () => {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 2.0, // Further increased duration for an even smoother feel
//       easing: t => 1 - Math.pow(1 - t, 3),
//       smooth: true,
//       smoothTouch: true, // Enables smoother scrolling on touch devices
//       touchMultiplier: 1.5, // Slightly reduced touch sensitivity
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy(); // Clean up Lenis instance when component unmounts
//     };
//   }, []);
// };

// export default useSmoothScroll;

// Old smooth scroll
// // src/hooks/useSmoothScroll.js
// import { useEffect } from 'react';
// import Lenis from '@studio-freight/lenis';

// const useSmoothScroll = () => {
//   useEffect(() => {
//     const lenis = new Lenis({
//       duration: 1.5, // Increased duration for a smoother feel
//       easing: t => 1 - Math.pow(1 - t, 3), // Easing with a more gradual transition
//       smooth: true,
//       smoothTouch: true, // Enables smoother scrolling on touch devices
//       touchMultiplier: 2, // Adjusts sensitivity on touch devices
//     });

//     function raf(time) {
//       lenis.raf(time);
//       requestAnimationFrame(raf);
//     }

//     requestAnimationFrame(raf);

//     return () => {
//       lenis.destroy(); // Clean up Lenis instance when component unmounts
//     };
//   }, []);
// };

// export default useSmoothScroll;
