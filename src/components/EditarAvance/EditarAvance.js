import { React, useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


import {
    useQuery,
    useMutation,
    gql
} from "@apollo/client";




const ADD_OBSERVATION = gql`
mutation ($idProyecto: String, $advanceId: String, $observaciones: String) {
    addObservationToAdvance(idProyecto: $idProyecto, advanceId: $advanceId, observaciones: $observaciones)
  }
`;

const EditarAvance = ({ match: { params: { identificador, avance } } }) => {


    let obs = ""
    const history = useHistory();

    const [addObservationToAdvance] = useMutation(ADD_OBSERVATION);

    const form = {
        observacion: ""
    }


    const editor = (e) => {
        e.preventDefault();

        if (obs.value) {
            form.observacion = obs.value



            console.log('form en editor:', form)
            addObservationToAdvance({
                variables: {
                    idProyecto: identificador,
                    advanceId: avance,
                    observaciones: form.observacion
                }
            }
            );
        }


        history.push(`/user/avances/${identificador}`);
        history.go(0);

    };


    const cancelar = (e)=>{
        e.preventDefault();
        history.push(`/user/avances/${identificador}`);
        history.go(0);
    }



    const idProject = identificador

    const PROYECTO = gql`
    query ProjectByIdentifier($idProject: String) {
        projectByIdentifier(idProject: $idProject) {
          nombre
          presupuesto
          identificador
          objetivosGenerales
          objetivosEspecificos
          integrantes{
              nombre
          }
          fase
          estado
        }
      }
  `;

    let nombres = [];

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
        nombres = form.integrantes.map(r => r.nombre);
        console.log("nombres: ", nombres.join());
    } catch {
        console.log('catch')
    }




    return (
        <div>

            <div><h3>Oservación  {avance} del proyecto {identificador}</h3></div>

            <form>

                <label>
                    Observación:
                </label>

                <textarea className="form-control" type="text" name='observacion' ref={u => obs = u} />


                <br></br>
                <button className="btnUtil1" onClick={editor}>
                    Actualizar
                </button>
                <button className="btnUtil1" onClick={cancelar}> Cancelar </button>

           


            </form>

        </div>
    )
}
export default EditarAvance;