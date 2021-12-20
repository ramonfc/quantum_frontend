import React, { Component, useState, useRef, useCallback, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import UpdateUser from 'components/UpdateUser/UpdateUser';

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
import { getIdentificacion } from 'helpers/localStorage';

import { Link } from 'react-router-dom';


const columnas = [
    {
        name: 'Nombre',
        selector: 'nombre',
        sorteable: true,
        width: '20%'
    },
    {
        name: 'Identificacion',
        selector: 'identificacion',
        sorteable: true
    },
    {
        name: 'Correo',
        selector: 'correo',
        sorteable: true,
        width: '20%'
    },
    {
        name: 'Tipo de usuario',
        selector: 'tipoUsuario',
        sorteable: true
    },
    {
        name: 'Estado',
        selector: 'estado',
        sorteable: true
    },
    {
        name: 'Activo',
        selector: d => d.activo? 'Si':'No',
        sorteable: true
    },
]

const paginacionopciones = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}

const MIPERFIL = gql`
query 
FindUserByPersonalId($id: String) {
    findUserByPersonalId(id: $id) {
      correo
      identificacion
      nombre
      tipoUsuario
      estado
      activo
    }
  }
  `;


const ShowProfile = (props) => {
    console.log("Props:",props);
    const id = props.id

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

 

    useEffect(() => {
        console.log("Cargando usuarios")
        console.log("Cargando data", data)
    }, []);

    const dato = useRef();
    const x = useRef();
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


   

    const mostrarModalActualizar = useCallback(() => {
        dato.current.map(registro => {
            setModalActualizar(true);
            setForm(registro);
            x.current = registro._id;
            //console.log(id.current);
        }); //this.setState({ modalActualizar: true, form: dato });
    });
    const cerrarModalActualizar = useCallback(() => {
        setModalActualizar(false);
    });

    const handleUpdate = useCallback((id,form)  => {
        console.log("FormInfo:",form);
        <UpdateUser form = {form}/>;
    });

  
console.log("i:",id);
    const { loading, error, data } = useQuery(MIPERFIL, {
        variables: { id },
    })
    console.log("Data:", data);

    if (loading) return null;
    if (error) return `Error! ${error}`;
    console.log("Data1:", data);
    const usuariosTabla = [data.findUserByPersonalId];
    console.table("UT", usuariosTabla);

 
    return <div className="table-responsive"><br />
       

       
        {<DataTable
            columns={columnas}
            data={usuariosTabla}
            fixedHeader
            selectableRows
            selectableRowsHighlight
            selectableRowsComponent={selectableRowsComponent.current}
            onSelectedRowsChange={handleChange}
            fixedHeaderScrollHeight="600px"
            noDataComponent="No se encontraron usuarios" />}

<Link to={`profile/${usuariosTabla[0].identificacion}`}><button type="button" name="editar" className="btnUtil" disabled={editar}>Editar</button></Link>

        

    </div>;
};

export default ShowProfile;