import React, { useEffect } from "react";
import img1 from "../../assets/LOG1.jpeg";
import img2 from "../../assets/LOG3.jpeg";
import AOS from "aos";
import "aos/dist/aos.css";

const Welcome = () => {
  useEffect(() => {
    AOS.init({ duration: "1000" });
  }, []);

  return (
    <>
      <div data-aos="zoom-in" id="about">
        <div className="text-center  md:px-8 lg:px-32 pt-40 text-gray-950 text-3xl md:text-5xl font-semibold">
          Welcome To Crisis Collab{" "}
        </div>
        <div className="text-center md:pl-8 text-lg md:text-2xl font-semibold text-red-600">
          Uniting Rescuers. Empowering Hope.
        </div>
        <div className="flex flex-col mt-10 items-center justify-center text-center">
          <p className="w-[60%]   text-gray-600 px-6 py-6 text-base  font-sm  ">
            In the face of disaster and crisis, solidarity and coordination are
            our greatest assets. Welcome to the Crisis Collab Network, a global
            initiative that brings together a tapestry of rescue relief agencies
            under one unified banner. Our mission is clear: to amplify the
            impact of humanitarian efforts by fostering collaboration, sharing
            resources, and delivering rapid relief to those in need
          </p>
          {/* <img src={img2} alt="img" className="max-w-full h-40 md:mx-4" />
          <img src={img1} alt="img" className="max-w-full h-60 md:h-96" /> */}
        </div>
      </div>
    </>
  );
};

export default Welcome;
