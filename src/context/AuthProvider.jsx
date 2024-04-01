import React, { createContext, useContext, useEffect, useState } from 'react'
import { RecaptchaVerifier, onAuthStateChanged, signInWithPhoneNumber } from 'firebase/auth';

import { auth } from '../firebase/firebase.config';
export const AuthContext = createContext();
// const auth = getAuth(app);

export function AuthProvider ({children}) {
  const [user, setUser] = useState({});
    const [loading,setLoading]= useState(true);
   

    const setUpRecaptcha= async (phoneNumber) =>{
      const recaptchaVerifier = new RecaptchaVerifier(
          auth,
        "recaptcha-container",
        {}
        
      );
      // timeout: 5000,
      recaptchaVerifier.render();
      if (!phoneNumber.startsWith("+91")) {
        phoneNumber = "+91" + phoneNumber;
      }
      return signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    
    }

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
        console.log("Auth", currentUser);
        setUser(currentUser);
        setLoading(false);
      });
  
      return () => {
        unsubscribe();
      };
    }, []);
  
    
    
    const value ={
        user,
        setUpRecaptcha,
       
    };

  return (
   <AuthContext.Provider value={value} >
    {!loading && children}
   </AuthContext.Provider>
  )
 
}

export const useAuth = () => {
    return useContext(AuthContext);
}
