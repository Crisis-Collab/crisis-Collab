import React from 'react'
import AdminNavbar from '../../components/AdminDashboard/AdminNavbar'


import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/AdminDashboard/Sidebar/Sidebar'

const AdminDashboard = () => {
  return (

   
    <div className=' dashboard bg-white h-screen w-screen flex   '>
      <div  className='fixed top-0 left-0 right-0 z-10'><AdminNavbar/></div>
      
      <div className='bg-white p-2 fixed top-16 left-0 bottom-0 z-30 '>  <Sidebar isOpen={isOpen} handleDashboard={toggleSidebar}/> </div>
    
      <div className={`flex flex-col flex-1 overflow-y-auto mt-20 p-4 bg-red-900 bg-opacity-40 shadow-2xl rounded-2xl w-auto m-4 transition-all ${
          isOpen ? 'ml-[268px]' : 'ml-32'
        }`} >
        <div className='bg-white rounded-2xl shadow-2xl h-screen p-8 '>
        <Outlet/>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
