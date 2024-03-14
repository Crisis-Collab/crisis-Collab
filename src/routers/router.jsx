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
  import Logout from "../components/Logout";
  import Signup from '../Pages/Signup.jsx'
import Landing from "../components/Home/Landing.jsx";
import LandContact from "../components/Home/LandContact.jsx";

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
    path:'/signup',
    element:<Signup/>
    },
    {
    path:'/logout',
    element:<Logout/>
    }
  ]);

  export default router;