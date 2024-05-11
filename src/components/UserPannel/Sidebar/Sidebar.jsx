import React, { useState, useEffect } from "react";
import SideBarData from "../../../Data/SideBarData";
import { Link, useLocation } from "react-router-dom";
import id from "../../../assets/AgencyAva.png";
import { IoMenu } from "react-icons/io5";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase.config";
import Logo from "../../../assets/LOGO2.png";
import Avatar from "../../../assets/citizenAVa.jpg";
import { Modal } from "flowbite-react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

const Sidebar = ({ isOpen, handleDashboard }) => {
  const defaultPath = "/userPannel/dashboard";
  const [activePath, setActivePath] = useState(defaultPath);
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    auth.signOut().then(() => {
      navigate("/");
      console.log("Logout Successfull");
      console.log(auth);
    });
  };

  const getUser = async () => {
    try {
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      console.log(`User Data -${JSON.stringify(userData)}`);
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
    <div className="bg-zinc-900 font-abc   shadow-inner h-screen  flex flex-col justify-between ">
      <div className="flex flex-col items-center justify-center py-4 ">
        <div
          className={`flex items-center   ${
            isOpen ? "justify- space-x-5" : "justify-center"
          } `}
        >
          <div className={`flex  pl-8 ${isOpen ? "items-center" : "hidden"}`}>
            <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 " />
            <span className="text-red-600 text-2xl font-medium">Crisis</span>
            <span className="text-red-600 font-semibold pt-2"> collab</span>
          </div>
          <button
            onClick={handleDashboard}
            className={`${
              isOpen ? "" : "bg-red-600 bg-opacity-45  "
            } rounded-full p-2`}
          >
            <IoMenu className="text-2xl text-white  " />
          </button>
        </div>
        <ul className="pt-8">
          {SideBarData.map((item) => {
            if (item.userType && user?.userType !== item.userType) return null;
            return (
              <li key={item.id} className="flex flex-col font-normal ">
                <Link
                  to={item.path}
                  className={`py-2 m-2 px-3 flex rounded-full ml-4 ${
                    activePath === item.path
                      ? "bg-red-600 bg-opacity-25 text-red-600 font-semibold"
                      : "hover:bg-gray-300 hover:bg-opacity-15 text-slate-200"
                  } `}
                >
                  <div className="flex  ">
                    {item.icon && (
                      <item.icon
                        className={`inline-block  ${
                          isOpen ? "w-6 h-6" : "w-7 h-7"
                        }`}
                      />
                    )}
                  </div>
                  <div className={`ml-4 mr-2 ${isOpen ? "" : "hidden"}`}>
                    {" "}
                    {item.name}
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
      <div className="">
        <div
          className={`flex items-center  p-2 bg-zinc-950 ${
            isOpen ? " justify-between" : "justify-center"
          }`}
        >
          <div
            className={`${
              isOpen ? "flex flex-col item-center justify-center " : "hidden"
            }`}
          >
            <h4 className="pr-4 font-semibold text-gray-100">Welcome back</h4>
            <div className="  text-red-600 font-semibold">
              {!user ? (
                <h4>Loading</h4>
              ) : (
                <h4>
                  {user.userType === "agency-admin"
                    ? user.agencyName
                    : user.name}
                </h4>
              )}
            </div>
          </div>
          <div>
            <img
              src={Avatar} // Replace with your avatar image
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
          </div>
        </div>
        <div>
          <button
            className="  w-full items-center flex justify-center px-4  py-3  text-base transition-all font-semibold  text-white hover:bg-red-500 bg-red-600 "
            onClick={() => setOpenModal(true)}
          >
            {" "}
            <FiLogOut className="mr-4 text-lg" />
            Logout
          </button>
          <div>
            <Modal
              show={openModal}
              onClose={() => setOpenModal(false)}
              className=" z-50 pt-52 px-[500px] w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-50"
              style={{
                overlay: {
                  zIndex: 1000, // Set a higher z-index than the map
                },
              }}
           >
              <Modal.Header className=" text-black p-2 text-xl "></Modal.Header>

              <Modal.Body className=" ">
                <div className="space-y-2 flex flex-col items-center justify-center text-center">
                  <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-400">
                    Are you sure you want to Logout?
                  </p>
                  <div className="flex space-x-8">
                    <button
                      className="bg-green-600 px-8 py-2 rounded-lg text-white font-medium  "
                      onClick={handleLogout}
                    >
                      Yes
                    </button>

                    <button
                      className="bg-red-700 px-8 py-2 rounded-lg text-white font-medium   "
                      onClick={() => setOpenModal(false)}
                    >
                      No
                    </button>
                  </div>
                </div>
              </Modal.Body>

              <Modal.Footer></Modal.Footer>
            </Modal>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
