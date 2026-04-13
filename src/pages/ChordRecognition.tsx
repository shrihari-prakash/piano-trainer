import { useCallback } from 'react';
import { PracticeFlashcard } from '@/components/PracticeFlashcard';

const ROOTS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const QUALITIES = ['Major', 'Minor'];

export default function ChordRecognition() {
  const generateNext = useCallback((recentHistory: string[]) => {
    let chord = "";
    // Generate until we find one not in the recent history buffer
    do {
      const root = ROOTS[Math.floor(Math.random() * ROOTS.length)];
      const quality = QUALITIES[Math.floor(Math.random() * QUALITIES.length)];
      chord = `${root} ${quality}`;
    } while (recentHistory.includes(chord));
    return chord;
  }, []);

  return (
    <PracticeFlashcard
      title="Chord Recognition"
      description="Identify and play the prompted major or minor triad on your piano before the timer runs out."
      generateNext={generateNext}
      historySize={5}
    />
  );
}
