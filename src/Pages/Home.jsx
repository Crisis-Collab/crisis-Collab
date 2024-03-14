import React from 'react'
import Landing from '../components/Home/Landing.jsx'
import Welcome from '../components/Home/Welcome.jsx'
import LandService from '../components/Home/LandService.jsx'
import News from '../components/Home/News/News.jsx'
import LandContact from '../components/Home/LandContact.jsx'


const Home = () => {
  
  return (
    <div>
        <Landing/>
        <Welcome/>
        <LandService/>
        <News/>
        <LandContact/>
        
    </div>
  )
}

export default Home
