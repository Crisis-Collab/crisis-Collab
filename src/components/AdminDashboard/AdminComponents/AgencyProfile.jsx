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
    <div>
      {loading && (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}

      {!loading && agencyData && (
        <div>
          <h2>Agency Name: {agencyData.agencyName}</h2>
          <p>Agency Description: {agencyData.agencyDesc}</p>
          <p>Contact: {agencyData.agencyConatct}</p>
          <p>Address: {agencyData.completeAddress}</p>
          <p>City: {agencyData.city}</p>
          <p>State: {agencyData.state}</p>
          <p>Agency Certificate</p>
                  <img src={agencyData.agencyCertificateUrl} alt="agencyCertificate" />
          {/* Add more fields as needed */}
        </div>
      )}

    </div>
  );
};

export default AgencyProfile;
