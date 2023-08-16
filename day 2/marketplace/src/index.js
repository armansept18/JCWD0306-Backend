const express = require('express');
const app = express();
app.use(express.json());
const PORT = 2000;
const data = require('./json/data.json');
const { Res } = require('./class');
const { validateProduct, updateProduct } = require('./middlewares/products');
const products = [...data.products];
app.get('/', (req, res) => {
 res.send('welcome to my api');
});

app.get('/products', (req, res) => {
 try {
  let datas = [...products];
  const { search, orderby, sortby } = req.query;
  if (search) {
   datas = datas.filter((data) =>
    data.product_name.toLowerCase().includes(search.toLowerCase())
   );
  }
  if (orderby && sortby) {
   datas = datas.sort((a, b) => {
    //orderby = product_name
    //a[product_name]
    //asc/desc => ASC DESC
    if (a[orderby] < b[orderby]) return sortby.toUpperCase() == 'DESC' ? 1 : -1;
    if (a[orderby] > b[orderby]) return sortby.toUpperCase() == 'DESC' ? -1 : 1;
    return 0;
   });
  }
  return res.send(new Res('fetch product', datas));
 } catch (err) {
  return res.status(500).send(new Res(err.message));
 }
});

app.delete('/products/:id', (req, res) => {
 try {
  const { id } = req.params;
  const index = products.findIndex((product) => product.id == id);
  if (index == -1) throw new Error('id not found');
  products.splice(index, 1);
  return res.send(new Res('delete product', products));
 } catch (err) {
  return res.status(500).send(new Res(err.message));
 }
});

app.patch('/products/:id', updateProduct, (req, res) => {
 try {
  const { id } = req.params;
  const index = products.findIndex((product) => product.id == id);
  products[index] = { ...products[index], ...req.updated_product };
  return res.status(201).send(new Res('new product', products[index]));
 } catch (err) {
  return res.status(500).send(new Res(err.message));
 }
});

app.post('/products', validateProduct, (req, res) => {
 try {
  const newProduct = {
   id: products[products.length - 1].id + 1,
   ...req.product
  };
  products.push(newProduct);
  return res.status(201).send(new Res('new product', newProduct));
 } catch (err) {
  return res.status(500).send(new Res(err.message));
 }
});

app.listen(PORT, () => console.log(`port listen on ${PORT}`));
