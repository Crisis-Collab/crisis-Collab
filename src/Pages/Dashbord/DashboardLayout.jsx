import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/UserPannel/Sidebar/Sidebar'
import UserNavbar from '../../components/UserPannel/UserNavbar';


const DashboardLayout = () => {
  const [isOpen,setIsOpen]=useState(true);
  const toggleSidebar=()=>{
    setIsOpen(!isOpen);
  }
  return (
   <>

   <div className='flex w-screen h-auto'>
    {/* Sidebar */}
    <div className={` fixed top-0 bottom-0 left-0 z-10 ${isOpen?'w-1/6 ':'w-1/12'}`}>
      <Sidebar isOpen={isOpen} handleDashboard={toggleSidebar} />
    </div>
     {/* Navbar+Outlet */}
     <div className={`     ${isOpen?'w-5/6  ml-[248px] ' : 'w-11/12  ml-[120px] '} `}>
      <div className={`  fixed top-0 right-0  z-10 ${isOpen?'w-5/6' : 'w-11/12 '}  `}><UserNavbar/></div>
   
     
      <div className={`flex flex-col flex-1 overflow-y-auto mt-16 p-2 bg-zinc-800  shadow-2xl  w-auto  transition-all }`} >
<div className=' p-4   '>
<Outlet/>
</div>


</div>
    
   </div>
   </div>
    {/* <div className=' dashboard bg-white h-screen w-screen flex   '>
      <div  className='fixed top-0 left-0 right-0 z-10'><UserNavbar/></div>
      
      <div className='bg-white shadow-inner p-2 fixed top-16 left-0 bottom-0 z-30 mb-2  '>  <Sidebar isOpen={isOpen} handleDashboard={toggleSidebar}/> </div>
    

      <div className={`flex flex-col flex-1 overflow-y-auto mt-16 p-2 bg-white  shadow-2xl rounded-2xl w-auto m-4 transition-all ${

          isOpen ? 'ml-[296px]' : 'ml-36'
        }`} >
        <div className=' p-2   '>
        <Outlet/>
        </div>
      
      
      </div>
    </div> */}
    </>
    
  )
}

export default DashboardLayout