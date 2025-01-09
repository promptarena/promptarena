// src/pages/AboutPage.jsx
import React from 'react';
import AboutHero from '../components/about-page/AboutHero';
import AboutHeroz from '../components/about-page/AboutHeroz';
import AboutHerozz from '../components/about-page/AboutHerozz';
import HorizantolImagesection from '../components/explore-page/HorizantolImagesection';
import AboutStep from '../components/about-page/AboutStep';
import TagsAnimation from '../components/framer-motion/TagsAnimation';
import Footer from '../components/global/Footer';
import SEO from '../components/seo/SEO';
import { getCurrentSiteUrl } from '../utils/getCurrentSiteUrl';

const AboutPage = () => (
  <>
    <SEO
      title="About PromptArena - Your Free AI Prompt Resource"
      description="Learn more about PromptArena, the mission behind our free AI prompt library, and how we're empowering creativity with AI. Meet the team and discover how to get involved."
      keywords="about PromptArena, free AI prompts, AI prompt library, PromptArena team, our mission, contact us, get involved, AI community, about us"
      url={getCurrentSiteUrl() + '/about'}
    />
    <AboutHerozz />

    <AboutStep />
    <div className="bg-purple-900/40">
      <TagsAnimation />
    </div>

    <div>
      <div className="relative w-full bg-[#291444] z-0">
        <div className="absolute rotate-180 inset-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[-1] opacity-80"></div>

        {/* <div className="relative w-full bg-[#2d1b4e] z-0"> */}
        {/* Overlay Background */}

        <div className="w-full bottom-0 h-4 lg:h-10">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
              className="fill-current dark:text-dark-primary-dark text-dark-primary shadow-2xl"
            ></path>
          </svg>
        </div>
      </div>
      <Footer />
    </div>
  </>
);

export default AboutPage;
