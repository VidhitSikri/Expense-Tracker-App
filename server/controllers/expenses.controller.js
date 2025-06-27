const expenseModel = require('../models/expenses.model');
const { validationResult } = require('express-validator');

module.exports.getAllExpenses = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const expenses = await expenseModel.find();
        res.status(200).json(expenses); // Send all expenses directly
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports.addExpense = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { title, amount,  description } = req.body;
        const newExpense = new expenseModel({
            title,
            amount,
            date: new Date(), // Automatically set the current date
            description
        });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}


module.exports.updateExpense = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const { title, amount, description } = req.body;
        const updatedExpense = await expenseModel.findByIdAndUpdate(
            id,
            { title, amount, description },
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

module.exports.deleteExpense = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { id } = req.params;
        const deletedExpense = await expenseModel.findByIdAndDelete(id);
        if (!deletedExpense) {
            return res.status(404).json({ message: 'Expense not found' });
        }
        res.status(200).json({ message: 'Expense deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}