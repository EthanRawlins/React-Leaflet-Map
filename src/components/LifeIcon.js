import L from 'leaflet';

export const LifeIcon = L.icon({
  iconUrl: require('../assets/LifeIcon.png'),
  iconRetinaUrl: require('../assets/LifeIcon.png'),
//   iconUrl: require('../assets/venue_location_icon.svg'),
//   iconRetinaUrl: require('../assets/venue_location_icon.svg'),
  iconAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
  iconSize: [35, 35],
  className: 'leaflet-life-icon'
});
