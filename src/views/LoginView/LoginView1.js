import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { setRol, setName, setToken, setIdentificacion, getToken, getName, getRol, getIdentificacion } from "../../helpers/localStorage"

import {
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter
} from "reactstrap";

import Register from "components/Register/Register";

import axios from 'axios';
// estilos css Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import './LoginView.css'
import logo from '../../imgs/user-login.png'




const Login = () => {


    const [modalRegistro, setModalRegistro] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [clickButton, setClickButton] = useState(false);
    let history = useHistory();
    const user = {
        nombre: "",
        rol: "",
        identificacion: "",
        token: ""
    }

  
    const goToRegister = () => {

        setModalRegistro(true);

    }

    const cerrarModalRegistro = ()=>{
        setModalRegistro(false);        
    }
    

    const getAccessToken = async () => {
        try {
            const response = await axios.post('https://server-auth-quantum-f4fzhsmhma-uc.a.run.app/api/login', { //authServer
                email: email,
                clave: password
            });
            
            user.token = response.data.access_token;
            console.log('access_token', response.data.access_token);
           
            setToken(user.token);
            getUserType(user.token);

        } catch (error) {
            console.log("error: ",error.response);
            alert(error.response.data.access_token);
        }

    }

    const verifyToken = async (token) => {
        try {
            const response = await axios.get('https://server-auth-quantum-f4fzhsmhma-uc.a.run.app/api/verify', {
                headers: {
                    'authorization': token
                }
            })
            console.log('token expirado?: ', response.data.error)
            if (response.data.error) {
                localStorage.clear();
                //getAccessToken()
            }
            
            else {
                getUserType(user.token)
            }
        } catch {
            console.log('catchhh verifyToken')
        }
    }

    const getUserType = async (token) => {

        try {
            const response = await axios.get('https://server-auth-quantum-f4fzhsmhma-uc.a.run.app/api/verify', {
                headers: {
                    'authorization': token
                }
            })
            ///console.log('response ramon: ', response.data.error)
            user.rol = response.data.rol
            user.nombre = response.data.nombre
            user.identificacion = response.data.identificacion
            setRol(user.rol)
            setName(user.nombre)
            setIdentificacion(user.identificacion)

            console.log('rol', response.data.rol)
            console.log('nombre', response.data.nombre)
            console.log('identificacion', response.data.identificacion)
            // return history.replace("/perfil");
            if (!user.rol) return
            history.push('/user')

        } catch (error) {
            console.log(error)
            return
        }

    }


    useEffect(() => {

        user.token = getToken()
        console.log('useEffect: token', user.token)
        if (user.token === undefined || user.token == null) {
            console.log('no hay token, no hacer nada useEffect')

        } else {
            
            verifyToken(user.token)

        }

    }, []) 


    const ingreso = ()=>{
        user.token = getToken()
        console.log('user.token', user.token)
        if (user.token === undefined || user.token == null) {
            getAccessToken()

        } else {
            // validar token
            verifyToken(user.token)


        }
    }

    return (


        <div className="container">

            <div className="row text-center login-page">
                <div className="col-md-12 login-form"></div>
                <div>
                    <img className='login-logo' src={logo} alt='soy un alt prop' />

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
                            <br />
                            <button onClick={(e) => {
                               // setClickButton(!clickButton)
                               ingreso()

                            }} className="btn btn-info" type="submit">Iniciar Sesión</button>

                            <button className="btn btn-info" type="submit"
                                onClick={() => goToRegister()}>Registrarse</button>

                            <br />

                            <Modal isOpen={modalRegistro}>
                                <ModalHeader>
                                    <div><h3>Registrar nuevo usuario</h3></div>
                                </ModalHeader>

                                <ModalBody>
                                    <Register  e = {cerrarModalRegistro}/>
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

                        </div>
                    </div>
                    {/* </form> */}

                </div>
            </div>
        </div>





    )
};


export default Login;
