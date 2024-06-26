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
import DashboardLayout from "../Pages/Dashbord/DashboardLayout.jsx";
import Weather from "../components/UserPannel/UserPannelComponents/Weather.jsx";
import AgencyProfile from "../components/UserPannel/UserPannelComponents/AgencyProfile.jsx";
import Inventory from "../components/UserPannel/UserPannelComponents/Inventory.jsx";
import Help from "../components/UserPannel/UserPannelComponents/Help.jsx";
import MyProfile from "../components/UserPannel/UserPannelComponents/MyProfile.jsx";
import Dashboard from "../components/UserPannel/UserPannelComponents/Dashboard.jsx";
import Employees from "../components/UserPannel/UserPannelComponents/Employees.jsx";
import Sos from "../components/UserPannel/UserPannelComponents/Sos.jsx";
import Admin from "../Pages/Admin.jsx";
import AdminLogin from "../Pages/AdminLogin.jsx";
import AdminLayout from "../Pages/Dashbord/AdminLayout.jsx";
import AdminCitizen from "../components/AdminPanel/AdminPanelComponent/AdminCitizen.jsx";
import AdminAgency from "../components/AdminPanel/AdminPanelComponent/AdminAgency.jsx";
import AdminDashboard from "../components/AdminPanel/AdminPanelComponent/AdminDashboard.jsx";
import PrivateRoute from "../PrivateRoute/PrivateRoute.jsx";
import MoreInfo from "../components/UserPannel/UserPannelComponents/MoreInfo.jsx";
import AgencyMoreInfo from "../components/UserPannel/UserPannelComponents/AgencyMoreInfo.jsx";



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
      
      
    ]
  },
  {
    path:'/login',
    element:<Login/>
  } ,
  {
    path:'/admin-login',
    element:<AdminLogin/>
  },
 {
  path:'/userpannel',
  // element:<DashboardLayout/>,
  element: <PrivateRoute>
  <DashboardLayout/>
</PrivateRoute>,
  children:[
    {
      path:'/userpannel/agency-profile',
      element:<AgencyProfile/>
    },{
       path:'/userpannel/dashboard',
       element:<Dashboard/>,
      children:[
        {
          path:'/userpannel/dashboard/:agencyId/more-info',
          element:<AgencyMoreInfo/>,
        }
      ]
    },
    {
      path:'/userpannel/weather',
      element:<Weather/>
    },
    {
      path:'/userpannel/inventory',
      element:<Inventory/>
    },
    {
      path:'/userpannel/employees',
      element:<Employees/>,
      children:[
        {
          path:`/userpannel/employees/:employeeId/more-info`,
          element:<MoreInfo/>,
          
        }
      ]
    },

    {
      path:'/userpannel/profile',
      element:<MyProfile/>
    },
    {
      path:'/userpannel/weather',
      element:<ContactUs/>
    },{
      path:'/userpannel/sos',
      element:<Sos/>
    }
   
  ]

 },
 {
  path:'/admin',
  // element:<AdminLayout/>,
  element: <PrivateRoute >
  <AdminLayout/>
</PrivateRoute>,
  children:[
    {
      path:'/admin/citizen',
      element:<AdminCitizen/>
    },
    {
      path:'/admin/agency',
      element:<AdminAgency/>
    },
    {
      path:'/admin/dashboard',
      element:<AdminDashboard/>
    }
  ]
 }

]);

export default router;