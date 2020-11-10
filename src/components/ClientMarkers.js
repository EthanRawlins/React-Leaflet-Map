import React, { Fragment } from 'react'
import {Marker} from 'react-leaflet';
import {PinIcon} from './PinIcon';
import MarkerPopup from './MarkerPopup';

const ClientMarkers = (props) => {
  const { clients } = props;

  const markers = clients.map((client, index) => (
    <Marker key={index} position={client.geometry} icon={PinIcon} >
      <MarkerPopup data={client}/>
    </Marker>
  ));

  return <Fragment>{markers}</Fragment>
};

export default ClientMarkers;