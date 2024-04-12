import React, { useEffect, useState } from "react";
import Logo from "../assets/LOGO2.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";



const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked,setIsClicked] =useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();
  const handelMenuToggler = () => {
    setIsMenuOpen(!isMenuOpen);
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



  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/#about" },
    { link: "News", path: "/news" },
    { link: "Connect", path: "/#connect" },
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
           
              {navItems.map(({ link, path }) => (
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
         
          <Link to="/login">
              <button className="bg-red-600 rounded-3xl text-white  py-2   hover:bg-red-900  font-bold  px-4   hover:shadow-lg transform transition-transform hover:translate-y-1 focus:outline-none ">
                <span className="text-white font-semibold"> Log in </span>
              </button>
            </Link>
           
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
       { navItems.map(({ link, path }) => (
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
