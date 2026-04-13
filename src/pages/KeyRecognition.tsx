import { useCallback } from 'react';
import { PracticeFlashcard } from '@/components/PracticeFlashcard';

const KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export default function KeyRecognition() {
  const generateNext = useCallback((recentHistory: string[]) => {
    const available = KEYS.filter(k => !recentHistory.includes(k));
    const candidates = available.length > 0 ? available : KEYS;
    return candidates[Math.floor(Math.random() * candidates.length)];
  }, []);

  return (
    <PracticeFlashcard
      title="Key Recognition"
      description="Sit at your piano. A random key will be prompted on screen, play it! We skip to the next key automatically."
      generateNext={generateNext}
      historySize={3}
    />
  );
}
