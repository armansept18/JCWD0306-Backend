const express = require('express');
const app = express();
require('dotenv').config();
const PORT = process.env.PORT || 2000;
const cors = require('cors');
const { expenseRoutes } = require('./routes');

app.use(express.json());
app.use(cors());

app.use('/expenses', expenseRoutes);
app.listen(PORT, () => console.log(`listen on port ${PORT}`));
