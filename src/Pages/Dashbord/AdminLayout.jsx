import React from 'react'
import AdminSidebar from '../../components/AdminPanel/AdminSidebar/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
    <div className='flex'>
        {/*Sidebar */}
      <div className='w-1/6 '>
         <AdminSidebar/>
      </div>
      
        {/* Outlet */}
        
        <div>
          <Outlet/>
        </div>
     
      </div>
    </>
  )
}

export default AdminLayout
