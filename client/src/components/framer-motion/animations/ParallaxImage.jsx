// ParallaxImage.jsx
import { useTransform, useViewportScroll, motion } from 'framer-motion';

const ParallaxImage = ({ bgImage, fgImage }) => {
  // Track the scroll position using Framer Motion's useViewportScroll
  const { scrollY } = useViewportScroll();

  // Parallax effect for the background image
  const y = useTransform(scrollY, [0, 1000], [10, -10]);

  // Scale effect for smooth zoom during scroll
  const scale = useTransform(scrollY, [0, 1000], [1.1, 1]);

  return (
    <div className="relative h-full rounded-2xl rounded-b-none w-full overflow-hidden">
      {/* Background Image with Parallax and Scale effect */}
      <motion.div
        className="absolute inset-0 h-full w-full bg-cover bg-center rounded-2xl rounded-b-none"
        style={{
          backgroundImage: `url(${bgImage})`,
          y, // Parallax effect
          scale, // Scale effect
        }}
      />

      {/* Foreground Image */}
      <div className="relative z-10 rounded-2xl rounded-b-none">
        <img
          src={fgImage}
          alt="Foreground"
          className="w-full h-full object-cover rounded-2xl rounded-b-none"
          style={{
            minHeight: '200px', // Max height for desktop
          }}
        />
      </div>
    </div>
  );
};

export default ParallaxImage;

// // client/src/components/framer-motion/animations/ParallaxImage.jsx
// // ParallaxImage.jsx
// import {
//   useTransform,
//   useViewportScroll,
//   motion,
//   transform,
// } from 'framer-motion';

// const ParallaxImage = ({ bgImage, fgImage }) => {
//   // Track the scroll position using Framer Motion's useViewportScroll
//   const { scrollY } = useViewportScroll();

//   // Set the parallax effect on the background image
//   const y = useTransform(scrollY, [1000, 0], [-70, 0]);

//   //export that y value

//   return (
//     <div className="relative h-full rounded-2xl rounded-b-none w-full overflow-hidden">
//       {/* Background Image with Parallax effect */}
//       <motion.div
//         className="absolute inset-0 h-full w-full bg-cover bg-repeat bg-center rounded-2xl rounded-b-none"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//           scale: 1.1,
//           y,
//         }}
//       />

//       {/* Foreground Image */}
//       <div className="relative z-10 rounded-2xl rounded-b-none">
//         <img
//           src={fgImage}
//           alt="Foreground"
//           className="w-full h-full object-cover rounded-2xl rounded-b-none"
//           style={{
//             minHeight: '200px', // Max height for desktop
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ParallaxImage;

// import { useTransform, useViewportScroll, motion } from 'framer-motion';

// const ParallaxImage = ({ bgImage, fgImage }) => {
//   // Track the scroll position using Framer Motion's useViewportScroll
//   const { scrollY } = useViewportScroll();

//   // Set the parallax effect on the background image
//   const y = useTransform(scrollY, [1000, 0], [-70, 0]);

//   return (
//     <div className="relative h-full w-full overflow-hidden rounded-2xl rounded-b-none">
//       {/* Background Image with Parallax effect */}
//       <motion.div
//         className="absolute inset-0 w-full h-full bg-cover bg-repeat bg-center rounded-2xl rounded-b-none"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//           scale: 1.1,
//           y,
//         }}
//       />

//       {/* Foreground Image */}
//       <div className="relative z-10 rounded-2xl rounded-b-none">
//         <img
//           src={fgImage}
//           alt="Foreground"
//           className="w-full object-cover rounded-2xl rounded-b-none"
//           style={{
//             minHeight: '200px', // Max height for desktop
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default ParallaxImage;

// // ParallaxImage.jsx
// import {
//   useTransform,
//   useViewportScroll,
//   motion,
//   transform,
// } from 'framer-motion';

// const ParallaxImage = ({ bgImage, fgImage }) => {
//   // Track the scroll position using Framer Motion's useViewportScroll
//   const { scrollY } = useViewportScroll();

//   // Set the parallax effect on the background image
//   const y = useTransform(scrollY, [1000, 0], [-70, 0]);

//   //export that y value

//   return (
//     <div className="relative h-full rounded-2xl rounded-b-none w-full overflow-hidden">
//       {/* Background Image with Parallax effect */}
//       <motion.div
//         className="absolute inset-0 h-full w-full bg-cover bg-repeat bg-center rounded-2xl rounded-b-none"
//         style={{
//           backgroundImage: `url(${bgImage})`,
//           scale: 1.1,
//           y,
//         }}
//       />

//       {/* Foreground Image */}
//       <div className="relative z-10 rounded-2xl rounded-b-none">
//         <img
//           src={fgImage}
//           alt="Foreground"
//           className="w-full h-full object-cover rounded-2xl rounded-b-none"
//         />
//       </div>
//     </div>
//   );
// };

// export default ParallaxImage;
