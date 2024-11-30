import React from 'react';
import {
  alienImg,
  birdImg,
  catImg,
  showImg,
  spaceImg,
} from '../../assets/img/homepage';
import VelocityText from '../framer-motion/animations/VelocityText';
import { RandomizedTextEffect } from '../framer-motion/animations/RandomizedTextEffect';
import { siteName } from '../../config/envConfig';

const HeroImageSection = () => {
  return (
    <div className="dark:bg-dark-background bg-background text-text dark:text-dark-text overflow-hidden h-auto ">
      <div className={` py-5`}>
        <div className="">
          {/* Counter */}
          <div className="container mx-auto">
            <div className="text-neutral-600 font-mono mb-0">
              <RandomizedTextEffect text="0104" />
            </div>

            <div className="text-center mt-1 mb-5 ">
              <h2 className="h1 font-bold font-syncopate">
                <span className="text-[#9857D3] uppercase">
                  {/* TRENDING */}
                  Trending
                </span>
                <span className="text-white uppercase"> AI Prompts</span>
              </h2>
              <p className="text-gray-400 text-lg">
                {/* Check out the latest and trending NFT to Bid, Purchase and make
                profit. */}
                Discover the latest and most popular AI-generated art. Get
                inspired and find the perfect prompt to launch your next
                project.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:overflow-visible  overflow-hidden">
            {/* Text Content */}
            <div className="space-y-6 container mx-auto">
              <h3 className="h2 font-syncopate text-shadow uppercase text-stroke leading-tight tracking-wide">
                {/* UNLOCK THE POWER OF AI {siteName} */}
                Supercharge Ideas with PromptArena{' '}
              </h3>
              <div className="space-y-4 text-neutral-400">
                <p className="text-sm md:text-base">
                  {/* Are you ready to explore the limitless possibilities of
                  Artificial Intelligence? Look no further! {siteName} is your
                  one-stop destination for all things AI. */}
                  Get the most out of Midjourney, Stable Diffusion, DALL-E 2,
                  and more with our curated selection of free prompts. We've
                  tested and optimized prompts for various AI art generators.
                </p>
                <p className="text-sm md:text-base">
                  Whether you're an artist, writer, developer, or simply curious
                  about AI, PromptArena offers a world of possibilities. Find
                  the perfect prompts to ignite your imagination and bring your
                  ideas to life.
                </p>
              </div>
            </div>

            {/* Image Grid */}
            <div className="relative mr-0 md:mr-10 mb-10 sm:mb-0 h-[400px]">
              {/* Alien Avatar */}
              <div className="absolute right-0 ring-2 ring-neutral-300 z-[1] rounded-[2.5rem] top-0 w-[180px] h-[180px] overflow-hidden">
                <img
                  src={alienImg}
                  alt="Alien character"
                  className="w-full h-full rounded-[2.5rem] object-cover "
                />
              </div>

              {/* Bear Avatar */}
              <div className="absolute bottom-0 grid  gap-3 grid-cols-3 z-[0]">
                <div className=" w-[180px] h-[180px] ring-1 ring-neutral-300 rounded-[2.5rem] overflow-hidden">
                  <img
                    src={showImg}
                    alt="Show character"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Bird Avatar */}
                <div className="w-[180px] scale-125 shadow-glow-secondary ring-1 ring-neutral-300 h-[180px] rounded-[2.5rem] overflow-hidden">
                  <img
                    src={birdImg}
                    alt="Bird character"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Space Avatar */}

                <div className="w-[180px] ring-1 ring-neutral-300 h-[180px] rounded-[2.5rem] overflow-hidden">
                  <img
                    src={spaceImg}
                    alt="Space character"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Cat Avatar */}
              <div className="absolute ring-2 ring-neutral-300/80 right-[25%] z-[1] rounded-[2.5rem] -rotate-[10deg] top-[10%] w-[180px] h-[180px] overflow-hidden">
                <img
                  src={catImg}
                  alt="Cat character"
                  className="w-full h-full rounded-[2.5rem] object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Text scroll */}

      <div className="w-full h-[11rem] relative overflow-hidden">
        {/* Diagonal Stripes */}
        {/* First Stripe */}
        <div className="absolute inset-0 transform sm:skew-y-[3deg] skew-y-[6deg]">
          <div className="h-16  transform translate-y-[4rem]">
            <VelocityText
              mainTextStyle="p-0 glass-panel"
              xRange={[-4000, 0]}
              skewDegrees={['10deg', '-0deg']}
            >
              <h6 className="h1 font-extrabold text-[#fffeff] font-roboto-mono tracking-widest border-dashed border-2 border-x-0 border-[#a855f7]">
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
                <span>
                  UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
                  <span className="text-[#bcb9c0]">✧</span>{' '}
                </span>
              </h6>
            </VelocityText>
          </div>
        </div>

        {/* Second Stripe */}
        <div className="absolute inset-0 transform sm:-skew-y-[3deg] -skew-y-[6deg]">
          <div className="h-16  transform translate-y-[4rem]">
            <VelocityText
              mainTextStyle="p-0 glass-panel"
              skewDegrees={['10deg', '-0deg']}
            >
              <h6 className="h1 font-extrabold font-roboto-mono tracking-widest text-[#d3aff5] border-[1px] border-x-0 border-neutral-300/60">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroImageSection;

// import React from 'react';
// import {
//   alienImg,
//   birdImg,
//   catImg,
//   showImg,
//   spaceImg,
// } from '../../assets/img/homepage';
// import VelocityText from '../framer-motion/animations/VelocityText';
// import { RandomizedTextEffect } from '../framer-motion/animations/RandomizedTextEffect';

// const HeroImageSection = () => {
//   return (
//     <div className="dark:bg-dark-background bg-background text-text dark:text-dark-text  h-auto ">
//       <div className={`container mx-auto py-5`}>
//         <div className="">
//           {/* Counter */}
//           <div className="text-neutral-600 font-mono mb-0">
//             <RandomizedTextEffect text="0104" />
//           </div>

//           <div className="text-center my-1 ">
//             <h1 className="h1 font-bold font-syncopate">
//               <span className="text-[#9857D3] uppercase">TRENDING</span>
//               <span className="text-white uppercase"> NOW</span>
//             </h1>
//             <p className="text-gray-400 text-lg">
//               Check out the latest and trending NFT to Bid, Purchase and make
//               profit.
//             </p>
//           </div>

//           {/* Main Content */}
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//             {/* Text Content */}
//             <div className="space-y-6">
//               <h1 className="h1 font-syncopate text-shadow text-stroke leading-tight tracking-wide">
//                 UNLOCK THE POWER OF AI WITH VZRDS
//               </h1>
//               <div className="space-y-4 text-neutral-400">
//                 <p className="text-sm md:text-base">
//                   Are you ready to explore the limitless possibilities of
//                   Artificial Intelligence? Look no further! VZRDS is your
//                   one-stop destination for all things AI.
//                 </p>
//                 <p className="text-sm md:text-base">
//                   Whether you're a seasoned AI professional, a curious
//                   enthusiast, or a business looking to innovate, our platform
//                   offers something exciting for everyone now.
//                 </p>
//               </div>
//             </div>

//             {/* Image Grid */}
//             <div className="relative h-[400px]">
//               {/* Alien Avatar */}
//               <div className="absolute right-0 ring-2 ring-neutral-300 z-[1] rounded-[2.5rem] top-0 w-[180px] h-[180px] overflow-hidden">
//                 <img
//                   src={alienImg}
//                   alt="Alien character"
//                   className="w-full h-full rounded-[2.5rem] object-cover "
//                 />
//               </div>

//               {/* Bear Avatar */}
//               <div className="absolute bottom-0 grid  gap-3 grid-cols-3 z-[0]">
//                 <div className=" w-[180px] h-[180px] ring-1 ring-neutral-300 rounded-[2.5rem] overflow-hidden">
//                   <img
//                     src={showImg}
//                     alt="Show character"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 {/* Bird Avatar */}
//                 <div className="w-[180px] scale-125 shadow-glow-secondary ring-1 ring-neutral-300 h-[180px] rounded-[2.5rem] overflow-hidden">
//                   <img
//                     src={birdImg}
//                     alt="Bird character"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>

//                 {/* Space Avatar */}

//                 <div className="w-[180px] ring-1 ring-neutral-300 h-[180px] rounded-[2.5rem] overflow-hidden">
//                   <img
//                     src={spaceImg}
//                     alt="Space character"
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
//               </div>

//               {/* Cat Avatar */}
//               <div className="absolute ring-2 ring-neutral-300/80 right-[25%] z-[1] rounded-[2.5rem] -rotate-[10deg] top-[10%] w-[180px] h-[180px] overflow-hidden">
//                 <img
//                   src={catImg}
//                   alt="Cat character"
//                   className="w-full h-full rounded-[2.5rem] object-cover"
//                 />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Text scroll */}

//       <div className="w-full h-[11rem] relative overflow-hidden">
//         {/* Diagonal Stripes */}
//         {/* First Stripe */}
//         <div className="absolute inset-0 transform skew-y-[3deg]">
//           <div className="h-16  transform translate-y-[4rem]">
//             <VelocityText
//               mainTextStyle="p-0 glass-panel"
//               xRange={[-4000, 0]}
//               skewDegrees={['10deg', '-0deg']}
//             >
//               <h1 className="h2 font-extrabold text-[#fffeff] font-roboto-mono tracking-widest border-dashed border-2 border-x-0 border-[#a855f7]">
//                 <span>
//                   UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
//                   <span className="text-[#bcb9c0]">✧</span>{' '}
//                 </span>
//                 <span>
//                   UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
//                   <span className="text-[#bcb9c0]">✧</span>{' '}
//                 </span>
//                 <span>
//                   UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
//                   <span className="text-[#bcb9c0]">✧</span>{' '}
//                 </span>
//                 <span>
//                   UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
//                   <span className="text-[#bcb9c0]">✧</span>{' '}
//                 </span>
//                 <span>
//                   UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
//                   <span className="text-[#bcb9c0]">✧</span>{' '}
//                 </span>
//                 <span>
//                   UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
//                   <span className="text-[#bcb9c0]">✧</span>{' '}
//                 </span>
//               </h1>
//             </VelocityText>
//           </div>
//         </div>

//         {/* Second Stripe */}
//         <div className="absolute inset-0 transform -skew-y-[3deg]">
//           <div className="h-16  transform translate-y-[4rem]">
//             <VelocityText
//               mainTextStyle="p-0 glass-panel"
//               skewDegrees={['10deg', '-0deg']}
//             >
//               <h1 className="h2 font-extrabold font-roboto-mono tracking-widest text-[#d3aff5] border-[1px] border-x-0 border-neutral-300/60">
//                 <span>
//                   UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
//                   <span className="text-[#bcb9c0]">✧</span>{' '}
//                 </span>
//                 <span>
//                   UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
//                   <span className="text-[#bcb9c0]">✧</span>{' '}
//                 </span>
//                 <span>
//                   UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
//                   <span className="text-[#bcb9c0]">✧</span>{' '}
//                 </span>
//                 <span>
//                   UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
//                   <span className="text-[#bcb9c0]">✧</span>{' '}
//                 </span>
//                 <span>
//                   UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
//                   <span className="text-[#bcb9c0]">✧</span>{' '}
//                 </span>
//               </h1>
//             </VelocityText>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HeroImageSection;
