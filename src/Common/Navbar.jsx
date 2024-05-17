import React, { useEffect, useState } from "react";
import Logo from "../assets/LOGO2.png";
import { Link, useNavigate } from "react-router-dom";
import { FaBarsStaggered, FaXmark } from "react-icons/fa6";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [isSticky, setIsSticky] = useState(false);
  const navigate = useNavigate();

  const handleMenuToggler = () => {
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
      console.log("error occurred while fetching user");
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
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "/" },
    { link: "About", path: "/about" },
    { link: "Service", path: "/service" },
    { link: "Connect", path: "/#connect" },
  ];

  return (
    <header className="w-full fixed top-0 left-0 right-0 transition-all ease-in duration-300 z-50">
      <nav
        className={`pt-4 pb-2 w-full ${
          isSticky
            ? "sticky top-0 left-0 right-0 bg-white backdrop-blur-sm shadow-md text-blue-900"
            : ""
        }`}
      >
        <div className="container mx-auto flex items-center justify-between px-4">
          <Link to="/">
            <div className="flex items-center">
              <img src={Logo} alt="Logo" className="h-8 w-8 mr-2" />
              <span className="text-red-600 text-2xl font-medium">Crisis</span>
              <span className="text-red-500 font-semibold pt-2">collab</span>
            </div>
          </Link>
          <ul className="hidden md:flex space-x-10 font-medium text-base font-itim">
            {navItems.map(({ link, path }) => (
              <li key={path}>
                <a
                  href={path}
                  className="block text-base uppercase cursor-pointer text-red-700 font-semibold hover:text-red-600 hover:text-xl"
                >
                  {link}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <button className="bg-red-600 rounded-3xl hover:bg-red-900 text-white text-sm font-semibold uppercase px-8 py-2 outline-none focus:outline-none mb-1 ease-linear duration-150 hover:shadow-lg transform transition-transform hover:translate-y-1">
                Log in
              </button>
            </Link>
          </div>
          <div className="md:hidden block">
            <button onClick={handleMenuToggler}>
              {isMenuOpen ? (
                <FaXmark className="w-5 h-5 text-primary z-50" />
              ) : (
                <FaBarsStaggered className="w-5 h-5 text-primary" />
              )}
            </button>
          </div>
        </div>
      </nav>
      {isMenuOpen && (
        <div className="md:hidden bg-black text-white px-4 py-5 rounded-sm w-full">
          <ul>
            {navItems.map(({ link, path }) => (
              <li key={path} className="py-1">
                <a
                  href={path}
                  className="block text-base uppercase cursor-pointer text-red-700 font-semibold hover:text-red-600 hover:text-xl"
                >
                  {link}
                </a>
              </li>
            ))}
            <li className="py-1">
              <Link to="/login" className="block uppercase text-red-700 font-semibold hover:text-red-600 hover:text-xl">
                Log In
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
};

export default Navbar;
