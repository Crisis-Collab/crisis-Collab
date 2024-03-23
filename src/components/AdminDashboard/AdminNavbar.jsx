import React, { useEffect, useState } from "react";
import Logo from "../../assets/LOGO2.png";
import Avatar from "../../assets/ava.png";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";
import search from '../../assets/search.png'
import notify from '../../assets/notify.png'
import down from '../../assets/down2.png'
import up from '../../assets/up2.png'


const AdminNavbar = () => {
  const [loading,setLoading] =useState(false);
  const [user,setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked,setIsClicked] =useState(false);
  

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsClicked(!isClicked);
  };


  const getUser = async () => {
    try {
      const userRef =doc(db, "users", auth.currentUser.uid);
      const userSnap = await getDoc(userRef);
      const userData = userSnap.data();
      console.log(`User Data -${JSON.stringify(userData)}`)
      setUser(userData);
    } catch (error) {
      console.log("error occured while fetching user");
    }
  };
  useEffect(() => {
    setLoading(true);
    getUser();
    setLoading(false);
  }, []);
  return (

    <div className="bg-white  shadow-lg py-2   px-6   flex items-center justify-between  w-full relative">
      <div className="flex items-center justify-center pl-4">
        
        <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 " />
        <span className="text-red-600 text-2xl font-medium">Crisis</span>
        <span className="text-red-600 font-semibold pt-2"> collab</span>
       
      </div>
      
      <div className="relative ">
      <input
        type="text"
        placeholder="Search..."
        className="pl-11 w-96 pr-4 py-1 rounded-xl border-2  border-gray-300 focus:outline-none focus:border-gray-700"
      />
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
       <img src={search}/>
      </div>
    </div>
   
      <div className="flex items-center justify-center">
      <div className='w-5 h-5 mr-8  '>
       <img src={notify}/>
      </div>
        <div className="flex flex-col item-center justify-center">
        
        <h4 className="pr-4 font-semibold text-black">Welcome back</h4>
        <div className="  text-red-600 font-semibold">
        {!user ? <h4>Loading</h4> :  <h4>{user.agencyName}</h4> }
        </div>
        </div>
        <div>
        <div className="relative flex pr-3">
        <img
              src={Avatar} // Replace with your avatar image
              alt="Avatar"
              className="w-10 h-10 rounded-full border-black border"
            />
          {/* Avatar */}
          <button onClick={toggleDropdown} className="focus:outline-none flex space-x-1 pl-1 " >
            {isClicked?  <img src={up} className=" mt-2"/>:<img src={down} className="mt-2"/>}
            
           
          </button>
         
          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute z-50  top-12 right-0 flex flex-col justify-between items-center my-3 gap-x-3  bg-black rounded pl-8 pr-8">
              <a href="/adminDashboard/agency-profile" className="flex w-full items-center  my-1 px-8 py-2 mt-4 text-sm transition-all font-medium rounded-md text-white hover:bg-gray-700">
                Profile
              </a>
              <a href="/adminDashboard/setting" className="flex w-full items-center my-1 px-8 py-2 text-sm transition-all font-medium rounded-md text-white hover:bg-gray-700">
                Settings
              </a>
              <a href="#" className="flex w-full items-center my-1 mb-2 px-8 py-2 text-sm transition-all font-medium rounded-md text-white hover:bg-gray-700">
                Logout
              </a>
            </div>
          )}
        </div>
       
    
      </div>
    
      </div>
      
    </div>
  );
};

export default AdminNavbar;
