import { useState, useMemo } from 'react';
import { Hand } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { VisualKeyboard } from '@/components/VisualKeyboard';

const POSITIONS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export default function FingerGuide() {
  const [hand, setHand] = useState<'Left' | 'Right'>('Right');
  const [position, setPosition] = useState('C');

  const { activeKeys, keyLabels } = useMemo(() => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(position);
    
    // A standard 5-finger position typically follows the first 5 notes of a major scale.
    // Major scale formula (semitones): W, W, H, W -> 2, 2, 1, 2
    const offsets = [0, 2, 4, 5, 7];
    
    const getNoteName = (semitonesFromRoot: number) => {
      const gIndex = rootIndex + semitonesFromRoot;
      const octave = 4 + Math.floor(gIndex / 12);
      return `${notes[gIndex % 12]}${octave}`;
    };

    const keys = offsets.map(getNoteName);
    const labels: Record<string, string> = {};

    keys.forEach((note, index) => {
      // Right Hand: 1, 2, 3, 4, 5
      // Left Hand: 5, 4, 3, 2, 1
      const fingerNumber = hand === 'Right' ? index + 1 : 5 - index;
      labels[note] = fingerNumber.toString();
    });

    return { activeKeys: keys, keyLabels: labels };
  }, [hand, position]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-8 flex flex-col relative z-10 pt-16">
        <div className="flex-1 flex flex-col justify-start items-center gap-8 w-full">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <Hand className="text-primary" /> Finger Placement Guide
            </h1>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Select a hand and a starting note to learn standard 5-finger playing positions. 
              Remember: 1 is your Thumb, 5 is your Pinky!
            </p>
          </div>

          <GlassCard className="w-full p-6 sm:p-10 text-center shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 justify-center mb-10 w-full max-w-2xl mx-auto">
              
              {/* Hand Selector */}
              <div className="flex flex-col gap-3 items-start flex-1">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Hand</label>
                <div className="flex bg-muted p-1.5 rounded-xl border border-border/50 w-full justify-center">
                  <button 
                    onClick={() => setHand('Left')}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                      hand === 'Left' 
                        ? 'bg-background shadow-sm text-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                    }`}
                  >
                    Left Hand
                  </button>
                  <button 
                    onClick={() => setHand('Right')}
                    className={`flex-1 py-3 rounded-lg font-bold transition-all ${
                      hand === 'Right' 
                        ? 'bg-background shadow-sm text-foreground' 
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                    }`}
                  >
                    Right Hand
                  </button>
                </div>
              </div>

              {/* Position Selector */}
              <div className="flex flex-col gap-3 items-start flex-1">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Position</label>
                <div className="flex flex-wrap gap-2">
                  {POSITIONS.map(p => (
                    <button
                      key={p}
                      onClick={() => setPosition(p)}
                      className={`w-12 h-12 rounded-xl border-2 font-bold transition-all ${
                        position === p 
                          ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105' 
                          : 'bg-card text-foreground border-border hover:bg-muted hover:border-muted-foreground/30 hover:scale-105'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

            </div>

            <div className="bg-background/50 p-6 md:p-10 rounded-2xl border border-border relative overflow-hidden">
               <h3 className="text-2xl md:text-3xl font-black mb-8 text-center text-foreground tracking-tight">
                 {hand} Hand "{position}" Position
               </h3>
               
               <VisualKeyboard activeKeys={activeKeys} keyLabels={keyLabels} />
               
               <div className="mt-8 pt-6 border-t border-border flex justify-center gap-6 text-sm font-medium text-muted-foreground flex-wrap">
                 <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs">1</div> Thumb</div>
                 <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs">2</div> Index</div>
                 <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs">3</div> Middle</div>
                 <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs">4</div> Ring</div>
                 <div className="flex items-center gap-2"><div className="w-6 h-6 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-xs">5</div> Pinky</div>
               </div>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
