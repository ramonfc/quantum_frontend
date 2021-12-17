/*eslint-disable*/
import React from "react";
import { useHistory } from "react-router-dom";




export default function CerrarSesion() {

  const history = useHistory();

  const cerrarSesion = ()=>{
    localStorage.clear();
    console.log("entre a cerrar sesion")
    history.push("/");
  }
  return (
    <div>
     {cerrarSesion()}
    </div>
  );
}