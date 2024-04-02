import React, { useState,useEffect } from "react";
import SideBarData from "../../../Data/SideBarData";
import { Link, useLocation } from "react-router-dom";
import id from "../../../assets/AgencyAva.png";
import { IoMenu } from "react-icons/io5";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase.config";


const Sidebar = ({ isOpen, handleDashboard }) => {
  const defaultPath = "/userPannel/dashboard";
  const [activePath, setActivePath] = useState(defaultPath);
  const location = useLocation();
  const [user,setUser] = useState(null);
  const [loading,setLoading] =useState(false);

  const getUser = async () => {
    try {
      const userRef =doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      console.log(`User Data -${JSON.stringify(userData)}`)
      setUser(userData);
    } catch (error) {
      console.log("error occured while fetching user");
    }
  };
  useEffect(() => {
    setLoading(true);
    getUser();
    setLoading(false);
  }, []);

  // Update activePath when location changes
  React.useEffect(() => {
    setActivePath(location.pathname);
  }, [location]);

  return (
    <div className="bg-blue-900 bg-opacity-10 font-abc rounded-xl  shadow-inner h-screen  ">
      <div className="flex flex-col items-center justify-center ">
        <div className="p-4 ">
          <div className={`flex items-center  ${isOpen?'justify-start':'justify-center'} `}>
           
            <button
              onClick={handleDashboard}
              className={`${
                isOpen ? "" : "bg-blue-950 bg-opacity-45"
              } rounded-full p-2`}
            >
              <IoMenu className="text-2xl" />
            </button>
          </div>
          <ul className="pt-6">

            {SideBarData.map((item) => {
                 if (item.userType && user?.userType !== item.userType) return null;
                 return(
                  <li key={item.id} className="flex flex-col font-normal">
                  <Link
                    to={item.path}
                    className={`py-2 m-2 px-3 flex   focus:bg-red-600 focus:text-white hover:bg-gray-800 hover:bg-opacity-15   rounded-full ml-4 `}
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
                 )

            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;