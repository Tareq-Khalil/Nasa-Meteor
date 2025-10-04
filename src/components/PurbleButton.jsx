import React from "react";
import "../App.css"

export default function PurbleButton({ children, onClick, style, ...props }) {
  return (
    <button
      onClick={onClick}
      {...props}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "15px",
        borderRadius: "12px",
        background: "#5E2AC4",
        boxShadow: "-3px 0 6px 0 #8C58F3 inset, 0 3px 18px 0 #8C58F3 inset",
        color: "white",
        fontSize: "24px",
        fontWeight: "600",
        border: "none",
        cursor: "pointer",
        transition: "transform 0.2s ease-in-out",
        width: "30%",
        height: "67.5px",
        padding: "15px",
        ...style, // ✅ allows overrides from parent
      }}
      className="purple-btn"
    >
      {children}
    </button>
  );
}
