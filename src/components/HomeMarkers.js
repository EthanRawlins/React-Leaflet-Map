import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {HomeIcon} from './HomeIcon';
import MarkerPopup from './MarkerPopup';
import db from '../connectDb.php';
import L from 'leaflet';
// import nominatim from 'leaflet-control-geocoder-1.13.0';

//L.Control.nominatim.geoCoder();

const HomeMarkers = (props) => {
  const { homes } = props;
  // const row = 23;
  // rows.forEach(function(rows) {
  //   row = row;
  // });
  const markers = homes.map((home, index) => (
    <Marker key={index} position={home.geometry} icon={HomeIcon} >
      <MarkerPopup data={home}/>
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>
};

export default HomeMarkers;