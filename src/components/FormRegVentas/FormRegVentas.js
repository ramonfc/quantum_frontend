import React, { Component, useState, useCallback, useEffect } from 'react';
import { Row, Col, Button, Container, Form, Label } from 'reactstrap';
import './FormRegVentas.css'
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import GridItem from "components/Grid/GridItem";
import ProductosVenta from '../../components/ProductosVenta/ProductosVenta'
import ProductsToAdd from '../../components/ProductosVenta/ProductsToAdd'
import InputLbl from "components/InputLbl/InputLbl";
import SelectCustom from 'components/SelectCustom/SelectCustom';


import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import { getAuth } from "firebase/auth";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../Firebase/Firebase";


const options = [
    { value: "proceso", label: "En Proceso" },
    { value: "entregada", label: "Entregada" },
    { value: "cancelada", label: "Cancelada" }
];


const BASE_URL = process.env.REACT_APP_BASE_URL;
const PATH_VENTAS = "sales"



export const FormRegVentas = props => {

    const auth = getAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [data, setData]= useState([]);
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    const [form, setForm] = useState({
      idVenta:"",
      idVendedor:"",
      nombreVendedor:"",
      valorTotal:0,
      estadoSale: "",
      idCliente:"",
      nombreCliente:"",
      fechaSale:"",
      fechaEnvio:"",
      fechaEntrega: ""
      });

    useEffect(() => {
        if (loading) return;
        if (!user) history.replace("/");
      }, [user, loading]);
  
  const insertar = useCallback(() => {
    setForm({
      idVenta:"",
      idVendedor:"",
      nombreVendedor:"",
      valorTotal:0,
      estadoSale: "",
      idCliente:"",
      nombreCliente:"",
      fechaSale:"",
      fechaEnvio:"",
      fechaEntrega: ""
    });
    let ventaACrear = { ...form
    };
    console.log(ventaACrear);
    crearVenta(ventaACrear);
    /* this.setState({ modalInsertar: false }); */
  });


  const handleChange = useCallback((e) => {
    setForm({ ...form,
      [e.target.name]: e.target.value
    });
    console.log(form)
  });

  const handleSelectChange = useCallback(() => {
    setForm({ ...form,
      estadoProdInv: value
    });
  });


  const cargarVentas = useCallback(() => {

    user.getIdToken(true).then(token => {
        const requestOptions = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          //body: JSON.stringify(usuarioACrear)
        };
        console.log("Token: ",token);
        

    fetch(`${BASE_URL}${PATH_VENTAS}`).then(result => result.json()).then(result => {
      setData(result);
    }, // Nota: es importante manejar errores aquí y no en 
    // un bloque catch() para que no interceptemos errores
    // de errores reales en los componentes.
    error => {
      console.log(error);
    })
    });
  });


  const crearVenta = useCallback((ventaACrear) => {

    console.log(`${BASE_URL}${PATH_VENTAS}`)
    // Simple POST request with a JSON body using fetch
    user.getIdToken(true).then(token => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(ventaACrear)
    }; //console.log(requestOptions);
    //alert("Producto creado exitosamente");
     
    
    fetch(`${BASE_URL}${PATH_VENTAS}`, requestOptions).then(result => result.json()).then(result => {
      //this.cargarProducts();
      console.log("result: ", result);
      alert("Espera");
      cargarVentas();
    }, error => {
      console.log(error);
    })

    });
  });


  return <Card>
                <GridItem>
                    <CardHeader color="info">

                        <h4>Registro de Ventas</h4>

                    </CardHeader>

                    <Container>
                        <br />

                     
                        <Row>
                            <Col sm="6">
                                <InputLbl text="ID de la Venta" type="text" className="mb-3" name="idVenta" onChange={handleChange} value={form.idVenta}/>
                            </Col>

                            <Col sm="6">
                                <InputLbl text="ID del Vendedor" type="text" className="mb-3" name="idVendedor" onChange={handleChange} value={form.idVendedor}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="6">
                                <InputLbl text="Valor Total" type="text" className="mb-3" name="valorTotal" onChange={handleChange} value={parseInt(form.valorTotal)}/>
                            </Col>

                            <Col sm="6">
                                <InputLbl text="Nombre del Vendedor" type="text" className="mb-3" name="nombreVendedor"onChange={handleChange} value={form.nombreVendedor}/>
                            </Col>
                        </Row>

                        <Row>
                            <Col sm="6">
                                <Label>Estado de la Venta</Label>
                                <select type="select" name="estadoSale" style={{
                width: "100%",
                height: "2.2rem",
                fontSize: "1rem",
                border: "2px solid #d5dbe3",
                borderRadius: "5px"
              }} onChange={handleChange} value={form.estadoSale} className="mb-3">
                                    <option value=""></option>
                                    <option value="proceso">En Proceso</option>
                                    <option value="cancelada">Cancelada</option>
                                    <option value="entregada">Entregada</option>
                                </select>
                            </Col>

                            <Col sm="6">
                                <InputLbl text="ID del Cliente" type="text" className="mb-3" name="idCliente" onChange={handleChange} value= {form.idCliente}/>
                            </Col>
                        </Row>


                        <Row>
                            <Col sm="6">
                                <InputLbl text="Fecha de la venta" type="date" className="mb-3" name="fechaSale" onChange={handleChange} value={form.fechaSale}/>
                            </Col>

                            <Col sm="6">
                                <InputLbl text="Nombre del Cliente" type="text" className="mb-3" name="nombreCliente" onChange={handleChange} value= {form.nombreCliente}/>
                            </Col>
                        </Row>


                        <Row>
                            <Col sm="3">
                                <InputLbl text="Fecha del Envío" type="date" className="mb-3" name="fechaEnvio" onChange={handleChange} value={form.fechaEnvio}/>
                            </Col>

                            <Col sm="3">
                                <InputLbl text="Fecha de Entrega" type="date" className="mb-3" name="fechaEntrega" onChange={handleChange} value={form.fechaEntrega}/>
                            </Col>
                        </Row>

                        <Row className="mt-4">
                            <Col>
                                <Button type="submit" color="primary" onClick={insertar}>Registrar</Button>
                            </Col>

                            <Col>
                                <Button color="secondary" type="reset">Limpiar</Button>
                            </Col>
                        </Row>
       

                        {
          /* <Row id="vistaVentas">
             
                     <Form className= "mb-3">
                   
                       <Col  sm="8">
                         <InputLbl text="ID de la Venta" type="text" className="mb-3" name="idVenta" />
                         <InputLbl text="Valor Total" type="text" className="mb-3" name="valorTotal" />
                          
                         <Label  >Estado de la Venta</Label>
                         <select type="select" name="estadoVenta" style={{ width: "100%", height: "2.2rem", fontSize: "1rem", border: "2px solid #d5dbe3", borderRadius: "5px" }} onChange={this.handleChange} value={this.state.form.estadoVenta} className="mb-3">
                             <option value=""></option>
                             <option value="proceso">En Proceso</option>
                             <option value="cancelada">Cancelada</option>
                             <option value="entregada">Entregada</option>
                         </select>
                             <InputLbl text="Fecha de la venta" type="date" className="mb-3" name="fechaVenta" />
                             <Row className="fechas">
                             <Col>
                                 <InputLbl text="Fecha del Envío" type="date" className="mb-3" name="fechaEnvio" />
                             </Col>
                               <Col>
                                 <InputLbl text="Fecha de Entrega" type="date" className="mb-3" name="fechaEntrega" />
                             </Col>
                           </Row>
                     </Col>
                           <Col sm="4">
                         <InputLbl text="ID del Vendedor" type="text" className="mb-3" name="idVendedor" />
                           <InputLbl text="Nombre del Vendedor" type="text" className="mb-3" name="nombreVendedor" />
                           <InputLbl text="ID del Cliente" type="text" className="mb-3" name="idCliente" />
                           <InputLbl text="Nombre del Cliente" type="text" className="mb-3" name="nombreCliente" />
                       </Col>
                               <Row className= "mt-4">
                         <Col>
                             <Button  type="submit" color="primary" >Registrar</Button>
                         </Col>
                           <Col>
                             <Button   color="secondary" type="reset" >Limpiar</Button>
                         </Col>
                     </Row>
                   </Form>
                                </Row>
          */
        }
                    </Container>
                    <br />
                </GridItem>
            </Card>;

};

export default FormRegVentas
