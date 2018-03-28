var express = require('express');
var bodyparser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todos} = require('./model/todo');
var  {Users} = require('./model/user');
var {ObjectID} = require('mongodb');

var app = express();
const port = process.env.PORT || 3000;


app.use(bodyparser.json()); // Return a Javascript Object of the given json in the body

// app.all('/todos',(req, res)=>{

//     console.log('app.all Executed');
    
// });

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


app.get('/todos/:id', (req, res)=>{

    let id = req.params.id;

    if(!ObjectID.isValid(id))
    {
        return res.status(404).send({});
    }

    Todos.findById(id).then((success)=>{

            res.send(success);

    },(err)=>{

        res.status(400).send(err);

    }).catch((e)=> res.status(404).send());

});

app.delete('/todos/:id',(req, res)=>{

    var id = req.params.id;

    if(!ObjectID.isValid(id)){
        console.log('Invalid', id);
        return res.status(404).send();
    }

    Todos.findByIdAndRemove(id).then((todo)=>{

        if(!todo){
            return res.status(400).send(todo);
        }
        console.log('Success', id, todo);
        res.status(200).send(todo);
    }).catch((e)=> res.status(404).send());


});

app.listen(port,()=>{
    console.log(`Started on ${port}`);
});

module.exports = {app};