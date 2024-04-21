import { useState } from 'react'

import './App.css'

import Navbar from './Common/Navbar.jsx'
import Footer from './Common/Footer.jsx'
import { Outlet } from 'react-router-dom'
import AdminLayout from './Pages/Dashbord/AdminLayout.jsx'






function App() {
  

  return (
    <>
   <Navbar />
   <div className='min-h-screen'>
    <Outlet/>
   </div>
   <Footer/>
  {/* <CitizenDasboard/> */}
  {/* <AdminLayout/> */}

    </>
  )
}

export default App
