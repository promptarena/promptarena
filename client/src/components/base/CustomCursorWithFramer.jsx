// CustomCursorWithFramer.jsx
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import '../../assets/css/base/CustomCursor.css'; // Import your CSS

const CustomCursorWithFramer = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    const updatePosition = e => {
      const { clientX, clientY, movementX, movementY } = e;

      setPosition({ x: clientX, y: clientY });

      // Calculate angle for triangle rotation based on mouse movement
      const newAngle = Math.atan2(movementY, movementX) * (180 / Math.PI);
      setAngle(newAngle);
    };

    window.addEventListener('mousemove', updatePosition);
    window.addEventListener('mousedown', () => setClicked(true));
    window.addEventListener('mouseup', () => setClicked(false));

    return () => {
      window.removeEventListener('mousemove', updatePosition);
      window.removeEventListener('mousedown', () => setClicked(false));
      window.removeEventListener('mouseup', () => setClicked(false));
    };
  }, []);

  const cursorContent = useMemo(
    () => (
      <motion.div
        className={`custom-cursor ${hovered ? 'hovered' : ''} ${
          clicked ? 'clicked' : ''
        }`}
        animate={{
          x: position.x,
          y: position.y,
          scale: clicked ? 1.5 : hovered ? 1.2 : 1,
          opacity: clicked ? 0.9 : 1,
          rotate: angle, // Rotate based on calculated angle
        }}
        transition={{
          type: 'spring',
          stiffness: 300,
          damping: 25,
        }}
      >
        {/* Inner dynamic triangle */}
        <motion.div
          className="cursor-triangle"
          animate={{ rotate: angle }}
          transition={{ type: 'tween', ease: 'linear', duration: 0.2 }}
        />
      </motion.div>
    ),
    [position, hovered, clicked, angle]
  );

  return cursorContent;
};

export default CustomCursorWithFramer;
