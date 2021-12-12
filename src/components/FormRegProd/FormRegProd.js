import React, { Component } from "react";
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import { Form, Row, Col, Label, Input, Button } from "reactstrap"; //Container
import "./FormRegProd.css";
import GridItem from "components/Grid/GridItem";
import InputLbl from "components/InputLbl/InputLbl";
import SelectCustom from "components/SelectCustom/SelectCustom";
import InputLblReq from "components/InputLblReq/InputLblReq";
import { WindowsBalloon } from "node-notifier";

const options = [
    { value: "disponible", label: "Disponible" },
    { value: "noDisponible", label: "No Disponible" }
];


const BASE_URL = process.env.REACT_APP_BASE_URL;
//const BASE_URL = "http://localhost:3000/";
const PATH_PRODUCTS = 'products';

export class FormRegProd extends Component {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            modalActualizar: false,
            modalInsertar: false,
            form: {
            
                sku: "",
                nombreProducto: "",
                precioUnitario: 0.0,
                estadoProdInv: "",
                cantidadDisponible: 0,
                descripcionProducto: ""
            }
        };

    }

    /*    componentDidMount() {
           this.cargarProducts();
       } */

    insertar = () => {

        this.setState({
            form: {
               
                sku: "",
                nombreProducto: "",
                precioUnitario: 0.0,
                estadoProdInv: "",
                cantidadDisponible: 0,
                descripcionProducto: ""
            }
        });

        let productoACrear = { ...this.state.form };
        console.log(productoACrear);

        
        this.crearProducto(productoACrear);
    }

    onChange (e) {

        let productoACrear = { ...this.state.form };
        if(this.validateFields(productoACrear) === 0) {

            this.insertar(productoACrear);
        // this.setState({ modalInsertar: false }); 
        }
        else {
            e.preventDefault();
        }
    } 

    validateFields(productoACrear) {

        let p = 0;

        if (productoACrear.sku === "") {
            alert("El campo SKU es requerido"); 
            p += 1;
        }

        if (productoACrear.nombreProducto === "") {
            alert("El campo nombreProducto es requerido");
            p += 1; 
        }

        if (productoACrear.precioUnitario < 0) {
            alert("El campo Precio Unitario debe ser mayoy o igual a 0"); 
            p += 1;
        }

        if (productoACrear.cantidadDisponible < 0) {
            alert("El campo cantidad Disponible debe ser mayoy o igual a 0");
            p += 1; 
        }

        if (productoACrear.descripcionProducto === "") {
            alert("El campo Descripcion del Producto es requerido");
            p += 1; 
        }

        return p
    }


    handleChange = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleSelectChange = (value) => {
        this.setState({
            form: {
                ...this.state.form,
                estadoProdInv: value,
            },
        });
    }

    render() {
        return (
            // <Container id="contenedor"> //No se está usando
            <Card>
                <GridItem>
                    <CardHeader color="info">

                        <h4>Registro de Productos</h4>

                    </CardHeader>
                    <br />

                    <Form >
                        <Row>
                            <Col xs="4">
                                {/*   <Label for="sku">ID del Producto</Label>
                                <Input className="mb-4" type="text" name="sku" id="idProduct" placeholder="" required/> */}

                                <InputLbl text="ID del Producto" type="text" className="mb-4" name="sku" onChange={this.handleChange}  />

                                <InputLbl text="Nombre del Producto" type="text" className="mb-4" name="nombreProducto" onChange={this.handleChange}  />

                                <InputLbl text="Precio Unitario" type="text" className="mb-4" name="precioUnitario" onChange={this.handleChange}  />

                               {/*  <SelectCustom options={options} className="mb-4" text="Estado en Inventario" name="estadoProdInv"  handleChange={this. handleSelectChange} /> */}

                                 <Label  >Estado en Inventario</Label>
                                <select type="select" name="estadoProdInv" onChange={this.handleChange} value={this.state.form.estadoProdInv} className="mb-4">
                                <option value=""></option>
                                    <option value="Disponible">Disponible</option>
                                    <option value="No Disponible">No Disponible</option>                                    
                                </select> 

                                <InputLbl text="Cantidad Disponible" type="text" className="mb-4" name="cantidadDisponible" onChange={this.handleChange}  />

                            </Col>

                            <Col xs="7">
                                {/* <Label for="descripcionProd">Descripción</Label>
                                <Input className="descripcion" type="textarea" name="descripcionProd" id="descripcionProd" /> */}

                                <InputLbl text="Descripción" type="textarea" className="descripcion" rows="15" name="descripcionProducto" onChange={this.handleChange}  />

                            </Col>
                        </Row>

                        <Row className="mb-4">
                            <Col className="mt-3" sm={{ size: 'auto', offset: 0 }}>
                                <Button className="" type="submit" color="primary" id="crearProd" onClick={(e) => this.onChange(e)} >Crear</Button>
                            </Col>

                            <Col className="mt-3" sm={{ size: 'auto', offset: 0 }}>
                                <Button className="" type="reset" color="primary" id="crearProd">Limpiar</Button>
                            </Col>

                        </Row>

                    </Form>


                </GridItem>
            </Card>


        )
    }


    /* cargarProducts() {
        fetch(`${BASE_URL}${PATH_PRODUCTS}`)
            .then(result => result.json())
            .then(
                (result) => {
                    this.setState({
                        data: result
                    });
                },
                // Nota: es importante manejar errores aquí y no en 
                // un bloque catch() para que no interceptemos errores
                // de errores reales en los componentes.
                (error) => {
                    console.log(error);
                }
            )
    } */

    crearProducto(productoACrear) {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoACrear)
        };

        //console.log(requestOptions);
        //alert("Producto creado exitosamente");
        

        fetch(`${BASE_URL}${PATH_PRODUCTS}`, requestOptions)
            .then(result => result.json())
            .then(
                (result) => {
                    console.log("result: ", result);
                    let productoACrear = { ...this.state.result };
                    //window.confirm(`Estos campos son requeridos:\r ${result.map(r => r.nombreProducto)}?`)
                    //alert("Producto creado")
                    //this.cargarProducts();
                },
                (error) => {
                    console.log(error);
                }
            );
    }
}

export default FormRegProd;