import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {HomeIcon} from './HomeIcon';
import MarkerPopup from './MarkerPopup';

const HomeMarkers = (props) => {
  const { homes } = props;
  const markers = homes.map((home, index) => (
    <Marker key={index} position={home.geometry} icon={HomeIcon} >
      <MarkerPopup data={home}/>
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>
};

export default HomeMarkers;