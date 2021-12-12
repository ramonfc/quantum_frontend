import React, { Component, useState, useRef, useCallback, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import DataTable from 'react-data-table-component';

import {
    Container,
    Row,
    Col,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter
} from "reactstrap";

import { useAuthState } from "react-firebase-hooks/auth";
import { useHistory } from "react-router";
import { getAuth } from "firebase/auth";
import { FlashOffOutlined } from '@material-ui/icons';


const BASE_URL = process.env.REACT_APP_BASE_URL;
//const BASE_URL = "http://localhost:3000/";
console.log(BASE_URL);
const PATH_SALES = 'sales';
const PATH_PRODUCTS = 'products';

const columnasv = [
    {
        name: 'ID venta',
        selector: 'idVenta',
        sorteable: true
    },
    {
        name: 'Cliente',
        selector: 'nombreCliente',
        sorteable: true
    },
    {
        name: 'ID Cliente',
        selector: 'idCliente',
        sorteable: true
    },
    {
        name: 'ID vendedor',
        selector: 'idVendedor',
        sorteable: true
    },
    {
        name: 'Vendedor',
        selector: 'nombreVendedor',
        sorteable: true
    },
    {
        name: 'Valor Total',
        selector: 'valorTotal',
        sorteable: true
    },
    {
        name: 'Estado Venta',
        selector: 'estadoSale',
        sorteable: true
    },
    {
        name: 'Fecha venta',
        selector: 'fechaSale',
        sorteable: true
    },
    {
        name: 'Fecha envio',
        selector: 'fechaEnvio',
        sorteable: true
    },
    {
        name: 'Fecha entega',
        selector: 'fechaEntrega',
        sorteable: true
    }


]

const columnas_1 = [
    {
        name: 'ID del producto',
        selector: 'sku',
        sorteable: true
    },
    {
        name: 'Nombre',
        selector: 'nombreProducto',
        sorteable: true
    },
    {
        name: 'Precio Unitario',
        selector: 'precioUnitario',
        sorteable: true
    },
    {
        name: 'Cantidad',
        selector: 'cantidadDisponible',
        sorteable: true
    }


]

const columnas_2 = [
    {
        name: 'ID del producto',
        selector: 'sku',
        sorteable: true
    },
    {
        name: 'Nombre del producto',
        selector: 'nombreProducto',
        sorteable: true
    },
    {
        name: 'Precio Unitario',
        selector: 'precioUnitario',
        sorteable: true
    },
    {
        name: 'Cantidad',
        selector: 'cantidadDisponible',
        sorteable: true
    }


]

const paginacionopciones = {
    rowsPerPageText: "Filas por pagina",
    rangeSeparatorText: 'de',
    selectAllRowsItem: true,
    selectAllRowsItemText: 'Todos'
}



const ListSales2 = props => {

    const auth = getAuth();
    const [user, loading, error] = useAuthState(auth);
    const history = useHistory();
    const [newVal, setNewVal] = React.useState(0);
    const [isLoaded, setIsLoaded] = React.useState(false);
   
    const [errors, setErrors] = React.useState(null);

    const [newVal1, setNewVal1] = React.useState(0);

    const [busqueda, setBusqueda] = useState();
    const [productosFiltrados, setProductosFiltrados] = useState([]);
    const [productosAgregar, setProductosAgregar] = useState();
    const [productos, setProductos] = useState();
    const [borrar, setBorrar] = useState(true);
    const [editar, setEditar] = useState(true);
    const [modalAgregar, setModalAgregar] = useState();
    const [modalActualizar, setModalActualizar] = useState();
    const [productosVenta, setProductosVenta] = useState();
    const [modalAgregarProductos, setModalAgregarProductos] = useState();
    const [modalCantidadSolicitada, setModalCantidadSolicitada] = useState();
    const [form, setForm] = useState({
        idVenta: "",
        nombreCliente: "",
        idCliente: "",
        idVendedor: "",
        nombreVendedor: "",
        valorTotal: 0.0,
        estadoSale: "",
        fechaSale: "",
        fechaEnvio: "",
        fechaEntrega: "",
        productos: []

    });


    useEffect(() => {
        cargarProductos();
    }, []);
    const dato = useRef();   //Constante para manejo de selectedRows en tabla de ListSales2     
    const dato1 = useRef();  //Constante para manejo de selectedRows en tabla de productosVenta
    const dato2 = useRef();  //Constante para manejo de selectedRows en tabla de productosAgregar
    const id = useRef();     //Constante para manejo de _id en dato
    const id1 = useRef();    //Constante para manejo de _id en dato1
    const cantidad = useRef({val: 0}); //Variable para cantidad de productos agregar a la venta
    const selectableRowsComponent = useRef();


    React.useEffect(() => {
        if (loading) return;
        if (!user) return history.replace("/");
    }, [user, loading]);

    React.useEffect(() => {
        if (!user) return history.replace("/");
        user.getIdToken(true).then(token => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            fetch(`${BASE_URL}${PATH_SALES}`, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setProductos({
                            result,
                        });
                    },
                    (error) => {
                        setIsLoaded(true);
                        setErrors(error);
                    }
                )
        });
    }, [newVal]);


   
   /*  React.useEffect(() => {


            console.log("ID de la venta",dato.current[0]._id);
            alert(dato.current); 

        
        if (!user) return history.replace("/");
         user.getIdToken(true).then(token => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            fetch(`${BASE_URL}${PATH_SALES}/${dato.current[0]._id}`, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        console.log(result)
                        setProductosVenta({
                            result,
                        });
                    },
                    (error) => {
                        setIsLoaded(true);
                        setErrors(error);
                    }
                )
        }); 
    }, [newVal1]);  */


    useEffect(() => {
        console.log("Cargando productos")
        cargarProductos();
    }, []);

    const onChange = useCallback((event) => {
        console.log('event.target.value ', event.target.value);  
        // Imprimimos value 
        setBusqueda(event.target.value);     
        // actualizamos busqueda
        console.log('busqueda ', busqueda);  
        // imprimimos busqueda  
        const PalabraBuscada = (event.target.value).toLowerCase().toString(); 
        // 1). creamos parametro para enviar a filtrarproductos
        filtrarproductos(PalabraBuscada); 
        // 2). pasamos parametro en minuscula
    });

    const filtrarproductos = useCallback((PalabraBuscada) => {
        try {
            // 3). hacemos una busqueda en todos los productos, cuando hacen match se almacenan en item
            var search = productos.filter(item => { 
                //console.log('texto: ', item.nombreProducto + item.descripcionProducto + item.sku)    
                return (item.nombreCliente + item.idVenta + item.idCliente).toLowerCase().match(PalabraBuscada) 
                // concatenamos las propiedades de arriba. lo convertimos todo en minuscula y buscamos los match.
               
            }); 
            // 4). 'search' retorna un array con todos los productos que hicieron match
            console.log('search: ', search)
            setProductosFiltrados(search); 
            // 5). con los productos que hicieron match, actualizamos ProductosFiltrados y estos se pintan en la tabla.
        } catch (error) {
            console.log(error);
        }
    });
    // const onChange = useCallback(() => {
    //     setBusqueda(event.target.value);
    //     filtrarproductos(event.target.value);
    // });


    // const filtrarproductos = useCallback(() => {
    //     try {
    //         var search = productos.filter(item => {
    //             return item.nombreCliente.includes(busqueda) || item.idVendedor.includes(busqueda) || item.idVenta.includes(busqueda);
    //         });
    //         setProductosFiltrados(search);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // });


    const handleChange = useCallback((e) => {
        const rows = e.selectedRows;
        console.log(rows.length);
        console.log(e.selectedRows);
        dato.current = e.selectedRows;

        if (rows.length === 0) {
            setBorrar(true);
            setEditar(true);
            dato.current.splice(0, props.length);
        }

        if (rows.length === 1) {
            setBorrar(false);
            setEditar(false);
        }

        if (rows.length > 1) {
            setEditar(true);
            setBorrar(false);
        } //this.setState.disabled;


        console.log(borrar);
        console.log(editar);
        console.log(dato.current);
    });

    const handleChange4 = (e) => {
     
          cantidad.current.val= e.target.value 
          console.log("C:",cantidad.current);
          console.log(typeof cantidad.current);
          
      };
      

    const handleChange3 = useCallback((e) => {
       
        console.log("SRv",e.selectedRows);
        dato2.current = e.selectedRows;

        console.log("Dato2:",dato2.current[0]);
    });

    const handleChange2 = useCallback((e) => {
        const rows = e.selectedRows;
        console.log(rows.length);
        console.log(e.selectedRows);
        dato1.current = e.selectedRows;

        if (rows.length === 0) {
            setBorrar(true);
            setEditar(true);
           
        }

        if (rows.length === 1) {
            setBorrar(false);
            setEditar(false);
        }

        if (rows.length > 1) {
            setEditar(true);
            setBorrar(false);
        } //this.setState.disabled;


        console.log(borrar);
        console.log(editar);
        console.log(dato.current);
    });




    const handleChange1 = useCallback((e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value
        });
    });


    const handleDelete = useCallback((d) => {
        console.log("SRV",d);
        console.log("LSRV",d.length);

        if (window.confirm(`Está usted seguro de borrar:\r ${d.map(r => r.nombreCliente)}?`)) {
            let msg = [];
            let arregloProductos = d;
            arregloProductos.map(registro => {
                msg.push(registro.nombreCliente);
                eliminarProducto(registro._id);
            });
            cargarProductos();
            alert("Se eliminaron: " + msg.join(","));
            dato.current.splice(0, d.length);
        }
    });

    const handleDelete1 = useCallback((dato1) => {
        console.log(dato1);
        console.log("dato1:",dato1);

        if (window.confirm(`Está usted seguro de borrar:\r ${dato1.map(r => r.nombre)}?`)) {
            let msg = [];
            let arregloProductos = dato1;
            console.log("Dato.productos:",dato.productos)
            arregloProductos.map(registro => {
                msg.push(registro.nombre);
                id1.current = registro._id;
                console.log("id_producto_venta",registro._id);
                console.log("datos_venta",dato.current[0].productos);
                let contador = 0;
                dato.current[0].productos.map(r=>{
                    if(r._id === registro._id) {
                        dato.current[0].productos.splice(contador, 1);
                    } contador +=1;
                })
                console.log("datos_venta_d",dato.current[0].productos);
                console.log("datos_venta_body",dato.current);
                eliminarProductoVenta(dato.current[0]);
            });
            //setNewVal1(newVal1 + 1);
            alert("Se eliminaron: " + msg.join(","));
            

        }
    });


    const eliminarProducto = useCallback((idAEliminar) => {
        // Simple POST request with a JSON body using fetch
        
        user.getIdToken(true).then(token => {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            } //body: JSON.stringify(idAEliminar)

        }; //console.log(requestOptions);
        //alert("Producto creado exitosamente");

        fetch(`${BASE_URL}${PATH_SALES}/${idAEliminar}`, requestOptions)
        .then(result => result.json()).
        then(result => {
            console.log("result: ", result); //alert("Producto eliminado")
            cargarProductos();
            dato.current.splice(0, dato.current.length);
            setEditar(true)
            setBorrar(true)
        }, error => {
            console.log(error);
        });
    })
    });

    const eliminarProductoVenta = useCallback((b) => {
        // Simple POST request with a JSON body using fetch
        
        user.getIdToken(true).then(token => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            }   ,body: JSON.stringify(b)
            

        }; //console.log(requestOptions);
        //alert("Producto creado exitosamente");

        fetch(`${BASE_URL}${PATH_SALES}/${b._id}`, requestOptions).then(result => result.json()).then(result => {
            console.log("result: ", result); //alert("Producto eliminado")
            //this.cargarProductos();
            setProductosVenta(result.productos);
            dato.current.splice(0, dato.current.length);
            setEditar(true)
            setBorrar(true)
        }, error => {
            console.log(error);
        });
    })
    });


    const mostrarModalActualizar = useCallback(() => {
        dato.current.map(registro => {
            setModalActualizar(true);
            setForm(registro);
            console.log("Registro:", registro);
            id.current = registro._id;
            console.log(id.current);
            console.log("Productos:", registro.productos)
            setProductosVenta(registro.productos);

        }); //this.setState({ modalActualizar: true, form: dato });
    });

    /* const mostrarModalActualizaagregarproductos = useCallback(() => {
        productosVenta.map(registro => {
            setModalActualizar(true);
            setForm(registro);
            console.log("Registro:", registro);
            id.current = registro._id;
            console.log(id.current);
            console.log("Productos:", registro.productos)
        });
    }); */


    const cerrarModalActualizar = useCallback(() => {
        setModalActualizar(false);
        console.log("Apagando modal");
        dato.current.splice(0, dato.current.length);
        setEditar(true)
        setBorrar(true)
    });

    const mostrarModalAgregarProductos = useCallback(() => {
        setModalAgregarProductos(true);
        cargarInventario();
        
    });

    const cargarInventario = () =>{
        if (!user) return history.replace("/");
        user.getIdToken(true).then(token => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            fetch(`${BASE_URL}${PATH_PRODUCTS}`, requestOptions)
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        
                        setProductosAgregar(
                            result
                        );
                    },
                    (error) => {
                        setIsLoaded(true);
                        setErrors(error);
                    }
                )
        });
    }

    const cerrarModalAgregarProductos = useCallback(() => {
        setModalAgregarProductos(false);
        
    });

    const mostrarModalCantidadSolicitada = useCallback(() => {
        setModalCantidadSolicitada(true);
        
    });

    const cerrarModalCantidadSolicitada = useCallback(() => {
        setModalCantidadSolicitada(false);
        
    });

    const agegarProductoVenta = ()=>{
        mostrarModalCantidadSolicitada();
    
    };

    const confirmarCantidad = (id, f)=> {
        console.log("Dato2v:",dato2.current[0]);
        console.log("Form.productos:",f.productos);
        console.log("IDv:",id);
        console.log("Formulariov:",f);
        let curCantidad = parseInt(cantidad.current.val);
        let disCantidad = dato2.current[0].cantidadDisponible;
        console.log("Cantidad",curCantidad);
        console.log("Disponible", disCantidad);
        if(curCantidad <= disCantidad){
            dato2.current[0].cantidadDisponible=parseInt(cantidad.current.val);
            f.productos.push(dato2.current[0]);
            //dato2.current[0].cantidadDisponible = (disCantidad - curCantidad)
            //f.productos[f.productos.length].nombre=dato2.current[0].nombreProducto;
            console.log("Form.productosN:",f.productos);
            setProductosVenta(f.productos.map(x=>{return x;}));    //Cambio Javier aca
            console.log("PV", productosVenta);
            console.log("FormulariovN:",f);
            //console.log("SRv",e.selectedRows);
            handleAddProductsSale(id, f);
            let id1 = dato2.current[0]._id;
            let f1 = {
                skw: dato2.current[0].skw,
                nombreProducto: dato2.current[0].nombreProducto,
                descripcionProducto: dato2.current[0].descripcionProducto,
                cantidadDisponible: (disCantidad - curCantidad),
                estadoProdInv: dato2.current[0].estadoProdInv,
                precioUnitario: dato2.current[0].precioUnitario
                          }

            handleUpdate12(id1,f1)
        }else{
            let msg = "Cantidad no disponible, existencias: " + disCantidad;
            alert(msg);             
        }

        cerrarModalCantidadSolicitada();

    }

    const handleUpdate12 = useCallback((id, form) => {
        console.log("body:",dato.current);
        //cerrarModalActualizar(); // Simple POST request with a JSON body using fetch

        user.getIdToken(true).then(token => {
        const requestOptions = {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(form)
        }; //console.log(requestOptions);
        //alert("Producto creado exitosamente");

        fetch(`${BASE_URL}${PATH_PRODUCTS}/${id}`, requestOptions)
        .then(result => result.json())
        .then(result => {
            console.log("result: ", result);
            // cargarProductos();
            dato.current.splice(0, dato.current.length);
            // alert("Producto Actualizado");
            // setNewVal(newVal + 1);
        }, error => {
            console.log(error);
        });
    })
    });

    const handleAddProductsSale = (id, form)=>{

        user.getIdToken(true).then(token => {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form)
            };console.log("FormUpd:",form); 
            //console.log(requestOptions);
            //alert("Producto creado exitosamente");

            fetch(`${BASE_URL}${PATH_SALES}/${id}`, requestOptions)
                .then(result => result.json())
                .then(result => {
                    console.log("result: ", result);
                    cargarProductos();
                    dato.current.splice(0, dato.current.length);
                    setEditar(true)
                    setBorrar(true)
                    setNewVal(newVal + 1);
                }, error => {
                    console.log(error);
                });
        })

    };

    
    const handleUpdate = useCallback((id, form) => {
        cerrarModalActualizar(); // Simple POST request with a JSON body using fetch

        user.getIdToken(true).then(token => {
            const requestOptions = {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(form)
            }; //console.log(requestOptions);
            //alert("Producto creado exitosamente");

            fetch(`${BASE_URL}${PATH_SALES}/${id}`, requestOptions)
                .then(result => result.json())
                .then(result => {
                    console.log("result: ", result);
                    cargarProductos();
                    dato.current.splice(0, dato.current.length);
                    setEditar(true)
                    setBorrar(true)
                    alert("Venta Actualizada");
                    setNewVal(newVal + 1);
                }, error => {
                    console.log(error);
                });
        })
    });


    const cargarProductos = useCallback(async () => {

        user.getIdToken(true).then(async (token) => {
            const requestOptions = {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            };
            console.log("Aut", token);
            const response = await fetch(`${BASE_URL}${PATH_SALES}`, requestOptions);
            const result = await response.json();

            setProductos(result);
            setProductosFiltrados(result);


        })
        /* fetch(`${BASE_URL}${PATH_PRODUCTS}`)
          .then(result => result.json())
          .then(
            (result) => {
              this.setState({
                productos: result
              });
              console.log("result: ",result);
              console.log("productos en cargarProductos: ",this.state.productos)
             },
            // Nota: es importante manejar errores aquí y no en 
            // un bloque catch() para que no interceptemos errores
            // de errores reales en los componentes.
            (error) => {
              console.log(error);
            }
          ) */
    });


    return <div className="table-responsive"><br />
        <div className="barrabusqueda">
            <input type="text" placeholder="Buscar Venta" className="textfield" name="busqueda" value={busqueda} onChange={onChange} />

        </div>


        <DataTable
            columns={columnasv}
            data={productosFiltrados}
            pagination paginationComponentOptions={paginacionopciones}
            fixedHeader
            selectableRows
            selectableRowsHighlight
            selectableRowsComponent={selectableRowsComponent.current}
            onSelectedRowsChange={handleChange.bind(this)}
            fixedHeaderScrollHeight="600px"
            noDataComponent="No se encontraron pedidos" />

        <button type="button" name="editar" className="btnUtil" disabled={editar} onClick={() => mostrarModalActualizar(dato.current)}>
            Editar
        </button>

        <button type="button" name="borrar" className="btnUtil" disabled={borrar} onClick={() => handleDelete(dato.current)}>
            Borrar
        </button>

        <Container>
            <Row className="Margen">
                <Col className="mt-3">

                    <Modal isOpen={modalActualizar}>
                        <ModalHeader>
                            <div><h3>Actualizar venta {form.idVenta}</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>
                                    ID venta:
                                </label>

                                <input className="form-control" readOnly type="text" value={form.idVenta} />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Nombre cliente:
                                </label>
                                <input className="form-control" name="nombreCliente" type="text" onChange={handleChange1} value={form.nombreCliente} required />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    ID cliente:
                                </label>
                                <input className="form-control" name="idVendedor" type="text" onChange={handleChange1} value={form.idCliente} />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    ID vendedor:
                                </label>
                                <input className="form-control" name="valorTotal" type="text" onChange={handleChange1} value={form.idVendedor} />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Vendedor:
                                </label>
                                <input className="form-control" name="nombreVendedor" type="text" onChange={handleChange1} value={form.nombreVendedor} />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Valor Total venta:
                                </label>
                                <input className="form-control" name="idCliente" readOnly type="text" onChange={handleChange1} value={form.valorTotal} />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Estado de la venta:
                                </label>
                                <input className="form-control" name="idCliente" type="text" onChange={handleChange1} value={form.estadoSale} readOnly/>
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Fecha de venta:
                                </label>
                                <input className="form-control" name="idCliente" readOnly type="text" onChange={handleChange1} value={form.fechaSale} />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Fecha de envio:
                                </label>
                                <input className="form-control" name="idCliente" type="text" onChange={handleChange1} value={form.fechaEnvio} />
                            </FormGroup>
                            <FormGroup>
                                <label>
                                    Fecha de entrega:
                                </label>
                                <input className="form-control" name="idCliente" type="text" onChange={handleChange1} value={form.fechaEntrega} />
                            </FormGroup>
                            <Col className="mt-5">
                                <DataTable
                                    columns={columnas_1}
                                    data={productosVenta}
                                    pagination paginationComponentOptions={paginacionopciones}
                                    fixedHeader
                                    selectableRows
                                    selectableRowsHighlight
                                    selectableRowsComponent={selectableRowsComponent.current}
                                    onSelectedRowsChange={handleChange2.bind(this)}
                                    fixedHeaderScrollHeight="600px"
                                    noDataComponent="No se encontraron pedidos" />

                                <button type="button" name="editar" className="btnUtil" disabled={editar} onClick={() => mostrarModalAgregarProductos(dato1.current)}>
                                    Agregar
                                </button>

                                <button type="button" name="borrar" className="btnUtil" disabled={borrar} onClick={() => handleDelete1(dato1.current)}>
                                    Borrar
                                </button>


                            </Col>
                        </ModalBody>

                        <ModalFooter>
                            <Button className="btnUtil1" onClick={() => handleUpdate(id.current, form)}>
                                Actualizar
                            </Button>
                            <Button className="btnUtil1" onClick={() => cerrarModalActualizar()}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </Modal>

                </Col>
            </Row>
        </Container>

        <Container>
            <Row className="Margen">
                <Col className="mt-3">

                    <Modal isOpen={modalAgregarProductos}>
                        <ModalHeader>
                            <div><h3>Agregar productos a venta {form.idVenta}</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            <FormGroup>
                                <label>
                                    ID venta:
                                </label>

                                <input className="form-control" readOnly type="text" value={form.idVenta} />
                            </FormGroup>

                            <FormGroup>
                                <label>
                                    Nombre cliente:
                                </label>
                                <input className="form-control" name="nombreCliente" type="text" onChange={handleChange1} value={form.nombreCliente} readOnly />
                            </FormGroup>

                            <Col className="mt-5">
                            <DataTable
                                    columns={columnas_2}
                                    data={productosAgregar}
                                    pagination paginationComponentOptions={paginacionopciones}
                                    fixedHeader
                                    selectableRows
                                    selectableRowsSingle
                                    selectableRowsHighlight
                                    selectableRowsComponent={selectableRowsComponent.current}
                                    onSelectedRowsChange={handleChange3.bind(this)}
                                    fixedHeaderScrollHeight="600px"
                                    noDataComponent="No se encontraron pedidos" />
                            </Col>
                        </ModalBody>

                        <ModalFooter>
                            <Button className="btnUtil1" onClick={(e) => agegarProductoVenta()}>
                                Agregar
                            </Button>
                            <Button className="btnUtil1" onClick={() => cerrarModalAgregarProductos()}>
                                Cerrar
                            </Button>
                        </ModalFooter>
                    </Modal>

                    <Modal isOpen={modalCantidadSolicitada}>
                        <ModalHeader>
                            <div><h3> Cantidad a solicitar:</h3></div>
                        </ModalHeader>

                        <ModalBody>
                            

                        <FormGroup>
                                <label>
                                    Cantidad solicitada:
                                </label>
                                <input className="form-control" name="cantidadDisponible" type="text" onChange={handleChange4} />
                            </FormGroup>
                        </ModalBody>

                        <ModalFooter>
                            <Button className="btnUtil1" onClick={(e) => confirmarCantidad(id1.current, form)}>
                                Agregar
                            </Button>
                            <Button className="btnUtil1" onClick={() => cerrarModalCantidadSolicitada()}>
                                Cancelar
                            </Button>
                        </ModalFooter>
                    </Modal>

                </Col>
            </Row>
        </Container>

    </div>;
};

export default ListSales2;
