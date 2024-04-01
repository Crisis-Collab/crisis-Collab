import React, { useEffect, useState } from "react";
import Logo from "../assets/LOGO2.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import Avatar from '../assets/citizenAVa.jpg';
import { Modal } from 'flowbite-react';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked,setIsClicked] =useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const handelMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsClicked(!isClicked);
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
    getUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.addEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout=()=>{
    auth.signOut().then(()=>{
      navigate('/');
      console.log("Logout Successfull");
      console.log(auth);
    })
  }

  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/#about" },
    { link: "News", path: "/news" },
    { link: "Connect", path: "/#connect" },
  ];

  const loginNAv = [
    { link: "Home", path: "/CitizenDashboard" },
    { link: "About", path: "/about" },
    { link: "News", path: "/news" },
    { link: "Services", path: "/service" },
    { link: "Weather", path: "/weather" },
    
  ];

  return (
    <header className="w-full bg-transparent fixed top-0 left-0 right-0 transition-all ease-in duration-300 max-w-screen-2xl container     ">
      <nav
        className={`pt-4 pb-2  ${
          isSticky
            ? "sticky top-0 left-0 right-0 bg-transparent  backdrop-blur-sm  text-blue-900"
            : ""
        }`}
      >
        <div className="flex items-center justify-between container">
          <Link to="/">
            <div className="flex items-center pl-8">
              <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 " />
              <span className="text-red-600 text-2xl font-medium">Crisis</span>
              <span className="text-red-500 font-semibold pt-2"> collab</span>
            </div>
          </Link>
          <ul className="md:flex space-x-10 font-medium ml-42 text-base font-itim hidden">
            {user && user.userType === "citizen"
              ? loginNAv.map(({ link, path }) => (
                  <a
                    key={path}
                    href={path}
                    className="block text-base uppercase cursor-pointer text-red-700 font-semibold hover:text-red-600 hover:text-xl"
                  >
                    {link}
                  </a>
                ))
              : navItems.map(({ link, path }) => (
                  <a
                    key={path}
                    href={path}
                    className="block text-base uppercase cursor-pointer text-red-700 font-semibold hover:text-red-600 hover:text-xl"
                  >
                    {link}
                  </a>
                ))}
          </ul>
          <div className=" hidden lg:block">
         { user && user.userType === "citizen"? 
         <div className="relative flex items-center justify-center">
      
         <button onClick={toggleDropdown} className="focus:outline-none flex space-x-1  pr-2" >
         <img
               src={Avatar} // Replace with your avatar image
               alt="Avatar"
               className="w-10 h-10 rounded-full "/>
          </button>
          <div> {user.name}</div>
          {isOpen && (
            <div className="absolute z-30  top-8 right-0 flex flex-col justify-between items-center my-6   bg-black rounded pl-8 pr-8">
            

              <button
                className="  w-full items-center my-1 px-4 mb-4 mt-4 py-2 text-sm transition-all font-medium rounded-md text-white hover:bg-red-700 bg-red-600 "
                onClick={() => setOpenModal(true)}
              >
                Logout
              </button>
              <div >
              <Modal show={openModal} onClose={() => setOpenModal(false)} className=" pt-52 px-[500px] w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
         
                <Modal.Header className=" text-black p-2 text-xl "></Modal.Header>
                
                <Modal.Body className=" ">
                  <div className="space-y-2 flex flex-col items-center justify-center text-center">
                   
                    <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-400">
                     Are you sure you want to Logout? 
                    </p>
                    <div className="flex space-x-8">
                    <button className="bg-green-600 px-8 py-2 rounded-lg text-white font-medium  " onClick={handleLogout}>Yes</button>
                   
                    <button className="bg-red-700 px-8 py-2 rounded-lg text-white font-medium   " onClick={()=> setOpenModal(false)}>No</button>
                   
                    </div>
                   
                  </div>
                </Modal.Body>

                <Modal.Footer>
                 
                </Modal.Footer>
                
              </Modal>
              </div>
            </div>
          
          )}
           </div>
          : <Link to="/login">
              <button className="bg-red-600 rounded-3xl text-white  py-2   hover:bg-red-900  font-bold  px-4   hover:shadow-lg transform transition-transform hover:translate-y-1 focus:outline-none ">
                <span className="text-white font-semibold"> Log in </span>
              </button>
            </Link>}
           
          </div>
          <div className="md:hidden block">
            <button onClick={handelMenuToggler}>
              {isMenuOpen ? (
                <FaXmark className=" w-5 h-5 text-primary z-50" />
              ) : (
                <FaBarsStaggered className=" w-5 h-5 text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {/* navItems for mobile */}
      <div
        className={`px-4 bg-black  py-5 rounded-sm ${
          isMenuOpen ? "" : "hidden"
        }`}
      >
        <ul>
        {user && user.userType === "citizen" ? loginNAv.map(({ link, path }) => (
    <a key={path} href={path} className="block text-base uppercase cursor-pointer text-red-700 font-semibold hover:text-red-600 hover:text-xl">{link}</a>
  )) : navItems.map(({ link, path }) => (
    <a key={path} href={path} className="block text-base uppercase cursor-pointer text-red-700 font-semibold hover:text-red-600 hover:text-xl">{link}</a>
  ))}
          <li className="text-white py-1">
            <Link to="/log-in">Log In</Link>
          </li>
        </ul>
      </div>
    </header>
  );
};

export default Navbar;
