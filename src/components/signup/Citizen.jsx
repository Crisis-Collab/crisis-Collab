// src/pages/CitizenForm.jsx
import React, { useState,useEffect } from 'react';
import AOS from "aos"
import 'aos/dist/aos.css';

const Citizen = () => {
    useEffect(()=>{
        AOS.init({duration:"1000"})
      },[]) 

  const [citizenData, setCitizenData] = useState({
    citizenName: '',
    gender: '',
    dateOfBirth: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCitizenData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
   setCitizenData({
    citizenName: '',
    gender: '',
    dateOfBirth: '',
   })
    
    console.log('Citizen Form Data:', citizenData);
  };

  return (
    <div data-aos="zoom-in">
      <div>
     <h4 className='pl-56 pb-5   pr-16 text-2xl text-cyan-900  font-semibold'> Citizen</h4>
     </div>
      <form onSubmit={handleSubmit} className='max-w-lg pl-36'>
        {/* Citizen Name */}
        <div className="mb-4">
          <label htmlFor="citizenName" className="block text-sm font-medium text-gray-600">
            Citizen Name:
          </label>
          <input
            type="text"
            id="citizenName"
            name="citizenName"
            className="mt-1 p-2 w-full border rounded-md"
            value={citizenData.citizenName}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Gender */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-600">Gender:</label>
          <div className="mt-1">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name="gender"
                value="male"
                onChange={handleInputChange}
                checked={citizenData.gender === 'male'}
                className="form-radio"
              />
              <span className="ml-2">Male</span>
            </label>
            <label className="inline-flex items-center ml-6">
              <input
                type="radio"
                name="gender"
                value="female"
                onChange={handleInputChange}
                checked={citizenData.gender === 'female'}
                className="form-radio"
              />
              <span className="ml-2">Female</span>
            </label>
          </div>
        </div>

        {/* Date of Birth */}
        <div className="mb-4">
          <label htmlFor="dateOfBirth" className="block text-sm font-medium text-gray-600">
            Date of Birth:
          </label>
          <input
            type="date"
            id="dateOfBirth"
            name="dateOfBirth"
            className="mt-1 p-2 w-full border rounded-md"
            value={citizenData.dateOfBirth}
            onChange={handleInputChange}
            required
          />
        </div>

        {/* Submit Button */}
        <div className="text-center pt-48">
          <button
            type="submit"
            
            className="bg-cyan-900 text-white p-2 px-4 rounded-md hover:bg-cyan-700"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default Citizen;

