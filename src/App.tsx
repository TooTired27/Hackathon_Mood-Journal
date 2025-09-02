import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import MoodInput from './components/MoodInput';
import MoodResult from './components/MoodResult';
import MoodHistory from './components/MoodHistory';
import MoodChart from './components/MoodChart';
import { MoodEntry } from './types/mood';

function App() {
  const [currentMood, setCurrentMood] = useState<{ emotion: string; score: number } | null>(null);
  const [entries, setEntries] = useState<MoodEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadEntries = async () => {
    try {
      // Mock data for demo - replace with actual API call
      const mockEntries: MoodEntry[] = [
        {
          id: 1,
          text: "Had a great day at work today!",
          emotion: "joy",
          score: 0.89,
          date: new Date().toISOString()
        },
        {
          id: 2,
          text: "Feeling a bit overwhelmed with tasks",
          emotion: "anxiety",
          score: 0.72,
          date: new Date(Date.now() - 86400000).toISOString()
        },
        {
          id: 3,
          text: "Peaceful morning meditation session",
          emotion: "calm",
          score: 0.95,
          date: new Date(Date.now() - 172800000).toISOString()
        }
      ];
      setEntries(mockEntries);
    } catch (error) {
      console.error('Error loading entries:', error);
    }
  };

  const analyzeMood = async (text: string) => {
    setIsLoading(true);
    try {
      // Mock analysis for demo - replace with actual API call
      const emotions = ['joy', 'calm', 'excitement', 'gratitude', 'anxiety', 'sadness'];
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      const randomScore = Math.random() * 0.4 + 0.6; // Score between 0.6-1.0
      
      const result = {
        emotion: randomEmotion,
        score: randomScore
      };
      
      setCurrentMood(result);
      
      // Add to entries
      const newEntry: MoodEntry = {
        id: Date.now(),
        text,
        emotion: result.emotion,
        score: result.score,
        date: new Date().toISOString()
      };
      
      setEntries(prev => [newEntry, ...prev]);
    } catch (error) {
      console.error('Error analyzing mood:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadEntries();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 via-primary-50 to-secondary-50">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Header />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <MoodInput onAnalyze={analyzeMood} isLoading={isLoading} />
          
          <AnimatePresence>
            {currentMood && (
              <MoodResult emotion={currentMood.emotion} score={currentMood.score} />
            )}
          </AnimatePresence>
          
          {entries.length > 0 && (
            <div className="grid lg:grid-cols-2 gap-8">
              <MoodChart entries={entries} />
              <MoodHistory entries={entries} />
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}

export default App;