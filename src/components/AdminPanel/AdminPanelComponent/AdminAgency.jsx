import React, { useState, useEffect, useRef } from "react";
import { getAuth } from "firebase/auth";

const AdminAgency = () => {
  const auth = getAuth();
  return (
    <>
     <div className='p-4'> 
       <div className='bg-zinc-600 bg-opacity-25 p-16'>
         <h1 className='text-center text-3xl font-semibold'>Total Number of Agencies</h1>
       </div>
       <div className=' mt-5'> 
       <div className=' p-2 text-center mb-2 space-x-2 flex items-center justify-center'>
        <input type='text' placeholder='Search' className='lg:w-6/12  w-full  py-2 pl-3 border focus:outline-none '
      />
        <button  className='bg-red-600 rounded-sm text-white cursor-pointer  px-8 py-2 font-semibold'>Search</button>
      </div>
      <section class="py-1  ">
<div class="w-full xl:w-8/12 mb-12 xl:mb-0 px-4 mx-auto mt-24">
  <div class="relative flex flex-col min-w-0 break-words bg-zinc-600 bg-opacity-25 w-full mb-6 shadow-lg rounded ">
    <div class="rounded-t mb-0 px-4 py-3 border-0">
      <div class="flex flex-wrap items-center">
        <div class="relative w-full px-4 max-w-full flex-grow flex-1">
          <h3 class="font-semibold text-base text-white text-blueGray-700">All Agencies</h3>
        </div>
        <div class="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
          <button class="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button>
        </div>
      </div>
    </div>

    <div class="block w-full overflow-x-auto">
      <table class="items-center bg-transparent w-full border-collapse ">
        <thead>
          <tr>
            <th class="px-6 bg-blueGray-50 text-red-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Agency  name
                        </th>
          <th class="px-6 bg-blueGray-50 text-red-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Location
                        </th>
           <th class="px-6 bg-blueGray-50 text-red-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Department
                        </th>
          <th class="px-6 bg-blueGray-50 text-red-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Edit
                        </th>
                        <th class="px-6 bg-blueGray-50 text-red-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                          Delete
                        </th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <th class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700 ">
              /argon/
            </th>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 ">
              4,569
            </td>
            <td class="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              340
            </td>
            <td class="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
              <i class="fas fa-arrow-up text-emerald-500 mr-4"></i>
              46,53%
            </td>
          </tr>
    
        </tbody>

      </table>
    </div>
  </div>
</div>
<footer class="relative pt-8 pb-6 mt-16">
  <div class="container mx-auto px-4">
    <div class="flex flex-wrap items-center md:justify-between justify-center">
      <div class="w-full md:w-6/12 px-4 mx-auto text-center">
        <div class="text-sm text-red-500 font-semibold py-1">
          Made with <a href="https://www.creative-tim.com/product/notus-js" class="text-red-500 hover:text-gray-800" target="_blank">Notus JS</a> by <a href="https://www.creative-tim.com" class="text-red-500 hover:text-blueGray-800" target="_blank"> Creative Tim</a>.
        </div>
      </div>
    </div>
  </div>
</footer>
</section>
      

       </div>
     </div>
    </>
  )
}

export default AdminAgency
