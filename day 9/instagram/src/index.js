const { authRoutes, PostRoutes } = require('./routes');
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 2000;
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(cors());
const db = require('./models/');

app.use('/auth', authRoutes);
app.use('/posts', PostRoutes);

app.listen(PORT, () => {
 console.log(`listen on port ${PORT}`);
 //  db.sequelize.sync({ alter: true });
});
