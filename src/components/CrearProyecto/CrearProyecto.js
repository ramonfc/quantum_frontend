import React, { Component, useState, useCallback, useEffect } from "react";

import {
    useQuery,
    useMutation,
    gql
} from "@apollo/client";

import GridItem from "components/Grid/GridItem";
import { getIdentificacion } from "helpers/localStorage";

import InputLbl from "components/InputLbl/InputLbl";
import { Input, Label } from "reactstrap";
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
    Card,
    CardHeader
} from "reactstrap";


const CREARPROYECTO = gql`
mutation AddProject($identificador: String, $nombre: String, $objetivosGenerales: [String], $objetivosEspecificos: [String], $presupuesto: Float, $fechaInicio: Date, $fechaFin: Date, $lider: String) {
    addProject(identificador: $identificador, nombre: $nombre, objetivosGenerales: $objetivosGenerales, objetivosEspecificos: $objetivosEspecificos, presupuesto: $presupuesto, fechaInicio: $fechaInicio, fechaFin: $fechaFin, lider: $lider)
  }
`


function CrearProyecto() {

    const identificacion = getIdentificacion();
    const [crearProyecto] = useMutation(CREARPROYECTO);
    const [form, setForm] = useState({
        identificador: "",
        nombre: "",
        objetivosGenerales: "",
        objetivosEspecificos: "",
        presupuesto: 0,
        lider: identificacion
      });
    
      const handleChange = (e)=>{
        setForm({
            ...form,
            [e.target.name]: e.target.value
          });
      }

      const limpiarFormulario = ()=>{}



  const onChange = (e) => {
    e.preventDefault();
    let proyectoACrear = { ...form };
      insertar(proyectoACrear); // this.setState({ modalInsertar: false });   
    
  };


  const insertar = (proyectoACrear) => {


    /* setForm({
        
            identificador: "",
            nombre: "",
            objetivosGenerales: "",
            objetivosEspecificos: "",
            presupuesto: 0,
            lider: ""
          
    }); */
    /* let productoACrear = { ...form
    }; */
    console.log("Insertar:", proyectoACrear);
    let {identificador, nombre, objetivosGenerales, objetivosEspecificos, presupuesto, lider}= { ...form };;

    crearProyecto(
      {variables:{
        identificador: identificador,
        nombre: nombre,
        objetivosGenerales: objetivosGenerales,
        objetivosEspecificos: objetivosEspecificos,
        presupuesto: parseInt(presupuesto),
        lider: lider
    }});
  };


  
  

    return (
        <div>
            <Card>
                <GridItem>
                    <CardHeader color="info">

                        <h4>Crear Proyecto</h4>

                    </CardHeader>
                    <br />


                    <Row>
                        <Col xs="4">
                   

                            <InputLbl text="ID del Proyecto" type="text" className="mb-4" name="identificador" onChange={handleChange} value={form.identificador} />

                            <InputLbl text="Nombre del Proyecto" type="text" className="mb-4" name="nombre" onChange={handleChange} value={form.nombre} />

                            <InputLbl text="Objetivos Generales" type="text" className="mb-4" name="objetivosGenerales" onChange={handleChange} value={form.objetivosGenerales} />

                 

                            <InputLbl text="Objetivos Especificos" type="text" className="mb-4" name="objetivosEspecificos" onChange={handleChange} value={form.objetivosEspecificos} />
                            
                            <InputLbl text="Presupuesto" type="text" className="mb-4" name="presupuesto" onChange={handleChange} value={form.presupuesto} />

                            <Label> Lider</Label>
                            <Input text="Lider" readOnly type="text" className="mb-4" name="lider"  value={form.lider} />
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
        </div>
    )
}

export default CrearProyecto;
