const express = require('express');
const messageController = require('../controllers/messageController');
const route = express.Router();
route.get('/', messageController.getMessagesByRecevier.bind(messageController));
module.exports = route;
