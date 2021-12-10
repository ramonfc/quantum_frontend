import React, { useEffect, useState } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Navbar from "components/Navbars/Navbar.js";
import Footer from "components/Footer/Footer.js";
import Sidebar from "components/Sidebar/Sidebar.js";
import Carrusel from 'components/Carrusel/Carrusel'
import EditarProyecto from 'components/EditarProyecto/EditarProyecto.js'

import routes from "../../src/routes.js";
let rutasModificadas = [];

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logoinvertido.png";
//import carruselListar from "components/carruselListar/carruselListar.js";


let ps;

const useStyles = makeStyles(styles);

export default function Admin1({ ...rest }) {


 
  const [errors, seterrors] = useState('');
  const [rol, setRol] = useState('null');


  //ROUTESS
  
  // if (user.email == 'justmarketco@gmail.com') {
  //   rutasModificadas = routes
  //   console.log('routes: ', routes);
  //   console.log('rutasModificadas: ', rutasModificadas);
  //   rutasModificadas.splice(3, 1);
  // }
  // let rol='null';
   // FUNCION PARA ENCONTRAR ROL
 



  rutasModificadas = [];
  console.log('Admin Layout - routes: ', rutasModificadas);
  const switchRoutes = (
    <Switch>
      
      {routes.map((ruta, key) => {
        console.log('key:', key);
        
        if (ruta.layout === "/user") {

          rutasModificadas.push(ruta);
          return (
            <Route
              exact path={ruta.layout + ruta.path}
              component={ruta.component}
              key={key}

            />
          );
        }else{return null;}
        
      })}
       <Route exact path = '/user/list-projects/:identificador' component={EditarProyecto}></Route>
       {/* <Route exact path = '/user/profile/:nombre' component={carruselListar}></Route>
       <Route exact path = '/user/proyecto/edit' component={carruselListar}></Route>
       <Route exact path = '/user/usuario/edit' component={carruselListar}></Route>
       <Route exact path = '/user/inscripcion/edit' component={carruselListar}></Route>
       <Route exact path = '/user/avance/edit' component={carruselListar}></Route> */}
       
      <Redirect from="/user" to="/user/dashboard" />
    </Switch>
  );


  //ROUTESS


  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  const [image, setImage] = React.useState(bgImage);
  const [color, setColor] = React.useState("blue");
  const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const handleImageClick = (image) => {
    setImage(image);
  };
  const handleColorClick = (color) => {
    setColor(color);
  };
  const handleFixedClick = () => {
    if (fixedClasses === "dropdown") {
      setFixedClasses("dropdown show");
    } else {
      setFixedClasses("dropdown");
    }
  };
  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };
  // const getRoute = () => {    //INFINITY
  //   return window.location.pathname !== "/admin/maps";
  // };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      document.body.style.overflow = "hidden";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        ps.destroy();
      }
      window.removeEventListener("resize", resizeFunction);

    };
  }, ); //mainPanel,user,loading


  return (
    <div className={classes.wrapper}>
      <Sidebar
        routes={rutasModificadas}
        logoText={"INFINITY"}
        logo={logo}
        image={image}
        handleDrawerToggle={handleDrawerToggle}
        open={mobileOpen}
        color={color}
        {...rest}
      />
      <div className={classes.mainPanel} ref={mainPanel}>
        {/* //HEADER ------ INFINITY */}
        <Navbar
          // routes={rutasModificadas}
          // handleDrawerToggle={handleDrawerToggle}
          // {...rest}
        />

        <div className={classes.content}>
          <div className={classes.container}>{switchRoutes}</div>
        </div>

        <Footer />
        {/* <FixedPlugin
          handleImageClick={handleImageClick}
          handleColorClick={handleColorClick}
          bgColor={color}
          bgImage={image}
          handleFixedClick={handleFixedClick}
          fixedClasses={fixedClasses}
        /> */}
      </div>
    </div>
  );
}
