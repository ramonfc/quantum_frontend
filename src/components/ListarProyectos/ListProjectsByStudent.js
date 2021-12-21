import React, { Component, useState, useRef, useCallback, useEffect, useMemo } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
// import { useAuthState } from "react-firebase-hooks/auth";
// import { useHistory } from "react-router";
// import { getAuth } from "firebase/auth";
import { getRol, getIdentificacion } from 'helpers/localStorage';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
} from "reactstrap";

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useMutation,
    gql
} from "@apollo/client";


//INICIO: GQL MUTACIONESSS



const CHANGESTATE = gql`  
mutation ($projectId: String, $newState: projectState) {
changeProjectState(projectId: $projectId, newState: $newState)
}
`;

const INSCRIBIRME = gql`  
mutation AddInscription($studentId: String, $projectId: String) {
    addInscription(studentId: $studentId, projectId: $projectId)
  }
`;

//FIN: GQL MUTACIONESSS

const ListProjects = props => {

    // INICIO: useMutation
    const [changeProjectState] = useMutation(CHANGESTATE);
    const [addInscription] = useMutation(INSCRIBIRME);
    // FIN : useMutation

    const rol = getRol();
    const idUser = getIdentificacion();

    const handleRowClick = (row) => {

        if (rol === "ADMINISTRADOR") {
            console.log("r", row);
            const { identificador, estado } = row;

            let projectId = identificador;
            let newState = (estado === "ACTIVO") ? "INACTIVO" : "ACTIVO";


            changeProjectState({
                variables: { projectId, newState }
            });
            history.go(0);
        }
    }








    const columnas = useMemo(() => [
        {
            name: 'ID',
            selector: row => row.identificador,
            sorteable: true
        },
        {
            name: 'Nombre del Proyecto',
            selector: row => row.nombre,
            sorteable: true
        },
        {
            name: 'Presupuesto',
            selector: row => row.presupuesto,
            sorteable: true
        },
        {
            name: 'Estado',
            selector: row => row.estado,
            sorteable: true
        },
        {
            name: 'Fase',
            selector: row => row.fase,
            sorteable: true
        },
        {
            name: 'Integrantes',
            selector: row => row.integrantes.length,
            sorteable: true
        },
        {
            name: 'Fecha Inicio',
            selector: row => row.fechaInicio,
            sorteable: true
        },
        {
            name: 'Fecha Fin',
            selector: row => row.fechaFin,
            sorteable: true
        },
        {
            name: "Activar/Desactivar",
            sortable: false,
            allowOverflow: false,
            ignoreRowClick: true,
            cell: (row, index, column, id) => <Button data-tag="allowRowEvents" onClick={() => { handleRowClick(row) }}>A/D</Button>
        },


    ]);




    const paginacionopciones = {
        rowsPerPageText: "Filas por pagina",
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }



    const PROYECTOS = gql`
    query Query {
        proyectos {
            identificador
            nombre
            integrantes{
                nombre            
            }
            presupuesto
            estado
            fase
            avances {
                fecha
                descripcion
            }
            lider {
                nombre
            }
            fechaInicio
            fechaFin
        }
    }
  
  `;


    const PROYECTS_BY_LIDER_ID = gql`
  query FindProjectByLeaderId($leader: String) {
    findProjectByLeaderId(leader: $leader) {
      identificador
      nombre
      integrantes {
        nombre
      }
      estado
      avances {
        fecha
        descripcion
        observaciones
      }
      lider {
        nombre
      }
      objetivosGenerales
      objetivosEspecificos
      presupuesto
      fase
      fechaInicio
      fechaFin
    }
  }
  `
    let proyectosFiltrados = []

    if (rol != "ESTUDIANTE") {
        const { loading, error, data } = useQuery(PROYECTOS);
        try {
            proyectosFiltrados = data.proyectos;
            console.log("Data Todos los proyectos:", data);
        } catch {
            console.log('estoy en error')
        }
    }
    else {
        const { loading, error, data } = useQuery(PROYECTS_BY_LIDER_ID, { variables: { leader: idUser } });
        if (loading) return null
        try {
            if (data) {
                proyectosFiltrados = data.findProjectByLeaderId;
                console.log("Data todos los proyectos del lider:", data);
            }else{
                proyectosFiltrados =[{}];
            }

        } catch {
            console.log('estoy en error')
        }
    }



    //if (loading) return null;
    /*  if (error) return `Error! ${error}`; */




    // const auth = getAuth();
    // const [user, loading, error] = useAuthState(auth);
    // const history = useHistory();
    const [newVal, setNewVal] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(false);
    const [errors, setErrors] = useState();
    const [busqueda, setBusqueda] = useState();
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [productos, setProductos] = useState();
    const [borrar, setBorrar] = useState(true);
    const [editar, setEditar] = useState(true);
    const [form, setForm] = useState({
        sku: "",
        nombreProducto: "",
        precioUnitario: 0,
        estadoProdInv: "",
        descripcionProducto: "",
        cantidadDisponible: 0
    });
    const [modalActualizar, setModalActualizar] = useState();


    const dato = useRef();
    const id = useRef();
    const selectableRowsComponent = useRef();
    const selectedRows = useRef();


    //Para el botón A/D:
    const handleButtonClick = (row) => {
        // if(form.estado == 'ACTIVO')
        //     form.estado = 'DESAC'
        // else{
        //     form.estado = 'ACTIVO'
        // }

        console.log("colum:", row)
        //console.log('dato.current en A/D', dato.current[0].identificador)
    }


    const onChange = useCallback((event) => {
        console.log('event.target.value ', event.target.value);
        // Imprimimos value 
        setBusqueda(event.target.value);
        // actualizamos busqueda
        console.log('busqueda ', busqueda);
        // imprimimos busqueda  
        const PalabraBuscada = (event.target.value).toLowerCase().toString();
        // 1). creamos parametro para enviar a filtrarproductos
        filtrarproductos(PalabraBuscada);
        // 2). pasamos parametro en minuscula
    });

    const filtrarproductos = useCallback((PalabraBuscada) => {
        try {
            // 3). hacemos una busqueda en todos los productos, cuando hacen match se almacenan en item
            var search = productos.filter(item => {
                //console.log('texto: ', item.nombreProducto + item.descripcionProducto + item.sku)    
                return (item.nombre + item.identificador + item.presupuesto).toLowerCase().match(PalabraBuscada)
                // concatenamos las propiedades de arriba. lo convertimos todo en minuscula y buscamos los match.

            });
            // 4). 'search' retorna un array con todos los productos que hicieron match
            console.log('search: ', search)
            setProductosFiltrados(search);
            // 5). con los productos que hicieron match, actualizamos ProductosFiltrados y estos se pintan en la tabla.
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

        if (window.confirm(`Está usted seguro de borrar:\r ${dato.current.map(r => r.nombreProducto)}?`)) {
            let msg = [];
            let arregloProductos = dato.current;
            console.log("AP", arregloProductos);
            arregloProductos.map(registro => {
                msg.push(registro.nombreProducto);
                eliminarProducto(registro._id);
            });
            alert("Se eliminaron: " + msg.join(","));
            cargarProductos();
            dato.current.splice(0, dato.current.length);
        }
    });

    const history = useHistory();
    const mostrarModalActualizar = useCallback(async () => {

        if (rol != 'ESTUDIANTE') {
            console.log('soy indefinido', dato.current[0].identificador)
            return history.push(`list-projects/${dato.current[0].identificador}`)
        }

        const datica = await addInscription({
            variables: {
                "studentId": getIdentificacion(),
                "projectId": dato.current[0].identificador
            }
        })
        alert(datica.data.addInscription)
        // dato.current.map(registro => {
        //     setModalActualizar(true);
        //     setForm(registro);
        //     id.current = registro._id;
        //     console.log(id.current);
        // }); //this.setState({ modalActualizar: true, form: dato });
    });

    const mostrarModalInscripciones = useCallback(() => {
        history.push(`/user/inscriptions/${dato?.current[0].identificador}`);
    })

    const mostrarModalAvances = useCallback(() => {
        history.push(`/user/avances/${dato?.current[0].identificador}`);
    })


    const cerrarModalActualizar = useCallback(() => {
        setModalActualizar(false);
        dato.current.splice(0, dato.current.length);
        setBorrar(true);
        setEditar(true);
    });

    const handleUpdate = useCallback((id, form) => {
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
            //alert("Producto creado exitosamente");

            fetch(`${BASE_URL}${PATH_PRODUCTS}/${id}`, requestOptions)
                .then(result => result.json())
                .then(result => {
                    console.log("result: ", result);
                    cargarProductos();
                    dato.current.splice(0, dato.current.length);
                    setBorrar(true);
                    setEditar(true);
                    alert("Producto Actualizado");
                    setNewVal(newVal + 1);
                }, error => {
                    console.log(error);
                });
        })
    });
    const cargarProductos = async () => {

        user.getIdToken(true).then(async (token) => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };

            const response = await fetch(`${BASE_URL}${PATH_PRODUCTS}`, requestOptions);
            const result = await response.json();
            console.log("R", result);
            setProductos(result);
            setProductosFiltrados(result);
        })
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
    };

    const customStyles = {
        rows: {
            style: {
                minHeight: '72px', fontSize: "0.8rem" // override the row height
            },
        },
        headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
            },
        },
        cells: {
            style: {
                paddingLeft: '8px', // override the cell padding for data cells
                paddingRight: '8px',
            },
        },
    };

    const rol1 = (rol === "ESTUDIANTE") ? "none" : "";


    return <div className="table-responsive"><br />

        <div className="barrabusqueda">
            <input type="text" placeholder="Buscar Producto" className="textfield" name="busqueda" value={busqueda} onChange={onChange} />

        </div>


        <DataTable
            columns={columnas}
            data={proyectosFiltrados}
            pagination paginationComponentOptions={paginacionopciones}
            fixedHeader
            selectableRows
            selectableRowsHighlight
            selectableRowsComponent={selectableRowsComponent.current}
            onSelectedRowsChange={handleChange}
            fixedHeaderScrollHeight="600px"
            noDataComponent="No se encontraron productos"

        />

        <button type="button" name="editar" className="btnUtil" disabled={editar} onClick={() => mostrarModalActualizar(dato.current)}>
            {rol == 'ESTUDIANTE' ? 'Inscribirme' : 'Editar'}
        </button>


        <button type="button" name="borrar" style={(rol === "ESTUDIANTE" || rol === "ADMINISTRADOR") ? { display: "none" } : { display: "" }} className="btnUtil" disabled={borrar} onClick={() => mostrarModalInscripciones(dato.current)}>
            Listas Inscripciones</button>



        <button type="button" name="borrar" style={(rol === "ESTUDIANTE" || rol === "ADMINISTRADOR") ? { display: "none" } : { display: "" }} className="btnUtil" disabled={borrar} onClick={() => mostrarModalAvances(dato.current)}>
            Listar Avances
        </button>

        <div>

            <Modal isOpen={modalActualizar}>
                <ModalHeader>
                    <div><h3>Actualizar producto {form.nombreProducto}</h3></div>
                </ModalHeader>

                <ModalBody>
                    <FormGroup>
                        <label>
                            Id del producto:
                        </label>

                        <input className="form-control" readOnly type="text" value={form.sku} />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Nombre del producto:
                        </label>
                        <input className="form-control" name="nombreProducto" type="text" onChange={handleChange1} value={form.nombreProducto} required />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Descripcion:
                        </label>
                        <input className="form-control" name="descripcionProducto" type="text" onChange={handleChange1} value={form.descripcionProducto} />
                    </FormGroup>

                    <FormGroup>
                        <label>
                            Cantidad:
                        </label>
                        <input className="form-control" name="cantidadDisponible" type="text" onChange={handleChange1} value={form.cantidadDisponible} />
                    </FormGroup>

                    <FormGroup>
                        {/* <label>
                            Estado:
                        </label>
                        <input className="form-control" name="estadoProdInv" type="text" onChange={handleChange1} value={form.estadoProdInv} /> */}

                        <label>Estado: </label>
                        <select type="select" style={{ width: "100%", height: "2.5rem", fontSize: "1rem", border: "2px solid #d5dbe3", borderRadius: "5px" }} name="estadoProdInv" onChange={handleChange1} value={form.estadoProdInv} className="mb-4">
                            <option value=""></option>
                            <option value="Disponible">Disponible</option>
                            <option value="No Disponible">No Disponible</option>
                        </select>

                    </FormGroup>
                    <FormGroup>
                        <label>
                            Precio Unitario:
                        </label>
                        <input className="form-control" name="precioUnitario" type="text" onChange={handleChange1} value={form.precioUnitario} />
                    </FormGroup>
                </ModalBody>

                <ModalFooter>
                    <Button className="btnUtil1" onClick={() => handleUpdate(id.current, form)}>
                        Actualizar
                    </Button>
                    <Button className="btnUtil1" onClick={() => cerrarModalActualizar()}>
                        Cancelar
                    </Button>
                </ModalFooter>
            </Modal>

        </div>



    </div>;
};

export default ListProjects;