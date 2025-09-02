export interface MoodEntry {
  id: number;
  text: string;
  emotion: string;
  score: number;
  date: string;
}

export interface EmotionConfig {
  color: string;
  bgColor: string;
  icon: string;
  description: string;
}