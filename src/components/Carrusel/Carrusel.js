import React, { Component } from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import Card from '../../components/Card/Card'
import GridItem from 'components/Grid/GridItem';

// imagenes carrusel
import muneca from '../../../src/assets/img/imagencarrusel.jpeg'
import logo from '../../../src/assets/img/logoinfinity.png'

class Carrusel extends Component {
    render() {
        return (

            <Card className="h-75">
                <GridItem>
                    <Carousel>
                        <div>
                            <img alt="Imagen1" src={muneca} />
                            <p className="legend">Legend 1</p>
                        </div>
                        <div>
                            <img alt="Imagen2" src={logo} />
                            <p className="legend">Legend 2</p>
                        </div>
                        <div>
                            <img alt="Imagen3" src={muneca} />
                            <p className="legend">Legend 3</p>
                        </div>
                        <div>
                            <img alt="Imagen3" src={logo} />
                            <p className="legend">Legend 4</p>
                        </div>
                    </Carousel>
                </GridItem>
            </Card>
        );
    }

}

export default Carrusel;