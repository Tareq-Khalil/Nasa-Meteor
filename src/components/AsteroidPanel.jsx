import React, { useState } from "react";
import TargetIcon from "../assets/target.svg";

const AsteroidPanel = ({ onAsteroidSelect, selectedTarget }) => {
  const [activeTab, setActiveTab] = useState("nasa");
  const [diameter, setDiameter] = useState(100);
  const [velocity, setVelocity] = useState(15);

  const asteroids = [
    {
      id: 1,
      name: "99942 Apophis",
      diameter: 370,
      velocity: 12.59,
      energy: "1,200 MT",
      risk: "MEDIUM",
      torino: 0,
      description: "Close approach in 2029",
    },
    {
      id: 2,
      name: "101955 Bennu",
      diameter: 492,
      velocity: 11.18,
      energy: "1,450 MT",
      risk: "MEDIUM",
      torino: 1,
      description: "1/2700 chance impact 2182",
    },
    {
      id: 3,
      name: "162173 Ryugu",
      diameter: 900,
      velocity: 9.77,
      energy: "8,500 MT",
      risk: "LOW",
      torino: 0,
      description: "No known threat",
    },
    {
      id: 4,
      name: "433 Eros",
      diameter: 16840,
      velocity: 10.83,
      energy: "1,500,000 MT",
      risk: "HIGH",
      torino: 1,
      description: "Extinction-level if impact",
    },
    {
      id: 5,
      name: "25143 Itokawa",
      diameter: 330,
      velocity: 11.94,
      energy: "980 MT",
      risk: "LOW",
      torino: 0,
      description: "Safe orbit",
    },
    {
      id: 6,
      name: "4179 Toutatis",
      diameter: 4600,
      velocity: 9.73,
      energy: "85,000 MT",
      risk: "MEDIUM",
      torino: 0,
      description: "Chaotic rotation",
    },
    {
      id: 7,
      name: "1566 Icarus",
      diameter: 1400,
      velocity: 22.87,
      energy: "95,000 MT",
      risk: "HIGH",
      torino: 0,
      description: "High velocity crosser",
    },
    {
      id: 8,
      name: "2062 Aten",
      diameter: 900,
      velocity: 17.45,
      energy: "12,500 MT",
      risk: "MEDIUM",
      torino: 0,
      description: "Earth-crossing orbit",
    },
  ];

  const getRiskColor = (risk) => {
    switch (risk) {
      case "LOW":
        return { bg: "#10b981", border: "#34d399", text: "#d1fae5" };
      case "MEDIUM":
        return { bg: "#f59e0b", border: "#fbbf24", text: "#fef3c7" };
      case "HIGH":
        return { bg: "#ef4444", border: "#f87171", text: "#fee2e2" };
      default:
        return { bg: "#6b7280", border: "#9ca3af", text: "#f3f4f6" };
    }
  };

  const handleAsteroidClick = (asteroid) => {
    if (selectedTarget) {
      onAsteroidSelect({
        name: asteroid.name,
        diameter: asteroid.diameter,
        velocity: asteroid.velocity,
        energy: asteroid.energy,
        risk: asteroid.risk,
        torino: asteroid.torino,
        mass: (
          ((Math.PI * Math.pow(asteroid.diameter / 2, 3) * 4) / 3) *
          2.5
        ).toFixed(2),
      });
    }
  };

  const handleCustomSimulate = () => {
    if (selectedTarget) {
      const mass = ((Math.PI * Math.pow(diameter / 2, 3) * 4) / 3) * 2500;
      const energy = (
        (0.5 * mass * Math.pow(velocity * 1000, 2)) /
        4.184e15
      ).toFixed(0);
      onAsteroidSelect({
        name: "Custom Asteroid",
        diameter: parseInt(diameter),
        velocity: parseFloat(velocity),
        energy: `${energy} MT`,
        risk: diameter < 100 ? "LOW" : diameter < 1000 ? "MEDIUM" : "HIGH",
        torino: 0,
        mass: (mass / 1000).toFixed(2),
      });
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#0b0b0d",
        borderRadius: "16px",
        padding: "clamp(12px, 2vw, 24px)",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        border: "1px solid #5E2AC4",
        overflow: "hidden",
        boxShadow: "0 0 20px rgba(94,42,196,0.15)",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      }}
    >
      <div style={{ marginBottom: "clamp(12px, 2vh, 20px)", flexShrink: 0 }}>
        <h2
          className="inter-text"
          style={{
            fontSize: "clamp(18px, 2.5vw, 24px)",
            fontWeight: "700",
            color: "#A78BFA",
            margin: 0,
          }}
        >
          Impact Simulator
        </h2>
        <p
          className="inter-text"
          style={{
            fontSize: "clamp(14px, 1.2vw, 16px)",
            fontWeight: "bold",
            color: selectedTarget ? "#ef4444" : "#999",
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
            animation: selectedTarget
              ? "blink 1.5s ease-in-out infinite"
              : "none",
          }}
        >
          {selectedTarget ? (
            <>
              <img
                src={TargetIcon}
                alt="target"
                style={{
                  color: "#ef4444",
                  width: "18px",
                  height: "18px",
                  filter:
                    "invert(17%) sepia(96%) saturate(7493%) hue-rotate(0deg) brightness(96%) contrast(107%)",
                }}
              />
              {`Target: ${selectedTarget.region} (${selectedTarget.lat}°, ${selectedTarget.lon}°)`}
            </>
          ) : (
            "Click on Earth to select a region"
          )}
        </p>

        <div
          className="inter-text"
          style={{ display: "flex", gap: "12px", marginTop: "16px" }}
        >
          {["nasa", "custom"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              style={{
                flex: 1,
                padding: "clamp(8px, 1.2vh, 12px) clamp(12px, 1.5vw, 16px)",
                background:
                  activeTab === tab
                    ? "linear-gradient(135deg, #5E2AC4, #7C3AED)"
                    : "#141416",
                border: `1px solid ${activeTab === tab ? "#7C3AED" : "#333"}`,
                borderRadius: "10px",
                color: "#fff",
                cursor: "pointer",
                fontSize: "clamp(11px, 1.2vw, 13px)",
                fontWeight: "600",
                transition: "all 0.3s ease",
                fontFamily: "inherit",
                boxShadow:
                  activeTab === tab ? "0 0 12px rgba(124,58,237,0.5)" : "none",
              }}
            >
              {tab === "nasa" ? "NASA Data" : "Custom"}
            </button>
          ))}
        </div>
      </div>

      <div
        className="scrollbar-purple"
        style={{
          flex: 1,
          overflowY: "auto",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
          minHeight: 0,
          paddingRight: "4px",
        }}
      >
        {activeTab === "nasa" ? (
          asteroids.map((asteroid) => {
            const riskColors = getRiskColor(asteroid.risk);
            return (
              <div
                key={asteroid.id}
                onClick={() => handleAsteroidClick(asteroid)}
                style={{
                  backgroundColor: "#141416",
                  border: "1px solid #2a2a2d",
                  borderRadius: "12px",
                  padding: "clamp(10px, 1.5vh, 14px)",
                  transition: "all 0.3s",
                  cursor: selectedTarget ? "pointer" : "not-allowed",
                  opacity: selectedTarget ? 1 : 0.5,
                  position: "relative",
                }}
                onMouseEnter={(e) => {
                  if (selectedTarget) {
                    e.currentTarget.style.backgroundColor = "#1c1c20";
                    e.currentTarget.style.borderColor = "#5E2AC4";
                    e.currentTarget.style.boxShadow =
                      "0 0 12px rgba(94,42,196,0.4)";
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "#141416";
                  e.currentTarget.style.borderColor = "#2a2a2d";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "8px",
                  }}
                >
                  <h3
                    className="inter-text"
                    style={{
                      fontSize: "clamp(12px, 1.3vw, 14px)",
                      fontWeight: "600",
                      margin: 0,
                      color: "#fff",
                      flex: 1,
                    }}
                  >
                    {asteroid.name}
                  </h3>
                  <span
                    className="inter-text"
                    style={{
                      fontSize: "clamp(9px, 1vw, 10px)",
                      fontWeight: "700",
                      padding: "3px 8px",
                      borderRadius: "6px",
                      backgroundColor: riskColors.bg + "30",
                      border: `1px solid ${riskColors.border}`,
                      color: riskColors.text,
                      marginLeft: "8px",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {asteroid.risk} RISK
                  </span>
                </div>
                <p
                  className="inter-text"
                  style={{
                    fontSize: "clamp(9px, 1vw, 11px)",
                    color: "#888",
                    margin: "0 0 10px 0",
                    fontStyle: "italic",
                  }}
                >
                  {asteroid.description}
                </p>
                <div
                  style={{
                    fontSize: "clamp(10px, 1.1vw, 12px)",
                    color: "#aaa",
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                  }}
                >
                  <div className="inter-text">
                    Diameter:{" "}
                    <span
                      className="inter-text"
                      style={{ color: "#A78BFA", fontWeight: "600" }}
                    >
                      {asteroid.diameter}m
                    </span>
                  </div>
                  <div className="inter-text">
                    Velocity:{" "}
                    <span
                      className="inter-text"
                      style={{ color: "#A78BFA", fontWeight: "600" }}
                    >
                      {asteroid.velocity} km/s
                    </span>
                  </div>
                  <div className="inter-text">
                    Impact Energy:{" "}
                    <span
                      className="inter-text"
                      style={{ color: "#C4B5FD", fontWeight: "600" }}
                    >
                      {asteroid.energy}
                    </span>
                  </div>
                  <div className="inter-text">
                    Torino Scale:{" "}
                    <span
                      className="inter-text"
                      style={{ color: "#C4B5FD", fontWeight: "600" }}
                    >
                      {asteroid.torino}/10
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "clamp(16px, 2.5vh, 24px)",
            }}
          >
            <div>
              <label
                className="inter-text"
                style={{
                  display: "block",
                  fontSize: "clamp(12px, 1.3vw, 14px)",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "12px",
                }}
              >
                Diameter (meters)
              </label>
              <input
                type="range"
                min="10"
                max="20000"
                value={diameter}
                onChange={(e) => setDiameter(e.target.value)}
                style={{
                  width: "100%",
                  height: "6px",
                  borderRadius: "3px",
                  background: `linear-gradient(to right, #7C3AED ${
                    (diameter / 20000) * 100
                  }%, #2a2a2d ${(diameter / 20000) * 100}%)`,
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "8px",
                  fontSize: "clamp(10px, 1.1vw, 12px)",
                  color: "#888",
                }}
              >
                <span className="inter-text">10m</span>
                <span
                  className="inter-text"
                  style={{ color: "#A78BFA", fontWeight: "600" }}
                >
                  {diameter}m
                </span>
                <span className="inter-text">20km</span>
              </div>
            </div>

            <div>
              <label
                className="inter-text"
                style={{
                  display: "block",
                  fontSize: "clamp(12px, 1.3vw, 14px)",
                  fontWeight: "600",
                  color: "#fff",
                  marginBottom: "12px",
                }}
              >
                Velocity (km/s)
              </label>
              <input
                type="range"
                min="5"
                max="70"
                value={velocity}
                onChange={(e) => setVelocity(e.target.value)}
                style={{
                  width: "100%",
                  height: "6px",
                  borderRadius: "3px",
                  background: `linear-gradient(to right, #7C3AED ${
                    ((velocity - 5) / 65) * 100
                  }%, #2a2a2d ${((velocity - 5) / 65) * 100}%)`,
                  outline: "none",
                  appearance: "none",
                  cursor: "pointer",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "8px",
                  fontSize: "clamp(10px, 1.1vw, 12px)",
                  color: "#888",
                }}
              >
                <span className="inter-text">5 km/s</span>
                <span
                  className="inter-text"
                  style={{ color: "#A78BFA", fontWeight: "600" }}
                >
                  {velocity} km/s
                </span>
                <span className="inter-text">70 km/s</span>
              </div>
            </div>

            <button
              className="inter-text"
              onClick={handleCustomSimulate}
              disabled={!selectedTarget}
              style={{
                width: "100%",
                padding: "clamp(10px, 1.5vh, 14px)",
                background: selectedTarget
                  ? "linear-gradient(135deg, #5E2AC4, #7C3AED)"
                  : "#333",
                border: "none",
                borderRadius: "10px",
                color: "#fff",
                fontSize: "clamp(12px, 1.4vw, 15px)",
                fontWeight: "600",
                cursor: selectedTarget ? "pointer" : "not-allowed",
                transition: "all 0.3s ease",
                fontFamily: "inherit",
                boxShadow: selectedTarget
                  ? "0 0 14px rgba(124,58,237,0.5)"
                  : "none",
                opacity: selectedTarget ? 1 : 0.5,
              }}
            >
              Simulate Impact
            </button>
          </div>
        )}
      </div>

      <style>{`
        input[type="range"]::-webkit-slider-thumb {
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #7C3AED;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 6px rgba(124,58,237,0.6);
        }
        input[type="range"]::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          background: #7C3AED;
          cursor: pointer;
          border: 2px solid #fff;
          box-shadow: 0 0 6px rgba(124,58,237,0.6);
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
};

export default AsteroidPanel;
