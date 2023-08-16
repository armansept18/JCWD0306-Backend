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
    .reduce((sum, curr) => sum + curr.nominal, 0);

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
    .reduce((sum, curr) => sum + curr.nominal, 0);
   res.send({ category, total });
  } catch (err) {
   res.status(500).send(err.message);
  }
 }
}
module.exports = Expense;
