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