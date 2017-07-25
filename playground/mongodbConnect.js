// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } =  require('mongodb');
var obj = new ObjectID();

console.log(obj)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=> {
  if(err) {
    return console.log('unable to connect to mongodb');
  }
  console.log('Connected to MongoDB server');
  // db.collection('Todos').insertOne({
  //   text: 'Something to do',
  //   completed: false
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert todo', err);
  //   }
  //   console.log(JSON.stringify(result.ops, undefined, 2));
  // })

  // db.collection('Users').insertOne({
  //   name: 'Amit',
  //   age: 25,
  //   location: 'Delhi'
  // }, (err, result) => {
  //   if(err) {
  //     return console.log('Unable to insert user');
  //   }
  //   console.log(JSON.stringify(result.ops[0]._id.getTimestamp(), undefined, 2))
  // })
  db.close();
});
