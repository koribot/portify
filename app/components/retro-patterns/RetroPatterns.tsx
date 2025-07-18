import React from "react";

const RetroPatterns = () => {
  return (
    <>
      <div className="absolute inset-0 opacity-10 z-0">
        <div className="absolute top-20 left-20 w-32 h-32 bg-orange-400 transform rotate-45"></div>
        <div className="absolute top-40 right-32 w-24 h-24 bg-red-400 rounded-full"></div>
        <div className="absolute bottom-32 left-32 w-40 h-40 bg-yellow-400 transform rotate-12"></div>
        <div className="absolute bottom-20 right-20 w-28 h-28 bg-orange-500 rounded-full"></div>
        <div className="absolute top-64 left-1/2 w-20 h-20 bg-red-500 transform -rotate-45"></div>
      </div>
      <div
        className="absolute inset-0 opacity-[0.02] z-0"
        style={{
          backgroundImage: `
            linear-gradient(orange 1px, transparent 1px),
            linear-gradient(90deg, orange 1px, transparent 1px)
            `,
          backgroundSize: "50px 50px",
        }}
      ></div>
    </>
  );
};

export default RetroPatterns;
