import { motion } from 'framer-motion';
import { ArrowUpRight, RefreshCcw } from 'lucide-react';
import LottieAnimation from '../../assets/lottieFiles/LottieAnimation';
import robotShock from '../../assets/lottieFiles/robotShock.json';
import robotCoffee from '../../assets/lottieFiles/robotCoffee.json';
import robotHey from '../../assets/lottieFiles/robotHey.json';
import monkeyCard from '../../assets/lottieFiles/monkeyCard.json';

export default function AboutHero() {
  // <div className="h-screen bg-gradient-to-br from-purple-900/20 via-purple-600 to-[#030303]/100 flex items-center justify-center overflow-hidden">
  //   <div className="w-full h-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 overflow-hidden p-4">
  //     {/* Robot Card */}
  //     <motion.div
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       className="bg-[#694ec954] shadow-2xl rounded-3xl flex items-center justify-center aspect-square overflow-hidden"
  //     >
  //       <LottieAnimation
  //         style={{
  //           dropShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  //           scale: '0.8',
  //         }}
  //         animationData={robotHey}
  //         loop={true}
  //         autoplay={true}
  //       />
  //     </motion.div>

  //     {/* Hero Card */}
  //     <motion.div
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ delay: 0.1 }}
  //       className="bg-[#1C1C1C] shadow-glow-primary rounded-3xl p-4 md:col-span-1 lg:col-span-2 flex flex-col justify-between h-full overflow-hidden"
  //     >
  //       <div className="space-y-4 overflow-hidden">
  //         <h1 className="h2 font-bold text-white leading-tight overflow-hidden">
  //           THE FUTURE WITH{' '}
  //           <span className="bg-[#7B5EE4] px-2 py-1 text-shadow rounded">
  //             ARTIFICIAL
  //           </span>{' '}
  //           INTELLIGENCE
  //         </h1>
  //         <p className="text-gray-400 text-lg">
  //           Unleashing the Power of Artificial Intelligence for 3D Content
  //           Creation
  //         </p>
  //       </div>

  //       <div className="flex justify-between items-center mt-4 overflow-hidden">
  //         <button className="bg-[#7B5EE4] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-opacity-90 transition-colors">
  //           <span>Join Community</span>
  //           <div className="bg-white rounded-full p-2">
  //             <RefreshCcw className="w-4 h-4 text-[#7B5EE4]" />
  //           </div>
  //         </button>

  //         <div className="flex gap-2">
  //           <div className="bg-[#7B5EE4] p-3 rounded-full">
  //             <RefreshCcw className="w-5 h-5 text-white" />
  //           </div>
  //           <div className="bg-white p-3 rounded-full">
  //             <ArrowUpRight className="w-5 h-5 text-black" />
  //           </div>
  //         </div>
  //       </div>
  //     </motion.div>

  //     {/* AI Face Cards */}
  //     <motion.div
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ delay: 0.2 }}
  //       className="bg-black rounded-3xl overflow-hidden aspect-square"
  //     >
  //       {/* Content here */}
  //     </motion.div>

  //     <motion.div
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ delay: 0.3 }}
  //       className="bg-[#2A1B54] rounded-3xl flex items-center justify-center overflow-hidden aspect-square"
  //     >
  //       <LottieAnimation
  //         style={{
  //           width: '90%',
  //           height: '90%',
  //           dropShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  //         }}
  //         animationData={monkeyCard}
  //         loop={true}
  //         autoplay={true}
  //       />
  //     </motion.div>

  //     {/* Generate 3D Images Card */}
  //     <motion.div
  //       initial={{ opacity: 0, y: 20 }}
  //       animate={{ opacity: 1, y: 0 }}
  //       transition={{ delay: 0.4 }}
  //       className="bg-[#7B5EE4] rounded-3xl p-4 relative overflow-hidden aspect-square"
  //     >
  //       <div className="relative z-10 overflow-hidden">
  //         <h2 className="text-3xl font-bold text-white mb-4 overflow-hidden">
  //           Generate 3D Images With AI
  //         </h2>
  //         <div className="flex items-center gap-4">
  //           <div className="bg-black/20 rounded-full w-16 h-16 flex items-center justify-center">
  //             <img
  //               src="/placeholder.svg?height=100&width=100"
  //               alt="Sphere"
  //               className="w-12 h-12 object-contain"
  //             />
  //           </div>
  //           <img
  //             src="/placeholder.svg?height=150&width=150"
  //             alt="Robot character"
  //             className="w-24 h-24 object-contain"
  //           />
  //         </div>
  //       </div>
  //     </motion.div>
  //   </div>
  // </div>;

  return (
    <div className="container mx-auto min-h-screen bg-gradient-to-br from-purple-900/20 via-purple-600 to-[#030303]/100 py-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Robot Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#694ec954] shadow-2xl rounded-3xl p-6 aspect-square flex items-center justify-center"
        >
          {/* <img
            src="/placeholder.svg?height=400&width=400"
            alt="3D Robot with headphones"
            className="w-4/5 h-4/5 object-contain"
          /> */}
          <LottieAnimation
            style={{
              dropShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
              scale: '0.8',
            }}
            animationData={robotHey}
            loop={true}
            autoplay={true}
          />
        </motion.div>

        {/* Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-[#1C1C1C] shadow-glow-primary rounded-3xl p-8 md:col-span-1 lg:col-span-2 flex flex-col justify-between"
        >
          <div className="space-y-4">
            <h1 className=" h2 font-bold text-white leading-tight">
              THE FUTURE WITH{' '}
              <span className="bg-[#7B5EE4] px-2 py-1 text-shadow rounded">
                ARTIFICIAL
              </span>{' '}
              INTELLIGENCE
            </h1>
            <p className="text-gray-400 text-lg">
              Unleashing the Power of Artificial Intelligence for 3D Content
              Creation
            </p>
          </div>

          <div className="flex justify-between items-center">
            <button className="bg-[#7B5EE4] text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-opacity-90 transition-colors">
              <span>Join Community</span>
              <div className="bg-white rounded-full p-2">
                <RefreshCcw className="w-4 h-4 text-[#7B5EE4]" />
              </div>
            </button>

            <div className="flex gap-2">
              <div className="bg-[#7B5EE4] p-3 rounded-full">
                <RefreshCcw className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white p-3 rounded-full">
                <ArrowUpRight className="w-5 h-5 text-black" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Face Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-black rounded-3xl overflow-hidden"
        >
          {/* <img
            src="/placeholder.svg?height=400&width=400"
            alt="Technological face profile"
            className="w-full h-full object-cover"
          /> */}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-[#2A1B54] rounded-3xl flex-center overflow-hidden"
        >
          {/* <img
            src="/placeholder.svg?height=400&width=400"
            alt="AI face with circuit patterns"
            className="w-full h-full object-cover"
          /> */}
          <LottieAnimation
            style={{
              width: '90%',
              height: '90%',
              dropShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
            }}
            animationData={monkeyCard}
            loop={true}
            autoplay={true}
          />
        </motion.div>

        {/* Generate 3D Images Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-[#7B5EE4] rounded-3xl p-6 relative overflow-hidden"
        >
          <div className="relative z-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Generate 3D Images With AI
            </h2>
            <div className="flex items-center gap-4">
              <div className="bg-black/20 rounded-full w-16 h-16 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=100&width=100"
                  alt="Sphere"
                  className="w-12 h-12 object-contain"
                />
              </div>
              <img
                src="/placeholder.svg?height=150&width=150"
                alt="Robot character"
                className="w-24 h-24 object-contain"
              />
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
