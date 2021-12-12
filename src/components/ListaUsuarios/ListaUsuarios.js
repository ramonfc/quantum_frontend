
import React from 'react';
import Card from 'components/Card/Card';
import GridItem from 'components/Grid/GridItem';
import CardHeader from 'components/Card/CardHeader';

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

const data = [
  { name: 'Ramon Castano', id: "1098461112", username: "ramoncito", rol: "Administrador", estado: "activo" },
  { name: 'Ramon Castano', id: "1097881112", username: "ramoncito", rol: "Administrador", estado: "activo" },
  { name: 'Ramon Castano', id: "1098445111", username: "ramoncito", rol: "Administrador", estado: "activo" },
  { name: 'Ramon Castano', id: "1095556112", username: "ramoncito", rol: "Administrador", estado: "activo" },

];

class ListaUsuarios extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: data,
      modalActualizar: false,
      modalInsertar: false,
      form: {
        id: "",
        name: "",
        position: "",
        status: "",
        description: "",
        quantity: ""
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
      if (dato.id === registro.id) {
        arregloProductos[contador].description = dato.description;
        arregloProductos[contador].quantity = dato.quantity;
        arregloProductos[contador].name = dato.name;
        arregloProductos[contador].position = dato.position;
        arregloProductos[contador].status = dato.status;
      }
      contador++;
    });

    this.setState({ data: arregloProductos, modalActualizar: false });
  };

  eliminar = (dato) => {
    let opcion = window.confirm("¿Está seguro que desea eliminar a " + dato.name + " " + dato.description + "?");
    if (opcion) {
      let contador = 0;
      let arregloProductos = this.state.data;
      arregloProductos.map((registro) => {
        if (dato.id === registro.id) {
          arregloProductos.splice(contador, 1);
        }
        contador++;
      });

      this.setState({ data: arregloProductos });
    }

  };

  buscar = (dato) => {
    return dato + 'miguel';
  }

  insertar = () => {
    let usuarioACrear = { ...this.state.form };
    usuarioACrear.id = this.state.data.length + 1;
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

              <h4>Listar Usuarios</h4>

            </CardHeader>
            <br />
            <Container>
              <Row className="Margen">
                <Col className="mt-3">
                  <Input type="text" name="buscarProd" id="buscarProd" placeholder="Ingrese ID o nombre del" />
                </Col>

                <Col className="mt-3">
                  <Button color="outline-primary" onClick={() => this.buscar()}>Buscar usuario</Button>
                </Col>
              </Row>

              <br />
              <br />
              <Table>
                <thead>
                  <tr>
                    <th>Nombre Completo</th>
                    <th>Numero de Identificacion</th>
                    <th>Nombre de usuario</th>
                    <th>Rol</th>
                    <th>Estado</th>
                  </tr>
                </thead>

                <tbody>
                  {this.state.data.map((dato) => (
                    <tr key={dato.id}>
                      <td>{dato.id}</td>
                      <td>{dato.name}</td>
                      <td>{dato.description}</td>
                      <td>{dato.quantity}</td>
                      <td>{dato.status}</td>
                      <td>{dato.position}</td>
                      <td>
                        <Button
                          color="link"
                          onClick={() => this.mostrarModalActualizar(dato)}
                        >
                          Editar
                        </Button>
                        <Button color="link" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Container>

            <Modal isOpen={this.state.modalActualizar}>
              <ModalHeader>
                <div><h3>Actualizar producto {this.state.form.name}</h3></div>
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
                    value={this.state.form.id}
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
                    value={this.state.form.name}
                    required
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Descripcion:
                  </label>
                  <input
                    className="form-control"
                    name="description"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.description}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Cantidad:
                  </label>
                  <input
                    className="form-control"
                    name="quantity"
                    type="text"
                    onChange={this.handleChange}
                    value={this.state.form.quantity}
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
                    value={this.state.form.status}
                  />
                </FormGroup>
                <FormGroup>
                  <label>
                    Ubicacion:
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
                    Id:
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
                    name="description"
                    type="text"
                    onChange={this.handleChange}
                  />
                </FormGroup>

                <FormGroup>
                  <label>
                    Cantidad:
                  </label>
                  <input
                    className="form-control"
                    name="quantity"
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
          export default ListaUsuarios;

