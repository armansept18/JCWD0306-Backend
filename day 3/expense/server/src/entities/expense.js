const Entity = require('./entity');
const moment = require('moment');
class Expense extends Entity {
 constructor(data) {
  super(data);
 }
 getTotalExpenseByDates(req, res) {
  try {
   let { datefrom, dateto } = req.query;
   datefrom = moment(datefrom);
   dateto = moment(dateto);
   if (!datefrom.isValid() || !dateto.isValid())
    throw new Error('required datefrom and dateto');

   const total = this.data
    .filter((exp) => {
     const date = moment(exp.date); //string=> moment date
     return date >= datefrom && date <= dateto;
    })
    .reduce((sum, curr) => sum + Number(curr.nominal), 0);

   return res.send({
    datefrom,
    dateto,
    total
   });
  } catch (err) {
   res.status(500).send(err.message);
  }
 }
 getTotalExpenseByCategory(req, res) {
  try {
   const { category } = req.params;
   const total = this.data
    .filter((exp) => exp.category == category)
    .reduce((sum, curr) => sum + Number(curr.nominal), 0);
   res.send({ category, total });
  } catch (err) {
   res.status(500).send(err.message);
  }
 }
 getByFilter(req, res) {
  try {
   let { category, datefrom, dateto } = req.query;
   let data = [...this.data] || [];
   if (category) {
    data = data.filter((exp) => exp.category == category);
   }
   if (datefrom && dateto) {
    datefrom = moment(datefrom);
    dateto = moment(dateto);
    if (!datefrom.isValid() || !dateto.isValid())
     throw new Error('required datefrom and dateto');
    data = data.filter((exp) => {
     const date = moment(exp.date); //string=> moment date
     return date >= datefrom && date <= dateto;
    });
   }
   const total = data.reduce((sum, curr) => sum + Number(curr.nominal), 0);

   return res.send({ total, data });
  } catch (err) {
   return res.status(500).send(err.message);
  }
 }
}
module.exports = Expense;
