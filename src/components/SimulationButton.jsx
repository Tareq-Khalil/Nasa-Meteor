import React from "react";

const SimulationButtons = () => {
  return (
    <div
      className="absolute bottom-12 left-12 flex flex-col gap-5 z-10"
      style={{
        // Mobile responsive
        bottom: window.innerWidth < 768 ? "30px" : "60px",
        left: window.innerWidth < 768 ? "30px" : "60px",
      }}
    >
       {/* Pick Asteroid */}
      <button
        className="px-10 py-4 rounded-2xl text-white text-xl font-semibold transition-transform duration-300"
        style={{
          background: "linear-gradient(180deg, #6D39D1, #5E2AC4)",
          boxShadow: "0 4px 15px rgba(94, 42, 196, 0.6)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow =
            "0 6px 20px rgba(94, 42, 196, 0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 15px rgba(94, 42, 196, 0.6)";
        }}
      >
        Pick an Asteroid
      </button>

      {/* Create Asteroid */}
      <button
        className="px-10 py-4 rounded-2xl text-white text-xl font-semibold transition-transform duration-300"
        style={{
          background: "linear-gradient(180deg, #6D39D1, #5E2AC4)",
          boxShadow: "0 4px 15px rgba(94, 42, 196, 0.6)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
          e.currentTarget.style.boxShadow =
            "0 6px 20px rgba(94, 42, 196, 0.8)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
          e.currentTarget.style.boxShadow =
            "0 4px 15px rgba(94, 42, 196, 0.6)";
        }}
      >
        Create an Asteroid
      </button>
    </div>
  );
};

export default SimulationButtons;