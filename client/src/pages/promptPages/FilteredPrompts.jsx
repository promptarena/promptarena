import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
import { motion } from 'framer-motion';
import axiosInstance from '../../services/axiosInstance';
import { handleError } from '../../utils/errorHandler';
import PromptCard from '../../components/prompt/PromptCard';
import SEO from '../../components/seo/SEO';
import { getCurrentSiteUrl } from '../../utils/getCurrentSiteUrl';
import Footer from '../../components/global/Footer';

const FilteredPrompts = () => {
  const { category, tag } = useParams(); // Capture category or tag from the URL
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilteredPrompts = async () => {
      setIsLoading(true);
      setError(null); // Reset error before each fetch
      try {
        // Check if both category and tag are available and send the correct format
        const params = {};
        if (category) params.category = category;
        if (tag) params.tags = tag; // Send as a string if needed by the API

        const response = await axiosInstance.get('/prompt/all', { params });

        const prompts = response.data?.data?.prompts;
        if (Array.isArray(prompts)) {
          setFilteredPrompts(prompts);
        } else {
          setFilteredPrompts([]); // Ensure filteredPrompts is an array
        }
      } catch (error) {
        handleError(error, message => setError(message));
      } finally {
        setIsLoading(false);
      }
    };

    fetchFilteredPrompts();
  }, [category, tag]);

  if (error) {
    return (
      <div className="min-h-screen flex-center">
        <div className="text-red-500">{`An error occurred: ${error}`}</div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container min-h-screen mx-auto mt-2">
        <h1 className="text-2xl font-bold text-plain-white-background mb-4">
          {category ? `Category: ${category}` : `Tag: #${tag}`}
        </h1>

        {/* Prompt Cards Skeleton */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-700 rounded-md p-4 flex flex-col items-center"
            >
              <div className="h-24 w-full bg-gray-600 rounded"></div>
              <div className="h-4 w-3/4 bg-gray-600 rounded mt-4"></div>
              <div className="h-4 w-1/2 bg-gray-600 rounded mt-2"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (filteredPrompts.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <div className="text-center flex flex-col">
          {/* <h1 className="text-2xl font-bold text-plain-white-background mb-4 block">
            {category ? `Category: ${category}` : `Tag: #${tag}`}
          </h1> */}
          <p className="text-lg text-plain-white-background block">
            No prompts found in{' '}
            <strong className="font-semibold underline">
              {category || tag}
            </strong>{' '}
            {category ? 'category' : 'tag'}.
          </p>
        </div>
      </div>
    );
  }

  return (
    <>
      <SEO
        title={`PromptArena - Free ${category ? category : tag} Prompts`}
        description={`Discover a vast collection of free ${category ? category : tag} prompts for generating stunning AI art. Explore various styles and categories to find the perfect prompt for your next masterpiece.`}
        keywords={`free Midjourney prompts, ${category ? category : tag}, Midjourney prompts, AI art prompts, Midjourney art, text-to-image prompts, creative prompts, image generation prompts`}
        // url={getCurrentSiteUrl() + '/prompts/midjourney'}
        url={
          getCurrentSiteUrl() +
          `/prompts/${category ? 'category' : 'tag'}/${category ? category : tag}`
        }
      />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container min-h-screen mx-auto p-4"
      >
        <h2 className="text-2xl font-bold text-plain-white-background mb-4">
          {category ? `Category: ${category}` : `Tag: #${tag}`}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {filteredPrompts.map(prompt => (
            <Link key={prompt._id} to={`/prompt/${prompt._id}`}>
              <PromptCard prompt={prompt} />
            </Link>
          ))}
        </div>
      </motion.div>
      <div>
        <div className="relative w-full z-0">
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
};

export default FilteredPrompts;
