import React, { Component, useState, useCallback, useEffect } from "react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import { Form, Row, Col, Label, Input, Button } from "reactstrap"; //Container
import "./FormRegProd.css";
import GridItem from "components/Grid/GridItem";
import InputLbl from "components/InputLbl/InputLbl";
import SelectCustom from "components/SelectCustom/SelectCustom";
import InputLblReq from "components/InputLblReq/InputLblReq";
import { WindowsBalloon } from "node-notifier";

import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { getAuth } from "firebase/auth";
import { responsiveFontSizes } from "@material-ui/core";



const options = [
  { value: "disponible", label: "Disponible" },
  { value: "noDisponible", label: "No Disponible" }
];


const BASE_URL = process.env.REACT_APP_BASE_URL;
//const BASE_URL = "http://localhost:3000/";
const PATH_PRODUCTS = 'products';


export const FormRegProd = props => {
  const [data, setData] = useState([]);

  const auth = getAuth();
  const [user, loading, error] = useAuthState(auth);
  const history = useHistory();

  const [modalActualizar, setModalActualizar] = useState(false);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [form, setForm] = useState({
    sku: "",
    nombreProducto: "",
    precioUnitario: "",
    estadoProdInv: "",
    cantidadDisponible: "",
    descripcionProducto: ""
  });

  React.useEffect(() => {

    if (loading) return;
    if (!user) return history.replace("/");
  }, [user, loading]);

  const [result, setResult] = useState();

  const insertar = (productoACrear) => {


    setForm({
      sku: "",
      nombreProducto: "",
      precioUnitario: "",
      estadoProdInv: "",
      cantidadDisponible: "",
      descripcionProducto: ""
    });
    /* let productoACrear = { ...form
    }; */
    console.log("Insertar:", productoACrear);
    crearProducto(productoACrear);
  };

  const limpiarFormulario = ()=>{
    setForm({
      sku: "",
      nombreProducto: "",
      precioUnitario: "",
      estadoProdInv: "",
      cantidadDisponible: "",
      descripcionProducto: ""
    });
    
  }

  const crearProducto = (productoACrear) => {



    // Simple POST request with a JSON body using fetch
    user.getIdToken().then(token => {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(productoACrear)
      };

      fetch(`${BASE_URL}${PATH_PRODUCTS}`, requestOptions).then(result => result.json()).then(result => {
        console.log("result: ", result);

      }, error => {
        console.log(error);
      });
    });
  }

  const onChange = (e) => {
    let productoACrear = { ...form };


    if (validateFields(productoACrear) === 0) {

      insertar(productoACrear); // this.setState({ modalInsertar: false }); 
    } else {
      e.preventDefault();
    }
  };

  const validateFields = (productoACrear) => {
    let p = 0;

    if (productoACrear.sku === "") {
      alert("El campo SKU es requerido");
      p += 1;
    }

    if (productoACrear.nombreProducto === "") {
      alert("El campo nombreProducto es requerido");
      p += 1;
    }

    if (productoACrear.precioUnitario < 0 || isNaN(productoACrear.precioUnitario) ) {
      alert("El campo Precio Unitario debe ser un numero mayor o igual a 0");
      p += 1;
    }

    if (productoACrear.cantidadDisponible < 0 || isNaN(productoACrear.cantidadDisponible)) {
      alert("El campo cantidad Disponible debe ser un numero mayor o igual a 0");
      p += 1;
    }

    if (productoACrear.descripcionProducto === "") {
      alert("El campo Descripcion del Producto es requerido");
      p += 1;
    }

    return p;
  };

  const handleChange = useCallback((e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  });

  /* const handleSelectChange = useCallback(() => {
    setForm({ ...form,
      estadoProdInv: value
    });
  }); */
  return (// <Container id="contenedor"> //No se está usando
    <Card>
      <GridItem>
        <CardHeader color="info">

          <h4>Registro de Productos</h4>

        </CardHeader>
        <br />


        <Row>
          <Col xs="4">
            {
              /*   <Label for="sku">ID del Producto</Label>
              <Input className="mb-4" type="text" name="sku" id="idProduct" placeholder="" required/> */
            }

            <InputLbl text="ID del Producto" type="text" className="mb-4" name="sku" onChange={handleChange} value={form.sku} />

            <InputLbl text="Nombre del Producto" type="text" className="mb-4" name="nombreProducto" onChange={handleChange} value={form.nombreProducto} />

            <InputLbl text="Precio Unitario" type="text" className="mb-4" name="precioUnitario" onChange={handleChange} value={form.precioUnitario} />

            {
              /*  <SelectCustom options={options} className="mb-4" text="Estado en Inventario" name="estadoProdInv"  handleChange={this. handleSelectChange} /> */
            }

            <Label>Estado en Inventario  </Label>
            <select type="select" style={{width:"100%", height:"10%", fontSize:"1rem", border: "2px solid #d5dbe3", borderRadius:"5px"}} name="estadoProdInv" onChange={handleChange} value={form.estadoProdInv} className="mb-4">
              <option value=""></option>
              <option value="Disponible">Disponible</option>
              <option value="No Disponible">No Disponible</option>
            </select>

            <InputLbl text="Cantidad Disponible" type="text" className="mb-4" name="cantidadDisponible" onChange={handleChange} value={form.cantidadDisponible} />

          </Col>

          <Col xs="7">
            {
              /* <Label for="descripcionProd">Descripción</Label>
              <Input className="descripcion" type="textarea" name="descripcionProd" id="descripcionProd" /> */
            }

            <InputLbl text="Descripción" type="textarea" className="descripcion" rows="15" name="descripcionProducto" onChange={handleChange} value={form.descripcionProducto} />

          </Col>
        </Row>

        <Row className="mb-4">
          <Col className="mt-3" sm={{
            size: 'auto',
            offset: 0
          }}>
            <Button className="" type="button" color="primary" id="crearProd" onClick={e => onChange(e)}>Crear</Button>
          </Col>

          <Col className="mt-3" sm={{
            size: 'auto',
            offset: 0
          }}>
            <Button className="" type="reset" color="primary" id="crearProd" onClick={limpiarFormulario} >Limpiar</Button>
          </Col>

        </Row>




      </GridItem>
    </Card>
  );

};

export default FormRegProd;