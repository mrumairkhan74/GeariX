import React from "react";
import { Typewriter } from "react-simple-typewriter";

const Loading = () => {
  return (
    <div className="relative w-full h-screen">
      <div className="flex flex-col items-center justify-center absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
        <img
          src="./images/gearixIcon.png"
          alt="Logo"
          className="w-25 h-25 animate-spin"
        />
        <h5 className="text-xl tracking-[3px] text-red-500 p-1 m-1 font-bold">
          <Typewriter
            words={["Loading...."]}
            loop={0}
            cursor
            cursorStyle="_"
            typeSpeed={50}
            deleteSpeed={70}
            delaySpeed={1000}
          />
        </h5>
      </div>
    </div>
  );
};

export default Loading;
