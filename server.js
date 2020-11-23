const express = require('express')
const path = require('path')
const app = express()

const mysql      = require('mysql');
const fs = require('fs')

const request = require('request'); 

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

function addr_search()
{

    fs.readFile('./src/assets/contact.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const data = JSON.parse(jsonString)
            var xmlhttp = new XMLHttpRequest();
 
            for( let prop in data ){
               var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + prop.StreetAddress + ', ' + prop.City + ', ' + prop.StateProvince;
               
               console.log(data[prop]);
               xmlhttp.onreadystatechange = function()
               {
                 if (this.readyState == 4 && this.status == 200)
                 {
                   const temp = JSON.parse(this.responseText);
                   data[prop].geometry = '[' + temp.lat + ',' + temp.lon + ']';
                   console.log(prop);
                }
               };
               xmlhttp.open("GET", url, true);
               xmlhttp.send(); 
           }
           
           const data1 = JSON.stringify(data);
           fs.writeFileSync('./src/assets/contact.json', '{"ActiveContacts":' + data1 + '}', err => {
               if (err) {
                   console.log('Error writing file', err)
               } else {
                   console.log('Successfully wrote file')
               }
           });
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
