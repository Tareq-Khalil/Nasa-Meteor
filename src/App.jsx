import React, { useRef } from "react";
import { HashRouter as Router, Routes, Route, Outlet } from "react-router-dom";

import ExplorePage from "./pages/ExplorePage";
import Navbar from "./components/Navbar";
import DefendEarth from "./pages/DefendEarth";
import AsteroidSimulation from "./pages/AsteroidSimulation";
import FunFacts from "./pages/FunFacts";
import AboutChallenge from "./pages/AboutChallenge";

// Layout for pages with navbar
function Layout() {
  return (
        // <div className="min-h-screen bg-black text-white">
        // <div className="min-h-screen flex flex-col bg-black text-white">
    <div className="h-screen flex flex-col bg-black text-white">
      <Navbar />
       <div className="flex-1 overflow-y-auto"></div>
      <Outlet />
    </div>
  );
}

function App() {
  const bgAudioRef = useRef(null);
  const clickAudioRef = useRef(null);
  const hasStartedBg = useRef(false); // track if music started

  const handleInteraction = () => {
    // Start background music on first user interaction
    if (bgAudioRef.current && !hasStartedBg.current) {
      bgAudioRef.current.volume = 0.3;
      bgAudioRef.current.loop = true;
      bgAudioRef.current.play().catch(() => {
        console.log("Failed to play background music");
      });
      hasStartedBg.current = true;
    }

    // Play click sound
    if (clickAudioRef.current) {
      clickAudioRef.current.volume = 0.6;
      clickAudioRef.current.currentTime = 0;
      clickAudioRef.current.playbackRate = 1.75;
      clickAudioRef.current.play().catch(() => {});
    }
  };

  return (
    <Router>
      {/* Background music */}
      <audio ref={bgAudioRef}>
        <source src="/Nasa-Meteor-Madness/music/Sakta.mp3" type="audio/mpeg" />
      </audio>

      {/* Click sound */}
      <audio ref={clickAudioRef}>
        <source src="/Nasa-Meteor-Madness/click.mp3" type="audio/mpeg" />
      </audio>

      {/* Global listener for any interaction */}
      <div onClick={handleInteraction} onKeyDown={handleInteraction} onTouchStart={handleInteraction}>
        <Routes>
          <Route path="/" element={<ExplorePage />} />
          <Route element={<Layout />}>
            <Route path="defend-earth" element={<DefendEarth />} />
            <Route path="asteroid-simulation" element={<AsteroidSimulation />} />
            <Route path="fun-facts" element={<FunFacts />} />
            <Route path="about-challenge" element={<AboutChallenge />} />
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
