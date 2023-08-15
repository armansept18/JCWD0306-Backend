const express = require('express');
require('dotenv').config();
const verify = require('./middlewares/verify');
const writelog = require('./middlewares/write-log');
const PORT = process.env.PORT || 2000;
const app = express();
const cookie = require('cookie-parser');
app.use(express.json());
app.use(cookie());
app.use(writelog);
app.get('/', (req, res) => {
 res.send('welcome to my api');
});

app.get(
 '/test',
 (req, res, next) => {
  //simple middleware
  console.log('lewat sini');
  next();
 },
 (req, res) => {
  res.send('ini test');
 }
);

app.get('/pohon', (req, res) => {
 return res.sendFile(__dirname + '/public/images/pohon.jpeg', (err) =>
  console.log(err)
 );
});
app.get('/html', (req, res) => res.send('<p><h1>hello</h1></p>'));

app.get('/html2', (req, res) => {
 return res.sendFile(__dirname + '/views/index.html', (err) =>
  console.log(err)
 );
});

app.get('/download/:filename', (req, res) => {
 return res.download(
  __dirname + '/public/images/' + req.params.filename,
  (err) => {
   console.log(err);
  }
 );
});

// app.use(verify);

//data diakses melalui abcd atau acd
app.get('/ab?cd', verify, (req, res) => {
 res.send('ab?cd');
});

//data diakses melalui abcd, abbcd, abbbcd, ..... seterusnya
app.get('/ab+cd', (req, res) => {
 res.send('ab+cd');
});

//data diakses melalui ab(apapun)cd,
//  abzzzzzcd, .... seterusnya diawali dengan ab dan diakhiri dengan cd
app.get('/ab*cd', (req, res) => res.send('ab*cd'));

//data diakses melalui abcde, abe
app.get('/ab(cd)?e', (req, res) => res.send('ab(cd)?e'));

// semua path yang ada huruf a
app.get(/a/, (req, res) => res.send('/a/'));
//dapat diawali apapun dan diakhiri dengan fly
//butterfly,dragonfly
app.get(/.*fly$/, (req, res) => res.send('/.*fly$/'));

app.listen(PORT, () => {
 console.log(`listen on port ${PORT}`);
});
