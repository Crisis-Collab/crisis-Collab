import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';


const MyProfile = () => {
  const [citizenData, setCitizenData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const auth = getAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setCitizenData(userData);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      } finally {
        setTimeout(() => {
          setLoading(false); 
        }, 500);
      }
    };

    fetchCurrentUser();
  }, [auth.currentUser.uid]);

  return (
    <div>
      {loading && (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}

      {!loading && citizenData && (
        // <div>
        //   <h2>Name: {citizenData.name}</h2>
        //   <p>Aadhar Number: {citizenData.aadharNumber}</p>
        //   <p>Gender: {citizenData.gender}</p>
        //   <p>Contact: {citizenData.phone}</p>
        //   <p>Address: {citizenData.completeAddress}</p>
        //   <p>City: {citizenData.city}</p>
        //   <p>State: {citizenData.state}</p>
        //   <p>Profile Picture: </p>
        //           <img src={citizenData.profileUrl} alt="profilePic" />
        //   <p>Aadhar Front: </p>
        //           <img src={citizenData.aadharFrontUrl} alt="aadharFront" />
        //   <p>Aadhar Back: </p>
        //           <img src={citizenData.aadharBackUrl} alt="aadharBack" />

        //   {/* Add more fields as needed */}

        // </div>
        <div className=" bg-zinc-900 backdrop-blur-2xl  rounded-md m-4 p-4">
              
              <h2 className=" text-red-600 text-4xl font-semibold text-center p-4">
                Citizen Details
              </h2> 
              <hr ></hr>
              <div className='flex items-center justify-start gap-x-2 py-4'>
                <div className='rounded-full w-20 h-20'>
              <img src={citizenData.profileUrl} alt="profilePic" className='w-20 h-20 rounded-full' />
              </div>
              <h2 className='text-red-600 text-3xl'> {citizenData.name}</h2>
              </div>
              
              <p className="text-red-600 font-semibold lg:mt-10">
                {" "}
                Gender:{" "}
                <span className="text-zinc-100">
                  {" "}
                  {citizenData.gender}
                </span>
              </p>
              <p className="text-red-600 font-semibold">
                Date of Birth:{" "}
                <span className="text-gray-100">
                  {citizenData.dob}
                </span>
              </p>
              <p className="text-red-600 font-semibold">
                Phone Number:{" "}
                <span className="text-gray-100">
                  {citizenData.phoneNumber}
                </span>
              </p>
              <p className="text-red-600 font-semibold">
                Address:{" "}
                <span className="text-gray-100">
                  {citizenData.completeAddress},{" "}
                  {citizenData.city}, {citizenData.state},{" "}
                  {citizenData.country}, {citizenData.pincode}
                </span>
              </p>

              <div className=" flex flex-col items-center justify-center mt-10">
                <div className="text-xl font-semibold text-gray-200">
                  Citizen Aadhar Details
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center w-full space-x-3 m-1 p-2">
                  <div className="w-full p-2 flex justify-center items-center bg-black ">
                    <div className="h-96 lg: w-full ">
                      <p className="font-semibold text-red-600">
                        Aadhar Front:
                      </p>
                      <img
                        className="h-80 w-auto"
                        src={citizenData.aadharFrontUrl}
                        alt="Aadhar Front"
                      />
                    </div>
                  </div>
                  <div className="w-full p-2 flex justify-center items-center bg-black ">
                    <div className="h-96 w-full ">
                      <p className="font-semibold text-red-600">
                        Aadhar Back:
                      </p>
                      <img
                        className="h-80 w-full"
                        src={citizenData.aadharBackUrl}
                        alt="Aadhar Back"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
      )}

    </div>
  );
};

export default MyProfile;
