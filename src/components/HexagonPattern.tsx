import React from 'react';
import { motion } from 'framer-motion';

const HexagonPattern: React.FC = () => {
  const hexagons = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {hexagons.map((i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ 
            opacity: [0.1, 0.3, 0.1],
            scale: [0.8, 1.2, 0.8],
            rotate: [0, 180, 360]
          }}
          transition={{
            duration: 8 + (i * 0.5),
            repeat: Infinity,
            delay: i * 0.3
          }}
          className="absolute w-16 h-16"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
        >
          <svg viewBox="0 0 24 24" className="w-full h-full text-primary-200">
            <polygon
              points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
            />
          </svg>
        </motion.div>
      ))}
    </div>
  );
};

export default HexagonPattern;