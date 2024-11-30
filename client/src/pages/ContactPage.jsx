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
    <Footer />
  </>
);

export default ContactPage;
