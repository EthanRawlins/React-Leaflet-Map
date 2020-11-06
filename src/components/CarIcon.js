import L from 'leaflet';

export const CarIcon = L.icon({
  iconUrl: require('../assets/CarIcon.png'),
  iconRetinaUrl: require('../assets/CarIcon.png'),
//   iconUrl: require('../assets/venue_location_icon.svg'),
//   iconRetinaUrl: require('../assets/venue_location_icon.svg'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-car-icon'
});
