import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

// Utility for severity colors
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

export function FactCardModal({ facts, initialIndex, isOpen, onClose }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const currentFact = facts[currentIndex];
  const minSwipeDistance = 50;

  // Reset currentIndex when opening modal
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === "ArrowLeft") handlePrevious();
      else if (e.key === "ArrowRight") handleNext();
      else if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex]);

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % facts.length);
  };

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + facts.length) % facts.length);
  };

  // Touch/swipe handlers
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) handleNext();
    else if (isRightSwipe) handlePrevious();
  };

  // Animation variants
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction > 0 ? 45 : -45,
      scale: 0.8,
    }),
    center: { x: 0, opacity: 1, rotateY: 0, scale: 1 },
    exit: (direction) => ({
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      rotateY: direction < 0 ? 45 : -45,
      scale: 0.8,
    }),
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4"
          onClick={onClose}
        >
          {/* Close button */}
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            onClick={onClose}
            className="absolute top-4 right-4 z-50 p-2 rounded-full bg-[#2d1b4e] border-2 border-[#8c58f3] text-white hover:bg-[#8c58f3] transition-colors"
          >
            <X className="w-6 h-6" />
          </motion.button>

          {/* Navigation buttons (desktop only) */}
          <div className="hidden md:block">
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              onClick={(e) => {
                e.stopPropagation();
                handlePrevious();
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#2d1b4e] border-2 border-[#8c58f3] text-white hover:bg-[#8c58f3] transition-all hover:scale-110"
            >
              <ChevronLeft className="w-8 h-8" />
            </motion.button>

            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              onClick={(e) => {
                e.stopPropagation();
                handleNext();
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-[#2d1b4e] border-2 border-[#8c58f3] text-white hover:bg-[#8c58f3] transition-all hover:scale-110"
            >
              <ChevronRight className="w-8 h-8" />
            </motion.button>
          </div>

          {/* Card container */}
          <div
            className="relative w-full max-w-xl h-[80vh] perspective-1000"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  rotateY: { duration: 0.4 },
                  scale: { duration: 0.2 },
                }}
                className="absolute inset-0 rounded-2xl overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #1a1a1a, #2d1b4e)",
                  border: "3px solid #8c58f3",
                  boxShadow: "0 0 60px rgba(140, 88, 243, 0.6)",
                }}
              >
                <div className="h-full overflow-y-auto scrollbar-purple">
                  {/* Image */}
                  {currentFact.image && (
                    <div className="relative h-[35vh]">
                      <img
                        src={currentFact.image}
                        alt={currentFact.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

                      {/* Severity */}
                      <div
                        className="absolute top-6 right-6 px-4 py-2 rounded-full font-bold text-white text-sm backdrop-blur-sm"
                        style={{
                          backgroundColor: getSeverityColor(
                            currentFact.severity
                          ),
                        }}
                      >
                        {currentFact.severity}
                      </div>

                      {/* Title */}
                      <div className="absolute bottom-0 left-0 right-0 p-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                          {currentFact.title}
                        </h2>
                        <div className="text-[#a566ff] text-lg font-semibold">
                          Fact #{currentIndex + 1}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 md:p-8 space-y-6">
                    {/* Main Fact */}
                    <div className="bg-[#2d1b4e]/50 rounded-lg p-4 border border-[#8c58f3]/30">
                      <p className="text-gray-200 text-base md:text-lg leading-relaxed">
                        {currentFact.fact}
                      </p>
                    </div>

                    {/* Details */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentFact.details.date && (
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d1b4e] rounded-lg p-4 border border-[#8c58f3]/30">
                          <div className="flex items-center gap-2 mb-2">
                           
                            <span className="text-[#8c58f3] font-semibold text-xl">
                              Date
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {currentFact.details.date}
                          </p>
                        </div>
                      )}

                      {currentFact.details.location && (
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d1b4e] rounded-lg p-4 border border-[#8c58f3]/30">
                          <div className="flex items-center gap-2 mb-2">
                         
                            <span className="text-[#8c58f3] font-semibold text-xl">
                              Location
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {currentFact.details.location}
                          </p>
                        </div>
                      )}

                      {currentFact.details.size && (
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d1b4e] rounded-lg p-4 border border-[#8c58f3]/30">
                          <div className="flex items-center gap-2 mb-2">
                          
                            <span className="text-[#8c58f3] font-semibold text-xl">
                              Size
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {currentFact.details.size}
                          </p>
                        </div>
                      )}

                      {currentFact.details.energy && (
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d1b4e] rounded-lg p-4 border border-[#8c58f3]/30">
                          <div className="flex items-center gap-2 mb-2">
                           
                            <span className="text-[#8c58f3] font-semibold text-xl">
                              Energy
                            </span>
                          </div>
                          <p className="text-gray-300 text-sm">
                            {currentFact.details.energy}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Additional info */}
                    <div className="bg-gradient-to-br from-[#2d1b4e] to-[#1a1a1a] rounded-lg p-5 border-2 border-[#a566ff]/50">
                      <h3 className="text-[#a566ff] font-bold text-lg mb-3 flex items-center gap-2">
                      
                        Additional Information
                      </h3>
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {currentFact.details.additionalInfo}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Mobile hint */}
          <div className="md:hidden absolute bottom-4 left-0 right-0 text-center">
            <p className="text-gray-400 text-xs">
              Swipe left or right to navigate • Tap outside to close
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
