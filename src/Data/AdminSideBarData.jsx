
import { IoPersonCircle,IoThunderstorm, IoNewspaper, IoPeopleSharp, IoSettings  } from 'react-icons/io5';

const AdminSideBarData = [
  {
    id: "1",
    name: "Agency Profile",
    path: "/adminDashboard/agency-profile",
    icon:  IoPersonCircle
  },
  {
    id: "2",
    name: "Weather",
    path: "/adminDashboard/Weather",
    icon:  IoThunderstorm 
  },
  {
    id: "3",
    name: "Inventory",
    path: "/adminDashboard/inventory",
    icon:   IoNewspaper
  },
  {
    id: "4",
    name: "Help & Support",
    path: "/adminDashboard/help",
    icon: IoPeopleSharp
  },
  {
    id: "5",
    name: "Setting",
    path: "/adminDashboard/setting",
    icon: IoSettings
  },
];

export default AdminSideBarData;