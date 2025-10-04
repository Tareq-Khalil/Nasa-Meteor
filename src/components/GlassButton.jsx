import React from "react";
import { Link } from "react-router-dom";

const GlassButton = ({ label, to, onClick }) => {
  const ButtonContent = (
    <span
      className="relative flex-1 min-w-[200px] px-6 py-4 rounded-2xl text-white text-base md:text-lg font-normal 
                 bg-white/10 backdrop-blur-[56px] hover:bg-white/20 
                 hover:scale-105 transition-all duration-300 overflow-hidden
                 flex items-center justify-center"
      style={{
        textShadow: "0 4.5px 9px rgba(140, 88, 243, 0.7)",
        boxShadow: "0px 0px 28px -14px rgba(140, 88, 243, 0.5)",
        fontFamily: "Jaini, sans-serif",
      }}
    >
      {/* Gradient border layer */}
      <span
        className="absolute inset-0 rounded-2xl p-[1px]"
        style={{
          background:
            "linear-gradient(90deg, rgba(94, 42, 196, 0.47) 0%, rgba(255, 255, 255, 0.9)  47%, rgba(255, 255, 255, 0.5) 74%, rgba(140, 88, 243, 0.9) 100%)",
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "xor",
          maskComposite: "exclude",
          zIndex: 1,
        }}
      />
      {/* Button text */}
      <span className="relative z-10 text-white font-normal text-2xl [text-shadow:_0px_5px_9px_rgb(140_88_243_/_0.70)]">
        {label}
      </span>
    </span>
  );


  if (to) {
    return (
      <Link to={to} className="flex-1">
        {ButtonContent}
      </Link>
    );
  }


  return (
    <button onClick={onClick} className="flex-1">
      {ButtonContent}
    </button>
  );
};

export default GlassButton;
