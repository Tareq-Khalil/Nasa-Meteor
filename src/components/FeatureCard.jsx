function FeatureCard({ title, description, icon }) {
  return (
    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#2d1b4e] border-2 border-[#8c58f3] rounded-xl p-6 hover:scale-105 transition-all duration-300 hover:border-[#a566ff]">
      <div className="text-[48px] mb-4 text-center">{icon}</div>
      <h3 className="text-white font-normal text-2xl mb-3 text-center">
        {title}
      </h3>
      <p className="text-white/70 font-['Inter'] text-xs text-center leading-relaxed">
        {description}
      </p>
    </div>
  );
}
export default FeatureCard;