const express = require('express');
const expensesController = require('../controllers/expenses');
const route = express.Router();
route.get('/', expensesController.getAll.bind(expensesController));
// /expenses/ => method masing2

route.get(
 '/date-range',
 expensesController.getTotalExpenseByDates.bind(expensesController)
);
route.get(
 '/categories/:category',
 expensesController.getTotalExpenseByCategory.bind(expensesController)
);
route.post('/', expensesController.create.bind(expensesController));
route.get('/:id', expensesController.getById.bind(expensesController));
route.patch('/:id', expensesController.update.bind(expensesController));
route.delete('/:id', expensesController.delete.bind(expensesController));

module.exports = route;

// app.use("/expenses/") => route get/post/patch/delete => controller(handler req,res)
