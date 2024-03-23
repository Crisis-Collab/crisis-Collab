import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { db } from "../../../firebase/firebase.config";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";

const AdminCitizen = () => {
  const auth = getAuth();
  const [citizens, setCitizens] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const citizensCollectionRef = collection(db, "users");
        const q = query(citizensCollectionRef, where("userType", "==", "citizen"));
        const querySnapshot = await getDocs(q);
        const citizensData = [];
        querySnapshot.forEach((doc) => {
          citizensData.push({ id: doc.id, ...doc.data() });
        });
        setCitizens(citizensData);
      } catch (error) {
        console.error("Error fetching agencies: ", error);
      }finally {
        setTimeout(() => {
          setLoading(false); 
        }, 300);
      }
    };

    fetchData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await deleteDoc(doc(db, "users", id));
      setCitizens(citizens.filter((citizen) => citizen.id !== id));
      console.log("Agency deleted successfully!");
    } catch (error) {
      console.error("Error deleting agency: ", error);
    }
  };

 
  const filteredCitizens = citizens.filter((citizen) =>
    citizen.name.toLowerCase().includes(searchQuery.toLowerCase())
  );


  return (
    <div className="p-4">
      {loading && (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}

      <div className='bg-zinc-900  p-16'>
        <h1 className='text-center text-3xl font-semibold'>Total Number of Citizens : {citizens.length}</h1>
      </div>
      <div className=' mt-5'> 
        <div className=' p-2 text-center mb-2 space-x-2 flex items-center justify-center'>
          <input 
            type='text' 
            placeholder='Search by Citizen Name' 
            className='lg:w-6/12  w-full  py-2 pl-3 border focus:outline-none '
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button  className='bg-red-600 rounded-sm text-white cursor-pointer  px-8 py-2 font-semibold'>Search</button>
        </div>
        <section className="py-1">
          <div className="w-full  mb-12 xl:mb-0 px-4 mx-auto mt-24">
            <div className="relative flex flex-col  break-words bg-zinc-900 bg-opacity-25 w-full mb-6 shadow-lg rounded ">
              <div className="rounded-t mb-0 px-4 py-3 border-0">
                <div className="flex flex-wrap items-center">
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                    <h3 className="font-semibold text-base text-white text-blueGray-700">All Citizens</h3>
                  </div>
                  <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                    {/* <button className="bg-indigo-500 text-white active:bg-indigo-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150" type="button">See all</button> */}
                  </div>
                </div>
              </div>

              <div className="block w-full overflow-x-auto">
                <table className="items-center bg-transparent w-full border-collapse ">
                  <thead>
                    <tr>
                      <th className="px-6 bg-blueGray-50 text-red-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Citizen Name
                      </th>
                      <th className="px-6 bg-blueGray-50 text-red-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Location
                      </th>
                      <th className="px-6 bg-blueGray-50 text-red-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        City
                      </th>
                      <th className="px-6 bg-blueGray-50 text-red-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Edit
                      </th>
                      <th className="px-6 bg-blueGray-50 text-red-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                        Delete
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {!loading && filteredCitizens.map((citizen, index) => (
                      <tr key={index}>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-gray-100">
                          {citizen.name}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-gray-100">
                          {citizen.completeAddress}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-gray-100">
                          {citizen.city}
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-gray-100">
                          <button
                            className="bg-yellow-500 text-white active:bg-yellow-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                        </td>
                        <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                          <button
                            onClick={() => handleDelete(citizen.id)}
                            className="bg-red-500 text-white active:bg-red-600 text-xs font-bold uppercase px-3 py-1 rounded outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                          >
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminCitizen;
