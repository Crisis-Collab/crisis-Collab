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
        <div className='flex  space-x-2 items-start justify-between'>
         <div>
          <div className='flex flex-col w-full  rounded-lg space-y-4'>
            <div className='  lg:p-8 bg-zinc-900  rounded-lg shadow-2xl  '>
              <div className='text-4xl font-semibold text-center text-red-600'>{agencyData.agencyName}</div>
              <div className='font-semibold text-center text-gray-100 lg:pt-4'>{agencyData.agencyType},</div>
              <div className='font-semibold text-center text-gray-100'>{agencyData.city}</div>
              <div className='flex lg:pt-7 space-x-6'>
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
            <div className='flex items-center justify-between lg:p-4  bg-zinc-900  rounded-lg shadow-2xl'>
              <h1 className='font-semibold text-lg text-gray-100'>Inventory</h1>
              <button  className='bg-gray-400 hover:bg-zinc-800 bg-opacity-30 text-red-600 font-semibold lg:px-4 lg:py-2 rounded-lg '>See All</button>
              </div>
            
          </div>
         </div>
         <div className='lg:p-2 bg-zinc-900  rounded-lg w-full shadow-2xl'>
              <div className='  flex justify-end space-x-2'>
                <h2 className='font-semibold text-red-500  text-sm'>Latitude- {agencyData.latitude}</h2>
                <h2 className='font-semibold  text-red-500 text-sm'>Longitude- {agencyData.longitude}</h2>
                </div>

               <div>
                <p className='text-lg lg:pt-4 lg:px-3 text-center text-gray-100'>Emergency Numbers .</p>
                </div>
                <div className='lg:pt-20 pb-10'>
                 
                </div> 
            </div>


         </div>

         

       
      )}

    </div>
  );
};

export default AgencyProfile;
