import React, { useState } from "react";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";

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

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex flex-col bg-gray-900 bg-opacity-50 z-50 overflow-y-auto">
    <div className="bg-white rounded-lg overflow-y-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center bg-gray-900 text-white py-4">Edit Agency</h2>
      <form onSubmit={handleSubmit} className="p-8">
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Agency Name</label>
            <input
              type="text"
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
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
            <label className="block text-sm font-semibold mb-2">Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Department</label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Agency Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border rounded-md px-3 py-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2">Area Of Expertise</label>
            <input
              type="text"
              value={expertise}
              onChange={(e) => setExpertise(e.target.value)}
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

export default EditAgencyForm;