import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import LoadingSpinner from '../../components/animations/loader/LoadingSpinner';
import { motion } from 'framer-motion';
import axiosInstance from '../../services/axiosInstance';
import { handleError } from '../../utils/errorHandler';
import PromptCard from '../../components/prompt/PromptCard';
import SEO from '../../components/seo/SEO';
import { getCurrentSiteUrl } from '../../utils/getCurrentSiteUrl';

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
      <div className="container mx-auto mt-2">
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
        className="container mx-auto p-4"
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
    </>
  );
};

export default FilteredPrompts;
