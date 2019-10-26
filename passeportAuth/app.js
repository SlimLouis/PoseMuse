// index.js
//All consts

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
var cors = require('cors');


const session = require('express-session')

var MySQLStore = require('express-mysql-session')(session);


///bcrypt

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

//routes definition

var users = require('./routes/Users')
var contest = require('./routes/Contest')


// import passport and passport-jwt modules
const passport = require('passport');
const passportJWT = require('passport-jwt');
const jwt = require('jsonwebtoken');

// ExtractJwt to help extract the token
let ExtractJwt = passportJWT.ExtractJwt;
// JwtStrategy which is the strategy for the authentication
let JwtStrategy = passportJWT.Strategy;
let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'PoseMuse';

// parse application/json
app.use(bodyParser.json());
//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));



// parse application/json
app.use(bodyParser.json());

app.use(passport.initialize());
  app.use(passport.session());

//parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());



app.use("/users",users);
app.use("/contest",contest);


// start the app
app.listen(3000, function(req,res) {
   // Website you wish to allow to connect

   
  console.log("Express is running on port");
});










  




 

  

  
 
  
  