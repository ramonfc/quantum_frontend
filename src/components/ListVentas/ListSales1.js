import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import ListProducts1 from '../ListarProyectos/ListProducts1.js'
import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
} from "reactstrap";


const BASE_URL = process.env.REACT_APP_BASE_URL;
//const BASE_URL = "http://localhost:3000/";
console.log(BASE_URL);
const PATH_PRODUCTS = 'sales';

const columnas = [
    {
        name: 'ID venta',
        selector: 'idVenta',
        sorteable: true
    },
    {
        name: 'Cliente',
        selector: 'nombreCliente',
        sorteable: true
    },
    {
        name: 'ID Cliente',
        selector: 'idCliente',
        sorteable: true
    },
    {
        name: 'ID vendedor',
        selector: 'idVendedor',
        sorteable: true
    },
    {
        name: 'Vendedor',
        selector: 'nombreVendedor',
        sorteable: true
    },
    {
        name: 'Valor Total',
        selector: 'valorTotal',
        sorteable: true
    },
    {
        name: 'Estado Venta',
        selector: 'estadoSale',
        sorteable: true
    },
    {
        name: 'Fecha venta',
        selector: 'fechaSale',
        sorteable: true
    },
    {
        name: 'Fecha envio',
        selector: 'fechaEnvio',
        sorteable: true
    },
    {
        name: 'Fecha entega',
        selector: 'fechaEntrega',
        sorteable: true
    }


]

const paginacionopciones = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}



class ListSales1 extends Component {

    constructor(props) {
        super(props);

        this.state = {
            busqueda: '',
            productos: [],
            productosFiltrados: [],
            modalActualizar: false,
            dato: [],
            id: "",
            editar: true,
            borrar: true,
            form: {
                idVenta: "",
                nombreCliente: "",
                idCliente: "",
                nombreVendedor: "",
                idVendedor: "",
                valorTotal: 0,
                estadoSale: "",
                fechaSale: "",
                fechaEnvio: "",
                fechaEntrega: ""

            }
        };
    }

    componentDidMount() {
        this.cargarProductos();
    }

    onChange = event => {
        this.setState({ busqueda: event.target.value });
        this.filtrarproductos(event.target.value);
    }

    filtrarproductos = (busqueda) => {
        try {
            var search = this.state.productos.filter(item => {
                return item.nombreCliente.includes(busqueda) ||
                    item.idVendedor.includes(busqueda) ||
                    item.idVenta.includes(busqueda);
            });
            this.setState({ productosFiltrados: search });
        } catch (error) {
            console.log(error);
        }
    }

    handleChange = ({ selectedRows }) => {
        const rows = selectedRows;
        console.log(rows.length);
        console.log(selectedRows);
        this.dato = selectedRows;

        if (rows.length === 0) {
            this.setState({
                borrar: true,
                editar: true
            });
        }
        if (rows.length === 1) {
            this.setState({
                borrar: false,
                editar: false
            });
        }
        if (rows.length > 1) {
            this.setState({
                editar: true
            });
        }
        //this.setState.disabled;
        console.log(this.state.borrar);
        console.log(this.state.editar);
        console.log(this.dato);
    };

    handleChange1 = (e) => {
        this.setState({
            form: {
                ...this.state.form,
                [e.target.name]: e.target.value,
            },
        });
    };

    handleDelete = (dato) => {
        console.log(dato);
        console.log(dato.length);
        if (window.confirm(`Está usted seguro de borrar:\r ${dato.map(r => r.nombreCliente)}?`)) {
            let msg = [];
            let arregloProductos = dato;
            arregloProductos.map((registro) => {
                msg.push(registro.nombreCliente);
                this.eliminarProducto(registro._id)
            });
            this.cargarProductos();
            alert("Se eliminaron: " + msg.join(","));
            this.dato.splice(0, this.dato.length)
        }

    };

    eliminarProducto(idAEliminar) {
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            //body: JSON.stringify(idAEliminar)
        };

        //console.log(requestOptions);
        //alert("Producto creado exitosamente");


        fetch(`${BASE_URL}${PATH_PRODUCTS}/${idAEliminar}`, requestOptions)
            .then(result => result.json())
            .then(
                (result) => {
                    console.log("result: ", result);
                    //alert("Producto eliminado")
                    //this.cargarProductos();
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    mostrarModalActualizar = (dato) => {

        dato.map((registro) => {
            this.setState({ modalActualizar: true, form: registro });
            this.id = registro._id;
            console.log(this.id);
        })

        //this.setState({ modalActualizar: true, form: dato });

    };

    cerrarModalActualizar = () => {
        this.setState({ modalActualizar: false });
    };

    handleUpdate(id, productoActualizar) {
        this.cerrarModalActualizar();
        // Simple POST request with a JSON body using fetch
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(productoActualizar)
        };

        //console.log(requestOptions);
        //alert("Producto creado exitosamente");


        fetch(`${BASE_URL}${PATH_PRODUCTS}/${id}`, requestOptions)
            .then(result => result.json())
            .then(
                (result) => {
                    console.log("result: ", result);
                    this.cargarProductos();
                    this.dato.splice(0, this.dato.length);
                    alert("Producto Actualizado");
                },
                (error) => {
                    console.log(error);
                }
            );
    }

    async cargarProductos() {
        const response = await fetch(`${BASE_URL}${PATH_PRODUCTS}`);
        const result = await response.json();
        this.setState({
            productos: result,
            productosFiltrados: result,
        });

        /* fetch(`${BASE_URL}${PATH_PRODUCTS}`)
          .then(result => result.json())
          .then(
            (result) => {
              this.setState({
                productos: result
              });
              console.log("result: ",result);
              console.log("productos en cargarProductos: ",this.state.productos)

            },
            // Nota: es importante manejar errores aquí y no en 
            // un bloque catch() para que no interceptemos errores
            // de errores reales en los componentes.
            (error) => {
              console.log(error);
            }
          ) */
    }

    render() {

        return (
            <div className="table-responsive"><br />
                <div className="barrabusqueda">
                    <input
                        type="text"
                        placeholder="Buscar Venta"
                        className="textfield"
                        name="busqueda"
                        value={this.state.busqueda}
                        onChange={this.onChange}
                    />

                </div>


                <DataTable
                    columns={columnas}
                    data={this.state.productosFiltrados}
                    pagination
                    paginationComponentOptions={paginacionopciones}
                    fixedHeader
                    selectableRows
                    selectableRowsHighlight
                    selectableRowsComponent={this.selectableRowsComponent}
                    onSelectedRowsChange={this.handleChange.bind(this)}
                    fixedHeaderScrollHeight="600px"
                    noDataComponent="No se encontraron pedidos"
                />

                <button type="button" name="editar" className="btnUtil" disabled={this.state.editar} onClick={() => this.mostrarModalActualizar(this.dato)} >
                    Editar
                </button>

                <button type="button" name="borrar" className="btnUtil" disabled={this.state.borrar} onClick={() => this.handleDelete(this.dato)} >
                    Borrar
                </button>

                <Container>
                    <Row className="Margen">
                        <Col className="mt-3">

                            <Modal isOpen={this.state.modalActualizar}>
                                <ModalHeader>
                                    <div><h3>Actualizar venta {this.state.form.idVenta}</h3></div>
                                </ModalHeader>

                                <ModalBody>
                                    <FormGroup>
                                        <label>
                                            ID venta:
                                        </label>

                                        <input
                                            className="form-control"
                                            readOnly
                                            type="text"
                                            value={this.state.form.idVenta}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <label>
                                            Nombre cliente:
                                        </label>
                                        <input
                                            className="form-control"
                                            name="nombreCliente"
                                            type="text"
                                            onChange={this.handleChange1}
                                            value={this.state.form.nombreCliente}
                                            required
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <label>
                                            ID cliente:
                                        </label>
                                        <input
                                            className="form-control"
                                            name="idVendedor"
                                            type="text"
                                            onChange={this.handleChange1}
                                            value={this.state.form.idCliente}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <label>
                                            ID vendedor:
                                        </label>
                                        <input
                                            className="form-control"
                                            name="valorTotal"
                                            type="text"
                                            onChange={this.handleChange1}
                                            value={this.state.form.idVendedor}
                                        />
                                    </FormGroup>

                                    <FormGroup>
                                        <label>
                                            Vendedor:
                                        </label>
                                        <input
                                            className="form-control"
                                            name="nombreVendedor"
                                            type="text"
                                            onChange={this.handleChange1}
                                            value={this.state.form.nombreVendedor}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>
                                            Valor Total venta:
                                        </label>
                                        <input
                                            className="form-control"
                                            name="idCliente"
                                            readOnly
                                            type="text"
                                            onChange={this.handleChange1}
                                            value={this.state.form.valorTotal}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>
                                            Estado de la venta:
                                        </label>
                                        <input
                                            className="form-control"
                                            name="idCliente"
                                            type="text"
                                            onChange={this.handleChange1}
                                            value={this.state.form.estadoSale}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>
                                            Fecha de venta:
                                        </label>
                                        <input
                                            className="form-control"
                                            name="idCliente"
                                            readOnly
                                            type="text"
                                            onChange={this.handleChange1}
                                            value={this.state.form.fechaSale}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>
                                            Fecha de envio:
                                        </label>
                                        <input
                                            className="form-control"
                                            name="idCliente"
                                            type="text"
                                            onChange={this.handleChange1}
                                            value={this.state.form.fechaEnvio}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <label>
                                            Fecha de entrega:
                                        </label>
                                        <input
                                            className="form-control"
                                            name="idCliente"
                                            type="text"
                                            onChange={this.handleChange1}
                                            value={this.state.form.fechaEntrega}
                                        />
                                    </FormGroup>
                                    <Col className="mt-5">
                                        <ListProducts1 />
                                    </Col>
                                </ModalBody>

                                <ModalFooter>
                                    <Button
                                        className="btnUtil1"
                                        onClick={() => this.handleUpdate(this.id, this.state.form)}
                                    >
                                        Actualizar
                                    </Button>
                                    <Button
                                        className="btnUtil1"
                                        onClick={() => this.cerrarModalActualizar()}
                                    >
                                        Cancelar
                                    </Button>
                                </ModalFooter>
                            </Modal>

                        </Col>
                    </Row>
                </Container>

            </div>


        );
    }
}



export default ListSales1;