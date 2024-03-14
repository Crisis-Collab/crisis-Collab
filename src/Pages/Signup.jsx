import React,{useState} from 'react'
import logo from '../assets/LOGO.png'
import citizen from '../assets/citizenAVa.jpg'
import Agency from '../assets/AgencyAva.png'
import Admin from '../components/signup/Admin'
import Citizen from '../components/signup/Citizen'
import { Link } from "react-router-dom";



const Signup = () => {
  
    const [isOpen, setIsOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsOpen(!isOpen);
    };
  
   
  
  const [selectedForm, setSelectedForm] = useState('citizen');

  const handleAgencyAdminClick = () => {
    setSelectedForm('agencyAdmin');
    setIsOpen(false);
  };

  const handleCitizenClick = () => {
    setSelectedForm('citizen');
    setIsOpen(false);
  };

  


  return (
    

    <div className="min-h-screen  px-4 flex  gap-20 sm:py-12 bg-cover bg-center " style={{ backgroundImage: 'url("/src/assets/fireman.jpg")' }}
    >
      <div className=' 
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      
      '>
       <div className='flex flex-col items-center h-[50%] w-[50%] ml-36 gap-4 '>
        <div>
        <h2 className='text-4xl text-orange-600 font-semibold '>Sign-Up</h2>
        <img src={logo} alt='' className='h-36 w-36 mt-4'/>
        </div>
        {/* Dropdown */}
        <div className="relative inline-block text-left">
      <button
        type="button"
        onClick={toggleDropdown}
        className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-cyan-900 rounded-md hover:bg-cyan-700 focus:outline-none focus-visible:ring focus-visible:ring-gray-500 focus-visible:ring-opacity-75"
      >
        Select Role
        <svg
          className="w-5 h-5 ml-2 -mr-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 0 1 1.414 0L10 11.586l3.293-3.293a1 1 0 1 1 1.414 1.414l-4 4a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 0-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>


      {isOpen && (
        <div className="  mt-2 w-50 rounded-md shadow-lg bg-gray-300 ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
            
            <button
              onClick={ handleCitizenClick }
             
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              Citizen
            </button>
            <button
              onClick={handleAgencyAdminClick}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
              role="menuitem"
            >
              Agency Admin
            </button>
          </div>
        </div>
      )}
      
    </div>

    <div className="  font-medium">
            <p>
              You have an account. Please {" "}
              <Link to="/login" className="text-blue-600" >
                Log-In
              </Link>

            </p>
          </div>
        
        
       </div>
      
     
     <div className=' rounded-full  pr-32 w-[800px]  flex items-center justify-center  sm:py-12  '
     >
      {selectedForm === 'agencyAdmin' && <Admin/>}
      {selectedForm === 'citizen' && <Citizen/>}
     
    </div>
    </div>
    </div>
  )
}

export default Signup
