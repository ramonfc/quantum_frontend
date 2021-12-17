/*eslint-disable*/
import React from "react";
import { useHistory } from "react-router-dom";




export default function RTLPage() {

  const history = useHistory();

  const cerrarSesion = ()=>{
    localStorage.clear();
    console.log("entre a cerrar sesion");
    console.log(history);
    history.push("/users");
    
  }
  return (
    <div>
     {cerrarSesion()}
    </div>
  );
}
