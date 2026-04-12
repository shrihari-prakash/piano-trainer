import { Route, Switch } from "wouter";
import Home from "@/pages/Home";
import KeyRecognition from "@/pages/KeyRecognition";
import ChordReference from "@/pages/ChordReference";
import FingerGuide from "@/pages/FingerGuide";

function App() {
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
