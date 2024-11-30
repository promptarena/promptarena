import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { User, Eye, DollarSign } from 'lucide-react';
import { BorderTrail } from '../framer-motion/animations/BorderTrail';

// Main GlassmorphicCard component
const GlassmorphicCard = memo(({ prompt }) => {
  const {
    title = 'Untitled Prompt',
    promptDescription = '',
    model = 'Midjourney',
    image = '',
  } = prompt || {};

  return (
    <>
      <div className="relative w-64 glassEffect overflow-hidden p-4 h-full rounded-2xl shadow-2xl hover:shadow-xl transition-shadow duration-200">
        <BorderTrail
          size={10000}
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }}
        />
        <img
          alt={title}
          src={image}
          loading="lazy"
          className="absolute w-40 h-full drop-shadow-[0_0_10px_rgba(0,0,0,0.5)] -right-0 -bottom-0 top-0"
        />
        <div className="w-4/6">
          <p className="mb-2 text-lg font-medium text-neutral-100 text-shadow">
            {title.slice(0, 15) + '...'}
          </p>
          <p className="text-xs text-neutral-400">
            {promptDescription.slice(0, 30) + '...'}{' '}
          </p>
          <span className="relative bg-blue-50 px-[0.1875rem] font-medium text-xs text-purple-300 dark:bg-transparent">
            {model}
            <span className="-top-px absolute inset-x-[-0.1875rem] block transform-gpu text-blue-200 dark:text-text-subdued">
              <svg
                aria-hidden="true"
                height="1"
                stroke="currentColor"
                strokeDasharray="3.3 1"
                width="100%"
              >
                <line x1="0" x2="100%" y1="0.5" y2="0.5" />
              </svg>
            </span>
            <span className="-bottom-px absolute inset-x-[-0.1875rem] block transform-gpu text-blue-200 dark:text-text-subdued">
              <svg
                aria-hidden="true"
                height="1"
                stroke="currentColor"
                strokeDasharray="3.3 1"
                width="100%"
              >
                <line x1="0" x2="100%" y1="0.5" y2="0.5" />
              </svg>
            </span>
            <span className="-left-px absolute inset-y-[-0.1875rem] block transform-gpu text-blue-200 dark:text-text-subdued">
              <svg
                aria-hidden="true"
                height="100%"
                stroke="currentColor"
                strokeDasharray="3.3 1"
                width="1"
              >
                <line x1="0.5" x2="0.5" y1="0" y2="100%" />
              </svg>
            </span>
            <span className="-right-px absolute inset-y-[-0.1875rem] block transform-gpu text-blue-200 dark:text-text-subdued">
              <svg
                aria-hidden="true"
                height="100%"
                stroke="currentColor"
                strokeDasharray="3.3 1"
                width="1"
              >
                <line x1="0.5" x2="0.5" y1="0" y2="100%" />
              </svg>
            </span>
          </span>
        </div>
      </div>
    </>
  );
});

export default GlassmorphicCard;

// <Link to={`/prompt/${promptId}`} className="w-full max-w-xs mx-auto">
//   <div className="relative bg-white/30 backdrop-blur-md rounded-lg shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden p-4 h-full flex flex-col justify-between">
//     <div className="relative h-36 w-full rounded-lg overflow-hidden">
//     <CollageImages images={collageImages} />
//       <div className="absolute top-2 left-2 px-3 py-1 rounded-md bg-black/70 text-white text-xs shadow">
//         {category}
//       </div>
//     </div>
//     <div className="mt-4 flex-1">
//       <h2 className="text-md font-semibold text-gray-900 truncate">
//         {title}
//       </h2>
//       <p className="text-sm text-gray-600 mt-1">
//         by <span className="font-medium">{name || username}</span>
//       </p>
//       <div className="flex space-x-2 mt-2">
//         {tags.slice(0, 2).map((tag, idx) => (
//           <span
//             key={idx}
//             className="bg-gray-200 text-xs font-light text-gray-700 px-2 py-0.5 rounded-md"
//           >
//             #{tag}
//           </span>
//         ))}
//       </div>
//     </div>
//     <div className="mt-4 flex justify-between items-center text-sm">
//       <div className="flex items-center text-gray-700 space-x-1">
//         <DollarSign size={14} />
//         <span>${price}</span>
//       </div>
//       <div className="flex items-center text-gray-700 space-x-1">
//         <Eye size={14} />
//         <span>{views}</span>
//       </div>
//       <div className="flex items-center text-gray-700 space-x-1">
//         <User size={14} />
//         <span>{sales} sold</span>
//       </div>
//     </div>
//   </div>
// </Link>

// https://images.piclumen.com/normal/20241108/88252/0b9bdd4c-0af6-4762-96af-c5a32eb54b63.webp

// https://images.piclumen.com/normal/20241107/88252/00ba78b8-5227-444a-b4c1-071e843d50e2.webp

// https://images.piclumen.com/normal/20241108/88252/e71b29b3-e53c-4ca7-a3fd-c3d6fbb4d6e6.webp

// https://images.piclumen.com/normal/20241108/88252/bb08c177-cd51-4a75-ae78-229edb2e0e7b.webp

// https://images.piclumen.com/normal/20241108/88252/40b80237-83bf-4b62-ae4f-0b5c07e779ee.webp
