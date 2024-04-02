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

  return (

    <div className="p-2">
       {loading && (

        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}
      {error && (
        <div className="error-message">{error}</div>
      )}
      {!loading && !error && (
        <div>
          <input
            type="text"
            placeholder="Equipment Name"
            value={newEquipmentName}
            onChange={(e) => setNewEquipmentName(e.target.value)}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newEquipmentQuantity}
            onChange={(e) => setNewEquipmentQuantity(e.target.value)}
          />
          <button onClick={handleAddEquipment}>Add Equipment</button>
        </div>
      )}
      {!loading && !error && equipment.map((item) => (
        <div key={item.id}>
          <p>Equipment Name: {item.equipmentName}</p>
          <p>Quantity: {item.equipmentQuantity}</p>
          <button onClick={() => handleIncrement(item.id, item.equipmentName)}><AiOutlinePlus /></button>
          <button onClick={() => handleDecrement(item.id, item.equipmentName)}><AiOutlineMinus /></button>
          <button onClick={() => handleDelete(item.id)}><RiDeleteBinLine /></button>
        </div>
      ))}
    </div>
  );
};

export default Inventory;
