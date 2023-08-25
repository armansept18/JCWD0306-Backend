const express = require('express');
const productControllers = require('../controllers/product');
const route = express.Router();

route.get('/', productControllers.getAll);
route.get('/name', productControllers.getByProductName);
route.get('/users', productControllers.getAllProductWithUser);

route.get('/:id', productControllers.getById);
route.post('/', productControllers.createProduct);
route.post('/user-product', productControllers.createUserAndProduct);

route.patch('/:id', productControllers.editProduct, productControllers.getById);
route.delete('/:id', productControllers.deleteProduct);

// localhost:2500/products
module.exports = route;
