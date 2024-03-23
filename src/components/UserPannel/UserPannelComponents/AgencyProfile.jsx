import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import BarChartComponent from './BarChartComponent';


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
    <div className='  relative pb-8 pt-2 font-abc '>
      {loading && (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}

      {!loading && agencyData && (
        <div className='flex  space-x-4    items-start justify-between'>
         <div className='w-full'>
        
          <div className='flex flex-col bg-zinc-900  rounded-lg space-y-4'>
          <div className='  flex justify-end space-x-2 p-1'>
                <h2 className='font-semibold text-red-500  text-sm'>Latitude- {agencyData.latitude}</h2>
                <h2 className='font-semibold  text-red-500 text-sm'>Longitude- {agencyData.longitude}</h2>
                </div>
            <div className='  lg:p-8  backdrop-filter backdrop-blur-lg rounded-lg shadow-2xl  '>
              <div className='text-4xl font-semibold text-center text-red-600'>{agencyData.agencyName}</div>
              <div className='font-semibold text-center text-gray-100 lg:pt-4'>{agencyData.agencyType},</div>
              <div className='font-semibold text-center text-gray-100'>{agencyData.city}</div>
              <div className='flex lg:pt-7 item-center justify-center lg:space-x-9'>
                <div className='bg-gray-100 px-4 py-2 rounded-lg '>
                <div className='font-semibold text-center text-black '>Agency Contact </div>
                <div className='font-semibold text-center text-black'>{agencyData.agencyAdminPhoneNumber}</div>
              </div>
              <div className='bg-gray-100 px-4 py-2 rounded-lg'>
                <div className='font-semibold text-center text-black '>Admin Contact </div>
                <div className='font-semibold text-center text-black'>{agencyData.agencyConatct}</div>
              </div>
              </div>
              <div>
              <div className='font-semibold text-center text-gray-100 lg:pt-16' >Address- {agencyData.completeAddress},</div>
              <div className='flex space-x-4 item-center justify-center'>
              <div className='font-semibold text-center text-gray-400 ' >{agencyData.state}</div>
              <div className='font-semibold text-center text-gray-400 ' > {agencyData.pincode}</div>
             </div>
             </div>
            </div>
            
            
          </div>
          <div className='flex flex-col items-center mt-4 rounded-lg bg-zinc-900'>
                <p className='text-2xl lg:pt-4  text-center text-red-600'>Certificate</p>
                <img src={agencyData.agencyCertificateUrl}/>
                </div>
                
         </div>
         <div className='lg:p-4 bg-zinc-900  rounded-lg  shadow-2xl'>
             <h1 className='text-red-600 text-3xl font-semibold text-center'>Yearly Rescue Activity Comparison </h1>
             <h3 className='text-red-300 text-sm font-medium text-center'>This Year vs. Last Year</h3>
             <BarChartComponent/>              
            </div>


         </div>

         

       
      )}

    </div>
  );
};

export default AgencyProfile;
