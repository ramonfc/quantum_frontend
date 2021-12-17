import React, { Component, useState, useRef, useCallback, useEffect, useMemo} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useMutation,
    gql
} from "@apollo/client";

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


/* const BASE_URL = process.env.REACT_APP_BASE_URL;
//const BASE_URL = "http://localhost:3000/";
console.log(BASE_URL);
const PATH_CUSTOMERS = 'users'; */

const columnas = useMemo(()=>[
    {
        name: 'Nombre',
        selector: row=>row.nombre,
        sorteable: true,
        width: '20%'
    },
    {
        name: 'Identificacion',
        selector: row=>row.identificacion,
        sorteable: true
    },
    {
        name: 'Correo',
        selector: row=>row.correo,
        sorteable: true,
        width: '20%'
    },
    {
        name: 'Tipo de usuario',
        selector: row=>row.tipoUsuario,
        sorteable: true
    },
    {
        name: 'Estado',
        selector: row=>row.estado,
        sorteable: true
    },
    {
        name: 'Activo',
        selector: row=>row.activo2,
        sorteable: true
    },
    {
        name: "",
        sortable: false,
        allowOverflow: false,
        ignoreRowClick: true,
        cell: (row, index, column, id) => <Button data-tag="allowRowEvents" onClick={() => { handleRowClick(row)}}>A/D</Button>
    }
]);

const paginacionopciones = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}

const USUARIOS = gql`
    query {
      users {
          
        correo
        identificacion
        nombre
        tipoUsuario
        estado
        activo
      }
    }
  `;


  const CAMBIARESTADO= gql`
  mutation ($changeUserStateId: String, $state: userState) {
    changeUserState(id: $changeUserStateId, state: $state)
  }
  `;

const ACTIVARUSUARIO = gql`
mutation ($activeUserId: String) {
    activeUser(id: $activeUserId)
  }
`;


const DESACTIVARUSUARIO = gql`
mutation ($inactiveUserId: String) {
    inactiveUser(id: $inactiveUserId)
  }
`;

const ListUsers1 = props => {

    const [activateUser] = useMutation(ACTIVARUSUARIO);
    const [deactivateUser] = useMutation(DESACTIVARUSUARIO);

    const handleRowClick = (row) => {
        console.log("r", row);
        const {identificacion, estado} = row;  

            let id = identificacion;
            
            if(estado === "ACTIVO"){
                deactivateUser({
                    variables: { id }
                }); 
            }else{
                activateUser({
                    variables: { id }
                }); 
            } 
            
        
    }



    /*  const auth = getAuth();
     const [user, loading, error] = useAuthState(auth);
     const history = useHistory(); */
    const [newVal, setNewVal] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(false);

    const [busqueda, setBusqueda] = useState();
    const [usuariosFiltrados, setUsuariosFiltrados] = useState([]);
    const [usuarios, setUsuarios] = useState([]);
    const [borrar, setBorrar] = useState(true);
    const [editar, setEditar] = useState(true);
    const [form, setForm] = useState({
        nombre: "",
        identificacion: "",
        correo: "",
        tipoUsuario: "",
        estado: "",
        activo: ""
    });
    const [modalActualizar, setModalActualizar] = useState();

    /* React.useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/");
    }, [user, loading]); */

    /* React.useEffect(() => {
        if (!user) return history.replace("/");
        user.getIdToken(true).then(token => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            fetch(`${BASE_URL}${PATH_CUSTOMERS}`, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setUsuarios({
                            ...usuarios,
                            data: result
                        });
                    },
                    (error) => {
                        setIsLoaded(true);
                        setErrors(error);
                    }
                )
        });
    }, [newVal]);
 */

    useEffect(() => {
        console.log("Cargando usuarios")
        console.log("Cargando data", data)
    }, []);

    const dato = useRef();
    const id = useRef();
    const selectableRowsComponent = useRef();
    const selectedRows = useRef();


    const onChange = useCallback((event) => {
        setBusqueda(event.target.value);
        const PalabraBuscada = (event.target.value).toLowerCase().toString();
        console.log("PalabraBuscada: ", PalabraBuscada)
        filtrarusuarios(PalabraBuscada);
    });

    const filtrarusuarios = useCallback((usuarioBuscado) => {

        console.log("Usuarios", usuarios.data);
        //console.log("Eventos",e.target.value);
        try {
            let search = usuarios.filter(item => {
                console.log("Item1:", item.nombre);
                console.log("Item2:", item.tipoUsuario);
                console.log("Item3:", item.identificacion);
                console.log("Busqueda", busqueda);
                //let test=(item.name + item.username + item.documentId).toLowerCase().toString();
                //return test.includes(e);
                return (item.nombre + item.identificacion + item.tipoUsuario).toLowerCase().match(usuarioBuscado)
            });
            console.log("Coincidencia", search);
            setUsuariosFiltrados(search);
        } catch (error) {
            console.log(error);
        }
    });
    const handleChange = useCallback((e) => {
        console.log("SR", e.selectedRows);
        const rows = e.selectedRows;
        console.log("Rows", rows.length);
        console.log(e.selectedRows);
        dato.current = e.selectedRows;
        console.log("dato", dato.current.length);

        if (rows.length === 0) {
            setBorrar(true);
            setEditar(true);
            dato.current.splice(0, dato.current.length);
        }

        if (rows.length === 1) {
            setBorrar(false);
            setEditar(false);
        }

        if (rows.length > 1) {
            setEditar(true);
            setBorrar(false);
        } //this.setState.disabled;


        console.log(borrar);
        console.log(editar);
        console.log(dato.current);
    });
    const handleChange1 = useCallback((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log("form:", form);
    });


    const handleDelete = useCallback(() => {
        console.log(dato);
        console.log(dato.length);
        console.log("dc", dato.current);

        if (window.confirm(`Está usted seguro de borrar:\r ${dato.current.map(r => r.correo)}?`)) {
            let msg = [];
            let arregloUsuarios = dato.current;
            console.log("AP", arregloUsuarios);
            arregloUsuarios.map(registro => {
                msg.push(registro.correo);
                eliminarUsuario(registro._id);
            });
            /* cargarUsuarios(); */
            alert("Se eliminó a: " + msg.join(","));
            dato.current.splice(0, dato.current.length);
            setBorrar(true);
            setEditar(true);
        }
    });


    /* const eliminarUsuario = useCallback((idAEliminar) => {
        // Simple POST request with a JSON body using fetch
        user.getIdToken(true).then(token => {
            const requestOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },

            }; //console.log(requestOptions);
            //alert("Usuario creado exitosamente");

            fetch(`${BASE_URL}${PATH_CUSTOMERS}/${idAEliminar}`, requestOptions).then(result => result.json()).then(result => {
                console.log("result: ", result); //alert("Usuario eliminado")
                //this.cargarUsuarios();
            }, error => {
                console.log(error);
            });
        })
    }); */

    const mostrarModalActualizar = useCallback(() => {
        dato.current.map(registro => {
            setModalActualizar(true);
            setForm(registro);
            id.current = registro._id;
            console.log(id.current);
        }); //this.setState({ modalActualizar: true, form: dato });
    });
    const cerrarModalActualizar = useCallback(() => {
        setModalActualizar(false);
    });

    /* const handleUpdate = useCallback((id, form) => {
        console.log("body:", dato.current);
        cerrarModalActualizar(); // Simple POST request with a JSON body using fetch

        user.getIdToken(true).then(token => {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form)
            }; //console.log(requestOptions);
            //alert("Usuario creado exitosamente");

            fetch(`${BASE_URL}${PATH_CUSTOMERS}/${id}`, requestOptions)
                .then(result => result.json())
                .then(result => {
                    console.log("result: ", result);
                    cargarUsuarios();

                    dato.current.splice(0, dato.current.length);                    
                    setBorrar(true);
                    setEditar(true);

                    alert("Usuario Actualizado");
                    setNewVal(newVal + 1);
                }, error => {
                    console.log(error);
                });
        })
    }); */

    const { loading, error, data } = useQuery(USUARIOS)
    console.log("Data:", data);

    if (loading) return null;
    if (error) return `Error! ${error}`;
    console.log("Data1:", data);
    const usuariosTabla = data.users;
    console.table("UT", usuariosTabla[0]);

    const listaUsuarios = [];


    usuariosTabla.map(usuario => {
        const usuario1 = Object.create(usuario);
        listaUsuarios.push(usuario1);
    });


    listaUsuarios.map(usuario => {
        if(usuario.activo === true){
            usuario.activo2 = "Si";
        }else usuario.activo2 = "No";

    });
    
    /* if (data) return setUsuarios(data);
    
    /*  const cargarUsuarios = async () => {
 
         user.getIdToken(true).then(async (token) => {
             const requestOptions = {
                 method: 'GET',
                 headers: {
                     'Content-Type': 'application/json',
                     Authorization: `Bearer ${token}`,
                 },
             };
 
             const response = await fetch(`${BASE_URL}${PATH_CUSTOMERS}`, requestOptions);
             const result = await response.json();
             console.log("R", result);
             setUsuarios(result);
             setUsuariosFiltrados(result);
         })
         fetch(`${BASE_URL}${PATH_CUSTOMERS}`)
           .then(result => result.json())
           .then(
             (result) => {
               this.setState({
                 usuarios: result
               });
               console.log("result: ",result);
               console.log("usuarios en cargarUsuarios: ",this.state.usuarios)
              },
             // Nota: es importante manejar errores aquí y no en 
             // un bloque catch() para que no interceptemos errores
             // de errores reales en los componentes.
             (error) => {
               console.log(error);
             }
           )
     }; */
    return <div className="table-responsive"><br />
        <div className="barrabusqueda">
            <input
                type="text"
                placeholder="Buscar Usuario"
                className="textfield"
                name="busqueda"
                value={busqueda}
                onChange={onChange} />

        </div>


        <DataTable
            columns={columnas}
            data={listaUsuarios}
            pagination paginationComponentOptions={paginacionopciones}
            fixedHeader
            selectableRows
            selectableRowsHighlight
            selectableRowsComponent={selectableRowsComponent.current}
            onSelectedRowsChange={handleChange}
            fixedHeaderScrollHeight="600px"
            noDataComponent="No se encontraron usuarios" />

        {/*  <button type="button" name="editar" className="btnUtil" disabled={editar} onClick={() => mostrarModalActualizar(dato.current)}>
            Editar
        </button>  */}

       {/*  <Link to={`active-user/${dato.current.identificacion}`}><button type="button" name="editar" className="btnUtil" disabled={editar}>Editar</button></Link> */}

        <button type="button" name="borrar" className="btnUtil" disabled={borrar} onClick={() => handleDelete(dato.current)}>
            Borrar
        </button>

        <div>

            <Modal isOpen={modalActualizar}>
                <ModalHeader>
                    <div><h3>Actualizar usuario {form.username}</h3></div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <label>
                            Nombre de usuario:
                        </label>

                        <input className="form-control" readOnly type="text" value={form.username} />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Nombre(s):
                        </label>

                        <input className="form-control" readOnly type="text" value={form.name} />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Apellido(s):
                        </label>

                        <input className="form-control" readOnly type="text" value={form.lastName} />
                    </FormGroup>

                    <FormGroup>
                        {/*  <label>
                            Rol:
                        </label>
                        <input className="form-control" name="rol" type="text" onChange={handleChange1} value={form.rol} required /> */}

                        <label>Rol</label>
                        <select type="select" name="rol" style={{ width: "100%", height: "2.5rem", fontSize: "1rem", border: "2px solid #d5dbe3", borderRadius: "5px" }} onChange={handleChange1} value={form.rol} className="mb-4">
                            <option value=""></option>
                            <option value="admin">Administrador</option>
                            <option value="Vendedor">Vendedor</option>
                            <option value="bodega">Almacenista</option>
                        </select>



                    </FormGroup>

                    <FormGroup>
                        <label>
                            Telefono:
                        </label>
                        <input className="form-control" name="telephone" type="text" onChange={handleChange1} value={form.telephone} />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Dirección:
                        </label>
                        <input className="form-control" name="address" type="text" onChange={handleChange1} value={form.address} />
                    </FormGroup>

                    <FormGroup>
                        {/*  <label>
                            Estado:
                        </label>
                        <input className="form-control" name="status" type="text" onChange={handleChange1} value={form.status} /> */}

                        <label>Estado</label>
                        <select type="select" name="status" style={{ width: "100%", height: "2.5rem", fontSize: "1rem", border: "2px solid #d5dbe3", borderRadius: "5px" }} onChange={handleChange1} value={form.status} className="mb-4">
                            <option value=""></option>
                            <option value="activo">Activo</option>
                            <option value="inactivo">Inactivo</option>
                            <option value="suspendido">Suspendido</option>
                            <option value="bloqueado">Bloqueado</option>
                        </select>

                    </FormGroup>

                </ModalBody>

                <Row>
                    <Col>

                        <ModalFooter>
                            <Button className="btnUtil1" onClick={() => handleUpdate(id.current, form)}>
                                Actualizar
                            </Button>
                            <Button className="btnUtil1" onClick={() => cerrarModalActualizar()}>
                                Cancelar
                            </Button>
                        </ModalFooter>

                    </Col>
                </Row>
            </Modal>

        </div>

    </div>;
};

export default ListUsers1;