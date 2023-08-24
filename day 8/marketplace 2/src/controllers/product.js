const db = require('../models');

const productControllers = {
 getAll(req, res) {
  db.Product.findAll() // select * from products api => nodemon => library dependencies => sequelize
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 },
 getById(req, res) {
  const { id } = req.params;
  db.Product.findByPk(id) // select * from products where id = id
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 },
 getByProductName(req, res) {
  const { product_name } = req.query;
  db.Product.findAll({
   //select * from products where product_name like '%product%'
   where: {
    product_name: {
     [db.Sequelize.Op.like]: `%${product_name}%`
    }
   }
  })
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 },
 createProduct(req, res) {
  db.Product.create({ ...req.body }) // insert into products (....)
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 },
 editProduct(req, res, next) {
  const { id } = req.params;
  db.Product.update(
   { ...req.body },
   {
    where: { id }
   }
  ) // select * from products api => nodemon => library dependencies => sequelize
   .then((result) => next())
   .catch((err) => res.status(500).send(err?.message));
 },
 deleteProduct(req, res) {
  const { id } = req.params;
  db.Product.destroy({ where: { id } }) // delete from products where id = id
   .then((result) => res.send({ message: `product id ${id} berhasil dihapus` }))
   .catch((err) => res.status(500).send(err?.message));
 },
 getAllProductWithUser(req, res) {
  db.Product.findAll({
   include: { model: db.User, as: 'user' }
  }) // select * from products api => nodemon => library dependencies => sequelize
   .then((result) => res.send(result))
   .catch((err) => res.status(500).send(err?.message));
 }
};
module.exports = productControllers;
