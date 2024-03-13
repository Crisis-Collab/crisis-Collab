import React,{useState,useEffect} from 'react'
import AOS from "aos"
import 'aos/dist/aos.css';

const Admin = () => {
    useEffect(()=>{
        AOS.init({duration:"1000"})
      },[]) 

    const [formData, setFormData] = useState({
        agencyName: '',
        contactNumber: '',
        agencyType: '',
        otherAgencyType: '',
        areaOfExpertise: '',
        agencyDescription: '',
      });
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
      };
      
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormData({
        agencyName: '',
        contactNumber: '',
        agencyType: '',
        otherAgencyType: '',
        areaOfExpertise: '',
        agencyDescription: '',
      });
    // Implement your form submission logic here
    console.log('Form data submitted:', formData);

  };
  return (
   
    <div data-aos="zoom-in" >
      <div className="  items-center  ">
      <div>
     <h4 className='pl-56 pb-5   pr-16 text-2xl text-cyan-900  font-semibold'>Agency Admin</h4>
     </div>
      <form className="w-full max-w-lg pl-36 " onSubmit={handleSubmit}>
        {/* Agency Name */}
        <div className="mb-4">
          <label htmlFor="agencyName" className="block text-sm font-medium text-black">
            Agency Name:
          </label>
          <input
            type="text"
            id="agencyName"
            name="agencyName"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.agencyName}
            onChange={handleInputChange}
            required
            placeholder='Agency Name'
          />
        </div>

        {/* Contact Number */}
        <div className="mb-4">
          <label htmlFor="contactNumber" className="block text-sm font-medium text-black">
            Contact Number:
          </label>
          <input
            type="tel"
            id="contactNumber"
            name="contactNumber"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.contactNumber}
            onChange={handleInputChange}
            required
            placeholder='Agency Contact Number'
          />
        </div>

        {/* Agency Type */}
        <div className="mb-4">
          <label htmlFor="agencyType" className="block text-sm font-medium text-black">
            Agency Type:
          </label>
          <select
            id="agencyType"
            name="agencyType"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.agencyType}
            onChange={handleInputChange}
            required
          >
            <option value="">Select an option</option>
            <option value="type1">Type 1</option>
            <option value="type2">Type 2</option>
            {/* Add more options as needed */}
          </select>
        </div>

        {/* Other Agency Type */}
        {formData.agencyType === 'other' && (
          <div className="mb-4">
            <label htmlFor="otherAgencyType" className="block text-sm font-medium text-black">
              Other Agency Type:
            </label>
            <input
              type="text"
              id="otherAgencyType"
              name="otherAgencyType"
              className="mt-1 p-2 w-full border rounded-md"
              value={formData.otherAgencyType}
              onChange={handleInputChange}
              required
              placeholder='Agency Type'
            />
          </div>
        )}

        {/* Area of Expertise */}
        <div className="mb-4">
          <label htmlFor="areaOfExpertise" className="block text-sm font-medium text-black">
            Area of Expertise:
          </label>
          <input
            type="text"
            id="areaOfExpertise"
            name="areaOfExpertise"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.areaOfExpertise}
            onChange={handleInputChange}
            required
            placeholder='Expertise of Agency '
          />
        </div>

        {/* Agency Description */}
        <div className="mb-4">
          <label htmlFor="agencyDescription" className="block text-sm font-medium text-black">
            Agency Description:
          </label>
          <textarea
            id="agencyDescription"
            name="agencyDescription"
            rows="4"
            className="mt-1 p-2 w-full border rounded-md"
            value={formData.agencyDescription}
            onChange={handleInputChange}
            required
            placeholder='Agency Description '
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-cyan-900 text-white py-2 px-4 rounded-md hover:bg-cyan-700"
          >
            Submit
          </button>
        </div>
      </form>
   
       </div>
    </div>
  )
}

export default Admin
