// 'use client';
// import React, { useEffect, useRef, useState } from 'react';
// import { AnimatePresence, motion } from 'framer-motion';
// import { avatar1 } from '../../../assets/img/blogpage';

// function FramerCarousel({
//   items = [
//     avatar1,
//     avatar1,
//     avatar1,],
// }) {
//   const [activeItem, setActiveItem] = useState(items[0]);
//   const [width, setWidth] = useState(0);
//   const carousel = useRef(null);

//   useEffect(() => {
//     setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
//   }, [carousel]);

//   return (
//     <>
//       <motion.div
//         layoutId={'activeItems'}
//         className="rounded-md w-fit pb-4 gap-2 items-center mx-auto cursor-auto "
//         onClick={e => e.stopPropagation()}
//       >
//         <AnimatePresence mode="popLayout" initial={false}>
//           {items.map(
//             (item, index) =>
//               item === activeItem && (
//                 <motion.figure
//                   key={index}
//                   className="dark:bg-gray-900/60 bg-gray-100/60 border rounded-md p-4 backdrop-blur-sm"
//                 >
//                   <motion.div
//                     initial={{ opacity: 0 }}
//                     animate={{
//                       opacity: 1,
//                       transition: {
//                         type: 'ease',
//                         ease: 'easeInOut',
//                         duration: 0.3,
//                         delay: 0.2,
//                       },
//                     }}
//                     exit={{
//                       opacity: 0,
//                       transition: {
//                         type: 'ease',
//                         ease: 'easeInOut',
//                         duration: 0.2,
//                       },
//                     }}
//                   >
//                     <img
//                       src={activeItem}
//                       alt="preview_img"
//                       className="object-contain h-96 mx-auto rounded-md"
//                     />
//                   </motion.div>
//                 </motion.figure>
//               )
//           )}
//         </AnimatePresence>

//         <motion.div className="w-[550px] mt-4 mx-auto overflow-hidden dark:bg-gray-900/60 bg-gray-100/60 border rounded-md">
//           <motion.div
//             ref={carousel}
//             drag="x"
//             dragElastic={0.2}
//             dragConstraints={{ right: 0, left: -width }}
//             dragTransition={{ bounceDamping: 30 }}
//             transition={{ duration: 0.2, ease: 'easeInOut' }}
//             className="flex"
//           >
//             {items.map((itemData, index) => {
//               return (
//                 <motion.div
//                   key={index}
//                   className="relative p-2 flex-shrink-0"
//                   onClick={() => setActiveItem(itemData)}
//                 >
//                   <img
//                     src={itemData}
//                     alt={`carousel_image_${index}`}
//                     className="w-28 h-16 object-cover cursor-pointer relative z-[2] rounded-md pointer-events-none"
//                   />
//                   {itemData === activeItem && (
//                     <motion.div
//                       layoutId="slider"
//                       transition={{
//                         layout: {
//                           duration: 0.2,
//                           ease: 'easeOut',
//                         },
//                       }}
//                       className="absolute top-0 left-0 h-full w-full dark:bg-gray-100 bg-gray-800 rounded-md"
//                     ></motion.div>
//                   )}
//                 </motion.div>
//               );
//             })}
//           </motion.div>
//         </motion.div>
//       </motion.div>
//     </>
//   );
// }

// export default FramerCarousel;

'use client';
import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import OptimizedImage from '../../base/OptimizedImage';

function FramerCarousel({
  items = [],
  activeItem: defaultActiveItem = null,
  imageSize = { width: 100, height: 100 },
  carouselWidth = 550,
  transitionDuration = 0.3,
  transitionEase = 'easeInOut',
  overlayColor = 'bg-gray-800',
  sliderClass = 'w-[550px] mt-4 mx-auto overflow-hidden dark:bg-gray-900/60 bg-gray-100/60 border rounded-md',
  overlayDuration = 0.2,
  overlayEase = 'easeOut',
  containerClass = 'rounded-md w-fit pb-4 gap-2 items-center mx-auto cursor-auto',
  thumbnailClass = 'w-28 h-16 object-cover cursor-pointer relative z-[2] rounded-md pointer-events-none',
  activeClass = 'absolute top-0 left-0 h-full w-full bg-gray-800 rounded-md',
  imageBGClass = 'dark:bg-gray-900/60 bg-gray-100/60 border rounded-md p-4 backdrop-blur-sm',
  mainImageClass = 'object-contain h-96 mx-auto rounded-md',
}) {
  // Default active item is the first item if not provided
  const [activeItem, setActiveItem] = useState(defaultActiveItem || items[0]);
  const [width, setWidth] = useState(0);
  const carousel = useRef(null);

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, [carousel]);

  return (
    <>
      <motion.div
        layoutId={'activeItems'}
        className={containerClass}
        onClick={e => e.stopPropagation()}
      >
        <AnimatePresence mode="popLayout" initial={false}>
          {items.map(
            (item, index) =>
              item === activeItem && (
                <motion.figure key={index} className={imageBGClass}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{
                      opacity: 1,
                      transition: {
                        type: 'ease',
                        ease: transitionEase,
                        duration: transitionDuration,
                        delay: 0.2,
                      },
                    }}
                    exit={{
                      opacity: 0,
                      transition: {
                        type: 'ease',
                        ease: transitionEase,
                        duration: 0.2,
                      },
                    }}
                  >
                    <OptimizedImage
                      transformations={{
                        q: 'auto',
                        w: 500,
                        h: 500,
                      }}
                      src={activeItem}
                      alt="preview_img"
                      className={mainImageClass}
                    />
                  </motion.div>
                </motion.figure>
              )
          )}
        </AnimatePresence>

        <motion.div className={`${sliderClass}`}>
          <motion.div
            ref={carousel}
            drag="x"
            dragElastic={0.2}
            dragConstraints={{ right: 0, left: -width }}
            dragTransition={{ bounceDamping: 30 }}
            transition={{ duration: transitionDuration, ease: transitionEase }}
            className="flex"
          >
            {items.map((itemData, index) => {
              return (
                <motion.div
                  key={index}
                  className="relative p-2 flex-shrink-0"
                  onClick={() => setActiveItem(itemData)}
                >
                  <OptimizedImage
                    transformations={{
                      q: 'auto',
                    }}
                    src={itemData}
                    alt={`carousel_image_${index}`}
                    className={thumbnailClass}
                  />
                  {itemData === activeItem && (
                    <motion.div
                      layoutId="slider"
                      transition={{
                        layout: {
                          duration: overlayDuration,
                          ease: overlayEase,
                        },
                      }}
                      className={activeClass}
                    ></motion.div>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
}

export default FramerCarousel;
