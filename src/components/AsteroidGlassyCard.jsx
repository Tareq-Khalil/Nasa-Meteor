import React from "react";
import "../App.css"; // <-- create this file
import "../index.css"; // <-- create this file

export default function AsteroidGlassyCard({
  title,
  size,
  svg1,
  svg2,
  speed,
  onClick,
}) {
  return (
    <div
      onClick={onClick}
      className="astro-card"
      role="button"
      tabIndex={0}
      onKeyPress={(e) => e.key === "Enter" && onClick?.()}
    >
      {/* Title */}
      {title && <h3 className="astro-title">{title}</h3>}

      {/* SVGs grouped together */}
      <div className="astro-svgs">
        {svg1 && <div className="astro-svg1">{svg1}</div>}
        {svg2 && <div className="astro-svg2">{svg2}</div>}
      </div>

      {/* Size */}
      {size && (
        <p className="astro-size">
          {size} <br />
          <span className="astro-estimated">[ Estimated ]</span>
        </p>
      )}

      {/* Speed */}
      {speed && <p className="astro-speed">Speed: {speed}</p>}
    </div>
  );
}
