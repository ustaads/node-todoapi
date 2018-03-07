const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Users',(err,db)=>{

if(err)
{
   return  console.log('Unable to Connect to MongoDB Server',err);
}
console.log('Connected to MongoDB Server');


db.collection('user').find({name: 'Amit Sharma'}).count().then((docs)=>{

    console.log('Number of Users with the name Amit Sharma -> ',JSON.stringify(docs,undefined,2));
},(err)=>{

    console.log('Could Not Count the NUmber of user due to : ',err);
});

// db.collection('Todos').insertOne({

//     text: 'Something to do ',
//     completed: false
// },(err, res)=>{

//     if(err)
// {
//    return  console.log('Unable to Connect to Todos', err);
// }

// console.log(JSON.stringify(res.ops,undefined,2));

// });

// db.collection('user').insertOne({
//     name: 'Amit Sharma',
//     age: 22,
//     location: 'Brampton'
// },(err, res)=>{

//     if(err){
//        return  console.log('Unable to Insert Data',err);
//     }

//     console.log(JSON.stringify(res.ops[0]._id.getTimestamp(), undefined,2));

// });




db.close();
});