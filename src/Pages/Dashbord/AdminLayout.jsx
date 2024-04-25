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
        
        <div className='bg-zinc-800 w-5/6'>
          <Outlet/>
        </div>
     
      </div>
    </>
  )
}

export default AdminLayout
