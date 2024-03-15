import React , {useState} from "react";
import {useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthProvider";

const LoginOtpModal = ({ user ,onClose}) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isOtpRequested, setIsOtpRequested] = useState(false);
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();
  const { setUpRecaptcha } = useAuth();
  const [result, setResult] = useState("");

  const handleOnClose=(e)=>{
    if(e.target.id==="container") onClose();
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

    try {
      await result.confirm(otp);
      navigate("/citizenDashboard");
    } catch (error) {
      console.error("Error with OTP confirmation:", error);
    }
  };
  return (
    
    <div id='container' onClick={handleOnClose} className="border-orange-600 fixed inset-0 z-[1000]  !mt-0 transition-all ease-in duration-300  grid place-items-center overflow-auto  h-screen w-screen bg-white bg-opacity-5  backdrop-blur-[2px] ">
      {user === "Citizen" ? (
        
        <div className="bg-red-600 shadow-2xl rounded-full p-16   flex items-center flex-col  w-auto mx-4   ">
         
          <form onSubmit={requestOtp}>
            {!isOtpRequested ? (
              <div>
                {/* Your login form content goes here */}
                <div className=" text-semibold  font-medium flex items-center justify-center">
                  {" "}
                  <p>Enter your Phone Number</p>
                </div>
                <div className="  flex items-center justify-center">
                  <input
                    //  type="text"
                    value={phoneNumber}
                    className="mt-1 p-2 w-45 border rounded-md flex items-center justify-center"
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
                <div id="recaptcha-container"></div>

                <div className="flex pt-6 items-center justify-center">
                  <button
                    onClick={requestOtp}
                    type="submit"
                    className="bg-black text-white font-medium px-4 py-2  rounded-md hover:bg-cyan-700"
                  >
                    Request OTP
                  </button>
                </div>
              </div>
            ) : (
              <div className="flex flex-col font-medium items-center justify-center">
                <div>Enter the OTP:</div>
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
          <div className="pl-8 pt-6 font-medium">
            <p>
              Don't have an account. Please{" "}
              <button className="text-blue-800 hover:underline">Sign-Up</button>
            </p>
          </div>
        </div>
      ) : (
        <div>Kanchaniyaaaaaaa</div>
      )}
    </div>
    
  );
};

export default LoginOtpModal;
