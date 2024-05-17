import { useState } from 'react'

import './App.css'

import Navbar from './Common/Navbar.jsx'
import Footer from './Common/Footer.jsx'
import { Outlet } from 'react-router-dom'
import Crisp from './components/Crisp.jsx'






function App() {
  

  return (
    <>
   <Navbar />
   <div className='min-h-screen'>
    <Outlet/>
    <Crisp/>
   </div>
   <Footer/>
 
    </>
  )
}

export default App
