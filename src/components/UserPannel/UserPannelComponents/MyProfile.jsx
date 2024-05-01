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
        <div className='min-h-screen p-2 font-abc'>
          <h1 className='text-2xl font-semibold text-red-600'>Your Profile</h1>
          <div className='flex p-4 bg-zinc-900 container space-x-6 '>
            <div className='w-28 h-28  '>
            <img src={citizenData.profileUrl} alt="profilePic" className='rounded-full w-28 h-28 ' />
            </div>
            <div className='flex flex-col items-start justify-center'>
              <h2 className='text-white text-2xl font-semibold'>{citizenData.name}</h2>
              <p className='text-white'>Gender: {citizenData.gender}</p>
            </div>
          </div>
          
         </div>
      )}

    </div>
  );
};

export default MyProfile;
