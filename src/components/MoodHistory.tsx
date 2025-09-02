import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, TrendingUp } from 'lucide-react';
import { MoodEntry } from '../types/mood';

interface MoodHistoryProps {
  entries: MoodEntry[];
}

const MoodHistory: React.FC<MoodHistoryProps> = ({ entries }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getEmotionColor = (emotion: string) => {
    const colors: Record<string, string> = {
      joy: 'text-success-600 bg-success-100',
      calm: 'text-primary-600 bg-primary-100',
      excitement: 'text-accent-600 bg-accent-100',
      gratitude: 'text-secondary-600 bg-secondary-100',
      anxiety: 'text-warning-600 bg-warning-100',
      sadness: 'text-neutral-600 bg-neutral-100'
    };
    return colors[emotion] || 'text-neutral-600 bg-neutral-100';
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-neutral-200/50"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-primary-100 rounded-lg">
          <Calendar className="w-5 h-5 text-primary-600" />
        </div>
        <h2 className="text-xl font-semibold text-neutral-800">Recent Entries</h2>
        <div className="flex-1" />
        <TrendingUp className="w-5 h-5 text-neutral-400" />
      </div>
      
      <div className="space-y-4 max-h-80 overflow-y-auto">
        {entries.slice(0, 5).map((entry, index) => (
          <motion.div
            key={entry.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="p-4 bg-neutral-50/50 rounded-xl border border-neutral-200/30 hover:bg-neutral-50 transition-colors duration-200"
          >
            <div className="flex items-start justify-between mb-2">
              <span className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getEmotionColor(entry.emotion)}`}>
                {entry.emotion}
              </span>
              <span className="text-xs text-neutral-500">
                {formatDate(entry.date)}
              </span>
            </div>
            <p className="text-sm text-neutral-700 leading-relaxed">
              {entry.text}
            </p>
            <div className="mt-2 flex items-center space-x-2">
              <div className="w-full bg-neutral-200 rounded-full h-1">
                <div
                  className="h-1 rounded-full bg-gradient-to-r from-primary-400 to-primary-600"
                  style={{ width: `${entry.score * 100}%` }}
                />
              </div>
              <span className="text-xs text-neutral-500 font-medium">
                {Math.round(entry.score * 100)}%
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default MoodHistory;