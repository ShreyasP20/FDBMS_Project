const express = require('express');
const path = require('path');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine','ejs');


app.get('/',(req,res) => {
    const buttonName = 'Yeelow';
    res.render('index', {buttonName: buttonName, title:"This is a Title"});
});



app.listen(3005, () => {
    console.log("Server Running ON PORT 3005");
});