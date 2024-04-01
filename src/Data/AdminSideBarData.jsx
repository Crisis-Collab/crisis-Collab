import { IoPersonCircle,IoPeople,IoChatbubblesSharp  ,IoThunderstorm, IoNewspaper, IoPeopleSharp, IoSettings  } from 'react-icons/io5';
import { LuLayoutDashboard } from "react-icons/lu";
const AdminSideBarData = [
  {
    id: "1",
    name: "Dashbord",
    path: "/adminDashboard/dashboard",
    icon: LuLayoutDashboard 
  },
  {
    id: "2",
    name: "Agency Profile",
    path: "/adminDashboard/agency-profile",
    icon:  IoPersonCircle
  },
  {
    id: "3",
    name: "Weather",
    path: "/adminDashboard/Weather",
    icon:  IoThunderstorm 
  },
  {
    id: "4",
    name: "Inventory",
    path: "/adminDashboard/inventory",
    icon:   IoNewspaper
  },
  {
    id: "5",
    name: "Employees",
    path: "/adminDashboard/employees",
    icon:   IoPeople
  },
  {
    id: "6",
    name: "Help & Support",
    path: "/adminDashboard/help",
    icon: IoChatbubblesSharp 
  },
  {
    id: "7",
    name: "Setting",
    path: "/adminDashboard/setting",
    icon: IoSettings
  },
];

export default AdminSideBarData;