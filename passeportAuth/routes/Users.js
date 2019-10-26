// index.js
const express = require('express');
const bodyParser = require('body-parser');
const user = express.Router();
const db = require('../database')

const session = require('express-session')

var MySQLStore = require('express-mysql-session')(session);


///bcrypt

const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';


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
user.use(bodyParser.json());
//parse application/x-www-form-urlencoded
user.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
user.use(bodyParser.json());

user.use(passport.initialize());
user.use(passport.session());


//DATABASE opTIONS
var options = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '',
  database: 'posemuse'
};

var sessionStore = new MySQLStore(options);

//parse application/x-www-form-urlencoded
user.use(bodyParser.urlencoded({ extended: true }));
  //express session
  user.use(session({
    secret: 'keyboarde cat',
    resave: false,
    store : sessionStore,
    saveUninitialized: true,
    //cookie: { secure: true }
  }))






  
  
  
  






  //helper function pre-defined function that can execute queries from and to mysql db


  const createUser = async ({username,password,email,first_name,last_name}) =>
  {

      return await db.User.create({username,password,email,first_name,last_name});
  };


  const getAllusers = async() =>
  {
      return db.User.findAll();
  };

  const getUser = async obj => {
    return await db.User.findOne({
    where: obj,
  });
  };



  const getAllContests = async({ idnumber }) =>
  {
    
      return db.User.findAll({where :{id:idnumber},include:[{ model:db.Contest}]});
  };

 // lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  // use the strategy
  
  
  passport.use(strategy);




 


  
  // login route
  user.post('/login', async function(req, res, next) { 
    res.setHeader('Access-Control-Allow-Origin', '*');
    const { email, password } = req.body;
    if (email && password) {
      // we get the user with the name and save the resolved promise
      
      let user = await getUser({ email });
     // console.log(user);
      if (!user) {
        res.status(401).json({ msg: 'No such user found', user });
      }
    else if (bcrypt.compareSync(password, user.password)) {
        // from now on we’ll identify the user by the id and the id is
  // the only personalized value that goes into our token
        let payload = { name: user.name };
        let token = jwt.sign(payload, jwtOptions.secretOrKey);
        let user_id = user.id;
        req.login(user_id,function(err)
        {
          res.json(user);
         // console.log(user.dataValues);
          // console.log(req.user);
          // console.log(req.isAuthenticated())
        })
      } else {
        res.status(401).json({ msg: "Password is incorrect" });
      } 
    }
  });
  //serialization and deserialization

  passport.serializeUser(function(user_id, done) {
    done(null, user_id);
  });
  
  passport.deserializeUser(function(user_id, done) {
      done(null, user_id);
    
  });


  // get all users
  user.get('/users', function(req, res) {

  getAllusers().then(user => res.json(user)); 
});

//create user
user.post('/create_user',function(req,res){
  const {username,password,email,first_name,last_name} = req.body ;
console.log(username);
  bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {
        // Store hash in your password DB.


        createUser({username,password:hash,email,first_name,last_name})
        .then(user => res.json({user,msg:'has been created'}))
        .catch(e=>{
            res.status(400).json(e.fields.email+ ' '+'already exists')
        })
       
  console.log(username,password);
        console.log(hash)
    });
  });
   
  

})



//check_password
user.post('/check_password',async function(req,res)
{
  
  const {email,password} = req.body; 
  let user = await getUser({ email }) ;
  res.json(bcrypt.compareSync(password, user.password))



})

//find user

user.get('/find_user', async function(req,res)
{
    
  try
  {
    var {email} = req.body ;
    //      console.log(email);

       let user = await getUser({ email } );
       if (user==null)
       {
        console.log(typeof(email))

         res.json("no such email");
       }
       else
       {
         console.log(email)
        res.json(user);

       }
    
  }
  catch(err)
  {
    console.log(err)
  }
    
  
})


//find contest of this user

user.get('/contests', async function(req,res)
{
    const {idnumber} = req.body ;
    let user = await getAllContests({ idnumber } );


    res.json(user[0].contests.length);
})


user.get('/user/:username',async function(req,res)
{
  const {username} = req.params ;
  let user =  await getUser({ username } );
    if (user==null)
    {
      res.status(406).json("not found")
    }
  console.log(user)
  res.json(user);


})

  //protection
  // protected route
  user.get('/protected', passport.authenticate('jwt', { session: true }), function(req, res) {
    const {token} = req.body
    console.log(token)
    res.json({ msg: 'Congrats! You are seeing this because you are authorized'});
    });


 


   // app.post('/create_post',passport.authenticate('jwt',{session: false}))
        // add a basic route
        user.get('/', function(req, res) {
 
  console.log(req.user);
  console.log(req.isAuthenticated());

   res.json('the user id of this session depending on the cookie is ' +req.user);
  
});


module.exports = user ;

