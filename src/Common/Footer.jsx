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
    <footer className="bg-black text-white py-8 px-6 sm:py-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        {/* Left side with big logo */}
        <div className="flex-shrink-0 mb-4 flex flex-col items-center lg:items-start md:mx-4">
          <img src={Logo} alt="Big Logo" className="h-16 w-16 mb-2" />
          <span className="text-red-600 text-4xl font-medium">Crisis</span>
          <span className="text-red-400 font-semibold text-lg">collab</span>
        </div>

        {/* Middle section with contact info */}
        <div className="text-sm flex flex-col items-center md:items-start md:mx-8 sm:mx-12">
          <div className="flex py-2 items-start">
            <FaLocationArrow className="text-white mt-1 text-lg" />
            <span className="pl-4">
              <span>Bundelkhand University,</span>
              <span className="text-red-600 font-medium">Jhansi</span>
            </span>
          </div>
          <div className="flex py-2 items-start">
            <FaPhone className="text-white mt-1" />
            <span className="pl-4">Contact: (123) 456-7890</span>
          </div>
          <div className="flex py-2 items-start">
            <FaMailBulk className="text-white mt-1 text-lg" />
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="pl-4 text-blue-600"
            >
              crisiscollab@gmail.com
            </a>
          </div>
        </div>

        {/* Right side with about and social media icons */}
        <div className="text-center md:text-left md:mx-4">
          <div>
            <p className="text-sm  text-red-600 font-semibold">About Us</p>
            <p className="text-xs pt-2 sm:pt-4">
              In times of crisis, coordination is key. We facilitate seamless
              global collaboration among rescue relief agencies, ensuring a
              swift and unified response to emergencies.
            </p>
          </div>

          <div className="pt-2 flex justify-center md:justify-start space-x-4">
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
