import React from "react";

const ImpactAnalysis = ({ target, asteroid, onClose }) => {
  if (!target || !asteroid) return null;

  const isOcean =
    target.region === "Ocean" ||
    target.region === "Arctic" ||
    target.region === "Antarctica";

  const getDevastationLevel = () => {
    const diameter = asteroid.diameter;
    if (diameter < 50)
      return {
        level: "LOCAL",
        color: "#059669",
        border: "#10b981",
        gradient: "linear-gradient(135deg, #047857, #10b981)",
      };
    if (diameter < 1000)
      return {
        level: "REGIONAL",
        color: "#dc2626",
        border: "#f87171",
        gradient: "linear-gradient(135deg, #b91c1c, #f87171)",
      };
    if (diameter < 5000)
      return {
        level: "CONTINENTAL",
        color: "#c2410c",
        border: "#fb923c",
        gradient: "linear-gradient(135deg, #9a3412, #fb923c)",
      };
    return {
      level: "GLOBAL EXTINCTION",
      color: "#7c3aed",
      border: "#a78bfa",
      gradient: "linear-gradient(135deg, #6d28d9, #a78bfa)",
    };
  };

  const getImpactEffects = () => {
    const diameter = asteroid.diameter;
    const velocity = asteroid.velocity;
    const energy = parseFloat(asteroid.energy.replace(/,/g, ""));

    const densityRatio = Math.pow(2.5 / (isOcean ? 1.0 : 2.7), 1 / 3);
    const velocityFactor = Math.pow(velocity / 12, 0.44);
    const craterDiameter = 1.8 * diameter * densityRatio * velocityFactor;

    const fireballRadius = 0.028 * Math.pow(energy, 0.33);
    const thermalRadius = 0.14 * Math.pow(energy, 0.41);
    const airBlastRadius = 0.24 * Math.pow(energy, 0.33);
    const magnitude = 0.67 * Math.log10(energy) + 3.87;

    if (diameter < 50) {
      if (isOcean) {
        return [
          `♒︎ Ocean impact at ${target.region}`,
          `Crater: ${(craterDiameter / 1000).toFixed(
            1
          )} km diameter (mostly underwater)`,
          `Steam explosion creating localized waves up to ${(
            diameter * 0.5
          ).toFixed(0)}m high`,
          `Shockwave affecting marine life within ${(diameter * 2).toFixed(
            0
          )} km`,
          `Magnitude ${magnitude.toFixed(
            1
          )} seismic event detectable on nearby coasts`,
          `Thermal radiation heating water surface up to ${thermalRadius.toFixed(
            1
          )} km away`,
          `No significant tsunami - waves dissipate quickly`,
          `Minimal long-term environmental impact`,
        ];
      } else {
        return [
          `ᨒ Land impact at ${target.region}`,
          `Crater: ${(craterDiameter / 1000).toFixed(2)} km diameter, ${(
            craterDiameter /
            1000 /
            5
          ).toFixed(2)} km deep`,
          `Fireball radius: ${fireballRadius.toFixed(
            1
          )} km - immediate vaporization`,
          `Air blast destroying buildings: ${airBlastRadius.toFixed(
            1
          )} km radius`,
          `Thermal radiation (3rd degree burns): ${thermalRadius.toFixed(
            1
          )} km`,
          `Magnitude ${magnitude.toFixed(1)} earthquake`,
          `Ejecta pattern covering ${((craterDiameter * 3) / 1000).toFixed(
            0
          )} km²`,
          `Local infrastructure collapse, estimated casualties in thousands`,
        ];
      }
    } else if (diameter < 1000) {
      if (isOcean) {
        const tsunamiHeight = Math.min(100, diameter * 0.15);
        const tsunamiRange = Math.sqrt(energy) * 15;
        return [
          `♒︎ Major ocean impact at ${target.region}`,
          `Underwater crater: ${(craterDiameter / 1000).toFixed(
            1
          )} km diameter`,
          `Initial wave height: ${tsunamiHeight.toFixed(
            0
          )}m at point of impact`,
          `Tsunami affecting coastlines up to ${tsunamiRange.toFixed(
            0
          )} km away`,
          `Wave arrival time: ${(tsunamiRange / 800).toFixed(
            1
          )} hours to distant coasts`,
          `Magnitude ${magnitude.toFixed(1)} underwater earthquake`,
          `Massive steam column reaching stratosphere (${(
            diameter * 0.4
          ).toFixed(0)} km high)`,
          `Acid rain from vaporized seawater affecting ${(
            diameter * 10
          ).toFixed(0)} km radius`,
          `Marine ecosystem devastation in impact region`,
          `Global ocean temperature increase: ${(energy / 1000000).toFixed(
            3
          )}°C`,
          `Estimated coastal casualties: millions if densely populated areas affected`,
        ];
      } else {
        return [
          `ᨒ Regional land impact at ${target.region}`,
          `Crater: ${(craterDiameter / 1000).toFixed(1)} km diameter, ${(
            craterDiameter /
            1000 /
            5
          ).toFixed(1)} km deep`,
          `Fireball radius: ${fireballRadius.toFixed(
            1
          )} km - complete vaporization`,
          `Air blast (5 psi): ${airBlastRadius.toFixed(
            0
          )} km - total structural collapse`,
          `Thermal radiation: ${thermalRadius.toFixed(
            0
          )} km radius (3rd degree burns)`,
          `Magnitude ${magnitude.toFixed(1)} earthquake felt across ${
            diameter < 500 ? "region" : "continent"
          }`,
          `Ejecta blanket: molten/fragmented material covering ${(
            (craterDiameter * 4) /
            1000
          ).toFixed(0)} km radius`,
          `Firestorms igniting within ${(thermalRadius * 0.7).toFixed(0)} km`,
          `Atmospheric dust blocking sunlight regionally for weeks`,
          `Temperature drop: ${(1 + energy / 5000).toFixed(1)}°C for ${
            diameter < 500 ? "months" : "1-2 years"
          }`,
          `Agricultural collapse in impact region`,
          `Estimated immediate casualties: tens of millions in populated areas`,
        ];
      }
    } else if (diameter < 5000) {
      if (isOcean) {
        const tsunamiHeight = Math.min(1000, diameter * 0.3);
        return [
          `♒︎ Catastrophic ocean impact at ${target.region}`,
          `Massive crater: ${(craterDiameter / 1000).toFixed(
            0
          )} km diameter underwater`,
          `Mega-tsunami: ${tsunamiHeight.toFixed(
            0
          )}m waves devastating ALL coastlines`,
          `Wave speed: 800 km/h, reaching distant continents within hours`,
          `Entire ocean basin affected - waves rebound for days`,
          `Magnitude ${magnitude.toFixed(
            1
          )} earthquake - one of strongest ever recorded`,
          `Stratospheric steam injection altering global weather patterns`,
          `Ocean acidification from vaporized water affecting marine life globally`,
          `Temporary ocean temperature increase: ${(energy / 500000).toFixed(
            1
          )}°C`,
          `Coastal cities worldwide completely destroyed`,
          `Global climate disruption: ${(5 + energy / 10000).toFixed(
            0
          )}°C cooling for ${diameter < 2000 ? "2-4" : "4-8"} years`,
          `Sunlight reduced by 60-80% from water vapor and debris`,
          `Global food chain collapse, mass starvation`,
          `Estimated global casualties: 1-3 billion people`,
        ];
      } else {
        return [
          `ᨒ Continental extinction event at ${target.region}`,
          `Impact crater: ${(craterDiameter / 1000).toFixed(
            0
          )} km diameter, visible from orbit`,
          `Fireball: ${fireballRadius.toFixed(
            0
          )} km - vaporizes everything to bedrock`,
          `Air blast: ${airBlastRadius.toFixed(
            0
          )} km - flattens all structures`,
          `Magnitude ${magnitude.toFixed(
            1
          )} earthquake - strongest geological event in human history`,
          `Ejecta ejected into space, re-entering globally as molten rain`,
          `Continental firestorms igniting ${
            diameter < 2000 ? "40" : "70"
          }% of nearby forests`,
          `Shock wave circling Earth multiple times`,
          `Dust veil blocking ${
            diameter < 2000 ? "60" : "80"
          }% of sunlight for 3-6 years`,
          `Global temperature drop: ${(10 + energy / 15000).toFixed(
            0
          )}°C (Impact Winter)`,
          `Photosynthesis cessation - plant die-off`,
          `Nitrogen oxides destroying 50%+ of ozone layer`,
          `Acid rain (pH 2-3) across entire hemisphere`,
          `Mass extinction of 60-75% of species`,
          `End of modern civilization - billions of casualties`,
        ];
      }
    } else {
      if (isOcean) {
        return [
          `♒︎ Planetary-scale ocean impact at ${target.region}`,
          `Impact crater: ${(craterDiameter / 1000).toFixed(
            0
          )} km - penetrates ocean floor to mantle`,
          `Mega-tsunamis: 300-2000m waves submerging all low-lying continents`,
          `Ocean water vaporized: ${(energy / 10000).toFixed(
            0
          )} cubic kilometers`,
          `Magnitude ${magnitude.toFixed(
            1
          )} mega-quake - triggers global volcanism`,
          `Shockwave boiling ocean surface across ${(
            fireballRadius * 2
          ).toFixed(0)} km`,
          `Steam explosion ejecting material into space - some escapes Earth's gravity`,
          `Stratospheric water vapor persisting for decades`,
          `Super-heated atmosphere igniting global firestorms`,
          `Ocean chemistry permanently altered - mass extinction of 90%+ marine life`,
          `Sunlight blocked for 8-15 years - total photosynthesis collapse`,
          `Global temperature: initial spike of 50°C, then drop of 20-25°C`,
          `Nitrogen/oxygen cycle disruption - atmospheric composition changes`,
          `Mass extinction of 85-95% of all species`,
          `Human extinction highly probable - only deep shelters might survive`,
          `Geological record shows layer of impact debris worldwide`,
        ];
      } else {
        return [
          `ᨒ Planet-killer impact at ${target.region}`,
          `Crater: ${(craterDiameter / 1000).toFixed(
            0
          )} km diameter - reshapes continental geology`,
          `Mantle exposed - molten rock ejected globally`,
          `Fireball encompassing ${fireballRadius.toFixed(
            0
          )} km - surface temperature 5000°C`,
          `Magnitude ${magnitude.toFixed(1)} - strongest possible earthquake`,
          `Seismic energy liquefying ground across entire continent`,
          `Ejecta achieving escape velocity - debris ring forms around Earth`,
          `Molten ejecta re-entry incinerating entire planetary surface`,
          `Global firestorm consuming 70-90% of all vegetation`,
          `Atmosphere superheated to 300-500°C for hours (sterilizes surface)`,
          `Impact winter: 90% sunlight blocked for 10+ years`,
          `Temperature plunge: 20-30°C below freezing globally`,
          `Photosynthesis impossible for a decade`,
          `Oxygen levels drop - breathing difficult`,
          `Ozone layer completely destroyed - UV radiation lethal`,
          `Mass extinction: 95%+ of all species`,
          `Human extinction virtually certain`,
          `Recovery of biosphere: 10+ million years`,
        ];
      }
    }
  };

  const devastation = getDevastationLevel();
  const effects = getImpactEffects();

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 1000,
        padding: "clamp(8px, 1.5vw, 16px)",
        fontFamily:
          "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        animation: "fadeIn 0.3s ease-in",
      }}
    >
      <div
        className="scrollbar-purple"
        style={{
          backgroundColor: "#0b0b0d",
          borderRadius: "12px",
          border: `2px solid ${devastation.border}`,
          maxWidth: "500px",
          width: "100%",
          maxHeight: "85vh",
          overflowY: "auto",
          boxShadow: `0 0 30px ${devastation.color}90, inset 0 0 20px ${devastation.color}20`,
          animation: "slideUp 0.4s ease-out",
        }}
      >
        <div
          style={{
            padding: "clamp(10px, 2vw, 14px)",
            borderBottom: `1px solid ${devastation.border}40`,
            background: devastation.gradient,
            borderRadius: "10px 10px 0 0",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <div style={{ fontSize: "clamp(18px, 2.5vw, 22px)" }}>
              </div>
              <div>
               
               
               <h2
  className="inter-text"
  style={{
    fontSize: "clamp(16px, 2.2vw, 20px)",
    fontWeight: "700",
    color: "#fff",
    margin: 0,
    textShadow: "0 2px 8px rgba(0,0,0,0.5)",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
  }}
>
  <span>{isOcean ? "♒︎" : "ᨒ"}</span>
  Impact Analysis
</h2>

               
               
               
               

               
               


              <div
              className="inter-text"
              style={{
                marginTop: "4px",
             fontSize: "clamp(10px, 1.2vw, 12px)",
             color: "rgba(255,255,255,0.9)",
              fontWeight: "500",
              gap: "8px",
                 }}
              >
  {asteroid.name} → {target.region} {isOcean ? "(Ocean)" : "(Land)"}
</div>

              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(255,255,255,0.2)",
                color: "#fff",
                fontSize: "clamp(18px, 2.2vw, 20px)",
                cursor: "pointer",
                padding: "0",
                width: "28px",
                height: "28px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "6px",
                transition: "all 0.2s",
                fontWeight: "300",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.2)";
                e.currentTarget.style.transform = "scale(1.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "scale(1)";
              }}
            >
              ×
            </button>
          </div>
        </div>

        <div style={{ padding: "clamp(10px, 2vw, 14px)" }}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "clamp(8px, 1.2vw, 10px)",
              marginBottom: "clamp(10px, 1.5vh, 14px)",
            }}
          >
            <div
              style={{
                backgroundColor: "#141416",
                padding: "clamp(8px, 1.2vw, 10px)",
                borderRadius: "8px",
                border: "1px solid #2a2a2d",
                transition: "all 0.3s",
              }}
            >
              <div
                className="inter-text"
                style={{
                  fontSize: "clamp(9px, 1vw, 10px)",
                  color: "#999",
                  marginBottom: "4px",
                }}
              >
                Diameter
              </div>
              <div
                className="inter-text"
                style={{
                  fontSize: "clamp(13px, 1.8vw, 16px)",
                  fontWeight: "700",
                  color: devastation.border,
                }}
              >
                {asteroid.diameter >= 1000
                  ? `${(asteroid.diameter / 1000).toFixed(1)} km`
                  : `${asteroid.diameter}m`}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#141416",
                padding: "clamp(8px, 1.2vw, 10px)",
                borderRadius: "8px",
                border: "1px solid #2a2a2d",
              }}
            >
              <div
                className="inter-text"
                style={{
                  fontSize: "clamp(9px, 1vw, 10px)",
                  color: "#999",
                  marginBottom: "4px",
                }}
              >
                Velocity
              </div>
              <div
                className="inter-text"
                style={{
                  fontSize: "clamp(13px, 1.8vw, 16px)",
                  fontWeight: "700",
                  color: devastation.border,
                }}
              >
                {asteroid.velocity} km/s
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#141416",
                padding: "clamp(8px, 1.2vw, 10px)",
                borderRadius: "8px",
                border: "1px solid #2a2a2d",
              }}
            >
              <div
                className="inter-text"
                style={{
                  fontSize: "clamp(9px, 1vw, 10px)",
                  color: "#999",
                  marginBottom: "4px",
                }}
              >
                Mass
              </div>
              <div
                className="inter-text"
                style={{
                  fontSize: "clamp(13px, 1.8vw, 16px)",
                  fontWeight: "700",
                  color: devastation.border,
                }}
              >
                {parseFloat(asteroid.mass) >= 1000
                  ? `${(parseFloat(asteroid.mass) / 1000).toFixed(1)}k tons`
                  : `${asteroid.mass} tons`}
              </div>
            </div>
            <div
              style={{
                backgroundColor: "#141416",
                padding: "clamp(8px, 1.2vw, 10px)",
                borderRadius: "8px",
                border: "1px solid #2a2a2d",
              }}
            >
              <div
                className="inter-text"
                style={{
                  fontSize: "clamp(9px, 1vw, 10px)",
                  color: "#999",
                  marginBottom: "4px",
                }}
              >
                Impact Energy
              </div>
              <div
                className="inter-text"
                style={{
                  fontSize: "clamp(13px, 1.8vw, 16px)",
                  fontWeight: "700",
                  color: devastation.border,
                }}
              >
                {asteroid.energy}
              </div>
            </div>
          </div>

          <div
            style={{
              background: `linear-gradient(135deg, ${devastation.color}15, ${devastation.color}05)`,
              border: `2px solid ${devastation.border}`,
              borderRadius: "10px",
              padding: "clamp(10px, 2vw, 14px)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: "100%",
                background: devastation.gradient,
                opacity: 0.05,
                pointerEvents: "none",
              }}
            />

            <h3
              className="inter-text"
              style={{
                fontSize: "clamp(14px, 1.8vw, 16px)",
                fontWeight: "700",
                color: devastation.border,
                margin: "0 0 clamp(10px, 1.5vh, 12px) 0",
                textTransform: "uppercase",
                letterSpacing: "0.8px",
                textShadow: `0 0 15px ${devastation.color}80`,
                position: "relative",
              }}
            >
              ⚠ {devastation.level} DEVASTATION
            </h3>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "clamp(7px, 1.2vh, 9px)",
                position: "relative",
              }}
            >
              {effects.map((effect, index) => (
                <div
                  key={index}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "8px",
                    padding: "clamp(5px, 0.8vh, 7px)",
                    backgroundColor:
                      index % 2 === 0 ? "rgba(0,0,0,0.2)" : "transparent",
                    borderRadius: "6px",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${devastation.color}20`;
                    e.currentTarget.style.transform = "translateX(3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor =
                      index % 2 === 0 ? "rgba(0,0,0,0.2)" : "transparent";
                    e.currentTarget.style.transform = "translateX(0)";
                  }}
                >
                  <span
                    style={{
                      fontSize: "clamp(11px, 1.4vw, 13px)",
                      flexShrink: 0,
                      filter: "grayscale(0%)",
                    }}
                  >
                    {effect.includes("♒︎") || effect.includes("ᨒ")}
                  </span>
                  <span
                    className="inter-text"
                    style={{
                      fontSize: "clamp(10px, 1.2vw, 12px)",
                      color: "#fff",
                      lineHeight: "1.5",
                      fontWeight:
                        effect.includes("extinction") ||
                        effect.includes("civilization") ||
                        effect.includes("casualties")
                          ? "600"
                          : "400",
                    }}
                  >
                    {effect.replace(/^(♒︎|ᨒ)\s/, "")}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(30px);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default ImpactAnalysis;
