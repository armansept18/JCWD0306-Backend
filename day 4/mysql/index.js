import express from 'express';
import dotenv from 'dotenv';
import mysql from 'mysql2';
const app = express();
dotenv.config();
const PORT = process.env.PORT || 2000;

const db = mysql.createConnection({
 host: process.env.MYSQL_HOST,
 user: process.env.MYSQL_USER,
 password: process.env.MYSQL_PASSWORD,
 database: process.env.MYSQL_DATABASE,
 port: process.env.MYSQL_PORT
});

app.use(express.json());

app.get('/films', (req, res) => {
 const { rating } = req.query;
 let where = '';
 if (rating) where = ` where rating = '${rating}'`;
 const qString = 'select * from film' + where;
 db.query(qString, (err, result) => {
  if (err) return res.status(500).send(err);
  return res.send(result);
 });
});

app.listen(PORT, () => {
 console.log(`listen on port ${PORT}`);
 db.connect((err) => {
  if (err) console.log(err.message);
  else console.log('connected');
 });
});
