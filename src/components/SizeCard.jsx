// src/components/SizeCard.jsx
import React from "react";

function SizeCard({ size }) {
  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div
        className="rounded-full transition-transform hover:scale-110"
        style={{
          width: `clamp(${size.scale}px, ${size.scale / 10}vw, ${size.scale + 20}px)`,
          height: `clamp(${size.scale}px, ${size.scale / 10}vw, ${size.scale + 20}px)`,
          backgroundColor: size.color,
          boxShadow: `0 0 15px ${size.color}80`,
        }}
      />
      <h3 className="text-white text-base sm:text-lg lg:text-xl mt-4 mb-1">
        {size.name}
      </h3>
      <p className="text-white/50 text-xs sm:text-sm lg:text-base font-['Inter']">
        {size.size}
      </p>
      <p className="text-white/50 text-xs lg:text-sm font-['Inter']">
        {size.damage}
      </p>
    </div>
  );
}

export default SizeCard;
