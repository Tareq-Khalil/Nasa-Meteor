import React, { useState } from "react";
import PurbleButton from "../components/PurbleButton";
import GlassyInput from "./GlassyInput.jsx";

export default function AsteroidPropertiesCard({ onSave }) {
    const [size, setSize] = useState("");
    const [speed, setSpeed] = useState("");

    const handleSave = () => {
        const asteroidData = { size, speed };
        console.log("Asteroid Data:", asteroidData); // for debugging
        if (onSave) onSave(asteroidData); // send data back to parent
    };

    return (
        <div
            style={{
                background: "linear-gradient(109deg, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0.06) 100%)", // glass effect
                border: "1.125px solid rgba(94, 42, 196, 0.47)", // purple border
                boxShadow: "0 0 18.75px -9.375px rgba(140, 88, 243, 0.50)", // glowing shadow
                backdropFilter: "blur(18.75px)",
                WebkitBackdropFilter: "blur(12px)",
                borderRadius: "15px",
                padding: "20px",
                width: "80%",
                margin: "20px auto",
                textAlign: "center",
                color: "white",
            }}
        >
            <h2
                style={{
                    fontSize: "20px",
                    fontWeight: "bold",
                    marginBottom: "15px",
                    textShadow: "0 0 8px #8c58f3",
                }}
            >
                Enter Astroid Properties
            </h2>

            <GlassyInput
                placeholder="Enter size"
                value={size}
                onChange={(e) => setSize(e.target.value)}
            />

            <GlassyInput
                placeholder="Enter speed"
                value={speed}
                onChange={(e) => setSpeed(e.target.value)}
            />

            <PurbleButton onClick={handleSave} style={{
                display: "block",
                margin: "15px auto 0",
                padding: "8px 16px",
                fontSize: "14px",
                borderRadius: "8px",
                width: "40%",
                height: "20%",
            }}>
                Create Astroid
            </PurbleButton>
        </div>
    );
}
