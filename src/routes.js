/*!

=========================================================
* INFINITY WAS HERE
=========================================================

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
//import Person from "@material-ui/icons/Person";
//import LibraryBooks from "@material-ui/icons/LibraryBooks";
//import BubbleChart from "@material-ui/icons/BubbleChart";
//import LocationOn from "@material-ui/icons/LocationOn";
//import Notifications from "@material-ui/icons/Notifications";
//import Unarchive from "@material-ui/icons/Unarchive";
//import Language from "@material-ui/icons/Language";
import Add from "@material-ui/icons/Add";
import Create from "@material-ui/icons/Create";
//import List from "@material-ui/icons/List";
import { PersonAdd, ListAlt, People, ExitToApp, AccountCircle } from "@material-ui/icons";

// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.js";
import UserProfile from "views/UserProfile/UserProfile.js";
import TableList from "views/TableList/TableList.js";
import Typography from "views/Typography/Typography.js";
import Icons from "views/Icons/Icons.js";
import Maps from "views/Maps/Maps.js";
import NotificationsPage from "views/Notifications/Notifications.js";
import UpgradeToPro from "views/UpgradeToPro/UpgradeToPro.js";
// core components/views for RTL layout
import RTLPage from "views/RTLPage/RTLPage.js";

import CerrarSesion from "views/CerrarSesion/CerrarSesion.js"

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Inicio",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/user",
    permisos: 'admin, Vendedor, bodega, null'
  },
  {
    path: "/add-products",
    name: "Agregar Productos",
    icon: Add,
    component: UserProfile,
    layout: "/user",
    permisos: 'admin, bodega'
  },
  {
    path: "/list-products",
    name: "Listar Productos",
    icon: ListAlt,
    component: TableList,
    layout: "/user",
    permisos: 'admin, Vendedor, bodega'
  },
  {
    path: "/create-sale",
    name: "Crear Venta",
    icon: Create,
    component: Typography,
    layout: "/user",
    permisos: 'admin, Vendedor'
  },
  {
    path: "/list-sales",
    name: "Listar Ventas",
    icon: ListAlt,
    component: Icons,
    layout: "/user",
    permisos: 'admin, Vendedor'
  },
  {
    path: "/manage-users",
    name: "Crear Usuario",
    icon: PersonAdd,
    component: Maps,
    layout: "/user",
    permisos: 'admin'
  },
  {
    path: "/list-users",
    name: "Listar Usuarios",
    icon: People,
    component: NotificationsPage,
    layout: "/user",
    permisos: 'admin'
  },
  {
    path: "/logout",
    name: "Cerrar Sesion",
    icon: ExitToApp,
    component: CerrarSesion,
    layout: "/user",
    permisos: 'admin, Vendedor, bodega'
  },
  {
    path: "/profile",
    name: "Mi Perfil",
    icon: AccountCircle,
    component: UpgradeToPro,
    layout: "/user",
    permisos: 'admin, Vendedor, bodega'
  },
];

export default dashboardRoutes;
