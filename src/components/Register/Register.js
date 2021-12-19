import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Label,
  FormGroup,
  ButtonGroup,
  ListGroup,
  ListGroupItem
} from "reactstrap";
import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router-dom";
import Login from "views/LoginView/LoginView1.js";


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import { useMutation } from '@apollo/react-hooks';

const CREARUSUARIO = gql`


mutation addUser($correo: String, 
$identificacion: String, 
$nombre: String, 
$contrasena: String,   
$tipoUsuario: userType) 
{
addUser(input: {correo: $correo, 
  identificacion: $identificacion, 
  nombre: $nombre, 
  contrasena: $contrasena,   
  tipoUsuario: $tipoUsuario})
}
`;


function Register(props) {

  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [identificacion, setIdentificacion] = useState("");
  const [rol, setRol] = useState("");
  /* const [user, loading, error] = useAuthState(auth); */
  
  const history = useHistory();

  const [createUserMutation] = useMutation(CREARUSUARIO)

  const register = () => {

  
    if (!name) {
      alert("Please enter name");
      
    }

    createUserMutation({
      variables: {
          nombre: name,
          identificacion: identificacion,
          contrasena: password,
          tipoUsuario: rol,
          correo: email
      }
    }
    )  
    props.e();

  };


  const cancelarRegistro =()=>{
    props.e();
  }

  /* useEffect(() => {
    if (loading) return;
    if (user) history.replace("/users");
  }, [user, loading]); */

  return (


    <Container>
      <FormGroup>
        <label>
          Nombre:
        </label>
        <input
          className="form-control"
          name="fullname"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Nombre completo"
        />
      </FormGroup>
      <FormGroup>
        <label>
          Identificacion:
        </label>
        <input
          className="form-control"
          name="identificacion"
          type="text"
          value={identificacion}
          onChange={(e) => setIdentificacion(e.target.value)}
          placeholder="Numero documento de identidad"
        />
      </FormGroup>
      <FormGroup>
        <label>
          Email:
        </label>
        <input
          className="form-control"
          name="email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Correo electrónico"
        />
      </FormGroup>
      <Label>Rol deseado:</Label>
      <select type="select" name="rol" value={rol} style={{ width: "100%", height: "2.5rem", fontSize: "1rem", border: "2px solid #d5dbe3", borderRadius: "5px" }} onChange={e => setRol(e.target.value)} >
        <option value=""></option>
        <option value="ADMINISTRADOR">Administrador</option>
        <option value="LIDER">Lider</option>
        <option value="ESTUDIANTE">Estudiante</option>
      </select>
      <FormGroup>
        <label>
          Password:
        </label>
        <input
          className="form-control"
          name="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </FormGroup>

      <ButtonGroup>
        <Button
          color="primary"
          onClick={register}
        >
          Registrar
        </Button>

        <Button
          color="danger"
        onClick={cancelarRegistro} 
        >
          Cancelar registro
        </Button>
      </ButtonGroup>

      <br />

      <ListGroup>
        <ListGroupItem tag="a" href="/login">Autenticate si ya tienes una cuenta</ListGroupItem>
      </ListGroup>

    </Container>
  );
}
export default Register;