// const MongoClient = require('mongodb').MongoClient;
const { MongoClient, ObjectID } =  require('mongodb');
var obj = new ObjectID();

console.log(obj)
MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db)=> {
  if(err) {
    return console.log('unable to connect to mongodb');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({_id: new ObjectID('5976d9303c2ce621362dd78b')}).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('unable to fetch todos', err);
  // });

  // delete many

  // db.collection('Todos').deleteMany({text: 'Eat Lunch'}).then((result) => {
  //   console.log(result)
  // });

  // deleteOne

  // db.collection('Todos').deleteOne({text: 'Something to do'}).then((res) => {
  //   console.log(res);
  // })

  // findOneAndDelete

  db.collection('Todos').findOneAndDelete({completed: false}).then((res) => {
    console.log(res);
  })

  // db.close();
});
