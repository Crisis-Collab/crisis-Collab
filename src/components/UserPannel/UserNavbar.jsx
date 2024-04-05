import React, { useEffect, useState ,useRef} from "react";
import Logo from "../../assets/LOGO2.png";
import Avatar from "../../assets/citizenAVa.jpg";
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase.config";
import search from '../../assets/search.png'
import notify from '../../assets/notify.png'
import { Modal } from 'flowbite-react';
import { useNavigate} from "react-router-dom";


const AdminNavbar = () => {
  const [loading,setLoading] =useState(false);
  const [user,setUser] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [isClicked,setIsClicked] =useState(false);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
    setIsClicked(!isClicked);
  };
  const handleLogout=()=>{
    auth.signOut().then(()=>{
    
      navigate('/');
      console.log("Logout Successfull");
      console.log(auth);
    })
  }

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

    <div className=" bg-white py-1  pr-8 shadow-2xl flex items-center justify-between  w-full relative">
      <div className="flex items-center pl-8">
        
        <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 " />
        <span className="text-red-600 text-2xl font-medium">Crisis</span>
        <span className="text-red-600 font-semibold pt-2"> collab</span>
      </div>
      <div className="relative ">
      <input
        type="text"
        placeholder="Search..."
        className="pl-11 pr-4 py-1  w-96 rounded-lg border-2 border-gray-300 focus:outline-none focus:border-black"
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
        {!user ? <h4>Loading</h4> : <h4>{user.userType === "agency-admin" ? user.agencyName : user.name}</h4>}
        </div>
        </div>
        <div>
        <div className="relative flex">
        
          {/* Avatar */}
          <button onClick={toggleDropdown} className="focus:outline-none flex space-x-1 pl-1" >
          <img
              src={Avatar} // Replace with your avatar image
              alt="Avatar"
              className="w-10 h-10 rounded-full"
            />
          </button>
         
          {/* Dropdown menu */}
          {isOpen && (
            <div className="absolute z-30  top-8 right-0 flex flex-col justify-between items-center my-6   bg-black rounded pl-8 pr-8">
              <a href="/adminDashboard/agency-profile" className="flex w-full items-center  my-1 px-8 py-2 mt-4 text-sm transition-all font-medium rounded-md text-white hover:bg-gray-700">
                Profile
              </a>
              <a href="#" className="flex w-full items-center my-1 px-8 py-2 text-sm transition-all font-medium rounded-md text-white hover:bg-gray-700">
                Settings
              </a>

              <button
                className="  w-full items-center my-1 px-4 mb-4 py-2 text-sm transition-all font-medium rounded-md text-white hover:bg-red-700 bg-red-600 "
                onClick={() => setOpenModal(true)}
              >
                Logout
              </button>
              <div >
              <Modal show={openModal} onClose={() => setOpenModal(false)} className=" pt-52 px-[500px] w-full h-screen flex items-center justify-center bg-gray-900 bg-opacity-50">
         
                <Modal.Header className=" text-black p-2 text-xl "></Modal.Header>
                
                <Modal.Body className=" ">
                  <div className="space-y-2 flex flex-col items-center justify-center text-center">
                   
                    <p className="text-lg leading-relaxed text-gray-800 dark:text-gray-400">
                     Are you sure you want to Logout? 
                    </p>
                    <div className="flex space-x-8">
                    <button className="bg-green-600 px-8 py-2 rounded-lg text-white font-medium  " onClick={handleLogout}>Yes</button>
                   
                    <button className="bg-red-700 px-8 py-2 rounded-lg text-white font-medium   " onClick={()=> setOpenModal(false)}>No</button>
                   
                    </div>
                   
                  </div>
                </Modal.Body>

                <Modal.Footer>
                 
                </Modal.Footer>
                
              </Modal>
              </div>
            </div>
          )}
        </div>
       
    
      </div>
    
      </div>
      
    </div>
  );
};

export default AdminNavbar;