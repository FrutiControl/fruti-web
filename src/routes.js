import Calendar from "views/Calendar/Calendar.js";
import Charts from "views/Charts/Charts.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import UserProfile from "views/Pages/UserProfile.js";
import CreateFarm from "views/Farms/CreateFarm.js";
import SeeFarm from "views/Farms/SeeFarm.js";
import CreateTree from "views/Trees/CreateTree.js";
import SeeTree from "views/Trees/SeeTree.js";
import CreateActivity from "views/Activities/CreateActivity.js";
import SeeActivity from "views/Activities/SeeActivity.js";
import CreateTransaction from "views/Finances/CreateTransaction.js";
import SeeTransaction from "views/Finances/SeeTransaction.js";
import Widgets from "views/Widgets/Widgets.js";

// @material-ui/icons
import DashboardIcon from "@material-ui/icons/Dashboard";
import DateRange from "@material-ui/icons/DateRange";
import Place from "@material-ui/icons/Place";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import InfoIcon from "@material-ui/icons/Info";
import FaceIcon from "@material-ui/icons/Face";
import HomeIcon from "@material-ui/icons/Home";
import NaturePeopleIcon from "@material-ui/icons/NaturePeople";
import RowingIcon from "@material-ui/icons/Rowing";

var dashRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: DashboardIcon,
    component: Dashboard,
    layout: "/admin"
  },
  {
    collapse: true,
    name: "Granjas",
    icon: HomeIcon,
    state: "componentsCollapse",
    views: [
      {
        path: "/createfarm",
        name: "Crear Granja",
        mini: "CG",
        component: CreateFarm,
        layout: "/admin"
      },
      {
        path: "/seefarm",
        name: "Ver Granjas",
        mini: "VG",
        component: SeeFarm,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Árboles",
    icon: NaturePeopleIcon,
    state: "formsCollapse",
    views: [
      {
        path: "/createtree",
        name: "Crear Árbol",
        mini: "CA",
        component: CreateTree,
        layout: "/admin"
      },
      {
        path: "/seetree",
        name: "Ver Árboles",
        mini: "VA",
        component: SeeTree,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Actividades",
    icon: RowingIcon,
    state: "tablesCollapse",
    views: [
      {
        path: "/createactivity",
        name: "Crear Actividad",
        mini: "CA",
        component: CreateActivity,
        layout: "/admin"
      },
      {
        path: "/seeactivity",
        name: "Ver Actividades",
        mini: "VA",
        component: SeeActivity,
        layout: "/admin"
      }
    ]
  },
  {
    collapse: true,
    name: "Finanzas",
    icon: MonetizationOnIcon,
    state: "mapsCollapse",
    views: [
      {
        path: "/createmovements",
        name: "Crear Movimiento",
        mini: "CT",
        component: CreateTransaction,
        layout: "/admin"
      },
      {
        path: "/movements",
        name: "Ver Movimientos",
        mini: "VT",
        component: SeeTransaction,
        layout: "/admin"
      },
      {
        path: "/budget",
        name: "Presupuesto",
        mini: "PR",
        component: Widgets,
        layout: "/admin"
      }
    ]
  },
  {
    path: "/map",
    name: "Mapa",
    icon: Place,
    component: FullScreenMap,
    layout: "/admin"
  },
  {
    path: "/calendar",
    name: "Calendario",
    icon: DateRange,
    component: Calendar,
    layout: "/admin"
  },
  {
    path: "/information",
    name: "Información Agrícola",
    icon: InfoIcon,
    component: Charts,
    layout: "/admin"
  },
  {
    path: "/profile",
    name: "Mi Perfil",
    icon: FaceIcon,
    component: UserProfile,
    layout: "/admin"
  }
];
export default dashRoutes;
