import React, { useState, useRef } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/LOGO2.png";

import loginLogo from "../../src/assets/LOG2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import {  Modal } from 'flowbite-react';




const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { setUpRecaptcha } = useAuth();
  const [result, setResult] = useState("");
 
 
  
  const handleSignUp=()=>{
    alert('Please Sign-in by your Phone ')
  }

  const requestOtp = async (e) => {
    e.preventDefault();
    setPhoneNumber("");
    console.log(phoneNumber);
    if (phoneNumber === "" || phoneNumber === undefined)
      return console.log("Please enter a valid phone number!");
    try {
      const response = await setUpRecaptcha(phoneNumber);
      setResult(response);
      setIsOtpRequested(true);
    } catch (error) {
      console.error("Error signing in with phonenumber");
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();
    if (otp === "" || otp === null) {
      console.log("Invalid OTP");
      return;
    }

  //   try {
  //     await result.confirm(otp);
  //    navigate('/')
  //   } catch (error) {
  //     console.error("Error with OTP confirmation:", error);
  //   }
  try {
    await result.confirm(otp);
    const userRef = doc(db, "users", auth.currentUser.uid);
    const userSnap = await getDoc(userRef);
    if (userSnap.exists()) {
      const userData = userSnap.data();
      // console.log(`User DATA PROVIDED : ${JSON.stringify(userData)}`);
      if (userData.userType === "agency-admin") {
        navigate("/AdminDashboard");
       
      } else if (userData.userType === "citizen") {
        navigate("/CitizenDashboard");
      } else {
        console.error("Invalid user type");
      }
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Error with OTP confirmation:", error);
  }
};


  return (
    <div
      className="relative flex min-h-screen overflow-y-hidden h-screen   py-2 sm:py-12 bg-white "
      id="login"
    >
      <Link to="/">
        <div className=" flex pl-8  ">
          <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 " />
          <span className="text-red-600 text-2xl font-medium">Crisis</span>
          <span className="text-red-500 font-semibold pt-2"> collab</span>
        </div>
      </Link>
      <div className="grid place-items-center pr-20 w-1/2">
        <img src={loginLogo}/>
      </div>
      <div>
      <div className="animate-bounce   absolute top-[15%] left-[35%] shadow-2xl bg-red-700 transform -translate-x-1/2 -translate-y-1/2 max-w-full  h-32 w-32 m-4 rounded-full   flex text-center">
        <h1 className="absolute top-[35%] left-[20%] text-3xl font-bold ">
          Login
        </h1>
      </div>
     
       
        <div className=" bg-opacity-10  bg-slate-500  shadow-2xl  px-8 py-12  justify-center  flex items-center flex-col  w-auto mx-4   ">
         
          <form onSubmit={requestOtp} className="bg-black shadow-2xl  p-14 flex items-center justify-center" >
            {!isOtpRequested ? (
              <div>
                {/* Your login form content goes here */}
               <div className="grid place-items-center">
               <h1 className="text-4xl font-semibold space-y-6 mb-6 text-white">Login</h1>
               </div>
                <div className=" flex items-center justify-center text-semibold  font-medium ">
                  {" "}
                  
                  <p className="text-white">Enter your Phone Number</p>
                </div>
                <div className="  flex items-center justify-center">
                  <input
                    //  type="text"
                    value={phoneNumber}
                    className="mt-1 p-2 w-45 border rounded-md flex items-center justify-center"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div className="mt-4" id="recaptcha-container"></div>

                <div className="flex pt-6 items-center justify-center">
                  <button
                    onClick={requestOtp}
                    type="submit"
                    className="bg-blue-600 text-white font-medium px-4 py-2  rounded-md hover:bg-blue-700"
                  >
                    Request OTP
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col font-medium ">
                <div className="text-white">Enter the OTP:</div>
                <div className="flex mb-4 pt-4">
                  <input
                    className="mt-1 p-2 w-45 border rounded-md flex items-center justify-center"
                    type="otp"
                    placeholder="Enter OTP"
                    onChange={(e) => setOtp(e.target.value)}
                  />
                </div>

                <button
                  onClick={verifyOtp}
                  type="submit"
                  className="bg-green-500    text-white p-2 rounded-md hover:bg-green-600"
                >
                  Verify OTP
                </button>
              </div>
            )}
          </form>
          <div className=" pt-6 font-medium">
            <p className="text-red-600">
              Don't have an account. Please {" "}
              <button className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 font-normal rounded-md " onClick={handleSignUp}>Sign-Up</button>
            </p>
          </div>
        </div>
        
      </div>
      
    </div>
  );
};

export default Login;
