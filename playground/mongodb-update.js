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

db.collection('user').findOneAndUpdate(
    {
        _id: new ObjectID('5a9c7146c366fd07383b2b26')
    },
    {
        $set: {
            name: 'Amit Tinjan',
            age: 23
        }
    },
    {
        returnOriginal : false
    }
).then((res)=>{

    console.log(res);
});


db.close();
});