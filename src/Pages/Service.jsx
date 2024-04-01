import React from 'react'
import Map from '../assets/map.jpg'
import img1 from '../assets/register3.png'

const Service = () => {
  return (
    <div className='mt-16 '>
      <div className='text-5xl font-bold  flex items-center justify-center'><h1>Our Services</h1></div>
      <section className="text-gray-600 bg-white body-font">
        <div className="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
            <img className=" object-center rounded" alt="hero" src={img1} />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black"> Unified Registration System

            </h1>
            <p className="mb-8 leading-relaxed">Simplify collaboration by registering your rescue agency on our platform. Our unified registration system streamlines the onboarding process, making it easy for agencies to join our network.</p>

          </div>
        </div>
      </section>

      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900"> Resource Sharing</h1>
            <p className="mb-8 leading-relaxed">Access to vital resources is critical for effective relief operations. We enable rescue agencies to share and pool resources such as equipment, personnel, and expertise. This collaborative approach ensures that every agency has the support it needs to address emergencies promptly and effectively.</p>

            <p className="text-sm mt-2 text-gray-500 mb-8 w-full">Neutra shabby chic ramps, viral fixie.</p>

          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded" alt="hero" src={Map} />
          </div>
        </div>
      </section>
      <section className="text-gray-600 bg-white body-font">
        <div className="container mx-auto flex px-5 py-8 md:flex-row flex-col items-center">
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6 md:mb-0 mb-10">
            <img className="object-cover object-center rounded" alt="hero" src="https://dummyimage.com/720x600" />
          </div>
          <div className="lg:flex-grow md:w-1/2 lg:pl-24 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-black">Real-time Communication

            </h1>
            <p className="mb-8 leading-relaxed">Our platform provides a secure and efficient communication channel for agencies to connect in real-time. Whether it's sharing updates, requesting assistance, or coordinating efforts, our communication tools facilitate seamless interaction</p>

          </div>
        </div>
      </section>


    </div>
  )
}

export default Service
