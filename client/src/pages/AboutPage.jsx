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
      <Footer />
    </div>
  </>
);

export default AboutPage;
