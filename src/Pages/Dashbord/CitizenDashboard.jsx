import React from 'react'
import Navbar from '../../Common/Navbar'
import Hero from '../../components/CitizenDash/Hero'
import Welcome from '../../components/Home/Welcome'
import Footer from '../../Common/Footer'
import Stats from '../../components/CitizenDash/Stats'
import Services from '../../components/CitizenDash/Services'
import AboutUsDash from '../../components/CitizenDash/AboutUsDash'
import ContactUsDash from '../../components/CitizenDash/ContactUsDash'







const CitizenDasboard = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Welcome />
      <AboutUsDash />
      <Services />
      <ContactUsDash />


      <Footer />


    </>
  )
}

export default CitizenDasboard
