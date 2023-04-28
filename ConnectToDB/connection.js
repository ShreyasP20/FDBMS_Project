const mysql = require('mysql');

console.log('Get Connection...');

var conn =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:"fdbms"
});


conn.query("Select * from Chef", (err, result) => {
    return console.log(result)
});
