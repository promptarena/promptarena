import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BackgroundGradient } from '../ui/BackgroundGradient';
import { formatRelativeTime } from '../../../utils/date';
import { Link } from 'react-router-dom';
import { getOptimizedImageUrl } from '../../../utils/imageOptimizer';
import EventLoggingButton from '../../global/EventLoggingButton';

export function BackgroundGradientCard({ post }) {
  console.log('post: ', post);
  const { media, title, author, content, createdAt, buttonText } = post;
  const images = media?.images || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex(prevIndex => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex(prevIndex =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div>
      <BackgroundGradient className="rounded-[22px] p-4 sm:p-5 bg-white dark:bg-zinc-900">
        <div className="relative w-full overflow-hidden rounded-2xl aspect-square">
          <AnimatePresence initial={false}>
            {images.length > 0 && (
              <motion.img
                key={currentIndex}
                src={getOptimizedImageUrl(images[currentIndex], {
                  w: 600,
                  h: 600,
                  q: 'auto',
                  f: 'auto',
                  c: 'fill',
                  g: 'auto',
                })}
                alt={title}
                className="object-cover w-full aspect-square h-full rounded-2xl"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
              />
            )}
          </AnimatePresence>

          {/* Carousel Controls */}
          {images.length > 1 && (
            <div className="absolute inset-0 flex justify-between items-center p-1">
              <button
                onClick={handlePrev}
                className="text-white bg-black/50 p-2 rounded-full"
              >
                &lt;
              </button>
              <button
                onClick={handleNext}
                className="text-white bg-black/50 p-2 rounded-full"
              >
                &gt;
              </button>
            </div>
          )}
        </div>

        {/* Card Content */}
        <div className="py-3 text-sm font-regular text-gray-900 flex items-center justify-between">
          <a
            href="#"
            className="flex flex-row items-center hover:text-neutral-200 mr-3"
          >
            <svg
              className="text-gray-900 dark:text-neutral-400"
              fill="currentColor"
              height="16px"
              aria-hidden="true"
              role="img"
              focusable="false"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill="currentColor"
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"
              ></path>
              <path d="M0 0h24v24H0z" fill="none"></path>
            </svg>
            <span className="ml-1 font-mono text-xs font-normal opacity-75 text-black dark:text-neutral-400">
              <Link
                to={`/profile/username/${author.username}`}
                className="hover:underline"
              >
                {author.username}
              </Link>
            </span>
          </a>
          <span className="mr-3 flex flex-row items-center">
            <svg
              className="text-gray-900 dark:text-neutral-400"
              fill="currentColor"
              height="13px"
              width="13px"
              version="1.1"
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              x="0px"
              y="0px"
              viewBox="0 0 512 512"
              style={{ enableBackground: 'new 0 0 512 512' }}
              xmlSpace="preserve"
            >
              <g>
                <g>
                  <path d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z"></path>
                </g>
              </g>
            </svg>
            <span className="ml-1 font-mono text-xs font-normal opacity-75 text-black dark:text-neutral-400">
              {formatRelativeTime(createdAt)}
            </span>
          </span>
        </div>
        <hr />
        <p className="text-base sm:text-xl text-black mt-3 mb-2 dark:text-neutral-200">
          {title.slice(0, 30) + '...'}
        </p>
        <p className="text-sm text-neutral-600 mb-2 dark:text-neutral-400">
          {content.slice(0, 80) + '...'}
        </p>
        <button className="inline-flex py-1 w-full items-center justify-center rounded-3xl border border-gray-800 bg-gradient-to-t from-[#8678f9] from-0% to-[#c7d2fe] font-medium text-gray-950 transition-colors focus:outline-none">
          <EventLoggingButton category="blog" action="view" label={title}>
            {buttonText || <Link to={`/blog/${post._id}`}>Read more</Link>}
          </EventLoggingButton>
        </button>
      </BackgroundGradient>
    </div>
  );
}
