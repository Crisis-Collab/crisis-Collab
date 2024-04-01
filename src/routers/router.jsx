import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from '../App';
import Home from "../Pages/Home"
import AboutUs from "../Pages/AboutUs.jsx"
import MainNews from "../Pages/MainNews"
import Service from "../Pages/Service"
import ContactUs from "../Pages/ContactUs";
import Login from "../Pages/Login.jsx";
import AdminDashboard from "../Pages/Dashbord/AdminDashboard.jsx";
import CitizenDashboard from "../Pages/Dashbord/CitizenDashboard.jsx";
import Weather from "../components/AdminDashboard/AdminComponents/Weather.jsx";
import AgencyProfile from "../components/AdminDashboard/AdminComponents/AgencyProfile.jsx";
import Inventory from "../components/AdminDashboard/AdminComponents/Inventory.jsx";
import Help from "../components/AdminDashboard/AdminComponents/Help.jsx";
import Setting from "../components/AdminDashboard/AdminComponents/Setting.jsx";
import Dashboard from "../components/AdminDashboard/AdminComponents/Dashboard.jsx";
import Employers from "../components/AdminDashboard/AdminComponents/Employees.jsx";
import Employees from "../components/AdminDashboard/AdminComponents/Employees.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      { 
        path:"/",
        element:<Home/>,   
      },
      { 
        path:"/about",
        element:<AboutUs/>
      },
      { 
        path:'/news',
        element:<MainNews/>
      },
      { 
        path:'/service',
        element:<Service/>
      },
      {
        path:'/contact',
        element:<ContactUs/>
      },
      {
        path:'/weather',
        element:<ContactUs/>
      }
      
    ]
  },
  {
    path:'/login',
    element:<Login/>
  } ,
 {
  path:'/adminDashboard',
  element:<AdminDashboard/>,
  children:[
    {
      path:'/adminDashboard/agency-profile',
      element:<AgencyProfile/>
    },{
       path:'/adminDashboard/dashboard',
       element:<Dashboard/>
    },
    {
      path:'/adminDashboard/Weather',
      element:<Weather/>
    },
    {
      path:'/adminDashboard/inventory',
      element:<Inventory/>
    },
    {
      path:'/adminDashboard/employees',
      element:<Employees/>
    },
    {
      path:'/adminDashboard/help',
      element:<Help/>
    },
    {
      path:'/adminDashboard/setting',
      element:<Setting/>
    },
   
  ]
 },
 {
  path:'/CitizenDashboard',
  element:<CitizenDashboard/>
 }
]);

export default router;