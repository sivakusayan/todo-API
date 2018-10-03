const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const id = '5bb3b8b0fa62ee424c94d0fc';

if (!ObjectID.isValid(id)) {
  console.log('ID is not valid');
} else {
  Todo.findById(id).then((todo) => console.log('Todo: ', todo))
  .catch((err) => console.log(err));
}

// Todo.find({
//   _id: id
// }).then((todos) => {
//   console.log('Todos: ', todos);
// });

// Todo.findOne({
//   _id: id
// }).then((todo) => {
//   console.log('Todo: ', todo);
// })
