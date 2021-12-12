import React from 'react';
import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import GridItem from "components/Grid/GridItem";

import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  Input,
  Col,
  Row,

} from "reactstrap";

const estiloboton = {

  fontSize:"12px"

}


const data = [

  { idVenta: 1, idCliente: "123", nameCliente: "Pedro Pinta Paredes", vendedor: "Ramon", valorTotal: "$1.000.000.000", status: "Enviado", fechaPedidVentao:'15-11-2021', fechaEnvio:'16-11-2021',fechaEntrega:'20-11-2021'},
  { idVenta: 2, idCliente: "124", nameCliente: "Pedro Pinta Paredes", vendedor: "Ramon", valorTotal: "$1.000.000.000", status: "Enviado", fechaPedidVentao:'15-11-2021', fechaEnvio:'16-11-2021',fechaEntrega:'20-11-2021'},
  { idVenta: 3, idCliente: "125", nameCliente: "Pedro Pinta Paredes", vendedor: "Ramon", valorTotal: "$1.000.000.000", status: "Enviado", fechaPedidVentao:'15-11-2021', fechaEnvio:'16-11-2021',fechaEntrega:'20-11-2021'},
  { idVenta: 4, idCliente: "126", nameCliente: "Pedro Pinta Paredes", vendedor: "Ramon", valorTotal: "$1.000.000.000", status: "Enviado", fechaPedidVentao:'15-11-2021', fechaEnvio:'16-11-2021',fechaEntrega:'20-11-2021'},
  { idVenta: 5, idCliente: "127", nameCliente: "Pedro Pinta Paredes", vendedor: "Ramon", valorTotal: "$1.000.000.000", status: "Enviado", fechaPedidVentao:'15-11-2021', fechaEnvio:'16-11-2021',fechaEntrega:'20-11-2021'},

];

class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: data,
      modalActualizar: false,
      modalInsertar: false,
      form: {
        idVenta: "",
        name: "",
        position: "",
        status: "",
        idCliente: "",
        nameCliente: ""
      }
    };
  }

  mostrarModalActualizar = (dato) => {

    this.setState({ modalActualizar: true, form: dato });

  };

  cerrarModalActualizar = () => {
    this.setState({ modalActualizar: false });
  };

  mostrarModalInsertar = () => {
    this.setState({ modalInsertar: true });
  };

  cerrarModalInsertar = () => {
    this.setState({ modalInsertar: false });
  };

  editar = (dato) => {
    let contador = 0;
    let arregloProductos = this.state.data;
    arregloProductos.map((registro) => {
      if (dato.idVenta === registro.idVenta) {
        arregloProductos[contador].idCliente = dato.idCliente;
        arregloProductos[contador].nameCliente = dato.nameCliente;
        arregloProductos[contador].name = dato.name;
        arregloProductos[contador].position = dato.position;
        arregloProductos[contador].status = dato.status;
      }
      contador++;
    });

    this.setState({ data: arregloProductos, modalActualizar: false });
  };

  eliminar = (dato) => {
    let opcion = window.confirm("¿Está seguro que desea eliminar a " + dato.name + " " + dato.idCliente + "?");
    if (opcion) {
      let contador = 0;
      let arregloProductos = this.state.data;
      arregloProductos.map((registro) => {
        if (dato.idVenta === registro.idVenta) {
          arregloProductos.splice(contador, 1);
        }
        contador++;
      });

      this.setState({ data: arregloProductos });
    }

  };

  buscar = (dato) => {
      return dato ;
  }

  insertar = () => {
    let usuarioACrear = { ...this.state.form };
    usuarioACrear.idVenta = this.state.data.length + 1;
    let arregloProductos = this.state.data;

    arregloProductos.push(usuarioACrear);

    this.setState({ data: arregloProductos, modalInsertar: false });

  }

  handleChange = (e) => {
    this.setState({
      form: {
        ...this.state.form,
        [e.target.name]: e.target.value,
      },
    });
  };

  render() {

    return (
      <>
        <Card>
          <GridItem>
            <CardHeader color="info">

              <h4>Listado de Ventas</h4>

            </CardHeader>
            <Container>
              <Row className="Margen">
                <Col className="mt-3">
                  <Input type="text" name="buscarProd" idVenta="buscarProd" placeholder="Ingrese id Venta" />
                </Col>

                <Col className="mt-3">
                  <Button color="outline-primary" onClick={() => this.buscar()}>Buscar Venta</Button>
                </Col>
              </Row>

              <br />
              <br />
              <Table>
                <thead>
                  <tr>
                    <th>idVenta</th>
                    <th>idCliente</th>
                    <th>Nombre Cliente</th>
                    <th>Vendedor</th>
                    <th>Valor Total</th>
                    <th>Estado</th>
                    <th>Fecha Pedido</th>
                    <th>Fecha Envio</th>
                    <th>Fecha Entrega</th>
                    <th>Acción</th>
                  </tr>
                </thead>
                
                <tbody>
                  {this.state.data.map((dato) => (
                    <tr key={dato.idVenta}>
                      <td>{dato.idVenta}</td>
                      <td>{dato.idCliente}</td>
                      <td>{dato.nameCliente}</td>
                      <td>{dato.vendedor}</td>
                      <td>{dato.valorTotal}</td>
                      <td>{dato.status}</td>
                      <td>{dato.fechaPedidVentao}</td>
                      <td>{dato.fechaEnvio}</td>
                      <td>{dato.fechaEntrega}</td>
                      <td>
                        <Button
                          style={estiloboton}
                          color="link"
                          onClick={() => this.mostrarModalActualizar(dato)}
                        >
                          Editar
                        </Button>
                        
                        <Button  style={estiloboton} color="link" onClick={() => this.eliminar(dato)}>Borrar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>

            <Modal isOpen={this.state.modalActualizar}>
              <ModalHeader>
                <div><h3>Actualizar Venta {this.state.form.name}</h3></div>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <label>
                    idVenta:
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
                    idCliente:
                  </label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.name}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Nombre Cliente:
                  </label>
                  <input
                    className="form-control"
                    name="idCliente"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.idCliente}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Vendedor:
                  </label>
                  <input
                    className="form-control"
                    name="nameCliente"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.nameCliente}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Valor Total:
                  </label>
                  <input
                    className="form-control"
                    name="status"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.status}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Estado:
                  </label>
                  <input
                    className="form-control"
                    name="position"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.position}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Fecha Pedido:
                  </label>
                  <input
                    className="form-control"
                    name="position"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.position}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Fecha Envio:
                  </label>
                  <input
                    className="form-control"
                    name="position"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.position}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Fecha Entrega:
                  </label>
                  <input
                    className="form-control"
                    name="position"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.position}
                  />
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => this.editar(this.state.form)}
                >
                  Actualizar
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => this.cerrarModalActualizar()}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>


            <Modal isOpen={this.state.modalInsertar}>
              <ModalHeader>
                <div><h3>Agregar producto</h3></div>
              </ModalHeader>

              <ModalBody>
                <FormGroup>
                  <label>
                    idVenta:
                  </label>

                  <input
                    className="form-control"
                    readOnly
                    type="text"
                    value={this.state.data.length + 1}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Nombre:
                  </label>
                  <input
                    className="form-control"
                    name="name"
                    type="text"
                    onChange={this.handleChange}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Descripción:
                  </label>
                  <input
                    className="form-control"
                    name="idCliente"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    CantidVentaad:
                  </label>
                  <input
                    className="form-control"
                    name="nameCliente"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Estado:
                  </label>
                  <input
                    className="form-control"
                    name="status"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Ubicación:
                  </label>
                  <input
                    className="form-control"
                    name="position"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>
              </ModalBody>

              <ModalFooter>
                <Button
                  color="primary"
                  onClick={() => this.insertar()}
                >
                  Agregar
                </Button>
                <Button
                  className="btn btn-danger"
                  onClick={() => this.cerrarModalInsertar()}
                >
                  Cancelar
                </Button>
              </ModalFooter>
            </Modal>
          </GridItem>
        </Card>
      </>
    );
  }
}
export default User;

