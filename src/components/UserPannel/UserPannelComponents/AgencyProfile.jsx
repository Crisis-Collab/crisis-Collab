import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';

const AgencyProfile = () => {
  const [agencyData, setAgencyData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const auth = getAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);
        
        if (userSnap.exists()) {
          const userData = userSnap.data();
          setAgencyData(userData);
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
    <div className=' relative pb-8 pt-2 font-abc '>
      {loading && (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}

      {!loading && agencyData && (
        <div className='flex space-x-2 items-start justify-between'>
          <div className='flex flex-col w-full  rounded-lg'>
         <div className='  p-8 bg-red-800 bg-opacity-10 rounded-lg '>

          <div className='text-4xl font-semibold text-center text-red-600'>{agencyData.agencyName}</div>
          <div className='font-semibold text-center text-black'>{agencyData.agencyDesc}</div>          
         </div>
          
         <div className='flex'>
         <div className='mt-16 p-2  rounded-lg space-y-5 '>
         <h2 className='font-semibold px-10 py-4 text-xl'>Agency Type  </h2>
         <h2 className='font-semibold px-10 py-4 text-xl'>Area of Expertise</h2>
         <h2 className='font-semibold px-10 py-4 text-xl'>Contact</h2>
         <h2 className='font-semibold px-10 py-4 text-xl'>Address </h2>
         <h2 className='font-semibold px-10 py-4 text-xl'>City  </h2>
         <h2 className='font-semibold px-10 py-4 text-xl'>Pincode </h2>
         <h2 className='font-semibold px-10 py-4 text-xl '>State </h2>
         </div>
         <div className='flex flex-col mt-16 p-4  rounded-lg space-y-3  w-96 '>
         <div className='bg-red-800 bg-opacity-10 px-10 py-4 rounded-md text-xl'> {agencyData.agencyType}</div>
         <div className='bg-red-800 bg-opacity-10 px-10 py-4 rounded-md text-xl'> {agencyData.areaOfExpertise}</div>
         <div className='bg-red-800 bg-opacity-10 px-10 py-4 rounded-md text-xl'> {agencyData.agencyConatct}</div>
         <div className='bg-red-800 bg-opacity-10 px-10 py-4 rounded-md text-xl'> {agencyData.completeAddress}</div>
         <div className='bg-red-800 bg-opacity-10 px-10 py-4 rounded-md text-xl'> {agencyData.city}</div>
         <div className='bg-red-800 bg-opacity-10 px-10 py-4 rounded-md text-xl'> {agencyData.pincode}</div>
         <div className='bg-red-800 bg-opacity-10 px-10 py-4 rounded-md text-xl'> {agencyData.state}</div>
        </div>
        <div className='p-4 bg-red-800 bg-opacity-10 mt-16 ml-72 rounded-lg'>
          <h2 className='font-semibold text-3xl  text-center '>Agency Certificate</h2>
        <img src={agencyData.agencyCertificateUrl}/>
         </div>
         </div>
         </div>

         

        </div>
      )}

    </div>
  );
};

export default AgencyProfile;
