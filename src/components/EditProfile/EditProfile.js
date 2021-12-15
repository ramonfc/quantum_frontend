import { React, useState, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';


import {
    useQuery,
    useMutation,
    gql
} from "@apollo/client";



/* const EDITARPERFIL = gql`

mutation UpdateUser($updateUserId: String,
$correo: String, 
$contrasena: String, 
$activo: Boolean)
{
    updateUser(id: $updateUserId, newInfo: { 
        correo: $correo, 
        contrasena: $contrasena, 
        activo: $activo}
        )
}
`; */

const EDITARPERFIL = gql`

mutation UpdateUser($updateUserId: String, $newInfo: UserUpdateInfo)
{
    updateUser(id: $updateUserId, newInfo: { 
        correo: $correo, 
        contrasena: $contrasena, 
        activo: $activo}
        )
}
`;

const EditProfile = ({ match: { params: { id } } }) => {


    //const history =  useHistory()
    const [editUserRecargado] = useMutation(EDITARPERFIL)

    const editor = (e) => {
        e.preventDefault();

        if (correoUsuario.value)
            form.correo = parseFloat(correoUsuario.value);

        console.log('capturalooo: ', activoUsuario.value)
        if (activoUsuario.value)
            form.activo = activoUsuario.value === "true"? true:false;
            console.log("activo editado en if: ", form.activo)
        if (contrasenaUsuario.value)
            form.contrasena = (contrasenaUsuario.value)
        console.log('evento', e)

        console.log('form en editor:', form)

        editUserRecargado({
            variables: {
                id: id,   
                newInfo:{
                    correo: form.correo,
                    activo: form.activo,
                    contrasena: form.contrasena
                }             
                    
                

            }
        }
        )
        /* Login.setModalRegistro(false); */
    };

    let correoUsuario;
    let contrasenaUsuario;
    let activoUsuario;
    let form = {}



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



    const { loading, error, data } = useQuery(MIPERFIL,
        {
            variables: { id }
        })
    console.log("Data:", data);

    //if (loading) return null;
    if (error) return `Error! ${error}`;
    console.log("Data1:", data);
    try {
        form = { ...data.findUserByPersonalId }
        form.activo2 = form.activo == true ? "Si" : "No";

        form.option = form.activo == true ? "No" : "Si";

    } catch {
        console.log('catch')
    }



    return (
        <div>

            <div><h3>Actualizar Datos {form.nombre}</h3></div>

            <form>

                <label>
                    identificacion:
                </label>

                <input className="form-control" readOnly type="text" placeholder={form.identificacion} />

                <label>
                    Nombre:
                </label>
                <input className="form-control" readOnly name="nombre" type="text" placeholder={form.nombre} />

                <label>
                    Estado:
                </label>
                <input className="form-control" readOnly name="estado" type="text" placeholder={form.estado} />

                <label>
                    Correo:
                </label>
                <input className="form-control" name="correo" type="text" ref={u => correoUsuario = u} placeholder={form.correo} />


                <label>
                    Contraseña:
                </label>
                <input className="form-control" name="contrasena" type="password" ref={u => contrasenaUsuario = u} />

                <label>Activo</label>
                <select type="select" name="status" style={{ width: "100%", height: "2.5rem", fontSize: "1rem", border: "2px solid #d5dbe3", borderRadius: "5px" }} ref={u => activoUsuario = u} className="mb-4">
                    <option selected value={form.activo}>{form.activo2}</option>
                    <option value={!form.activo}>{form.option}</option>
                </select>


                <br></br>
                <button className="btnUtil1" onClick={editor}>
                    Actualizar
                </button>
                <Link to="/user/list-projects"><button className="btnUtil1"> Cancelar </button></Link>



            </form>

        </div>
    )
}
export default EditProfile;