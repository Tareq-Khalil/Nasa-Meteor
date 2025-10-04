import React, { useRef, useEffect, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import GlassButton from "../components/GlassButton";

// Starfield Component
const Starfield = ({ count = 5000, groupRef }) => {
  const points = useRef();
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = Math.random() * 25 + 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
    }
    return positions;
  }, [count]);

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.1}
        color="#ffffff"
        sizeAttenuation={true}
        transparent={true}
        opacity={0.8}
        depthWrite={false}
      />
    </points>
  );
};

// Asteroid Component (no individual rotation)
const AsteroidModel = (props) => {
  const { nodes, materials } = useGLTF(`${import.meta.env.BASE_URL}models/asteroid/asteroid.gltf`);

  return (
    <group {...props} dispose={null}>
      <mesh geometry={nodes.Object_4.geometry} material={materials.Default_OBJ} />
      <mesh geometry={nodes.Object_5.geometry} material={materials.Default_OBJ} />
    </group>
  );
};

// Animated Camera with zoom-in effect and mouse interaction
const AnimatedCamera = ({ children }) => {
  const groupRef = useRef();
  const mousePosition = useRef({ x: 0, y: 0 });
  const targetRotation = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosition.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame((state) => {
    const elapsed = state.clock.getElapsedTime();
    
    // Zoom in effect over 3 seconds
    if (elapsed < 3) {
      const progress = elapsed / 3;
      state.camera.position.z = 15 - progress * 7; // From 15 to 8
    } else {
      state.camera.position.z = 8;
    }

    if (groupRef.current) {
      // Base slow rotation
      const baseRotationY = elapsed * 0.05; // Slower base rotation
      const baseRotationX = elapsed * 0.025;

      // Mouse interaction (subtle tilt)
      targetRotation.current.x = mousePosition.current.y * 0.2;
      targetRotation.current.y = mousePosition.current.x * 0.2;

      // Smooth lerp for mouse interaction
      groupRef.current.rotation.x = baseRotationX + targetRotation.current.x;
      groupRef.current.rotation.y = baseRotationY + targetRotation.current.y;
    }
  });

  return <group ref={groupRef}>{children}</group>;
};

// Main Page Component
const ExplorePage = () => {
  const audioRef = useRef(null);

  const buttons = [
    { label: "Defend Earth", to: "/defend-earth" },
    { label: "Asteroid Simulation", to: "/asteroid-simulation" },
    { label: "Facts", to: "/fun-facts" },
  ];

  useEffect(() => {
    const playAudio = () => {
      if (audioRef.current) {
        audioRef.current.play().catch((err) => {
          console.log("Autoplay blocked, waiting for user interaction", err);
        });
      }
    };

    playAudio();
    document.addEventListener("click", playAudio, { once: true });

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, []);

  return (
    <div className="w-screen h-screen relative overflow-hidden bg-black">
      {/* 3D Canvas Background */}
      <div className="absolute inset-0">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[10, 10, 5]} intensity={1} />
          <pointLight position={[-10, -10, -5]} intensity={0.5} />
          
          <AnimatedCamera>
            <Starfield count={5000} />
            <AsteroidModel scale={10} />
          </AnimatedCamera>
        </Canvas>
      </div>

      {/* Background music */}
      <audio ref={audioRef} loop>
        <source src="/music/Sakta.mp3" type="audio/mpeg" />
      </audio>

      {/* Overlay content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-10 px-4 pointer-events-none">
        {/* Title */}
        <h1
          className="text-white text-5xl md:text-7xl lg:text-8xl font-jaini text-center animate-fade-in"
          style={{ textShadow: "4px 8px 24px #8C58F3" }}
        >
          Meteor Madness
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 w-full max-w-4xl pointer-events-auto">
          {buttons.map((btn, idx) => (
            <GlassButton key={idx} label={btn.label} to={btn.to} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ExplorePage;