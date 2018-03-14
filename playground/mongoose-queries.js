const {mongoose} = require('./../server/db/mongoose');
const {Todos} = require('./../server/model/todo');
const {Users} = require('./../server/model/user');

const {ObjectId} = require('mongodb');

var id = '5aa019201b7a92ec3473a619';


if(!ObjectId.isValid(id))
{
    return console.log('Invalid ID');
}

Users.findById(id).then((user)=>{
    if(!user){
     
    return console.log('Id is Null');   
    }
    console.log(user);

}).catch((e)=> console.log(e));




// var id = '5aa9658a43773f4407d0ea9d';


// if(!ObjectId.isValid(id))
// {
//     return console.log('Invalid ID');
// }


// Todos.find({
//     _id: id
// }).then((todo)=>{

//     console.log(todo);
// });

// Todos.findOne({
//     _id: id
// }).then((todo)=>{

//     console.log(todo);  
// });

// Todos.findById(id).then((todo)=>{
//     if(!todo){
     
//     return console.log(todo,'Id is Null');   
//     }
//     console.log(todo);

// });