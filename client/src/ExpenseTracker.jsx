"use client"

import { useState } from "react"

export default function ExpenseTracker() {
  const [expenses, setExpenses] = useState([
    { id: 1, name: "Pizza", amount: 250 },
    { id: 2, name: "Coffee", amount: 120 },
    { id: 3, name: "Groceries", amount: 850 },
    { id: 4, name: "Movie Ticket", amount: 300 },
    { id: 5, name: "Bus Fare", amount: 45 },
  ])

  const [newExpense, setNewExpense] = useState({ name: "", amount: "" })
  const [editingId, setEditingId] = useState(null)
  const [editingExpense, setEditingExpense] = useState({ name: "", amount: "" })

  const addExpense = () => {
    if (newExpense.name.trim() && newExpense.amount) {
      const expense = {
        id: Date.now(),
        name: newExpense.name.trim(),
        amount: Number.parseFloat(newExpense.amount),
      }
      setExpenses([...expenses, expense])
      setNewExpense({ name: "", amount: "" })
    }
  }

  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  const startEditing = (expense) => {
    setEditingId(expense.id)
    setEditingExpense({ name: expense.name, amount: expense.amount })
  }

  const saveEdit = () => {
    if (editingExpense.name.trim() && editingExpense.amount) {
      setExpenses(
        expenses.map((expense) =>
          expense.id === editingId
            ? { ...expense, name: editingExpense.name.trim(), amount: Number.parseFloat(editingExpense.amount) }
            : expense,
        ),
      )
      setEditingId(null)
      setEditingExpense({ name: "", amount: "" })
    }
  }

  const cancelEdit = () => {
    setEditingId(null)
    setEditingExpense({ name: "", amount: "" })
  }

  const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">💰 Expense Tracker</h1>
          <p className="text-gray-600 text-lg">Keep track of your daily expenses with ease</p>
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">Expense Name</label>
                  <input
                    type="text"
                    placeholder="e.g., Pizza, Coffee..."
                    value={newExpense.name}
                    onChange={(e) => setNewExpense({ ...newExpense, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Amount (₹)</label>
                  <input
                    type="number"
                    placeholder="0"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
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
                <p className="text-emerald-100 font-medium mb-2">Total Expenses</p>
                <p className="text-3xl font-bold">₹{totalAmount.toLocaleString()}</p>
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
                    <p className="text-gray-500 text-lg">No expenses added yet</p>
                    <p className="text-gray-400 text-sm mt-2">Add your first expense to get started!</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {expenses.map((expense, index) => (
                      <div
                        key={expense.id}
                        className="group bg-gray-50 hover:bg-gray-100 rounded-xl p-4 transition-all duration-200 border border-gray-100 hover:border-gray-200"
                      >
                        {editingId === expense.id ? (
                          <div className="flex gap-3 items-center">
                            <input
                              type="text"
                              value={editingExpense.name}
                              onChange={(e) => setEditingExpense({ ...editingExpense, name: e.target.value })}
                              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                            />
                            <input
                              type="number"
                              value={editingExpense.amount}
                              onChange={(e) => setEditingExpense({ ...editingExpense, amount: e.target.value })}
                              className="w-28 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
                                <span className="text-gray-800 font-semibold text-lg">{expense.name}</span>
                                <div className="text-gray-600 font-medium">₹{expense.amount.toLocaleString()}</div>
                              </div>
                            </div>
                            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                              <button
                                onClick={() => startEditing(expense)}
                                className="text-blue-600 hover:text-blue-800 px-3 py-2 text-sm border border-blue-200 rounded-lg hover:bg-blue-50 transition-all"
                              >
                                ✏️ Edit
                              </button>
                              <button
                                onClick={() => deleteExpense(expense.id)}
                                className="text-red-600 hover:text-red-800 px-3 py-2 text-sm border border-red-200 rounded-lg hover:bg-red-50 transition-all"
                              >
                                🗑️ Delete
                              </button>
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
  )
}
