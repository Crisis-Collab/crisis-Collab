import React, { useState } from "react";
import hero from "../../assets/hero2.png";
import mid from "../../assets/map3.jpg";

const Landing = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <div className={`flex h-screen transition-all duration-200 ease-in ${isHovered ? 'bg-black text-white' : 'bg-white text-black'}`}>
      {/* Left side (whole screen) */}
      <div className={`pl-8 flex flex-col items-center sm:items-start justify-center  sm:justify-center transition-all duration-200 ease-in ${isHovered ? 'bg-black' : 'bg-white'}`}>
        <div className={`text-6xl font-bold ${isHovered ? 'scale-50 transition-all duration-200 ease-out' : ''}`}>Crisis Collab</div>
        <div className={`text-xl w-full text-center font-semibold text-gray-400 ${isHovered ? 'scale-90 transition-all duration-200 ease-out' : ''}`}>Connecting Rescue Relief Agencies with the world</div>
        <div className={`bg-red-600 rounded-full items-center flex justify-center ${isHovered ? 'h-[300px] w-[300px] mt-8 scale-90 transition-all duration-200 ease-in' : 'h-[200px] w-[200px] m-2'}`}>
          <img src={mid} alt="Your Image" className={`m-24 max-w-full rounded-full ${isHovered ? 'h-[299px] w-[299px] scale-90 transition-all duration-200 ease-in' : 'h-[170px] w-[170px]'} `} />
        </div>
      </div>

      {/* Right side with quadrant of a circle */}
      <div className={`flex-none h-full absolute right-0 w-full lg:w-1/2 transition-all duration-200 ease-in ${isHovered ? 'lg:block' : 'hidden'} lg:flex`}>
        <div className={`bg-black h-full w-full rounded-tl-[1000px] transition-all duration-200 ease-in ${isHovered ? 'bg-white' : 'bg-black'}`} onMouseEnter={handleHover} onMouseLeave={handleLeave}></div>
        <img src={hero} alt="Your Image" className="absolute top-[50%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 max-w-full rounded-full h-1/2 w-1/2" />
        <div className="bg-white absolute top-[60%] left-[44%] ring-4 ring-black transform -translate-x-1/2 -translate-y-1/2 max-w-full h-12 w-12 rounded-full"></div>
        <div className={`absolute top-[75%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 max-w-full h-32 w-32 m-4 rounded-full transition-all duration-200 ease-in ${isHovered ? 'bg-black animate-bounce duration-75 shadow-2xl' : 'bg-white'}`}></div>
        <div className={`absolute top-[65%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 max-w-full h-8 w-8 rounded-full transition-all duration-200 ease-in ${isHovered ? 'bg-black animate-bounce duration-75 shadow-lg' : 'bg-white'}`}></div>
      </div>
    </div>
  );
};


export default Landing;

