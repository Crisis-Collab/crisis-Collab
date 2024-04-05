import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';

const Dashboard = () => {
  const auth = getAuth();
  const [currentAgency, setCurrentAgency] = useState(null);
  const [otherAgencies, setOtherAgencies] = useState([]);
  const [otherAgenciesInventory, setOtherAgenciesInventory] = useState({});
  const [showMoreInfo, setShowMoreInfo] = useState({});
  const [showInventory, setShowInventory] = useState({});
  const [error, setError] = useState(null);
  const [loading,setLoading] = useState(true);

  useEffect(() => {
    const fetchCurrentAgency = async () => {
      try {
        const agencyRef = doc(db, 'users', auth.currentUser.uid);
        const agencySnap = await getDoc(agencyRef);

        if (agencySnap.exists()) {
          setCurrentAgency(agencySnap.data());
        } else {
          console.log('Agency does not exist');
        }
      } catch (error) {
        console.error('Error fetching current agency:', error);
        setError("Error fetching current agency. Please try again.");
      }finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    const fetchOtherAgencies = async () => {
      try {
        const q = query(collection(db, 'users'), where('userType', '==', 'agency-admin'));
        const querySnapshot = await getDocs(q);
        const agencies = [];
        querySnapshot.forEach(doc => {
          if (doc.id !== auth.currentUser.uid) {
            agencies.push({ id: doc.id, ...doc.data() });
          }
        });
        setOtherAgencies(agencies);
      } catch (error) {
        console.error('Error fetching other agencies:', error);
        setError("Error fetching other agencies. Please try again.");
      }finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchCurrentAgency();
    fetchOtherAgencies();
  }, [auth.currentUser.uid, db]);

  const fetchOtherAgenciesInventory = async (agencyId) => {
    try {
      const inventoryRef = collection(db, 'users', agencyId, 'inventoryList');
      const inventorySnapshot = await getDocs(inventoryRef);
      const inventory = inventorySnapshot.docs.map(doc => ({
        id: doc.id,
        equipmentName: doc.data().equipmentName,
        equipmentQuantity: doc.data().equipmentQuantity
      }));

      setOtherAgenciesInventory(prevState => ({
        ...prevState,
        [agencyId]: inventory
      }));
    } catch (error) {
      console.error('Error fetching other agencies inventory:', error);
      setError("Error fetching agency's inventory. Please try again.");
    }
  };

  const handleInventoryClick = async (agencyId) => {
    if (!otherAgenciesInventory[agencyId]) {
      await fetchOtherAgenciesInventory(agencyId);
    }

    setShowInventory(prevState => ({
      ...prevState,
      [agencyId]: !prevState[agencyId]
    }));
  };

  const handleMoreInfoClick = async (agencyId) => {
    try {
      const agencyRef = doc(db, 'users', agencyId);
      const agencySnap = await getDoc(agencyRef);

      if (agencySnap.exists()) {
        const agencyData = agencySnap.data();

        setOtherAgencies(prevState => {
          const updatedAgencies = prevState.map(agency => {
            if (agency.id === agencyId) {
              return {
                ...agency,
                ...agencyData
              };
            }
            return agency;
          });
          return updatedAgencies;
        });

        setShowMoreInfo(prevState => ({
          ...prevState,
          [agencyId]: !prevState[agencyId]
        }));
      } else {
        console.log('Agency does not exist');
      }
    } catch (error) {
      console.error('Error fetching agency details:', error);
      setError("Error fetching agency's details. Please try again.");
    }
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    if (distance < 1) {
      return (distance * 1000).toFixed(2) + ' meters';
    }

    return distance.toFixed(2) + ' kilometers';
  };

  return (
    <div>
       {loading && (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}
      {error && (
        <div className="error-message">{error}</div>
      )}
      <h1>Dashboard</h1>
      {!loading && !error && currentAgency && (
        <div>
          <h2>Current Agency</h2>
          <p>Agency Name: {currentAgency.agencyName}</p>
        </div>
      )}
      <br />
      {!loading && !error && otherAgencies.length > 0 && (
        <div>
          <h2>Other Agencies</h2>
          <ul>
            {otherAgencies.map(agency => (
              <li key={agency.id}>
                <p>Agency Name: {agency.agencyName}</p>
                <p>Distance: {calculateDistance(currentAgency.latitude, currentAgency.longitude, agency.latitude, agency.longitude)}</p>
                <button onClick={() => { handleMoreInfoClick(agency.id); }} >More Info</button> <br />
                {showMoreInfo[agency.id] && (
                  <div>
                    <h2>Agency Name: {agency.agencyName}</h2>
                    <p>Agency Description: {agency.agencyDesc}</p>
                    <p>Contact: {agency.agencyConatct}</p>
                    <p>Address: {agency.completeAddress}</p>
                    <p>City: {agency.city}</p>
                    <p>State: {agency.state}</p>
                    <p>Agency Certificate</p>
                    <img src={agency.agencyCertificateUrl} alt="agencyCertificate" />
                  </div>)}
                <button onClick={() => { handleInventoryClick(agency.id); }} >Inventory</button>

                {otherAgenciesInventory[agency.id] && showInventory[agency.id] && (
                  <div>
                    <ul>
                      {otherAgenciesInventory[agency.id].map((item) => (
                        <li key={item.id}>
                          <p>Equipment Name: {item.equipmentName}</p>
                          <p>Quantity: {item.equipmentQuantity}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
