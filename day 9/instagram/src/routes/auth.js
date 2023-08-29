const express = require('express');
const authController = require('../controllers/authController');

const route = express.Router();

route.get('/', authController.login.bind(authController));
route.get('/:id', authController.getById.bind(authController));
route.delete('/:id', authController.deleteById.bind(authController));
route.patch('/:id', authController.updateById.bind(authController));
route.post('/v1', authController.create.bind(authController)); //register
route.post('/v2', authController.login.bind(authController)); //login

module.exports = route;
