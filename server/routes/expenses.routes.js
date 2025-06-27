const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const expenseController = require('../controllers/expenses.controller');

router.get('/expenses', expenseController.getAllExpenses);

router.post('/expenses', [
    body('title').notEmpty().withMessage('Title is required'),
    body('amount').isNumeric().withMessage('Amount must be a number'),
    body('description').optional().isString().withMessage('Description must be a string'),
], expenseController.addExpense);

router.put('/expenses/:id', [
    body('title').optional().isString().withMessage('Title must be a string'),
    body('amount').optional().isNumeric().withMessage('Amount must be a number'),
    body('date').optional().isISO8601().toDate().withMessage('Date must be a valid date'),
    body('description').optional().isString().withMessage('Description must be a string'),
], expenseController.updateExpense);

router.delete('/expenses/:id', expenseController.deleteExpense);


module.exports = router;