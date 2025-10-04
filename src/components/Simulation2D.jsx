import React, { useEffect, useRef, useState, useMemo } from "react";

// Helper function to generate a static starfield for the canvas
const generateStarfield = (width, height, count = 150) => {
  const stars = [];
  for (let i = 0; i < count; i++) {
    stars.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 2 + 0.5,
      alpha: Math.random() * 0.7 + 0.3,
    });
  }
  return stars;
};

export const Simulation2D = ({
  asteroid,
  deflectionAngle,
  deflectionPower,
  effectiveness,
  onProgress,
}) => {
  const canvasRef = useRef(null);
  const [progress, setProgress] = useState(0);

  // Pre-calculate stars once
  const stars = useMemo(() => {
    if (canvasRef.current) {
        return generateStarfield(canvasRef.current.offsetWidth, canvasRef.current.offsetHeight);
    }
    return [];
  }, [canvasRef.current?.offsetWidth, canvasRef.current?.offsetHeight]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Set canvas size
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    
    // Recalculate stars if size changed (though useMemo above should handle it on first render)
    // In a real app, you might want a resize observer here.
    if (stars.length === 0) {
        // This is a safety net in case initial render size was zero
        const newStars = generateStarfield(canvas.width, canvas.height);
        stars.splice(0, stars.length, ...newStars); // Mutate the array safely
    }

    let animationProgress = 0;
    let animationId;

    const earthX = canvas.width / 2;
    const earthY = canvas.height / 2;
    const earthRadius = 80; // Slightly larger Earth

    // Normalized start position (top right corner of the visible space)
    const startX = canvas.width * 0.9;
    const startY = canvas.height * 0.1;

    const asteroidSize = {
      small: 8,
      medium: 12,
      large: 18,
      massive: 25,
    }[asteroid.size];

    // Calculate deflection amount based on all factors
    const maxDeflectionDistance = canvas.width * 0.2; // Max horizontal deflection possible on screen
    const deflectionFactor = (effectiveness * deflectionAngle * deflectionPower) / (100 * 45 * 1.5); // Normalize to a sensible range
    const screenDeflection = deflectionFactor * maxDeflectionDistance;
    
    // Initial impact point (if deflection=0, it hits center)
    const impactPointX = earthX;
    const impactPointY = earthY;
    
    // Calculate the target trajectory endpoint (deflected point)
    // Deflection is applied mostly in the horizontal plane for visual clarity
    const targetX = impactPointX - screenDeflection; 
    const targetY = impactPointY;

    // The point where the asteroid is considered safe
    const safeZoneRadius = earthRadius + 100;

    // --- DRAW FUNCTION ---
    const draw = (t) => {
      animationProgress = t / 400; // Animation duration of 400 frames (approx 6.6 seconds)
      animationProgress = Math.min(1, animationProgress);
      
      onProgress(animationProgress);
      setProgress(animationProgress);

      // 1. Clear canvas and Draw Starfield Background
      ctx.fillStyle = "#01001A"; // Deep space color
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.fillStyle = "#FFFFFF";
      stars.forEach(star => {
          ctx.globalAlpha = star.alpha;
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size / 2, 0, Math.PI * 2);
          ctx.fill();
      });
      ctx.restore();

      // 2. Draw Earth
      ctx.save();
      
      // Outer Atmosphere Glow
      ctx.shadowColor = "#3a4a75";
      ctx.shadowBlur = 40;
      ctx.fillStyle = "rgba(46, 126, 255, 0.15)";
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius + 30, 0, Math.PI * 2);
      ctx.fill();
      
      // Earth Body
      const earthGradient = ctx.createRadialGradient(
        earthX - 20, earthY - 20, 0,
        earthX, earthY, earthRadius
      );
      earthGradient.addColorStop(0, "#4a90e2"); // Light blue/ocean
      earthGradient.addColorStop(0.6, "#2e6da4"); // Deep blue/ocean
      earthGradient.addColorStop(0.8, "#50c878"); // Green/land
      earthGradient.addColorStop(1, "#1e3a5f"); // Dark edge
      ctx.fillStyle = earthGradient;
      ctx.shadowColor = "transparent"; // Reset shadow for the body
      ctx.shadowBlur = 0;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius, 0, Math.PI * 2);
      ctx.fill();
      
      // Atmospheric Ring
      ctx.strokeStyle = "rgba(74, 158, 255, 0.5)";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(earthX, earthY, earthRadius + 5, 0, Math.PI * 2);
      ctx.stroke();

      // Safe zone ring
      ctx.strokeStyle = "rgba(0, 255, 255, 0.3)";
      ctx.lineWidth = 1.5;
      ctx.setLineDash([10, 5]);
      ctx.beginPath();
      ctx.arc(earthX, earthY, safeZoneRadius, 0, Math.PI * 2);
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();

      // 3. Trajectory Lines
      ctx.save();
      // Planned trajectory (Deflected line)
      ctx.strokeStyle = "rgba(168, 85, 247, 0.6)"; // Purple
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 4]);
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(targetX, targetY);
      ctx.stroke();

      // Original/Impact trajectory (faint red)
      ctx.strokeStyle = "rgba(255, 60, 60, 0.2)"; // Red
      ctx.lineWidth = 2;
      ctx.setLineDash([4, 6]);
      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(impactPointX, impactPointY);
      ctx.stroke();
      
      ctx.setLineDash([]);
      ctx.restore();


      // 4. Asteroid Deflection Beam
      if (animationProgress > 0.1 && animationProgress < 0.8) {
        ctx.save();
        const beamEndX = startX + (targetX - startX) * (animationProgress + 0.1);
        const beamEndY = startY + (targetY - startY) * (animationProgress + 0.1);
        
        const beamGradient = ctx.createLinearGradient(earthX, earthY, beamEndX, beamEndY);
        beamGradient.addColorStop(0, "rgba(168, 85, 247, 0.9)");
        beamGradient.addColorStop(1, "rgba(168, 85, 247, 0.1)");
        
        ctx.strokeStyle = beamGradient;
        ctx.lineWidth = 6;
        
        ctx.shadowColor = "#a855f7";
        ctx.shadowBlur = 15;
        
        ctx.beginPath();
        ctx.moveTo(earthX, earthY);
        ctx.lineTo(beamEndX, beamEndY);
        ctx.stroke();
        ctx.restore();
      }

      // 5. Asteroid Position
      const asteroidX = startX + (targetX - startX) * animationProgress;
      const asteroidY = startY + (targetY - startY) * animationProgress;
      
      ctx.save();
      // Asteroid Body (with shadow for texture)
      const asteroidColor = asteroid.composition === 'metallic' ? '#a0a0a0' : '#8b6f47';
      ctx.fillStyle = asteroidColor;
      
      ctx.beginPath();
      ctx.arc(asteroidX, asteroidY, asteroidSize, 0, Math.PI * 2);
      ctx.fill();
      
      // Cratering effect
      ctx.fillStyle = 'rgba(0,0,0,0.3)';
      ctx.beginPath();
      ctx.arc(asteroidX + asteroidSize/3, asteroidY - asteroidSize/4, asteroidSize / 4, 0, Math.PI * 2);
      ctx.fill();

      // Asteroid Trail/Glow
      ctx.shadowColor = "rgba(255, 100, 100, 0.8)";
      ctx.shadowBlur = 10;
      ctx.strokeStyle = "rgba(255, 100, 100, 0.4)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(asteroidX, asteroidY, asteroidSize + 3, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
      
      // 6. Impact/Pass details
      const distance = Math.sqrt((asteroidX - earthX) ** 2 + (asteroidY - earthY) ** 2);
      
      // Closest approach text
      if (animationProgress > 0.6) {
          const passState = distance < safeZoneRadius ? 'COLLISION COURSE' : 'DEFLECTED';
          const passColor = distance < earthRadius + 20 ? '#FF3333' : '#33FF33';
          
          ctx.fillStyle = passColor;
          ctx.font = "16px 'Space Mono', monospace";
          ctx.fillText(`STATUS: ${passState}`, 20, canvas.height - 70);
          ctx.font = "14px 'Space Mono', monospace";
          ctx.fillText(`Closest Approach: ${Math.round(distance - earthRadius)} px`, 20, canvas.height - 45);
      }


      if (animationProgress < 1) {
        animationId = requestAnimationFrame(draw.bind(null, t + 1));
      }
    };

    animationId = requestAnimationFrame(draw.bind(null, 0));

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [asteroid, deflectionAngle, deflectionPower, effectiveness, onProgress, stars]); // Added 'stars' to dependencies

  const deflectionValue = (effectiveness * deflectionAngle * deflectionPower) / 100;

  return (
    <div className="w-full h-full relative">
      <canvas
        ref={canvasRef}
        className="w-full h-full"
        // Use a slight radial gradient for depth, but the stars are drawn over it
        style={{ background: "#01001A" }} 
      />

      {/* Info overlay (Kept from previous version, slightly cleaner) */}
      <div className="absolute bottom-4 left-4 right-4 text-white text-xs bg-black/50 backdrop-blur p-3 rounded-lg border border-purple-700/50">
        <div className="grid grid-cols-4 gap-4">
          <div>
            <div className="text-gray-400">Progress</div>
            <div className="text-purple-300 font-bold">{(progress * 100).toFixed(1)}%</div>
          </div>
          <div>
            <div className="text-gray-400">Deflection Target</div>
            <div className="text-blue-300 font-bold">{deflectionAngle.toFixed(1)}°</div>
          </div>
          <div>
            <div className="text-gray-400">Power Applied</div>
            <div className="text-green-300 font-bold">{deflectionPower}%</div>
          </div>
          <div>
            <div className="text-gray-400">Predicted Skew</div>
            <div className="text-yellow-300 font-bold">{deflectionValue.toFixed(1)} units</div>
          </div>
        </div>
      </div>
    </div>
  );
};