import React, { useEffect, useState } from 'react';
import MarqueeSlider from '../components/explore/MarqueeSlider';
import toast from 'react-hot-toast';
import axiosInstance from '../services/axiosInstance';
import GlassmorphicCard from '../components/prompt/GlassmorphicCard';
import { boy, cat, chucky, girl, honeybee, metal } from '../assets/img/explore';
import ExploreTopHead from '../components/explore-page/ExploreTopHead';
import PromptList from '../components/prompt/PromptList';
import VelocityText from '../components/framer-motion/animations/VelocityText';
import Footer from '../components/global/Footer';
import ExploreHero from '../components/explore-page/ExploreHero';
import SEO from '../components/seo/SEO';
import { getCurrentSiteUrl } from '../utils/getCurrentSiteUrl';

const ExplorePage = () => {
  const promptDetails = [
    {
      title: "Chucky from Child's play movie brandishing a knife",
      promptDescription:
        "80s oil painting of Chucky from Child's play movie brandishing a knife, menacing expression, sinister mood",
      model: 'Playground v2.5',
      image: chucky,
    },
    {
      title: 'Monkeyking futuristic pixar',
      promptDescription:
        'A cute little hornet with big funny eyes, hovering in the air, PIxar style.',
      model: 'Midjourney',
      image:
        'https://images.piclumen.com/normal/20241108/88252/d8e88ae5-ad3d-4e71-a58d-61314c9a7c14.webp',
    },
    {
      title: 'Beautiful standing in front of a window',
      promptDescription:
        'A girl standing in front of a large window with long blonde hair, holding a bouquet of lotus',
      model: 'FLUX.1',
      image: girl,
    },
    {
      title: 'Cyberpunk futuristic men in island',
      promptDescription:
        'cyberpunk apocalypse background, eroguro, horror, dark cyberpunk, cinematic lights, realistic lights and shadows, detailed light, starrystarscloudcolorful, necromorph, Manwha art style',
      model: 'Stable Diffusion',
      image: boy,
    },
    {
      title:
        '写真のようにリアルな画像をください。背景は団地で、ラッパーみたいな猫の姿。',
      promptDescription:
        '写真のようにリアルな画像をください。背景は団地で、ラッパーみたいな猫の姿。猫にはサングラスを着けて、ドレットヘアーのカツラをかぶせてください。装飾はゴールドのネックレスや時計を着けてください',
      model: 'Leonardo',
      image: cat,
    },
    {
      title: 'Nursing resemble human buddy wearing helmet',
      promptDescription:
        'battlesuit with knight armor & gauntlets (bot with detailed, humanized face)',
      model: 'PicLumen',
      image: metal,
    },
  ];

  const [data, setData] = useState({
    featuredPrompts: [],
    isLoading: true,
  });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      try {
        const featuredResponse = await axiosInstance.get('/prompt/featured');

        if (isMounted) {
          setData({
            featuredPrompts: featuredResponse.data.data || [],
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

  const { featuredPrompts, isLoading } = data;

  return (
    <>
      <SEO
        title="Explore Free AI Prompts - PromptArena"
        description="Discover a vast library of free AI prompts for Midjourney, Stable Diffusion, DALL-E, ChatGPT, and more.  Find the perfect prompt to ignite your creativity for AI art, writing, and code."
        keywords="free AI prompts, AI prompts, prompt library, free Midjourney prompts, free Stable Diffusion prompts, free DALL-E prompts, free ChatGPT prompts, AI art prompts, AI writing prompts, AI code prompts, creative prompts, image generation prompts, text generation prompts, code generation prompts"
        url={getCurrentSiteUrl() + '/explore'}
      />
      <section>
        <ExploreHero />
        <ExploreTopHead />
        <div className="relative w-full bg-[#2d1b4e] z-0">
          {/* Overlay Background */}
          <div className="absolute rotate-180 bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f3e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] z-[0] opacity-80"></div>
          <div className="w-full overflow-hidden"></div>
          {!isLoading ? (
            <MarqueeSlider
              repeat={6}
              pauseOnHover={true}
              className={'overflow-x-hidden py-0 shadow-none'}
            >
              {promptDetails.map(prompt => (
                <GlassmorphicCard key={prompt._id} prompt={prompt} />
              ))}
            </MarqueeSlider>
          ) : (
            <div className="grid grid-cols-3 sm:grid-cols-3 lg:grid-cols-6 gap-4 animate-pulse">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={index}
                  className="w-full h-40 bg-gray-300 rounded-lg animate-pulse"
                />
              ))}
            </div>
          )}

          <div className="w-full overflow-hidden">
            {/* Diagonal Stripes */}

            {/* Second Stripe */}
            <div className="">
              <div className="h-auto">
                <VelocityText
                  skewRange={[0, 0]}
                  skewDegrees={[0, 0]}
                  mainTextStyle="py-0 text-shadow"
                >
                  <h5 className="h1 font-extrabold font-roboto-mono tracking-widest text-[#d3aff5]">
                    <span>
                      UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
                      <span className="text-[#bcb9c0]">✧</span>{' '}
                    </span>
                    <span>
                      UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
                      <span className="text-[#bcb9c0]">✧</span>{' '}
                    </span>
                    <span>
                      UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
                      <span className="text-[#bcb9c0]">✧</span>{' '}
                    </span>
                    <span>
                      UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
                      <span className="text-[#bcb9c0]">✧</span>{' '}
                    </span>
                    <span>
                      UNLOCK THE POWER OF AI WITH PROMPTARENA{' '}
                      <span className="text-[#bcb9c0]">✧</span>{' '}
                    </span>
                  </h5>
                </VelocityText>
              </div>
            </div>
          </div>
          <div
            id="viewcollection"
            className="w-full overflow-hidden sm:pt-0 py-5"
          >
            <PromptList />
          </div>
        </div>
        <div className="relative w-full bg-[#2d1b4e] z-0">
          {/* Overlay Background */}

          {/* <div className="w-full h-10">
          <svg
            viewBox="0 0 1440 100"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 43.9999C106.667 43.9999 213.333 7.99994 320 7.99994C426.667 7.99994 533.333 43.9999 640 43.9999C746.667 43.9999 853.333 7.99994 960 7.99994C1066.67 7.99994 1173.33 43.9999 1280 43.9999C1386.67 43.9999 1440 19.0266 1440 9.01329V100H0V43.9999Z"
              className="fill-current dark:text-dark-primary-dark text-dark-primary"
            ></path>
          </svg>
        </div> */}
        </div>
      </section>
      <div>
        <div className="relative w-full bg-gradient-to-b from-[#2e1550] to-[#2d1b4e] z-0">
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

export default ExplorePage;
