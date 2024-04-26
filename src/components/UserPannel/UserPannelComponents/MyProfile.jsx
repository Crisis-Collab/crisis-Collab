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
    <div className="container mx-auto px-4">
      {loading && (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}

      {!loading && citizenData && (
        <div>
          <h2 className="text-2xl font-bold mb-10 flex flex-row justify-between text-white">Name: {citizenData.name}
            {/* <p>Profile Picture: </p> */}
            <img src={citizenData.profileUrl} alt="profilePic" className="w-24 h-24  object-cover rounded-full" />
          </h2>
          <div className="flex flex-wrap -mx-4 mb-16">
            <div className="w-full md:w-1/2 px-4 mb-4 md:mb-0">
              <div className="mb-4">
                <p className="font-bold text-white">Aadhar Number:</p>
                <p>{citizenData.aadharNumber}</p>
              </div>
              <div className="mb-4">
                <p className="font-bold text-white">Gender:</p>
                <p>{citizenData.gender}</p>
              </div>
              <div className="mb-4">
                <p className="font-bold text-white">Contact:</p>
                <p>{citizenData.phone}</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-4">
              <div className="mb-4">
                <p className="font-bold text-white">Address:</p>
                <p>{citizenData.completeAddress}</p>
              </div>
              <div className="mb-4">
                <p className="font-bold text-white">City:</p>
                <p>{citizenData.city}</p>
              </div>
              <div className="mb-4">
                <p className="font-bold text-white">State:</p>
                <p>{citizenData.state}</p>
              </div>
            </div>
          </div>


          <div className="grid grid-cols-2 gap-6 mb-12">
            <div>
              <p className="font-bold text-white">Aadhar Front:</p>
              <img src={citizenData.aadharFrontUrl} alt="aadharFront" className="w-[16rem] h-40 object-cover" />
            </div>
            <div>
              <p className="font-bold text-white">Aadhar Back:</p>
              <img src={citizenData.aadharBackUrl} alt="aadharBack" className="w-[16rem] h-40 object-cover" />
            </div>
          </div>

          {/* Add more fields as needed */}

        </div>
      )}

    </div>
  );
};

export default MyProfile;
