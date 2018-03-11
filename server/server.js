var express = require('express');
var bodyparser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todos} = require('./model/todo');
var  {Users} = require('./model/user');

var app = express();

var fs = require('fs');

app.use(bodyparser.json()); // Return a Javascript Object of the given json in the body

app.post('/todos',(req, res) =>{

    
    var newTodos = new Todos({
        text: req.body.text
    });

    newTodos.save().then((docs)=>{
        res.send(docs);
    },(err)=>{
        res.status(400).send(err);
    });

});

app.get('/todos',(req, res)=>{

    Todos.find().then((todos)=>{

        res.send({todos});
    },(err)=>{
        res.send(404);
    });

});



app.listen(3000,()=>{
    console.log(`Started on Port 3000`);
});

module.exports = {app};