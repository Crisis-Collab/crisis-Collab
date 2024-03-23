import React, { useState } from "react";
import loginLogo from "../assets/log2.png";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import { collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase.config";
import { Modal } from "flowbite-react";
import Navbar from "../Common/Navbar";
import { getAuth } from "firebase/auth";

const Login = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const { setUpRecaptcha } = useAuth();
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const requestOtp = async (e) => {
    e.preventDefault();
    setLoading(true);
  
    // Ensure phoneNumber has +91 prefix if missing
    const formattedPhoneNumber = phoneNumber.startsWith('+91') ? phoneNumber : `+91${phoneNumber}`;
  
    if (phoneNumber === "" || phoneNumber === undefined) {
      console.log("Please enter a valid phone number!");
      setLoading(false);
      return;
    }
  
    try {
      const usersRef = collection(db, "users");
  
      const citizenQuery = query(usersRef, where("phoneNumber", "in", [phoneNumber, formattedPhoneNumber]));
      const citizenSnapshot = await getDocs(citizenQuery);
  
      if (!citizenSnapshot.empty) {
        const citizenData = citizenSnapshot.docs[0].data();
        if (citizenData.userType === "citizen" && (citizenData.phoneNumber === formattedPhoneNumber || citizenData.phoneNumber === phoneNumber)) {
          setResult(await setUpRecaptcha(formattedPhoneNumber));
          setIsOtpRequested(true);
          return;
        } else if (citizenData.userType === "citizen" && (citizenData.phoneNumber === formattedPhoneNumberWithPlus || citizenData.phoneNumber === phoneNumberWithPlus)) {
          setResult(await setUpRecaptcha(phoneNumber)); 
          setIsOtpRequested(true);
          return;
        }
      }
  
      const agencyAdminQuery = query(usersRef, where("agencyConatct", "in", [phoneNumber, formattedPhoneNumber]), where("agencyAdminPhoneNumber", "in", [phoneNumber, formattedPhoneNumber]));
      const agencyAdminSnapshot = await getDocs(agencyAdminQuery);
  
      if (!agencyAdminSnapshot.empty) {
        const adminData = agencyAdminSnapshot.docs[0].data();
        if (adminData.userType === "agency-admin" && (adminData.agencyConatct === formattedPhoneNumber || adminData.agencyAdminPhoneNumber === formattedPhoneNumber || adminData.agencyConatct === phoneNumber || adminData.agencyAdminPhoneNumber === phoneNumber)) {
          setResult(await setUpRecaptcha(formattedPhoneNumber));
          setIsOtpRequested(true);
          return;
        }
        else if (adminData.userType === "agency-admin" && (adminData.agencyConatct === formattedPhoneNumber || adminData.agencyAdminPhoneNumber === formattedPhoneNumber || adminData.agencyConatct === phoneNumber || adminData.agencyAdminPhoneNumber === phoneNumber)) {
          setResult(await setUpRecaptcha(phoneNumber));
          setIsOtpRequested(true);
          return;
        }
      } else {
        console.log("No agency admin user found.");
      }
  
      alert("User not found. Please sign up using the App");
    } catch (error) {
      console.error("Error requesting OTP:", error);
      alert("An error occurred. Please try again later.");
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
        try {
          navigate("/userpannel/dashboard");
        } catch (error) {
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
      className=" bgLogin bg-cover bg-center   relative   min-h-screen overflow-y-hidden "
      id="login"
    >
      <div className="  bg-slate-500  shadow-2xl  w-full"> <Navbar /></div>
      <div className="flex items-center justify-between lg:px-24 px-4 pt-10">
      <div className="grid place-items-center">
        {/* <div className="sm:grid place-items-center hidden pr-20 w-4/5">
          <img src={loginLogo} />
        </div> */}
        <div className="space-y-4 pt-8 text-red-600">
          <h4 className="font-bold text-6xl ">
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
        <div className=" bg-opacity-10  bg-slate-500  shadow-2xl  backdrop-blur-lg px-8 py-12 mt-16 ml-28  justify-center  flex items-center flex-col  w-auto mx-4   ">
          <form
            onSubmit={requestOtp}
            className="  backdrop-blur-md shadow-2xl  p-14 flex items-center justify-center"
          >
            {!isOtpRequested ? (
              <div>
                {/* Your login form content goes here */}
                <div className="grid place-items-center">
                  <h1 className="text-4xl font-bold space-y-6 mb-6 text-black">
                    Login
                  </h1>
                </div>
                <div className=" flex items-center justify-center text-semibold  font-medium ">
                  {" "}
                  <div className="text-white">Enter your Phone Number</div>
                </div>

                <div className="  flex items-center justify-center">
                  <div className="flex items-center justify-center">
                    <span className="text-white mr-2">+91</span>
                    <input
                      placeholder="XXXXXXXXXX"
                      value={phoneNumber}
                      className="mt-1 p-2 w-45 border rounded-md flex items-center justify-center"
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>

                <div className="mt-4" id="recaptcha-container"></div>

                <div className="flex pt-6 items-center justify-center">
                  <button
                   disabled={loading}
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
            <div className="text-red-600">
              Don&apos;t have an account. Please{" "}
              <button
                className="text-blue-700  underline   py-1 font-medium rounded-md "
                onClick={() => setOpenModal(true)}
              >
                Sign-Up
              </button>
              <div>
                <Modal
                  show={openModal}
                  onClose={() => setOpenModal(false)}
                  className=" pt-52 px-96 w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-50"
                >
                  <Modal.Header className="p-4 bg-red-600 text-black"></Modal.Header>

                  <Modal.Body className=" ">
                    <div className="space-y-2 flex flex-col items-center justify-center text-center">
                      <p className="  text-2xl font-semibold leading-relaxed text-red-600 dark:text-gray-400">
                        Please Sign-up by your Phone
                      </p>
                      <div className="text-blue-800 font-medium">
                        Using App
                      </div>
                    </div>
                  </Modal.Body>

                  <Modal.Footer></Modal.Footer>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
     
     

    </div>
  );
};

export default Login;