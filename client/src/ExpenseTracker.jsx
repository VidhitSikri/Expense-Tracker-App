"use client";

import { useState, useEffect } from "react";
import axios from "axios";

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState({
    title: "",
    amount: "",
    description: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [editingExpense, setEditingExpense] = useState({
    title: "",
    amount: "",
    description: "",
  });

  // Fetch expenses from backend
  useEffect(() => {
    axios
      .get("http://localhost:3000/api/expenses")
      .then((res) => setExpenses(res.data))
      .catch(() => setExpenses([]));
  }, []);

  // Add expense
  const addExpense = async () => {
    if (newExpense.title.trim() && newExpense.amount) {
      try {
        const res = await axios.post("http://localhost:3000/api/expenses", {
          title: newExpense.title.trim(),
          amount: Number.parseFloat(newExpense.amount),
          description: newExpense.description.trim(),
        });
        setExpenses([...expenses, res.data]);
        setNewExpense({ title: "", amount: "", description: "" });
      } catch (err) {
        alert("Failed to add expense");
      }
    }
  };

  // Delete expense
  const deleteExpense = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/expenses/${id}`);
      setExpenses(expenses.filter((expense) => expense._id !== id));
    } catch (err) {
      alert("Failed to delete expense");
    }
  };

  // Start editing
  const startEditing = (expense) => {
    setEditingId(expense._id);
    setEditingExpense({
      title: expense.title,
      amount: expense.amount,
      description: expense.description || "",
    });
  };

  // Save edit
  const saveEdit = async () => {
    if (editingExpense.title.trim() && editingExpense.amount) {
      try {
        const res = await axios.put(
          `http://localhost:3000/api/expenses/${editingId}`,
          {
            title: editingExpense.title.trim(),
            amount: Number.parseFloat(editingExpense.amount),
            description: editingExpense.description.trim(),
          }
        );
        setExpenses(
          expenses.map((exp) => (exp._id === editingId ? res.data : exp))
        );
        setEditingId(null);
        setEditingExpense({ title: "", amount: "", description: "" });
      } catch (err) {
        alert("Failed to update expense");
      }
    }
  };

  // Cancel edit
  const cancelEdit = () => {
    setEditingId(null);
    setEditingExpense({ title: "", amount: "", description: "" });
  };

  const totalAmount = expenses.reduce(
    (sum, expense) => sum + Number(expense.amount),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">
            💰 Expense Tracker
          </h1>
          <p className="text-gray-600 text-lg">
            Keep track of your daily expenses with ease
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left Column - Add Expense & Total */}
          <div className="lg:col-span-1 space-y-6">
            {/* Add New Expense Card */}
            <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100">
              <h2 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                <span className="bg-blue-100 p-2 rounded-lg mr-3">➕</span>
                Add Expense
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expense Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Pizza, Coffee..."
                    value={newExpense.title}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, title: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Amount (₹)
                  </label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newExpense.amount}
                    onChange={(e) =>
                      setNewExpense({ ...newExpense, amount: e.target.value })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., Dinner with friends"
                    value={newExpense.description}
                    onChange={(e) =>
                      setNewExpense({
                        ...newExpense,
                        description: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <button
                  onClick={addExpense}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-medium shadow-md hover:shadow-lg"
                >
                  Add Expense
                </button>
              </div>
            </div>

            {/* Total Amount Card */}
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl shadow-lg p-6 text-white">
              <div className="text-center">
                <div className="bg-white/20 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">💳</span>
                </div>
                <p className="text-emerald-100 font-medium mb-2">
                  Total Expenses
                </p>
                <p className="text-3xl font-bold">
                  ₹{totalAmount.toLocaleString()}
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Expenses List */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100">
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                  <span className="bg-purple-100 p-2 rounded-lg mr-3">📋</span>
                  Your Expenses
                  <span className="ml-auto bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium">
                    {expenses.length} items
                  </span>
                </h2>
              </div>

              <div className="p-6">
                {expenses.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">📝</div>
                    <p className="text-gray-500 text-lg">
                      No expenses added yet
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Add your first expense to get started!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {expenses.map((expense, index) => (
                      <div
                        key={expense._id}
                        className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-200 border border-gray-100 hover:border-gray-200"
                      >
                        {editingId === expense._id ? (
                          <div className="flex gap-3 items-center">
                            <input
                              type="text"
                              value={editingExpense.title}
                              onChange={(e) =>
                                setEditingExpense({
                                  ...editingExpense,
                                  title: e.target.value,
                                })
                              }
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            />
                            <input
                              type="number"
                              value={editingExpense.amount}
                              onChange={(e) =>
                                setEditingExpense({
                                  ...editingExpense,
                                  amount: e.target.value,
                                })
                              }
                              className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            />
                            <input
                              type="text"
                              value={editingExpense.description}
                              onChange={(e) =>
                                setEditingExpense({
                                  ...editingExpense,
                                  description: e.target.value,
                                })
                              }
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                              placeholder="Description"
                            />
                            <button
                              onClick={saveEdit}
                              className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-700 transition-colors"
                            >
                              ✓
                            </button>
                            <button
                              onClick={cancelEdit}
                              className="bg-gray-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-600 transition-colors"
                            >
                              ✕
                            </button>
                          </div>
                        ) : (
                          <div className="flex justify-between items-center">
                            <div className="flex items-center flex-1">
                              <div className="bg-blue-100 text-blue-600 w-10 h-10 rounded-full flex items-center justify-center mr-4 font-bold text-sm">
                                {index + 1}
                              </div>
                              <div>
                                <span className="text-gray-800 font-semibold text-lg break-words whitespace-normal max-w-xs block">
                                  {expense.title}
                                </span>
                                <div className="text-gray-600 font-medium">
                                  ₹{Number(expense.amount).toLocaleString()}
                                </div>
                                {expense.description && (
                                  <div className="text-gray-400 text-sm break-words whitespace-normal max-w-xs block">
                                    {expense.description}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1">
                              {/* Show formatted date above buttons */}
                              {expense.date && (
                                <div className="text-gray-400 text-xs mb-1">
                                  {new Date(expense.date).toLocaleDateString()}
                                </div>
                              )}
                              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button
                                  onClick={() => startEditing(expense)}
                                  className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm border border-blue-200 rounded-lg hover:bg-blue-50 transition-all"
                                >
                                  ✏️ Edit
                                </button>
                                <button
                                  onClick={() => deleteExpense(expense._id)}
                                  className="text-red-600 hover:text-red-800 px-3 py-2 text-sm border border-red-200 rounded-lg hover:bg-red-50 transition-all"
                                >
                                  🗑️ Delete
                                </button>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
