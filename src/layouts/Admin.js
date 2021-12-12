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
import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";
let rutasModificadas = [];

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

import bgImage from "assets/img/sidebar-2.jpg";
import logo from "assets/img/logoinvertido.png";

//INFINITY
import {
  auth,
  signInEmailAndPassword,
  signInWithGoogle,
} from "../components/Firebase/Firebase";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

let ps;




const useStyles = makeStyles(styles);

export default function Admin({ ...rest }) {


  const [user, loading, error] = useAuthState(auth);
  const [errors, seterrors] = useState('');
  const [rol, setRol] = useState('null');
  const history = useHistory();  //INFINITY


  //ROUTESS
  
  // if (user.email == 'justmarketco@gmail.com') {
  //   rutasModificadas = routes
  //   console.log('routes: ', routes);
  //   console.log('rutasModificadas: ', rutasModificadas);
  //   rutasModificadas.splice(3, 1);
  // }
  // let rol='null';
   // FUNCION PARA ENCONTRAR ROL
  const rolSelector = (result) => {

    console.log('rolSelector: ', result);
    result.map((usuario)=> {
      if (!user) { }
      else {
          console.log('usuario.username: ',usuario.username)
          console.log('user.email: ',user.email)
          if (usuario.username === user.email){
            setRol(usuario.rol);
            console.log('Entreeeee')
          }
   
      }
    })
    
  }; 



  rutasModificadas = [];
  console.log('Admin Layout - routes: ', rutasModificadas);
  const switchRoutes = (
    <Switch>
      
      {routes.map((ruta, key) => {
        //console.log('key:', key);
        if (!user) { }
        else {
         
            //rol = 'admin';
            console.log('rol: ', rol)
     
        }
        
        if (ruta.layout === "/user" && ruta.permisos.match(rol)) {

          rutasModificadas.push(ruta);
          return (
            <Route
              path={ruta.layout + ruta.path}
              component={ruta.component}
              key={key}

            />
          );
        }else{return null;}
        
      })}
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

      //USEEFFECT INFINITY
      
      if (loading) return;
      if (!user) { return history.replace("/") } else {
        console.log('Admin Layout user:', user);
        console.log('Admin Layout history: ', history);
        // if (user.email == 'justmarketco@gmail.com') {
        //   // menu INFINITY
        //   rutasModificadas = routes
        //   console.log('routes: ', routes);
        //   console.log('rutasModificadas: ', rutasModificadas);
        //   rutasModificadas.splice(3, 1);
        // }
        user.getIdToken(true).then(token => {
          const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`,
            },
          };
          fetch(`${process.env.REACT_APP_BASE_URL}${"users"}`, requestOptions)
            .then(res => res.json())
            .then(
              (result) => {rolSelector(result)}//console.log('result: ',result)}
            )
        });

      }


    };
  }, [mainPanel]); //mainPanel,user,loading


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
