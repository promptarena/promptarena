import { MailPlus } from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { purpleRobotHalfFace } from '../../assets/img/aboutpage';

export default function ContactHero() {
  // Hook for scroll position
  const { scrollY } = useScroll();

  // Parallax Transformations
  const gridY = useTransform(scrollY, [0, 500], ['0%', '-30%']); // Grid moves slower
  const robotTranslateY = useTransform(scrollY, [0, 500], ['0%', '15%']); // Robot parallax
  const textTranslateY = useTransform(scrollY, [0, 500], ['0%', '-10%']); // Text parallax

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-900/30 via-purple-700/50 to-[#030303] overflow-hidden">
      {/* Animated Grid Overlay */}
      <motion.div
        style={{ y: gridY }}
        className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"
      ></motion.div>

      {/* Main Content Container */}
      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 pt-0 pb-0 flex flex-col-reverse lg:flex-row items-center">
        {/* Left Content */}
        <motion.div
          className="w-full lg:w-1/2 mt-24 text-white z-10"
          style={{ y: textTranslateY }}
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <h1 className="h1 font-bold text-shadow leading-tight mb-6">
            Let's Talk AI: Connect with the{' '}
            <span className="relative px-5 ml-0 text-5xl inline-block">
              <span className="relative z-10 text-shadow">PromptArena</span>
              <span className="absolute inset-0 bg-purple-600 blur-lg opacity-30 rounded-full" />
              <span className="absolute -inset-2 bg-purple-400/50 backdrop-blur-3xl rounded-full" />
            </span>
            team
          </h1>

          <p className="text-lg text-gray-300 mb-8 max-w-xl">
            {/* The world's biggest advanced commercial center for crypto
            collectibles and non-fungible tokens. */}
            Reach out to us with any questions, feedback, or collaboration
            opportunities.
          </p>

          {/* Animated Buttons */}
          <div className="flex space-x-4">
            <motion.button
              className="flex items-center px-8 py-3 border-2 border-purple-200 text-white rounded-full hover:bg-purple-200/20 transition-colors duration-200 shadow-md"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <MailPlus size={20} className="mr-2" />
              <span className="font-semibold">
                <a href="#get-in-touch">Start a Conversation</a>
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Right Content - Robot Face Image */}
      <motion.div
        className="absolute top-0 right-0 md:w-[50%] w-[100%] h-full"
        style={{ y: robotTranslateY }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.6 }}
      >
        <div className="relative w-full h-full">
          <motion.img
            src={purpleRobotHalfFace}
            alt="AI Robot Face"
            loading="lazy"
            className="absolute top-0 right-0 w-full h-full object-cover select-none"
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{
              duration: 1.5,
              ease: [0.6, 0.01, -0.05, 0.95],
            }}
          />
          {/* Glow Effect */}
          <motion.div className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#cc69f3] opacity-20 blur-3xl rounded-full" />
        </div>
      </motion.div>

      {/* Subtle Background Animation */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-[#bf48eeb6] via-transparent to-transparent pointer-events-none"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
}
