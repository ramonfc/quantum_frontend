/*!

=========================================================
* INFINITY WAS HERE
=========================================================

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import Add from "@material-ui/icons/Add";
// You can find Icons Names in https://mui.com/components/material-icons/
import { AssignmentTurnedIn, ListAlt, People, ExitToApp, AccountCircle, NextWeek,School, CloudUpload} from "@material-ui/icons";

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
    permisos: 'ADMINISTRADOR, ESTUDIANTE, LIDER'
  },
  {
    path: "/create-project",
    name: "Crear Proyecto",
    icon: Add,
    component: UserProfile,
    layout: "/user",
    permisos: 'LIDER'
  },
  {
    path: "/list-projects",
    name: "Listar Proyectos",
    icon: ListAlt,
    component: TableList,
    layout: "/user",
    permisos: 'ADMINISTRADOR, ESTUDIANTE, LIDER'
  },
  {
    path: "/my-projects",
    name: "Mis Proyectos",
    icon: AssignmentTurnedIn,
    component: Typography,
    layout: "/user",
    permisos: 'ESTUDIANTE, LIDER'
  },
  {
    path: "/inscriptions",
    name: "Listar Inscripciones",
    icon: ListAlt,
    component: Icons,
    layout: "/user",
    permisos: 'LIDER'
  },
  {
    path: "/my-inscriptions",
    name: "Mis Inscripciones",
    icon: School,
    component: Maps,
    layout: "/user",
    permisos: 'ESTUDIANTE'
  },
  {
    path: "/advances",
    name: "Listar Avances",
    icon: NextWeek,
    component: Icons,
    layout: "/user",
    permisos: 'LIDER'
  },
  {
    path: "/my-advances",
    name: "Mis Avances",
    icon: CloudUpload,
    component: Maps,
    layout: "/user",
    permisos: 'ESTUDIANTE'
  },
  {
    path: "/list-users",
    name: "Listar Usuarios",
    icon: People,
    component: NotificationsPage,
    layout: "/user",
    permisos: 'ADMINISTRADOR, LIDER'
  },
  {
    path: "/logout",
    name: "Cerrar Sesion",
    icon: ExitToApp,
    component: CerrarSesion,
    layout: "/user",
    permisos: 'ADMINSTRADOR, LIDER, ESTUDIANTE'
  },
  {
    path: "/profile",
    name: "Mi Perfil",
    icon: AccountCircle,
    component: UpgradeToPro,
    layout: "/user",
    permisos: 'ADMINSTRADOR, LIDER, ESTUDIANTE'
  },
];

export default dashboardRoutes;
