var express = require('express');
const { response } = require('../app');
var router = express.Router();
var database = require('../database');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express', session : req.session });
});

router.post('/login', function(request, response, next) {
    var user_email_address =request.body.user_email_address; 
    var user_password = request.body.user_password;
    if(user_email_address && user_password)
    {
      query = `Select * from login where Username = "${user_email_address}"`;
      console.log(query);
      database.query(query, function(err, data){
        if(data.length > 0)
        {
          for (var count = 0; count < data.length ; count++)
          {

            if(data[count].Password == user_password)
            {
              request.session.user_id = data[count].Username;


              response.redirect("/");
            }
            else
            {
              response.send('Incorrect Password');
            }
          }
        }
        else{
          response.send('<p>Incorrect Email Address</p>');        
          response.end();
        }
      });
    }
    else
    {
      response.send('Please Enter Email Address and Password Details');
      response.end();
    }
});

router.get('/logout', function(req, res,next){
  req.session.destroy();
  res.redirect("/");
});

module.exports = router;
