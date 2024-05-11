import React, { useState, useEffect } from "react";
import { getAuth } from "firebase/auth";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db } from "../../../firebase/firebase.config";
import Emp from "../../../assets/Eimg.jpg";
import { useNavigate } from "react-router-dom";
import MoreInfo from "./MoreInfo"; // Import MoreInfo component

const Employees = () => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage] = useState(6);
  const auth = getAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCurrentUser = async () => {
      console.log("Fetching current user...");

      try {
        const userRef = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          console.log("User document exists.");

          const employeeDocs = collection(
            db,
            "users",
            auth.currentUser.uid,
            "employees"
          );
          const employeeQuerySnapshot = await getDocs(employeeDocs);

          if (employeeQuerySnapshot.empty) {
            console.log("No employee documents found.");
          } else {
            console.log("Employee documents found.");

            const employees = [];

            employeeQuerySnapshot.forEach((employeeDoc) => {
              const employee = employeeDoc.data();
              employees.push(employee);
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
        setLoading(false);
      }
    };

    fetchCurrentUser();
  }, [auth.currentUser.uid]);

  const filteredEmployees = employeeData.filter((employee) =>
    employee.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const indexOfLastEmployee = currentPage * employeesPerPage;
  const indexOfFirstEmployee = indexOfLastEmployee - employeesPerPage;
  const currentEmployees = filteredEmployees.slice(
    indexOfFirstEmployee,
    indexOfLastEmployee
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < Math.ceil(filteredEmployees.length / employeesPerPage)) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleMoreInfoClick = (employeeId) => {
    setSelectedEmployee(employeeId);
    navigate(`/userpannel/employees/${employeeId}/more-info`)
  };

  const handleMoreInfoClickClose = () => {
    setSelectedEmployee(null);
    navigate(`/userpannel/employees`)
  };

  return (
    <div className="bg-fixed p-4 font-abc">
      {loading && (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex justify-center items-center z-50">
          <div className="animate-spin rounded-full h-20 w-20 border-b-2 border-gray-900" />
        </div>
      )}

      {!loading && !selectedEmployee && (
        <div className="">
          <div className="bg-zinc-900 p-4 shadow-inner ">
            <div className="text-center flex items-center justify-center space-x-3">
              <p className="text-lg text-red-600 font-semibold">
                Search for Employee -{" "}
              </p>
              <input
                type="text"
                placeholder="Search "
                className="lg:w-6/12 w-full py-2 pl-3 border focus:outline-none"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button onClick={filteredEmployees} className="bg-red-600 rounded-sm text-white cursor-pointer px-8 py-2 font-semibold">
                Search
              </button>
            </div>
          </div>
          <div className="flex space-x-5">
          <div className="lg:w-1/2">
              <div className="flex items-start justify-center space-x-5 lg:pt-7">
                <div className="bg-red-600 px-2 py-2 font-bold text-center text-2xl">
                  <h1>Total Number of Employees</h1>
                  <h2 className="font-bold text-white text-5xl text-center">
                    {employeeData.length}
                  </h2>
                </div>
                <div className="bg-red-600 px-2 py-2  font-bold text-center text-2xl">
                  <h1>Total Number of Employees</h1>
                  <h2 className="font-bold text-white text-5xl text-center">
                    {employeeData.length}
                  </h2>
                </div>
              </div>
              <div className="grid place-items-center ">
                <img src={Emp} className="mt-9 rounded-lg" alt="Employees" />
              </div>
            </div>
            <div className="w-1/2 bg-zinc-900 p-4 mt-7 rounded-lg">
              <h1 className="text-lg text-red-600">Employees List</h1>
              {currentEmployees.map((employee) => (
                <div key={employee.uid} className="">
                  <div className="rounded-lg bg-zinc-600  bg-opacity-25 shadow-lg my-6 p-2 backdrop-blur-lg">
                    <div className="flex items-center justify-between">
                      <div className="flex">
                        <div className="rounded-full w-10 h-10 flex item-center justify-center border-black">
                          <img
                            src={employee.profileUrl}
                            className="rounded-full w-9 h-9"
                            alt="Profile"
                          />
                        </div>
                        <div className="items-start">
                          <h3 className="font-semibold text-gray-100 pl-4">
                            {employee.name}
                          </h3>
                          <p className="font-semibold text-red-600 pl-4">
                            Work Profile:{" "}
                            <span className="text-gray-100">
                              {employee.workProfile}
                            </span>
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          handleMoreInfoClick(employee.uid);
                        }}
                        className="hover:bg-red-600 hover:bg-opacity-25 text-gray-100 px-4 py-2 rounded-lg mt-4 bg-red-600 shadow-md"
                      >
                        More Info
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              <div className="flex justify-between mt-4">
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-red-600 rounded-lg text-white disabled:opacity-50"
                >
                  Previous
                </button>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage ===
                    Math.ceil(filteredEmployees.length / employeesPerPage)
                  }
                  className="px-4 py-2 bg-red-600 rounded-lg text-white disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
            
          </div>
        </div>
      )}

      {selectedEmployee && (
        <MoreInfo
          employee={selectedEmployee}
          handleMoreInfoClickClose={handleMoreInfoClickClose}
        />
      )}
    </div>
  );
};

export default Employees;
