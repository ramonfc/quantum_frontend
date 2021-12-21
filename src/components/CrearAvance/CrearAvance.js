import { React, useState, useCallback, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';


import {
    useQuery,
    useMutation,
    gql
} from "@apollo/client";




const CREAR_AVANCE = gql`
mutation ($idProyecto: String, $advanceId: String, $descripciones: String, $observaciones: String) {
    addAdvance(idProyecto: $idProyecto, advanceId: $advanceId, descripciones: $descripciones, observaciones: $observaciones)
  }
`;

const CrearAvance = ({ match: { params: { identificador, avance } } }) => {


    let idAvance = "";
    let description = "";
    const history = useHistory();

    const [addAdvance] = useMutation(CREAR_AVANCE);

    const form = {
    
        advanceId: "",
        descripciones: ""
    }


    

    const editor = (e) => {
        e.preventDefault();


        if (idAvance.value) 
            form.advanceId = idAvance.value
        if (description.value) 
            form.descripciones = description.value

        console.log('form en editor:', form)
        addAdvance({
            variables: {
                idProyecto: identificador,
                advanceId: form.advanceId,
                descripciones: form.descripciones,
                observaciones: ""
            }
        }
        );

        history.push(`/user/avances/${identificador}`);
        history.go(0);
    }



    const cancelar = (e) => {
        e.preventDefault();
        history.push(`/user/avances/${identificador}`);
        history.go(0);
    }







    //if (loading) return null;
 
    try {
        form = { ...data.addAdvance }
       
    } catch {
        console.log('catch')
    }




    return (
        <div>

            <div><h3>Crear Avance del proyecto {identificador}</h3></div>

            <form>

                <label>
                    ID Avance:
                </label>

                <input className="form-control" type="text" name='advanceId' ref={u => idAvance = u} />


                <label>
                    Descripción:
                </label>

                <textarea className="form-control" type="text" name='descripciones' ref={u => description = u} />

                <br></br>
                <button className="btnUtil1" onClick={editor}>
                    Agregar
                </button>
                <button className="btnUtil1" onClick={cancelar}> Cancelar </button>




            </form>

        </div>
    )
}
export default CrearAvance;