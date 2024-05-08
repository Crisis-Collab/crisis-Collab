import React, { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";
import {
  doc,
  getDoc,
  getDocs,
  collection,
  where,
  query,
} from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import redMarkerIcon from "../../../assets/marker-icon-red.png";
import greenMarkerIcon from "../../../assets/marker-icon-green.png";
import map from '../../../assets/mapgif.gif';
import { IoCallSharp } from "react-icons/io5";
import { useNavigate } from 'react-router-dom'
import AgencyMoreInfo from "./AgencyMoreInfo";
import { FaLocationDot } from "react-icons/fa6";

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
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [AgencyPerPage] = useState(4);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.currentUser) {
          const dataRef = doc(db, "users", auth.currentUser.uid);
          const dataSnap = await getDoc(dataRef);

          if (dataSnap.exists()) {
            const userData = dataSnap.data();
            setUserData(userData);
            if (userData.userType) {
              setUserType(userData.userType);
            }
          } else {
            console.log("Data does not exist");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Error fetching data. Please try again.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    const fetchOtherAgencies = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("userType", "==", "agency-admin")
        );
        const querySnapshot = await getDocs(q);
        const agencies = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== auth.currentUser.uid) {
            agencies.push({ id: doc.id, ...doc.data() });
          }
        });
        setOtherAgencies(agencies);
      } catch (error) {
        console.error("Error fetching other agencies:", error);
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
      const inventoryRef = collection(db, "users", agencyId, "inventoryList");
      const inventorySnapshot = await getDocs(inventoryRef);
      const inventory = inventorySnapshot.docs.map((doc) => ({
        id: doc.id,
        equipmentName: doc.data().equipmentName,
        equipmentQuantity: doc.data().equipmentQuantity,
      }));

      setOtherAgenciesInventory((prevState) => ({
        ...prevState,
        [agencyId]: inventory,
      }));
    } catch (error) {
      console.error("Error fetching other agencies inventory:", error);
      setError("Error fetching agency's inventory. Please try again.");
    }
  };

  const handleInventoryClick = async (agencyId) => {
    if (!otherAgenciesInventory[agencyId]) {
      await fetchOtherAgenciesInventory(agencyId);
    }

    setShowInventory((prevState) => ({
      ...prevState,
      [agencyId]: !prevState[agencyId],
    }));
  };

  const handleMoreInfoClick = (agencyId) => {
    setSelectedAgency(agencyId);
    navigate(`/userpannel/dashboard/${agencyId}/more-info`);
  };

  const handleMoreInfoClickClose = () => {
    setSelectedAgency(null);
    navigate(`/userpannel/dashboard`);
  };

  useEffect(() => {
    let map = null;

    if (mapRef.current && otherAgencies.length > 0 && userData) {
      try {
        map = L.map(mapRef.current).setView(
          [userData.latitude, userData.longitude],
          10
        );
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(map);

      // Inside the useEffect where you initialize the map and markers
otherAgencies.forEach((agency) => {
  const markerIcon =
    agency.id === auth.currentUser.uid ? greenIcon : redIcon;
  const distance = calculateDistance(
    userData.latitude,
    userData.longitude,
    agency.latitude,
    agency.longitude
  );
  const popupContent = `
  <b>${agency.agencyName}</b><br>
  Distance: ${distance}<br>
  <button class="route-btn" data-agencyid="${agency.id}" style=" color: blue;">Get Directions</button>
`;
  const marker = L.marker([agency.latitude, agency.longitude], { icon: markerIcon })
    .addTo(map)
    .bindPopup(popupContent);
  marker.on('popupopen', () => {
    document.querySelector('.route-btn').addEventListener('click', () => {
      handleGetDirections(agency.latitude, agency.longitude);
    });
  });
});

// Function to handle the click event of the "Get Directions" button
const handleGetDirections = (destLat, destLng) => {
  // Use the destLat and destLng to calculate the route from the user's location
  // You can use a routing service like Google Maps Directions API or Mapbox Directions API
  // For example, you can open a new window with a Google Maps URL to display the route
  const origin = `${userData.latitude},${userData.longitude}`;
  const destination = `${destLat},${destLng}`;
  const url = `https://www.google.com/maps/dir/?api=1&origin=${origin}&destination=${destination}`;
  window.open(url, '_blank');
};


        const markerIcon = greenIcon;
        const displayName =
          auth.currentUser.userType === "citizen"
            ? userData.name
            : userData.agencyName || userData.name;
        L.marker([userData.latitude, userData.longitude], { icon: markerIcon })
          .addTo(map)
          .bindPopup(`<b>${displayName}</b><br>You are here`);
      } catch (error) {
        console.error("Error initializing map or adding markers:", error);
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
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    if (distance < 1) {
      return (distance * 1000).toFixed(2) + " meters";
    }

    return distance.toFixed(2) + " kilometers";
  };

  const filteredItem = otherAgencies.filter((agency) =>
    agency.agencyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastAgency = currentPage * AgencyPerPage;
  const indexOfFirstAgency = indexOfLastAgency - AgencyPerPage;
  const currentAgency = filteredItem.slice(
    indexOfFirstAgency,
    indexOfLastAgency
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredItem.length / AgencyPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  return (
    <div className="p-4 font-abc">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900" />
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      {!loading && !selectedAgency && (
        <div>
          <div>
            
            {!loading && !error && userType === "citizen" && (
              <div>
                <h2>Your Details</h2>
                <p>Your Name: {userData.name}</p>
              </div>
            )}
            {!loading && !error && userType === "agency-admin" && (
              <div className="p-4 my-2 mx-4 bg-zinc-900 flex items-center justify-between text-gray-100">
                <div>
                  <h1 className="font-semibold text-2xl text-red-600">{userData.agencyName}</h1>
                  <h2>Department : {userData.agencyType}</h2>
                </div>
                <div className="flex item-center justify-between space-x-2 ">
                  <IoCallSharp className="text-red-600 w-6 h-6" />
                  <h2 className="text-red-600 font-semibold underline">{userData.agencyConatct}</h2>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between space-x-3 p-4">
            <div className="w-full bg-zinc-900 h-screen flex flex-col justify-between  text-white p-4">
              <div>
                {!loading && !error && otherAgencies.length > 0 && (
                  <div className="pt-8">
                    <div className="  text-center w-full  flex items-center justify-center space-x-3">
                      <input
                        type="text"
                        placeholder="Search "
                        className="w-6/12 lg:w-full bg-zinc-400 bg-opacity-25 border-none py-2 pl-3 border focus:outline-none "
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                      />
                      <button className="bg-red-600 rounded-sm text-white cursor-pointer   px-8 py-2 font-semibold">
                        Search
                      </button>
                    </div>
                    <h2 className="text-center text-xl font-semibold p-2">Other Agencies near you </h2>
                    <div className="bg-zinc-600  bg-opacity-25 p-4">
                      <ul>
                        {filteredItem.map((agency) => (
                          
                          <li key={agency.id}>
                            <div className="flex justify-between items-center">
                              <div>
                            <p className="text-red-600 font-semibold">Agency Name: <span className="text-gray-100 font-semibold">{agency.agencyName}</span> </p>
                            <p className="text-red-600 font-semibold">
                              Distance:{" "} <span className="text-gray-100 font-semibold"> {calculateDistance(
                                userData.latitude,
                                userData.longitude,
                                agency.latitude,
                                agency.longitude
                              )}</span>
                             
                            </p>
                            </div>
                            <div>
                            
                                <button className="bg-red-600  px-4 py-2 rounded-lg"
                                  onClick={() => {
                                    handleMoreInfoClick(agency.id);
                                  }}
                                >
                                  More Info
                                </button>    
                                </div>
                                </div>
                          </li>
                       
                        ))}

                      </ul>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between mt-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-red-600 rounded-lg text-white disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredItem.length / AgencyPerPage)
                  }
                  className="px-4 py-2 bg-red-600 rounded-lg text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
            <div className="w-full">
            <div className="p-2 flex items-center justify-center space-x-2">
                  <h1 className="text-4xl font-bold text-red-600">Unified Agency Locator</h1>
                  <FaLocationDot className="w-10 h-10" />
                </div>
              
              <div>
                
              <div className="bg-zinc-900 p-4 ">
                
                <div className="flex justify-between items-center ">
                  <h1 className="text-lg font-semibold text-red-600"> Other Agencies near you in </h1>
                  {/* <div className="flex bg-green-600 bg-opacity-20 py-2 px-3 rounded-xl font-semibold items-center justify-center text-white">Map view <img src={map} /></div> */}

                </div>

                <div ref={mapRef} style={{ height: "400px " }} className="my-4" />
              </div>
              
              </div>
            </div>
          </div>
        </div>
      )}

      {selectedAgency && (
        <div>
          <AgencyMoreInfo
            agencyId={selectedAgency}
            handleMoreInfoClickClose={handleMoreInfoClickClose} />
        </div>
      )}

    </div>
  );
};

export default Dashboard;
