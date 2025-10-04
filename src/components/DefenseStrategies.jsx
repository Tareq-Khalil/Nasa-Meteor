function DefenseStrategies() {
  const strategies = [
    {
      name: "Nuclear Deflection",
      description:
        "Detonate nuclear weapons near the asteroid to change its course",
      effectiveness: "High",
      risk: "Radiation",
    },
    {
      name: "Kinetic Impactor",
      description: "Ram a spacecraft into the asteroid to alter its trajectory",
      effectiveness: "Medium",
      risk: "Low",
    },
    {
      name: "Gravity Tractor",
      description:
        "Use a spacecraft's gravity to slowly pull the asteroid off course",
      effectiveness: "Low",
      risk: "Very Low",
    },
    {
      name: "Solar Sail",
      description:
        "Attach reflective material to use solar pressure for deflection",
      effectiveness: "Very Low",
      risk: "Low",
    },
  ];

  return (
    <div className="bg-gradient-to-l from-[#1a1a1a] to-[#2d1b4e] border-2 border-[#8c58f3] rounded-xl p-8">
      <h2 className="text-white font-['Jaini:Regular'] text-[36px] mb-6 text-center">
        Planetary Defense Strategies
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategies.map((strategy, index) => (
          <div
            key={index}
            className="bg-black/30 rounded-lg p-4 border border-[#8c58f3]/30"
          >
            <h3 className="font-light text-xl mb-2">
              {strategy.name}
            </h3>
            <p className="text-white/80 font-['Inter'] text-xs font-light mb-3">
              {strategy.description}
            </p>
            <div className="flex justify-between">
              <span className="text-green-400 text-[12px] font-light font-['Inter']">
                Effectiveness: {strategy.effectiveness}
              </span>
              <span className="text-yellow-400 text-[12px] font-light font-['Inter']">
                Risk: {strategy.risk}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default DefenseStrategies