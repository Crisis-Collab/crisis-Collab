import React from 'react'
import * as Icon from "react-icons/io5"
import AdminSideBarData from '../../../Data/AdminSideBarData'
import { Link } from 'react-router-dom'
const Sidebar = () => {

  return (
    <div className='bg-white shadow-2xl w-1/6 h-[530px] m-4 rounded-2xl'>
      <div className='flex flex-col items-center justify-center '>
      <div className="p-4 grid place-items-center">
        <h1 className="text-lg font-bold mb-4 ml-9 text-red-600">Admin Dashboard</h1>
        <ul>
          {AdminSideBarData.map(item => (
            
            <li key={item.id} className=" flex flex-col font-semibold">
               
              <Link to={item.path} className=" py-2 px-3 flex  hover:bg-gray-100 focus:bg-gray-200  rounded ml-4">
                <div className='flex mr-4 '>
              {item.icon && <item.icon className="inline-block mr-2  mx-4 w-8 h-8 " />}
              </div>
              <div className='ml-4 mr-3'>{item.name}</div>
                
              </Link>
              
            </li>
          ))}
        </ul>
      </div>
      </div>
    </div>
  )
}

export default Sidebar
