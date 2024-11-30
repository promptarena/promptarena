import {
  motion,
  useScroll,
  useVelocity,
  useTransform,
  useSpring,
} from 'framer-motion';
import React, { useRef } from 'react';

const VelocityText = ({
  className = '',
  skewRange = [-0.5, 0.5],
  skewDegrees = ['45deg', '-45deg'],
  xRange = [0, -4000],
  offset = ['start end', 'end start'],
  springConfig = { mass: 3, stiffness: 400, damping: 50 },
  mainTextStyle = 'bg-neutral-50 text-neutral-950',
  children = 'VelocityText',
}) => {
  const targetRef = useRef(null);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: offset,
  });

  const scrollVelocity = useVelocity(scrollYProgress);

  // Apply transformations for skew and x-position
  const skewXRaw = useTransform(scrollVelocity, skewRange, skewDegrees);
  const skewX = useSpring(skewXRaw, springConfig);

  const xRaw = useTransform(scrollYProgress, [0, 1], xRange);
  const x = useSpring(xRaw, springConfig);

  return (
    <section ref={targetRef} className={`h-auto ${mainTextStyle} `}>
      <div className="sticky top-0 flex h-auto items-center overflow-hidden">
        <motion.p
          style={{ skewX, x }}
          className={`origin-bottom-left whitespace-nowrap ${className}`}
        >
          {children}
        </motion.p>
      </div>
    </section>
  );
};

export default VelocityText;
