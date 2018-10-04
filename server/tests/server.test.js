const expect = require('expect');
const request = require('supertest');
const { ObjectID } = require('mongodb');

const { app } = require('./../server');
const { Todo } = require('./../models/todo');

const todos = [{
  _id: new ObjectID(),
  text: 'First test todo'
}, {
  _id: new ObjectID(),
  text: 'Second test todo'
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    Todo.insertMany(todos);
    done();
  });
});

// describe('POST /todos', () => {
//   it('should create a new todo', (done) => {
//     const text = 'Setup MERN Stack';

//     request(app)
//       .post('/todos')
//       .send({text})
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.text).toBe(text);
//       })
//       .end((err, res) => {
//         if (err) return done(err);

//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(3);
//           expect(todos[2].text).toBe(text);
//           done();
//         }).catch((err) => done(err));
//       });
//   });

//   it('should not create a todo with invalid data', (done) => {

//     request(app)
//       .post('/todos')
//       .send({})
//       .expect(400)
//       .end((err, res) => {
//         if (err) return done(err);

//         Todo.find().then((todos) => {
//           expect(todos.length).toBe(2);
//           done();
//         }).catch((err) => done(err));
//       });
//   });
// });

// describe('GET /todos', () => {
//   it('should get all todos', (done) => {
//     request(app)
//       .get('/todos')
//       .expect(200)
//       .expect((res) => {
//         expect(res.body.todos.length).toBe(2);
//       })
//       .end(done);
//   });
// });

// describe(' GET /todos:id', () => {
//   it('should get the specified todo', (done) => {
//     const id = todos[0]._id.toHexString();
//     request(app)
//       .get(`/todos/${id}`)
//       .expect(200)
//       .expect((res) => expect(res.body.todo.text).toBe("First test todo"))
//       .end(done);
//   });

//   it('should return a 404 if todo not found', (done) => {
//     const id = new ObjectID();

//     request(app)
//       .get(`/todos/${id}`)
//       .expect(404)
//       .end(done);
//   });

//   it('should return a 404 for non-object ids', (done) => {
//     request(app)
//       .get('/todos/123')
//       .expect(404)
//       .end(done);
//   })
// });

describe('DELETE /todos/:id', (done) => {
  it('should remove a todo', (done) => {
    const id = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${id}`)
      .expect(200)
      .expect((res) => expect(res.body._id).toBe(id))
      .end((err, res) => {
        if (err) return done(err)
        
        Todo.findById(id).then((todo) => {
          expect(todo).toBe(null);
          done();
        })
      }).catch(err => done(err));
  });

  it('should return 404 if todo not found', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });

  it('should return 404 for invalid id', (done) => {
    request(app)
      .delete(`/todos/${new ObjectID()}`)
      .expect(404)
      .end(done);
  });
});