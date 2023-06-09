const { query } = require('express');
var express = require('express');
var router = express.Router();
const { response } = require('../app');
var database = require('../database');
var userid;
var R_ID;
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Express', session:req.session });
});


router.post('/login', function(req, res, next) {
  var user_username = req.body.user_username;
  var user_password = req.body.user_password;
  if(user_username && user_password)
  {
    query1 = `Select * from login2 where name='${user_username}'`;
    console.log(query1);
    database.query(query1, function(err,data){
      if(data.length > 0)
      {
        console.log(data[0].password);
        if(data[0].password == user_password)
        {
          userid=data[0].id;
          //console.log(userid);
          res.render('home'); 
          // querys = `Select * from login;`;
          //   database.query(querys, function(err,result){
          //     if (err) throw err;

          //     res.render('hello', {data:result})
          //   });

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

  router.get('/Schedule', function(req, res, next) {
    querys = `Select * from login1;`;
              database.query(querys, function(err,result){
                if (err) throw err;
                res.render('Schedule', {data:result})
              });
  });


  router.get('/home', function(req,res,next){
    res.render('home');
  });


  router.get('/Account', function(req, res, next) {
    query1= `Select * from User where User.id = ${userid}`;
    console.log(query1);
    database.query(query1, function(err,result){
      if(err) throw err;
      console.log(result);
      res.render('Account',{data:result});
    }) 
  });

router.post('/Update_user', function(req, res, next){
  var first_name=req.body.FirstName;
  var last_name=req.body.LastName;
  var email=req.body.email;
  var num=req.body.PhoneNumber;
  var age=req.body.Age;
  var State=req.body.State;
  var nationality=req.body.Nationality;
  var RegC=req.body.RegionalCode;
  var Allergy=req.body.Allergy;
  query1 = `Update User set First_Name ="${first_name}", Last_name = "${last_name}", email = "${email}", num = "${num}", age = ${age}, state = "${State}", nationality = "${nationality}", RegC = "${RegC}", allergy = "${Allergy}" where User.id = ${userid};`
  console.log(query1);
  database.query(query1, function(err, result){
    console.log(result);
  });
  query1= `Select * from User where User.id = ${userid}`;
  console.log(query1);
  database.query(query1, function(err,result){
    if(err) throw err;
    console.log(result);
    res.render('Account',{data:result});
  }) 
});

router.get('/delete_user', function(req, res,next){
  req.session.destroy();
  res.redirect('/');
});

router.get('/Search', function(req, res, next){
  // querys = `Select * from login1;`;
  //           database.query(querys, function(err,result){
  //             if (err) throw err;
  //             res.render('Search', {data:result})
  //           });
  res.render('Search',{data:[{}]});
});

router.post('/Search_On', function(req,res,next){
  var Searches = req.body.Search_name;
  console.log(Searches);
  query1= `Select * from user where user.First_name = "${Searches}"`;
  console.log(query1);
  database.query(query1, function(err,result){
    if(err) throw err;
    console.log(result);
    res.render('Search',{data:result});
  }) 
})

router.get('/RecipeWebsite', function(req, res, next){
  R_ID = req.query.divId;
  query1 = `Select  * from Recipe_ID where Recipe_ID = ${id};`;
  database.query(query1, function(err,result){
    if(err) throw err;
    res.render('/RecipeWebsite',{data:result});
  });
});

router.post('/Schedule_Recipe', function(req,res,next){
  var MealType = req.body.MealType;
  var Weekday = req.body.Weekday;
  var Portion = req.body.Portion;
  var Additonal_Comments = req.body.Allergy;
  var date= req.body.Date;
  query1 = `Insert into Recipe-User-Schedule-History values(${userid}, ${R_ID},${date},"${MealType},${Portion}, "${Additonal_Comments}" );`;
  database.query(query1, function(err,result){
    if(err) throw err;
    res.send("Recipe Scheduled!");
  });
});


module.exports = router;
