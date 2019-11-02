

//DATABASE opTIONS
var options = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: '',
    database: 'posemuse'
  };



  const Sequelize = require('sequelize');
// initialize an instance of Sequelize
const sequelize = new Sequelize({
  database: 'posemuse',
  username: 'root' ,
  password: '',
  dialect: 'mysql',
});





  // check the databse connection
  sequelize
  .authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch(err => console.error('Unable to connect to the database:', err));


  //all models

  
  //create user model




  const User = sequelize.define('musers',{


    email:{
        type: Sequelize.STRING , unique:true
    },
    password:{
        type: Sequelize.STRING
    },
    username:{
      type: Sequelize.STRING
    },
    first_name:{
      type : Sequelize.STRING
    } ,
    last_name:{
      type: Sequelize.STRING
    },
    profile_pic:
    {
      type: Sequelize.STRING
    },
   
    

  });
  ////

    //create Gig model
    const Gig = sequelize.define('gig',{
      id_p:{
        type : Sequelize.STRING
      },

      name:{
        type: Sequelize.STRING
      },
      type_use:{
        type: Sequelize.STRING
      },

      gender:{
        type: Sequelize.STRING
      },
       style:{
        type: Sequelize.STRING
      },
      price:{
        type: Sequelize.INTEGER
      },
       endedAt:{
        type: Sequelize.DATE
      },
       description:{
        type: Sequelize.STRING
      },
       audio:{
        type: Sequelize.STRING
      }
      , 
      muserId :
      {
        type: Sequelize.INTEGER,
        references:{
          model : User,
          key:'id'
        }
      }



    });


    //create Contest model
    const Contest = sequelize.define('contest',{
      
      id_p:{
        type : Sequelize.STRING
      },
      name:{
        type: Sequelize.STRING
      },
      type_use:{
        type: Sequelize.STRING
      },

      gender:{
        type: Sequelize.STRING
      },
       style:{
        type: Sequelize.STRING
      },
      price:{
        type: Sequelize.INTEGER
      },
       endedAt:{
        type: Sequelize.DATE
      },
       description:{
        type: Sequelize.STRING(512)

      },
       audio:{
        type: Sequelize.STRING
      },
      muserId :
      {
        type: Sequelize.INTEGER,
        references:{
          model : User,
          key:'id'
        }

      }





    });


       //create Contest model
    const join_gig = sequelize.define('join_gig',{

       
         demo:{
          type: Sequelize.STRING
        },
        id_host :
        {
          type : Sequelize.INTEGER,
          references:
          {
            model: User,
            key:'id'

          }
        },
      
      
  
  
  
  
      });

       //create Contest model
       const join_contest = sequelize.define('join_contest',{

       
        demo:{
         type: Sequelize.STRING
       },
       id_host :
       {
         type : Sequelize.INTEGER,
         references:
         {
           model: User,
           key:'id'

         }
       },
     
     
 
 
 
 
     });

     //profile

     const profile = sequelize.define('profile',{

       
      description:{
       type: Sequelize.STRING
     },
     gender:{
      type: Sequelize.STRING
    },
    type:{
      type: Sequelize.STRING
    },
    country:{
      type: Sequelize.STRING
    },
    id_user:
    {      type: Sequelize.INTEGER


    }
   
    });
    //audition
    const audition = sequelize.define('audition',{

       
      demo_file:{
       type: Sequelize.STRING
      }
    ,
     id_user :
     {
       type : Sequelize.INTEGER,
       references:
       {
         model: User,
         key:'id'

       }
      }
    }); 

   
    User.hasMany(Gig,{foreignkey: "muserId"});
    User.hasMany(Contest,{foreignkey: "muserId"});
    //User.hasMany(audition,{foreignkey:"id_user"})

    Gig.hasOne(join_gig);
    Contest.hasOne(join_contest);

    Gig.hasMany(join_gig,{foreignkey:"muserId"});
    Contest.hasMany(join_contest,{foreignkey:"muserId"}); 
   
    
    profile.belongsTo(User, {foreignKey: 'id_user', targetKey: 'id'}); // Adds id_user to profile
    User.hasOne(profile,{foreignKey :'id_user'})


  
    

  
  
  // User.sync({force:true})
  // .then()
  // .catch(err=>console.log(err))

  // audition.sync()
  //   .then()
  //   .catch(er=>{console.log(er)});
 
  
  // profile.sync({force:true})
  // .then()
  // .catch(err=>console.log(err))
   
  

  // Contest.sync()
  // .then()
  // .catch(err=>console.log(err));

  // Gig.sync({})
  // .then()
  // .catch(err=>console.log(err))

  

  // join_gig.sync()
  // .then()
  // .catch(err=>console.log(err))
  
  // join_contest.sync({})
  // .then()
  // .catch(err=>console.log(err))






module.exports = {User,Gig,Contest,join_gig,join_contest,profile,audition};