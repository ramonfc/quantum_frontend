import React from "react";
import CrearUsuario from '../../components/CrearUsuario/CrearUsuario';

import Card from "components/Card/Card";
import CardHeader from "components/Card/CardHeader";
import GridItem from "components/Grid/GridItem";

function Maps() {
  return (
    <>

<Card>
        <GridItem>
          <CardHeader color="info">

            <h4>Lista de Usuarios</h4>

          </CardHeader>
          <CrearUsuario />
        </GridItem >
      </Card>
       
    </>
  );
}


export default Maps;
