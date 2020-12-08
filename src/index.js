import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';

/*const fs = require('fs');
const mysql = require('mysql');
const { host, user, password, database } = config.database;
const Net = require('')

const connection = mysql.createConnection({
    host,
    user,
    password,
    database
});

connection.connect(function(e){
    if (e) throw e;
        connection.query("SELECT * FROM test", function(err, result, fields){
            if (e) throw e;
                const json_data = JSON.parse(result);
                fs.writeFileSync('active.json', json_data);
            });
        });
*/



ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
