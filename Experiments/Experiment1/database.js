const mysql = require('mysql');

console.log('Get Connection...');

var conn =  mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database:"user1"
});

conn.connect(function(err){
    if(err) throw err;
    else console.log('Connection established');
});

module.exports =conn;