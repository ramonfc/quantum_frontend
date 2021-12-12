import React, { Component } from 'react';
import { Input, Label } from 'reactstrap';
import './InputLblReq.css';
/**
 * Retorna un componente formado por un label y un input. 
 * El atributo className aplica a la etiqueta input solamente,
 * El atributo rows se usa en caso de que el atributo type tenga por 
 * valor "textarea", representando así la cantidad de lineas para este.
 * El atributo text corresponde al contenido que será mostrado en el label.
 * @param {for, className, text, type, name, placeholder, rows} props 
 * @returns componente que está formado por un label y un input
 */
function InputLblReq(props) {
   
        return (
            <div>
                <Label for={props.for}>{props.text}</Label>
                <Input className={props.className} type={props.type} name={props.name} placeholder={props.placeholder} rows={props.rows} 
                value={props.value} onChange={props.onChange} required> </Input>
            </div>
        )
}

export default InputLblReq;







