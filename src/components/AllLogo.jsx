import React from "react";

const AllLogo = () => {
  return (
    <>
      <h1 className="text-red-500 tracking-[3px] text-3xl md:text-5xl uppercase text-center font-bold m-4">
        Sponsors
      </h1>

      <div className="w-full  shadow-md rounded-md py-6 px-4 flex items-center justify-center">
        <div className="flex flex-wrap justify-center gap-6">
          {[
            "audilog.png",
            "bmwLogo.png",
            "farrarilogo.png",
            "gtrLogo.png",
            "srtlogo.png",
            "mercedesLogo.png",
            "lamborghiniLogo.png",
          ].map((logo, index) => (
            <img
              key={index}
              src={`./images/${logo}`}
              alt="logo"
              loading="lazy"
              className="w-20 h-20 md:w-28 md:h-28 object-contain mix-blend-multiply transition-transform duration-300 hover:scale-105"
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default AllLogo;
