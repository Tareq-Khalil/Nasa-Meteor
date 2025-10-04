import React, { useRef, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const AsteroidFall = ({ targetPosition, onComplete, asteroidSize = 0.05 }) => {
  const asteroidRef = useRef();
  const trailRef = useRef();
  const explosionRef = useRef();
  const [phase, setPhase] = useState("falling"); // falling, exploding, done
  const [progress, setProgress] = useState(0);

  // Calculate start position (high above Earth on opposite side)
  const startPosition = new THREE.Vector3(
    -targetPosition.x * 8,
    targetPosition.y * 8 + 5,
    -targetPosition.z * 8
  );

  useFrame((state, delta) => {
    if (phase === "falling") {
      const newProgress = Math.min(progress + delta * 0.4, 1);
      setProgress(newProgress);

      if (asteroidRef.current) {
        // Interpolate position from start to target
        asteroidRef.current.position.lerpVectors(
          startPosition,
          targetPosition,
          newProgress
        );

        // Add rotation for realism
        asteroidRef.current.rotation.x += delta * 5;
        asteroidRef.current.rotation.y += delta * 3;

        // Scale up as it approaches (perspective effect)
        const scale = 0.5 + newProgress * 0.5;
        asteroidRef.current.scale.setScalar(scale);
      }

      // Update trail
      if (trailRef.current) {
        trailRef.current.position.copy(asteroidRef.current.position);
        const trailOpacity = 0.6 * (1 - newProgress * 0.3);
        trailRef.current.material.opacity = trailOpacity;
      }

      // When asteroid reaches target, start explosion
      if (newProgress >= 1) {
        setPhase("exploding");
        setProgress(0);
      }
    } else if (phase === "exploding") {
      const newProgress = Math.min(progress + delta * 2, 1);
      setProgress(newProgress);

      if (explosionRef.current) {
        // Explosion expands
        const explosionScale = newProgress * 0.3;
        explosionRef.current.scale.setScalar(explosionScale);
        
        // Fade out explosion
        explosionRef.current.material.opacity = 1 - newProgress;
      }

      // Hide asteroid during explosion
      if (asteroidRef.current) {
        asteroidRef.current.visible = false;
      }
      if (trailRef.current) {
        trailRef.current.visible = false;
      }

      // Complete animation
      if (newProgress >= 1) {
        setPhase("done");
        setTimeout(() => {
          onComplete();
        }, 200);
      }
    }
  });

  return (
    <group>
      {/* Asteroid */}
      <mesh ref={asteroidRef} position={startPosition}>
        <dodecahedronGeometry args={[asteroidSize, 1]} />
        <meshStandardMaterial
          color="#8B4513"
          roughness={0.9}
          metalness={0.1}
          emissive="#ff4500"
          emissiveIntensity={0.3}
        />
      </mesh>

      {/* Glowing trail */}
      <mesh ref={trailRef} position={startPosition}>
        <sphereGeometry args={[asteroidSize * 1.5, 16, 16]} />
        <meshBasicMaterial
          color="#ff6600"
          transparent
          opacity={0.6}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Explosion effect */}
      <mesh ref={explosionRef} position={targetPosition}>
        <sphereGeometry args={[0.25, 32, 32]} />
        <meshBasicMaterial
          color="#ff3300"
          transparent
          opacity={1}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Explosion flash */}
      {phase === "exploding" && progress < 0.3 && (
        <pointLight
          position={targetPosition}
          intensity={5}
          distance={2}
          color="#ffaa00"
        />
      )}
    </group>
  );
};

export default AsteroidFall;
