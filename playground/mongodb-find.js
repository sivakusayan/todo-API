const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.error('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  db.collection('Todos').find().count().then((count) => {
    console.log('Todos count: ' + count);
  }, (err) => {
    console.log('Unable to fetch todos', err);
  });

  client.close();
});