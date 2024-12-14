// CustomScrollBar.jsx
import { useScroll, useTransform, motion } from 'framer-motion';
import React from 'react';

const CustomScrollWrapper = ({ children }) => {
  // Track scroll progress across the document
  const { scrollYProgress } = useScroll();

  // Transform scroll progress to control width of custom scrollbar
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

  return (
    <div className="relative h-full w-full">
      {/* Custom Scrollbar */}
      <motion.div
        className="fixed top-0 left-0 h-1 bg-blue-500 z-50"
        style={{ width }}
      />

      {/* Page Content */}
      <div className="hide-scrollbar">{children}</div>
    </div>
  );
};

export default CustomScrollWrapper;
