'use client';

import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const cursorX = useSpring(mouseX, springConfig);
  const cursorY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const moveMouse = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check if the element under the mouse is a link or has a 'group' class
      const target = e.target as HTMLElement;
      setIsHovered(!!target.closest('section') || !!target.closest('button'));
    };

    window.addEventListener('mousemove', moveMouse);
    return () => window.removeEventListener('mousemove', moveMouse);
  }, [mouseX, mouseY]);

  return (
    <motion.div
      className="fixed top-0 left-0 w-6 h-6 bg-white border border-black/10 rounded-full mix-blend-difference pointer-events-none z-[9999] flex items-center justify-center"
      style={{
        translateX: cursorX,
        translateY: cursorY,
        x: '-50%',
        y: '-50%',
      }}
      animate={{
        scale: isHovered ? 2.5 : 1,
      }}
      transition={{ type: "spring", stiffness: 250, damping: 20 }}
    >
      {/* The inner dot becomes a small crosshair or stays a dot */}
      <motion.div 
        animate={{ opacity: isHovered ? 0 : 1 }}
        className="w-1 h-1 bg-black rounded-full" 
      />
      
      {/* Show "VIEW" text when hovered */}
      {isHovered && (
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-[4px] font-bold uppercase tracking-tighter"
        >
          View
        </motion.span>
      )}
    </motion.div>
  );
}