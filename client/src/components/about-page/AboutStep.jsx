// import React from 'react';
// import { Sparkles } from 'lucide-react';
// import { avatar1, avatar2, avatar3, avatar4, avatar5, avatar6, avatar7 } from '../../assets/img/blogpage';

// export default function AboutStep() {
//   return (
//     <div className="w-full bg-gradient-to-br from-gray-900 via-purple-900/40 to-gray-900 font-sans text-white px-12 py-8 flex flex-col items-center">

//       <div className="text-center mb-12">
//         <h2 className="text-2xl font-semibold text-[#D1D5DB]">
//           CREATE IN 3 EASY STEPS
//         </h2>
//         <h1 className="text-6xl font-bold">
//           <span className="text-[#9857D3]">TRENDING</span>
//           <span className="text-white"> NOW</span>
//         </h1>
//         <p className="text-gray-400 text-lg">
//           Check out the latest and trending NFT to Bid, Purchase and make
//           profit.
//         </p>
//       </div>

//       <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 place-items-center z-[1] w-full">
//         {/* Step 1 */}
//         <div className="w-[380px] h-[380px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-2xl hover:scale-105 transition-transform duration-300">
//           <div>
//             <div className="bg-[#805AD5] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white">
//               01
//             </div>
//             <h3 className="text-2xl font-semibold mb-2 text-white">
//               Enter a detailed description of the image you want to generate.
//             </h3>
//           </div>
//           <div className="flex flex-wrap gap-2">
//             {[
//               'Animal',
//               'Space',
//               'Illustration',
//               'Retro',
//               'Cinema',
//               'Fashion',
//               'Landscape',
//               'Cyberpunk',
//               'Canon',
//             ].map((tag, index) => (
//               <span
//                 key={index}
//                 className={`px-3 py-1 rounded-full text-sm ${getTagColor(index)}`}
//               >
//                 {tag}
//               </span>
//             ))}
//           </div>
//         </div>

//         {/* Step 2 */}
//         <div className="w-[380px] h-[380px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-lg hover:scale-105 transition-transform duration-300">
//           <div>
//             <div className="bg-[#A855F7] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white">
//               02
//             </div>
//             <h3 className="text-2xl font-semibold mb-2 text-white">
//               Select the artistic style that best matches your creative vision.
//             </h3>
//           </div>
//           <div className="flex justify-center -space-x-2">
//             {/* {[1, 2, 3, 4].map((_, index) => (
//               <div
//                 key={index}
//                 className="w-16 h-16 rounded-full bg-gradient-to-br from-[#805AD5] via-[#A855F7] to-[#D53F8C]"
//               />
//             ))} */}
//             <div className="w-16 h-16 -rotate-45 rounded-full bg-gradient-to-br from-[#805AD5] via-[#A855F7] to-[#D53F8C]">
//               <img
//                 src={avatar7}
//                 alt=""
//                 className="w-full h-full rounded-full object-cover"
//               />
//             </div>
//             <div className="w-16 h-24 rotate-[-15deg] rounded-full bg-gradient-to-br from-[#805AD5] via-[#A855F7] to-[#D53F8C]">
//               <img
//                 src={avatar4}
//                 alt=""
//                 className="w-full h-full rounded-full object-cover"
//               />
//             </div>
//             <div className="w-16 h-16 scale-110 rounded-full bg-gradient-to-br from-[#805AD5] via-[#A855F7] to-[#D53F8C]">
//               <img
//                 src={avatar3}
//                 alt=""
//                 className="w-full h-full rounded-full object-cover"
//               />
//             </div>
//             <div className="w-16 h-24 rounded-full rotate-[15deg] bg-gradient-to-br from-[#805AD5] via-[#A855F7] to-[#D53F8C]">
//               <img
//                 src={avatar2}
//                 alt=""
//                 className="w-full h-full rounded-full object-cover"
//               />
//             </div>
//             <div className="w-16 h-16 rotate-45 rounded-full bg-gradient-to-br from-[#805AD5] via-[#A855F7] to-[#D53F8C]">
//               <img
//                 src={avatar1}
//                 alt=""
//                 className="w-full h-full rounded-full object-cover"
//               />
//             </div>
//           </div>
//         </div>

//         {/* Step 3 */}
//         <div className="w-[380px] h-[380px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-lg hover:scale-105 transition-transform duration-300">
//           <div>
//             <div className="bg-[#6B46C1] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white">
//               03
//             </div>
//             <h3 className="text-2xl font-semibold mb-2 text-white">
//               Let the AI create your image, then preview and download it
//               instantly.
//             </h3>
//           </div>
//           <div className="flex flex-wrap gap-2 justify-center items-center">
//             <span className="text-[#D53F8C] text-2xl font-bold">Create</span>
//             <Sparkles className="text-[#A855F7] w-8 h-8" />
//             <span className="text-[#6B46C1] text-xl">Unlimited</span>
//             <span className="bg-[#A855F7] px-2 py-1 rounded text-sm">
//               Image
//             </span>
//             <span className="bg-[#D1D5DB] px-2 py-1 rounded text-sm text-gray-900">
//               Natural
//             </span>
//             <span className="bg-[#D53F8C] px-2 py-1 rounded text-sm">
//               Radios
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// function getTagColor(index) {
//   const colors = [
//     'bg-[#ff7e79] text-white',
//     'bg-[#79ff8f] text-gray-900',
//     'bg-[#fff379] text-gray-900',
//     'bg-[#79ddff] text-white',
//     'bg-[#ff79f7] text-gray-900',
//     'bg-[#ff9d79] text-gray-900',
//     'bg-[#79ffd4] text-gray-900',
//     'bg-[#79a8ff] text-white',
//     'bg-[#ff79b9] text-gray-900',
//   ];
//   return colors[index % colors.length];
// }

// import React from 'react';
// import { Sparkles } from 'lucide-react';
// import { motion } from 'framer-motion';
// import {
//   avatar1,
//   avatar2,
//   avatar3,
//   avatar4,
//   avatar5,
//   avatar6,
//   avatar7,
// } from '../../assets/img/blogpage';

// const tagVariants = {
//   initial: { opacity: 0, y: 20, scale: 0.8 },
//   animate: index => ({
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     transition: { delay: index * 0.1, duration: 0.6, ease: 'easeOut' },
//   }),
// };

// const cardVariants = {
//   initial: { opacity: 0, scale: 0.8, y: 30 },
//   animate: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: 'easeOut' },
//   },
//   whileInView: { opacity: 1, scale: 1, y: 0 },
//   exit: {
//     opacity: 0,
//     scale: 0.8,
//     y: 30,
//     transition: { duration: 0.5, ease: 'easeInOut' },
//   },
// };

// const avatarVariants = {
//   hover: {
//     scale: 1.2,
//     rotate: [0, -10, 10, 0],
//     transition: { duration: 0.4, ease: 'easeInOut', repeat: 1 },
//   },
//   initial: {
//     opacity: 0.8,
//   },
//   animate: {
//     opacity: 1,
//     transition: { duration: 0.6, ease: 'easeOut' },
//   },
// };

// const AboutStep = () => {
//   return (
//     <div className="w-full bg-gradient-to-br from-gray-900 via-purple-900/40 to-gray-900 font-sans text-white px-12 py-8 flex flex-col items-center">
//       <div className="text-center mb-12">
//         <h2 className="text-2xl font-semibold text-[#D1D5DB]">
//           CREATE IN 3 EASY STEPS
//         </h2>
//         <h1 className="text-6xl font-bold">
//           <span className="text-[#9857D3]">TRENDING</span>
//           <span className="text-white"> NOW</span>
//         </h1>
//         <p className="text-gray-400 text-lg">
//           Check out the latest and trending NFT to Bid, Purchase and make
//           profit.
//         </p>
//       </div>

//       <motion.div
//         className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 place-items-center z-[1] w-full"
//         initial="initial"
//         whileInView="animate"
//         exit="exit"
//         variants={cardVariants}
//         viewport={{ once: false, amount: 0.3 }}
//       >
//         {/* Step 1 */}
//         <motion.div
//           className="w-[380px] h-[380px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-2xl"
//           variants={cardVariants}
//           whileHover={{
//             scale: 1.05,
//             rotate: 5,
//             transition: { duration: 0.4, ease: 'easeInOut' },
//           }}
//         >
//           <div>
//             <div className="bg-[#805AD5] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white">
//               01
//             </div>
//             <h3 className="text-2xl font-semibold mb-2 text-white">
//               Enter a detailed description of the image you want to generate.
//             </h3>
//           </div>
//           <motion.div className="flex flex-wrap gap-2">
//             {[
//               'Animal',
//               'Space',
//               'Illustration',
//               'Retro',
//               'Cinema',
//               'Fashion',
//               'Landscape',
//               'Cyberpunk',
//               'Canon',
//             ].map((tag, index) => (
//               <motion.span
//                 key={index}
//                 className={`px-3 py-1 rounded-full text-sm ${getTagColor(
//                   index
//                 )}`}
//                 custom={index}
//                 initial="initial"
//                 animate="animate"
//                 variants={tagVariants}
//               >
//                 {tag}
//               </motion.span>
//             ))}
//           </motion.div>
//         </motion.div>

//         {/* Step 2 */}
//         <motion.div
//           className="w-[380px] h-[380px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-lg"
//           variants={cardVariants}
//           whileHover={{
//             scale: 1.1,
//             rotate: -3,
//             transition: { duration: 0.4, ease: 'easeInOut' },
//           }}
//         >
//           <div>
//             <div className="bg-[#A855F7] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white">
//               02
//             </div>
//             <h3 className="text-2xl font-semibold mb-2 text-white">
//               Select the artistic style that best matches your creative vision.
//             </h3>
//           </div>
//           <motion.div className="flex justify-center -space-x-2">
//             {[avatar7, avatar4, avatar3, avatar2, avatar1].map(
//               (avatar, index) => (
//                 <motion.div
//                   key={index}
//                   className="w-16 h-16 rounded-full overflow-hidden"
//                   variants={avatarVariants}
//                   whileHover="hover"
//                   initial="initial"
//                   animate="animate"
//                 >
//                   <img
//                     src={avatar}
//                     alt={`avatar-${index}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </motion.div>
//               )
//             )}
//           </motion.div>
//         </motion.div>

//         {/* Step 3 */}
//         <motion.div
//           className="w-[380px] h-[380px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-lg"
//           variants={cardVariants}
//           whileHover={{
//             scale: 1.1,
//             rotate: 3,
//             transition: { duration: 0.4, ease: 'easeInOut' },
//           }}
//         >
//           <div>
//             <div className="bg-[#6B46C1] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white">
//               03
//             </div>
//             <h3 className="text-2xl font-semibold mb-2 text-white">
//               Let the AI create your image, then preview and download it
//               instantly.
//             </h3>
//           </div>
//           <motion.div className="flex flex-wrap gap-2 justify-center items-center">
//             <span className="text-[#D53F8C] text-2xl font-bold">Create</span>
//             <Sparkles className="text-[#A855F7] w-8 h-8" />
//             <span className="text-[#6B46C1] text-xl">Unlimited</span>
//             {['Image', 'Natural', 'Radios'].map((text, index) => (
//               <motion.span
//                 key={index}
//                 className={`px-2 py-1 rounded text-sm ${getTagColor(index)}`}
//                 whileHover={{
//                   scale: 1.2,
//                   rotate: 5,
//                   transition: { duration: 0.3, ease: 'easeInOut' },
//                 }}
//               >
//                 {text}
//               </motion.span>
//             ))}
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// function getTagColor(index) {
//   const colors = [
//     'bg-[#ff7e79] text-white',
//     'bg-[#79ff8f] text-gray-900',
//     'bg-[#fff379] text-gray-900',
//     'bg-[#79ddff] text-white',
//     'bg-[#ff79f7] text-gray-900',
//     'bg-[#ff9d79] text-gray-900',
//     'bg-[#79ffd4] text-gray-900',
//     'bg-[#79a8ff] text-white',
//     'bg-[#ff79b9] text-gray-900',
//   ];
//   return colors[index % colors.length];
// }

// export default AboutStep;

// import React from 'react';
// import { Sparkles } from 'lucide-react';
// import { motion } from 'framer-motion';
// import {
//   avatar1,
//   avatar2,
//   avatar3,
//   avatar4,
//   avatar5,
//   avatar6,
//   avatar7,
// } from '../../assets/img/blogpage';
// import { TagsAnimation } from '../framer-motion/TagsAnimation';

// const tagVariants = {
//   initial: { opacity: 0, y: 2000, scale: 0.8 },
//   animate: index => ({
//     opacity: 1,
//     y: 0,
//     scale: 1,
//     x: `${Math.random() * 50 - 25}px`, // Random horizontal position
//     rotate : Math.random() * 60 - 32,
//     transition: {
//       delay: index * 0.1,
//       duration: 0.8,
//       ease: 'easeOut',
//     },
//   }),
// };

// const cardVariants = {
//   initial: { opacity: 0, scale: 0.8, y: 30 },
//   animate: {
//     opacity: 1,
//     scale: 1,
//     y: 0,
//     transition: { duration: 0.8, ease: 'easeOut' },
//   },
//   whileInView: { opacity: 1, scale: 1, y: 0 },
//   exit: {
//     opacity: 0,
//     scale: 0.8,
//     y: 30,
//     transition: { duration: 0.5, ease: 'easeInOut' },
//   },
// };

// const avatarVariants = {
//   hover: {
//     scale: 1.2,
//     rotate: [0, -10, 10, 0],
//     y: [0, -5, 5, 0], // Adds vertical motion
//     transition: {
//       duration: 0.4,
//       ease: 'easeInOut',
//       repeat: 1,
//     },
//   },
//   initial: {
//     opacity: 0.8,
//   },
//   animate: {
//     opacity: 1,
//     transition: { duration: 0.6, ease: 'easeOut' },
//   },
// };

// const AboutStep = () => {
//   return (
//     <div className="w-full bg-gradient-to-br from-gray-900 via-purple-900/40 to-gray-900 font-sans text-white px-12 py-8 flex flex-col items-center">
//       <div className="text-center mb-12">
//         <motion.h2
//           className="text-2xl font-semibold text-[#D1D5DB]"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.2 }}
//         >
//           CREATE IN 3 EASY STEPS
//         </motion.h2>
//         <motion.h1
//           className="text-6xl font-bold"
//           initial={{ opacity: 0, y: 50 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.4 }}
//         >
//           <span className="text-[#9857D3]">TRENDING</span>
//           <span className="text-white"> NOW</span>
//         </motion.h1>
//         <motion.p
//           className="text-gray-400 text-lg"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 1, delay: 0.6 }}
//         >
//           Check out the latest and trending NFT to Bid, Purchase and make
//           profit.
//         </motion.p>
//       </div>

//       <motion.div
//         className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 place-items-center z-[1] w-full"
//         initial="initial"
//         whileInView="animate"
//         exit="exit"
//         variants={cardVariants}
//         viewport={{ once: false, amount: 0.3 }}
//       >
//         {/* Step 1 */}
//         <motion.div
//           className="w-[380px] h-[380px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-2xl"
//           variants={cardVariants}
//           whileHover={{
//             scale: 1.05,
//             rotate: 5,
//             transition: { duration: 0.4, ease: 'easeInOut' },
//           }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <motion.div
//             className="bg-[#805AD5] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white"
//             whileHover={{
//               rotate: 360,
//               scale: 1.2,
//               transition: { duration: 0.4 },
//             }}
//           >
//             01
//           </motion.div>
//           <h3 className="text-2xl font-semibold mb-2 text-white">
//             Enter a detailed description of the image you want to generate.
//           </h3>
//           <motion.div className="flex flex-wrap gap-2">
//             {[
//               'Animal',
//               'Space',
//               'Illustration',
//               'Retro',
//               'Cinema',
//               'Fashion',
//               'Landscape',
//               'Cyberpunk',
//               'Canon',
//             ].map((tag, index) => (
//               <motion.span
//                 key={index}
//                 className={`px-3 py-1 rounded-full text-sm ${getTagColor(index)}`}
//                 custom={index}
//                 initial="initial"
//                 animate="animate"
//                 variants={tagVariants}
//                 whileHover={{
//                   scale: 1.1,
//                   rotate: 5,
//                   transition: { duration: 0.3 },
//                 }}
//               >
//                 {tag}
//               </motion.span>
//             ))}
//           </motion.div>

//         </motion.div>

//         {/* Step 2 */}
//         <motion.div
//           className="w-[380px] h-[380px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-lg"
//           variants={cardVariants}
//           whileHover={{
//             scale: 1.1,
//             rotate: -3,
//             transition: { duration: 0.4, ease: 'easeInOut' },
//           }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <div>
//             <div className="bg-[#A855F7] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white">
//               02
//             </div>
//             <h3 className="text-2xl font-semibold mb-2 text-white">
//               Select the artistic style that best matches your creative vision.
//             </h3>
//           </div>
//           <motion.div className="flex justify-center -space-x-2">
//             {[avatar7, avatar4, avatar3, avatar2, avatar1].map(
//               (avatar, index) => (
//                 <motion.div
//                   key={index}
//                   className="w-16 h-16 rounded-full overflow-hidden"
//                   variants={avatarVariants}
//                   whileHover="hover"
//                   initial="initial"
//                   animate="animate"
//                   whileTap={{ scale: 0.95 }}
//                 >
//                   <img
//                     src={avatar}
//                     alt={`avatar-${index}`}
//                     className="w-full h-full object-cover"
//                   />
//                 </motion.div>
//               )
//             )}
//           </motion.div>
//         </motion.div>

//         {/* Step 3 */}
//         <motion.div
//           className="w-[380px] h-[380px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-lg"
//           variants={cardVariants}
//           whileHover={{
//             scale: 1.1,
//             rotate: 3,
//             transition: { duration: 0.4, ease: 'easeInOut' },
//           }}
//           whileTap={{ scale: 0.95 }}
//         >
//           <div>
//             <div className="bg-[#6B46C1] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white">
//               03
//             </div>
//             <h3 className="text-2xl font-semibold mb-2 text-white">
//               Let the AI create your image, then preview and download it
//               instantly.
//             </h3>
//           </div>
//           <motion.div className="flex flex-wrap gap-2 justify-center items-center">
//             <span className="text-[#D53F8C] text-2xl font-bold">Create</span>
//             <Sparkles className="text-[#A855F7] w-8 h-8" />
//             <span className="text-[#6B46C1] text-xl">Unlimited</span>
//             {['Image', 'Natural', 'Radios'].map((text, index) => (
//               <motion.span
//                 key={index}
//                 className={`px-2 py-1 rounded text-sm ${getTagColor(index)}`}
//                 whileHover={{
//                   scale: 1.2,
//                   rotate: 5,
//                   transition: { duration: 0.3, ease: 'easeInOut' },
//                 }}
//                 whileTap={{ scale: 0.95 }}
//               >
//                 {text}
//               </motion.span>
//             ))}
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// function getTagColor(index) {
//   const colors = [
//     'bg-[#ff7e79] text-white',
//     'bg-[#79ff8f] text-gray-900',
//     'bg-[#fff379] text-gray-900',
//     'bg-[#79ddff] text-white',
//     'bg-[#ff79f7] text-gray-900',
//     'bg-[#ff9d79] text-gray-900',
//     'bg-[#79ffd4] text-gray-900',
//     'bg-[#79a8ff] text-white',
//     'bg-[#ff79b9] text-gray-900',
//   ];
//   return colors[index % colors.length];
// }

// export default AboutStep;

import React from 'react';
import { Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import {
  avatar1,
  avatar2,
  avatar3,
  avatar4,
  avatar5,
  avatar6,
  avatar7,
} from '../../assets/img/blogpage';
import AnimatedLogoCloud from '../framer-motion/animations/AnimatedLogoCloud';

const tagVariants = index => ({
  initial: { opacity: 0, y: -100, scale: 0.8 }, // Start from above the view
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    x: `${Math.random() * 30 - 10}px`, // Random horizontal position
    rotate: Math.random() * 60 - 30,
    transition: {
      delay: index * 0.1,
      duration: 0.8,
      ease: 'easeOut',
    },
  },
});

const cardVariants = {
  initial: { opacity: 0, scale: 0.8, y: 30 },
  animate: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const avatarVariants = {
  hover: {
    scale: 1.2,
    rotate: [0, -10, 10, 0],
    y: [0, -5, 5, 0],
    transition: {
      duration: 0.4,
      ease: 'easeInOut',
      repeat: 1,
    },
  },
  initial: { opacity: 0.8 },
  animate: { opacity: 1, transition: { duration: 0.6, ease: 'easeOut' } },
};

const AboutStep = () => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-purple-900/40 to-gray-900 font-sans text-white ">
      <div className="w-full overflow-hidden container mx-auto lg:px-12 py-8 flex flex-col items-center">
        <div className="text-center space-y-2 mb-12">
          <motion.h2
            className="text-2xl font-semibold text-[#D1D5DB]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            CREATE IN 3 EASY STEPS
          </motion.h2>
          <motion.h1
            className="h1 font-bold uppercase"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
            <span className="text-white">A Three </span>
            <span className="text-[#9857D3]">Magic</span>
            <span className="text-white"> steps</span>
          </motion.h1>
          <motion.p
            className="text-gray-400 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
          >
            {/* Experience the magic of AI art creation in minutes today! */}
            Craft the Perfect Prompt: Follow this simple three-step guide today!
          </motion.p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 md:gap-4 gap-10 place-items-center z-[1] w-full "
          // className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 gap-4 place-items-center z-[1] w-full"
          initial="initial"
          // whileInView="animate"
          // exit="exit"
          // variants={cardVariants}
          // viewport={{ once: false, amount: 0.3 }}
        >
          {/* Step 1 */}
          <motion.div
            className="w-full max-w-[380px] overflow-hidden h-full max-h-[400px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-2xl"
            // className="w-[380px] h-[380px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-2xl"
            variants={cardVariants}
            whileInView="animate"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{
              scale: 1.05,
              rotate: 5,
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              className="bg-[#805AD5] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white"
              whileHover={{
                rotate: 360,
                scale: 1.2,
                transition: { duration: 0.4 },
              }}
            >
              01
            </motion.div>
            <h3 className="text-2xl font-semibold mb-2 text-white">
              {/* Enter a detailed description of the image you want to generate. */}
              Start with the subject: What do you want to see? Be specific!
            </h3>
            <motion.div className="flex flex-wrap gap-2">
              {[
                'Photography',
                'Graphic',
                'Illustration',
                'Novel',
                'Code',
                'Script',
                'Development',
                'Lyrics',
                'Design',
                'Film',
                'Email',
                'Anime',
              ].map((tag, index) => (
                <motion.span
                  key={index}
                  className={`px-3 py-1 rounded-full font-semibold text-shadow text-sm ${getTagColor(index)}`}
                  custom={index}
                  variants={tagVariants(index)}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: false }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    transition: { duration: 0.3 },
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>

          {/* Step 2 */}
          <motion.div
            className="w-full max-w-[380px] h-full max-h-[400px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-lg"
            whileInView="animate"
            exit="exit"
            variants={cardVariants}
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{
              scale: 1.1,
              rotate: -3,
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div>
              <div className="bg-[#A855F7] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white">
                02
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">
                Mood and tone: Describe the desired mood or feeling.
              </h3>
            </div>
            <motion.div className="flex justify-center -space-x-2">
              {[avatar7, avatar4, avatar3, avatar2, avatar1].map(
                (avatar, index) => (
                  <motion.div
                    key={index}
                    variants={avatarVariants}
                    whileHover="hover"
                  >
                    <img
                      src={avatar}
                      alt={`avatar-${index}`}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                )
              )}
            </motion.div>
          </motion.div>

          {/* Step 3 */}
          <motion.div
            className="w-full max-w-[380px] h-full max-h-[400px] bg-purple-800/10 backdrop-blur-3xl rounded-3xl p-8 flex flex-col justify-between border border-[#A855F7] shadow-lg"
            variants={cardVariants}
            whileInView="animate"
            exit="exit"
            viewport={{ once: false, amount: 0.3 }}
            whileHover={{
              scale: 1.1,
              rotate: 3,
              transition: { duration: 0.4, ease: 'easeInOut' },
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div>
              <div className="bg-[#6B46C1] w-12 h-12 rounded-lg flex items-center justify-center text-xl font-bold mb-4 text-white">
                03
              </div>
              <h3 className="text-2xl font-semibold mb-2 text-white">
                {/* Let the AI create your image, then preview and download it
              instantly. */}
                Keywords: Play with keywords to find the best fit for prompts.
              </h3>
            </div>
            <motion.div className="flex flex-wrap gap-2 justify-center items-center">
              <span className="text-[#D53F8C] text-2xl font-bold">Fantasy</span>
              <Sparkles className="text-[#A855F7] w-8 h-8" />
              <span className="text-[#6B46C1] text-xl">Unlimited</span>
              {['Fearful', 'Calculate', 'Adventure'].map((text, index) => (
                <motion.span
                  key={index}
                  className={`px-2 py-1 rounded text-neutral-100 text-shadow text-sm ${getTagColor(Math.floor(Math.random() * 12))}`}
                  whileHover={{
                    scale: 1.2,
                    rotate: 5,
                    transition: { duration: 0.3, ease: 'easeInOut' },
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  {text}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>
        <div className="pt-12">
          <h2 className="text-xl text-center font-semibold text-[#D1D5DB] -mb-10">
            Our supported tools
          </h2>

          <AnimatedLogoCloud />
        </div>
      </div>
    </div>
  );
};

function getTagColor(index) {
  const colors = [
    'bg-[#ff7e79] text-gray-900',
    'bg-[#79ff8f] text-gray-900',
    'bg-[#fff379] text-gray-900',
    'bg-[#79ddff] text-gray-900',
    'bg-[#ff79f7] text-gray-900',
    'bg-[#ff9d79] text-gray-900',
    'bg-[#79ffd4] text-gray-900',
    'bg-[#79a8ff] text-gray-900',
    'bg-[#ff79b9] text-gray-900',
    'bg-[#A855F7] text-gray-900',
    'bg-[#D53F8C] text-gray-900',
  ];
  return colors[index % colors.length];
}

export default AboutStep;
