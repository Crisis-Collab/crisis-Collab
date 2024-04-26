import React from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaGithub,
  FaLocationArrow,
  FaPhone,
  FaMailBulk,
} from "react-icons/fa";
import Logo from "../assets/LOGO2.png";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-8 pl-8 px-6 sm:py-12">
      <div className="container sm:flex sm:flex-col  lg:flex lg:flex-row lg:space-x-64 justify-between items-center sm:space-x-4  ">
        {/* Left side with big logo */}
        <div className="flex-shrink-0  mx-4  mb-4  text-center ">
          <img src={Logo} alt="Big Logo" className="h-16 w-16 mx-auto sm:mx-0" />
          <span className="text-red-600 text-2xl font-medium">Crisis</span>
          <span className="text-orage-400 pl-2 font-semibold block">collab</span>
        </div>

        {/* Middle section with contact info */}
        <div className="text-sm mx-8 sm:flex flex-row lg:flex lg:flex-col justify-center sm:items-center sm:space-x-2 sm:text-center ">
          <div className="flex py-2 items-start">
            <FaLocationArrow className="text-white " />
            <div className="flex pl-6 items-start">
              <h1>Bundelkhand University,</h1>
              <h1 className="text-red-600 font-medium">Jhansi</h1>
            </div>
          </div>
          <div className="flex py-2 ">
            <FaPhone className="text-white sm:text-white sm:flex flex-col" />
            <p className="pl-6 flex items-start">Contact: (123) 456-7890</p>
          </div>
          <div className="flex py-2 ">
            <a href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white">
              <FaMailBulk className="text-white " />
              <p className="pl-6 flex items-start text-blue-700 ">crisiscollab@gmail.com</p>
            </a>
          </div>
        </div>

        {/* Right side with about and social media icons */}
        <div className="mx-4 sm:mx-5 text-center justify-between sm:text-left">
          <div>
            <p className="
            sm:text-sm  sm:text-red-600 lg:text-sm pt-6 text-red-600 font-semibold">About Us</p>
            <p className="text-xs pt-2 sm:pt-4">
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
              provident culpa odit aperiam! Odio, autem expedita.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
              provident culpa odit aperiam! Odio, autem expedita.
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ullam
              provident culpa odit aperiam! Odio, autem expedita.
            </p>
          </div>

          <div className="pt-4 sm:pt-6 flex justify-center sm:justify-start space-x-4">
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaFacebook />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaLinkedin />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white"
            >
              <FaGithub />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
