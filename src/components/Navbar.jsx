import React, { useState } from "react";
import { NavLink } from "react-router-dom"; 
import { assets } from "../assets/assets";

const navLinks = [
  { name: "Defend Earth", to: "/defend-earth" },
  { name: "Asteroid Simulation", to: "/asteroid-simulation" },
  { name: "Facts", to: "/fun-facts" },
  { name: "About Challenge", to: "/about-challenge" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full py-4 px-6 md:px-10 flex items-center justify-between bg-black text-white border-b border-purple-900/20">
      {/* Logo */}
      <NavLink to="/" className="flex items-center gap-3">
        <img
          src={assets.rockImage}
          alt="Meteor"
          className="w-12 h-12 md:w-16 md:h-16 object-contain animate-swing-float"
        />

        <span className="font-semibold text-lg sm:text-xl md:text-3xl tracking-wide">
          Meteor Madness
        </span>
      </NavLink>

      {/* Desktop Nav */}
      <nav className="hidden md:flex items-center">
        <ul className="flex gap-6 md:gap-10">
          {navLinks.map((link, idx) => (
            <li key={idx}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `text-sm sm:text-base md:text-lg lg:text-xl font-medium inline-block transform transition-all duration-300 ease-in-out hover:text-purple-400 ${
                    isActive
                      ? "underline underline-offset-[6px] decoration-2 decoration-[#8b58f2]"
                      : ""
                  }`
                }
              >
                {link.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setOpen(!open)}
        className="md:hidden text-2xl focus:outline-none"
      >
        {open ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {open && (
        <nav className="absolute top-20 left-0 w-full bg-black px-6 pb-4 md:hidden border-b border-purple-900/20 z-50">
          <ul className="flex flex-col gap-3">
            {navLinks.map((link, idx) => (
              <li key={idx}>
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `text-sm sm:text-base font-medium block transform transition-all duration-300 ease-in-out hover:text-purple-400 hover:translate-x-1 ${
                      isActive
                        ? "underline underline-offset-4 decoration-[#8b58f2]"
                        : ""
                    }`
                  }
                  onClick={() => setOpen(false)}
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
