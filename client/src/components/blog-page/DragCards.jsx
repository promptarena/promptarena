// import React, { useRef, useState } from 'react';
// import { motion } from 'framer-motion';
// import { twMerge } from 'tailwind-merge';

// export const DragCards = () => {
//   return (
//     <section className="relative grid min-h-screen w-full place-content-center overflow-hidden ">
//       <h2 className="relative z-0 text-[20vw] font-black text-shadow text-cyber-purple md:text-[200px]">
//         BLOG<span className="text-cyber-blue">.</span>
//       </h2>
//       <Cards />
//     </section>
//   );
// };

// const Cards = () => {
//   const containerRef = useRef(null);

//   return (
//     <div className="absolute inset-0 z-10" ref={containerRef}>
//       <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1635373670332-43ea883bb081?q=80&w=2781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="6deg"
//         top="20%"
//         left="25%"
//         className="w-36 md:w-56"
//       />
//       <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="12deg"
//         top="45%"
//         left="60%"
//         className="w-24 md:w-48"
//       />
//       <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="-6deg"
//         top="20%"
//         left="40%"
//         className="w-52 md:w-80"
//       />
//       <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="8deg"
//         top="50%"
//         left="40%"
//         className="w-48 md:w-72"
//       />
//       <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1602212096437-d0af1ce0553e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="18deg"
//         top="20%"
//         left="65%"
//         className="w-40 md:w-64"
//       />
//       <Card
//         containerRef={containerRef}
//         src="https://images.unsplash.com/photo-1622313762347-3c09fe5f2719?q=80&w=2640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//         alt="Example image"
//         rotate="-3deg"
//         top="35%"
//         left="55%"
//         className="w-24 md:w-48"
//       />
//     </div>
//   );
// };

// const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
//   const [zIndex, setZIndex] = useState(0);

//   const updateZIndex = () => {
//     const els = document.querySelectorAll('.drag-elements');

//     let maxZIndex = -Infinity;

//     els.forEach(el => {
//       let zIndex = parseInt(
//         window.getComputedStyle(el).getPropertyValue('z-index')
//       );

//       if (!isNaN(zIndex) && zIndex > maxZIndex) {
//         maxZIndex = zIndex;
//       }
//     });

//     setZIndex(maxZIndex + 1);
//   };

//   return (
//     <motion.img
//       onMouseDown={updateZIndex}
//       style={{
//         top,
//         left,
//         rotate,
//         zIndex,
//       }}
//       className={twMerge(
//         'drag-elements absolute w-48 shadow-2xl bg-neutral-200 rounded-3xl p-1 pb-4',
//         className
//       )}
//       src={src}
//       alt={alt}
//       drag
//       dragConstraints={containerRef}
//       // Uncomment below and remove dragElastic to remove movement after release
//       //   dragMomentum={false}
//       dragElastic={0.65}
//     />
//   );
// };

import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { twMerge } from 'tailwind-merge';

export const DragCards = () => {
  return (
    <section className="relative grid min-h-screen w-full place-content-center overflow-hidden">
      <h2 className="relative z-0 text-[20vw] font-black text-shadow text-cyber-purple md:text-[200px]">
        BLOG<span className="text-cyber-blue">.</span>
      </h2>
      <Cards />
    </section>
  );
};

const Cards = () => {
  const containerRef = useRef(null);

  return (
    <div className="absolute inset-0 z-10" ref={containerRef}>
      <Card
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1635373670332-43ea883bb081?q=80&w=2781&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Example image"
        rotate="6deg"
        top="20%"
        left="25%"
        className="w-36 md:w-56"
      />
      <Card
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1576174464184-fb78fe882bfd?q=80&w=2787&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Example image"
        rotate="12deg"
        top="45%"
        left="60%"
        className="w-24 md:w-48"
      />
      <Card
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1503751071777-d2918b21bbd9?q=80&w=2670&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Example image"
        rotate="-6deg"
        top="20%"
        left="40%"
        className="w-52 md:w-80"
      />
      <Card
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1620428268482-cf1851a36764?q=80&w=2609&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Example image"
        rotate="8deg"
        top="50%"
        left="40%"
        className="w-48 md:w-72"
      />
      <Card
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1602212096437-d0af1ce0553e?q=80&w=2671&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Example image"
        rotate="18deg"
        top="20%"
        left="65%"
        className="w-40 md:w-64"
      />
      <Card
        containerRef={containerRef}
        src="https://images.unsplash.com/photo-1622313762347-3c09fe5f2719?q=80&w=2640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        alt="Example image"
        rotate="-3deg"
        top="35%"
        left="55%"
        className="w-24 md:w-48"
      />
    </div>
  );
};

const Card = ({ containerRef, src, alt, top, left, rotate, className }) => {
  const [zIndex, setZIndex] = useState(0);
  const [scrollOffset, setScrollOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      // Calculate scroll-based transformations; adjust factors for desired movement effect
      const offsetX = window.scrollY * 0.1; // Horizontal shift factor
      const offsetY = window.scrollY * 0.1; // Vertical shift factor

      setScrollOffset({ x: offsetX, y: offsetY });
    };

    // Attach scroll listener
    window.addEventListener('scroll', handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const updateZIndex = () => {
    const els = document.querySelectorAll('.drag-elements');

    let maxZIndex = -Infinity;

    els.forEach(el => {
      let zIndex = parseInt(
        window.getComputedStyle(el).getPropertyValue('z-index')
      );

      if (!isNaN(zIndex) && zIndex > maxZIndex) {
        maxZIndex = zIndex;
      }
    });

    setZIndex(maxZIndex + 1);
  };

  return (
    <motion.img
      onMouseDown={updateZIndex}
      style={{
        top,
        left,
        rotate,
        zIndex,
        x: scrollOffset.x, // Apply scroll-based horizontal offset
        y: scrollOffset.y, // Apply scroll-based vertical offset
      }}
      className={twMerge(
        'drag-elements absolute w-48 shadow-2xl bg-neutral-200 rounded-3xl p-1 pb-4',
        className
      )}
      src={src}
      alt={alt}
      drag
      dragConstraints={containerRef}
      dragElastic={0.65}
    />
  );
};
