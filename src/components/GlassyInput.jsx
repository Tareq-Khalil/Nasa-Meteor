import React from "react";

export default function GlassyInput({ value, onChange, placeholder, type = "text" }) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{
        fontFamily: "Kameron",
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "8px",
        border: "none",
        outline: "none",
        background: "black",
        color: "white",
      }}
    />
  );
}
