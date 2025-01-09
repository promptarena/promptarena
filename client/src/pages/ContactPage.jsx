// src/pages/ContactPage.jsx
import React from 'react';
import AboutHeroz from '../components/about-page/AboutHeroz';
import AboutHero from '../components/about-page/AboutHero';
import BlogHero from '../components/blog-page/BlogHero';
import ContactHero from '../components/contact-page/ContactHero';
import GetInTouch from '../components/contact-page/GetInTouch';
import Footer from '../components/global/Footer';
import NewsLetterContact from '../components/contact-page/NewsLetterContact';
import NewsletterSubscription from '../components/global/NewsletterSubscription';
import { getCurrentSiteUrl } from '../utils/getCurrentSiteUrl';
import SEO from '../components/seo/SEO';

const ContactPage = () => (
  <>
    <SEO
      title="Contact PromptArena - We'd Love to Hear From You"
      description="Get in touch with PromptArena.  We welcome your feedback, questions, and partnership inquiries. Use our contact form or find us on social media."
      keywords="contact PromptArena, contact us, feedback, questions, partnerships, support, get in touch, email PromptArena, PromptArena social media"
      url={getCurrentSiteUrl() + '/contact'}
    />
    <ContactHero />
    <GetInTouch />
    <NewsLetterContact />
    {/* <NewsletterSubscription /> */}
    <div>
      <div className="relative w-full bg-[#341358] z-0">
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
    </div>{' '}
  </>
);

export default ContactPage;
