import { useState } from 'react'

import './App.css'

import Navbar from './Common/Navbar.jsx'
import Footer from './Common/Footer.jsx'
import { Outlet } from 'react-router-dom'






function App() {
  

  return (
    <>
   <Navbar />
   <div className='min-h-screen'>
    <Outlet/>
   </div>
   <Footer/>
  {/* <CitizenDasboard/> */}

    </>
  )
}

export default App
