import React from 'react'
import { LuLayoutDashboard } from "react-icons/lu";
import { useLocation } from 'react-router-dom';

const UserNavbar = () => {
  const location = useLocation();
  const activePath = location.pathname.split("/")[2]
  
  return (
    <>
      <div className="bg-zinc-900 flex space-x-2 items-center justify-start px-5 py-3">
           <LuLayoutDashboard className="text-xl text-white"/>
           <h1 className="text-base font-medium p-3 text-gray-100 uppercase">{activePath}</h1>
      </div>
    </>
  )
}

export default UserNavbar
