import React, { useState,useEffect } from 'react'
import Logo from "../../../assets/LOGO2.png";
import AdminSidebarData from '../../../Data/AdminSidebarData';
import { Link,useLocation } from 'react-router-dom';
import { Modal } from 'flowbite-react';
import { auth } from '../../../firebase/firebase.config';
import { FiLogOut } from 'react-icons/fi';

const AdminSidebar = () => {
    const defaultPath = "/admin/dashboard";
    const [activePath, setActivePath] = useState(defaultPath);
    const location = useLocation();
    const [openModal, setOpenModal] = useState(false);
 

    const handleLogout=()=>{
      auth.signOut().then(()=>{
      
        navigate('/admin-login');
        console.log("Logout Successfull");
        console.log(auth);
      })
    }
  
    
    React.useEffect(() => {
        setActivePath(location.pathname);
      }, [location]);
  return (
    <>
     <div className=' bg-zinc-900 h-screen flex flex-col justify-between'>
        <div>
        <div className="flex items-center lg:px-8 lg:py-8 ">
        
        <img src={Logo} alt="Logo" className="h-8 w-8 mr-2 " />
        <span className="text-red-600 text-2xl font-medium">Crisis</span>
        <span className="text-red-600 font-semibold pt-2"> collab</span>
      </div>
        
        <ul className='pt-6 p-4'>
  {AdminSidebarData.map((item) => (
    <li key={item.id} className="flex flex-col font-normal ">
      <Link
        to={item.path}
        className={`py-2 m-2 px-3 flex rounded-full  ${
            activePath === item.path
              ? "bg-red-800 bg-opacity-25 text-red-500 font-semibold"
              : "hover:bg-gray-300 hover:bg-opacity-15 text-gray-100"
          } `}
      >
        <div className="flex  ">
          {item.icon && (
            <item.icon className={`inline-block  w-7 h-7`} />
          )}
        </div>
        <div className={`ml-4 mr-2 `}>
          {item.name}
        </div>
      </Link>
    </li>
  ))}
</ul>


</div>
      
     <div>
    <button className='w-full items-center flex justify-center bg-red-600 hover:bg-red-700 text-white py-3 font-semibold' onClick={() => setOpenModal(true)}><FiLogOut className="mr-4 text-lg" />Logout</button>
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
</div>
    </>
  )
}

export default AdminSidebar
