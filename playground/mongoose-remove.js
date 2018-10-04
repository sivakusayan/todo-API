const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const id = '5bb3b8b0fa62ee424c94d0fc';

Todo.deleteMany({}).then((result) => {
  console.log(result);
});
