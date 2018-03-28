const {mongoose} = require('./../server/db/mongoose');
const {Todos} = require('./../server/model/todo');
const {Users} = require('./../server/model/user');

const {ObjectId} = require('mongodb');

Todos.findByIdAndRemove('5aba5a00dd578430184cfa67').then((todo)=>{
    console.log(todo);
});