const http = require('http');
const PORT = 2000;

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

const server = http.createServer(async (req, res) => {
 const method = req.method;
 const url = req.url.split('/');
 //  console.log(url);
 const route = url[1];
 //  console.log(method, route); //GET /users/ => res.end(data user id 1)
 const id = url[2];

 if (method === 'GET') {
  if (route === 'users') {
   if (id) {
    const user = users.filter((user) => user.id == id);
    console.log(user);
    return res.end(JSON.stringify(user ? user : {}));
   }
   return res.end(JSON.stringify(users));
  }
 } else if (method === 'POST') {
  if (route === 'users') {
   req.on('data', (data) => {
    console.log(JSON.parse(data));
    const user = {
     id: users.length + 1,
     ...JSON.parse(data)
    };
    users.push(user);
    console.log(users);
    return res.end(JSON.stringify(users));
   });
  }
 } else if (method === 'PATCH') {
  if (route === 'users' && id) {
   req.on('data', (data) => {
    const index = users.findIndex((user) => user.id == id);
    console.log(index);
    if (index != -1) {
     users[index] = {
      ...users[index],
      ...JSON.parse(data)
     };
     return res.end(JSON.stringify(users));
    }
    return res.end('id tidak ditemukan');
   });
  }
 } else if (method === 'DELETE') {
  if (route === 'users' && id) {
   const index = users.findIndex((user) => user.id == id);
   users.splice(index, 1);
   return res.end(JSON.stringify(users));
  }
  return res.end('id tidak ditemukan');
 }

 //  res.end('welcome to my api');
});

server.listen(PORT, () => {
 console.log(`server started on port : ${PORT}`);
});
