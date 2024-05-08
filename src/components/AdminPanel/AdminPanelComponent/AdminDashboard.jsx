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
import Modal from "react-modal";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    zIndex: 1000,
  },
};

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


const AdminDashboard = () => {
  const auth = getAuth();
  const [userData, setUserData] = useState(null);
  const [otherAgencies, setOtherAgencies] = useState([]);
  const [otherCitizens, setOtherCitizens] = useState([]);
  const [otherAgenciesInventory, setOtherAgenciesInventory] = useState({});
  const [showMoreInfo, setShowMoreInfo] = useState({});
  const [showInventory, setShowInventory] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);
  const [selectedAgency, setSelectedAgency] = useState([]);
  const [selectedCitizens, setSelectedCitizens] = useState([]);
  const [userDataLocation, setUserDataLocation] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [modalData, setModalData] = useState(null);
  const [searchText, setSearchText] = useState(""); // State to hold search text
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAgencyMarkers, setSelectedAgencyMarkers] = useState([]);
const [selectedCitizenMarkers, setSelectedCitizenMarkers] = useState([]);
const [selectedMarker, setSelectedMarker] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        if (auth.currentUser) {
          const dataRef = doc(db, "users", auth.currentUser.uid);
          const dataSnap = await getDoc(dataRef);

          if (dataSnap.exists()) {
            const userData = dataSnap.data();
            setUserData(userData);

            navigator.geolocation.getCurrentPosition((position) => {
              const { latitude, longitude } = position.coords;
              console.log("User's current location:", latitude, longitude);
              setUserDataLocation({ latitude, longitude });
            });
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

    const fetchOtherCitizens = async () => {
      try {
        const q = query(
          collection(db, "users"),
          where("userType", "==", "citizen")
        );
        const querySnapshot = await getDocs(q);
        const citizens = [];
        querySnapshot.forEach((doc) => {
          if (doc.id !== auth.currentUser.uid) {
            citizens.push({ id: doc.id, ...doc.data() });
          }
        });
        setOtherCitizens(citizens);
      } catch (error) {
        console.error("Error fetching other citizens:", error);
        setError("Error fetching other citizens. Please try again.");
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 500);
      }
    };

    fetchData();
    fetchOtherAgencies();
    fetchOtherCitizens();
  }, [auth.currentUser, db]);

  useEffect(() => {
    setSelectedAgency(otherAgencies);
  }, [otherAgencies]);

  const openModal = (id, type) => {
    let data;
    if (type === 'agency') {
      data = otherAgencies.find((agency) => agency.id === id);
      
    } else if (type === 'citizen') {
      data = otherCitizens.find((citizen) => citizen.id === id);
     
    } else if (type === 'inventory') {
      if (otherAgenciesInventory[id]) {
        data = { inventory: otherAgenciesInventory[id], type };
      } else {
        console.error('Inventory data not found for agency with ID:', id);
        console.log('Contents of otherAgenciesInventory:', otherAgenciesInventory);
      }
    }

    if (data) {
      console.log('Modal data to be set:', data);
      setModalData(data);
      setModalData({ ...data, type });
      setSelectedMarker({ type, id });
      setModalIsOpen(true);
    } else {
      console.error('Data not found for id:', id);
    }
  };


  useEffect(() => {
    let mapInstance;

    if (mapRef.current && otherAgencies.length > 0 && otherCitizens.length > 0 && userDataLocation && userDataLocation.latitude !== null && userDataLocation.longitude !== null) {
      try {
        mapInstance = L.map(mapRef.current).setView([30, 0], 2);
        L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          attribution: "© OpenStreetMap contributors",
        }).addTo(mapInstance);

        const addAgencyMarkers = (agencies) => {
          const agencyMarkers = [];
          agencies.forEach((agency) => {
            const markerIcon = redIcon;
            const distance = calculateDistance(
              userDataLocation.latitude,
              userDataLocation.longitude,
              agency.latitude,
              agency.longitude
            );
            const directionLink = getDirectionLink(
              userDataLocation.latitude,
              userDataLocation.longitude,
              agency.latitude,
              agency.longitude
            );
            const popupContent = `
              <b>${agency.agencyName}</b><br>
              Distance: ${distance}<br>
              <a href="${directionLink}" target="_blank">Get Directions</a><br>
              <button id="agency-${agency.id}-btn">More Info</button>
              <button id="agency-${agency.id}-inventory-btn">Inventory</button>
            `;
            const marker = L.marker([agency.latitude, agency.longitude], { icon: markerIcon })
              .addTo(mapInstance)
              .bindPopup(popupContent);
        
            marker.on('popupopen', () => {
              const infoButton = document.getElementById(`agency-${agency.id}-btn`);
              const inventoryButton = document.getElementById(`agency-${agency.id}-inventory-btn`);
        
              infoButton.addEventListener('click', () => openModal(agency.id, 'agency'));
              inventoryButton.addEventListener('click', () => handleModalInventoryClick(agency.id));
            });
        
            agencyMarkers.push(marker);
          });
          return agencyMarkers;
        };
        

        const addCitizenMarkers = (citizens) => {
          const citizenMarkers = [];
          citizens.forEach((citizen) => {
            const markerIcon = greenIcon;
            const distance = calculateDistance(
              userDataLocation.latitude,
              userDataLocation.longitude,
              citizen.latitude,
              citizen.longitude
            );
            const directionLink = getDirectionLink(
              userDataLocation.latitude,
              userDataLocation.longitude,
              citizen.latitude,
              citizen.longitude
            );
            const popupContent = `
              <b>${citizen.name}</b><br>
              Distance: ${distance}<br>
              <a href="${directionLink}" target="_blank">Get Directions</a><br>
              <button id="citizen-${citizen.id}-btn">More Info</button>
            `;
            const marker = L.marker([citizen.latitude, citizen.longitude], { icon: markerIcon })
              .addTo(mapInstance)
              .bindPopup(popupContent);
    
            marker.on('popupopen', () => {
              const button = document.getElementById(`citizen-${citizen.id}-btn`);
              button.addEventListener('click', () => openModal(citizen.id, 'citizen'));
            });
    
            citizenMarkers.push(marker);
          });
          return citizenMarkers;
        };

        const getDirectionLink = (userLatitude, userLongitude, markerLatitude, markerLongitude) => {
          // Construct the direction link using the coordinates
          const directionLink = `https://www.google.com/maps/dir/${userLatitude},${userLongitude}/${markerLatitude},${markerLongitude}`;
          return directionLink;
        };
      
         // Clear existing markers
    selectedAgencyMarkers.forEach(marker => marker.remove());
    selectedCitizenMarkers.forEach(marker => marker.remove());

    // Add markers for selected agencies and citizens
    const agenciesMarkers = addAgencyMarkers(selectedAgency);
    const citizensMarkers = addCitizenMarkers(selectedCitizens);

    // Set selected agency and citizen markers
    setSelectedAgencyMarkers(agenciesMarkers);
    setSelectedCitizenMarkers(citizensMarkers);

      } catch (error) {
        console.error("Error initializing map or adding markers:", error);
      }
    }
    return () => {
      if (mapInstance) {
          mapInstance.remove();
      }
  };
  }, [mapRef, otherAgencies, otherCitizens, userDataLocation, searchText, searchResults, selectedAgency, selectedCitizens]);

 
  
   
  

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleMoreInfoClick = (agencyId) => {
    setShowMoreInfo((prevState) => ({
      ...prevState,
      [agencyId]: !prevState[agencyId],
    }));
  };


  const handleSearch = (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredAgencies = otherAgencies.filter((agency) =>
      agency.agencyName.toLowerCase().includes(searchText)
    );
    setSelectedAgency(filteredAgencies);
  
    const filteredCitizens = otherCitizens.filter((citizen) =>
      citizen.name.toLowerCase().includes(searchText)
    );
    setSelectedCitizens(filteredCitizens);
  
    if (filteredAgencies.length === 0 && filteredCitizens.length === 0) {
      setError("No results found.");
    } else {
      setError(null);
    }
  
    // Store the IDs of search results
    const searchResultIds = [...filteredAgencies.map((agency) => agency.id), ...filteredCitizens.map((citizen) => citizen.id)];
    setSearchResults(searchResultIds);
  
   
  };
  
  


  useEffect(() => {
    setSelectedAgency(otherAgencies);
  }, [otherAgencies]);

  useEffect(() => {
    setSelectedCitizens(otherCitizens);
  }, [otherCitizens]);

  const fetchOtherAgenciesInventory = async (agencyId) => {
    try {
      const inventoryRef = collection(db, "users", agencyId, "inventoryList");
      const inventorySnapshot = await getDocs(inventoryRef);
      const inventory = inventorySnapshot.docs.map((doc) => ({
        id: doc.id,
        agencyId,
        equipmentName: doc.data().equipmentName,
        equipmentQuantity: doc.data().equipmentQuantity,
      }));

      // Update the state for the specific agencyId
      setOtherAgenciesInventory((prevState) => ({
        ...prevState,
        [agencyId]: inventory, // Use agencyId as key
      }));
    } catch (error) {
      console.error("Error fetching other agencies inventory:", error);
      setError("Error fetching agency's inventory. Please try again.");
    }
  };

  const handleModalInventoryClick = async (agencyId) => {
    await fetchOtherAgenciesInventory(agencyId);
    openModal(agencyId, 'inventory');
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

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // console.log("lat1:", lat1);
    // console.log("lon1:", lon1);
    // console.log("lat2:", lat2);
    // console.log("lon2:", lon2);
    if (!lat1 || !lon1 || !lat2 || !lon2 || !userDataLocation) {
      return "Unknown";
    }
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    if (distance < 1) {
      return (distance * 1000).toFixed(2) + " meters";
    }

    return distance.toFixed(2) + " kilometers";
  };

  if (!userDataLocation) {
    return <div>
      {loading && (
      <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
        <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900" />
      </div>
    )}</div>;
  }

  return (
    <div className="p-4 font-abc">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900" />
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <div className="bg-zinc-600  bg-opacity-25 p-16">
        <div>
          
            <div>
              <p className="text-2xl font-semibold text-center">Number of Agencies: <span>{otherAgencies.length}</span></p>
              <p className="text-2xl font-semibold text-center ">Number of Citizens: <span>{otherCitizens.length}</span></p>
            </div>
          
        </div>
      </div>
      <div className="flex justify-between space-x-3 p-4">
        <div className="w-full bg-zinc-900 h-screen text-white p-4">
          {!loading && !error && (selectedAgency.length > 0 || selectedCitizens.length > 0) && (
            <div>
              <div className="p-2 text-center mb-2 flex">
                <input
                  type="text"
                  placeholder="Search"
                  className="lg:w-full mb-4  text-black  py-2 pl-3 border focus:outline-none "
                  onChange={handleSearch}
                />
                <button
                  className="bg-red-600 rounded-sm text-white cursor-pointer mb-4  px-6 py-2 font-semibold"
                >
                  Search
                </button>

              </div>
              <div className="pt-6">
                <div className="bg-gray-600 bg-opacity-25 p-4">
                  <ul>
                    {selectedAgency.map((agency) => (
                      <li key={agency.id}>
                        <p>Agency Name: {agency.agencyName}</p>
                        <p>
                          Distance:{" "}
                          {calculateDistance(
                            userDataLocation.latitude,
                            userDataLocation.longitude,
                            agency.latitude,
                            agency.longitude
                          )}
                        </p>
                        <div className="flex justify-between items-center ">
                          <div>
                            <button
                              className="bg-red-600 bg-opacity-25 px-4 py-2 rounded-lg"
                              onClick={() => {
                                handleMoreInfoClick(agency.id);
                              }}
                            >
                              More Info
                            </button>{" "}
                            {showMoreInfo[agency.id] && (
                              <div>
                                <h2>Agency Name: {agency.agencyName}</h2>
                                <p>Agency Description: {agency.agencyDesc}</p>
                                <p>Contact: {agency.agencyConatct}</p>
                                <p>Address: {agency.completeAddress}</p>
                                <p>City: {agency.city}</p>
                                <p>State: {agency.state}</p>
                                <p>Agency Certificate</p>
                                <img
                                  src={agency.agencyCertificateUrl}
                                  alt="agencyCertificate"
                                />
                              </div>
                            )}
                          </div>
                          <div>
                            <button className="bg-green-600 bg-opacity-25 px-4 py-2 rounded-lg"
                              onClick={() => {
                                handleInventoryClick(agency.id);
                              }}
                            >
                              Inventory
                            </button>

                            {otherAgenciesInventory[agency.id] &&
                              showInventory[agency.id] && (
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
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                  <ul>
                    {selectedCitizens.map((citizen) => (
                      <li key={citizen.id}>
                        <p>Citizen Name: {citizen.name}</p>
                        <p>
                          Distance:{" "}
                          {calculateDistance(
                            userDataLocation.latitude,
                            userDataLocation.longitude,
                            citizen.latitude,
                            citizen.longitude
                          )}
                        </p>
                        <div className="flex justify-between items-center">
                          <div>
                            <button
                              className="bg-green-600 bg-opacity-25 px-4 py-2 rounded-lg"
                              onClick={() => {
                                handleMoreInfoClick(citizen.id);
                              }}
                            >
                              More Info
                            </button>
                            {showMoreInfo[citizen.id] && (
                              <div>
                                <h2>Citizen Details</h2>
                                <p>Gender: {citizen.gender}</p>
                                <p>Date of Birth: {citizen.dob}</p>
                                <p>Phone Number: {citizen.phoneNumber}</p>
                                <p>Address: {citizen.completeAddress}, {citizen.city}, {citizen.state}, {citizen.country}, {citizen.pincode}</p>
                                <img src={citizen.profileUrl} alt="Profile"
                                  style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                <img src={citizen.aadharFrontUrl} alt="Aadhar Front"
                                  style={{ maxWidth: '200px', maxHeight: '200px' }} />
                                <img src={citizen.aadharBackUrl} alt="Aadhar Back"
                                  style={{ maxWidth: '200px', maxHeight: '200px' }} />
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

              </div>
            </div>
          )}
        </div>
        <div className="w-full">
          <div className="bg-zinc-900 p-4 ">
            <div className="flex justify-between items-center ">
              <h1 className="text-lg font-semibold text-red-600"> Map View of Agencies and Citizens </h1>
              <div className="flex bg-green-600 bg-opacity-20 py-2 px-3 rounded-xl font-semibold items-center justify-center text-white">Map view <img src={map} /></div>
            </div>
            <div ref={mapRef} style={{ height: "400px " }} className="my-4" />
          </div>
        </div>
      </div>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="More Info Modal"
        overlayClassName="modal-overlay"
      >
        {modalData && (
          <>
            {modalData.type === 'agency' && (
              <>
                <h2>Agency Name: {modalData.agencyName}</h2>
                <p>Agency Description: {modalData.agencyDesc}</p>
                <p>Contact: {modalData.agencyConatct}</p>
                <p>Address: {modalData.completeAddress}, {modalData.city}, {modalData.state}, {modalData.country}, {modalData.pincode}</p>
                <p>Agency Certificate</p>
                <img
                  src={modalData.agencyCertificateUrl}
                  alt="agencyCertificate"
                  style={{ maxWidth: '200px', maxHeight: '200px' }}
                />
              </>
            )}
            {modalData.type === 'citizen' && (
              <>
                <h2>Citizen Details</h2>
                <p>Name: {modalData.name}</p>
                <p>Gender: {modalData.gender}</p>
                <p>Date of Birth: {modalData.dob}</p>
                <p>Phone Number: {modalData.phoneNumber}</p>
                <p>Address: {modalData.completeAddress}, {modalData.city}, {modalData.state}, {modalData.country}, {modalData.pincode}</p>
                <img src={modalData.profileUrl} alt="Profile"
                  style={{ maxWidth: '200px', maxHeight: '200px' }} />
                <img src={modalData.aadharFrontUrl} alt="Aadhar Front"
                  style={{ maxWidth: '200px', maxHeight: '200px' }} />
                <img src={modalData.aadharBackUrl} alt="Aadhar Back"
                  style={{ maxWidth: '200px', maxHeight: '200px' }} />
              </>
            )}
            {modalData.type === 'inventory' && (
              // Display inventory information
              <>
                <h2>Inventory</h2>
                <ul>
                  {modalData.inventory && modalData.inventory.map((item, index) => (
                    <li key={index}>
                      <p>Equipment Name: {item.equipmentName}</p>
                      <p>Quantity: {item.equipmentQuantity}</p>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        )}
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
};

export default AdminDashboard;
