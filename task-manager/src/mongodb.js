const {MongoClient, ObjectId} = require('mongodb');

const url = 'mongodb://localhost:27017';
const dbName = 'task-manager';

MongoClient.connect(url, (error, client) => {
  if(error)
    return console.log(error)
  
  const db = client.db(dbName);

  // db.collection("users").insertOne({
  //   name: 'alex',
  //   age: 23
  // }, (error, result) => {
  //     if(error)
  //       return console.log('Uneable to insert User');

  //     console.log(result.insertedId)
  //   })

  // db.collection('users').insertMany([
  //   {
  //     name: 'jack',
  //     age: 25
  //   },
  //   {  
  //     name: 'jane',
  //     age: 31
  //   }], (error, result) => {
  //   if(error)
  //     return console.log('Uneable to insert documents')
    
  //   console.log(result.insertedIds)
  // })

  // db.collection("tasks").insertMany([{
  //   despriction: 'Do Homework',
  //   completed: true,
  //   },
  //   {
  //     despriction: 'feed the pets',
  //     completed: false
  //   },
  //   {
  //     despriction: 'buy groceries',
  //     completed: true
  //   }

  // ], (error, result) => {
  //   if(error)
  //     return console.log('uneable to insert documents')
    
  //   console.log(result.insertedIds);
  // })

  // db.collection('users').findOne({ name: 'alex'}, (error, result) => {
  //   if(error)
  //     return console.log(error);
    
  //   console.log(result);
  // })

  // db.collection('tasks').findOne({ _id: new ObjectId("6287b926df0916e6b9b420db")}, (error, result) => {
  //   if(error)
  //     return console.log(error);
    
  //   console.log(result)
  // })

  // db.collection('tasks').find({ completed: false}).toArray((error, result) => {
  //   if(error)
  //     return console.log('uneable to fetch data')
    
  //   console.log(result)
  // })

  // db.collection('users').updateOne({ name: 'alex' },{
  //   $set: {
  //     name: 'Jorge'
  //   }}).then(result => console.log(result)).catch(error => console.log(error))

  // db.collection('tasks').updateMany(
  //   {
  //     completed: false
  //   },
  //   {
  //     $set: {
  //       completed: true
  //     }
  //   }
  // ).then(result => console.log(result)).catch(error => console.log(error))

  db.collection('tasks').updateMany({}, {$rename: {'despriction': 'description'}})
  db.collection('tasks').deleteOne({ despriction: 'feed the pets'}).then(result => console.log(result)).catch(error =>  console.log(error));
})