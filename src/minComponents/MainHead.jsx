import React, { useState, useEffect } from "react";
import { Typewriter } from "react-simple-typewriter";
import { MdAddShoppingCart } from "react-icons/md";

const texts = [
  {
    text: "Find Your Dream Car",
    image: "./images/bmw.png",
  },
  {
    text: "Drive with Confidence",
    image: "./images/Audi.png",
  },
  {
    text: "Unbeatable Prices",
    image: "./images/Mushtag.png",
  },
];

const MainHead = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % texts.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center justify-center bg-gray-100 px-4 py-10">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-10 max-w-6xl w-full flex flex-col md:flex-row gap-10 items-center justify-center">
        {/* Car Image */}
        <div className="w-full md:w-1/2 flex justify-center">
          <img
            src={texts[currentIndex].image}
            alt={texts[currentIndex].text}
            loading="lazy"
            className="object-contain max-h-[400px] w-full max-w-sm  rounded-md  transition-all duration-500"
          />
        </div>

        {/* Text Content */}
        <div className="w-full md:w-1/2 space-y-6 text-center md:text-left">
          <h1 className="text-gray-600 text-4xl md:text-5xl font-semibold">
            Welcome To{" "}
            <span className="text-red-600 font-mono font-bold text-5xl md:text-7xl">
              GeariX
            </span>
          </h1>

          <h2 className="bg-red-500 text-white inline-block rounded px-4 py-2 text-2xl md:text-3xl tracking-wider min-h-[50px]">
            <Typewriter
              words={texts.map((item) => item.text)}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={90}
              deleteSpeed={60}
              delaySpeed={1200}
            />
          </h2>

          <button className="bg-red-500 hover:bg-red-700 transition-all text-white px-6 py-3 rounded-md text-lg flex items-center gap-2 mx-auto md:mx-0">
            <MdAddShoppingCart className="text-xl" />
            Book Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default MainHead;
