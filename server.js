const express = require('express')
const path = require('path')
const app = express()

const mysql      = require('mysql');
const fs = require('fs')

const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;


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

    for (i = 0; i < results.length; i++) {
        const add = addr_search(results[i].StreetAddress + ', ' + results[i].StateProvince);
        results.geometry = add;
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

function addr_search(add)
{
    console.log(add);
 var xmlhttp = new XMLHttpRequest();
 var url = "https://nominatim.openstreetmap.org/search?format=json&limit=3&q=" + add;
 var myArr;

 xmlhttp.onreadystatechange = function()
 {
   if (this.readyState == 4 && this.status == 200)
   {
     const temp = JSON.parse(this.responseText);
     myArr = '[' + temp.lat + ',' + temp.lon + ']';
   }
 };
 xmlhttp.open("GET", url, true);
 xmlhttp.send();
 return myArr;
}


app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


connection.end();

app.listen(8080)