import React, {Component} from "react";
import InputLbl from "components/InputLbl/InputLbl";
import SelectCustom from "components/SelectCustom/SelectCustom";
import {Button, Form} from "reactstrap";



const options =[
    {value: "Manizales", label:"Manizales"},
    {value: "Cali", label:"Cali"},
    {value: "Narnia", label:"Narnia"}
];

class FormPrueba extends Component {
    constructor(props) {
      super(props);
      this.state = {value: ''};
  
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
    }
  
    handleChange(event) {
      this.setState({value: event.target.value});
    }
  
    handleSubmit(event) {
      event.preventDefault();
    }
  
    render() {
      return (
        <Form action="http://localhost:3000/customers" method="POST">
       
          <InputLbl type="text" text="Name:" name="firstName"/>

          <InputLbl type="text" text="Lastname:" name="lastName"/>
       
          <InputLbl type="text" text="Email:" name="email"/>

          <InputLbl type="text" text="Phone:" name="phoneNumber"/>
        
          <InputLbl type="text" text="Address:" name="address"/>

          <SelectCustom  options={options}  className="mb-4" text="City:"  name="city"/>

          <InputLbl type="text" text="State:" name="state"/>
       
          <InputLbl type="text" text="Zip Code:" name="zipCode"/>    

          <InputLbl type="text" text="Country:" name="country"/>


          <Button className="" type="submit" color="primary" id="crearProd">Enviar</Button>
          <Button className="" type="reset" color="primary" id="crearProd">Limpiar</Button>
        </Form>
      );
    }
  }

  export default FormPrueba;