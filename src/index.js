/*!

=========================================================
* INFINITY INDEX - ENRUTADOR
* Los Estilos que se vayan a utilizar de manera Global
* Importalos aqui!
=========================================================

*/
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

// estilos css Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Layouts
import Admin1 from "layouts/Admin1.js";
import Login from "layouts/Login.js";
//import Login2 from "./components/Login/Login"

import "assets/css/material-dashboard-react.css?v=1.10.0";
import rtlStyle from "assets/jss/material-dashboard-react/views/rtlStyle";
//import carruselListar from './components/carruselListar/carruselListar'


import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider
} from "@apollo/client";
import Carrusel from "components/Carrusel/Carrusel";

const client = new ApolloClient({
  uri: 'https://quantum-backend-f4fzhsmhma-uc.a.run.app/graphql',
  cache: new InMemoryCache()
});

ReactDOM.render(

  <ApolloProvider client={client}>
  <BrowserRouter>
    <Switch>
      <Route  path="/user" component={Admin1} />
      <Route  path="/login" component={Login} />
      <Route  path='/carrusel' component={Carrusel}/>
      {/* <Route  path='/carrusel/listar' component={carruselListar}/> */}
      <Route  path="/" component={Login} />
      <Redirect from="/" to="/login" />
    </Switch>
  </BrowserRouter>
  </ApolloProvider>,
  document.getElementById("root")
);
