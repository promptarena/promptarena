// useParallaxY.js
import { useTransform, useScroll } from 'framer-motion';

const useParallaxY = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [1000, 0], [-200, 0]);
  return y;
};

export default useParallaxY;
