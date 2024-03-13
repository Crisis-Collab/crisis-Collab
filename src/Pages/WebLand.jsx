import React from 'react'
import Welcome from '../components/Home/Welcome'
import LandContact from '../components/Home/LandContact'
import Footer from '../Common/Footer'
import { Link } from 'react-router-dom'
import Logo from "../assets/LOGO.png";
const WebLand = () => {
  
  return (
    <div>
      <div
        className="bg-cover bg-center min-h-screen "
        style={{ backgroundImage: 'url("/src/assets/fireman.jpg")' }}
      >
        <div className="pt-8">
          <div className='flex item-center justify-between p-2'>
          <div className="flex items-center  px-4 ">
          <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 " />
          <span className="text-orange-400 text-2xl font-medium">Crisis</span>
          <span className="text-cyan-900 font-semibold pt-2"> collab</span>
        </div>
      <div className=' space-x-2'>
        <Link to='/login'>
        <button className="bg-cyan-900 rounded-3xl text-white  py-2   hover:bg-cyan-700  font-bold  px-4  shadow-md hover:shadow-lg transform transition-transform hover:translate-y-1 focus:outline-none focus:ring ">
          <span className="text-orange-400 font-semibold">Log in </span>
        </button>
        </Link>
        <Link to='/signup'>
        <button className="bg-cyan-900 rounded-3xl text-white  py-2   hover:bg-cyan-700  font-bold  px-4  shadow-md hover:shadow-lg transform transition-transform hover:translate-y-1 focus:outline-none focus:ring  ">
          <span className="text-orange-400 font-semibold">Sign up </span>
        </button>
        </Link>
        </div>
          </div>
          <div className=" px-12 pt-24 font-bold text-6xl  text-cyan-950">
            Connecting Rescue
            <span className="pt-96 font-bold text-6xl  text-orange-500">
              Relief{" "}
            </span>
            Agencies{" "}
          </div>
          <div className=" px-12 font-bold text-4xl  text-orange-500">
            with the world.
          </div>
          {/* <div className="px-12 py-4 ">
            <Link to='/login'>
            <button className="bg-cyan-950 rounded-3xl px-8 py-2 ">
              <span className="text-orange-400 font-semibold">
                Get Started{" "}
              </span>
            </button> 
            </Link>
          </div> */}
        </div>
      </div>
      <Welcome/>
      <LandContact/>
      <Footer/>
    </div>
  )
}

export default WebLand
