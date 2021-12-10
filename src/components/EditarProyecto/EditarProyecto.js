import { React, useState, useCallback, useEffect } from 'react';


import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useMutation,
    gql
} from "@apollo/client";



const EditarProyecto = ({ match: { params: { identificador } } }) => {

    let bandera = false
    const [form, setForm] = useState({
        identificador: "",
        nombre: "",
        presupuesto: 0,
    });


    const idProject = identificador

    const PROYECTO = gql`
    query ProjectByIdentifier($idProject: String) {
        projectByIdentifier(idProject: $idProject) {
          nombre
          presupuesto
          identificador
        }
      }
  `;

    const data1 = ''
    const { loading, error, data } = useQuery(PROYECTO,
        {
            variables: { idProject }
        })
    console.log("Data:", data);

    //if (loading) return null;
    if (error) return `Error! ${error}`;
    console.log("Data1:", data);


    // if (!data){
    //     if (bandera == true) {
            
    //         bandera = false
            
            
    //         console.log('form:', form)

    //     }
    // }else{
    //     console.log('data existe!')
    //     bandera = true
    //     setForm(data.projectByIdentifier)
    // }
        


    const handleChange1 = useCallback((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
        console.log("form:", form);
    });


    return (
        <div>

            <div><h3>Actualizar producto {form.nombreProducto}</h3></div>


            <label>
                Identificador:
            </label>

            <input className="form-control" readOnly type="text" value={form.identificador} />

            <label>
                Nombre del proyecto:
            </label>
            <input className="form-control" name="nombre" type="text" onChange={handleChange1} value={form.nombre} required />

            <label>
                Presupuesto:
            </label>
            <input className="form-control" name="presupuesto" type="text" onChange={handleChange1} value={form.presupuesto} />


            {/* <label>
                            Estado:
                        </label>
                        <input className="form-control" name="estadoProdInv" type="text" onChange={handleChange1} value={form.estadoProdInv} /> */}

            {/* <label>Estado: </label>
                        <select type="select" style={{ width: "100%", height: "2.5rem", fontSize: "1rem", border: "2px solid #d5dbe3", borderRadius: "5px" }} name="estadoProdInv" onChange={handleChange1} value={form.estadoProdInv} className="mb-4">
                            <option value=""></option>
                            <option value="Disponible">Disponible</option>
                            <option value="No Disponible">No Disponible</option>
                        </select> */}

            <br></br>
            <button className="btnUtil1" onClick={() => handleUpdate(id.current, form)}>
                Actualizar
            </button>
            <button className="btnUtil1" onClick={() => cerrarModalActualizar()}>
                Cancelar
            </button>

        </div>
    )
}
export default EditarProyecto