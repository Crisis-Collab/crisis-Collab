import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

const EditCitizenForm = ({ citizen, handleCloseEditForm }) => {
  const [citizenName, setCitizenName] = useState(citizen.name);
  const [gender, setGender] = useState(citizen.gender);
  const [latitude, setLatitude] = useState(citizen.latitude);
  const [longitude, setLongitude] = useState(citizen.longitude);
  const [location, setLocation] = useState(citizen.completeAddress);
  const [city, setCity] = useState(citizen.city);
  const [country, setCountry] = useState(citizen.country);
  const [pincode, setPincode] = useState(citizen.pincode);
  const [state, setState] = useState(citizen.state);
  const [phoneNumber, setPhoneNumber] = useState(citizen.phoneNumber);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const citizenRef = doc(db, "users", citizen.id);
      await updateDoc(citizenRef, {
        name: citizenName,
        gender: gender,
        latitude: latitude,
        longitude: longitude,
        phoneNumber: phoneNumber,
        completeAddress: location,
        city: city,
        country: country,
        pincode: pincode,
        state: state,
      });
      handleCloseEditForm();
    } catch (error) {
      console.error("Error updating citizen details: ", error);
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col bg-gray-900 bg-opacity-50 z-50 overflow-y-auto">
    <div className="bg-white rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center bg-gray-900 text-white py-4">Edit Citizen</h2>
      <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Citizen Name</label>
            <input
              type="text"
              value={citizenName}
              onChange={(e) => setCitizenName(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Gender</label>
            <input
              type="text"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Contact Number</label>
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Latitude</label>
            <input
              type="text"
              value={latitude}
              onChange={(e) => setLatitude(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Longitude</label>
            <input
              type="text"
              value={longitude}
              onChange={(e) => setLongitude(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">City</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Country</label>
            <input
              type="text"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">State</label>
            <input
              type="text"
              value={state}
              onChange={(e) => setState(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Pincode</label>
            <input
              type="text"
              value={pincode}
              onChange={(e) => setPincode(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="flex justify-end">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Save</button>
            <button onClick={handleCloseEditForm} className="bg-gray-400 text-white px-4 py-2 rounded-md">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditCitizenForm;