import React, { useState } from "react";
import AdminSideBarData from "../../../Data/AdminSideBarData";
import { Link, useLocation } from "react-router-dom";
import id from "../../../assets/AgencyAva.png";
import { IoMenu } from "react-icons/io5";
import AdminDashboard from "../../../Pages/Dashbord/AdminDashboard";


const Sidebar = ({ isOpen, handleDashboard }) => {
  const defaultPath = "/adminDashboard/dashboard";
  const [activePath, setActivePath] = useState(defaultPath);
  const location = useLocation();

  // Update activePath when location changes
  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <div className="bg-red-900 bg-opacity-10 font-abc rounded-xl  shadow-inner h-screen  ">
      <div className="flex flex-col items-center justify-center ">
        <div className="p-4 ">
          <div className={`flex items-center  ${isOpen?'justify-start':'justify-center'} `}>
           
            <button
              onClick={handleDashboard}
              className={`${
                isOpen ? "" : "bg-red-900 bg-opacity-40"
              } rounded-full p-2`}
            >
              <IoMenu className="text-2xl" />
            </button>
          </div>
          <ul className="pt-6">
            {AdminSideBarData.map((item) => (
              <li key={item.id} className="flex flex-col font-normal">
                <Link
                  to={item.path}
                  className={`py-2 m-2 px-3 flex   focus:bg-black focus:text-white hover:bg-gray-800 hover:bg-opacity-15   rounded-full ml-4 ${
                    activePath === item.path ? "text-zinc-300 bg-black  " : "text-black"
                  }`}
                >
                  <div className="flex  ">
                    {item.icon && (
                      <item.icon className={`inline-block  ${isOpen?'w-6 h-6':'w-7 h-7'}`} />
                    )}
                  </div>
                  <div className={`ml-4 mr-2 ${isOpen ? "" : "hidden"}`}>
                    {" "}
                    {item.name}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;