// src/pages/promptPages/PromptPage.jsx
import React from 'react';
import CreatePromptForm from '../../components/prompt/CreatePromptForm';
import { useAuthStore } from '../../store/authStore';
import { Navigate } from 'react-router-dom';
import CreatePromptFormz from '../../components/prompt/CreatePromptFormz';
import { motion } from 'framer-motion';
import { ArrowRight, Stars } from 'lucide-react';
import {
  humanRobotIMG1,
  humanRobotIMG2,
  purpleRobotMain,
  purpleRobotRight,
} from '../../assets/img/promptpage';
import MarqueeSlider from '../../components/explore/MarqueeSlider';
import CustomizableButton from '../../components/framer-motion/animations/CustomizableButton';
import { RandomizedTextEffect } from '../../components/framer-motion/animations/RandomizedTextEffect';

const PromptPage = () => {
  const { isAuthenticated, user } = useAuthStore();

  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  };

  const lineVariant = {
    initial: { width: 0 },
    animate: { width: '100%' },
    transition: { duration: 1, delay: 0.5 },
  };

  // Redirect unauthenticated users to login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return (
    <>
      {/* Hero Container */}
      <div>
        <div className="relative w-full bg-gradient-to-br from-purple-900/20 via-[#030303]/100 to-purple-900 text-white overflow-hidden">
          {/* Hero Section */}
          {/* bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 */}
          <div className=" w-full container flex min-h-[90vh] flex-col md:flex-row md:items-center md:justify-between justify-center  border-b-8 border-purple-600 ">
            {/* Vertical text on the left edge */}
            <div
              className="absolute top-0  left-0 transform -rotate-90 whitespace-nowrap tracking-[0.2em] text-white/80 z-0"
              style={{ transformOrigin: 'top left' }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h1"
              >
                <MarqueeSlider className="w-full" repeat={5}>
                  {new Array(5)
                    .fill('CRAFT YOUR PROMPT MASTERPIECE')
                    .map((text, index) => (
                      <span key={index}>{text}</span>
                    ))}
                </MarqueeSlider>
              </motion.div>
            </div>

            {/* Vertical text on the right edge */}
            <div
              className="absolute top-0 right-0 transform -translate-y-1/2 rotate-90 whitespace-nowrap tracking-[0.2em] text-white/80 z-[0] w-full"
              style={{ transformOrigin: 'top right' }}
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="h1"
              >
                <MarqueeSlider className="w-full" repeat={5}>
                  {new Array(5)
                    .fill('CRAFT YOUR PROMPT MASTERPIECE')
                    .map((text, index) => (
                      <span key={index}>{text}</span>
                    ))}
                </MarqueeSlider>
              </motion.div>
            </div>

            {/* Main content in Hero Section */}
            <div className="relative mx-auto px-4 pb-12 text-center z-[20]">
              {/* Title */}
              <motion.h1
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="xl:text-8xl lg:text-7xl md:text-6xl sm:text-5xl xs:text-4xl text-[2.1rem] font-share-tech-mono mb-4 font-bold text-shadow"
              >
                <RandomizedTextEffect text="Share Your AI Magic" />
              </motion.h1>

              {/* Description */}
              {/* <p className="text-xl text-gray-400">
                Explore the cyberpunk world where the lines between humanity and
                machinery blur.
              </p> */}

              {/* Main Content (scrolling content) */}
              <div className="mx-auto px-4 py-0">
                <div className="grid grid-cols-1  lg:grid-cols-2 gap-16">
                  {/* Left side */}
                  <div className="space-y-8">
                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="space-y-4 "
                    >
                      <h2 className="text-2xl font-bold flex items-center">
                        Think & Transform
                        <span className="ml-4 w-32 h-[1px] bg-gradient-to-br from-[#7620ff] via-[#143D87]/100 to-purple-900"></span>
                        <span className="ml-2 w-4 h-4 rounded-full bg-[#491C91]"></span>
                      </h2>
                      <p className="text-gray-400">
                        Dive into compelling narratives set in a dystopian
                        future.
                      </p>
                    </motion.div>

                    <motion.div
                      initial={{ x: -50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="bg-black/60 backdrop-blur-sm shadow-2xl border border-[#491C91]/50 rounded-xl p-6 space-y-4"
                    >
                      <div className="flex items-center gap-6">
                        <img
                          src={purpleRobotRight}
                          alt={'Purple Robot Right'}
                          className="w-24 h-28 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="md:text-5xl sm:text-4xl text-3xl font-bold gradient-purple-text ">
                            16,285K+
                          </h3>
                          <h4 className="text-xl font-semibold mt-2">
                            Prompts & Growing
                          </h4>
                        </div>
                      </div>
                      <p className="text-gray-400">
                        {/* New AI Models Supported! Experiment with the latest
                        cutting-edge AI. */}
                        Explore a vast library of AI prompts to ignite your
                        imagination.
                      </p>
                    </motion.div>
                  </div>

                  {/* Right side */}
                  <div className="space-y-8 lg:block hidden">
                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="space-y-4"
                    >
                      <h2 className="text-2xl font-bold">EVENTS AND UPDATES</h2>
                      <p className="text-gray-400">
                        Stay updated on the latest AI model releases and
                        <br /> prompting trends.
                      </p>
                      <CustomizableButton
                        icon={Stars}
                        buttonContainerStyles="text-white py-2 rounded-3xl gap-2 text-shadow transition-colors"
                        buttonText="Discover More"
                      />
                      {/* <button className="bg-purple-600 w-1/3 text-center flex-center mx-auto text-white py-2 rounded-md gap-2 hover:bg-[#FF4500]/80 transition-colors">
                         Discover More
                        <ArrowRight className="w-4 h-4" />
                      </button> */}
                    </motion.div>

                    {/* <motion.div
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    className="space-y-4"
                  >
                    <h2 className="text-2xl font-bold">ART AND DESIGN</h2>
                    <p className="text-gray-400">
                      Feast your eyes on stunning visuals and concept art that
                      bring the cyberpunk
                    </p>
                  </motion.div> */}

                    <motion.div
                      initial={{ x: 50, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="bg-black/40 backdrop-blur-sm border shadow-2xl border-[#491C91]/50 rounded-xl p-6 z-[999]"
                    >
                      <h3 className="text-5xl font-bold gradient-purple-text">
                        20+
                      </h3>
                      <p className="text-xl mt-2">Supported AI Models</p>
                    </motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Large centered image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.5 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="absolute w-full bottom-0 flex justify-center z-20 pointer-events-none"
          >
            <img
              src={purpleRobotMain}
              alt="Purple Robot Main"
              className="w-[500px] drop-shadow-[0_0_0.3rem_#491C91] h-[500px] object-cover md:w-[500px] md:h-[500px] lg:w-[620px] lg:h-[600px]"
            />
          </motion.div>
        </div>
      </div>

      <div className="container mx-auto relative z-0 ">
        <CreatePromptFormz />
      </div>
    </>
  );
};

export default PromptPage;
