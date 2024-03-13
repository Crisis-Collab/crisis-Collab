import { useState } from 'react'

import './App.css'

import Navbar from './Common/Navbar.jsx'
import Footer from './Common/Footer.jsx'
import { Outlet } from 'react-router-dom'
import Login from './Pages/Login.jsx'
import WebLand from './Pages/WebLand.jsx'
import LandService from './components/Home/LandService.jsx'



function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <Navbar/>
   <div className='min-h-screen'>
    <Outlet/>
   </div>
   <Footer/>
  {/* <WebLand/> */}

    </>
  )
}

export default App
