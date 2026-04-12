import { Link } from 'wouter';
import { GlassCard } from '@/components/GlassCard';
import { Music, Settings2, Piano } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col relative">
      <main className="flex-1 max-w-5xl w-full mx-auto p-6 sm:p-12 relative z-10 flex flex-col pt-20">
        <header className="mb-16 border-b border-border pb-12 flex flex-col items-start gap-6">

          <div className="flex items-center gap-5">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 border border-primary/20 shadow-sm">
              <Piano className="w-5 h-5 text-primary" />
            </div>
            <h1 className="text-3xl font-bold tracking-tighter text-foreground">
              Piano Trainer
            </h1>
          </div>

          <p className="text-muted-foreground text-sm md:text-sm max-w-2xl font-medium leading-relaxed">
            Focused, interactive piano mini-games to help you master the keyboard. Select a practice module below to begin your session.
          </p>
        </header>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/practice/key-recognition">
            <GlassCard className="h-full p-6 cursor-pointer group hover:-translate-y-1 hover:shadow-md transition-all duration-300">
              <div className="h-12 w-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:scale-105 transition-transform duration-300">
                <Music size={24} />
              </div>
              <h2 className="text-2xl font-semibold mb-2">Key Recognition</h2>
              <p className="text-muted-foreground text-sm">
                Learn the piano keyboard naturally. Identify the highlighted key within the time limit.
              </p>
            </GlassCard>
          </Link>

          <GlassCard className="h-full p-6 opacity-60 pointer-events-none">
            <div className="h-12 w-12 rounded-xl bg-muted flex items-center justify-center mb-6">
              <Settings2 className="text-muted-foreground" size={24} />
            </div>
            <h2 className="text-2xl font-semibold mb-2">Interval Training</h2>
            <p className="text-muted-foreground text-sm">
              Coming soon. Practice identifying intervals by ear and sight.
            </p>
            <div className="absolute top-4 right-4 bg-muted text-xs px-2 py-1 rounded text-muted-foreground font-medium">
              WIP
            </div>
          </GlassCard>
        </div>
      </main>
    </div>
  );
}
