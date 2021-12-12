import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import { Container, Form, Row, Col, Label, Input, Button } from "reactstrap"; //Container
import "./CrearUsuario.css";
import GridItem from "components/Grid/GridItem";

import fotoperfilramon from '../../../src/assets/img/fotoperfil.png'
import InputLbl from "components/InputLbl/InputLbl";
import SelectCustom from "components/SelectCustom/SelectCustom";

import React, { useEffect, useState, useCallback } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../Firebase/Firebase";

const options = [
    { value: "cc", label: "Cédula de Ciudadanía" },
    { value: "ce", label: "Cédula de Extranjería" },
    { value: "pasaporte", label: "Pasaporte" }
];


const BASE_URL = process.env.REACT_APP_BASE_URL;
//const BASE_URL = 'http://localhost:3000/';
const PATH_USERS = 'users';

console.log(`${BASE_URL}${PATH_USERS}`);

function CrearUsuario() {

    const auth = getAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [data, setData]= useState([]);
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();


    //Datos del formulario con estructura de la DB
    const [form, setForm] = React.useState({
               
          username: "",
          telephone: "",
          address: "",
          name: "",
          lastName: "",
          docType:"",
          documentId: "",
          password:"",
          rol:"",
          status:""
        
      });
    
  
  
    const register = () => {  
      if (!name) {
        alert("Please enter name");
      }  
      registerWithEmailAndPassword(name, email, password);
    };
  
  
    useEffect(() => {
      if (loading) return;
      if (!user) history.replace("/");
    }, [user, loading]);



    const agregarUsuario = (usuarioACrear) => {      
     setForm({
            username: "",
            telephone: "",
            address: "",
            name: "",
            lastName: "",
            docType:"",
            documentId: "",
            password:"",
            rol:"",
            status:""
        }); 
        //console.log("Insertar:",usuarioACrear);
        if( form.password.length >= 6 || form.username ){
           registerWithEmailAndPassword(form.name, form.username, form.password); //FireBase
        crearUsuario(usuarioACrear);//Mongo 
        }else{
            alert("La contraseña debe tener una longitud mayor a 6 dígitos");
        }
        
      };
      


      const crearUsuario = (usuarioACrear) => {           
        // Simple POST request with a JSON body using fetch
        user.getIdToken(true).then(token => {
            const requestOptions = {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
              },
              body: JSON.stringify(usuarioACrear)
            };
            console.log("Token: ",token);
            
      
        fetch(`${BASE_URL}${PATH_USERS}`, requestOptions)
        .then(result => result.json())
        .then(result => {
          console.log("result: ", result);
          let msg = result.length !==0? "Usuario creado": "Hubo un problema";
          alert(msg)
         
        }, error => {
          console.log(error);
        });
      });
    }


    const inputHandleChange = useCallback(
       (e) => {
        setForm({ ...form,
          [e.target.name]: e.target.value
        });
    //console.log(form)
      });


     /*  const inputHandleChange = (e) => {
        setUsuario((prevState) => ({
          ...prevState,
          form: {
            ...prevState.form,
            [e.target.name]: e.target.value,
          }
        }));
        //console.log(usuario.form)
      }; */
    

     const limpiarForm = useCallback(
         ()=>{
             setForm({
                username: "",
                telephone: "",
                address: "",
                name: "",
                lastName: "",
                docType:"",
                documentId: "",
                password:"",
                rol:"",
                status:""
             })
         }
     ); 

    const btnCrearUsuario = useCallback(
        () => {
            const usuarioACrear = {...form};
            console.log(usuarioACrear);
            agregarUsuario(usuarioACrear);
        });


        return (
            // <Container id="contenedor">
            <Container className="mt-4">

              <Row>

              </Row>
                        <Row>
                            <Col xs="4">

                                <InputLbl type="text" name="name" className="mb-4" text="Nombre(s)" onChange= {inputHandleChange} value={form.name} />

                                <InputLbl type="text" name="lastName" className="mb-4" text="Apellidos" onChange= {inputHandleChange} value={form.lastName} />

                                {/* <SelectCustom options={options} className="mb-4" text="Tipo de Documento" name="docType" onChange= {inputHandleChange} value={form.docType}/> */}


                                <Label>Tipo de Documento</Label>
                                <select type="select" name="docType" style={{width:"100%", height:"2.5rem", fontSize:"1rem", border: "2px solid #d5dbe3", borderRadius:"5px"}} onChange={e => inputHandleChange(e)} value={form.docType} className="mb-4">
                                    <option value=""></option>
                                    <option value="cc">Cédula de Ciudadanía</option>
                                    <option value="ce">Cédula de Extranjería</option>                                    
                                </select> 

                                <InputLbl type="text" name="documentId" className="mb-4" text="Número de Documento" onChange= {inputHandleChange} value={form.documentId}/>

                                <InputLbl type="text" name="address" className="mb-4" text="Dirección" onChange= {inputHandleChange} value={form.address}/>

                            </Col>

                            <Col xs="4">

                                <InputLbl type="text" name="telephone" className="mb-4" text="Teléfono" onChange= {inputHandleChange} value={form.telephone}/>

                                <InputLbl type="text" name="username" className="mb-4" text="Email" onChange= {inputHandleChange} value={form.username}/>

                                <InputLbl type="text" name="password" className="mb-4" text="Contraseña" onChange= {inputHandleChange} value={form.password}/>


                                <Label>Estado Usuario</Label>
                                <select type="select" name="status" style={{width:"100%", height:"2.5rem", fontSize:"1rem", border: "2px solid #d5dbe3", borderRadius:"5px"}} onChange={e => inputHandleChange(e)} value={form.status} className="mb-4">
                                    <option value=""></option>
                                    <option value="activo">Activo</option>
                                    <option value="inactivo">Inactivo</option> 
                                    <option value="suspendido">Suspendido</option>
                                    <option value="bloqueado">Bloqueado</option>                                   
                                </select> 

                                
                                <br/>
                                <Label>Rol</Label>
                                <select type="select" name="rol" style={{width:"100%", height:"2.5rem", fontSize:"1rem", border: "2px solid #d5dbe3", borderRadius:"5px"}} onChange={e => inputHandleChange(e)} value={form.rol} className="mb-4">
                                    <option value=""></option>
                                    <option value="admin">Administrador</option>
                                    <option value="Vendedor">Vendedor</option>                         
                                    <option value="bodega">Almacenista</option>                                   
                                </select>
                                
                            </Col>

                            <Col xs="4">
                              
                                <img src={fotoperfilramon} style={{ width: "80%", height: "80%" }} />
                                 {/*  <br />
                                <Row className="mb-4">
                                    <br />
                                    <Col className="mt-3">
                                        <Button className="" type="submit" color="primary">Subir Foto</Button>
                                    </Col>

                                    <Col className="mt-3">
                                        <Button className="" type="submit" color="primary">Borrar Foto</Button>
                                    </Col> 

                               </Row> */}
                            </Col>
                        </Row>



                        <Row className="mb-4 mt-5">
                            <Col className="mt-3">
                                <Button className="" type="button" color="primary" onClick={btnCrearUsuario}>Crear</Button>
                            </Col>

                            <Col className="mt-3">
                                <Button className="" type="button" onClick={limpiarForm} color="primary">Limpiar</Button>
                            </Col>

                        </Row>

                        </Container>


        )
    }


export default CrearUsuario;