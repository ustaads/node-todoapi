const {SHA256} = require('crypto-js');
const jwt = require('jsonwebtoken'); 
const bcrypt= require('bcryptjs');  


var password = 'abc123456';

// bcrypt.genSalt(10 ,(err,salt)=>{
//     bcrypt.hash(password,salt,(err, hash)=>{
//         // console.log(hash);
//     });
// });

var hashedPassword = '$2a$10$B7BI5mdb143Y/cZigXQ1lu9sYkpADC62XoaDzpAcu/TNCkgXNgbQ.';

bcrypt.compare(password, hashedPassword,(err,res)=>{

    console.log(res);
});

// var data = {
//     id: 10
// };

// var token = jwt.sign(data.id, '123abc');
// console.log(token);

// var decoded = jwt.verify(token, '123abc');
// console.log('decoded',decoded);

// var message = 'I am user number 4';
// var hash = SHA256(message).toString();
// console.log(`Message ${message}`);
// console.log(`Hash ${hash}`);


//How to Hash your Data for Security
// var data = {
//     id: 5
// };

// var token = {

//     data,
//     hash : SHA256(JSON.stringify(data)).toString()
// };

// resultToken = SHA256(JSON.stringify(data)).toString();


// console.log(token.hash);
// console.log(resultToken);

