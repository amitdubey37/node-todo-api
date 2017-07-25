// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } =  require('mongodb');
var obj = new ObjectID();

console.log(obj)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=> {
  if(err) {
    return console.log('unable to connect to mongodb');
  }
  console.log('Connected to MongoDB server');

  db.collection('Todos').findOneAndUpdate(
    {
      _id: ObjectID('5976dc478505a0ccc792cba8')
    },
    {
      $set: {
        completed: false
      }
    }, {
      returnOriginal: false
    }
  ).then((result) => {
    console.log(result);
  })

  // db.close();
});
