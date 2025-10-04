import React, { useEffect, useRef, useState } from "react";

export const Simulation3D = ({
  asteroid,
  deflectionAngle,
  deflectionPower,
  effectiveness,
  onProgress,
}) => {
  const containerRef = useRef(null);
  const [rotation, setRotation] = useState({ x: 20, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [lastPos, setLastPos] = useState({ x: 0, y: 0 });
  const [asteroidPos, setAsteroidPos] = useState({ x: 400, y: -200, z: 300 });
  const [showBeam, setShowBeam] = useState(false);
  const [particles, setParticles] = useState([]);

  // Main asteroid animation
  useEffect(() => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 0.02;

      if (progress >= 1) {
        clearInterval(interval);
        onProgress(1);
        return;
      }

      onProgress(progress);

      const deflection = (effectiveness * deflectionAngle * deflectionPower) / 100;

      const targetX = 0;
      const targetY = 0;
      const targetZ = 0;

      const currentX = 400 * (1 - progress) + (targetX + deflection * 5) * progress;
      const currentY = -200 * (1 - progress) + (targetY - deflection * 3) * progress;
      const currentZ = 300 * (1 - progress) + (targetZ + deflection * 8) * progress;

      setAsteroidPos({ x: currentX, y: currentY, z: currentZ });

      // Beam and particles
      if (progress > 0.2 && progress < 0.8) {
        setShowBeam(true);
        if (Math.random() > 0.7) {
          const newParticle = {
            id: Date.now() + Math.random(),
            x: currentX,
            y: currentY,
            vx: (Math.random() - 0.5) * 10,
            vy: (Math.random() - 0.5) * 10,
          };
          setParticles((prev) => [...prev.slice(-20), newParticle]);
        }
      } else {
        setShowBeam(false);
      }

      // Auto rotate
      setRotation((prev) => ({ ...prev, y: prev.y + 0.5 }));
    }, 50);

    return () => clearInterval(interval);
  }, [effectiveness, deflectionAngle, deflectionPower, onProgress]);

  // Particle animation
  useEffect(() => {
    const interval = setInterval(() => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vx: p.vx * 0.95,
            vy: p.vy * 0.95,
          }))
          .filter((p) => Math.abs(p.vx) > 0.1 || Math.abs(p.vy) > 0.1)
      );
    }, 50);
    return () => clearInterval(interval);
  }, []);

  // Drag controls
  const handleMouseDown = (e) => {
    setIsDragging(true);
    setLastPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const deltaX = e.clientX - lastPos.x;
    const deltaY = e.clientY - lastPos.y;
    setRotation((prev) => ({
      x: Math.max(-90, Math.min(90, prev.x - deltaY * 0.5)),
      y: prev.y + deltaX * 0.5,
    }));
    setLastPos({ x: e.clientX, y: e.clientY });
  };
  const handleMouseUp = () => setIsDragging(false);

  const asteroidSize = {
    small: 20,
    medium: 40,
    large: 70,
    massive: 100,
  }[asteroid.size];

  return (
    <div
      ref={containerRef}
      className="w-full h-full relative overflow-hidden cursor-move select-none"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      style={{
        background: "radial-gradient(ellipse at center, #0a0a1a 0%, #000 100%)",
      }}
    >
      {/* Stars */}
      <div className="absolute inset-0">
        {Array.from({ length: 100 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              opacity: Math.random() * 0.8 + 0.2,
            }}
          />
        ))}
      </div>

      {/* 3D Scene */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{
          perspective: "1000px",
          perspectiveOrigin: "center center",
        }}
      >
        <div
          style={{
            transformStyle: "preserve-3d",
            transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`,
            transition: isDragging ? "none" : "transform 0.3s ease-out",
          }}
        >
          {/* Earth */}
          <div
            className="absolute rounded-full"
            style={{
              width: "150px",
              height: "150px",
              background: "radial-gradient(circle at 30% 30%, #4a9eff, #1e5ba8, #0a2e5c)",
              boxShadow: `
                inset -20px -20px 50px rgba(0,0,0,0.5),
                0 0 50px rgba(74,158,255,0.5),
                0 0 100px rgba(74,158,255,0.3)
              `,
              transform: "translate(-50%, -50%)",
              left: "50%",
              top: "50%",
            }}
          />

          {/* Asteroid */}
          <div
            className="absolute rounded-full"
            style={{
              width: `${asteroidSize}px`,
              height: `${asteroidSize}px`,
              background: "radial-gradient(circle at 40% 40%, #8b6f47, #5c4a3a, #2a1f1a)",
              boxShadow: "inset -10px -10px 30px rgba(0,0,0,0.8), 0 0 20px rgba(255,100,100,0.5)",
              transform: `translate3d(${asteroidPos.x}px, ${asteroidPos.y}px, ${asteroidPos.z}px)`,
              left: "50%",
              top: "50%",
              transition: "transform 0.05s linear",
            }}
          />

          {/* Beam */}
          {showBeam && (
            <div
              className="absolute"
              style={{
                width: "4px",
                height: `${Math.sqrt(
                  asteroidPos.x ** 2 + asteroidPos.y ** 2 + asteroidPos.z ** 2
                )}px`,
                background: "linear-gradient(to bottom, #a855f7, transparent)",
                boxShadow: "0 0 20px #a855f7",
                transform: `translate3d(0,0,0) rotateZ(${
                  (Math.atan2(asteroidPos.y, asteroidPos.x) * 180) / Math.PI
                }deg) rotateY(${
                  (Math.atan2(asteroidPos.z, Math.sqrt(asteroidPos.x ** 2 + asteroidPos.y ** 2)) *
                    180) /
                  Math.PI
                }deg)`,
                left: "50%",
                top: "50%",
                transformOrigin: "top center",
              }}
            />
          )}

          {/* Particles */}
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute rounded-full"
              style={{
                width: "4px",
                height: "4px",
                background: "#a855f7",
                boxShadow: "0 0 10px #a855f7",
                transform: `translate3d(${p.x}px, ${p.y}px, 0)`,
                left: "50%",
                top: "50%",
                opacity: 0.8,
              }}
            />
          ))}
        </div>
      </div>

      {/* Overlay */}
      <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-black/50 backdrop-blur p-3 rounded-lg">
        <div className="flex justify-between items-center">
          <span>🖱️ Drag to rotate • 🔍 Scroll to zoom</span>
          <span className="text-purple-300">3D Simulation Active</span>
        </div>
      </div>
    </div>
  );
};
