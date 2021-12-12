/*Login View Infinity*/
/*Importamos react, estilos de la vista y el logo*/
import React, { useEffect, useState } from "react";
import {
   Modal,
   ModalHeader,
   ModalBody,
   ModalFooter
} from "reactstrap";
import './LoginView.css'
import logo from '../../../src/assets/img/logoinfinity.png'
import {
   signInEmailAndPassword,
   signInWithGoogle,
} from "../../components/Firebase/Firebase";
import { useHistory } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";

// // @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
//import Hidden from "@material-ui/core/Hidden";

// // core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import styles from "assets/jss/material-dashboard-react/views/iconsStyle.js";
import Button from "@restart/ui/esm/Button";
import GoogleButton from 'react-google-button'
import { Alignment } from "react-data-table-component";
import Register from "components/Register/Register";
const useStyles = makeStyles(styles);



export default function ComponenteLogin() {
   const classes = useStyles();

   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const [errors, seterrors] = useState('');
   const history = useHistory();

   const [modalRegistro, setModalRegistro] = useState();

   const goToRegister = () => {

      setModalRegistro(true);

   }



   /* useEffect(() => {
      if (loading) {
         // maybe trigger a loading screen
         return;
      }
      if (user) { history.replace("/user/dashboard"); }
   }, [user, loading]); */

   return (

      <GridContainer justify="center">
         <GridItem xs={12} sm={12} md={8}>
            <Card>
               <CardHeader color="info">
                  <h4 className={classes.cardTitleWhite}>
                     Quantum: Gestor de proyectos
                  </h4>
                  <p className={classes.cardCategoryWhite}>
                     MisionTIC 2022
                  </p>
               </CardHeader>
               <CardBody>
                  <img className='img-login-logo' src={logo} />
                  <div className="container">
                     <div className="row text-center login-page">
                        <div className="col-md-12 login-form">
                           {/* <form action="/user/dashboard/" method="GET"> */}
                           <div className="row">
                              <div className="col-md-12 login-form-header">
                                 <p className="login-form-font-header">
                                 </p>
                              </div>
                           </div>
                           <div className="row">
                              <div className="login-field">
                                 <input
                                    name="email"
                                    type="text"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Correo electrónico"
                                    required
                                 />
                              </div>
                           </div>

                           <br />
                           <div className="row">
                              <div className="login-field">
                                 <input
                                    name="password"
                                    type="password"
                                    onChange={(e) => setPassword(e.target.value)}
                                    value={password}
                                    placeholder="Contraseña"
                                    required
                                 />
                              </div>
                           </div>
                           <div className="row">
                              <div className="col-md-12 login-form-row">
                                 <button className="btn btn-info" type="submit"
                                    onClick={() => signInUser(email, password)}>Iniciar Sesión</button>

                                 <br />
                                 <button className="btn btn-info" type="submit"
                                    onClick={() => goToRegister()}>Registrarse</button>

                                 <br />
                                 {/* <GoogleButton  style={{marginLeft: "9.5%", width: "80%"}} label='Ingresar con Google'
                                    onClick={signInWithGoogle}
                                 /> */}
                              </div>
                           </div>
                           {/* </form> */}
                        </div>
                     </div>
                  </div>



                  <ul className='container'>
                     <a href="#" className="insta">
                        {/* <Button>Google</Button>                     </a>
                     <a href="#" className="twitter" >
                        <span className="icon-twitter"></span>
                        <Button>Facebook</Button> */}

                     </a>
                  </ul>

               </CardBody>

               <Modal isOpen={modalRegistro}>
                  <ModalHeader>
                     <div><h3>Registrar nuevo usuario</h3></div>
                  </ModalHeader>

                  <ModalBody>
                     <Register />
                  </ModalBody>

                  <ModalFooter>
                     {/* <Button
                  color="primary"
                  onClick={() => (this.state.form)}
                >
                  Registrar
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => this.cerrarModalActualizar()}
                >
                  Cancelar
                </Button> */}
                  </ModalFooter>
               </Modal>

            </Card>
         </GridItem>
      </GridContainer>



   );
}
