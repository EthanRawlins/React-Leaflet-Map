import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {CarIcon} from './CarIcon';
import MarkerPopup from './MarkerPopup';

const CarMarkers = (props) => {
  const { cars } = props;

  const markers = cars.map((car, index) => (
    <Marker key={index} position={car.geometry} icon={CarIcon} >
      <MarkerPopup data={car}/>
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>
};

export default CarMarkers;