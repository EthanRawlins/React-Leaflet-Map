import L from 'leaflet';

export const PinIcon = L.icon({
  iconUrl: require('../assets/PinIcon.svg'),
  iconRetinaUrl: require('../assets/PinIcon.svg'),
//   iconUrl: require('../assets/venue_location_icon.svg'),
//   iconRetinaUrl: require('../assets/venue_location_icon.svg'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-pin-icon'
});
