const express = require('express');
const postController = require('../controllers/postController');
const route = express.Router();

route.get('/', postController.login.bind(postController));
route.get('/:id', postController.getById.bind(postController));
route.delete('/:id', postController.deleteById.bind(postController));
route.patch('/:id', postController.updateById.bind(postController));
route.post('/', postController.create.bind(postController));

module.exports = route;
