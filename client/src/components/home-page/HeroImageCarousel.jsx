import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Heart, ChevronLeft, ChevronRight, Bot } from 'lucide-react';
import {
  artfulEye,
  codeMaster,
  magicBrush,
  neopixel,
  wordSmithAI,
} from '../../assets/img/homepage';

const nftData = [
  {
    id: 1,
    title: 'VIRTUAL ART',
    image: neopixel,
    creator: 'Neo Pixel',
    username: '@NeoPixel',
    currentBid: '4.78',
    likes: 65,
  },
  {
    id: 2,
    title: 'Fantasy Art',
    image: magicBrush,
    creator: 'Magic Brush',
    username: '@MagicBrush',
    currentBid: '3.5',
    likes: 42,
  },
  {
    id: 3,
    title: 'Portrait Art',
    image: artfulEye,
    creator: 'Artful Eye',
    username: '@ArtfulEye',
    currentBid: '5.2',
    likes: 78,
  },
  {
    id: 4,
    title: 'Story Writing',
    image: wordSmithAI,
    creator: 'Word Smith',
    username: '@WordsmithAI',
    currentBid: '2.8',
    likes: 53,
  },
  {
    id: 5,
    title: 'Code Generation',
    image: codeMaster,
    creator: 'Code Master',
    username: '@CodeMaster',
    currentBid: '6.1',
    likes: 91,
  },
];

export default function HeroImageCarousel() {
  const [currentIndex, setCurrentIndex] = useState(1);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % nftData.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      prevIndex => (prevIndex - 1 + nftData.length) % nftData.length
    );
  };

  const getPosition = index => {
    const offset = (index - currentIndex + nftData.length) % nftData.length;
    return offset < nftData.length / 2 ? offset : offset - nftData.length;
  };

  const cardVariants = {
    enter: index => ({
      x: getPosition(index) * 220,
      scale: index === currentIndex ? 1 : 0.8,
      opacity: 1,
      zIndex: index === currentIndex ? 10 : 5 - Math.abs(getPosition(index)),
      filter: index === currentIndex ? 'blur(0px)' : 'blur(4px)',
    }),
    exit: direction => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8,
    }),
  };

  // Set up auto-slide effect
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 2000); // Change slide every 2 seconds

    // Clear interval when component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array to run once when component mounts

  return (
    <div className=" h-auto md:min-h-screen bg-dark-background text-white  xl:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h2 className="h1 font-bold font-syncopate">
            <span className="text-[#9857D3] uppercase">
              {/* TRENDING */}
              {/* Your Gateway to */}
              Don't Miss
            </span>
            <span className="text-white uppercase"> out</span>
          </h2>
          <p className="text-gray-400 text-lg">
            {/* Check out the latest and trending NFT to Bid, Purchase and make
            profit. */}
            Find Your Next AI Masterpiece with These Prompts.
          </p>
        </div>

        <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
          {/* Navigation Buttons */}
          <button
            onClick={handlePrev}
            className="absolute left-4 z-20 w-12 h-12 ring-1 ring-neutral-400/40 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          <div className="relative w-full h-full flex items-center justify-center">
            <AnimatePresence initial={false}>
              {nftData.map((nft, index) => (
                <motion.div
                  key={nft.id}
                  custom={index}
                  variants={cardVariants}
                  initial="enter"
                  animate="enter"
                  exit="exit"
                  transition={{
                    x: { type: 'spring', stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 },
                    scale: { duration: 0.2 },
                    filter: { duration: 0.2 },
                  }}
                  className="absolute lg:w-[320px] w-[290px] bg-gradient-to-b from-purple-900/50 to-purple-900/30 rounded-3xl backdrop-blur-sm overflow-hidden"
                  style={{
                    transform: `translateX(${getPosition(index) * 220}px)`,
                    zIndex: index === currentIndex ? 10 : 5,
                    scale: index === currentIndex ? 1 : 0.8,
                    filter: index === currentIndex ? 'blur(0px)' : 'blur(4px)',
                  }}
                >
                  {/* NFT Card Content */}
                  <div className="relative h-full">
                    <img
                      src={nft.image}
                      alt={`NFT Artwork by ${nft.creator}`}
                      className="w-full h-[70%] object-cover rounded-3xl transition-default border-[1px] border-neutral-100"
                    />

                    <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-purple-900/90 to-purple-900/0">
                      <div className="flex justify-between items-center mb-0">
                        <h3 className="text-2xl font-bold tracking-wider">
                          {nft.title}
                        </h3>
                        {/* <div className="flex items-center gap-1">
                          <Heart className="w-5 h-5" />
                          <span className="text-sm">{nft.likes}</span>
                        </div> */}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 flex-center rounded-full bg-purple-500">
                          <Bot className="text-shadow" />
                        </div>
                        <div>
                          <p className="font-medium">{nft.creator}</p>
                          <p className="text-sm text-gray-400">
                            {nft.username}
                          </p>
                        </div>
                      </div>

                      {/* <div className="flex justify-between items-center">
                        <span className="text-gray-400">Current Bid</span>
                        <span className="text-xl font-bold">
                          {nft.currentBid} ETH
                        </span>
                      </div> */}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <button
            onClick={handleNext}
            className="absolute right-4 z-20 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 ring-1 ring-neutral-400/40 transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
}

// import { motion, AnimatePresence } from 'framer-motion';
// import { useState } from 'react';
// import { Heart, ChevronLeft, ChevronRight } from 'lucide-react';
// import { birdImg, showImg, spaceImg } from '../../assets/img/homepage';

// const nftData = [
//   {
//     id: 1,
//     title: 'VIRTUAL ART',
//     image: spaceImg,
//     creator: 'Rizwan Zahid',
//     username: '@rizwi',
//     currentBid: '4.78',
//     likes: 65,
//   },
//   {
//     id: 2,
//     title: 'VIRTUAL ART',
//     image: birdImg,
//     creator: 'Jane Doe',
//     username: '@janedoe',
//     currentBid: '3.5',
//     likes: 42,
//   },
//   {
//     id: 3,
//     title: 'VIRTUAL ART',
//     image: showImg,
//     creator: 'John Smith',
//     username: '@johnsmith',
//     currentBid: '5.2',
//     likes: 78,
//   },
//   {
//     id: 4,
//     title: 'VIRTUAL ART',
//     image: birdImg,
//     creator: 'Alice Johnson',
//     username: '@alicej',
//     currentBid: '2.8',
//     likes: 53,
//   },
//   {
//     id: 5,
//     title: 'VIRTUAL ART',
//     image: showImg,
//     creator: 'Bob Williams',
//     username: '@bobw',
//     currentBid: '6.1',
//     likes: 91,
//   },
// ];

// export default function HeroImageCarousel() {
//   const [currentIndex, setCurrentIndex] = useState(2);

//   const handleNext = () => {
//     setCurrentIndex(prevIndex => (prevIndex + 1) % nftData.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex(
//       prevIndex => (prevIndex - 1 + nftData.length) % nftData.length
//     );
//   };

//   const getPosition = index => {
//     const offset = (index - currentIndex + nftData.length) % nftData.length;
//     return offset < nftData.length / 2 ? offset : offset - nftData.length;
//   };

//   const cardVariants = {
//     enter: index => ({
//       x: getPosition(index) * 220,
//       scale: index === currentIndex ? 1 : 0.8,
//       opacity: 1,
//       zIndex: index === currentIndex ? 10 : 5 - Math.abs(getPosition(index)),
//       filter: index === currentIndex ? 'blur(0px)' : 'blur(4px)',
//     }),
//     exit: direction => ({
//       x: direction > 0 ? 1000 : -1000,
//       opacity: 0,
//       scale: 0.8,
//     }),
//   };

//   return (
//     <div className=" h-auto md:min-h-screen bg-dark-background text-white p-8">
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center">
//           <h1 className="h1 font-bold font-syncopate">
//             <span className="text-[#9857D3] uppercase">TRENDING</span>
//             <span className="text-white uppercase"> NOW</span>
//           </h1>
//           <p className="text-gray-400 text-lg">
//             Check out the latest and trending NFT to Bid, Purchase and make
//             profit.
//           </p>
//         </div>
//         {/* <div className="text-center">
//           <h1 className="text-6xl font-bold mb-0">
//             <span className="text-[#9857D3]">TRENDING</span>
//             <span className="text-white"> NOW</span>
//           </h1>
//           <p className="text-gray-400 text-lg">
//             Check out the latest and trending NFT to Bid, Purchase and make
//             profit.
//           </p>
//         </div> */}

//         <div className="relative h-[500px] flex items-center justify-center overflow-hidden">
//           {/* Navigation Buttons */}
//           <button
//             onClick={handlePrev}
//             className="absolute left-4 z-20 w-12 h-12 ring-1 ring-neutral-400/40 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 transition-colors"
//           >
//             <ChevronLeft className="w-6 h-6" />
//           </button>

//           <div className="relative w-full h-full flex items-center justify-center">
//             <AnimatePresence initial={false}>
//               {nftData.map((nft, index) => (
//                 <motion.div
//                   key={nft.id}
//                   custom={index}
//                   variants={cardVariants}
//                   initial="enter"
//                   animate="enter"
//                   exit="exit"
//                   transition={{
//                     x: { type: 'spring', stiffness: 300, damping: 30 },
//                     opacity: { duration: 0.2 },
//                     scale: { duration: 0.2 },
//                     filter: { duration: 0.2 },
//                   }}
//                   className="absolute lg:w-[320px] w-[290px] bg-gradient-to-b from-purple-900/50 to-purple-900/30 rounded-3xl backdrop-blur-sm overflow-hidden"
//                   style={{
//                     transform: `translateX(${getPosition(index) * 220}px)`,
//                     zIndex: index === currentIndex ? 10 : 5,
//                     scale: index === currentIndex ? 1 : 0.8,
//                     filter: index === currentIndex ? 'blur(0px)' : 'blur(4px)',
//                   }}
//                 >
//                   {/* NFT Card Content */}
//                   <div className="relative h-full">
//                     <img
//                       src={nft.image}
//                       alt={`NFT Artwork by ${nft.creator}`}
//                       className="w-full h-[70%] object-cover rounded-3xl transition-default border-2 border-neutral-400/90"
//                     />

//                     <div className="absolute bottom-0 w-full p-6 bg-gradient-to-t from-purple-900/90 to-purple-900/0">
//                       <div className="flex justify-between items-center mb-0">
//                         <h2 className="text-2xl font-bold tracking-wider">
//                           {nft.title}
//                         </h2>
//                         {/* <div className="flex items-center gap-1">
//                           <Heart className="w-5 h-5" />
//                           <span className="text-sm">{nft.likes}</span>
//                         </div> */}
//                       </div>

//                       <div className="flex items-center gap-3">
//                         <div className="w-10 h-10 rounded-full bg-purple-500"></div>
//                         <div>
//                           <p className="font-medium">{nft.creator}</p>
//                           <p className="text-sm text-gray-400">
//                             {nft.username}
//                           </p>
//                         </div>
//                       </div>

//                       {/* <div className="flex justify-between items-center">
//                         <span className="text-gray-400">Current Bid</span>
//                         <span className="text-xl font-bold">
//                           {nft.currentBid} ETH
//                         </span>
//                       </div> */}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>
//           </div>

//           <button
//             onClick={handleNext}
//             className="absolute right-4 z-20 w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center hover:bg-purple-500/30 ring-1 ring-neutral-400/40 transition-colors"
//           >
//             <ChevronRight className="w-6 h-6" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
