import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
//import Navbar from "components/Navbars/Navbar.js";
//import Footer from "components/Footer/Footer.js";
// import Sidebar from "components/Sidebar/Sidebar.js";
// import FixedPlugin from "components/FixedPlugin/FixedPlugin.js";

import routes from "routes.js";

import styles from "assets/jss/material-dashboard-react/layouts/adminStyle.js";

//import bgImage from "assets/img/sidebar-2.jpg";
import LoginView1 from "views/LoginView/LoginView1.js"
// import logo from "assets/img/logoinfinity.png";

let ps;

const switchRoutes = (
  <Switch>
    {routes.map((prop, key) => {
      if (prop.layout === "/user") {
        return (
          <Route
            path={prop.layout + prop.path}
            component={prop.component}
            key={key}
          />
        );
      }
      return null;
    })}
    <Redirect from="/user" to="/user/dashboard" />
  </Switch>
);

const useStyles = makeStyles(styles);

export default function Admin() {
  // styles
  const classes = useStyles();
  // ref to help us initialize PerfectScrollbar on windows devices
  const mainPanel = React.createRef();
  // states and functions
  //const [image, setImage] = React.useState(bgImage);
  //const [color, setColor] = React.useState("blue");
  //const [fixedClasses, setFixedClasses] = React.useState("dropdown show");
  const [, setMobileOpen] = React.useState(false);
  // const handleImageClick = (image) => {
  //   setImage(image);
  // };
  // const handleColorClick = (color) => {
  //   setColor(color);
  // };
  // const handleFixedClick = () => {
  //   if (fixedClasses === "dropdown") {
  //     setFixedClasses("dropdown show");
  //   } else {
  //     setFixedClasses("dropdown");
  //   }
  // };
  // const handleDrawerToggle = () => {
  //   setMobileOpen(!mobileOpen);
  // };
  const getRoute = () => {
    return window.location.pathname !== "/admin/maps";
  };
  const resizeFunction = () => {
    if (window.innerWidth >= 960) {
      setMobileOpen(false);
    }
  };
  // initialize and destroy the PerfectScrollbar plugin
  React.useEffect(() => {
    if (navigator.platform.indexOf("Win") > -1) {
      try{
         ps = new PerfectScrollbar(mainPanel.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      });
      }
      catch(error){
        console.log("error atrapado" + error);
        
      } 
     
      document.body.style.overflow = "visible";
    }
    window.addEventListener("resize", resizeFunction);
    // Specify how to clean up after this effect:
    return function cleanup() {
      if (navigator.platform.indexOf("Win") > -1) {
        try{
          ps.destroy();
        }catch(error){
          console.log("error atrapado" + error);
        }
        
      }
      window.removeEventListener("resize", resizeFunction);
    };
  }, [mainPanel]);
  return (
    // <div className={classes.wrapper}>

    <div style={{ backgroundColor: "#e9ecef" }} >


      {/* On the /maps route we want the map to be on full screen - this is not possible if the content and conatiner classes are present because they have some paddings which would make the map smaller */}
      {getRoute() ? (
        <div className={classes.content}>
          <LoginView1 />
        </div>

      ) : (
        <div>
          {switchRoutes}
        </div>
      )}

      {/* {getRoute() ? <Footer /> : null} */}


    </div>

  );
}
