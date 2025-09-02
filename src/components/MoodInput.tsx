import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Loader2 } from 'lucide-react';

interface MoodInputProps {
  onAnalyze: (text: string) => void;
  isLoading: boolean;
}

const MoodInput: React.FC<MoodInputProps> = ({ onAnalyze, isLoading }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      onAnalyze(text.trim());
      setText('');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-neutral-200/50"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="mood-text" className="block text-sm font-medium text-neutral-700 mb-3">
            How are you feeling today?
          </label>
          <div className="relative">
            <textarea
              id="mood-text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Share your thoughts, feelings, or experiences..."
              className="w-full h-32 px-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none transition-all duration-200 placeholder-neutral-400"
              disabled={isLoading}
            />
            <div className="absolute bottom-3 right-3 flex items-center space-x-2">
              <span className="text-xs text-neutral-400">
                {text.length}/500
              </span>
            </div>
          </div>
        </div>
        
        <motion.button
          type="submit"
          disabled={!text.trim() || isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-primary-600 to-primary-700 text-white py-3 px-6 rounded-xl font-medium flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-xl"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>Analyzing...</span>
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              <span>Analyze Mood</span>
            </>
          )}
        </motion.button>
      </form>
    </motion.div>
  );
};

export default MoodInput;