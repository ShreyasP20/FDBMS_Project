const express = require('express');
const db = require('./Routese/db-config');
const app = express();
const cookie = require('cookie-parser');
const PORT = 3306;
app.use("/js",express.static(__dirname + './public/js')); 
app.use("/css",express.static(__dirname + "./public/css"));
app.use("view engine", "ejs");
app.set("views", "./views");
app.use(cookie());
app.use(express.json());
app.listen













