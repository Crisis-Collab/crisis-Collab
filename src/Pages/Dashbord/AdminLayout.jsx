import React from 'react'
import AdminSidebar from '../../components/AdminPanel/AdminSidebar/AdminSidebar'
import { Outlet } from 'react-router-dom'

const AdminLayout = () => {
  return (
    <>
    <div className='flex'>
        {/*Sidebar */}
      <div className='w-1/6 fixed top-0 bottom-0 left-0'>
         <AdminSidebar/>
      </div>
      
        {/* Outlet */}
        
        <div className='bg-zinc-800 w-5/6 ml-[248px]'>
          <Outlet/>
        </div>
     
      </div>
    </>
  )
}

export default AdminLayout
