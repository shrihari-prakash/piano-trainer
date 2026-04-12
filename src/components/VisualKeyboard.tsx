import { cn } from '@/lib/utils';

const KEYS = [
  { note: 'C4', keyClass: 'white' },
  { note: 'C#4', keyClass: 'black' },
  { note: 'D4', keyClass: 'white' },
  { note: 'D#4', keyClass: 'black' },
  { note: 'E4', keyClass: 'white' },
  { note: 'F4', keyClass: 'white' },
  { note: 'F#4', keyClass: 'black' },
  { note: 'G4', keyClass: 'white' },
  { note: 'G#4', keyClass: 'black' },
  { note: 'A4', keyClass: 'white' },
  { note: 'A#4', keyClass: 'black' },
  { note: 'B4', keyClass: 'white' },
  { note: 'C5', keyClass: 'white' },
  { note: 'C#5', keyClass: 'black' },
  { note: 'D5', keyClass: 'white' },
  { note: 'D#5', keyClass: 'black' },
  { note: 'E5', keyClass: 'white' },
  { note: 'F5', keyClass: 'white' },
  { note: 'F#5', keyClass: 'black' },
  { note: 'G5', keyClass: 'white' },
  { note: 'G#5', keyClass: 'black' },
  { note: 'A5', keyClass: 'white' },
  { note: 'A#5', keyClass: 'black' },
  { note: 'B5', keyClass: 'white' },
];

export function VisualKeyboard({ 
  activeKeys = [],
  keyLabels = {},
}: { 
  activeKeys?: string[],
  keyLabels?: Record<string, string>
}) {
  // We have 14 white keys spanning 100% width
  const WHITE_KEYS_COUNT = 14;

  return (
    <div className="relative w-full max-w-4xl mx-auto flex select-none overflow-x-auto pb-4">
      <div className="flex relative h-48 md:h-64 min-w-[640px] w-full border-x border-t border-border rounded-t-lg bg-background">
        {KEYS.map((k, i) => {
          const isActive = activeKeys.includes(k.note);
          const label = keyLabels[k.note];
          
          if (k.keyClass === 'white') {
            return (
              <div 
                key={k.note} 
                className={cn(
                  "flex-1 border-r border-b border-border rounded-b-md relative flex flex-col justify-end pb-4 items-center transition-colors duration-300",
                  isActive ? "bg-primary text-primary-foreground shadow-[inset_0_-4px_0_rgba(0,0,0,0.2)]" : "bg-card text-muted-foreground hover:bg-muted"
                )}
              >
                {label && (
                  <div className="absolute top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-foreground text-background flex items-center justify-center font-bold text-sm shadow-md border-2 border-background z-20">
                    {label}
                  </div>
                )}
                <span className="font-medium text-xs md:text-sm">{k.note}</span>
              </div>
            );
          } else {
            // Black key
            // Calculate absolute position based on preceding white keys
            const precedingWhiteKeys = KEYS.slice(0, i).filter(key => key.keyClass === 'white').length;
            const leftPosition = (precedingWhiteKeys / WHITE_KEYS_COUNT) * 100;
            
            return (
              <div 
                key={k.note} 
                className={cn(
                  "absolute h-3/5 w-[4.5%] -ml-[2.25%] z-10 rounded-b-lg flex justify-center items-end pb-2 transition-colors duration-300 shadow-md",
                  isActive ? "bg-primary text-primary-foreground" : "bg-foreground text-background"
                )}
                style={{ left: `${leftPosition}%` }}
              >
                 {label && (
                  <div className="absolute top-10 w-6 h-6 rounded-full bg-background text-foreground flex items-center justify-center font-bold text-xs shadow-md border border-foreground z-20">
                    {label}
                  </div>
                )}
                 <span className="text-[10px] md:text-xs font-bold md:rotate-0 translate-y-1">{k.note}</span>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
}
