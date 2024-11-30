// useParallaxY.js
import { useTransform, useViewportScroll } from 'framer-motion';

const useParallaxY = () => {
  const { scrollY } = useViewportScroll();
  const y = useTransform(scrollY, [1000, 0], [-200, 0]);
  return y;
};

export default useParallaxY;
