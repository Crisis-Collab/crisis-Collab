import React, { useState }  from "react";

import hero from "../../assets/hero2.png"

import mid from "../../assets/map3.jpg"




const Landing = () => {
  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };
  return (
  
    
    <div className=" flex h-screen ">
      {/* Text on the left side (whole screen) */}
    <div className=" pl-8 flex flex-col items-center justify-center">
    <div className="text-6xl text-black font-bold">Crisis Collab</div>
    <div className="text-2xl text-semibold text-gray-600"> Connecting Rescue Relief Agencies with the world</div>
    <div className="bg-red-600 h-[200px] w-[200px] m-4 rounded-full items-center flex justify-center">
    <img src={mid} alt="Your Image" className="  max-w-full rounded-full h-[170px] w-[170px]"/>
    </div>
    </div>
          
          {/* <di

      {/* Right side with quadrant of a circle */}
      <div className="flex-none  h-full absolute right-0 w-1/2">
        <div className="bg-black h-full w-full  rounded-tl-[1000px]" onMouseEnter={handleHover}
        onMouseLeave={handleLeave}></div>
        <img src={hero} alt="Your Image" className="absolute top-[50%] left-[20%] transform -translate-x-1/2 -translate-y-1/2 max-w-full rounded-full h-1/2 w-1/2"/>
        <div className="bg-white absolute top-[60%] left-[44%] ring-4 ring-black transform -translate-x-1/2 -translate-y-1/2 max-w-full  h-12 w-12 rounded-full"></div>
        <div className="bg-white absolute top-[75%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 max-w-full  h-20 w-20 rounded-full"></div>
        <div className="bg-white absolute top-[65%] left-[57%] transform -translate-x-1/2 -translate-y-1/2 max-w-full  h-4  w-4 rounded-full"></div>
      </div>
    </div>
  );
};


export default Landing;

