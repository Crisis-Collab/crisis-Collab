import React, { useState } from "react";
import { getAuth } from "firebase/auth";
import { signInWithEmailAndPassword } from 'firebase/auth';
import Navbar from "../Common/Navbar";
import loginLogo from "../assets/log2.png";

function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const signin = async () => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      localStorage.setItem('user', JSON.stringify(result));
      window.location.href = '/admin/dashboard'
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 300);
    }
  }

  return (
    <div className="   flex sm:flex-row flex-col   overflow-y-hidden min-h-screen w-full p-4 sm:py-8 " id="login">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900"></div>
        </div>
      )}
     
      <div className="bgLogin bg-cover bg-center   rounded-full w-1/2">

      </div>
     
       
      <div className="w-1/2 justify-center pt-10  flex flex-col space-y-4 items-center">
        <div className=" fixed top-5 ">
          
          <h4 className="font-bold text-5xl ">
            Welcome to{" "}
            <span className="text-6xl text-red-600">Crisis-Collab</span>
          </h4>
          <h4 className="font-medium text-2xl text-center text-red-600 font-serif">
            The Disaster Management Platform.
          </h4>
          </div>
         <h1 className="text-center font-semibold text-2xl">Admin Login</h1>
      
        <div className="   px-8 py-12 mt-16  justify-center flex items-center flex-col w-1/2 mx-4">
          <div className=" p-14 flex flex-col items-start justify-center">
            <div className="grid place-items-center">
              
            </div>
            <div className=" flex items-start justify-center text-semibold  font-medium ">
              {" "}
              <div className="text-black text-xl">Enter your E-mail</div>
            </div>
            <div className="flex items-center justify-center">
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-96 border  shadow-lg  bg-white rounded-md"
                placeholder="Email"
                autoComplete="username"
              />
            </div>
            <div className="text-black text-xl font-semibold mt-4">Password</div>
            <div className="flex flex-col items-center justify-center ">
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 w-96 rounded-md border shadow-lg  bg-white "
                placeholder="Password"
                autoComplete="current-password"
              />
            </div>
            <div className="flex pt-6 w-full items-center justify-center">
              <button
                onClick={signin}
                className="bg-red-700 text-white w-full  font-medium px-4 py-2 rounded-md hover:bg-red-900" >
                Login
              </button>
            </div>
          </div>
        </div>
     
          
      
        
      </div>

     
    </div>
  );
}

export default AdminLogin;
