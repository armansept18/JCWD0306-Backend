const Expense = require('../entities/expense');
const expenses_data = require('../json/data.json').expenses;
const expensesController = new Expense(expenses_data);
module.exports = expensesController;

//expenses => CRUD
//user  => CRUD
//transaction  => CRUD
//template object => getall,getbyid,create,delete,edit
