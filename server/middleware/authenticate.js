var {User} = require('./../model/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

var authenticate = (req,res,next)=>{

    
    var token= req.header('x-auth');
    console.log(token);

    
    User.findByToken(token).then((user)=>{

        if(!user){
            return Promise.reject();
        }
        req.user = user;
        req.token = token;
        next();
    }).catch((e)=>{
        res.status(401).send();
    });

};

// var loginAuthenticate = (req,res,next)=>{


//     User.findOne({ email: req.body.email}).then((user)=>{

//         if(!user){
//             return new Promise.reject();
//         }
//         // console.log(user[0].password);

//         bcrypt.compare(req.body.password, user.password,(err,res1)=>{
//             // console.log(res);
//             if(res1 === true){
//                 req.user = user;
//                 req.tokens = user.tokens;
//                 // console.log('_______________________',user.tokens[0].token);
//                 next();
//             }
//             else{
//                 res.status(401).send();
//             }
//         });
       
//     }).catch((e)=>{
//         res.status(401).send();
//     });

// };

module.exports= {authenticate};