import { useEffect } from 'react';
import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import KeyRecognition from "@/pages/KeyRecognition";
import ChordReference from "@/pages/ChordReference";
import FingerGuide from "@/pages/FingerGuide";

import NoSleep from 'nosleep.js';

function useWakeLock() {
  useEffect(() => {
    const noSleep = new NoSleep();

    const enableNoSleep = () => {
      if (!noSleep.isEnabled) {
        // Enable wake lock.
        // It's critical this fires inside a direct user interaction.
        noSleep.enable();
      }
    };

    document.addEventListener('click', enableNoSleep, false);
    document.addEventListener('touchstart', enableNoSleep, { passive: true });

    return () => {
      document.removeEventListener('click', enableNoSleep, false);
      document.removeEventListener('touchstart', enableNoSleep, false);
      if (noSleep.isEnabled) {
        noSleep.disable();
      }
    };
  }, []);
}

function App() {
  useWakeLock();
  
  return (
    <>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/practice/key-recognition" component={KeyRecognition} />
        <Route path="/reference/chords" component={ChordReference} />
        <Route path="/reference/fingering" component={FingerGuide} />
        
        {/* Fallback route */}
        <Route>
          <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950 text-white">
            <h1 className="text-4xl font-bold text-slate-300">404</h1>
            <p className="text-slate-500 mt-2">Page Not Found</p>
          </div>
        </Route>
      </Switch>
    </>
  );
}

export default App;
