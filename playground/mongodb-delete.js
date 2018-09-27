const { MongoClient, ObjectID } = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', { useNewUrlParser: true }, (err, client) => {
  if (err) {
    return console.error('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');
  const db = client.db('TodoApp');

  // deleteMany
  db.collection('Todos').findOneAndDelete({ text: 'LEAVE THE EARTH D:' }).then((res) => {
    console.log(res);
  }, (err) => {
    console.log('Could not delete data, ' + err);
  });

  // client.close();
});