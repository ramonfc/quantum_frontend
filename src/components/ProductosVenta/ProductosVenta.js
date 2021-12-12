import React from 'react';



import {
  Table,
  Button,
  Container,
  Modal,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
  // Input,
  // Col,
  // Row,

} from "reactstrap";
import ProductsToAdd from './ProductsToAdd';

const data = [
  { id: 1, name: "Dulce de Guayaba", position: "Centro 2-10-1", status: "D", description: "Caja x 10", quantity: "1500" },
  { id: 2, name: "Dulce de Kiwi", position: "Centro 2-8-1", status: "D", description: "Caja x 20", quantity: "2500" },
  { id: 3, name: "Dulce de Arroz", position: "Centro 2-3-1", status: "D", description: "Caja x 20", quantity: "3000" },
  { id: 4, name: "Dulce de Cidra", position: "Centro 2-14-11", status: "I", description: "Garrafa x 10 lt", quantity: "0" },
  { id: 5, name: "Dulce de Maracuya", position: "Centro 2-10-17", status: "D", description: "Galon", quantity: "200" }
];

class User extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
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

        <Container>

          <br />
          <Button 
            style={{ width:"100px", marginLeft:"420px"}}
            color="link"
            onClick={()=>this.mostrarModalInsertar()}
            
          >
            Agregar producto
          </Button>
          <Table>
            <thead>
              <tr>
                <th>Id del producto</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Cantidad</th>
                <th>Estado</th>
                <th>Ubicacion</th>
                <th>Acción</th>
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
                    {/* <Button
                          color="link"
                          onClick={() => this.mostrarModalActualizar(dato)}
                        >
                          Editar
                        </Button>{" / "} */}
                    <Button color="link" onClick={() => this.eliminar(dato)}>Eliminar</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Container>

        <Modal isOpen={this.state.modalInsertar}>
          <ModalHeader>
            <div><h3>Agregar productos a su pedido</h3></div>
          </ModalHeader>

          <ModalBody>
            <ProductsToAdd/>
            
          </ModalBody>

          <ModalFooter>
            
            <Button
              className="btn btn-danger"
              onClick={() => this.cerrarModalInsertar()}
            >
              Cancelar
            </Button>
          </ModalFooter>
        </Modal>

      </>
    );
  }
}
export default User;

