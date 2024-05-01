import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, getDocs, collection } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { IoArrowBackOutline } from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";

const AgencyMoreInfo = ({ agencyId, handleMoreInfoClickClose }) => {
  const [loading, setLoading] = useState(true);
  const [agencyData, setAgencyData] = useState(null);
  const [otherAgenciesInventory, setOtherAgenciesInventory] = useState({});
  const [showInventory, setShowInventory] = useState(false);
  const [error, setError] = useState(null);
  const auth = getAuth();

  useEffect(() => {
    const fetchAgencyData = async () => {
      try {
        const agencyRef = doc(db, "users", agencyId);
        const agencySnap = await getDoc(agencyRef);

        if (agencySnap.exists()) {
          const data = agencySnap.data();
          setAgencyData(data);
        } else {
          console.log("No such agency document!");
        }
      } catch (error) {
        console.error("Error fetching agency document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAgencyData();
  }, [agencyId, db]);

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

  const toggleInfo = () => {
    setShowInventory(false);
  };

  const toggleInventory = () => {
    if (!otherAgenciesInventory[agencyId]) {
      fetchOtherAgenciesInventory(agencyId);
    }
    setShowInventory(true);
  };

  return (
    <div className="min-h-screen">
      <button
        className="bg-zinc-900 bg-opacity-20 rounded-md font-semibold text-white px-2 space-x-2  active:outline-1 py-2 flex justify-center items-center"
        onClick={handleMoreInfoClickClose}
      >  
        <IoArrowBackOutline />
        Back
      </button>

      {/* Toggle Buttons */}
      <div className="bg-zinc-900 p-2 flex justify-between space-x-2 mt-2">
        <button
          className={`rounded-md font-semibold text-white px-4 w-1/2 py-2 ${
            !showInventory ? "bg-red-600" : "bg-gray-800 bg-opacity-10"
          }`}
          onClick={toggleInfo}
        >
          Agency Info
        </button>
        <button
          className={`rounded-md font-semibold text-white px-4 w-1/2 py-2 ${
            showInventory ? "bg-red-600" : "bg-gray-800 bg-opacity-10"
          }`}
          onClick={toggleInventory}
        >
          Inventory
        </button>
      </div>

      {/* Inventory */}
      {showInventory && (
        <div className="mt-4  bg-zinc-900 p-4">
          <h2 className="text-2xl font-semibold mb-2 text-red-600">Inventory</h2>
          <ul>
            {otherAgenciesInventory[agencyId]?.map((item) => (
              <li key={item.id}>
                <div className="bg-zinc-700 bg-opacity-30 p-4">
                <p className="text-red-600 font-semibold">Equipment Name: <span className="text-gray-100">{item.equipmentName}</span></p>
                <p className="text-red-600 font-semibold">Quantity: <span className="text-gray-100">{item.equipmentQuantity}</span></p>
                </div>
                
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Agency Info */}
      {!showInventory && (
        <div className="mt-4 flex w-full space-x-2 text-gray-100">
        
          <div className="w-1/2 bg-zinc-900 p-4">
            <p className="text-4xl text-start text-zinc-950 font-semibold">Agency Name: <span className="text-red-600">{agencyData?.agencyName}</span></p>
            <p className="text-start mt-8 text-red-600"> Description: <span className="text-gray-100">{agencyData?.agencyDesc}</span> </p>
            <p className="text-start  text-red-600" >Address: <span className="text-gray-100"> {agencyData?.completeAddress} </span></p>
            <p className="text-start  text-red-600">City: <span className="text-gray-100">{agencyData?.city}</span></p>
            <p className="text-start  text-red-600">State: <span className="text-gray-100">{agencyData?.state}</span></p>
            <div className="px-3 py-2 bg-zinc-700 bg-opacity-30 mt-4">
            <p className="text-red-600 text-center  font-semibold">Contact: {agencyData?.agencyConatct}</p>
            </div>
           </div>
          <div className="w-1/2 bg-zinc-900 p-6">
            <div className="flex justify-between p-2">
           <p className="text-start  text-red-600 text-2xl">Agency Ceritficate </p>
           <AiFillSafetyCertificate  className="w-8 h-8"/>
           </div>
          <img src={agencyData?.agencyCertificateUrl} alt="agencyCertificate" className="p-4"/>
          </div>
        </div>
      )}
    </div>
  );
};

export default AgencyMoreInfo;
