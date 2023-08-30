const express = require('express');
const postController = require('../controllers/postController');
const check_verified = require('../middlewares/auth');
const route = express.Router();

route.get('/', postController.getPosts.bind(postController));
route.get(
 '/user/:userid',
 postController.getPostsByUserId.bind(postController)
);
route.get('/search', postController.getPostByFilter.bind(postController));
route.get('/:id', postController.getById.bind(postController));
route.delete(
 '/:id',
 check_verified,
 postController.deleteById.bind(postController)
);
route.patch(
 '/:id',
 check_verified,
 postController.updateById.bind(postController)
);
route.post('/', check_verified, postController.create.bind(postController));

module.exports = route;
