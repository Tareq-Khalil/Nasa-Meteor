import React, { useRef, useEffect } from "react";
import AsteroidGlassyCard from "./AsteroidGlassyCard";
import { assets } from "../assets/assets";

export default function AsteroidOverlayFrame({ astroids = [], onClose }) {
  const frameRef = useRef(null);

  // close overlay when clicking outside the frame
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (frameRef.current && !frameRef.current.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [onClose]);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(0, 0, 0, 0.6)", // dark backdrop
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 1000,
      }}
    >
      <div
        ref={frameRef}
        style={{
          display: "inline-flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: "21px",
          padding: "17px clamp(20px, 10vw, 151px) 0 clamp(20px, 10vw, 152px)",
          borderRadius: "16px",
          background: "#000",
          boxShadow: "0 -4px 12px 1px #5E2AC4, 0 4px 12px 1px #5E2AC4",
          maxWidth: "1200px",
          width: "90%",
          maxHeight: "90%",
          overflowY: "auto",
        }}
      >
        {/* Title */}
        <h1
          style={{
            color: "#FFF",
            textAlign: "center",
            textShadow: "4px 8px 12px rgba(140, 88, 243, 0.80)",
            fontFamily: "Jaini, cursive",
            fontSize: "clamp(28px, 6vw, 64px)",
            fontWeight: "400",
          }}
        >
          Choose Astroids
        </h1>

        {/* Grid of Astroid cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "20px",
            justifyItems: "center",
            width: "100%",
          }}
        >
          {astroids.map((astroid, idx) => (
            <AsteroidGlassyCard
              key={idx}
              title={astroid.title}
              size={astroid.size}
              svg1={<img src={assets.astroidIcon} alt="Asteroid Icon" />}
              svg2={<img src={assets.measure} alt="Measure Icon" />}
              speed={astroid.speed}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
