import Calendar from "views/Calendar/Calendar.js";
import Dashboard from "views/Dashboard/Dashboard.js";
import FullScreenMap from "views/Maps/FullScreenMap.js";
import UserProfile from "views/Pages/UserProfile.js";
import CreateFarm from "views/Farms/CreateFarm.js";
import SeeFarm from "views/Farms/SeeFarm.js";
import CreateTree from "views/Trees/CreateTree.js";
import SeeTree from "views/Trees/SeeTree.js";
import CreateActivity from "views/Activities/CreateActivity.js";
import CreateSeeding from "views/Activities/CreateSeeding";
import SeeActivity from "views/Activities/SeeActivity.js";
import CreateTransaction from "views/Finances/CreateTransaction.js";
import SeeIncome from "views/Finances/SeeIncome.js";
import SeeExpense from "views/Finances/SeeExpense.js";
import Widgets from "views/Widgets/Widgets.js";
import Budget from "views/Finances/Budget";

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
    name: "Fincas",
    id: "fincas",
    icon: HomeIcon,
    state: "componentsCollapse",
    views: [
      {
        path: "/create_farm",
        name: "Crear Finca",
        id: "crearfinca",
        mini: "CG",
        component: CreateFarm,
        layout: "/admin"
      },
      {
        path: "/farms",
        name: "Ver Finca",
        id: "verfinca",
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
        path: "/create_tree",
        name: "Crear Árbol",
        mini: "CA",
        component: CreateTree,
        layout: "/admin"
      },
      {
        path: "/trees",
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
        path: "/create_activity",
        name: "Crear Actividad",
        mini: "CA",
        component: CreateActivity,
        layout: "/admin"
      },
      {
        path: "/create_seeding",
        name: "Crear Siembra",
        mini: "CS",
        component: CreateSeeding,
        layout: "/admin"
      },
      {
        path: "/activities",
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
        path: "/create_movements",
        name: "Crear Movimiento",
        mini: "CT",
        component: CreateTransaction,
        layout: "/admin"
      },
      {
        path: "/incomes",
        name: "Ver Ingresos",
        mini: "VI",
        component: SeeIncome,
        layout: "/admin"
      },
      {
        path: "/outcomes",
        name: "Ver Gastos",
        mini: "VG",
        component: SeeExpense,
        layout: "/admin"
      },
      {
        path: "/budget",
        name: "Presupuesto",
        mini: "PR",
        component: Budget,
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
    component: Widgets,
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
