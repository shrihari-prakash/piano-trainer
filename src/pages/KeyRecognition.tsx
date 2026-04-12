import { useState, useEffect, useRef } from 'react';
import { GlassCard } from '@/components/GlassCard';
import { ArrowLeft, Clock, Play, StopCircle } from 'lucide-react';
import { Link } from 'wouter';
import { audioManager } from '@/lib/audio';

const KEYS = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

export default function KeyRecognition() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [targetKey, setTargetKey] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState(10);
  const [intervalLimit, setIntervalLimit] = useState(10);

  const timerRef = useRef<number | ReturnType<typeof setInterval> | null>(null);

  const pickRandomKey = () => {
    const available = targetKey ? KEYS.filter(k => k !== targetKey) : KEYS;
    return available[Math.floor(Math.random() * available.length)];
  };

  const startGame = () => {
    audioManager.init();
    setIsPlaying(true);
    nextRound();
  };

  const stopGame = () => {
    setIsPlaying(false);
    setTargetKey(null);
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const nextRound = () => {
    const next = pickRandomKey();
    setTargetKey(next);
    setTimeLeft(intervalLimit);

    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Timer finished, show next key
          clearInterval(timerRef.current as number);
          audioManager.playBuzzer();
          setTimeout(nextRound, 0);
          return 0;
        }

        const nextTime = prev - 1;
        if (nextTime <= 5 && nextTime > 0) {
          audioManager.playTick();
        }

        return nextTime;
      });
    }, 1000);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space') {
        const target = e.target as HTMLElement;
        if (target.tagName !== 'INPUT' && target.tagName !== 'TEXTAREA') {
          e.preventDefault();
          if (isPlaying) {
            stopGame();
          } else {
            startGame();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, intervalLimit, targetKey]);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
      <main className="flex-1 w-full max-w-4xl mx-auto p-4 sm:p-8 flex flex-col relative z-10 pt-10">
        <header className="flex items-center justify-between mb-8">
          <Link href="/">
            <button className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors bg-secondary px-4 py-2 rounded-full border border-border hover:bg-secondary/80 cursor-pointer">
              <ArrowLeft size={18} />
              <span className="text-sm font-medium">Back to Menu</span>
            </button>
          </Link>
        </header>

        <div className="flex-1 flex flex-col justify-center items-center gap-12">

          <GlassCard className="w-full max-w-md p-8 text-center transition-all duration-300 shadow-lg">
            {!isPlaying ? (
              <div>
                <h1 className="text-3xl font-bold mb-4">Practice Mode</h1>
                <p className="text-muted-foreground mb-8 text-sm">
                  Sit at your piano. A random key will be prompted on screen, play it! We skip to the next key automatically.
                </p>

                <div className="mb-8 p-4 rounded-xl border border-border">
                  <label className="flex items-center justify-between text-sm font-medium mb-2">
                    <span className="flex items-center gap-2 text-muted-foreground"><Clock size={16} /> Interval Limit</span>
                    <span className="font-mono bg-muted px-2 py-0.5 rounded border border-border">{intervalLimit}s</span>
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="15"
                    value={intervalLimit}
                    onChange={(e) => setIntervalLimit(Number(e.target.value))}
                    className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
                  />
                </div>

                <button
                  onClick={startGame}
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Play size={20} fill="currentColor" />
                  Start Practice
                </button>
              </div>
            ) : (
              <div className="py-6">
                {/* Progress Bar Indicator */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary">
                  <div
                    className={`h-full transition-[width] duration-1000 ease-in-out ${timeLeft <= 3 ? 'bg-destructive' : 'bg-primary'}`}
                    style={{ width: `${(timeLeft / intervalLimit) * 100}%` }}
                  />
                </div>

                <div className="flex justify-between items-center mb-10 px-4 pt-4 border-b border-border pb-8">
                  <div className={`flex items-center gap-3 font-mono text-4xl font-bold tracking-tight ${timeLeft <= 3 ? 'text-destructive animate-pulse' : 'text-foreground'}`}>
                    <Clock size={36} className={`${timeLeft <= 3 ? 'text-destructive' : 'text-muted-foreground'}`} />
                    <span>00:{timeLeft.toString().padStart(2, '0')}</span>
                  </div>
                  <button onClick={stopGame} className="text-destructive hover:text-destructive/90 p-3 bg-destructive/10 hover:bg-destructive/20 rounded-xl transition-all cursor-pointer">
                    <StopCircle size={28} />
                  </button>
                </div>

                <div className="relative">
                  <div key={targetKey} className="text-[10rem] pb-8 leading-none font-black tracking-tighter text-foreground animate-in zoom-in-95 duration-200">
                    {targetKey}
                  </div>
                </div>
              </div>
            )}
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
