import React, { useState, useEffect } from "react";
import { updateDoc, doc, collection, getDocs, addDoc, deleteDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase.config";
import { IoArrowBackOutline } from "react-icons/io5";
import { RiDeleteBinLine } from 'react-icons/ri';
import { getAuth } from "firebase/auth";


const EditAgencyForm = ({ agency, handleCloseEditForm }) => {
  const [agencyName, setAgencyName] = useState(agency.agencyName);
  const [location, setLocation] = useState(agency.completeAddress);
  const [department, setDepartment] = useState(agency.agencyType);
  const [description, setDescription] = useState(agency.agencyDesc);
  const [expertise, setExpertise] = useState(agency.areaOfExpertise);
  const [city, setCity] = useState(agency.city);
  const [country, setCountry] = useState(agency.country);
  const [pincode, setPincode] = useState(agency.pincode);
  const [state, setState] = useState(agency.state);
  const [phoneNumber, setPhoneNumber] = useState(agency.agencyAdminPhoneNumber);
  const [showInventory, setShowInventory] = useState(false);
  const [inventory, setInventory] = useState([]);
  const [newInventoryName, setNewInventoryName] = useState("");
  const [newInventoryQuantity, setNewInventoryQuantity] = useState("");
  

  useEffect(() => {
    const fetchInventory = async () => {
      const inventoryRef = collection(db, "users", agency.id, "inventoryList");
      const querySnapshot = await getDocs(inventoryRef);
      const inventoryData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventory(inventoryData);
    };

    fetchInventory();
  }, [agency.id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const agencyRef = doc(db, "users", agency.id);
      await updateDoc(agencyRef, {
        agencyName: agencyName,
        agencyAdminPhoneNumber: phoneNumber,
        completeAddress: location,
        agencyType: department,
        agencyDesc: description,
        areaOfExpertise: expertise,
        city: city,
        country: country,
        pincode: pincode,
        state: state,
      });
      handleCloseEditForm();
    } catch (error) {
      console.error("Error updating agency details: ", error);
    }
  };

  const toggleInfo = () => {
    setShowInventory(false);
  };

  const toggleInventory = () => {
    setShowInventory(true);
  };

  const handleInventoryUpdate = async (itemId, newQuantity) => {
    const inventoryRef = doc(db, "users", agency.id, "inventoryList", itemId);
    await updateDoc(inventoryRef, { equipmentQuantity: newQuantity });
  };

  const handleAddInventory = async () => {
    if (newInventoryName && newInventoryQuantity) {
      try {
        const inventoryId = `${auth.currentUser.uid}_${newInventoryName}`;
        const docRef = doc(db, "users", agency.id, "inventoryList", inventoryId);
        await setDoc(docRef, {
          equipmentName: newInventoryName,
          equipmentQuantity: parseInt(newInventoryQuantity)
        });
        // Update the inventory state by including the new item 
        setInventory(prevInventory => [
          ...prevInventory,{
          id: inventoryId,
          equipmentName: newInventoryName,
          equipmentQuantity: parseInt(newInventoryQuantity)
        }]);
        // Clear the input fields
        setNewInventoryName("");
        setNewInventoryQuantity("");
        console.log("New inventory item added to Firestore:", newInventoryName, newInventoryQuantity);
      } catch (error) {
        console.error("Error adding document to Firestore: ", error);
        // Handle the error (e.g., display an error message to the user)
      }
    } else {
      console.log("Please fill out all fields.");
    }
  };
  
  

  const handleEditInventory = async (itemId, newQuantity) => {
    // Update the local state first
    const updatedInventory = inventory.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          equipmentQuantity: newQuantity
        };
      }
      return item;
    });
    setInventory(updatedInventory);

    // Update Firestore
    const inventoryRef = doc(db, "users", agency.id, "inventoryList", itemId);
    await updateDoc(inventoryRef, { equipmentQuantity: newQuantity });
  };

  const handleDeleteInventory = async (itemId) => {
    const inventoryRef = doc(db, "users", agency.id, "inventoryList", itemId);
    await deleteDoc(inventoryRef);
    setInventory(inventory.filter((item) => item.id !== itemId));
  };

  const handleIncrement = async (itemId) => {
    const updatedInventory = inventory.map(item => {
      if (item.id === itemId) {
        return {
          ...item,
          equipmentQuantity: item.equipmentQuantity + 1
        };
      }
      return item;
    });
    setInventory(updatedInventory);
    await handleInventoryUpdate(itemId, updatedInventory.find(item => item.id === itemId).equipmentQuantity);
  };

  const handleDecrement = async (itemId) => {
    const updatedInventory = inventory.map(item => {
      if (item.id === itemId && item.equipmentQuantity > 0) {
        return {
          ...item,
          equipmentQuantity: item.equipmentQuantity - 1
        };
      }
      return item;
    });
    setInventory(updatedInventory);
    await handleInventoryUpdate(itemId, updatedInventory.find(item => item.id === itemId).equipmentQuantity);
  };

  return (
    <div className=" fixed top-0 left-0 right-0 bottom-0 flex flex-col bg-zinc-900 w-full bg-opacity-50 backdrop-blur-lg z-50 overflow-y-auto">
      <div className=" bg-cover rounded-lg overflow-y-auto ">
        <div className="flex bg-zinc-900 items-center justify-start   fixed top-0 left-0 right-0 ">
        <button className="bg-zinc-950 bg-opacity-25 m-4  rounded-md font-semibold text-white px-4 py-1 flex items-center justify-center space-x-2" onClick={handleCloseEditForm}>
          <IoArrowBackOutline />
          Back
        </button>
        <h2 className="text-4xl font-semibold mb-4 text-center lg:ml-[420px]  py-4 text-red-600">Update Agency Details</h2>
        </div>
        <div className="bg-zinc-900 bg-opacity-5 p-2 flex justify-center items-center lg:mt-32  px-6 ">
          
          <div className="space-x-2"> <button
            className={`rounded-md font-semibold text-white px-4 py-2 ${
              !showInventory ? "bg-red-600" : "bg-gray-800 bg-opacity-50"
            }`}
            onClick={toggleInfo}
          >
            Update Agency Details
          </button>
          <button
            className={`rounded-md font-semibold text-white px-4 py-2 ${
              showInventory ? "bg-red-600" : "bg-gray-800 bg-opacity-50"
            }`}
            onClick={toggleInventory}
          >
            Update Inventory
          </button></div>
         
        </div>
        
        {showInventory ? (
  <div>
    <form onSubmit={handleSubmit} className="p-8 text-gray-100  px-96 mx-32 my-4 bg-zinc-900 bg-opacity-55 min-h-screen">
      {/* Inventory Update Section */}
      {inventory.map((item) => (
        <div key={item.id}>
          
          <label className="block font-bold mb-2 text-gary-100 text-lg"><p>{item.equipmentName} </p> </label>
          <div className="flex justify-between items-center">
          <input
            type="number"
            value={item.equipmentQuantity}
            onChange={(e) => handleEditInventory(item.id, e.target.value)}
            className="w-full border  rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
          />
          <div>
          <RiDeleteBinLine onClick={() => handleDeleteInventory(item.id)} className="ml-2 cursor-pointer text-red-600 hover:w-8 h-8" style={{ fontSize: "1.5rem" }} />
          </div>
          </div>
          </div>
      ))}
      <div>
        <div className="mt-8">
          <div className="text-center font-bold m-8 text-red-600 text-lg">Add New Inventory</div>
          <label className="block font-bold mb-2 text-gary-100 text-lg"><p>New Inventory Name</p></label>
          <input type="text"
            value={newInventoryName}
            onChange={(e) => setNewInventoryName(e.target.value)}
            className="w-full border  rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            placeholder="New Inventory Name" />
        </div>

        <div>
          <label className="block font-bold mb-2 text-gary-100 text-lg"><p>New Inventory Quantity</p></label>
          <input type="number"
            value={newInventoryQuantity}
            onChange={(e) => setNewInventoryQuantity(e.target.value)}
            className="w-full border  rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            placeholder="New Inventory Quantity" />
            <div className="flex items-center justify-center">
          <button onClick={handleAddInventory} className="bg-green-600 text-white px-8 py-2 rounded-md mt-4">Add Inventory</button>
        </div>
        </div>
      </div>
    </form>
  </div>
) : (


  <div>
    {/* Agency Details Update Section */}
    <form onSubmit={handleSubmit} className="p-8 text-gray-100 px-96 mx-32 my-4 bg-zinc-900 bg-opacity-55">
        <div className="flex  w-full space-x-2">
          <div className="mb-4 w-1/2">
            <label className="block font-bold mb-2 text-gary-100 text-lg">Agency Name</label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              className="w-full border  rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block  font-bold mb-2 text-gary-100 text-lg">Contact Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            />
          </div>
          </div>
          <div className="flex  w-full space-x-2">
          <div className="mb-4 w-1/2">
            <label className="block font-bold mb-2 text-gary-100 text-lg">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            />
          </div>
          <div className="mb-4 w-1/2">
            <label className="block font-bold mb-2 text-gary-100 text-lg">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            />
          </div>
          </div>
          <div className="mb-4 w-full">
            <label className="block font-bold mb-2 text-gary-100 text-lg">Agency Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            />
          </div>
          
          <div className="mb-4 full">
            <label className="block font-bold mb-2 text-gary-100 text-lg">Area Of Expertise</label>
            <input
              type="text"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            />
          </div>
          <div className="flex  w-full space-x-2">
          <div className="mb-4 w-1/2">
            <label className="block font-bold mb-2 text-gary-100 text-lg">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            />
          </div>
         
          
          <div className="mb-4 w-1/2">
            <label className="block font-bold mb-2 text-gary-100 text-lg">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            />
          </div>
          </div>
          <div className="flex  w-full space-x-2">
          <div className="mb-4 w-1/2">
            <label className="block font-bold mb-2 text-gary-100 text-lg">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            />
          </div>
          
          <div className="mb-4 w-1/2">
            <label className="block font-bold mb-2 text-gary-100 text-lg">Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full border rounded-md px-3 py-2 bg-zinc-900  bg-opactity-20 border-zinc-800"
            />
          </div>
          </div>
          <div className="flex justify-center mt-8">
            <button type="submit" className="bg-green-600 text-white px-8 py-2 rounded-md mr-2">Save</button>
            <button onClick={handleCloseEditForm} className="bg-red-600 text-white px-6 py-2 rounded-md">Cancel</button>
          </div>
        </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default EditAgencyForm;
