import L from 'leaflet';

export const HomeIcon = L.icon({
  iconUrl: require('../assets/HomeIcon.png'),
  iconRetinaUrl: require('../assets/HomeIcon.png'),
//   iconUrl: require('../assets/venue_location_icon.svg'),
//   iconRetinaUrl: require('../assets/venue_location_icon.svg'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-home-icon'
});
