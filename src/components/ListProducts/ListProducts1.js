import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
  } from "reactstrap";

/* const data = [
    { id: 1, name: "Dulce de Guayaba", position: "Centro 2-10-1", status: "D", description: "Caja x 10", quantity: "1500" },
    { id: 2, name: "Dulce de Kiwi", position: "Centro 2-8-1", status: "D", description: "Caja x 20", quantity: "2500" },
    { id: 3, name: "Dulce de Arroz", position: "Centro 2-3-1", status: "D", description: "Caja x 20", quantity: "3000" },
    { id: 4, name: "Dulce de Cidra", position: "Centro 2-14-11", status: "I", description: "Garrafa x 10 lt", quantity: "0" },
    { id: 5, name: "Dulce de Maracuya", position: "Centro 2-10-17", status: "D", description: "Galon", quantity: "200" },
    { id: 6, name: "Dulce de Guayaba", position: "Centro 2-10-1", status: "D", description: "Caja x 10", quantity: "1500" },
    { id: 7, name: "Dulce de Kiwi", position: "Centro 2-8-1", status: "D", description: "Caja x 20", quantity: "2500" },
    { id: 8, name: "Dulce de Arroz", position: "Centro 2-3-1", status: "D", description: "Caja x 20", quantity: "3000" },
    { id: 9, name: "Dulce de Cidra", position: "Centro 2-14-11", status: "I", description: "Garrafa x 10 lt", quantity: "0" },
    { id: 10, name: "Dulce de Maracuya", position: "Centro 2-10-17", status: "D", description: "Galon", quantity: "200" },
    { id: 11, name: "Dulce de Guayaba", position: "Centro 2-10-1", status: "D", description: "Caja x 10", quantity: "1500" },
    { id: 12, name: "Dulce de Kiwi", position: "Centro 2-8-1", status: "D", description: "Caja x 20", quantity: "2500" },
    { id: 13, name: "Dulce de Arroz", position: "Centro 2-3-1", status: "D", description: "Caja x 20", quantity: "3000" },
    { id: 14, name: "Dulce de Cidra", position: "Centro 2-14-11", status: "I", description: "Garrafa x 10 lt", quantity: "0" },
    { id: 15, name: "Dulce de Maracuya", position: "Centro 2-10-17", status: "D", description: "Galon", quantity: "200" },
    { id: 16, name: "Dulce de Guayaba", position: "Centro 2-10-1", status: "D", description: "Caja x 10", quantity: "1500" },
    { id: 17, name: "Dulce de Kiwi", position: "Centro 2-8-1", status: "D", description: "Caja x 20", quantity: "2500" },
    { id: 18, name: "Dulce de Arroz", position: "Centro 2-3-1", status: "D", description: "Caja x 20", quantity: "3000" },
    { id: 19, name: "Dulce de Cidra", position: "Centro 2-14-11", status: "I", description: "Garrafa x 10 lt", quantity: "0" },
    { id: 20, name: "Dulce de Maracuya", position: "Centro 2-10-17", status: "D", description: "Galon", quantity: "200" }

];  */

const BASE_URL = process.env.REACT_APP_BASE_URL;
//const BASE_URL = "http://localhost:3000/";
console.log(BASE_URL);
const PATH_PRODUCTS = 'products';

const columnas = [
    {
        name: 'ID del producto',
        selector: 'sku',
        sorteable: true
    },
    {
        name: 'Nombre',
        selector: 'nombreProducto',
        sorteable: true
    },
    {
        name: 'Precio Unitario',
        selector: 'precioUnitario',
        sorteable: true
    },
    {
        name: 'Descripción',
        selector: 'descripcionProducto',
        sorteable: true
    },
    {
        name: 'Estado',
        selector: 'estadoProdInv',
        sorteable: true
    },
    {
        name: 'Cantidad',
        selector: 'cantidadDisponible',
        sorteable: true
    }


]

const paginacionopciones = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}



class ListProducts1 extends Component {

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
                sku: "",
                nombreProducto: "",
                precioUnitario: 0,
                estadoProdInv: "",
                descripcionProducto: "",
                cantidadDisponible: 0
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
                return item.nombreProducto.includes(busqueda) ||
                    item.descripcionProducto.includes(busqueda) ||
                    item.sku.includes(busqueda);
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
        if (window.confirm(`Está usted seguro de borrar:\r ${dato.map(r => r.nombreProducto)}?`)) {
            let msg = [];
            let arregloProductos = dato;
            arregloProductos.map((registro) => {
                msg.push(registro.nombreProducto);
                this.eliminarProducto(registro._id);
                this.cargarProductos();    
            });
            alert("Se eliminaron: " + msg.join(","));
            this.dato.splice(0,this.dato.length)
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

        dato.current.map((registro)=>{
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
                    this.dato.splice(0,this.dato.length);
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
                        placeholder="Buscar Producto"
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
                    noDataComponent="No se encontraron productos"
                />

                <button type="button" name="editar" className="btnUtil" disabled={this.state.editar} onClick={() => this.mostrarModalActualizar(this.dato)} >
                    Editar
                </button>

                <button type="button" name="borrar" className="btnUtil" disabled={this.state.borrar} onClick={() => this.handleDelete(this.dato)} >
                    Borrar
                </button>

                <div>

                    <Modal isOpen={this.state.modalActualizar}>
                        <ModalHeader>
                            <div><h3>Actualizar producto {this.state.form.nombreProducto}</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>
                                    Id del producto:
                                </label>

                                <input
                                    className="form-control"
                                    readOnly
                                    type="text"
                                    value={this.state.form.sku}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Nombre del producto:
                                </label>
                                <input
                                    className="form-control"
                                    name="nombreProducto"
                                    type="text"
                                    onChange={this.handleChange1}
                                    value={this.state.form.nombreProducto}
                                    required
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Descripcion:
                                </label>
                                <input
                                    className="form-control"
                                    name="descripcionProducto"
                                    type="text"
                                    onChange={this.handleChange1}
                                    value={this.state.form.descripcionProducto}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Cantidad:
                                </label>
                                <input
                                    className="form-control"
                                    name="cantidadDisponible"
                                    type="text"
                                    onChange={this.handleChange1}
                                    value={this.state.form.cantidadDisponible}
                                />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Estado:
                                </label>
                                <input
                                    className="form-control"
                                    name="estadoProdInv"
                                    type="text"
                                    onChange={this.handleChange1}
                                    value={this.state.form.estadoProdInv}
                                />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Precio Unitario:
                                </label>
                                <input
                                    className="form-control"
                                    name="precioUnitario"
                                    type="text"
                                    onChange={this.handleChange1}
                                    value={this.state.form.precioUnitario}
                                />
                            </FormGroup>
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

                </div>

            </div>


        );
    }
}



export default ListProducts1;