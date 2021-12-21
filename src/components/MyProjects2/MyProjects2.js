import React, { useRef, useCallback, useMemo, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';
import { useHistory } from 'react-router-dom';

import { getRol} from 'helpers/localStorage';

import {
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
} from "reactstrap";

import { 
    useQuery,
    useMutation,
    gql
} from "@apollo/client";

const MY_PROJECTS = gql`
query ($findProjectByStudenIdId: String) {
    findProjectByStudentId(id: $findProjectByStudenIdId) {
      identificador
      nombre
      fase
      lider {
        nombre
      }
      estado
    }
  }
`



const MyProjects2 = props => {
    const rol = getRol();
    const idUser = props.id;

    const history = useHistory();
    const [borrar, setBorrar] = useState(true);
    const [editar, setEditar] = useState(true);

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
            name: 'Lider',
            selector: row => row.lider.nombre,
            sorteable: true
        }

    ]);
    const paginacionopciones = {
        rowsPerPageText: "Filas por pagina",
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,
        selectAllRowsItemText: 'Todos'
    }

    let proyectosFiltrados = []

    console.log("ID USER:", idUser)
      const { loading, error, data } = useQuery(MY_PROJECTS, {variables:{findProjectByStudenIdId:idUser}});
      if(loading) return null;
      try {
          proyectosFiltrados = data.findProjectByStudentId;
          console.log("Data todos los proyectos del lider:", data);
      } catch {
          console.log('estoy en error')
      }
    


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
        } 


        console.log(borrar);
        console.log(editar);
        console.log(dato.current);
    });

    const mostrarAvances  = useCallback(() =>{
        history.push(`/user/avances/${dato?.current[0].identificador}`);
    });
    
    const mostrarModalAvances = useCallback(() =>{
        history.push(`/user/avances/${dato?.current[0].identificador}`);
    })
    

    return <div className="table-responsive"><br />



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
        noDataComponent="No se encontraron proyectos"

    /> 


    <button type="button" name="editar" className="btnUtil" disabled={editar} onClick={() => mostrarAvances(dato.current)}>
        {rol == 'ESTUDIANTE' ? 'Listar Avances' : 'Editar'}
    </button>


 


    <button type="button" name="borrar" style={(rol==="ESTUDIANTE")?{display:"none"}:{display:""}} className="btnUtil" disabled={borrar}  onClick={() => mostrarModalAvances(dato.current)}>
        Listar Avances
    </button>

    </div>
}


export default MyProjects2;