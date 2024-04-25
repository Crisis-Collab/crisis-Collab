import { IoPersonCircle, IoNewspaper, IoSettings  } from 'react-icons/io5';
import { LuLayoutDashboard } from "react-icons/lu";
const AdminSidebarData = [
  {
    id: "1",
    name: "Dashbord",
    path: "/admin/dashboard",
    icon: LuLayoutDashboard,
    
  },
  {
    id: "2",
    name: "Agency Data",
    path: "/admin/agency",
    icon:  IoPersonCircle,
    
  },
  {
    id: "3",
    name: "Citizen Data",
    path: "/admin/citizen",
    icon:   IoNewspaper,
  
   
  },
  {
    id: "4",
    name: "Setting",
    path: "/admin/setting",
    icon: IoSettings,
   
   
  },
  
 
  
  
];

export default AdminSidebarData;