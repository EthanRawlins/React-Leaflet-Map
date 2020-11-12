import L from 'leaflet';

/*
const displayDB = (props) => {
    const { clients } = props;
    // const row = 23;
    // rows.forEach(function(rows) {
    //   row = row;
    // });
    const markers = clients.map((client, index) => (
      <Marker key={index} position={client.geometry} icon={PinIcon} >
        <MarkerPopup data={client}/>
      </Marker>
    ));
  
    return <Fragment>{markers}</Fragment>
  };
  */
  export default displayDB;

const displayDB = (props) => {
    const { map } = useLeaflet() // access to leaflet map
    const { provider } = props
  
    var DBicon = L.icon({
      iconUrl: "../assets/PinIcon.svg",
      iconSize: [25,25]
    });
  
    $.getJSON("../connectDb.php", function(data) {
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
    return null
  }