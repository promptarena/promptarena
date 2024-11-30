import React from 'react';
import { motion } from 'framer-motion';

function BlurInText({
  text = 'Default Text',
  duration = 1,
  repeat = false,
  classNames = 'text-center font-display text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]',
}) {
  const words = text.split(' '); // Split text into words

  const variants = {
    hidden: { filter: 'blur(10px)', opacity: 0 },
    visible: { filter: 'blur(0px)', opacity: 1 },
  };

  return (
    <div className={`${classNames}`}>
      {words.map((word, index) => (
        <motion.span
          key={index}
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={{
            duration: duration, // Animation duration for each word
            delay: index * 0.9, // Stagger effect for each word
            repeat: repeat, // Infinite loop
            repeatDelay: words.length * 1.2, // Delay before restarting the loop
          }}
          className="inline-block mx-1" // Ensure spacing between words
        >
          {word}
        </motion.span>
      ))}
    </div>
  );
}

export default BlurInText;
