const {
 authRoutes,
 PostRoutes,
 commentRoutes,
 postlikeRoutes
} = require('./routes');
require('dotenv').config();
const express = require('express');
const PORT = process.env.PORT || 2000;
const app = express();
const cors = require('cors');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
const db = require('./models/');

app.use('/auth', authRoutes);
app.use('/posts', PostRoutes);
app.use('/comments', commentRoutes);
app.use('/postlike', postlikeRoutes);

app.use('/public/avatars', express.static(`${__dirname}/public/images/avatar`));

app.use('/public/posts', express.static(`${__dirname}/public/images/post`));

app.listen(PORT, () => {
 console.log(`listen on port ${PORT}`);
 //  db.sequelize.sync({ alter: true });
});
