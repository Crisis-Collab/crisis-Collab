import React, { useState, useRef } from "react";
import logo from '../assets/img14.jpg'
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";

const Login = () => {

  const [phoneNumber, setPhoneNumber] = useState("")
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { setUpRecaptcha } = useAuth();
  const [result, setResult] = useState("");


  const requestOtp = async (e) => {
    e.preventDefault();
    setPhoneNumber("");
    console.log(phoneNumber)
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

    try {
      await result.confirm(otp);
      navigate("/");
    } catch (error) {
      console.error("Error with OTP confirmation:", error);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center py-6 flex justify-center  items-center sm:py-12"
      style={{ backgroundImage: 'url("/src/assets/fireman.jpg")' }}>
      <div className="relative  py-6 sm:max-w-xl sm:mx-auto">
        <div className="bg-white bg-opacity-60 p-16 sm:p-6   rounded shadow-md w-auto mx-4 md:mx-auto  ">

          <div className=" mb-6 flex items-center  justify-center text-3xl font-semibold "><span className="text-orange-500 ">Welcome to</span> <span className="text-cyan-900 pl-2">Crisis Collab</span></div>
          <div className='flex items-center justify-center'>
            <img src={logo} alt="" className='w-20 h-20' />
          </div>
          <form onSubmit={requestOtp} >

            {!isOtpRequested ?
              (<div>

                {/* Your login form content goes here */}
                <div className=" text-semibold  font-medium flex items-center justify-center"> <p>Enter your Phone Number</p></div>
                <div className='  flex items-center justify-center'>
                  <input
                    //  type="text"
                    value={phoneNumber}
                    className="mt-1 p-2 w-45 border rounded-md flex items-center justify-center"

                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div id="recaptcha-container"></div>

                <div className='flex pt-6 items-center justify-center'>
                  <button onClick={requestOtp}
                    type="submit"
                    className="bg-cyan-900 text-white font-medium px-4 py-2  rounded-md hover:bg-cyan-700"
                  >
                    Request OTP
                  </button>

                </div>
              </div>) :
              (
                <div className="flex flex-col font-medium items-center justify-center">
                  <div>Enter the OTP:</div>
                  <div className="flex mb-4 pt-4">
                    <input

                      className="mt-1 p-2 w-45 border rounded-md flex items-center justify-center"
                      type="otp"
                      placeholder="Enter OTP"
                      onChange={(e) => setOtp(e.target.value)} />

                  </div>


                  <button onClick={verifyOtp} type="submit" className="bg-green-500    text-white p-2 rounded-md hover:bg-green-600">
                    Verify OTP
                  </button>

                </div>
              )
            }

          </form>
          <div className="pl-8 pt-6 font-medium">
            <p>
              Don't have an account. Please {" "}
              <Link to="/signup" className="text-blue-600">
                Signup
              </Link>

            </p>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Login