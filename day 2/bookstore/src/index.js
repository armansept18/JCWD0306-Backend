const express = require('express');
const app = express();
const PORT = 2000;
app.use(express.json());

app.listen(PORT, () => console.log(`listen on port ${PORT}`));

const books = [
 {
  id: 1,
  title: 'Naruto',
  author: 'masashi kisimoto',
  category: 'komik'
 },
 {
  id: 2,
  title: 'Doraemon',
  author: 'Fujiko F.Fujio',
  category: 'komik'
 }
];

app.get('/books', (req, res) => {
 const { title } = req.query;
 let data = [...books];
 if (title)
  data = data.filter((book) =>
   book.title.toLowerCase().includes(title.toLowerCase())
  );

 res.send(data);
});

app.get('/books/:id', (req, res) => {
 const data = books.find((book) => book.id == req.params.id);
 res.send(data);
});

app.delete('/books/:id', (req, res) => {
 const index = books.findIndex((book) => book.id == req.params.id);
 if (index === -1) return res.status(500).send('id not found');
 books.splice(index, 1);
 return res.send(books);
});

app.patch('/books/:id', (req, res) => {
 const index = books.findIndex((book) => book.id == req.params.id);
 if (index === -1) return res.status(500).send('id not found');
 books[index] = { ...books[index], ...req.body };
 return res.send(books);
});

app.post('/books/', (req, res) => {
 const newBook = { id: books[books.length - 1].id + 1, ...req.body };
 books.push(newBook);
 return res.send(books);
});
