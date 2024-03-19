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
        }
        
      ]
    },
    {
      path:'/login',
      element:<Login/>
    } ,
   {
    path:'/adminDashboard',
    element:<AdminDashboard/>
   },
   {
    path:'/CitizenDashboard',
    element:<CitizenDashboard/>
   }
  ]);

  export default router;