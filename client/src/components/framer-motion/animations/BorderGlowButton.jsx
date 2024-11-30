// import { useEffect, useRef, useState } from 'react';

// const BorderGlowButton = ({
//   children = 'Button',
//   glowColor = '#fb3b53',
//   size = 'default', // 'small', 'medium', 'large'
//   className = '',
//   style = {},
//   onClick,
// }) => {
//   const ref = useRef(null);
//   const [mousePosition, setMousePosition] = useState({
//     x: '-100%',
//     y: '-100%',
//   });

//   useEffect(() => {
//     const handleMouseMove = (e) => {
//       if (!ref.current) return;
//       const rect = ref.current.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       setMousePosition({ x: `${x}px`, y: `${y}px` });
//     };

//     document.addEventListener('mousemove', handleMouseMove);
//     return () => {
//       document.removeEventListener('mousemove', handleMouseMove);
//     };
//   }, []);

//   // Button size classes
//   const sizeClasses = {
//     default: '',
//     small: 'px-3 py-1 text-xs',
//     medium: 'px-5 py-2 text-sm',
//     large: 'px-7 py-3 text-md',
//   };

//   return (
//     <button
//       className={`relative overflow-hidden rounded-lg bg-[#e5e7eb] transform transition-transform ease-in-out active:scale-90 ${className}`}
//       ref={ref}
//       style={style}
//       onClick={onClick}
//     >
//       <span
//         className='absolute z-0 h-28 w-28 -translate-x-1/2 -translate-y-1/2'
//         style={{
//           background: `radial-gradient(${glowColor} 0%, transparent 70%)`,
//           left: mousePosition.x,
//           top: mousePosition.y,
//         }}
//       ></span>
//       <div
//         className={`relative z-10 m-[1px] rounded-[calc(0.5rem-1px)] bg-white/90 ${sizeClasses[size]} text-[#fb3b53] backdrop-blur-sm`}
//       >
//         {children}
//       </div>
//     </button>
//   );
// };

// export default React.memo(BorderGlowButton);

import { useEffect, useRef, useState } from 'react';
import React from 'react';

const BorderGlowButton = ({
  children,
  glowColor = '#B026FF',
  size = 'default', // 'small', 'medium', 'large'
  className = '',
  style = {},
  onClick,
}) => {
  const ref = useRef(null);
  const [mousePosition, setMousePosition] = useState({
    x: '-100%',
    y: '-100%',
  });

  useEffect(() => {
    const handleMouseMove = e => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      setMousePosition({ x: `${x}px`, y: `${y}px` });
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  // Button size classes
  const sizeClasses = {
    default: '',
    small: 'px-3 py-1 text-xs',
    medium: 'px-5 py-2 text-sm',
    large: 'px-7 py-3 text-md',
  };

  return (
    <button
      className={`relative overflow-hidden rounded-lg bg-[#334155] transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${sizeClasses[size]} ${className}`}
      ref={ref}
      style={style}
      onClick={onClick}
    >
      <span
        className="absolute z-0 h-40 w-40 -translate-x-1/2 -translate-y-1/2 blur-lg opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out"
        style={{
          background: `radial-gradient(${glowColor} 0%, transparent 70%)`,
          left: mousePosition.x,
          top: mousePosition.y,
        }}
      ></span>
      <div className="relative z-10 m-[1px] rounded-lg font-semibold text-white">
        {children}
      </div>
    </button>
  );
};

export default React.memo(BorderGlowButton);
