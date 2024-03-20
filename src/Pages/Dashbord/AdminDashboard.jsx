import React from 'react'
import AdminNavbar from '../../components/AdminDashboard/AdminNavbar'


import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/AdminDashboard/Sidebar/Sidebar'

const AdminDashboard = () => {
  return (
    <div className='relative  p-4'>
      <div className=' fixed top-o left-0 right-0 p-4'>
      <AdminNavbar/>
      </div>
      <div className='fixed top-20 h-screen left-0 right-0 p-2'>
      <Sidebar/>
      </div>
      <div className=' fixed top-[17%] left-[20%] right-0 p-4 shadow-2xl bg-white rounded-lg min-h-screen  mr-4  '>
      <Outlet/>
      </div>
    </div>
  )
}

export default AdminDashboard
