const mysql = require('mysql');
const express = require('express');
const app = express();
const port = 4500;
app.use(express.urlencoded({extended: true}));
app.use(express.json())

const conn= mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:'password',
    database:'User1'
});

conn.connect(function(err){
    if (err) throw err;
    else console.log('connection established');
});

app.get('/', function(req, res){
    res.sendFile(__dirname + '/index.html');
});

app.post('/',encoder,function(req, res){
    var username = req.body.Username;
    var password = req.body.Password;

    conn.query("SELECT * FROM Login where Username=? and Password = ?",[username,password], function(err,results,fields){
        if(results.length>0){
            res.redirect('/welcome');           
        }
        else{
            res.redirect('/');
        }
        res.end();
    })
});


app.get('/welcome', function(req, res){
    res.sendFile(__dirname + '/welcome.html');
});

app.listen(port);