const express = require('express')
const path = require('path')
const app = express()

const mysql      = require('mysql');
const fs = require('fs')

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

    fs.writeFile('./src/assets/contact.json', mapData, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });
});

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})


connection.end();

app.listen(8080)