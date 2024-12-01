// // src/pages/HomePage.jsx
// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import PromptCard from '../components/prompt/PromptCard';
// import axiosInstance from '../services/axiosInstance';
// import toast from 'react-hot-toast';
// import PromptPagination from './promptPages/PromptPagination';
// import MinimalPromptCard from '../components/prompt/MinimalPromptCard';
// import ThemeSwitcher from '../components/base/ThemeSwitcher';

// const HomePage = () => {
//   const [featuredPrompts, setFeaturedPrompts] = useState([]);
//   const [popularPrompts, setPopularPrompts] = useState([]);
//   const [newestPrompts, setNewestPrompts] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [featuredResponse, popularResponse, newestResponse] =
//           await Promise.all([
//             axiosInstance.get('/prompt/featured'),
//             axiosInstance.get('/prompt/popular'),
//             axiosInstance.get('/prompt/newest'),
//           ]);
//         setFeaturedPrompts(featuredResponse.data.data || []); // Ensure it's an array
//         setPopularPrompts(popularResponse.data.data || []);
//         setNewestPrompts(newestResponse.data.data || []);
//         setIsLoading(false);
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Error fetching data.');
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, []);

//   const displayPrompts = (prompts, title) => {
//     if (!Array.isArray(prompts) || prompts.length === 0) {
//       return <p key='no-prompts'>No {title} prompts found.</p>;
//     }
//     return (
//       <div>
//         <h2 className='text-2xl font-semibold mb-4'>{title} Prompts</h2>
//         <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
//           {prompts.slice(0, 10).map(
//             (
//               prompt // Limit to first 10 prompts
//             ) => (
//               <PromptCard key={prompt._id} prompt={prompt} />
//             )
//           )}
//         </div>
//       </div>
//     );
//   };

//   if (isLoading) {
//     return (
//       <div className='container mx-auto p-4'>
//         <h1 className='text-3xl font-bold mb-4'>Welcome to PromptArena</h1>
//         <p className='mb-4'>Loading prompts...</p>
//       </div>
//     );
//   }

//   return (
//     <div className='container mx-auto p-4'>
//       <h1 className='text-3xl font-bold mb-4'>Welcome to PromptArena</h1>
//       <p className='mb-4'>
//         Explore a vast collection of AI-powered prompts to ignite your
//         creativity.
//       </p>

//       {/* Featured Prompts */}
//       {displayPrompts(featuredPrompts, 'Featured')}

//       {/* Popular Prompts */}
//       {displayPrompts(popularPrompts, 'Popular')}

//       {/* Newest Prompts */}
//       {displayPrompts(newestPrompts, 'Newest')}

//       <PromptPagination />
//       <div className='grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4'>
//         <MinimalPromptCard />
//         <MinimalPromptCard />
//         <MinimalPromptCard />
//         <MinimalPromptCard />
//         <MinimalPromptCard />
//         <MinimalPromptCard />
//         <MinimalPromptCard />
//         <MinimalPromptCard />
//         <MinimalPromptCard />
//         <MinimalPromptCard />
//         <MinimalPromptCard />
//         <MinimalPromptCard />
//       </div>
//       <ThemeSwitcher />
//     </div>
//   );
// };

// export default HomePage;

// // src/pages/HomePage.jsx
// import React, { useState, useEffect, useCallback, useMemo } from 'react';
// import { Link } from 'react-router-dom';
// import PromptCard from '../components/prompt/PromptCard';
// import axiosInstance from '../services/axiosInstance';
// import toast from 'react-hot-toast';
// import MinimalPromptCard from '../components/prompt/MinimalPromptCard';
// import ThemeSwitcher from '../components/base/ThemeSwitcher';

// const HomePage = () => {
//   const [data, setData] = useState({
//     featuredPrompts: [],
//     popularPrompts: [],
//     newestPrompts: [],
//     isLoading: true,
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const [featuredResponse, popularResponse, newestResponse] =
//           await Promise.all([
//             axiosInstance.get('/prompt/featured'),
//             axiosInstance.get('/prompt/popular'),
//             axiosInstance.get('/prompt/newest'),
//           ]);

//         setData({
//           featuredPrompts: featuredResponse.data.data || [],
//           popularPrompts: popularResponse.data.data || [],
//           newestPrompts: newestResponse.data.data || [],
//           isLoading: false,
//         });
//       } catch (error) {
//         console.error('Error fetching data:', error);
//         toast.error('Error fetching data.');
//         setData(prevData => ({ ...prevData, isLoading: false }));
//       }
//     };

//     fetchData();
//   }, []);

//   const displayPrompts = useCallback((prompts, title) => {
//     if (!Array.isArray(prompts) || prompts.length === 0) {
//       return <p key={`no-prompts-${title}`}>No {title} prompts found.</p>;
//     }

//     return (
//       <div>
//         <h2 className="text-2xl font-semibold mb-4">{title} Prompts</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
//           {prompts.slice(0, 10).map(prompt => (
//             <PromptCard key={prompt._id} prompt={prompt} />
//           ))}
//         </div>
//       </div>
//     );
//   }, []);

//   const memoizedFeaturedPrompts = useMemo(() => data.featuredPrompts, [data.featuredPrompts]);
//   const memoizedPopularPrompts = useMemo(() => data.popularPrompts, [data.popularPrompts]);
//   const memoizedNewestPrompts = useMemo(() => data.newestPrompts, [data.newestPrompts]);

//   if (data.isLoading) {
//     return (
//       <div className="container mx-auto p-4">
//         <h1 className="text-3xl font-bold mb-4">Welcome to PromptArena</h1>
//         <p className="mb-4">Loading prompts...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-4">Welcome to PromptArena</h1>
//       <p className="mb-4">
//         Explore a vast collection of AI-powered prompts to ignite your
//         creativity.
//       </p>

//       {/* Conditionally render prompt sections to reduce unnecessary renders */}
//       {memoizedFeaturedPrompts.length > 0 &&
//         displayPrompts(memoizedFeaturedPrompts, 'Featured')}
//       {memoizedPopularPrompts.length > 0 &&
//         displayPrompts(memoizedPopularPrompts, 'Popular')}
//       {memoizedNewestPrompts.length > 0 &&
//         displayPrompts(memoizedNewestPrompts, 'Newest')}

//       {/* Optimized MinimalPromptCard rendering */}
//       <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
//         {Array.from({ length: 12 }).map((_, index) => (
//           <MinimalPromptCard key={`minimal-card-${index}`} />
//         ))}
//       </div>

//       <ThemeSwitcher />
//     </div>
//   );
// };

// export default HomePage;

// ---------------------------------------------------------------------

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Link } from 'react-router-dom';
import PromptCard from '../components/prompt/PromptCard';
import axiosInstance from '../services/axiosInstance';
import toast from 'react-hot-toast';
import MinimalPromptCard from '../components/prompt/MinimalPromptCard';
import ThemeSwitcher from '../components/base/ThemeSwitcher';
import LoadingSpinner from '../components/animations/loader/LoadingSpinner';
import HeroSection from '../components/home-page/HeroSection';
import CyberpunkHero from '../components/home-page/CyberpunkHero';
import HeroImageSection from '../components/home-page/HeroImageSection';
import HeroImageCarousel from '../components/home-page/HeroImageCarousel';
import Footer from '../components/global/Footer';
import CyberpunkHeroEnding from '../components/home-page/CyberpunkHeroEnding';
import AnimatedLogoCloud from '../components/framer-motion/animations/AnimatedLogoCloud';
import SEO from '../components/seo/SEO';
import { getCurrentSiteUrl } from '../utils/getCurrentSiteUrl';

const HomePage = () => {
  const [data, setData] = useState({
    featuredPrompts: [],
    popularPrompts: [],
    newestPrompts: [],
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const [featuredResponse, popularResponse, newestResponse] =
          await Promise.all([
            axiosInstance.get('/prompt/featured'),
            axiosInstance.get('/prompt/popular'),
            axiosInstance.get('/prompt/newest'),
          ]);

        if (isMounted) {
          setData({
            featuredPrompts: featuredResponse.data.data || [],
            popularPrompts: popularResponse.data.data || [],
            newestPrompts: newestResponse.data.data || [],
            isLoading: false,
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Error fetching data.');
        if (isMounted) {
          setData(prevData => ({ ...prevData, isLoading: false }));
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, []);

  // Only re-render `displayPrompts` if `data` changes
  const displayPrompts = (prompts, title) => {
    if (!Array.isArray(prompts) || prompts.length === 0) {
      return <p key={`no-prompts-${title}`}>No {title} prompts found.</p>;
    }

    return (
      <div className="mt-10">
        <h4 className="h3 text-white text-shadow font-semibold mb-4">
          {title} Prompts
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4 mb-8">
          {prompts.slice(0, 10).map(prompt => (
            <MinimalPromptCard key={prompt._id} prompt={prompt} />
          ))}
        </div>
      </div>
    );
  };

  const { featuredPrompts, popularPrompts, newestPrompts, isLoading } = data;

  if (isLoading) {
    return (
      <section className="h-screen relative z-[51 ]">
        <div className="container mx-auto p-0">
          <CyberpunkHero />
        </div>
      </section>
    );
  }

  return (
    <>
      <SEO
        title="PromptArena - The Best Free AI Prompt Marketplace"
        description="Discover thousands of free AI prompts for Midjourney, Stable Diffusion, DALL-E, ChatGPT, and more. Unleash your creativity with PromptArena's vast and ever-growing library of AI art, writing, and code prompts."
        keywords="free AI prompts, AI prompt marketplace, creative AI prompts, best AI prompts, Midjourney prompts, Stable Diffusion prompts, DALL-E prompts, ChatGPT prompts, AI art generation, AI writing tools, AI code generation, text-to-image prompts, image-to-text prompts, text generation, AI creativity, prompt templates, AI-powered content creation, free AI tools, AI art library, AI image creation, AI writing assistant, AI code suggestions"
        url={getCurrentSiteUrl() + '/'}
      />

      <CyberpunkHero />
      <HeroImageSection />
      <HeroImageCarousel />
      {/* <HeroSection /> */}
      {/* <h1 className="text-3xl font-bold mb-4">Welcome to PromptArena</h1>
      <p className="mb-4">
        Explore a vast collection of AI-powered prompts to ignite your
        creativity.
      </p> */}

      <section>
        <section className="container mx-auto">
          {/* Conditionally render prompt sections */}
          {featuredPrompts.length > 0 &&
            displayPrompts(featuredPrompts, 'Featured')}
          {popularPrompts.length > 0 &&
            displayPrompts(popularPrompts, 'Popular')}
          {newestPrompts.length > 0 && displayPrompts(newestPrompts, 'Newest')}
        </section>
        <AnimatedLogoCloud />

        <CyberpunkHeroEnding />
        <Footer />
      </section>

      {/* Render MinimalPromptCard as static elements */}
      {/* <div className="grid grid-cols-1 gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {Array.from({ length: 12 }).map((_, index) => (
          <MinimalPromptCard key={`minimal-card-${index}`} />
        ))}
      </div> */}

      {/* <ThemeSwitcher /> */}
    </>
  );
};

export default HomePage;
