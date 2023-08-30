const express = require('express');
const authController = require('../controllers/authController');

const route = express.Router();

route.get('/', authController.getAll.bind(authController));
route.get('/:id', authController.getById.bind(authController));
route.delete('/:id', authController.deleteById.bind(authController));
route.patch('/:id', authController.editProfile.bind(authController));
route.post('/v1', authController.register.bind(authController)); //register
route.post('/v2', authController.login.bind(authController)); //login
route.get('/token/:token', authController.keepLogin.bind(authController)); ///keep login
module.exports = route;
