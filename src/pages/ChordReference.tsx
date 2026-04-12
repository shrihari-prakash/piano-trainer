import { useState, useMemo } from 'react';
import { BookOpen } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { VisualKeyboard } from '@/components/VisualKeyboard';

const ROOTS = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

export default function ChordReference() {
  const [root, setRoot] = useState('C');
  const [quality, setQuality] = useState<'Major' | 'Minor'>('Major');

  const activeKeys = useMemo(() => {
    const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
    const rootIndex = notes.indexOf(root);

    // Major triad: 0, 4, 7 semitones
    // Minor triad: 0, 3, 7 semitones
    const third = quality === 'Major' ? 4 : 3;
    const fifth = 7;

    // Calculate semitone offsets from C4
    const note1Index = rootIndex;
    const note2Index = rootIndex + third;
    const note3Index = rootIndex + fifth;

    const getNoteAtGIndex = (gIndex: number) => {
      const octave = 4 + Math.floor(gIndex / 12);
      const name = notes[gIndex % 12];
      return `${name}${octave}`;
    };

    return [
      getNoteAtGIndex(note1Index),
      getNoteAtGIndex(note2Index),
      getNoteAtGIndex(note3Index)
    ];
  }, [root, quality]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <main className="flex-1 w-full max-w-5xl mx-auto p-4 sm:p-8 flex flex-col relative z-10 pt-16">
        <div className="flex-1 flex flex-col justify-start items-center gap-8 w-full">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4 flex items-center justify-center gap-3">
              <BookOpen className="text-primary" /> Chord Dictionary
            </h1>
            <p className="text-muted-foreground text-sm max-w-lg mx-auto">
              Select a root note and chord quality to visualize the shape mapped onto the piano keys.
            </p>
          </div>

          <GlassCard className="w-full p-6 sm:p-10 text-center shadow-lg">
            <div className="flex flex-col md:flex-row gap-8 justify-center mb-10 w-full max-w-2xl mx-auto">
              {/* Root Selector */}
              <div className="flex flex-col gap-3 items-start flex-1">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Root Note</label>
                <div className="flex flex-wrap gap-2">
                  {ROOTS.map(r => (
                    <button
                      key={r}
                      onClick={() => setRoot(r)}
                      className={`w-12 h-12 rounded-xl border-2 font-bold transition-all ${root === r
                          ? 'bg-primary text-primary-foreground border-primary shadow-md scale-105'
                          : 'bg-card text-foreground border-border hover:bg-muted hover:border-muted-foreground/30 hover:scale-105'
                        }`}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quality Selector */}
              <div className="flex flex-col gap-3 items-start">
                <label className="text-sm font-semibold text-muted-foreground uppercase tracking-wider">Quality</label>
                <div className="flex bg-muted p-1.5 rounded-xl border border-border/50">
                  <button
                    onClick={() => setQuality('Major')}
                    className={`px-8 py-3 rounded-lg font-bold transition-all ${quality === 'Major'
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                      }`}
                  >
                    Major
                  </button>
                  <button
                    onClick={() => setQuality('Minor')}
                    className={`px-8 py-3 rounded-lg font-bold transition-all ${quality === 'Minor'
                        ? 'bg-background shadow-sm text-foreground'
                        : 'text-muted-foreground hover:text-foreground hover:bg-background/50'
                      }`}
                  >
                    Minor
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-background/50 p-6 md:p-10 rounded-2xl border border-border">
              <h3 className="text-2xl md:text-3xl font-black mb-8 text-center text-foreground tracking-tight">
                {root} {quality} Triad
              </h3>
              <VisualKeyboard activeKeys={activeKeys} />
              <div className="mt-6 flex justify-center gap-3">
                {activeKeys.map((k, i) => (
                  <span key={i} className="inline-block px-4 py-1.5 rounded-full bg-primary/10 text-primary font-bold border border-primary/20">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
