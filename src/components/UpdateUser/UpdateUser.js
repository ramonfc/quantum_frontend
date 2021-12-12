import React, { Component, useState, useRef, useCallback, useEffect } from 'react';

import {
    ApolloClient,
    InMemoryCache,
    ApolloProvider,
    useQuery,
    useMutation,
    gql
} from "@apollo/client";



const UPDATEUSER = gql`
mutation 
UpdateUser($identificacion: String, 
    $correo: String,
    $nombre: String,
    $activo: Boolean) {
    updateUser(identificacion: $identificacion,
        correo: $correo,
        nombre: $nombre,
        activo: $activo
        )
  }
`;

const UpdateUser = (props) => {
    console.log("Props:",props);

    const id = props.identificacion;
    const correo = props.correo;
    const nombre = props.nombre;
    const activo = props.activo;

    useEffect(() => {
        console.log("Cargando variables para update")
        
    }, []);



const { loading, error} = useMutation(UPDATEUSER, {
    variables: { id,
                correo,
                nombre,
                activo
             },
})

if (loading) return null;
if (error) return `Error! ${error}`;


};
export default UpdateUser;