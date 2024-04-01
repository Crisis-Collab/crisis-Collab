import { useState } from 'react'

import './App.css'

import Navbar from './Common/Navbar.jsx'
import Footer from './Common/Footer.jsx'
import { Outlet } from 'react-router-dom'
import CitizenDasboard from './Pages/Dashbord/CitizenDashboard.jsx'





function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
