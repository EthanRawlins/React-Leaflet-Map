const express = require('express')
const path = require('path')
const app = express()

const mysql      = require('mysql');
const fs = require('fs')

const request = require('request'); 
const Nominatim = require('nominatim-geocoder'); // for geocoding

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
function connect() {
const connection = mysql.createConnection({
    user: "feelthes_jared",
    password: "ullrich",
    host: "cpanel-host2061.hostmonster.com",
    database: "feelthes_map_addresses"
});

connection.connect(function(err) {
    if (err) {
        console.error('Error connecting: ' + err.stack);
        return;
    }

    console.log('Connected as id ' + connection.threadId);
});

connection.query('SELECT ID, FirstName, LastName, PhoneNumber, StreetAddress, UnitNumber, City, StateProvince, ZipCode, Latitude, Longitude FROM contacts', function (error, results, fields) {
    if (error) {
        throw error;
    }

    const mapData = JSON.stringify(results);

    fs.writeFileSync('./src/assets/contact.json', '{"ActiveContacts":' + mapData + '}', err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });
    // mapData = JSON.parse(results);
});

}

function abbrState(input, to){
    
    var states = [
        ['Arizona', 'AZ'],
        ['Alabama', 'AL'],
        ['Alaska', 'AK'],
        ['Arkansas', 'AR'],
        ['California', 'CA'],
        ['Colorado', 'CO'],
        ['Connecticut', 'CT'],
        ['Delaware', 'DE'],
        ['Florida', 'FL'],
        ['Georgia', 'GA'],
        ['Hawaii', 'HI'],
        ['Idaho', 'ID'],
        ['Illinois', 'IL'],
        ['Indiana', 'IN'],
        ['Iowa', 'IA'],
        ['Kansas', 'KS'],
        ['Kentucky', 'KY'],
        ['Louisiana', 'LA'],
        ['Maine', 'ME'],
        ['Maryland', 'MD'],
        ['Massachusetts', 'MA'],
        ['Michigan', 'MI'],
        ['Minnesota', 'MN'],
        ['Mississippi', 'MS'],
        ['Missouri', 'MO'],
        ['Montana', 'MT'],
        ['Nebraska', 'NE'],
        ['Nevada', 'NV'],
        ['New Hampshire', 'NH'],
        ['New Jersey', 'NJ'],
        ['New Mexico', 'NM'],
        ['New York', 'NY'],
        ['North Carolina', 'NC'],
        ['North Dakota', 'ND'],
        ['Ohio', 'OH'],
        ['Oklahoma', 'OK'],
        ['Oregon', 'OR'],
        ['Pennsylvania', 'PA'],
        ['Rhode Island', 'RI'],
        ['South Carolina', 'SC'],
        ['South Dakota', 'SD'],
        ['Tennessee', 'TN'],
        ['Texas', 'TX'],
        ['Utah', 'UT'],
        ['Vermont', 'VT'],
        ['Virginia', 'VA'],
        ['Washington', 'WA'],
        ['West Virginia', 'WV'],
        ['Wisconsin', 'WI'],
        ['Wyoming', 'WY'],
    ];

    if (to == 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(i = 0; i < states.length; i++){
            if(states[i][0] == input){
                return(states[i][1]);
            }
        }    
    } else if (to == 'name'){
        input = input.toUpperCase();
        for(i = 0; i < states.length; i++){
            if(states[i][1] == input){
                return(states[i][0]);
            }
        }    
    }
}

function addr_search()
{

    fs.readFile('./src/assets/contact.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const data = JSON.parse(jsonString)
            var query = '';
 
            for( let prop in data['ActiveContacts'] ){
                if (data['ActiveContacts'][prop].StreetAddress != "" && data['ActiveContacts'][prop].StreetAddress != " ") {
               //var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + prop.StreetAddress + ', ' + prop.City + ', ' + prop.StateProvince;
               
                const geocoder = new Nominatim();
                if (data['ActiveContacts'][prop].StateProvince.length <= 3) {
                    const stateName = abbrState(data['ActiveContacts'][prop].StateProvince, 'name');
                    query = '\'' + data['ActiveContacts'][prop].StreetAddress + ', ' + data['ActiveContacts'][prop].City + ', ' + stateName + '\'';
                }
                else {
                    query = '\'' + data['ActiveContacts'][prop].StreetAddress + ', ' + data['ActiveContacts'][prop].City + ', ' + data['ActiveContacts'][prop].StateProvince + '\'';
                }


              //xmlhttp.onreadystatechange = function()
               //{
                 //if (this.readyState == 4 && this.status == 200)
                 //{
                   //const temp = JSON.parse(this.responseText);
                   geocoder.search({ q: query })
                   .then((response) => { 
                       data['ActiveContacts'][prop].geometry = '[' + response.lat + ',' + response.lon + ']';
                    console.log(response);
                   })
                   .catch((error) => {
                       console.log(error)
                   })
                }
                const data1 = JSON.stringify(data);
                fs.writeFileSync('./src/assets/contact.json', '{"ActiveContacts":' + data1 + '}', err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully wrote file')
                    }
                });
                
               //xmlhttp.open("GET", url, true);
               //xmlhttp.send(); 
            }
    } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    });

}


app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})

app.listen(8080, function() {
    connect();
    addr_search();
  });


//connection.end();
