import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {LifeIcon} from './LifeIcon';
import MarkerPopup from './MarkerPopup';

const LifeMarkers = (props) => {
  const { lifes } = props;

  const markers = lifes.map((life, index) => (
    <Marker key={index} position={life.geometry} icon={LifeIcon} >
      <MarkerPopup data={life}/>
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>
};

export default LifeMarkers;