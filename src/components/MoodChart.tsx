import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Award } from 'lucide-react';
import { MoodEntry } from '../types/mood';

interface MoodChartProps {
  entries: MoodEntry[];
}

const MoodChart: React.FC<MoodChartProps> = ({ entries }) => {
  const last7Days = entries.slice(0, 7).reverse();
  const maxScore = Math.max(...last7Days.map(entry => entry.score));
  const avgScore = last7Days.reduce((sum, entry) => sum + entry.score, 0) / last7Days.length;

  const getBarHeight = (score: number) => {
    return (score / maxScore) * 100;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-neutral-200/50"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-secondary-100 rounded-lg">
          <BarChart3 className="w-5 h-5 text-secondary-600" />
        </div>
        <h2 className="text-xl font-semibold text-neutral-800">Mood Trends</h2>
        <div className="flex-1" />
        {avgScore >= 0.8 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
            className="p-1 bg-success-100 rounded-lg"
          >
            <Award className="w-4 h-4 text-success-600" />
          </motion.div>
        )}
      </div>
      
      <div className="mb-6">
        <div className="flex items-center justify-between text-sm text-neutral-600 mb-2">
          <span>Average Score</span>
          <span className="font-semibold">{Math.round(avgScore * 100)}%</span>
        </div>
        <div className="w-full bg-neutral-200 rounded-full h-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${avgScore * 100}%` }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="h-2 rounded-full bg-gradient-to-r from-primary-400 to-secondary-500"
          />
        </div>
      </div>
      
      <div className="space-y-4">
        <div className="flex items-end justify-between h-32 space-x-2">
          {last7Days.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ height: 0 }}
              animate={{ height: `${getBarHeight(entry.score)}%` }}
              transition={{ delay: index * 0.1 + 0.4, duration: 0.6 }}
              className="flex-1 bg-gradient-to-t from-primary-400 to-primary-600 rounded-t-lg min-h-2 relative group"
            >
              <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-neutral-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {Math.round(entry.score * 100)}%
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="flex justify-between text-xs text-neutral-500">
          {last7Days.map((entry) => (
            <span key={entry.id} className="text-center">
              {formatDate(entry.date)}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default MoodChart;