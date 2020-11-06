import React, { useEffect } from 'react';
import L from 'react';
import { Map, TileLayer, useLeaflet } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import data from '../assets/data';
import HomeMarkers from './HomeMarkers';
import CarMarkers from './CarMarkers';
import LifeMarkers from './LifeMarkers';
import PinMarkers from './PinMarkers';
import Geocode from "react-geocode";
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

Geocode.enableDebug();

const $ = require('jquery');

const Search = (props) => {
  const { map } = useLeaflet() // access to leaflet map
  const { provider } = props

  useEffect(() => {
      const searchControl = new GeoSearchControl({
          provider,
      })

      map.addControl(searchControl) // this is how you add a control in vanilla leaflet
      return () => map.removeControl(searchControl)
  }, [props])

  return null // don't want anything to show up from this comp
}

const DisplayDB = (props) => {
  const { map } = useLeaflet() // access to leaflet map
  const { provider } = props

  const DBicon = L.icon({
    iconUrl: "../assets/PinIcon.svg",
    iconSize: [25,25]
  });

  $.getJSON("connectDb.php", function(data) {
    for (let i = 0; i < data.length; i++) {
      const id = data[i].ID;
      const location = new L.LatLng(data[i].Latitude, data[i].Longitude);
      const firstname = data[i].FirstName;
      const lastname = data[i].LastName;
      const phone = data[i].PhoneNumber;
      const addr = data[i].StreetAddress;
      const unit = data[i].UnitNumber;
      const city = data[i].City;
      const state = data[i].StateProvince;
      const zip = data[i].ZipCode;
      
      const marker = new L.Marker(location, {
        icon: DBicon,
        title: firstname + " " + lastname
      });

      const content = "<h2>" + firstname + lastname + "</h2>" + "<p>" + addr + unit + "</br>" + city + state + zip + "</p>";

      marker.bindPopup(content, {
        maxWidth: '200'
      });
      marker.addTo(map);
    }
  });
}

export default function MapView() {
  const currentLocation = { lat: 52.52437, lng: 13.41053 };
  const zoom = 12;
    return (
      <Map center={currentLocation} zoom={zoom}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
          >
          </TileLayer>
          <Search provider={new OpenStreetMapProvider()}/>
        <HomeMarkers homes={data.homes}/>
        <CarMarkers cars={data.cars}/>
        <LifeMarkers lifes={data.lifes}/>
        <PinMarkers pins={data.pins}/>
      </Map>
    );
};
