import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import { debounce } from 'lodash';
import { space } from '../assets/img/contactpage';

// List of random words to combine into a random query
const randomWords = [
  'futuristic',
  'dreamscape',
  'cyberpunk',
  'forest',
  'alien',
  'city',
  'sunset',
  'landscape',
  'ocean',
  'mountain',
  'desert',
  'space',
  'galaxy',
  'robot',
  'fantasy',
  'abstract',
  'neon',
  'nature',
  'mystic',
  'vaporwave',
  'steampunk',
  'psychedelic',
  'mythical',
  'holographic',
  'dystopian',
  'vintage',
  'underwater',
  'surreal',
  'biomechanical',
  'sci-fi',
  'minimalist',
  'enchanted',
  'tropical',
  'fairy tale',
  'cosmic',
  'medieval',
  'arcade',
  'psychic',
  'urban',
  'post-apocalyptic',
  'dark fantasy',
  'winter wonderland',
  'cybernetic',
  'pixel art',
  'glitch art',
  'horror',
  'time travel',
  'retro',
  'ethereal',
  'luminous',
  'sci-fi noir',
  'ancient ruins',
  'frozen',
  'bioluminescent',
  'otherworldly',
  '4K',
  '8K',
  'realistic',
  'hyper-realistic',
  'high definition',
  'ultra-realistic',
  'photo-realistic',
  'cinematic',
  'HDR',
  'hyper-detailed',
  'high fidelity',
  'ultra high definition',
  'texture-rich',
  'vivid',
  'sharp focus',
  'high resolution',
  'macro',
  'dramatic lighting',
  'deep focus',
  'hyper clarity',
  'luxury',
  'photo-quality',
  'crisp details',
  'hyper-saturated',
  'nightscape',
  'biotech',
  'fusion',
  'glamour',
  'steampunk',
  'light trails',
  'impressionistic',
  'concept art',
  'black and white',
  'high contrast',
  'film grain',
  'vintage camera',
  'industrial',
  'glitch effect',
  'surrealism',
  'abstract expressionism',
  'natural light',
  'sharp detail',
  'macro lens',
  'oil painting',
  'watercolor',
  'charcoal sketch',
  'vintage film',
  'digital painting',
  'cartoonish',
  'comic book style',
  'neon lights',
  'retro-futuristic',
  'fantasy landscape',
  'biomechanical design',
  'vintage sci-fi',
  'hyperbolic',
  'chrome',
  'reflections',
  'floating islands',
  'space station',
  'steampunk city',
  'minimalistic design',
  'art deco',
  'lush greenery',
  'futuristic cityscape',
  'crystal-clear',
  'mystical creatures',
  'ethereal glow',
  'otherworldly realms',
  'space nebula',
  'hyper-dramatic',
  'vivid colors',
  'high contrast lighting',
  'dynamic range',
  'frosted glass',
  'laser beams',
  'golden hour',
  'glowing pathways',
  'galactic nebula',
  'hyper-stylized',
  'space-time continuum',
  'floating structures',
  'robotic limbs',
  'cosmic rays',
  'urban jungle',
  'celestial',
  'arcane magic',
  'whimsical',
  'psychotropic',
  'electric aura',
  'galactic empire',
  'post-apocalyptic wasteland',
  'alien architecture',
  'ethereal beings',
  'underground city',
  'lava rivers',
  'futuristic technology',
  'artificial intelligence',
  'hyper-connected',
  'digital dream',
  'time lapse',
  'alien planet',
  'tropical rainforest',
  'cloud city',
  'neon skyline',
  'crystal caverns',
  'cyberpunk streets',
  'alien moon',
  'supernova explosion',
  'biomechanical creatures',
  'geometric shapes',
  'skyline silhouette',
  'robot uprising',
  'dark energy',
  'mystical energy',
  'dark matter',
  'infinite universe',
];

// Skeleton Loader Component
const SkeletonLoader = ({ classNames }) => {
  return (
    <div
      className={`skeleton-loader ${classNames}`}
      style={{ height: '100%', width: '100%' }}
    >
      <img src={space} alt="Skeleton Loader" />
    </div>
  );
};

const RandomImage = ({ classNames }) => {
  const [imageUrl, setImageUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cache, setCache] = useState({}); // In-memory cache for queries and images

  // Function to generate a random query with 2-4 words
  const getRandomQuery = () => {
    const numberOfWords = Math.floor(Math.random() * 3) + 2; // Change 4 to 3
    const shuffledWords = [...randomWords].sort(() => Math.random() - 0.5);
    return shuffledWords.slice(0, numberOfWords).join(' ');
  };

  // Use memoization to avoid recalculating the query on every render
  const randomQuery = useMemo(() => getRandomQuery(), []);

  // Debounced fetch function to reduce redundant API calls
  const fetchImage = debounce(async query => {
    setLoading(true);
    setError(null);

    if (cache[query]) {
      // If the image is already cached, use it
      setImageUrl(cache[query]);
      setLoading(false);
      return;
    }

    try {
      const response = await axios.get(
        `https://lexica.art/api/v1/search?q=${query}`
      );

      if (response.data.images && response.data.images.length > 0) {
        // Pick a random image from the response
        const randomImage =
          response.data.images[
            Math.floor(Math.random() * response.data.images.length)
          ];

        // Cache the image URL
        setCache(prevCache => ({
          ...prevCache,
          [query]: randomImage.src,
        }));
        setImageUrl(randomImage.src);
      } else {
        setError('No images found for the query.');
      }
    } catch (err) {
      setError('Failed to fetch images.');
    } finally {
      setLoading(false);
    }
  }, 1000); // Delay of 1 second to debounce the request

  useEffect(() => {
    // Call debounced fetch when the query changes
    fetchImage(randomQuery);
  }, [randomQuery]); // Triggered only when the randomQuery changes

  // Default image for error case
  const defaultImage = space;

  if (loading) {
    return (
      <div>
        <img src={space} alt="Skeleton Loader" />
      </div>
    );
  }

  return (
    <>
      {imageUrl ? (
        <img src={imageUrl} alt="Random" className={classNames} />
      ) : (
        <img
          src={error ? defaultImage : defaultImage} // Default image in case of error
          alt={error}
          className={classNames}
        />
      )}
    </>
  );
};

export default RandomImage;
