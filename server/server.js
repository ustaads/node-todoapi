const _ = require('lodash');
var express = require('express');
var bodyparser = require('body-parser');

var {mongoose} = require('./db/mongoose');
var {Todos} = require('./model/todo');
var  {User} = require('./model/user');
var {authenticate}= require('./middleware/authenticate');
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

app.patch('/todos/:id',(req, res)=>{

//fetch id
let id = req.params.id;

// fetch body using lodash
let body = _.pick(req.body, ['text', 'completed']);

//validate the id
if(!ObjectID.isValid(id)){
    console.log('Invalid', id);
    return res.status(404).send();
}

// checking the completed property
if(_.isBoolean(body.completed) && body.completed)
{
    body.completedAt= new Date().getTime();
}else{
    body.completed= false;
    body.completedAt = null;
}


//find by id and update
Todos.findByIdAndUpdate(id,{$set: body}, {new: true}).then((todo)=>{

    if(!todo){
        return res.status(404).send();
    }
    res.send(todo);

});

} );


//adding a new User using POST
app.post('/newuser',(req,res)=>{

   
    let data = _.pick(req.body,['email', 'password']);    
  
    let user = new User(data);
 
// Two things
// 1. Different way of using then
//2. different way of sending limited data
//     user.save().then((user)=>{
//         // res.status(200).send(user);
//          user.generateAuthToken().then((token)=>{

//               // res.header('x-auth',token).send(user);
//         res.send({
//             id: user.id,
//             email: user.email
//         });

//          });
//     }).catch((e)=>{
//         if(e.code=== 11000)
//         {
//         res.status(400).send({
//             "error": "Email Already Exist."
//         });
//     }
//     else{
// res.status(400).send(e.errors.password.message);
//     }

//     });


    user.save().then((user)=>{
        // res.status(200).send(user);
        return user.generateAuthToken();
    }).then((token)=>{
        res.header('x-auth',token).send(user);
    }).catch((e)=>{
        if(e.code=== 11000)
        {
        res.status(400).send({
            "error": "Email Already Exist."
        });
    }
    else{
res.status(400).send(e.errors.password.message);
    }

    });

});



app.get('/users/me',authenticate,(req,res)=>{

  res.send(req.user);
});

app.listen(port,()=>{
    console.log(`Started on ${port}`);
});

module.exports = {app};