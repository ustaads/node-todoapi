const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/Users',(err,db)=>{

if(err)
{
   return  console.log('Unable to Connect to MongoDB Server',err);
}
console.log('Connected to MongoDB Server');

// db.collection('user').deleteMany({name: 'Amit Sharma'}).then((res)=>{
//     console.log(res);
// });

db.collection('user').findOneAndDelete({ _id: new ObjectID('5a9c608eb75ef83464b36472')}).then((res)=>{
    console.log(res);
});


db.close();
});