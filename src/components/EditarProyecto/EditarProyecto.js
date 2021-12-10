import { React, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';


import {
    useQuery,
    useMutation,
    gql
} from "@apollo/client";




const EDITARPROYECTO = gql`

mutation editProject($identificador: String, 
$nombre: String, 
$objetivosGenerales: [String], 
$objetivosEspecificos: [String],   
$presupuesto: Float) 
{
editProject(input: {identificador: $identificador, 
  nombre: $nombre, 
  objetivosGenerales: $objetivosGenerales, 
  objetivosEspecificos: $objetivosEspecificos,   
  presupuesto: $presupuesto})
}
`;

const EditarProyecto = ({ match: { params: { identificador } } }) => {


    //const history =  useHistory()
    const [editProjectrecargado] = useMutation(EDITARPROYECTO)

    const editor = (e) => {
        e.preventDefault();
        if(name.value)
            form.nombre = name.value
        if(presupuestirijillo.value)
            form.presupuesto = parseFloat(presupuestirijillo.value)
        if(objGenerales.value)
            form.objetivosGenerales = (objGenerales.value).split(',')
        console.log('capturalooo: ',objEspecificos.value)
        if(objEspecificos.value)
            form.objetivosEspecificos = (objEspecificos.value).split(',')

        console.log('form.nombre en editor:', form.nombre)

        console.log('evento',e)
        e.preventDefault();
        console.log('form en editor:', form)
        editProjectrecargado({
            variables: {
                nombre: form.nombre,
                identificador: form.identificador,
                presupuesto: form.presupuesto,
                objetivosGenerales: form.objetivosGenerales,
                objetivosEspecificos: form.objetivosEspecificos
            }
        }
        )
        /* Login.setModalRegistro(false); */
    };
    let name ;
    let presupuestirijillo;
    let objGenerales = [];
    let objEspecificos = [];
    let form = {}

    const idProject = identificador

    const PROYECTO = gql`
    query ProjectByIdentifier($idProject: String) {
        projectByIdentifier(idProject: $idProject) {
          nombre
          presupuesto
          identificador
          objetivosGenerales
          objetivosEspecificos
        }
      }
  `;


    const { loading, error, data } = useQuery(PROYECTO,
        {
            variables: { idProject }
        })
    console.log("Data:", data);

    //if (loading) return null;
    if (error) return `Error! ${error}`;
    console.log("Data1:", data);
    try {
        form = { ...data.projectByIdentifier }
        console.log('form:', form)
    } catch {
        console.log('catch')
    }

    


    return (
        <div>

            <div><h3>Actualizar producto {form.nombre}</h3></div>

            <form>

                <label>
                    Identificador:
                </label>

                <input className="form-control" readOnly type="text" placeholder={form.identificador} />

                <label>
                    Nombre del proyecto:
                </label>
                <input className="form-control" name="nombre" type="text" required ref={u => name = u} placeholder={form.nombre} />

                <label>
                    Presupuesto:
                </label>
                <input className="form-control" name="presupuesto" type="text" ref={u => presupuestirijillo = u} placeholder={form.presupuesto} />

                <label>
                    Objetivos Generales:
                </label>
                <input className="form-control" name="objetivosGenerales" type="text" ref={u => objGenerales = u} placeholder={form.objetivosGenerales} />
                <label>
                    Objetivos Especificos:
                </label>
                <input className="form-control" name="objetivosEspecificos" type="text" ref={u => objEspecificos = u} placeholder={form.objetivosEspecificos} />

                <br></br>
                <button className="btnUtil1" onClick={editor}>
                    Actualizar
                </button>
                <Link to="/user/list-projects"><button className="btnUtil1"> Cancelar </button></Link>
                   
               

            </form>

        </div>
    )
}
export default EditarProyecto