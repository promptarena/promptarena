// import React from 'react';

// function BlogMainHero() {
//   return (
//     <div className="w-full h-screen bg-black flex justify-center items-center">
//       <div className="max-w-7xl w-full px-8 text-white flex flex-col md:flex-row items-center gap-10">
//         {/* Left Section - Text */}
//         <div className="flex-1">
//           <div className="bg-purple-600 text-white text-sm font-medium px-3 py-1 inline-block rounded-full mb-4">
//             Lightning-fast, low-cost, easy.
//           </div>
//           <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
//             Your AI-Powered 3D Builder
//           </h1>
//           <p className="text-lg text-gray-300 mb-8">
//             Create stunning 3D assets effortlessly. No coding required.
//           </p>
//           <div className="flex gap-4">
//             <a
//               href="#"
//               className="bg-purple-600 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition"
//             >
//               Start creating 3D
//             </a>
//             <a
//               href="#"
//               className="text-purple-400 px-6 py-3 rounded-full text-lg font-semibold border border-purple-600 hover:bg-purple-600 hover:text-white transition"
//             >
//               Guide
//             </a>
//           </div>
//         </div>

//         {/* Right Section - Image and Features */}
//         <div className="flex-1 relative">
//           {/* Robot Image */}
//           <img
//             src="http://localhost:8000/src/assets/img/aboutpage/purple-robot-with-helmet-right.png"
//             alt="Robot Illustration"
//             className="w-full h-auto rounded-lg"
//           />

//           {/* Feature Tags */}
//           <div className="absolute top-10 left-0 bg-black bg-opacity-50 text-white text-sm px-4 py-2 rounded-full">
//             No GPU needed
//           </div>
//           <div className="absolute bottom-20 left-0 bg-black bg-opacity-50 text-white text-sm px-4 py-2 rounded-full">
//             Super low-cos
//           </div>
//           <div className="absolute bottom-10 right-0 bg-black bg-opacity-50 text-white text-sm px-4 py-2 rounded-full">
//             Up to 12 images per session
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default BlogMainHero;

import React from 'react';
import VelocityText from '../framer-motion/animations/VelocityText';
import { siteName } from '../../config/envConfig';
import { Link } from 'react-router-dom';
import { robotDownView } from '../../assets/img/blogpage';

function BlogMainHero() {
  return (
    <div className="w-full min-h-screen pt-10 bg-gradient-to-br from-purple-600/30 via-[#59078867] to-[#4b006e] ">
      <div className="flex justify-center items-center">
        <div className="max-w-7xl w-full px-8 text-white flex flex-col md:flex-row items-center gap-10">
          {/* Left Section - Text */}
          <div className="flex-1">
            <div className="bg-gradient-to-r from-purple-500 to-purple-700 text-white text-sm font-medium px-4 py-1 inline-block rounded-full mb-6 shadow-md">
              No limitations. Endless possibilities
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
              {/* Navigate Our Prompting */}
              AI Prompting Blog
            </h1>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed max-w-lg">
              Amazing AI-generated content with our vast library of free prompts
              and insightful blog articles.
            </p>
            <div className="flex gap-4">
              <Link
                to="/prompt"
                className="bg-gradient-to-r from-purple-600 to-purple-800 text-white text-nowrap sm:px-8 px-4 sm:py-3 py-2 rounded-full text-lg font-semibold shadow-xl hover:opacity-90 transition transform hover:scale-105"
              >
                Browse Prompts
              </Link>
              <a
                href="#view-blogs"
                className="text-purple-400 sm:px-8 px-4 sm:py-3 py-2 text-nowrap rounded-full text-lg font-semibold border border-purple-500 hover:bg-purple-600 hover:text-white transition shadow-lg transform hover:scale-105"
              >
                View Blogs
              </a>
            </div>
          </div>

          {/* Right Section - Image and Features */}
          <div className="flex-1 relative bottom-0 ">
            {/* Robot Image */}
            <img
              src={robotDownView}
              alt="Robot Illustration"
              className="w-full h-full object-cover drop-shadow-[0_0_0.3rem_rgb(166,83,246,0.5)]"
            />

            {/* Feature Tags */}
            <div className="absolute text-xs md:text-sm top-10 left-5  text-white glass-panel ring-1 ring-neutral-400 px-4 py-2 rounded-full shadow-lg">
              AI-Powered Simplicity
            </div>
            <div className="absolute text-xs md:text-sm bottom-32 left-5 glass-panel ring-1 ring-neutral-400 text-white px-4 py-2 rounded-full shadow-lg">
              Super Savings
            </div>
            <div className="absolute text-xs md:text-sm bottom-10 right-5 glass-panel ring-1 ring-neutral-400 text-white px-4 py-2 rounded-full shadow-lg">
              Get inspired. Get creating. Get {siteName}
            </div>
          </div>
        </div>
      </div>
      <VelocityText
        mainTextStyle="p-0 glass-panel"
        skewDegrees={['10deg', '-0deg']}
      >
        <h6 className="h1 font-extrabold font-share-tech-mono tracking-widest text-[#d3aff5] border-[1px] border-x-0 border-neutral-300/60">
          <span>
            UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
            <span className="text-[#bcb9c0]">✧</span>{' '}
          </span>
          <span>
            UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
            <span className="text-[#bcb9c0]">✧</span>{' '}
          </span>
          <span>
            UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
            <span className="text-[#bcb9c0]">✧</span>{' '}
          </span>
          <span>
            UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
            <span className="text-[#bcb9c0]">✧</span>{' '}
          </span>
          <span>
            UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
            <span className="text-[#bcb9c0]">✧</span>{' '}
          </span>
        </h6>
      </VelocityText>
      <VelocityText
        xRange={[-4000, 0]}
        mainTextStyle="p-0 glass-panel"
        skewDegrees={['10deg', '-0deg']}
      >
        <h1 className="h1 font-extrabold font-roboto-mono tracking-widest text-[#d3aff5] border-[1px] border-x-0 border-neutral-300/60">
          <span>
            UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
            <span className="text-[#bcb9c0]">✧</span>{' '}
          </span>
          <span>
            UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
            <span className="text-[#bcb9c0]">✧</span>{' '}
          </span>
          <span>
            UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
            <span className="text-[#bcb9c0]">✧</span>{' '}
          </span>
          <span>
            UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
            <span className="text-[#bcb9c0]">✧</span>{' '}
          </span>
          <span>
            UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
            <span className="text-[#bcb9c0]">✧</span>{' '}
          </span>
        </h1>
      </VelocityText>
    </div>
  );
}

export default BlogMainHero;
