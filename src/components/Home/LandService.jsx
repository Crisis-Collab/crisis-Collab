import React, { useEffect } from "react";
import img3 from "../../assets/img1.jpg";
import img4 from "../../assets/img3.jpeg";
import img5 from "../../assets/img13.jpg";

import AOS from "aos";
import "aos/dist/aos.css";

const LandService = () => {
  useEffect(() => {
    AOS.init({ duration: "1000" });
  }, []);
  return (
    <div className="flex flex-col md:flex-row mx-auto container h-screen bg-white">
      {/* Left side with three images */}
      <div className="w-1/2 p-24 ">
        {/* First image in a column */}
        <img
          src={img3}
          alt="Image 1"
          className="w-full h-auto mb-4 shadow-2xl rounded-xl"
          data-aos="zoom-in"
        />

        {/* Second and third images in a row */}
        <div className="flex">
          <img
            src={img4}
            alt="Image 2"
            className="w-1/2 h-auto mr-2 shadow-2xl rounded-xl"
            data-aos="fade-right"
          />
          <img
            src={img5}
            alt="Image 3"
            className="w-1/2 h-auto ml-2 m-6 shadow-2xl rounded-xl"
            data-aos="fade-left"
          />
        </div>
      </div>

      {/* Right side with content */}
      <div className="w-1/2 bg-white p-8">
        {/* Content for the right side goes here */}
        <h6 className="text-gray-400 pb-8">Welcome to Crisi Collab ---</h6>
        <h1 className="text-6xl font-semibold mb-4 "> Our Services</h1>
        <p className="text-base text-gray-600 pt-12 ">
          At Crisis Collab, we are committed to providing comprehensive and
          effective solutions for rescue relief agencies worldwide. Our range of
          services is designed to empower agencies, enhance collaboration, and
          amplify the impact of humanitarian efforts
        </p>

        {/* Card Template  */}
        <div className="mt-6 flex space-x-6">
          <div className=" transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:shadow-2xl duration-300 ...  p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-600 dark:text-white">
                Global Coordination
              </h5>
            </a>
            <p className="mb-1 font-normal text-cyan-950 dark:text-gray-400">
              In times of crisis, coordination is key. We facilitate seamless
              global collaboration among rescue relief agencies, ensuring a
              swift and unified response to emergencies.{" "}
            </p>
            <a
              href="/service"
              className=" mt-8 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-gray-950 focus:ring-4 focus:outline-none  "
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          <div className=" transition ease-in-out delay-150  hover:-translate-y-1 hover:scale-110 hover:shadow-2xl duration-300 ...  p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-600 dark:text-white">
                Resource Sharing
              </h5>
            </a>
            <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
              Access to vital resources is critical for effective relief
              operations. We enable rescue agencies to share and pool resources
              such as equipment, personnel, and expertise.{" "}
            </p>
            <a
              href="/service"
              className="inline-flex items-center px-3 py-2 mt-6 text-sm font-medium text-center text-white bg-gray-900 rounded-lg hover:bg-gray-950  "
            >
              Read more
              <svg
                className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandService;
