import React, { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../assets/LOGO2.png";
import loginLogo from "../assets/log2.png"
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../firebase/firebase.config";
import { Modal } from 'flowbite-react';


const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { setUpRecaptcha } = useAuth();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);




  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (phoneNumber === "" || phoneNumber === undefined)
      return console.log("Please enter a valid phone number!");
    try {

      const response = await setUpRecaptcha(phoneNumber);
      setResult(response);
      setIsOtpRequested(true);

      setLoading(false)
    }
    catch (error) {
      console.error("Error signing in with phonenumber", error);

    } finally {
      setLoading(false);
    }
  };


  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (otp === "" || otp === null) {
      console.log("Invalid OTP");
      setLoading(false);
      return;
    }


    try {
      await result.confirm(otp);
      const userRef = doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const userData = userSnap.data();
        // console.log(`User DATA PROVIDED : ${JSON.stringify(userData)}`);
        if (userData.userType === "agency-admin") {
          navigate("/adminDashboard/dashboard");

        } else if (userData.userType === "citizen") {
          navigate("/CitizenDashboard");
        } else {
          console.error("Invalid user type");
        }
      } else {
        alert("User not found. Please sign up");
      }
    } catch (error) {
      alert("Incorrect OTP. Please try again");
    } finally {
      setLoading(false);
    }

  };


  return (
    <div
      className=" bgLogin px-2  relative flex sm:flex-row flex-col  min-h-screen overflow-y-hidden h-screen pr-10  py-2 sm:py-8 bg-white "
      id="login"
    >
      <Link to="/">
        <div className=" flex pl-8  ">
          <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 " />
          <span className="text-red-600 text-2xl font-medium">Crisis</span>
          <span className="text-red-500 font-semibold pt-2"> collab</span>
        </div>
      </Link>

      <div className="grid place-items-center">
        <div className="sm:grid place-items-center hidden pr-20 w-4/5">
          <img src={loginLogo} />
        </div>
        <div className="space-y-4 pt-8">
          <h4 className="font-semibold text-5xl ">
            Welcome to{" "}
            <span className="text-6xl text-red-600">Crisis-Collab</span>
          </h4>
          <h4 className="font-medium text-2xl text-red-600 font-serif">
            The Disaster Management Platform.
          </h4>
        </div>
      </div>


      <div>


        {/* {loading ? <LoadingSpinner /> : null} */}
        <div className=" bg-opacity-10  bg-slate-500  shadow-2xl  px-8 py-12 mt-16 ml-28  justify-center  flex items-center flex-col  w-auto mx-4   ">

          <form onSubmit={requestOtp} className="bg-gradient-to-r from-zinc-300 to-red-50 shadow-2xl  p-14 flex items-center justify-center" >
            {!isOtpRequested ? (
              <div>
                {/* Your login form content goes here */}
                <div className="grid place-items-center">
                  <h1 className="text-4xl font-semibold space-y-6 mb-6 text-black">Login</h1>
                </div>
                <div className=" flex items-center justify-center text-semibold  font-medium ">
                  {" "}

                  <p className="text-black">Enter your Phone Number</p>
                </div>
                <div className="  flex items-center justify-center">
                  <input
                    placeholder="XXXXXXXXXX"
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
                    className="bg-red-700 text-white font-medium px-4 py-2  rounded-md hover:bg-red-900"
                  // disabled={loading}
                  >
                    {/* {loading && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
                      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
                    </div>
                  )} */}

                    {/* {loading ? "Loading..." : "Request OTP"} */}
                    Request OTP
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col font-medium ">
                <div className="text-black">Enter the OTP:</div>
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
                  className="bg-green-600    text-white p-2 rounded-md hover:bg-green-700"
                  disabled={loading}
                >
                  {loading && (
                    <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
                      <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
                    </div>
                  )}
                  {/* {loading ? "Loading..." : "Verify OTP"} */}
                  Verify OTP
                </button>
              </div>
            )}
          </form>
          <div className=" pt-6 font-medium">
            <p className="text-red-600">
              Don&apos;t have an account. Please{" "}
              <button
                className="text-blue-700  underline   py-1 font-medium rounded-md "
                onClick={() => setOpenModal(true)}
              >
                Sign-Up
              </button>
              <div >
                <Modal show={openModal} onClose={() => setOpenModal(false)} className=" pt-52 px-96 w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">

                  <Modal.Header className="p-4"></Modal.Header>

                  <Modal.Body className=" ">
                    <div className="space-y-2 flex flex-col items-center justify-center text-center">

                      <p className="  text-2xl leading-relaxed text-gray-500 dark:text-gray-400">
                        Please Sign-up by your Phone
                      </p>
                      <p className="text-blue-800 font-medium">Link of the App</p>
                    </div>
                  </Modal.Body>

                  <Modal.Footer>

                  </Modal.Footer>

                </Modal>
              </div>
            </p>
          </div>
        </div>

      </div>

    </div>
  );
};

export default Login;