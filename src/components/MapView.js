import React, { useEffect } from 'react';
import { Map, TileLayer, useLeaflet } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../assets/data';
import clients from '../assets/contact1';
import HomeMarkers from './HomeMarkers';
import CarMarkers from './CarMarkers';
import LifeMarkers from './LifeMarkers';
import PinMarkers from './PinMarkers';
import Geocode from "react-geocode";
import Clientmarkers from "./ClientMarkers";
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

Geocode.enableDebug();

const Search = (props) => {
  const { map } = useLeaflet() // access to leaflet map
  const { provider } = props

  useEffect(() => {
      const searchControl = new GeoSearchControl({
          provider,
      })

      map.addControl(searchControl) // this is how you add a control in vanilla leaflet
      return () => map.removeControl(searchControl)
  }, [props, map, provider])

  return null // don't want anything to show up from this comp
}

export default function MapView() {
  const currentLocation = { lat: 39.742043, lng: -104.991531 };
  const zoom = 8;
  const maxzoom = 19;
  const minzoom = 2;
    return (
      <Map center={currentLocation} zoom={zoom} maxZoom={maxzoom} minZoom={minzoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          >
          </TileLayer>
          <Search provider={new OpenStreetMapProvider()}/>
        <Clientmarkers clients={clients.clients}/>
      </Map>
    );
};
