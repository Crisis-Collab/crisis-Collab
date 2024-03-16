import React , {useState} from "react";



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

    try {
      await result.confirm(otp);
      if(user==='Citizen'?navigate('/citizenDashboard'):navigate('/adminDashboard'));;
    } catch (error) {
      console.error("Error with OTP confirmation:", error);
    }
  };
  return (
    
    <div id='container' onClick={handleOnClose} className=" fixed inset-0 z-[1000]  !mt-0 transition-all ease-in duration-300  grid place-items-center overflow-auto  h-screen w-screen bg-white bg-opacity-5  backdrop-blur-[2px] ">
      
        
        <div className="bg-white bg-opacity-10  shadow-2xl  px-8 py-12   flex items-center flex-col  w-auto mx-4   ">
         
          <form onSubmit={requestOtp} className="bg-black shadow-2xl  p-14 flex items-center justify-center" >
            {!isOtpRequested ? (
              <div>
                {/* Your login form content goes here */}
                {user === "Citizen" ? (
               <h1 className="text-4xl font-semibold space-y-6 mb-6 text-white">Citizen Login</h1>):( <h1 className="text-4xl font-semibold space-y-6 mb-6 text-white">Agency Admin Login</h1>)}
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
              <button className="text-white bg-blue-600 hover:bg-blue-700 px-2 py-1 font-normal rounded-sm " onClick={handleSignUp}>Sign-Up</button>
            </p>
          </div>
        </div>
     
    </div>
    
  );
};

export default LoginOtpModal;
