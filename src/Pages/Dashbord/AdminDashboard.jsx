import React from 'react'
import AdminNavbar from '../../components/AdminDashboard/AdminNavbar'

import { Outlet } from 'react-router-dom'
import Sidebar from '../../components/AdminDashboard/Sidebar/Sidebar'

const AdminDashboard = () => {
  return (
    <div className='h-screen  p-4 pt-6'>

      <AdminNavbar/>
     <Sidebar/>
      <Outlet/>
    </div>
  )
}

export default AdminDashboard
