import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {PinIcon} from './PinIcon';
import MarkerPopup from './MarkerPopup';

const PinMarkers = (props) => {
  const { pins } = props;

  const markers = pins.map((pin, index) => (
    <Marker key={index} position={pin.geometry} icon={PinIcon} >
      <MarkerPopup data={pin}/>
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>
};

export default PinMarkers;