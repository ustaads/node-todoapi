const {MongoClient, ObjectID} = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp',(err,db)=>{

if(err)
{
   return  console.log('Unable to Connect to MongoDB Server',err);
}
console.log('Connected to MongoDB Server');



db.collection('Todos').find({_id: new ObjectID('5a9c5e82bda80112b0b2668b')}).toArray().then((docs)=>{
 
    console.log(JSON.stringify(docs,undefined,4));
}, (err)=>{
    console.log(err, 'Unable to Fetch Docs');
});


db.collection('Todos').find().count().then((count)=>{
 
    console.log(`Todos Count: ${count}`);
}, (err)=>{
    console.log(err, 'Unable to Fetch Docs');
});

// db.collection('Todos').find().skip(1).nextObject(function(err, item) {
    
//     console.log(JSON.stringify(item,undefined,4));
//   });


// db.collection('Todos').count().then((c)=>{
//     console.log(c);
// });

// db.close();
});