// import React from 'react';

// const HeroSection = () => {
//   return (
//     <div className="relative isolate overflow-hidden bg-gray-900">
//       <svg
//         className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
//         aria-hidden="true"
//       >
//         <defs>
//           <pattern
//             id="pattern-hero"
//             width="200"
//             height="200"
//             x="100%"
//             y="-1"
//             patternUnits="userSpaceOnUse"
//           >
//             <path d="M.5 200V.5H200" fill="none" />
//           </pattern>
//         </defs>
//         <svg x="50%" y="-1" className="overflow-visible fill-gray-800/20">
//           <path
//             d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
//             strokeWidth="0"
//           />
//         </svg>
//         <rect
//           width="100%"
//           height="100%"
//           strokeWidth="0"
//           fill="url(#pattern-hero)"
//         />
//       </svg>

//       <div
//         className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
//         aria-hidden="true"
//       >
//         <div
//           className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
//           style={{
//             clipPath:
//               'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
//           }}
//         ></div>
//       </div>

//       <div className="mt-[-50px] flex h-screen items-center justify-center">
//         {/* <div className="max-w-full flex-shrink-0 px-4 text-center lg:mx-0 lg:max-w-3xl lg:pt-8">
//           <h1 className="mt-10 text-5xl font-bold tracking-tight text-white sm:text-6xl">
//             revolutionize
//             <span className="text-sky-500"> your workflow</span> with
//             <span className="text-sky-500"> Zynx</span>
//           </h1>
//           <p className="mt-6 text-lg leading-8 text-gray-300">
//             Elevate Your Productivity With Zynx, Your Personalized Workflow
//             Assistant
//           </p>
//           <div className="mt-5 flex items-center justify-center gap-x-6">
//             <a
//               href="/register"
//               className="rounded-md bg-sky-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-sky-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-400"
//               rel="noreferrer"
//             >
//               Try Now →
//             </a>
//           </div>
//         </div> */}
//       </div>
//     </div>
//   );
// };

// export default HeroSection;

import { Cpu, Bot } from 'lucide-react';
import React from 'react';
import NeonGlowingBorders from '../animations/NeonGlowingBorders';

const HeroSection = () => {
  return (
    <div className="relative isolate overflow-hidden bg-gray-900">
      <svg
        className="absolute inset-0 -z-10 h-full w-full stroke-white/10 [mask-image:radial-gradient(100%_100%_at_top_right,white,transparent)]"
        aria-hidden="true"
      >
        <defs>
          <pattern
            id="pattern-hero"
            width="200"
            height="200"
            x="100%"
            y="-1"
            patternUnits="userSpaceOnUse"
          >
            <path d="M.5 200V.5H200" fill="none" />
          </pattern>
        </defs>
        <svg x="50%" y="-1" className="overflow-visible fill-gray-800/20">
          <path
            d="M-200 0h201v201h-201Z M600 0h201v201h-201Z M-400 600h201v201h-201Z M200 800h201v201h-201Z"
            strokeWidth="0"
          />
        </svg>
        <rect
          width="100%"
          height="100%"
          strokeWidth="0"
          fill="url(#pattern-hero)"
        />
      </svg>

      <div
        className="absolute left-[calc(50%-4rem)] top-10 -z-10 transform-gpu blur-3xl sm:left-[calc(50%-18rem)] lg:left-48 lg:top-[calc(50%-30rem)] xl:left-[calc(50%-24rem)]"
        aria-hidden="true"
      >
        <div
          className="aspect-[1108/632] w-[69.25rem] bg-gradient-to-r from-[#80caff] to-[#4f46e5] opacity-20"
          style={{
            clipPath:
              'polygon(73.6% 51.7%, 91.7% 11.8%, 100% 46.4%, 97.4% 82.2%, 92.5% 84.9%, 75.7% 64%, 55.3% 47.5%, 46.5% 49.4%, 45% 62.9%, 50.3% 87.2%, 21.3% 64.1%, 0.1% 100%, 5.4% 51.1%, 21.4% 63.9%, 58.9% 0.2%, 73.6% 51.7%)',
          }}
        ></div>
      </div>

      <div className="mt-[-50px] flex h-screen items-center justify-center">
        <div className="absolute inset-0">
          {/* Decorative lines */}
          <div className="absolute top-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-800/20 to-transparent" />
          <div className="absolute bottom-4 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-800/20 to-transparent" />
          <div className="absolute top-4 right-4 w-2 h-2 bg-cyan-800/20 rounded-full" />
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-cyan-800/20 rounded-full" />
        </div>

        <div className="relative max-w-6xl mx-auto px-6 py-0 flex items-center justify-between">
          <div className="max-w-xl">
            <div className="space-y-6">
              <div className="p-2 bg-cyan-900/20 w-10 h-10 rounded-lg flex items-center justify-center">
                <Cpu className="w-6 h-6 text-cyan-400" />
              </div>

              <h1 className="text-5xl font-bold text-white leading-tight tracking-wide">
                Whet Your Hent The 1Key Promptarena
              </h1>

              <p className="text-gray-400 text-lg">
                Ilmteostrminadlr, avvaunume.tmnxte ehe genfxfngre
                <br />
                Byio1? dd bnod oainngpdn tfd
              </p>

              <button className="px-6 py-3 bg-[#ff7171] hover:bg-[#ff8585] text-white rounded-lg font-medium transition-colors">
                Get Started Now →
              </button>

              <div className="p-2 bg-cyan-900/20 w-10 h-10 rounded-lg flex items-center justify-center">
                <Bot className="w-6 h-6 text-cyan-400" />
              </div>
            </div>
          </div>

          <div className="relative w-full h-full">
            {/* Glowing circles behind character */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2">
              <div className="relative w-80 h-80">
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/30 to-transparent blur-xl" />
                <div className="absolute inset-4 rounded-full bg-gradient-to-l from-pink-500/30 to-transparent blur-xl" />
              </div>
            </div>

            {/* Character image would go here - using a div for the silhouette effect */}

            <div className="relative w-full bg-slate-500 bottom-[-17px]">
              <img
                src="https://imgs.search.brave.com/x1ppgcH1MblTcdw1Kj8RtK9uOBg-yyFtV8m2zKjvy9w/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93b25k/ZXItZGF5LmNvbS93/cC1jb250ZW50L3Vw/bG9hZHMvMjAyMC8x/MS93b25kZXItZGF5/LXBuZy1jeWJlcnB1/bmstMjA3Ny05LnBu/Zw"
                alt="Cyberpunk Character"
                className="w-full h-full object-cover z-[10] relative"
              />
              <div className="absolute top-[20%] rotate-[30deg] scale-[1.5] right-[20%]">
                <NeonGlowingBorders />
              </div>

              {/* <div className="absolute inset-0 z-[1] flex items-center justify-center">
                <div className="bg-gradient-to-r from-cyan-500/30 to-pink-500/90 mix-blend-screen glass-panel p-[2rem] rounded-full">
                  <div className="bg-gradient-to-r from-cyber-pink/30 to-cyber-blue/80 mix-blend-screen glass-panel p-[2rem] rounded-full">
                    <div className="w-72 h-72 bg-cyber-pink/40 rounded-full" />
                  </div>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
