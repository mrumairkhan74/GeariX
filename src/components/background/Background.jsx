import React from "react";

const Background = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full z-0 flex items-center justify-center pointer-events-none">
      <img
        src="./images/gearixLogo.png"
        alt="Background Logo"
        className="w-1/4 opacity-20 object-contain"
      />
    </div>
  );
};

export default Background;
