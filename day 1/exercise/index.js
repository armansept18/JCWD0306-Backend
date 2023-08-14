const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const PORT = process.env.PORT || 2000;
app.use(express.json());
app.use(cors());

const users = [
 {
  id: 1,
  fullname: 'Test',
  email: 'test@mail.com',
  password: 'password'
 },
 {
  id: 2,
  fullname: 'Test2',
  email: 'test2@mail.com',
  password: 'password'
 }
];
const todos = [
 {
  id: 1,
  task: 'makan bakso',
  hour: '12:00',
  userid: 1
 },
 {
  id: 2,
  task: 'makan rujak',
  hour: '12:00',
  userid: 2
 }
];
app.get('/', (req, res) => {
 res.end('welcome to my api');
});

//users
app.get('/users', (req, res) => {
 try {
  let data = [...users];
  if (req.query.email) {
   const { email, password } = req.query;
   data = data.filter(
    (user) => user.email === email && user.password === password
   );
  }
  return res.send({
   message: 'fetch user',
   payload: data
  });
 } catch (err) {
  return res.status(500).send({
   message: err.message
  });
 }
});

app.post('/users', (req, res) => {
 try {
  const { email, fullname, password } = req.body;
  if (!email || !fullname || !password)
   throw new Error('email/fullname/password required');
  else if (
   users.find((user) => user.email.toLowerCase() == email.toLowerCase())
  )
   throw new Error('email already exist');

  const newUser = {
   id: users[users.length - 1].id + 1,
   email,
   fullname,
   password
  };
  users.push(newUser);
  return res.send({
   message: 'new user registered',
   payload: newUser
  });
 } catch (err) {
  return res.status(500).send({
   message: err.message
  });
 }
});

//todos
app.get('/todos', (req, res) => {
 try {
  let user_todos = [...todos];
  if (req.query.userid) {
   user_todos = todos.filter((todo) => todo.userid == req.query.userid);
  }
  return res.send({
   message: 'fetch todos',
   payload: user_todos
  });
 } catch (err) {
  return res.status(500).send({
   message: err.message
  });
 }
});

app.get('/todos/:id', (req, res) => {
 try {
  const todo = todos.find((todo) => todo.id == req.params.id);
  return res.send({
   message: 'fetch todos',
   payload: todo
  });
 } catch (err) {
  return res.status(500).send({
   message: err.message
  });
 }
});

app.delete('/todos/:id', (req, res) => {
 try {
  const index = todos.findIndex((todo) => todo.id == req.params.id);
  if (index == -1) throw new Error('user not found');
  todos.splice(index, 1);

  return res.send({
   message: 'delete todos ',
   payload: todos
  });
 } catch (err) {
  return res.status(500).send({
   message: err.message
  });
 }
});

app.post('/todos', (req, res) => {
 try {
  const { userid, task, hour } = req.body;
  if (!userid || !task || !hour) throw new Error('userid/task/hour required');

  const newTodo = { id: users[users.length - 1].id + 1, userid, task, hour };
  todos.push(newTodo);
  return res.send({
   message: 'new todo posted',
   payload: newTodo
  });
 } catch (err) {
  return res.status(500).send({
   message: err.message
  });
 }
});

app.patch('/todos/:id', (req, res) => {
 try {
  const index = todos.findIndex((todo) => todo.id == req.params.id);
  if (index == -1) throw new Error('todo not found');

  const currentTodo = { ...todos[index], ...req.body };
  todos[index] = currentTodo;
  return res.send({
   message: 'new todo posted',
   payload: currentTodo
  });
 } catch (err) {
  return res.status(500).send({
   message: err.message
  });
 }
});

app.listen(PORT, () => {
 console.log(`listen on port ${PORT}`);
});
