import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { getAuth } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import { useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";

const MoreInfo = ({ employee, handleMoreInfoClickClose }) => {
  const { employeeId } = useParams();
  const [employeeData, setEmployeeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const auth = getAuth();
  const location = useLocation();

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const employeeRef = doc(db, "users", auth.currentUser.uid, "employees", employeeId);
        const employeeSnap = await getDoc(employeeRef);

        if (employeeSnap.exists()) {
          const data = employeeSnap.data();
          setEmployeeData(data);
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching employee document:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmployeeData();
  }, [auth.currentUser.uid, employeeId]);

  if (loading) {
    return <div>Loading...</div>;
  }
  

  return (
    <div className="bg-fixed p-4 font-abc">
      <div className="bg-zinc-900 p-4 shadow-inner rounded-md">
        <button className="bg-zinc-800 bg-opacity-55  rounded-md font-semibold text-white px-4 py-2 flex items-center justify-center space-x-2" onClick={handleMoreInfoClickClose}>
          <IoArrowBackOutline />
          back
        </button>
        <div className="mt-6 p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl text-red-600 font-semibold">{employeeData.name}</h1>
              <p className="font-semibold text-red-600 ">Work Profile: <span className="text-gray-100">{employeeData.workProfile}</span></p>
            </div>
            <div>
              <p className="font-semibold text-red-600 "> Email:  <span className="text-blue-500">{employeeData.email}</span></p>
              <p className="font-semibold text-red-600">DOB: <span className="text-gray-100">{employeeData.dob ? new Date(employeeData.dob.seconds * 1000).toLocaleDateString() : '-'}</span></p>
            </div>
          </div>
          <div className="py-8">
            <h1 className="text-xl text-red-600 font-semibold">Verification Details</h1>
            <div>
              <p className="font-semibold text-red-300 p-2">Full Address: <span className="text-gray-100">{employeeData.fullAddress}</span> </p>
              <p className="font-semibold text-red-300 p-2">Aadhar Number: <span className="text-gray-100">{employeeData.aadharNumber}</span> </p>
              <p className="font-semibold text-red-300 p-2">Gender: <span className="text-gray-100">{employeeData.gender}</span> </p>
            </div>
          </div>
          <div className="flex flex-col lg:flex-row justify-center items-center w-full space-x-3">
            <div className="w-full p-2 flex justify-center items-center bg-black ">
              <div className="h-96 lg: w-full ">
                <p className="font-semibold text-red-600">Aadhar Front:</p>
                <img className="h-80 w-auto" src={employeeData.aadharFrontUrl} alt="Aadhar Front" />
              </div>
            </div>
            <div className="w-full p-2 flex justify-center items-center bg-black ">
              <div className="h-96 w-full ">
                <p className="font-semibold text-red-600">Aadhar Back:</p>
                <img className="h-80 w-full" src={employeeData.aadharBackUrl} alt="Aadhar Back" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreInfo;
