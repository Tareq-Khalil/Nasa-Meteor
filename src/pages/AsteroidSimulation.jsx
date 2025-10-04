import React, { Suspense, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import Earth from "../components/Earth";
import Starfield from "../components/Starfield";
import AsteroidPanel from "../components/AsteroidPanel";
import ImpactAnalysis from "../components/ImpactAnalysis";
import AsteroidFall from "../components/AsteroidFall";

const AsteroidSimulation = () => {
  const [selectedTarget, setSelectedTarget] = useState(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const [showFalling, setShowFalling] = useState(false);
  const [showAnalysis, setShowAnalysis] = useState(false);

  // explosion sound
  const explosionSoundRef = useRef(null);

  // asteroid scaling
  const getAsteroidSize = (diameter) => {
    if (!diameter) return 0.05;
    if (diameter < 50) return 0.02;
    if (diameter < 500) return 0.05;
    if (diameter < 2000) return 0.08;
    if (diameter < 5000) return 0.12;
    return 0.18;
  };

  const handleTargetSelect = (target) => {
    setSelectedTarget(target);
    setSelectedAsteroid(null);
    setShowFalling(false);
    setShowAnalysis(false);
  };

  const handleAsteroidSelect = (asteroid) => {
    setSelectedAsteroid(asteroid);
    setShowFalling(true);
    setShowAnalysis(false);
  };

  const handleFallComplete = () => {
    if (explosionSoundRef.current) {
      explosionSoundRef.current.currentTime = 0;
      explosionSoundRef.current.playbackRate = 1.25;
      explosionSoundRef.current.play().catch(() => {});
    }
    setShowFalling(false);
    setShowAnalysis(true);
  };

  return (
    <div
      style={{
        width: "100vw",
        height: "88vh",
        display: "flex",
        flexDirection: "row",
        background:
          "linear-gradient(135deg, #0a0a0a 0%, #1a0a2e 50%, #0f0f0f 100%)",
        padding: "clamp(8px, 1.5vw, 20px)",
        gap: "clamp(8px, 1.5vw, 20px)",
        boxSizing: "border-box",
        overflow: "hidden",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      {/* Explosion sound */}
      <audio ref={explosionSoundRef}>
        <source src="/Nasa-Meteor-Madness/explosion.mp3" type="audio/mpeg" />
      </audio>

      {/* Left Side */}
      <div
        style={{
          flex: "1 1 65%",
          position: "relative",
          minWidth: 0,
          minHeight: 0,
          borderRadius: "16px",
          overflow: "hidden",
          backgroundColor: "#000",
          border: "1px solid #5E2AC4",
          boxShadow: "0 8px 32px rgba(94, 42, 196, 0.3)",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          style={{
            background: "transparent",
            display: "block",
            width: "100%",
            height: "100%",
          }}
        >
          <ambientLight intensity={0.4} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-5, -5, -5]} intensity={0.3} />
          <pointLight position={[0, 0, 10]} intensity={0.5} />

          <Suspense fallback={null}>
            <Starfield count={5000} />

            <Earth
              scale={1}
              onTargetSelect={handleTargetSelect}
              selectedTarget={selectedTarget}
            />

            {showFalling && selectedTarget && selectedAsteroid && (
              <AsteroidFall
                targetPosition={selectedTarget.position}
                spawnFromTarget={true} // 👈 tell asteroid to spawn from direction of target
                onComplete={handleFallComplete}
                asteroidSize={getAsteroidSize(selectedAsteroid.diameter)}
              />
            )}
          </Suspense>
          <OrbitControls
            enableZoom={true}
            enablePan={false}
            minDistance={1.5}
            maxDistance={50}
            autoRotate={true}
            autoRotateSpeed={0.1}
            rotateSpeed={0.5}
          />
        </Canvas>
      </div>

      {/* Right Side */}
      <div
        style={{
          flex: "0 0 clamp(280px, 35%, 500px)",
          minWidth: "320px",
          maxWidth: "420px",
          minHeight: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <AsteroidPanel
          onAsteroidSelect={handleAsteroidSelect}
          selectedTarget={selectedTarget}
        />
      </div>

      {showAnalysis && (
        <ImpactAnalysis
          target={selectedTarget}
          asteroid={selectedAsteroid}
          onClose={() => setShowAnalysis(false)}
        />
      )}
    </div>
  );
};

export default AsteroidSimulation;
