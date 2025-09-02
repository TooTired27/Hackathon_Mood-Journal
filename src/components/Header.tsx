import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Hexagon } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="text-center mb-12"
    >
      <div className="flex items-center justify-center mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="mr-3"
        >
          <Hexagon className="w-8 h-8 text-primary-600" />
        </motion.div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary-600 to-secondary-600 bg-clip-text text-transparent">
          Mood Tracker
        </h1>
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="ml-3"
        >
          <Sparkles className="w-6 h-6 text-accent-500" />
        </motion.div>
      </div>
      <p className="text-neutral-600 text-lg font-light max-w-2xl mx-auto leading-relaxed">
        Track your emotional journey with precision and insight. 
        Discover patterns, celebrate growth, and nurture your wellbeing.
      </p>
    </motion.header>
  );
};

export default Header;