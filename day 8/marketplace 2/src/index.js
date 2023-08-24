const express = require('express');
const { productRoutes } = require('./routes');
require('dotenv').config();
const app = express();
const PORT = process.env.PORT || 2000;
const cors = require('cors');
const db = require('./models');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.send('welcome to my express api'));

app.use('/products', productRoutes);
// /products => route

app.listen(PORT, () => {
 console.log(`listen on port ${PORT}`);
 //  db.sequelize.sync({ alter: true });
});
