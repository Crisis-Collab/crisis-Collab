import { IoPersonCircle, IoPeople, IoChatbubblesSharp, IoThunderstorm, IoNewspaper, IoPeopleSharp, IoSettings } from 'react-icons/io5';
import { LuLayoutDashboard } from "react-icons/lu";
const SideBarData = [
  {
    id: "1",
    name: "Dashboard",
    path: "/userpannel/dashboard",
    icon: LuLayoutDashboard,

  },
  {
    id: "2",
    name: "Agency Profile",
    path: "/userpannel/agency-profile",
    icon: IoPersonCircle,
    "userType": "agency-admin"
  },
  {
    id: "3",
    name: "My Profile",
    path: "/userpannel/profile",
    icon: IoSettings,
    "userType": "citizen"

  },
  {
    id: "4",
    name: "Inventory",
    path: "/userpannel/inventory",
    icon: IoNewspaper,
    "userType": "agency-admin"
  },
  {
    id: "5",
    name: "Employees",
    path: "/userpannel/employees",
    icon: IoPeople,
    "userType": "agency-admin"
  },
  {
    id: "6",
    name: "Weather",
    path: "/userpannel/weather",
    icon: IoThunderstorm


  },
  {
    id: "7",
    name: "Help & Support",
    path: "/userpannel/help",
    icon: IoChatbubblesSharp,
  },
  {
    id: "8",
    name: "Emergency Number",
    path: "/userpannel/sos",
    icon: IoSettings,
    "userType": "citizen"
  },
];

export default SideBarData;