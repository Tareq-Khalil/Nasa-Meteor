import React from "react";

function Header({obj}) {
  return (
    <div>
      {" "}
      <h1 className="text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 [text-shadow:#8c58f3_4px_8px_24px]">
          {obj.title}
      </h1>
      <p className="text-white/60 text-sm sm:text-base max-w-2xl mx-auto font-['Inter']">
        {obj.description}
      </p>
    </div>
  );
}

export default Header;
