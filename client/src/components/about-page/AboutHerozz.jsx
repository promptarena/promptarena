import { motion, useScroll, useTransform } from 'framer-motion';
import { purpleWithHelmetRobotRight } from '../../assets/img/aboutpage';
import { Link } from 'react-router-dom';
import { siteName } from '../../config/envConfig';

export default function AboutHerozz() {
  // Framer Motion Scroll Hook for Parallax
  const { scrollYProgress } = useScroll();
  const yText = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const yImage = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0.3, 0.6]);

  return (
    <div className="relative md:pt-0 pt-10 min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-black via-purple-900/40 to-black overflow-hidden">
      {/* Background gradient overlay with parallax effect */}
      <motion.div
        className="bg-svg inset-0 absolute rotate-[180deg] opacity-30"
        // style={{ y: yText, opacity: opacityOverlay }}
      />
      <motion.div
        className="absolute inset-0 min-h-[110vh] bg-gradient-to-r from-black/70 via-transparent to-transparent z-10"
        style={{ y: yText }}
      />

      {/* Main content container */}
      <div className="relative z-20 container mx-auto flex flex-col lg:flex-row items-center lg:items-stretch justify-between">
        {/* Text content with parallax effect */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="lg:w-1/2 w-full text-center space-y-2 md:space-y-0 lg:text-left"
          style={{ y: yText }}
        >
          <h3 className="h1 md:mt-10 uppercase lg:mt-5 md:ml-0 lg:ml-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold">
            Know ABOUT
          </h3>
          <h2 className=" text-3xl uppercase sm:text-4xl md:text-5xl lg:text-[7.70rem] text-nowrap text-white font-extrabold text-shadow-lg font-syncopate">
            {siteName}
          </h2>
          {/* <h1 className="text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold">
            A NEW ERA
          </h1> */}

          <p className="text-gray-300 pb-8 md:pb-4 lg:pb-5 max-w-xl text-lg leading-relaxed mx-auto lg:mx-0">
            {siteName} envisions a world where AI is accessible to all,
            empowering individuals to explore new forms of creative expression,
            solve complex problems, and foster innovation. We provide a platform
            for prompt discovery, creation, and collaboration.
          </p>

          <motion.button
            whileHover={{ scale: 1.08, rotate: 1 }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-2  text-sm bg-purple-700/20 border-2 border-purple-500 text-purple-300 hover:bg-purple-600/50 hover:border-purple-400 hover:text-white transition-all duration-300 shadow-lg rounded-full relative group"
          >
            <span className="relative z-10 flex items-center justify-center">
              <Link to="/prompt" className="mr-2">
                Discover Prompts Now!
              </Link>
            </span>
            <div className="absolute inset-0 bg-purple-500/30 blur-sm group-hover:bg-purple-600/50 transition-all duration-300 rounded-full" />
          </motion.button>
        </motion.div>

        {/* Hero image with parallax and tilt effect */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          whileHover={{ scale: 1.02, rotate: [0, 1, -1, 0] }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="lg:w-1/2 mt-16 lg:mt-0 flex justify-center md:justify-end"
          style={{ y: yImage }}
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-purple-600/20 blur-3xl rounded-full" />
            <div className="absolute -inset-8 bg-pink-600/20 blur-2xl rounded-full animate-pulse" />

            <img
              src={purpleWithHelmetRobotRight}
              alt="Purple with Helmet Robot"
              className="relative z-10 w-full bottom-0 h-[110%] max-w-[85%] float-right"
              style={{
                filter: 'drop-shadow(10px 10px 30px rgba(0, 0, 0, 0.5))',
              }}
            />
          </div>
        </motion.div>
      </div>

      {/* Animated gradient lines */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30"
            style={{
              top: `${20 + i * 15}%`,
              left: '-100%',
              right: '-100%',
            }}
            animate={{ x: ['-100%', '100%'] }}
            transition={{
              duration: 3 + i * 1.5,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
      </div>
    </div>
  );
}
// import { motion, useScroll, useTransform } from 'framer-motion';
// import { purpleWithHelmetRobotRight } from '../../assets/img/aboutpage';

// export default function AboutHerozz() {
//   // Framer Motion Scroll Hook for Parallax
//   const { scrollYProgress } = useScroll();
//   const yText = useTransform(scrollYProgress, [0, 1], [0, -50]);
//   const yImage = useTransform(scrollYProgress, [0, 1], [0, -90]);
//   const opacityOverlay = useTransform(scrollYProgress, [0, 1], [0.3, 0.6]);

//   return (
//     <div className="relative md:pt-0 pt-10 min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-black via-purple-900/40 to-black overflow-hidden">
//       {/* Background gradient overlay with parallax effect */}
//       <motion.div
//         className="bg-svg inset-0 absolute rotate-[180deg] opacity-30"
//         // style={{ y: yText, opacity: opacityOverlay }}
//       />
//       <motion.div
//         className="absolute inset-0 min-h-[110vh] bg-gradient-to-r from-black/70 via-transparent to-transparent z-10"
//         style={{ y: yText }}
//       />

//       {/* Main content container */}
//       <div className="relative z-20 container mx-auto flex flex-col lg:flex-row items-center justify-between">
//         {/* Text content with parallax effect */}
//         <motion.div
//           initial={{ opacity: 0, x: -50 }}
//           animate={{ opacity: 1, x: 0 }}
//           transition={{ duration: 0.8 }}
//           className="lg:w-1/2 text-center lg:text-left"
//           style={{ y: yText }}
//         >
//           <h3 className="h1 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold">
//             ABOUT US
//           </h3>
//           <h2 className="text-4xl md:text-5xl my-2 lg:text-9xl text-nowrap text-white font-extrabold text-shadow-lg font-syncopate">
//             PROMTARENA
//           </h2>
//           {/* <h1 className="text-3xl md:text-5xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 font-bold">
//             A NEW ERA
//           </h1> */}

//           <p className="text-gray-300 max-w-xl md:-mt-10 mt-4 text-lg leading-relaxed mx-auto lg:mx-0">
//             We envision a world where AI technology is accessible to everyone
//             and empowers individuals to unleash their creativity and solve
//             complex problems. PromptArena aims to be the leading platform for
//             prompt discovery, fostering a vibrant community of AI enthusiasts,
//             inspiring innovation.
//           </p>

//           <motion.button
//             whileHover={{ scale: 1.08, rotate: 1 }}
//             whileTap={{ scale: 0.95 }}
//             className="px-8 py-2 my-5 md:mb-[8rem] text-sm bg-purple-700/20 border-2 border-purple-500 text-purple-300 hover:bg-purple-600/50 hover:border-purple-400 hover:text-white transition-all duration-300 shadow-lg rounded-full relative group"
//           >
//             <span className="relative z-10 flex items-center justify-center">
//               <span className="mr-2">Discover Prompts Now!</span>
//               {/* <motion.div
//                 className="w-4 h-4 bg-pink-500 rounded-full animate-ping"
//                 animate={{ x: [0, 10, 0], y: [0, -10, 0] }}
//                 transition={{ repeat: Infinity, duration: 1.5 }}
//               /> */}
//             </span>
//             <div className="absolute inset-0 bg-purple-500/30 blur-sm group-hover:bg-purple-600/50 transition-all duration-300 rounded-full" />
//           </motion.button>
//         </motion.div>

//         {/* Hero image with parallax and tilt effect */}
//         <motion.div
//           initial={{ opacity: 0, x: 50 }}
//           animate={{ opacity: 1, x: 0 }}
//           whileHover={{ scale: 1.02, rotate: [0, 1, -1, 0] }}
//           transition={{ duration: 0.8, delay: 0.2 }}
//           className="lg:w-1/2 mt-16 lg:mt-0 flex justify-center lg:justify-end"
//           style={{ y: yImage }}
//         >
//           <div className="relative">
//             <div className="absolute -inset-4 bg-purple-600/20 blur-3xl rounded-full" />
//             <div className="absolute -inset-8 bg-pink-600/20 blur-2xl rounded-full animate-pulse" />

//             <img
//               src={purpleWithHelmetRobotRight}
//               alt="Purple with Helmet Robot"
//               className="relative z-10 w-full bottom-0 h-[110%] max-w-[85%] float-right"
//               style={{
//                 filter: 'drop-shadow(10px 10px 30px rgba(0, 0, 0, 0.5))',
//               }}
//             />
//           </div>
//         </motion.div>
//       </div>

//       {/* Animated gradient lines */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         {[...Array(5)].map((_, i) => (
//           <motion.div
//             key={i}
//             className="absolute h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-30"
//             style={{
//               top: `${20 + i * 15}%`,
//               left: '-100%',
//               right: '-100%',
//             }}
//             animate={{ x: ['-100%', '100%'] }}
//             transition={{
//               duration: 3 + i * 1.5,
//               repeat: Infinity,
//               ease: 'linear',
//             }}
//           />
//         ))}
//       </div>
//     </div>
//   );
// }
