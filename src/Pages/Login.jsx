import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "flowbite-react";
import Logo from "../assets/LOGO2.png";
import LoginOtpModal from "../components/Auth/LoginOtpModal";

const Login = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [otpModal, setOtpModal] = useState(false);
  const handleOnClose = () => {
    setOtpModal(false);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div
      className="relative min-h-screen bg-cover bg-center py-2 sm:py-12 bgMapImage"
      id="login"
    >
      <Link to="/">
        <div className=" flex pl-8  ">
          <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 " />
          <span className="text-red-600 text-2xl font-medium">Crisis</span>
          <span className="text-red-500 font-semibold pt-2"> collab</span>
        </div>
      </Link>
      <div className="animate-bounce  border-2 border-black absolute top-[20%] left-[44%] transform -translate-x-1/2 -translate-y-1/2 max-w-full  h-32 w-32 m-4 rounded-full  bg-white flex text-center">
        <h1 className="absolute top-[35%] left-[20%] text-3xl font-bold ">
          Login
        </h1>
      </div>
      <div className=" flex items-center justify-center py-6 mt-48 sm:max-w-xl   sm:mx-auto">
        <div className="relative inline-block text-left ">
          <button
            type="button"
            onClick={toggleDropdown}
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-900 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
          >
            Select Role
            <svg
              className="w-5 h-5 ml-2 -mr-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 0 1 1.414 0L10 11.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
          {isOpen && (
            <div className="  mt-2 w-50 rounded-md shadow-lg  ">
              <div
                className="py-1  flex flex-col space-y-2 rounded-2xl items-center justify-center"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <Button
                  onClick={() => {
                    setUser("Citizen"), setOtpModal(true);
                  }}
                  className="hover:bg-red-400 px-4"
                >
                  Citizen
                </Button>
                <Button
                  onClick={() => {
                    setOpenAdminModal(true), setUser("Admin");
                  }}
                  className="hover:bg-red-400 px-4"
                >
                  Admin
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
      {otpModal && <LoginOtpModal user={user} onClose={handleOnClose} />}
    </div>
  );
};

export default Login;
