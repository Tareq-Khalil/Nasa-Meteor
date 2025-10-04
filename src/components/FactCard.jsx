import React, { useState } from "react";
import { motion } from "framer-motion";

function FactCard({ fact, index, onOpen }) {
  const [isFlipped, setIsFlipped] = useState(false);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Extinction":
        return "#8B0000";
      case "Regional":
        return "#FF3333";
      case "City":
        return "#BD7716";
      case "Close Call":
        return "#888A3F";
      case "Rare":
        return "#9370DB";
      case "High Energy":
        return "#FF6B6B";
      default:
        return "#4CAF50";
    }
  };

  return (
    <motion.div
      className="relative h-[420px] cursor-pointer perspective-1000"
      onHoverStart={() => setIsFlipped(true)}
      onHoverEnd={() => setIsFlipped(false)}
      onTouchStart={() => setIsFlipped((prev) => !prev)}
      onClick={() => onOpen(index)} // ✅ triggers modal correctly
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
    >
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* ---------- Front ---------- */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-xl overflow-hidden"
          style={{
            backfaceVisibility: "hidden",
            background: "linear-gradient(135deg, #1a1a1a, #2d1b4e)",
            border: "2px solid #8c58f3",
            boxShadow: "0 0 30px rgba(140, 88, 243, 0.3)",
          }}
        >
          {fact.image && (
            <div className="relative h-[55%] overflow-hidden">
              <img
                src={fact.image}
                alt={fact.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div
                className="absolute top-4 right-4 px-3 py-1 rounded-full font-bold text-white text-xs backdrop-blur-sm"
                style={{ backgroundColor: getSeverityColor(fact.severity) }}
              >
                {fact.severity}
              </div>
            </div>
          )}

          <div className="p-6 h-[45%] flex flex-col justify-between">
            <div>
              <h3 className="text-white font-semibold text-xl mb-3 line-clamp-2">
                {fact.title}
              </h3>
              <p className="text-gray-300 font-['Inter'] text-xs line-clamp-3">
                {fact.fact}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="text-[#8c58f3] text-sm font-bold">
                Fact #{index + 1}
              </div>
              {/* <div className="w-10 h-10 bg-gradient-to-br from-[#8c58f3] to-[#a566ff] rounded-full flex items-center justify-center shadow-lg shadow-[#8c58f3]/50">
                <span className="text-xl">💫</span>
              </div> */}
            </div>
          </div>
        </motion.div>

        {/* ---------- Back ---------- */}
        <motion.div
          className="absolute inset-0 backface-hidden rounded-xl p-6 flex flex-col justify-between"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
            background: "linear-gradient(135deg, #2d1b4e, #1a1a1a)",
            border: "2px solid #a566ff",
            boxShadow: "0 0 40px rgba(165, 102, 255, 0.5)",
          }}
        >
          <div className="space-y-3 overflow-y-auto pr-2 text-left">
            <h3 className="text-2xl font-bold  mb-4 text-center">
              {fact.title}
            </h3>

            {fact.details?.date && (
              <div>
                <span className="text-[#8c58f3] text-sm  font-bold font-['Inter']">
                  Date:{" "}
                </span>
                <span className="text-gray-300 text-sm font-['Inter']">
                  {fact.details.date}
                </span>
              </div>
            )}
            {fact.details?.location && (
              <div>
                <span className="text-[#8c58f3] text-sm  font-bold font-['Inter']">
                  Location:{" "}
                </span>
                <span className="text-gray-300 text-sm font-['Inter']">
                  {fact.details.location}
                </span>
              </div>
            )}
            {fact.details?.size && (
              <div>
                <span className="text-[#8c58f3] text-sm  font-bold font-['Inter']">
                  Size:{" "}
                </span>
                <span className="text-gray-300 text-sm font-['Inter']">
                  {fact.details.size}
                </span>
              </div>
            )}
            {fact.details?.energy && (
              <div>
                <span className="text-[#8c58f3] text-sm  font-bold font-['Inter']">
                  Energy:{" "}
                </span>
                <span className="text-gray-300 text-sm font-['Inter']">
                  {fact.details.energy}
                </span>
              </div>
            )}
            <div className="mt-4 pt-4 border-t border-[#8c58f3]/30 ">
              <p className="text-[#a566ff] text-xs font-['Inter']">
                Click to explore more details →
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

export default FactCard;
