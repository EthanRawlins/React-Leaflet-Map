// PLEASE DONT RUN THE BACKEND UNLESS THERE IS ANY UPDATES. IT WILL ERASE THE ENTIRE CONTACT1.JSON FILE!!!!!!!!!!

const express = require('express')
const path = require('path')
const app = express()

const mysql      = require('mysql');
const fs = require('fs')

const Nominatim = require('nominatim-geocoder'); // for geocoding
const { response } = require('express');
const geocoder = new Nominatim()


// database connection, use it only when the database updates
/*
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

connection.query('SELECT ID, FirstName, LastName, PhoneNumber, StreetAddress, UnitNumber, City, StateProvince, ZipCode FROM contacts', function (error, results, fields) {

    const mapData = JSON.stringify(results);

    fs.writeFileSync('./src/assets/contact.json', mapData, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            console.log('Successfully wrote file')
        }
    });
});*/

function abbrState(input, to){
    
    const states = [
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

    if (to === 'abbr'){
        input = input.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
        for(let i = 0; i < states.length; i++){
            if(states[i][0] === input){
                return(states[i][1]);
            }
        }    
    } else if (to === 'name'){
        input = input.toUpperCase();
        for(let i = 0; i < states.length; i++){
            if(states[i][1] === input){
                return(states[i][0]);
            }
        }    
    }
}
/*
console.log('hello')

    fs.readFile('./src/assets/contact.json', 'utf8', (err, jsonString) => {
        if (err) {
            console.log("Error reading file from disk:", err)
            return
        }
        try {
            const data = JSON.parse(jsonString)

            // use this line to overwrite the file
            fs.writeFile('./src/assets/contact1.json', '{"clients":[', function(){console.log('done')})

            let query = '';

            for( const prop in data ){
                if (data[prop].StreetAddress !== "" || data[prop].StreetAddress !== " ") {

                if (data[prop].StateProvince.length <= 3) {
                    const stateName = abbrState(data[prop].StateProvince, 'name');
                    query = data[prop].StreetAddress + ', ' + data[prop].City + ', ' + stateName;
                }
                else {
                    query = data[prop].StreetAddress + ', ' + data[prop].City + ', ' + data[prop].StateProvince;
                }

                geocoder.search({ q: `${query}` })
                .then((res) => {
                const array = [parseFloat(res[0].lat), parseFloat(res[0].lon)]
                data[prop].geometry = array;
                console.log(res[0]);
                if (prop < data.length - 1){
                fs.appendFile('./src/assets/contact1.json', JSON.stringify(data[prop]) + ',', err => {
                })}
                 else {
                fs.appendFile('./src/assets/contact1.json', JSON.stringify(data[prop]) + ']}', err => {
                    if (err) {
                        console.log('Error writing file', err)
                    } else {
                        console.log('Successfully wrote file ' + prop)
                    }
                })}
                })
                .catch((error) => {
                    console.log(error)
                })
            }
            }
    } catch(err) {
            console.log('Error parsing JSON string:', err)
        }
    })*/

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
