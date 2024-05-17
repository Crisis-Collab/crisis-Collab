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
import map from "../../../assets/mapgif.gif";
import Modal from "react-modal";
import { AiFillSafetyCertificate } from "react-icons/ai";
import { IoClose } from "react-icons/io5";
import { SiGoogleanalytics } from "react-icons/si";
import { MdInventory } from "react-icons/md";
import { TiInfo } from "react-icons/ti";

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
  const [displayMode, setDisplayMode] = useState("agencies");

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
    if (type === "agency") {
      data = otherAgencies.find((agency) => agency.id === id);
    } else if (type === "citizen") {
      data = otherCitizens.find((citizen) => citizen.id === id);
    } else if (type === "inventory") {
      if (otherAgenciesInventory[id]) {
        data = { inventory: otherAgenciesInventory[id], type };
      } else {
        console.error("Inventory data not found for agency with ID:", id);
        console.log(
          "Contents of otherAgenciesInventory:",
          otherAgenciesInventory
        );
      }
    }

    if (data) {
      console.log("Modal data to be set:", data);
      setModalData(data);
      setModalData({ ...data, type });
      setSelectedMarker({ type, id });
      setModalIsOpen(true);
    } else {
      console.error("Data not found for id:", id);
    }
  };

  useEffect(() => {
    let mapInstance;

    if (
      mapRef.current &&
      otherAgencies.length > 0 &&
      otherCitizens.length > 0 &&
      userDataLocation &&
      userDataLocation.latitude !== null &&
      userDataLocation.longitude !== null
    ) {
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
            const marker = L.marker([agency.latitude, agency.longitude], {
              icon: markerIcon,
            })
              .addTo(mapInstance)
              .bindPopup(popupContent);

            marker.on("popupopen", () => {
              const infoButton = document.getElementById(
                `agency-${agency.id}-btn`
              );
              const inventoryButton = document.getElementById(
                `agency-${agency.id}-inventory-btn`
              );

              infoButton.addEventListener("click", () =>
                openModal(agency.id, "agency")
              );
              inventoryButton.addEventListener("click", () =>
                handleModalInventoryClick(agency.id)
              );
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
            const marker = L.marker([citizen.latitude, citizen.longitude], {
              icon: markerIcon,
            })
              .addTo(mapInstance)
              .bindPopup(popupContent);

            marker.on("popupopen", () => {
              const button = document.getElementById(
                `citizen-${citizen.id}-btn`
              );
              button.addEventListener("click", () =>
                openModal(citizen.id, "citizen")
              );
            });

            citizenMarkers.push(marker);
          });
          return citizenMarkers;
        };

        const getDirectionLink = (
          userLatitude,
          userLongitude,
          markerLatitude,
          markerLongitude
        ) => {
          // Construct the direction link using the coordinates
          const directionLink = `https://www.google.com/maps/dir/${userLatitude},${userLongitude}/${markerLatitude},${markerLongitude}`;
          return directionLink;
        };

        // Clear existing markers
        selectedAgencyMarkers.forEach((marker) => marker.remove());
        selectedCitizenMarkers.forEach((marker) => marker.remove());

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
  }, [
    mapRef,
    otherAgencies,
    otherCitizens,
    userDataLocation,
    searchText,
    searchResults,
    selectedAgency,
    selectedCitizens,
  ]);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const handleMoreInfoClick = (agencyId) => {
    setShowMoreInfo((prevState) => ({
      ...prevState,
      [agencyId]: !prevState[agencyId],
    }));
    // Hide inventory when showing more info
    setShowInventory((prevState) => ({
      ...prevState,
      [agencyId]: false,
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
    const searchResultIds = [
      ...filteredAgencies.map((agency) => agency.id),
      ...filteredCitizens.map((citizen) => citizen.id),
    ];
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
    openModal(agencyId, "inventory");
  };

  const handleInventoryClick = async (agencyId) => {
    if (!otherAgenciesInventory[agencyId]) {
      await fetchOtherAgenciesInventory(agencyId);
    }

    setShowInventory((prevState) => ({
      ...prevState,
      [agencyId]: !prevState[agencyId],
    }));
    // Hide more info when showing inventory
    setShowMoreInfo((prevState) => ({
      ...prevState,
      [agencyId]: false,
    }));
  };

  const calculateDistance = (lat1, lon1, lat2, lon2) => {
   
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
    return (
      <div>
        {loading && (
          <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
            <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900" />
          </div>
        )}
      </div>
    );
  }

  const handleDisplayModeChange = (mode) => {
    setDisplayMode(mode);
    if (mode === "agencies") {
      setSelectedAgency(otherAgencies);
      setSelectedCitizens([]);
    } else if (mode === "citizens") {
      setSelectedCitizens(otherCitizens);
      setSelectedAgency([]);
    }
  };

  const handleClose = () => {
    setShowMoreInfo((prevState) => ({
      ...prevState,
      [selectedAgency[0].id]: false,
    }));
    setShowInventory((prevState) => ({
      ...prevState,
      [selectedAgency[0].id]: false,
    }));
   
  };
  const handleCloseCitizen =()=>{
    setShowMoreInfo((prevState) => ({
      ...prevState,
      [selectedCitizens[0].id]: false,
    }));
  }
  return (
    <div className="p-4 font-abc min-h-screen ">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900" />
        </div>
      )}
      {error && <div className="error-message">{error}</div>}
      <div className="bg-zinc-800  bg-opacity-25 space-y-4 ">
        <div className=" shadow-2xl p-4 bg-zinc-900 bg-opacity-55 rounded-md ">
          <h1 className="text-3xl font-bold text-red-600 flex items-center justify-center gap-x-2">
            Comprehensive Data Overview{" "}
            <SiGoogleanalytics className="text-red-600" />
          </h1>
        </div>
        <div className="w-full">
          <div className="bg-zinc-900 rounded-md p-4 ">
            <div className="flex justify-between items-center ">
              <h1 className="text-lg font-semibold text-red-600">
                {" "}
                Map View of Agencies and Citizens{" "}
              </h1>
              <div className="flex bg-green-600 bg-opacity-20 py-2 px-3 rounded-xl font-semibold items-center justify-center text-white">
                Map view <img src={map} />
              </div>
            </div>
            <div ref={mapRef} style={{ height: "400px " }} className="my-4" />
          </div>
        </div>
        <div className="flex justify-between space-x-3 p-4 rounded-md bg-zinc-900 my-2">
          <div className="w-full  text-white p-4">
            {!loading &&
              !error &&
              (selectedAgency.length > 0 || selectedCitizens.length > 0) && (
                <div>
                  <div className=" ">
                    <div className="space-x-2    m-2 ">
                      <button
                        className={`px-4 py-2 rounded-md ${
                          displayMode === "agencies"
                            ? "bg-red-600 text-white"
                            : "bg-zinc-500 text-gray-100 bg-opacity-25"
                        }`}
                        onClick={() => handleDisplayModeChange("agencies")}
                      >
                        Agencies
                      </button>
                      <button
                        className={`px-4 py-2 rounded-md ${
                          displayMode === "citizens"
                            ? "bg-red-600 text-white"
                            : "bg-zinc-500 text-gray-100 bg-opacity-25"
                        }`}
                        onClick={() => handleDisplayModeChange("citizens")}
                      >
                        Citizens
                      </button>
                    </div>
                    <div className="p-4 m-2 text-center space-x-2 bg-zinc-800 rounded-md  flex items-center justify-center">
                      <input
                        type="text"
                        placeholder="Search"
                        className="lg:w-1/2 text-black  py-2 pl-3 rounded-md  focus:outline-none "
                        onChange={handleSearch}
                      />
                      <button className="bg-red-600  text-white cursor-pointer rounded-md  px-6 py-2 font-semibold">
                        Search
                      </button>
                    </div>
                    <hr className="w-full"></hr>
                    <div className="  mt-4">
                      {displayMode === "agencies" ? (
                        <div className=" px-4 pt-4">
                          <p className="text-xl font-semibold text-start text-red-600 ">
                            Number of Agencies:{" "}
                            <span>{otherAgencies.length}</span>
                          </p>
                        </div>
                      ) : (
                        <div className="px-4 pt-4">
                          <p className="text-xl font-semibold text-start text-red-600">
                            Number of Citizens:{" "}
                            <span>{otherCitizens.length}</span>
                          </p>
                        </div>
                      )}
                    </div>
                    <div></div>
                    <div className="container   ">
                      {displayMode === "agencies" ? (
                        <ul>
                          {selectedAgency.map((agency) => (
                            <li key={agency.id}>
                              <div className="bg-zinc-800   m-2 p-4 rounded-lg">
                                <div>
                                  <p className="text-red-600">
                                    Agency Name:{" "}
                                    <span className="text-gray-100">
                                      {agency.agencyName}
                                    </span>
                                  </p>
                                  <p className="text-red-600">
                                    Distance:{" "}
                                    <span className="text-gray-100">
                                      {" "}
                                      {calculateDistance(
                                        userDataLocation.latitude,
                                        userDataLocation.longitude,
                                        agency.latitude,
                                        agency.longitude
                                      )}
                                    </span>
                                  </p>
                                </div>
                                <div>
                                  <div className=" ">
                                    {showMoreInfo[agency.id] ||
                                    showInventory[agency.id] ? (
                                      <div className="flex items-center justify-center">
                                        <button
                                          onClick={() => handleClose(agency.id)}
                                          className="px-4 py-2 items-center flex justify-center space-x-3 bg-red-600  rounded-lg"
                                        >
                                          <IoClose className="text-lg" /> Close
                                        </button>
                                      </div>
                                    ) : (
                                      <div className="flex items-center justify-center space-x-3 ">
                                        <button
                                          className={`bg-yellow-700 flex items-center justify-center gap-x-2  px-4 py-2 rounded-lg `}
                                          onClick={() => {
                                            handleMoreInfoClick(agency.id);
                                          }}
                                        >
                                          <TiInfo className="text-lg" />
                                          More Info
                                        </button>{" "}
                                        <button
                                          className="bg-green-700 flex items-center justify-center gap-x-2  px-4 py-2 rounded-lg"
                                          onClick={() => {
                                            handleInventoryClick(agency.id);
                                          }}
                                        >
                                          <MdInventory /> Inventory
                                        </button>
                                      </div>
                                    )}

                                    <div className="">
                                      {showMoreInfo[agency.id] && (
                                        <div className="mt-4 flex w-full space-x-2 text-gray-100">
                                          <div className="w-1/2 bg-zinc-900 p-4">
                                            <p className="text-4xl text-start text-zinc-950 font-semibold">
                                              Agency Name:{" "}
                                              <span className="text-red-600">
                                                {agency.agencyName}
                                              </span>
                                            </p>
                                            <p className="text-start mt-8 text-red-600">
                                              {" "}
                                              Description:{" "}
                                              <span className="text-gray-100">
                                                {agency.agencyDesc}
                                              </span>{" "}
                                            </p>
                                            <p className="text-start  text-red-600">
                                              Address:{" "}
                                              <span className="text-gray-100">
                                                {" "}
                                                {agency.completeAddress}{" "}
                                              </span>
                                            </p>
                                            <p className="text-start  text-red-600">
                                              City:{" "}
                                              <span className="text-gray-100">
                                                {agency.city}
                                              </span>
                                            </p>
                                            <p className="text-start  text-red-600">
                                              State:{" "}
                                              <span className="text-gray-100">
                                                {agency.state}
                                              </span>
                                            </p>
                                            <div className="px-3 py-2 bg-zinc-700 bg-opacity-30 mt-4">
                                              <p className="text-red-600 text-center  font-semibold">
                                                Contact: {agency.agencyConatct}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="w-1/2 bg-zinc-900 p-6">
                                            <div className="flex justify-between p-2">
                                              <p className="text-start  text-red-600 text-2xl">
                                                Agency Ceritficate{" "}
                                              </p>
                                              <AiFillSafetyCertificate className="w-8 h-8" />
                                            </div>
                                            <img
                                              src={agency.agencyCertificateUrl}
                                              alt="agencyCertificate"
                                              className="p-4"
                                            />
                                          </div>
                                        </div>
                                      )}
                                      {otherAgenciesInventory[agency.id] &&
                                        showInventory[agency.id] && (
                                          <div className="bg-zinc-900 rounded-lg  p-8 m-10">
                                            <ul>
                                              {otherAgenciesInventory[
                                                agency.id
                                              ].map((item) => (
                                                <li key={item.id}>
                                                  <div className="bg-zinc-800 p-4  rounded-lg m-3">
                                                    <p className="text-red-400">
                                                      Equipment Name:{" "}
                                                      <span className="text-gray-100">
                                                        {item.equipmentName}
                                                      </span>
                                                    </p>
                                                    <p className="text-red-400">
                                                      Quantity:{" "}
                                                      <span className="text-gray-100">
                                                        {item.equipmentQuantity}
                                                      </span>
                                                    </p>
                                                  </div>
                                                </li>
                                              ))}
                                            </ul>
                                          </div>
                                        )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <ul>
                          {selectedCitizens.map((citizen) => (
                            <li key={citizen.id}>
                              <div className=" bg-zinc-800  bg-opacity-45 m-4 p-4 rounded-lg">
                                <div className="flex justify-between items-center">
                                  <div className="flex space-x-2 items-center justify-center">
                                    <div className="rounded-full w-10 h-10 flex item-center justify-center border-black">
                                      <img
                                        src={citizen.profileUrl}
                                        alt="Profile"
                                        className="rounded-full w-9 h-9"
                                      />
                                    </div>

                                    <div>
                                      <p className="text-red-600 font-semibold">
                                        Citizen Name:
                                        <span className="text-gray-100">
                                          {" "}
                                          {citizen.name}
                                        </span>
                                      </p>
                                      <p className="text-red-600 font-semibold">
                                        Distance:{" "}
                                        <span className="text-gray-100">
                                          {" "}
                                          {calculateDistance(
                                            userDataLocation.latitude,
                                            userDataLocation.longitude,
                                            citizen.latitude,
                                            citizen.longitude
                                          )}
                                        </span>
                                      </p>
                                    </div>
                                  </div>
                                  <div className="">
                                    <div>
                                      {showMoreInfo[citizen.id] ? (
                                        <button className="px-4 py-2 items-center flex justify-center space-x-3 bg-red-600  rounded-lg"    onClick={() => {handleCloseCitizen(citizen.id)}}>
                                          <IoClose className="text-lg" /> Close
                                        </button>
                                      ) : (
                                        <button
                                          className="bg-yellow-700 flex items-center justify-center gap-x-2  px-4 py-2 rounded-lg"
                                          onClick={() => {
                                            handleMoreInfoClick(citizen.id);
                                          }}
                                        >
                                          <TiInfo className="text-lg" /> More
                                          Info
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <div className="">
                                  {showMoreInfo[citizen.id] && (
                                    <div className=" bg-zinc-600 backdrop-blur-2xl bg-opacity-25 rounded-md m-4 p-4">
                                      <h2 className=" text-red-600 text-4xl font-semibold text-center">
                                        Citizen Details
                                      </h2>
                                      <p className="text-red-600 font-semibold">
                                        {" "}
                                        Gender:{" "}
                                        <span className="text-gray-100">
                                          {" "}
                                          {citizen.gender}
                                        </span>
                                      </p>
                                      <p className="text-red-600 font-semibold">
                                        Date of Birth:{" "}
                                        <span className="text-gray-100">
                                          {citizen.dob}
                                        </span>
                                      </p>
                                      <p className="text-red-600 font-semibold">
                                        Phone Number:{" "}
                                        <span className="text-gray-100">
                                          {citizen.phoneNumber}
                                        </span>
                                      </p>
                                      <p className="text-red-600 font-semibold">
                                        Address:{" "}
                                        <span className="text-gray-100">
                                          {citizen.completeAddress},{" "}
                                          {citizen.city}, {citizen.state},{" "}
                                          {citizen.country}, {citizen.pincode}
                                        </span>
                                      </p>

                                      <div className=" flex flex-col items-center justify-center mt-10">
                                        <div className="text-xl font-semibold">
                                          Citizen Aadhar Details
                                        </div>
                                        <div className="flex flex-col lg:flex-row justify-center items-center w-full space-x-3 m-1 p-2">
                                          <div className="w-full p-2 flex justify-center items-center bg-black ">
                                            <div className="h-96 lg: w-full ">
                                              <p className="font-semibold text-red-600">
                                                Aadhar Front:
                                              </p>
                                              <img
                                                className="h-80 w-auto"
                                                src={citizen.aadharFrontUrl}
                                                alt="Aadhar Front"
                                              />
                                            </div>
                                          </div>
                                          <div className="w-full p-2 flex justify-center items-center bg-black ">
                                            <div className="h-96 w-full ">
                                              <p className="font-semibold text-red-600">
                                                Aadhar Back:
                                              </p>
                                              <img
                                                className="h-80 w-full"
                                                src={citizen.aadharBackUrl}
                                                alt="Aadhar Back"
                                              />
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>
              )}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center flex-col">
      <Modal
        isOpen={modalIsOpen}
       className="z-50 mx-40 my-2"
       style={{
        overlay: {
          zIndex: 1000, // Set a higher z-index than the map
        },
      }}
       
      >
         <button onClick={closeModal} className="bg-red-600 rounded-md px-4 py-2 flex items-center justify-center"> <IoClose className="text-lg" /> Close</button>
        {modalData && (
          <>
            {modalData.type === "agency" && (
              <div className="mt-4 flex w-full space-x-2 text-gray-900">
              <div className="w-1/2 bg-zinc-900 p-4">
                <p className="text-4xl text-start text-zinc-950 font-semibold">
                  Agency Name:{" "}
                  <span className="text-red-600">
                    {modalData.agencyName}
                  </span>
                </p>
                <p className="text-start mt-8 text-red-600">
                  {" "}
                  Description:{" "}
                  <span className="text-gray-900">
                    {modalData.agencyDesc}
                  </span>{" "}
                </p>
                <p className="text-start  text-red-600">
                  Address:{" "}
                  <span className="text-gray-900">
                    {" "}
                    {modalData.completeAddress}{" "}
                  </span>
                </p>
                <p className="text-start  text-red-600">
                  City:{" "}
                  <span className="text-gray-900">
                    {modalData.city}
                  </span>
                </p>
                <p className="text-start  text-red-600">
                  State:{" "}
                  <span className="text-gray-900">
                    {modalData.state}
                  </span>
                </p>
                <div className="px-3 py-2 bg-zinc-700 bg-opacity-30 mt-4">
                  <p className="text-red-600 text-center  font-semibold">
                    Contact: {modalData.agencyConatct}
                  </p>
                </div>
              </div>
              <div className="w-1/2 bg-zinc-900 p-6">
                <div className="flex justify-between p-2">
                  <p className="text-start  text-red-600 text-2xl">
                    Agency Ceritficate{" "}
                  </p>
                  <AiFillSafetyCertificate className="w-8 h-8" />
                </div>
                <img
                  src={modalData.agencyCertificateUrl}
                  alt="agencyCertificate"
                  className="p-4"
                />
              </div>
            </div>
            )}
            {modalData.type === "citizen" && (
              <div className=" bg-zinc-600 backdrop-blur-2xl bg-opacity-25 rounded-md m-4 p-4">
              <h2 className=" text-red-600 text-4xl font-semibold text-center">
                Citizen Details
              </h2>
              <p className="text-red-600 font-semibold">
                {" "}
                Gender:{" "}
                <span className="text-gray-900">
                  {" "}
                  {modalData.gender}
                </span>
              </p>
              <p className="text-red-600 font-semibold">
                Date of Birth:{" "}
                <span className="text-gray-900">
                  {modalData.dob}
                </span>
              </p>
              <p className="text-red-600 font-semibold">
                Phone Number:{" "}
                <span className="text-gray-900">
                  {modalData.phoneNumber}
                </span>
              </p>
              <p className="text-red-600 font-semibold">
                Address:{" "}
                <span className="text-gray-900">
                  {modalData.completeAddress},{" "}
                  {modalData.city}, {modalData.state},{" "}
                  {modalData.country}, {modalData.pincode}
                </span>
              </p>

              <div className=" flex flex-col items-center justify-center mt-10">
                <div className="text-xl font-semibold">
                  Citizen Aadhar Details
                </div>
                <div className="flex flex-col lg:flex-row justify-center items-center w-full space-x-3 m-1 p-2">
                  <div className="w-full p-2 flex justify-center items-center bg-black ">
                    <div className="h-96 lg: w-full ">
                      <p className="font-semibold text-red-600">
                        Aadhar Front:
                      </p>
                      <img
                        className="h-80 w-auto"
                        src={modalData.aadharFrontUrl}
                        alt="Aadhar Front"
                      />
                    </div>
                  </div>
                  <div className="w-full p-2 flex justify-center items-center bg-black ">
                    <div className="h-96 w-full ">
                      <p className="font-semibold text-red-600">
                        Aadhar Back:
                      </p>
                      <img
                        className="h-80 w-full"
                        src={modalData.aadharBackUrl}
                        alt="Aadhar Back"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            )}
            {modalData.type === "inventory" && (
              // Display inventory information
              <>
                <h2>Inventory</h2>
                <ul>
                  {modalData.inventory &&
                    modalData.inventory.map((item, index) => (
                      <li key={index}>
                        <div className="bg-zinc-800 p-4 m-2"></div>
                        <p className="text-red-600 font-semibold">Equipment Name:<span className="text-gray-900">{item.equipmentName}</span> </p>
                        <p className="text-red-600 font-semibold">Quantity: <span className="text-gray-900">{item.equipmentQuantity}</span> </p>
                      </li>
                    ))}
                </ul>
              </>
            )}
          </>
        )}
       
      </Modal>
      </div>

     
    </div>
  );
};

export default AdminDashboard;
