import React from 'react';
import { motion } from 'framer-motion';
import { Award, Flower, Sparkles, Heart } from 'lucide-react';

interface MoodResultProps {
  emotion: string;
  score: number;
}

const emotionConfig: Record<string, { color: string; bgColor: string; icon: React.ReactNode; description: string }> = {
  joy: {
    color: 'text-success-600',
    bgColor: 'bg-success-100',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'Radiating positive energy'
  },
  calm: {
    color: 'text-primary-600',
    bgColor: 'bg-primary-100',
    icon: <Flower className="w-6 h-6" />,
    description: 'Peaceful and centered'
  },
  excitement: {
    color: 'text-accent-600',
    bgColor: 'bg-accent-100',
    icon: <Award className="w-6 h-6" />,
    description: 'Full of enthusiasm'
  },
  gratitude: {
    color: 'text-secondary-600',
    bgColor: 'bg-secondary-100',
    icon: <Heart className="w-6 h-6" />,
    description: 'Appreciating life\'s gifts'
  },
  anxiety: {
    color: 'text-warning-600',
    bgColor: 'bg-warning-100',
    icon: <Sparkles className="w-6 h-6" />,
    description: 'Feeling unsettled'
  },
  sadness: {
    color: 'text-neutral-600',
    bgColor: 'bg-neutral-100',
    icon: <Flower className="w-6 h-6" />,
    description: 'Processing difficult emotions'
  }
};

const MoodResult: React.FC<MoodResultProps> = ({ emotion, score }) => {
  const config = emotionConfig[emotion] || emotionConfig.calm;
  const percentage = Math.round(score * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -20, scale: 0.9 }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-neutral-200/50"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className={`p-3 rounded-xl ${config.bgColor}`}
          >
            <div className={config.color}>
              {config.icon}
            </div>
          </motion.div>
          <div>
            <h3 className="text-2xl font-semibold capitalize text-neutral-800">
              {emotion}
            </h3>
            <p className="text-neutral-600 text-sm">
              {config.description}
            </p>
          </div>
        </div>
        
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.4, type: "spring", stiffness: 200 }}
          className="text-right"
        >
          <div className="text-3xl font-bold text-neutral-800">
            {percentage}%
          </div>
          <div className="text-sm text-neutral-500">
            confidence
          </div>
        </motion.div>
      </div>
      
      <div className="relative">
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${percentage}%` }}
            transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
            className={`h-2 rounded-full bg-gradient-to-r ${
              percentage >= 80 ? 'from-success-400 to-success-600' :
              percentage >= 60 ? 'from-primary-400 to-primary-600' :
              'from-warning-400 to-warning-600'
            }`}
          />
        </div>
      </div>
    </motion.div>
  );
};

export default MoodResult;