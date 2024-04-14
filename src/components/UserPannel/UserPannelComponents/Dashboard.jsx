import React, { useState, useEffect, useRef } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, getDocs, collection, where, query } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import redMarkerIcon from '../../../assets/marker-icon-red.png'
import greenMarkerIcon from '../../../assets/marker-icon-green.png'

const redIcon = L.icon({
  iconUrl: redMarkerIcon, 
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const greenIcon = L.icon({
  iconUrl: greenMarkerIcon,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});

const Dashboard = () => {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);
  const [otherAgencies, setOtherAgencies] = useState([]);
  const [otherAgenciesInventory, setOtherAgenciesInventory] = useState({});
  const [showMoreInfo, setShowMoreInfo] = useState({});
  const [showInventory, setShowInventory] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [userType, setUserType] = useState(null); 
  const mapRef = useRef(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.currentUser) {
          const dataRef = doc(db, 'users', auth.currentUser.uid);
          const dataSnap = await getDoc(dataRef);
    
          if (dataSnap.exists()) {
            const userData = dataSnap.data();
            setUserData(userData);
            // console.log("User Type:", userData.userType); 
            if (userData.userType) {
              setUserType(userData.userType);
            }
          } else {
            console.log('Data does not exist');
          }
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Error fetching data. Please try again.");
      } finally {
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
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchData();
    fetchOtherAgencies();
  }, [auth.currentUser, db]);

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

  useEffect(() => {
    let map = null;

    if (mapRef.current && otherAgencies.length > 0 && userData) {
      try {
        map = L.map(mapRef.current).setView([userData.latitude, userData.longitude], 10); 
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors'
        }).addTo(map);


        otherAgencies.forEach(agency => {
          const markerIcon = agency.id === auth.currentUser.uid ? greenIcon : redIcon;
          const distance = calculateDistance(userData.latitude, userData.longitude, agency.latitude, agency.longitude);
          L.marker([agency.latitude, agency.longitude], { icon: markerIcon })
            .addTo(map)
            .bindPopup(`<b>${agency.agencyName}</b><br>Distance: ${distance}`);
        });

        // Display the current user's location with green marker
        const markerIcon = greenIcon;
        const displayName = auth.currentUser.userType === 'citizen' ? userData.name : userData.agencyName || userData.name;
        L.marker([userData.latitude, userData.longitude], { icon: markerIcon })
          .addTo(map)
          .bindPopup(`<b>${displayName}</b><br>You are here`);

        // // Fit the map to display all markers
        // const bounds = otherAgencies.map(agency => [agency.latitude, agency.longitude]);
        // map.fitBounds(bounds);
      } catch (error) {
        console.error('Error initializing map or adding markers:', error);
        setError("Error initializing map or adding markers. Please try again.");
      }
    }

    return () => {
      if (map) {
        map.remove();
      }
    };
  }, [mapRef, otherAgencies, userData]);

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
     <br />
  <div>
  {!loading && !error && userType === 'citizen' && (
        <div>
          <h2>Your Details</h2>
          <p>Your Name: {userData.name}</p>
        </div>
      )}
      {!loading && !error && userType === 'agency-admin' && (
        <div>
          <h2>Current Agency</h2>
          <p>Agency Name: {userData.agencyName}</p>
        </div>
      )}
  </div>


      <br />
      {!loading && !error && otherAgencies.length > 0 && (
        <div>
          <h2>Other Agencies</h2>
          <ul>
            {otherAgencies.map(agency => (
              <li key={agency.id}>
                <p>Agency Name: {agency.agencyName}</p>
                <p>Distance: {calculateDistance(userData.latitude, userData.longitude, agency.latitude, agency.longitude)}</p>
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
      <div ref={mapRef} style={{ height: '400px' }} />
    </div>
  );
};

export default Dashboard;