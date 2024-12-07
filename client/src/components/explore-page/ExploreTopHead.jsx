import { motion, transform } from 'framer-motion';
import { flyingRobot, ufo } from '../../assets/lottieFiles';
import LottieAnimation from '../../assets/lottieFiles/LottieAnimation';

const ExploreTopHead = () => {
  return (
    <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[300px] bg-gradient-to-b from-[#1a0b2e] to-[#2d1b4e] overflow-hidden">
      {/* Glowing Dots */}
      <div className=" inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-cyber-purple rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Left Image */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute left-0 sm:left-12 lg:left-16 top-8 sm:top-12 lg:top-16"
      >
        <div className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-48 lg:h-48 rounded-2xl overflow-hidden">
          <LottieAnimation
            animationData={flyingRobot}
            loop={true}
            autoplay={true}
            style={{
              width: '100%',
              height: '100%',
              transform: 'rotate(-0deg)',
            }}
          />
        </div>
      </motion.div>

      {/* Right Image */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute right-0 sm:right-12 lg:right-16 top-8 sm:top-12 lg:top-16"
      >
        <div className="relative w-28 h-28 sm:w-32 sm:h-32 lg:w-40 lg:h-40">
          <LottieAnimation
            animationData={ufo}
            loop={true}
            autoplay={true}
            speed={2}
            style={{
              width: '100%',
              height: '100%',
              transform: 'rotate(-0deg)',
              transformOrigin: 'center',
              overflow: 'hidden',
            }}
          />
        </div>
      </motion.div>

      {/* Background Silhouette */}
      <div
        className="absolute inset-0 bg-center bg-no-repeat bg-cover opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 70 C30 70 20 50 20 30 L80 30 C80 50 70 70 50 70Z' fill='%23222c51e'/%3E%3C/svg%3E")`,
          backgroundSize: 'cover',
          transform: 'scaleX(-1)',
          transformOrigin: 'center',
          zIndex: 1,
          boxShadow: 'inset 0 0 100px 100px #000',
        }}
      />

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <h1 className="h1 font-bold sm:mt-0 mt-28 text-white text-center text-shadow font-share-tech-mono tracking-wider">
          Universe of <br />
          Free AI Prompts{' '}
        </h1>
      </motion.div>
    </div>
  );
};

export default ExploreTopHead;
