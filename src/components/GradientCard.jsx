import React from "react";
import { useNavigate } from "react-router-dom";

const GradientCard = ({ title, desc }) => {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-[#8c58f3] to-[#a566ff] rounded-xl p-8">
      <h2 className="font-normal sm:text-4xl text-2xl mb-4">{title}</h2>
      <p className="font-light text-sm font-['Inter'] mb-6">{desc}</p>
      <div className="flex sm:gap-4 sm:flex-row flex-col gap-8 justify-center">
        <button
          onClick={() => navigate("/defend-earth")}
          className="bg-transparent border-2 border-white text-white sm:px-8 px-6 py-3 rounded-lg text-sm sm:text-xl hover:bg-white hover:text-[#8c58f3] transition-all"
        >
          Defend Earth
        </button>
        <button
          onClick={() => navigate("/asteroid-simulation")}
          className="bg-transparent border-2 border-white text-white sm:px-8 px-6 py-3 rounded-lg text-sm sm:text-xl hover:bg-white hover:text-[#8c58f3] transition-all"
        >
          Simulate Impacts
        </button>
      </div>
    </div>
  );
};

export default GradientCard;
