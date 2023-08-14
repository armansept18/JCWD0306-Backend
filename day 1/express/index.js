const express = require('express');

const app = express();

const users = [
 {
  id: 1,
  name: 'test',
  email: 'test@mail.com',
  password: '123',
  age: 100
 },
 {
  id: 2,
  name: 'udin',
  email: 'udin@mail.com',
  password: '123',
  age: 150
 }
];

app.use(express.json()); //untuk membaca req.body
const dotenv = require('dotenv').config();
const cors = require('cors');

// console.log(process.env.PORT);

const PORT = process.env.PORT || 2000;
app.use(cors());

app.get('/', (req, res) => {
 return res.end('welcome to my express api');
});

app.get('/users', (req, res) => {
 return res.send(users);
});

app.get('/users/:id', (req, res) => {
 const { id } = req.params;
 return res.send(users.find((user) => user.id == id));
});

app.delete('/users/:id', (req, res) => {
 const index = users.findIndex((user) => user.id == req.params.id);
 if (index == -1) return res.status(500).send('id tidak ditemukan');
 users.splice(index, 1);
 return res.send({
  message: 'user berhasil dihapus',
  data: users
 });
});

app.post('/users', (req, res) => {
 console.log(req.body);
 const data = { ...req.body, id: users[users.length - 1].id + 1 };
 users.push(data);
 return res.send(users);
});

app.patch('/users/:id', (req, res) => {
 const index = users.findIndex((user) => user.id == req.params.id);
 if (index == -1) return res.status(500).send('id tidak ditemukan');
 users[index] = {
  ...users[index],
  ...req.body
 };
 return res.send(users[index]);
});

app.listen(PORT, () => {
 console.log(`server started on port : ${PORT}`);
});
