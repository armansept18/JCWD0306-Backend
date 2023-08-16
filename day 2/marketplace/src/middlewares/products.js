const { Res } = require('../class');

const validateProduct = (req, res, next) => {
 try {
  const { url, product_name, price, desc, stock } = req.body;
  if (!url || !product_name || !price || !desc || !stock)
   throw new Error('lengkapi data');
  req.product = { url, product_name, price, desc, stock };
  return next();
 } catch (err) {
  return res.status(500).send(new Res(err.message));
 }
};

const updateProduct = (req, res, next) => {
 try {
  req.updated_product = {};
  Object.keys(req.body).map((key) => {
   if (
    key == 'url' ||
    key == 'product_name' ||
    key == 'price' ||
    key == 'desc' ||
    key == 'stock'
   ) {
    req.updated_product[key] = req.body[key];
   }
  });

  if (!Object.keys(req.updated_product).length)
   throw new Error('lengkapi data');
  return next();
 } catch (err) {
  return res.status(500).send(new Res(err.message));
 }
};

module.exports = {
 validateProduct,
 updateProduct
};
