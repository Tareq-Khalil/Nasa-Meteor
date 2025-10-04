import React, { useState } from "react";
import { motion } from "framer-motion";

import FactCard from "../components/FactCard";
import SizeCard from "../components/SizeCard";
import DefenseStrategies from "../components/DefenseStrategies";
import Header from "../components/Header";
import GradientCard from "../components/GradientCard";
import { FactCardModal } from "../components/FactCardModal";

// ----------------- Size Data -----------------
const sizes = [
  {
    name: "House",
    size: "20m",
    damage: "Local destruction",
    color: "#FFE066",
    scale: 30,
  },
  {
    name: "Football Field",
    size: "100m",
    damage: "City damage",
    color: "#FF9933",
    scale: 45,
  },
  {
    name: "Eiffel Tower",
    size: "300m",
    damage: "Regional impact",
    color: "#FF6B6B",
    scale: 60,
  },
  {
    name: "Mount Everest",
    size: "9km",
    damage: "Global catastrophe",
    color: "#8B0000",
    scale: 75,
  },
];

// ----------------- Asteroid Facts -----------------
const asteroidFacts = [
  {
    title: "Chicxulub Impact",
    fact: "66 million years ago, a 10-kilometer asteroid struck Earth near the Yucatán Peninsula, creating a 180-kilometer crater and triggering the extinction of the dinosaurs.",
    severity: "Extinction",
    image:
      "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=800&q=80",
    details: {
      date: "66 million years ago",
      location: "Yucatán Peninsula, Mexico",
      size: "10-15 km diameter",
      energy: "100 million megatons",
      additionalInfo:
        "This impact created a global winter that lasted for years, blocking out sunlight and causing the extinction of 75% of all species on Earth.",
    },
  },
  {
    title: "Tunguska Event",
    fact: "In 1908, an asteroid exploded over Siberia with the force of 185 Hiroshima bombs, flattening 2,000 square kilometers of forest but leaving no crater.",
    severity: "Regional",
    image:
      "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&q=80",
    details: {
      date: "June 30, 1908",
      location: "Tunguska, Siberia",
      size: "60-190 meters",
      energy: "10-15 megatons",
      additionalInfo:
        "The explosion occurred at an altitude of 5-10 km, which is why no crater was formed. Trees were knocked down in a radial pattern up to 30 km from ground zero.",
    },
  },
  {
    title: "Chelyabinsk Meteor",
    fact: "On February 15, 2013, a 20-meter meteor exploded over Russia, creating a shockwave that injured over 1,500 people and damaged thousands of buildings.",
    severity: "City",
    image:
      "https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80",
    details: {
      date: "February 15, 2013",
      location: "Chelyabinsk, Russia",
      size: "20 meters",
      energy: "500 kilotons",
      additionalInfo:
        "The meteor entered Earth's atmosphere at about 19 km/s and exploded at an altitude of 30 km. It was the largest natural object to enter Earth's atmosphere since Tunguska.",
    },
  },
  {
    title: "Asteroid 99942 Apophis",
    fact: "This 370-meter asteroid will pass within 31,000 km of Earth in 2029, closer than some satellites. Earlier predictions gave it a 2.7% chance of impact.",
    severity: "Close Call",
    image:
      "https://images.unsplash.com/photo-1543722530-d2c3201371e7?w=800&q=80",
    details: {
      date: "April 13, 2029",
      location: "Near-Earth approach",
      size: "370 meters",
      energy: "1,200 megatons (if impact)",
      additionalInfo:
        "Named after the Egyptian god of chaos, Apophis will be visible to the naked eye as it passes Earth. The 2029 encounter will change its orbit significantly.",
    },
  },
  {
    title: "Asteroid 16 Psyche",
    fact: "This metal-rich asteroid is worth an estimated $10,000 quadrillion - more than the entire global economy. NASA is sending a mission to study it.",
    severity: "Rare",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80",
    details: {
      date: "Mission arrival: 2029",
      location: "Asteroid Belt (between Mars and Jupiter)",
      size: "226 km diameter",
      energy: "N/A",
      additionalInfo:
        "Psyche is believed to be the exposed core of a protoplanet. It contains enough iron, nickel, and gold to potentially collapse the world economy if brought to Earth.",
    },
  },

  {
    title: "Asteroid Bennu",
    fact: "There's a 1 in 2,700 chance this asteroid will hit Earth between 2175 and 2199. NASA collected samples from it in 2020 to better understand its composition.",
    severity: "Close Call",
    image:
      "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=800&q=80",
    details: {
      date: "Potential impact: 2175-2199",
      location: "Near-Earth orbit",
      size: "490 meters diameter",
      energy: "1,200 megatons (if impact)",
      additionalInfo:
        "The OSIRIS-REx mission returned samples from Bennu in September 2023. Studying these samples will help us understand how to deflect asteroids and the origins of life on Earth.",
    },
  },
  {
    title: "The DART Mission Success",
    fact: "In 2022, NASA successfully changed an asteroid's orbit by crashing a spacecraft into it at 22,530 km/h, proving we can defend Earth from asteroid impacts.",
    severity: "High Energy",
    image:
      "https://images.unsplash.com/photo-1573588028698-f4759befb09a?w=800&q=80",
    details: {
      date: "September 26, 2022",
      location: "Asteroid Dimorphos",
      size: "160 meters (Dimorphos)",
      energy: "Kinetic impact",
      additionalInfo:
        "The Double Asteroid Redirection Test (DART) changed Dimorphos' orbital period by 33 minutes, exceeding expectations. This was humanity's first demonstration of planetary defense technology.",
    },
  },

  {
    title: "Oumuamua",
    fact: "The first confirmed interstellar object to pass through our solar system, this cigar-shaped visitor accelerated in ways that can't be explained by gravity alone.",
    severity: "Rare",
    image:
      "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?w=800&q=80",
    details: {
      date: "Discovered October 19, 2017",
      location: "Interstellar space",
      size: "100-1000 meters long",
      energy: "N/A",
      additionalInfo:
        "Oumuamua means 'scout' or 'messenger from the distant past' in Hawaiian. Its unusual acceleration has led to speculation about its true nature, with some scientists suggesting it could be artificial.",
    },
  },

  {
    title: "Asteroid Ceres",
    fact: "Ceres, the largest object in the asteroid belt, is classified as a dwarf planet and was the first asteroid visited by NASA's Dawn spacecraft in 2015.",
    severity: "Stable",
    image: "https://images-assets.nasa.gov/image/PIA19562/PIA19562~orig.jpg",
    details: {
      date: "Visited: 2015-2018",
      location: "Asteroid Belt (between Mars and Jupiter)",
      size: "940 km diameter",
      energy: "N/A",
      additionalInfo:
        "Ceres contains water ice and possible subsurface oceans. Bright spots on its surface, particularly in the Occator Crater, are thought to be salt deposits, hinting at geological activity.",
    },
  },
  {
    title: "Asteroid Ryugu",
    fact: "Japan's Hayabusa2 mission collected samples from this 1-km asteroid in 2019, revealing a rubble-pile structure and organic materials that may hold clues to the origins of life.",
    severity: "Scientific Interest",
    image: "https://images-assets.nasa.gov/image/PIA23231/PIA23231~orig.jpg",
    details: {
      date: "Sampled: 2019",
      location: "Near-Earth orbit",
      size: "1 km diameter",
      energy: "N/A",
      additionalInfo:
        "Hayabusa2 returned samples to Earth in December 2020. Ryugu's surface is covered with boulders, and its low density suggests it is a loosely bound collection of rocks.",
    },
  },
  {
    title: "Asteroid Itokawa",
    fact: "The first asteroid from which samples were returned to Earth by Japan's Hayabusa mission in 2010, Itokawa is a small, rubble-pile asteroid with no atmosphere.",
    severity: "Scientific Interest",
    image: "https://images-assets.nasa.gov/image/PIA20003/PIA20003~orig.jpg",
    details: {
      date: "Sampled: 2005",
      location: "Near-Earth orbit",
      size: "330 meters long",
      energy: "N/A",
      additionalInfo:
        "Itokawa's surface is littered with boulders and lacks fine dust, suggesting a history of impacts. The samples confirmed it is composed of silicate materials similar to meteorites.",
    },
  },

  {
    title: "Asteroid 21 Lutetia",
    fact: "ESA's Rosetta spacecraft flew by this large asteroid in 2010, revealing a heavily cratered surface and a possible metallic composition.",
    severity: "Stable",
    image: "https://images-assets.nasa.gov/image/PIA13570/PIA13570~orig.jpg",
    details: {
      date: "July 10, 2010",
      location: "Asteroid Belt (between Mars and Jupiter)",
      size: "100 km diameter",
      energy: "N/A",
      additionalInfo:
        "Lutetia is one of the largest asteroids visited by a spacecraft. Its high density suggests it may be a metal-rich M-type asteroid, possibly a remnant of a planetary core.",
    },
  },
  {
    title: "Asteroid 4 Vesta's Rheasilvia Crater",
    fact: "The Rheasilvia crater on Vesta, observed by NASA's Dawn mission, is one of the largest impact craters in the solar system, spanning 500 km across.",
    severity: "Geological Feature",
    image: "https://images-assets.nasa.gov/image/PIA15678/PIA15678~orig.jpg",
    details: {
      date: "Imaged: 2011-2012",
      location: "Asteroid Belt (between Mars and Jupiter)",
      size: "Crater: 500 km diameter",
      energy: "N/A",
      additionalInfo:
        "The Rheasilvia impact ejected about 1% of Vesta’s mass into space, creating many Vesta-family asteroids. Its central peak rises 22 km, one of the tallest in the solar system.",
    },
  },
  {
    title: "Asteroid 4179 Toutatis",
    fact: "This near-Earth asteroid, imaged by China's Chang'e-2 probe in 2012, has a tumbling rotation and a peanut-like shape due to close planetary encounters.",
    severity: "Close Call",
    image: "https://images-assets.nasa.gov/image/PIA17661/PIA17661~orig.jpg",
    details: {
      date: "Flyby: December 13, 2012",
      location: "Near-Earth orbit",
      size: "3.1 x 1.4 x 2.4 km",
      energy: "N/A",
      additionalInfo:
        "Toutatis passes Earth every four years, with a close approach in 2004 within 1.5 million km. Its complex rotation is caused by gravitational interactions with Earth and Mars.",
    },
  },
  {
    title: "Asteroid 253 Mathilde",
    fact: "NASA's NEAR Shoemaker spacecraft flew by Mathilde in 1997, revealing a heavily cratered, low-density C-type asteroid with a slow rotation period.",
    severity: "Flyby",
    image:
      "https://assets.science.nasa.gov/dynamicimage/assets/science/psd/solar/2023/07/Mathilde1_main.jpg?w=768&h=417&fit=crop&crop=faces%2Cfocalpoint",
    details: {
      date: "June 27, 1997",
      location: "Asteroid Belt (between Mars and Jupiter)",
      size: "53 km diameter",
      energy: "N/A",
      additionalInfo:
        "Mathilde’s large craters, like Karoo (33 km wide), suggest it has absorbed massive impacts without breaking apart. Its low density indicates a porous, rubble-pile structure.",
    },
  },
];

// ----------------- Component -----------------
const FunFacts = () => {
  const [selectedFactIndex, setSelectedFactIndex] = useState(null);
  const [showAll, setShowAll] = useState(false);

  const visibleFacts = showAll ? asteroidFacts : asteroidFacts.slice(0, 6);

  return (
    <div className="max-w-7xl mx-auto px-6 sm:px-12 lg:px-20 py-12 relative">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <Header
          obj={{
            title: "🌑 Asteroid Facts",
            description:
              "Discover fascinating stories about cosmic impacts and how we defend Earth from celestial threats.",
          }}
        />
      </motion.div>

      {/* Size Comparison */}
      <motion.div
        className="bg-gradient-to-br from-[#1a1a1a]/90 to-[#2d1b4e]/90 border border-[#8c58f3]/50 rounded-2xl p-6 shadow-2xl mb-12 backdrop-blur-sm"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-white text-2xl lg:text-3xl font-semibold mb-8 text-center">
          Asteroid Size Comparison
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 sm:gap-8">
          {sizes.map((size, index) => (
            <SizeCard key={index} size={size} />
          ))}
        </div>
      </motion.div>

      {/* Fun Facts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
        {visibleFacts.map((fact, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            whileHover={{
              scale: 1.05,
              boxShadow: "0px 0px 20px rgba(140, 88, 243, 0.5)",
            }}
          >
            <FactCard
              fact={fact}
              index={index}
              onOpen={() => setSelectedFactIndex(index)}
            />
          </motion.div>
        ))}
      </div>

      {/* Show More / Show Less */}
      {asteroidFacts.length > 6 && (
        <div className="text-center mb-12">
          <button
            onClick={() => setShowAll(!showAll)}
            className="px-6 py-3 rounded-xl bg-[#2d1b4e] border-2 border-[#8c58f3] text-white font-medium hover:bg-[#8c58f3] hover:text-white transition-all shadow-lg"
          >
            {showAll ? "Show Less" : "Show More"}
          </button>
        </div>
      )}

      {/* Modal */}
      {selectedFactIndex !== null && (
        <FactCardModal
          facts={asteroidFacts}
          initialIndex={selectedFactIndex}
          isOpen={true}
          onClose={() => setSelectedFactIndex(null)}
        />
      )}

      {/* Defense Strategies */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <DefenseStrategies />
      </motion.div>

      {/* CTA */}
      <motion.div
        className="mt-12 text-center"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <GradientCard
          title="Want to Test Your Skills?"
          desc="Try our asteroid deflection simulator or explore impact scenarios on the world map!"
        />
      </motion.div>
    </div>
  );
};

export default FunFacts;
