const {ObjectID} = require('mongodb');
const jwt = require('jsonwebtoken');
const {Todos} = require('./../model/todo');
const {User} = require('./../model/user');

const userOneId= new ObjectID();
const userTwoId= new ObjectID();
const users= [{

    _id: userOneId,
    email: 'userone@seed.com',
    password: '123456',
    tokens:[
        {
            access:'auth',
            token :  jwt.sign({_id: userOneId, access: 'auth'}, 'abc123').toString()
        }
    ]
},{
 _id: userTwoId,
 email: 'usertwo@seed.com',
 password: '123456'   

}];

const todos = [
    {
    _id: new ObjectID(),
    text: 'Something to do one'
    },
    {
    _id: new ObjectID(),
    text: 'Something to do second'
    }
   ];

   const populateTodos = (done) => {
    Todos.remove({}).then(()=> {
    return Todos.insertMany(todos);
    }).then(()=> done());
   };
   

   const populateUsers = (done)=>{
       User.remove({}).then(()=>{
           var userOne = new User(users[0]).save();
           var userTwo = new User(users[1]).save();

           return Promise.all([userOne, userTwo]);
       }).then(()=> done());
   };
   module.exports = {todos, populateTodos, users, populateUsers};