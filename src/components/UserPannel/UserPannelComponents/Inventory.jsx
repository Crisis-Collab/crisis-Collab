import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc, setDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase/firebase.config";
import { RiDeleteBinLine } from 'react-icons/ri';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const Inventory = () => {
  const [equipment, setEquipment] = useState([]);
  const [newEquipmentName, setNewEquipmentName] = useState("");
  const [newEquipmentQuantity, setNewEquipmentQuantity] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // New state for error handling
  const auth = getAuth();
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchEquipment = async () => {
      try {
        setLoading(true);
        const equipmentRef = collection(db, "users", auth.currentUser.uid, "inventoryList");
        const querySnapshot = await getDocs(equipmentRef);
        const equipmentList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          equipmentName: doc.data().equipmentName,
          equipmentQuantity: doc.data().equipmentQuantity,
        }));
        setEquipment(equipmentList);
        setError(null); // Reset error state if data fetch is successful
      } catch (error) {
        console.error("Error fetching equipment:", error);
        setError("Error fetching equipment. Please try again."); // Set error message
      } finally {
        // Introduce a slight delay before hiding the loading spinner
        setTimeout(() => {
          setLoading(false);
        }, 300);
      }
    };

    fetchEquipment();
  }, [auth.currentUser.uid]);

  const updateEquipmentState = (equipmentId, newQuantity) => {
    setEquipment(prevEquipment =>
      prevEquipment.map(item =>
        item.id === equipmentId ? { ...item, equipmentQuantity: newQuantity } : item
      )
    );
  };

  const handleIncrement = async (equipmentId, equipmentName) => {
    const inventoryRef = doc(db, "users", auth.currentUser.uid, "inventoryList", equipmentId);
    const docSnap = await getDoc(inventoryRef);
    if (docSnap.exists()) {
      const newQuantity = docSnap.data().equipmentQuantity + 1;
      await updateDoc(inventoryRef, { equipmentQuantity: newQuantity });
      updateEquipmentState(equipmentId, newQuantity);
    }
  };

  const handleDecrement = async (equipmentId, equipmentName) => {
    const inventoryRef = doc(db, "users", auth.currentUser.uid, "inventoryList", equipmentId);
    const docSnap = await getDoc(inventoryRef);
    if (docSnap.exists() && docSnap.data().equipmentQuantity > 0) {
      const newQuantity = docSnap.data().equipmentQuantity - 1;
      await updateDoc(inventoryRef, { equipmentQuantity: newQuantity });
      updateEquipmentState(equipmentId, newQuantity);
    }
  };

  const handleDelete = async (equipmentId) => {
    const inventoryRef = doc(db, "users", auth.currentUser.uid, "inventoryList", equipmentId);
    await deleteDoc(inventoryRef);
    setEquipment(prevEquipment => prevEquipment.filter(item => item.id !== equipmentId));
  };

  const handleAddEquipment = async () => {
    if (newEquipmentName && newEquipmentQuantity) {
      try {
        const docRef = doc(db, "users", auth.currentUser.uid, "inventoryList", `${auth.currentUser.uid}_${newEquipmentName}`);
        await setDoc(docRef, {
          equipmentName: newEquipmentName,
          equipmentQuantity: parseInt(newEquipmentQuantity)
        });
        setEquipment(prevEquipment => [...prevEquipment, {
          id: `${auth.currentUser.uid}_${newEquipmentName}`,
          equipmentName: newEquipmentName,
          equipmentQuantity: parseInt(newEquipmentQuantity)
        }]);
        setNewEquipmentName("");
        setNewEquipmentQuantity("");
      } catch (error) {
        console.error("Error adding document: ", error);
        setError("Error adding equipment. Please try again."); // Set error message
      }
    } else {
      console.log("Please fill out all fields.");
    }
  };
  const filteredItem = equipment.filter((inventory) =>
    inventory.equipmentName.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (

    <div className="p-2 min-h-screen">
       {loading && (

        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-baseline z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}
      {error && (
        <div className="error-message">{error}</div>
      )}
      <div className=""> 
            <h1 className="text-3xl font-bold text-gray-100  p-4">Add and Find your Equipments here - </h1>
          </div>
      {!loading && !error && (
        <div className="flex justify-start item-center bg-zinc-900 p-4 ">
    
        <div className="space-x-4 flex w-full">
         
          <div className="flex flex-col lg:w-1/3">
          <label className="text-gray-200 font-semibold p-1">Equipment Name</label>
          <input
          className=" w-full mb-4  text-black  py-2 pl-3 border focus:outline-none "
            type="text"
            placeholder="Equipment Name"
            value={newEquipmentName}
            onChange={(e) => setNewEquipmentName(e.target.value)}
          />
          </div>
        <div className="flex flex-col lg:w-1/3">
          <label className="text-gray-200 font-semibold p-1">Quantity</label>
        <input
           className=" w-full mb-4  text-black  py-2 pl-3 border focus:outline-none "
            type="number"
            placeholder="Quantity"
            value={newEquipmentQuantity}
            onChange={(e) => setNewEquipmentQuantity(e.target.value)}
          />
        </div>
          
        </div >
        <div>
        <button onClick={handleAddEquipment} className="bg-red-600  mt-9 px-6 py-2 rounded-sm font-semibold">Add  </button>
        </div>
        </div>
      )}
      <div className="bg-zinc-900 mt-5 p-4">
      <div className="  text-center  flex items-center justify-center space-x-3">
              <p className="text-lg text-red-600 font-normal">
                Search for Equipment-{" "}
              </p>
              <input
                type="text"
                placeholder="Search "
                className="lg:w-6/12 w-full bg-zinc-400 bg-opacity-25 border-none py-2 pl-3 border focus:outline-none "
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="bg-red-600 rounded-sm text-white cursor-pointer   px-8 py-2 font-semibold">
                Search
              </button>
            </div>
      {!loading && !error && filteredItem.map((item) => (
        <div key={item.id} className="bg-zinc-600  bg-opacity-25 mt-5  p-4 flex justify-between items-center">
          <div>
          <p className="text-red-600 font-semibold text-lg">Equipment Name: <span className="text-gray-200 font-normal">{item.equipmentName}</span></p>
          <p className="text-red-600 font-semibold text-lg">Quantity: <span  className="text-gray-200 font-normal">{item.equipmentQuantity}</span></p>
          </div>

          <div className="space-x-3">
          <button className=" bg-gray-100 rounded-md bg-opacity-35 px-4 py-2" onClick={() => handleIncrement(item.id, item.equipmentName)}><AiOutlinePlus /></button>
          <button className=" bg-gray-100 rounded-md bg-opacity-35 px-4 py-2" onClick={() => handleDecrement(item.id, item.equipmentName)}><AiOutlineMinus /></button>
          <button className=" bg-red-600   rounded-md px-6 py-2"onClick={() => handleDelete(item.id)}><RiDeleteBinLine /> </button>
          </div>
        </div>
      ))}
      </div>
    </div>
  );
};

export default Inventory;
