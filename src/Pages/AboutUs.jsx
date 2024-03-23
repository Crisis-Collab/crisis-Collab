import React from "react";


const AboutUs = () => {
  return (
    <div className="min-h-screen">
      <div className="h-72 bgAbout bg-center bg-cover"></div>
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between w-full p-6 lg:space-x-4">
        <div className="text-center lg:text-left lg:w-1/3">
          <h1 className="text-4xl lg:text-7xl font-bold mb-4 lg:mb-0">
            About Us
          </h1>
        </div>
        <div className="text-justify lg:p-6 lg:m-4 rounded-md text-base lg:text-lg lg:font-semibold lg:w-2/3">
          Welcome to Crisis Collab, a cutting-edge platform designed to
          revolutionize disaster management through technology and proactive
          strategies. Our mission is to empower rescue relief agencies,
          citizens, and volunteers to efficiently respond to natural and
          man-made calamities, minimizing loss of life and property damage.
        </div>
      </div>
      <div className="text-gray-400 text-sm p-6 text-center">
        ----------------------------Welcome to Crisis Collab-------------------------
      </div>

      <div className="lg:flex lg:p-6 p-4 lg:space-x-4 lg:justify-center lg:items-center">
        <div className="lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-0 text-center">
            Our Vision
          </h1>
          <p className="mt-8 text-center text-lg px-16">
            At Crisis Collab, we envision a world where advanced technology and
            coordinated efforts significantly reduce the impact of disasters. By
            fostering collaboration and communication among various
            stakeholders, we aim to create a resilient and prepared society.
          </p>
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4 lg:mb-0 text-center">
            Our Solution
          </h1>
          <p className="mt-8 text-center text-lg px-16">
            We are developing an integrated system comprising an Android
            application and a web platform to address the complexities of
            disaster management.
          </p>
        </div>
      </div>
      <div className="text-gray-400 text-sm p-6 text-center">
        ----------------------------Our Platforms-------------------------
      </div>
      <div className="lg:flex space-x-24 items-center justify-between p-6">
        <div className="lg:w-1/2">
          <h1 className="font-semibold text-3xl p-2">Android Application</h1>
          <p>
            Our mobile app is the core of our solution, enabling rescue agencies
            to register and participate in a dynamic network. The app offers
            real-time location tracking of registered agencies during
            calamities, facilitating quick and coordinated responses.
          </p>
          <h2 className="lg:text-lg font-medium pt-4 text-red-600">Key Features</h2>
          <ul className="list-disc ml-5 font-semibold">
            <li>Real-time location tracking</li>
            <li>Agency registration</li>
            <li>Inventory management</li>
          </ul>
        </div>
        <div className="lg:w-1/2">
          <h1 className="font-semibold text-3xl p-2">Web Platform</h1>
          <p>
            The website serves as an admin panel, providing a comprehensive view
            of all registered agencies and their activities. While new
            registrations are managed exclusively through the mobile app, the
            web platform displays critical data and insights for administrators
            to oversee and manage disaster response operations effectively.
          </p>
          <h2 className="lg:text-lg font-medium pt-4 text-red-600">Key Features</h2>
          <ul className="list-disc ml-5 font-semibold">
            <li>Proactive Approach</li>
            <li>Community Involvement</li>
            <li>Inventory management</li>
          </ul>
        </div>
      </div>

     
    </div>
  );
};

export default AboutUs;
