const { query } = require('express');
var express = require('express');
var router = express.Router();
const { response } = require('../app');
var database = require('../database');
/* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Express', session:req.session });
// });

router.get('/', function(req, res, next) {
  querys = `Select * from login1;`;
            database.query(querys, function(err,result){
              if (err) throw err;
              res.render('hello', {data:result})
            });
});

router.get('/Display', function(req, res, next) {
  const id = req.query.divId;
  console.log(id);
  console.log("HI");
  res.render('index');
});


router.post('/login', function(req, res, next) {
  var user_username = req.body.user_username;
  var user_password = req.body.user_password;
  if(user_username && user_password)
  {
    query1 = `Select * from login where Username='${user_username}'`;
    console.log(query1);
    database.query(query1, function(err,data){
      if(data.length > 0)
      {
        if(data[0].Password == user_password)
        {
          querys = `Select * from login;`;
            database.query(querys, function(err,result){
              if (err) throw err;

              res.render('hello', {data:result})
            });
        }
        else
        {
          res.send("Incorrect Password");
        }
      }
      else{
        res.send("Incorrect UserName");
        res.end();
      }
    });
  }
  else{
    res.send("Please Enter Username and Password");
    res.end();
  }
});
  
router.post('/register', function(request,response,next){
  var username = request.body.new_username;
  var password = request.body.new_password;
  var cpassword = request.body.cnew_password;
  if(username && password)
  {
    if(password != cpassword)
    {
      response.send("Password Doesn't Match");
      response.end();
    }
    query1 = `Select * from login where username="${username}";` ;
    console.log(query1);
    database.query(query1,function(err,data){
      if(data.length > 0)
      {
        response.send("User Already Registered");
      }
      else{  
        querys = `Insert into login values("${username}" ,"${password}");`
        console.log(querys);
        database.query(querys, function(err,data){
          if(!err)
          {
            response.render('hello');
            response.end();
          }
          else
          {
            response.send(err);
          }
        });
      }
    });
  }
    else{
      response.send("Enter Details");
    }
  });





module.exports = router;
