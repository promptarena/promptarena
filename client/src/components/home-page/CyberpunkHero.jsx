import React, { useEffect, useRef } from 'react';
import useParallaxY from '../../hooks/useParallaxY';
import { motion, transform } from 'framer-motion';
import { robotLoader } from '../../assets/lottieFiles';
import AiButton from '../framer-motion/animations/CustomizableButton';
import CustomizableButton from '../framer-motion/animations/CustomizableButton';
import { Link } from 'react-router-dom';
import { Play, Sparkle, WandSparkles } from 'lucide-react';
import ParallaxImage from '../framer-motion/animations/ParallaxImage';
import { humanRobotMain, humanRobotMainBg } from '../../assets/img/homepage';
import EventLoggingButton from '../global/EventLoggingButton';

export default function CyberpunkHero() {
  const Yvalue = useParallaxY();

  return (
    <div className="relative w-full bg-[#040714] z-0">
      {/* Overlay Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[0] opacity-80"></div>

      {/* Main Content */}
      <div className="container mx-auto h-auto pb-16 pt-10 relative z-[10] text-white font-sans px-4 sm:px-6 md:px-8">
        <div className="space-y-6 mb-1 text-center">
          <h1 className="lg:text-7xl md:text-6xl sm:text-5xl text-4xl font-[1000] md:font-extrabold md:leading-[1.1] leading-[1.2] md:tracking-[-0.02em] tracking-widest uppercase">
            <span className="bg-gradient-to-b from-white to-[#ABABAB] bg-clip-text text-transparent">
              EFFORTLESSLY CREATE STUNNING
            </span>
            <br />
            <span className="lg:text-8xl md:text-7xl sm:text-6xl text-5xl">
              <span className="relative text-[#dedfdc] inline-block stroke-current">
                AI-GENERATED
                <svg
                  className="absolute rounded-full -bottom-1 w-full max-h-1.5"
                  viewBox="0 0 55 5"
                  xmlns="http://www.w3.org/2000/svg"
                  preserveAspectRatio="none"
                >
                  <path
                    className="stroke-curren text-fuchsia-500 rounded-full"
                    d="M0,4 C20,0 35,0 55,4"
                    stroke="currentColor"
                    strokeWidth="3"
                    fill="none"
                  ></path>
                </svg>
              </span>{' '}
              <span className="bg-gradient-to-b from-[#ABABAB] to-[#fff] bg-clip-text text-transparent">
                CONTENT
              </span>
            </span>
          </h1>
          <p className="text-text-subdued font-share-tech-mono text-base md:text-xl font-medium">
            {/* Generate your image or video to create breathtaking AI-generated
            visuals in minutes */}
            Discover, download, and share thousands of high-quality AI prompts –
            all completely free.
          </p>
          <div className="flex flex-nowrap justify-center md:space-x-6 space-x-2 mt-8">
            <Link to="/explore">
              <EventLoggingButton
                category="navigation"
                action="clicked"
                label="explore"
              >
                <CustomizableButton
                  // buttonText="Let's Get Started"
                  buttonText="Explore Now!"
                  buttonContainerStyles="md:px-6 text-nowrap px-4 md:py-[0.65rem] py-[0.55rem] text-xs md:text-base text-shadow rounded-full uppercase"
                  buttonStyles="group relative rounded-full p-0 transition-transform hover:scale-105"
                />
              </EventLoggingButton>
            </Link>
            <Link to="/prompt/create">
              <EventLoggingButton
                category="navigation"
                action="clicked"
                label="create-prompt"
                className="md:px-6 px-5 text-nowrap md:py-[0.65rem] py-[0.73rem] md:text-base bg-[#1C2333]/80 rounded-full text-xs uppercase font-semibold hover:bg-[#1C2333] hover:scale-105 duration-slow transition-colors flex items-center gap-2"
              >
                <WandSparkles size={20} />
                <span>Create Prompt</span>
              </EventLoggingButton>
            </Link>
          </div>
        </div>

        {/* Image Showcase */}
        <div className="relative rounded-2xl rounded-b-none border-b-[1px] border-neutral-300/80 overflow-hidden bg-gradient-to-b from-transparent/0 to-green-500/10 pt-20 pb-0 z-[5]">
          {/* <div className="relative rounded-2xl overflow-hidden bg-gradient-to-b from-transparent/0 to-green-500/10 pt-20 px-6 sm:px-10 pb-0 z-[5]"> */}
          <div className="relative bottom-0 lg:-bottom-2 h-fit max-w-5xl mx-auto">
            {/* Top Gradient Overlay */}
            <div className="absolute inset-x-0 -top-10 h-1/2 bg-[radial-gradient(circle,#9400D33e,transparent)] rounded-t-full opacity-80 pointer-events-none"></div>
            <div className="absolute inset-x-0 -top-10 h-1/2 bg-transparent opacity-20 rounded-t-full ring-1 shadow-2xl pointer-events-none"></div>

            <div className="absolute inset-x-0 top-0 h-1/3 bg-gradient-to-b from-black/50 to-transparent opacity-70 rounded-t-2xl pointer-events-none"></div>

            <div className="relative inline-flex -bottom-2 sm:bottom-0 rounded-2xl rounded-b-none overflow-hidden p-[1px] pb-0">
              <span className="absolute rounded-2xl rounded-b-none inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#ff007a_0%,#00f0ff_33%,#39ff14_66%,#ffe600_100%)]"></span>
              <ParallaxImage
                bgImage={humanRobotMainBg}
                fgImage={humanRobotMain}
              />
            </div>

            {/* Prompt Overlay */}
            <div className="absolute flex justify-center items-center w-full left-0 bottom-0">
              <motion.h1
                style={{ translateY: Yvalue }}
                className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl overflow-hidden  xl:text-9xl font-sans uppercase text-center font-black md:font-[800] tracking-[-0.05rem] z-[1]"
                // className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl overflow-hidden  xl:text-9xl font-sans uppercase text-center font-[800] tracking-[-0.05rem] z-[1]"
              >
                <span className="bg-gradient-to-b from-white to-[#ABABAB] bg-clip-text text-transparent">
                  PromptArena
                </span>
              </motion.h1>
            </div>

            {/* 4K Badge */}
            <div className="absolute z-[0] sm:right-4 right-1 bottom-4 bg-black/30 backdrop-blur-sm rounded-lg sm:py-2 py-0 px-1 sm:px-3">
              <div className="flex-center sm:gap-2 gap-[2px]">
                <span className=" text-xs md:text-sm font-semibold">4K</span>
                <div className="h-2 w-2 rounded-full bg-[#00FF85] animate-pulse"></div>
                <span className=" text-[10px] md:text-xs text-[#ABABAB]">
                  Generating prompt...
                </span>
              </div>
            </div>

            {/* Glass Effect Overlays */}
            <motion.div
              style={{ translateX: Yvalue }}
              className="absolute left-4 bottom-4 w-32 sm:w-40 h-32 sm:h-40 bg-green-500/20 backdrop-blur-lg rounded-full z-[0]"
            >
              <img
                src="https://images.piclumen.com/normal/20241103/88252/be95469b-ed4c-42f8-b24e-e9f1ae9030c9.webp"
                alt="Robot Loader"
              />
            </motion.div>
            <motion.div
              style={{ translateX: Yvalue }}
              className="absolute right-4 bottom-4 w-32 sm:w-40 h-32 sm:h-40 bg-purple-500/20 backdrop-blur-lg rounded-full z-[0]"
            ></motion.div>
          </div>

          {/* Glow Effects */}
          <div className="absolute -right-20 -bottom-20 w-60 sm:w-80 h-60 sm:h-80 bg-[#9747FF]/20 rounded-full blur-3xl"></div>
        </div>
      </div>
    </div>
  );
}
