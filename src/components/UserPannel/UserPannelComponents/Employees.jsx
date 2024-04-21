import React, { useState, useEffect } from 'react';
import { getAuth } from 'firebase/auth';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../../../firebase/firebase.config';
import Emp from '../../../assets/Eimg.jpg'

const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showMoreInfo, setShowMoreInfo] = useState({});
  const auth = getAuth();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      console.log("Fetching current user...");

      try {
        const userRef = doc(db, 'users', auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          console.log("User document exists.");

          const employeeDocs = collection(db, 'users', auth.currentUser.uid, 'employees');
          const employeeQuerySnapshot = await getDocs(employeeDocs);

          if (employeeQuerySnapshot.empty) {
            console.log("No employee documents found.");
          } else {
            console.log("Employee documents found.");

            const employees = [];

            employeeQuerySnapshot.forEach(employeeDoc => {
              const employee = employeeDoc.data();
              employees.push(employee);
              // Initialize showMoreInfo state for each employee
              setShowMoreInfo(prevState => ({
                ...prevState,
                [employee.uid]: false
              }));
            });

            console.log("Employees:", employees);

            setEmployeeData(employees);
          }
        } else {
          console.log("No user document found!");
        }
      } catch (error) {
        console.error("Error fetching user document:", error);
      } finally {
        setLoading(false); // Move setLoading here to ensure it's always set to false after fetch
      }
    };

    fetchCurrentUser();
  }, [auth.currentUser.uid]);

  const fetchMoreInfo = async (employeeId) => {
    try {
      const employeeRef = doc(db, 'users', auth.currentUser.uid, 'employees', employeeId);
      const employeeSnap = await getDoc(employeeRef);

      if (employeeSnap.exists()) {
        const employeeData = employeeSnap.data();

        // Update the employee's data in the state
        setEmployeeData(prevState => {
          const updatedEmployees = prevState.map(employee => {
            if (employee.uid === employeeId) {
              return {
                ...employee,
                ...employeeData
              };
            }
            return employee;
          });
          return updatedEmployees;
        });

        // Toggle showMoreInfo for the clicked employee
        setShowMoreInfo(prevState => ({
          ...prevState,
          [employeeId]: !prevState[employeeId]
        }));
      } else {
        console.log("No such document!");
      }
    } catch (error) {
      console.error("Error fetching employee document:", error);
    }
  };

  return (
    <div className='  bg-fixed p-4 font-abc' >
      {loading && (
        <div className='fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50'>
          <div className='animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900' />
        </div>
      )}

      {!loading && (
        <div className=' ' >
          {/* <div className='fixed top-0 right-0 left-0'>
          <img src={Emp} className=''/> 
          </div> */}
          <div className='text-5xl font-semibold text-center '>
            
            <h1>Employees Work here -</h1>
          </div>
   <div className='flex space-x-5'>
          
          <div className='w-1/2'>
            {employeeData.map((employee) => (
              <div key={employee.uid} className=''>
                <div className='rounded-lg shadow-lg my-6 p-4  backdrop-blur-lg '>
                <div className='flex items-center justify-between'>
                  <div className='flex'>
                  <div className='rounded-full w-10 h-10 border  border-black'>
                  <img src={employee.profileUrl} className='rounded-full' alt="Profile" /> 
                  </div>
               <div className='items-start'>
                <h3 className='font-semibold text-black text-xl pl-4'>{employee.name}</h3>
                <p className='text-lg font-medium text-red-600 pl-4 '>Work Profile: {employee.workProfile}</p>
                </div>
                </div>
                <button onClick={() => { fetchMoreInfo(employee.uid); }} className='bg-red-600  px-4 py-2 rounded-lg mt-4 font-semibold hover:bg-red-800  shadow-md'>More Info</button>

                </div>
                 
                  
                
                  {!loading && showMoreInfo[employee.uid] && ( // Conditionally render more info
                    <div className='p-4  text-black space-y-4  '>
                        
                      <p className='font-semiold'>Aadhar Number: {employee.aadharNumber}</p>
                      <p>Full Address: {employee.fullAddress}</p>
                      <p>Gender: {employee.gender}</p>
                      <p>DOB: {employee.dob ? new Date(employee.dob.seconds * 1000).toLocaleDateString() : '-'}</p>
                      <p className='text-blue-500'>Email: {employee.email}</p>
                     
                     <div className='flex flex-col'>
                      <p>Aadhar Front:</p>
                      <div >
                      <img className='lg:w-1/2 lg:h-1/2' src={employee.aadharFrontUrl} alt="Aadhar Front" />
                      </div>
                      
                      <p>Aadhar Back:</p>
                      <div>
                      <img className='lg:w-1/2 lg:h-1/2' src={employee.aadharBackUrl} alt="Aadhar Back" />
                      </div>
                     </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className='lg:w-1/2'>
          <div className='flex  items-start justify-center space-x-5 lg:pt-7'>
          <div className='bg-red-600 px-4 py-2 rounded-lg font-bold  text-2xl'>
            <h1>Total Number of Employees</h1>
              <h2 className='font-bold text-white text-5xl  text-center'></h2>
          </div>
          <div className='bg-red-600 px-2 py-2 rounded-lg font-bold  text-2xl'>
            <h1>Total Number of Employees</h1>
              <h2 className='font-bold text-white text-5xl text-center'>50+</h2>
          </div>
          </div>
         <div className='grid place-items-center '>
          <img src={Emp} className='mt-9 rounded-lg   '/>
          
         </div>
          </div>
        </div>
        </div>
      )}
    </div>
  )
};

export default Employees;
