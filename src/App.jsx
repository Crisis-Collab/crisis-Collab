import { useState } from 'react'

import './App.css'

import Navbar from './Common/Navbar.jsx'
import Footer from './Common/Footer.jsx'
import { Outlet } from 'react-router-dom'





function App() {


  return (
    <div className=''>
   <Navbar />
   <div className='min-h-screen'>
    <Outlet/>
   </div>
   <Footer/>


    </div>
  )
}

export default App
