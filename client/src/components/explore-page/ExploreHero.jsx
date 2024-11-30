// import React from 'react';
// import { motion, useViewportScroll, useTransform } from 'framer-motion';

// export default function ExploreHero() {
//   const { scrollY } = useViewportScroll();

//   // Parallax effect for elements
//   const yOffsetBackground = useTransform(scrollY, [0, 500], ['0%', '-20%']);
//   const yOffsetText = useTransform(scrollY, [0, 300], ['0%', '10%']);

//   return (
//     <div className={`relative min-h-screen w-full bg-black overflow-hidden`}>
//       {/* Background gradient effects */}
//       <div className="absolute inset-0">
//         <motion.div
//           className="absolute inset-0 bg-black opacity-90"
//           style={{ y: yOffsetBackground }}
//         />
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-transparent"
//           style={{ y: yOffsetBackground }}
//         />
//         <motion.div
//           className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3)_0%,rgba(0,0,0,0.5)_100%)]"
//           style={{ y: yOffsetBackground }}
//         />
//       </div>

//       <div className="absolute inset-0">
//         {/* Background Video */}
//         <motion.video
//           className="absolute inset-0 w-full h-full object-cover scale-125 z-[1] opacity-90"
//           autoPlay
//           loop
//           muted
//           playsInline
//           style={{ y: yOffsetBackground }}
//         >
//           <source
//             src="https://wedesignthemes.s3.amazonaws.com/glidex/slider-2-bg-video.mp4"
//             type="video/mp4"
//           />
//           Your browser does not support the video tag.
//         </motion.video>

//         {/* Gradient Overlay */}
//         <motion.div
//           className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-transparent"
//           style={{ y: yOffsetBackground }}
//         />
//         <motion.div
//           className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3)_0%,rgba(0,0,0,0.5)_100%)]"
//           style={{ y: yOffsetBackground }}
//         />

//         {/* Optional Overlay */}
//         <motion.div
//           className="absolute inset-0 opacity-5 mix-blend-overlay"
//           style={{ y: yOffsetBackground }}
//         />
//       </div>

//       {/* Main content container */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
//         {/* Hero image */}
//         <div className="absolute inset-0 z-0">
//           <motion.img
//             src="https://glidex.wpengine.com/rtl-demo/wp-content/uploads/sites/5/2024/07/Home-02-Slider-fg-1536x760.png"
//             alt="Person wearing VR headset"
//             className="w-full h-full object-cover scale-[1] sm:scale-125 md:scale-150 mt-20 object-center"
//             style={{ y: yOffsetBackground }}
//           />
//           <motion.div
//             className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/30 to-blue-900/50 mix-blend-multiply"
//             style={{ y: yOffsetBackground }}
//           />
//         </div>
//         {/* Bottom overlay */}
// <motion.div
//   className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"
//   style={{ y: yOffsetBackground }}
// ></motion.div>

//         {/* Text content */}
//         <motion.div
//           className="relative z-[-1] mb-[18rem] max-w-6xl mx-auto"
//   style={{ y: yOffsetText }}
//   initial={{ opacity: 0 }}
//   animate={{ opacity: 1 }}
//   transition={{ duration: 1 }}
//         >
//           <h1 className="text-white text-5xl sm:text-6xl opacity-65 md:text-8xl font-black text-shadow text-center leading-tight">
//             Worlds Virtual Through Reality Redefine
//           </h1>
//         </motion.div>

//         <div className="absolute bottom-0 left-0 right-0 z-[1] max-w-4xl mb-[4.2rem] mx-auto">
//           <motion.h1
//             className="text-white h1 font-bold mb-1 leading-tight"
// initial={{ opacity: 0, y: 50 }}
// animate={{ opacity: 1, y: 0 }}
// transition={{ duration: 1.2, delay: 0.3 }}
//           >
//             Explore all our prompt here
//           </motion.h1>

//           {/* CTA Buttons */}
//           <motion.div
// className="flex mb-12 justify-center"
// initial={{ scale: 0 }}
// animate={{ scale: 1 }}
// transition={{ duration: 0.5, delay: 0.5 }}
//           >
//             <button className="px-8 py-2 rounded-full bg-purple-900/60 text-white hover:bg-purple-900/80 transition-colors duration-300 backdrop-blur-sm border border-purple-700/50">
//               View Collection
//             </button>
//           </motion.div>
//         </div>
//       </div>
//     </div>
//   );
// }
import React from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { vrrobot } from '../../assets/img/explore';
import { fireBG } from '../../assets/video';
import BlurInText from '../framer-motion/animations/BlurInText';

export default function ExploreHero() {
  const { scrollY } = useViewportScroll();

  // Parallax effect for elements
  const yOffsetBackground = useTransform(scrollY, [0, 500], ['0%', '-20%']);
  const yOffsetText = useTransform(scrollY, [0, 300], ['0%', '10%']);

  const windowWidth = window.innerWidth;

  return (
    <div
      className={`relative min-h-screen w-full bg-black overflow-hidden z-0`}
    >
      {/* Background gradient effects */}
      <div className="absolute inset-0">
        <div
          style={{ y: yOffsetBackground }}
          className="absolute inset-0 bg-black opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3)_0%,rgba(0,0,0,0.5)_100%)]" />
      </div>
      <div className="absolute inset-0">
        {/* Background Video */}
        <video
          className="absolute inset-0 w-full h-full object-cover scale-125 z-[1] opacity-90"
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={fireBG} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3)_0%,rgba(0,0,0,0.5)_100%)]" />

        {/* Optional Overlay */}
        <div className="absolute inset-0 opacity-5 mix-blend-overlay" />
      </div>

      {/* Main content container */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen  md:min-h-[120vh] text-center px-4">
        {/* Hero image */}

        <div className="absolute inset-0 z-0">
          <motion.img
            src={vrrobot}
            alt="Robot wearing VR headset"
            className="w-full h-full object-cover mt-16 object-center"
            style={{ y: yOffsetBackground, scale: windowWidth < 768 ? 1 : 1.3 }}
          />
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/30 to-blue-900/50 mix-blend-multiply" />
        </div>
        {/* Bottom overlay */}
        <div className="absolute bottom-0 left-0 right-0 h-[80%] bg-gradient-to-t from-black to-transparent"></div>

        {/* Text content */}
        <motion.div
          style={{ y: yOffsetText }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          className="relative z-[-1] mb-[18rem] max-w-6xl mx-auto"
        >
          <h5 className="text-white text-5xl sm:text-6xl md:text-8xl font-black text-shadow text-left lg:text-center leading-tight">
            <BlurInText
              duration={0.8}
              text="Discover a world of creative possibilities"
              // text="Worlds Virtual Through Reality Redefine"
              className="text-white text-5xl sm:text-6xl md:text-8xl font-black text-shadow text-left lg:text-center leading-tight"
            />
          </h5>
        </motion.div>
        <motion.div className="absolute bottom-0 space-y-4 left-0 right-0 z-[1] max-w-4xl mb-[4.2rem] mx-auto">
          <motion.h1
            className="text-white h1 font-bold text-shadow leading-tight"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.3 }}
          >
            {/* Explore all our prompts */}
            Explore Thousands of Prompts
          </motion.h1>

          {/* CTA Buttons */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex  justify-center"
          >
            <button className="px-8 py-2 rounded-full bg-purple-900/60 text-white hover:bg-purple-900/80 transition-colors duration-300 backdrop-blur-sm border border-purple-700/50">
              <a href="#viewcollection">Find My Prompt</a>
            </button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

// import React from 'react';

// export default function ExploreHero() {
//   return (
//     <div className={`relative min-h-screen w-full bg-black overflow-hidden`}>
//       {/* Background gradient effects */}
//       <div className="absolute inset-0">
//         <div className="absolute inset-0 bg-black opacity-90" />
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-transparent" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3)_0%,rgba(0,0,0,0.5)_100%)]" />
//       </div>
//       <div className="absolute inset-0">
//         {/* Background Video */}
//         <video
//           className="absolute inset-0 w-full h-full object-cover scale-125 z-[1] opacity-90"
//           autoPlay
//           loop
//           muted
//           playsInline

//         >
//           <source
//             src="https://wedesignthemes.s3.amazonaws.com/glidex/slider-2-bg-video.mp4"
//             type="video/mp4"
//           />
//           Your browser does not support the video tag.
//         </video>

//         {/* Gradient Overlay */}
//         <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-blue-500/20 to-transparent" />
//         <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.3)_0%,rgba(0,0,0,0.5)_100%)]" />

//         {/* Optional Overlay */}
//         <div className="absolute inset-0 opacity-5 mix-blend-overlay" />
//       </div>

//       {/* Main content container */}
//       <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
//         {/* Hero image */}
//         {/* <div className="absolute inset-0 z-0">
//           <img
//             src="https://glidex.wpengine.com/rtl-demo/wp-content/uploads/sites/5/2024/07/Home-02-Slider-fg-1536x760.png"
//             alt="Person wearing VR headset"
//             className="w-full h-full object-cover object-center"
//           />
//         </div> */}
//         <div className="absolute inset-0 z-0">
//           <img
//             src="https://glidex.wpengine.com/rtl-demo/wp-content/uploads/sites/5/2024/07/Home-02-Slider-fg-1536x760.png"
//             alt="Person wearing VR headset"
//             className="w-full h-full object-cover scale-[1] sm:scale-125 mt-20 object-center"
//           />
//           <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 via-purple-800/30 to-blue-900/50 mix-blend-multiply" />
//         </div>
//         {/* Bottom overlay */}
//         <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black to-transparent"></div>

//         {/* Text content */}
//         <div className="relative z-[-1] mb-[18rem] max-w-6xl mx-auto">
//           <h1 className="text-white text-5xl sm:text-6xl opacity-65 md:text-8xl font-black text-shadow text-center leading-tight">
//             Worlds Virtual Through Reality Redefine
//           </h1>
//         </div>
//         <div className="absolute bottom-0 left-0 right-0 z-[1] max-w-4xl mb-[4.2rem] mx-auto">
//           <h1 className="text-white h1 font-bold mb-1 leading-tight">
//           Explore all our prompt here
//           </h1>

//           {/* CTA Buttons */}
//           <div className="flex mb-12 justify-center">
//             <button className="px-8 py-2 rounded-full bg-purple-900/60 text-white hover:bg-purple-900/80 transition-colors duration-300 backdrop-blur-sm border border-purple-700/50">
//               View Collection
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }