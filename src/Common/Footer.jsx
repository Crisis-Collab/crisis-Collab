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
      <div className="container flex flex-row  justify-between items-center space-x-64 ">
        {/* Left side with big logo */}
        <div className="flex-shrink-0  mx-4  mb-4  flex flex-col items-center justify-center ">
          <img src={Logo} alt="Big Logo" className="h-16 w-16 mx-auto sm:mx-0" />
          <span className="text-red-600 text-4xl font-medium">Crisis</span>
          <span className="text-orage-400 pl-2 font-semibold block text-lg">collab</span>
        </div>

        {/* Middle section with contact info */}
        <div className="text-sm mx-8 sm:mx-12 flex flex-col items-center justify-center sm:text-left ">
          <div className="flex py-2 items-start">
            <FaLocationArrow className="text-white mt-2" />
            <span className="pl-4">
              <span>Bundelkhand University,</span>
              <span className="text-red-600 font-medium">Jhansi</span>
            </span>
          </div>
          <div className="flex py-2 items-start">
            <FaPhone className="text-white mt-2" />
            <span className="pl-4">Contact: (123) 456-7890</span>
          </div>
          <div className="flex py-2 items-start justify-center ">
            <a  href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white flex  items-start justify-center">
            <FaMailBulk className="text-white  " />
            <div className="pl-4 mb-2 text-blue-700">crisiscollab@gmail.com</div>
            </a>
          </div>
        </div>

        {/* Right side with about and social media icons */}
        <div className="mx-4 sm:mx-0 text-center justify-between sm:text-left">
          <div>
            <p className="text-sm pt-6 text-red-600 font-semibold">About Us</p>
            <p className="text-xs pt-2 sm:pt-4">
            In times of crisis, coordination is key. We facilitate seamless
              global collaboration among rescue relief agencies, ensuring a
              swift and unified response to emergencies.
            </p>
          </div>

          <div className="pt-6 sm:pt-6 flex justify-center items-center sm:justify-start space-x-4">
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
