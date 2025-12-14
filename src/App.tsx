import { useState } from 'react'
import './App.css'

type Expense = {
  name: string
  amount: string
}

type Income = {
  name: string
  amount: string
}

function App() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [expenseName, setExpenseName] = useState('')
  const [expenseAmount, setExpenseAmount] = useState('')

  const [incomes, setIncomes] = useState<Income[]>([])
  const [incomeName, setIncomeName] = useState('')
  const [incomeAmount, setIncomeAmount] = useState('')

  const handleAddExpense = () => {
    if (!expenseName || !expenseAmount) {
      return
    }
    setExpenses([...expenses, { name: expenseName, amount: expenseAmount }])
    setExpenseName('')
    setExpenseAmount('')
  }

  const handleRemoveExpense = (indexToRemove: number) => {
    setExpenses(expenses.filter((_, index) => index !== indexToRemove))
  }

  const handleAddIncome = () => {
    if (!incomeName || !incomeAmount) {
      return
    }
    setIncomes([...incomes, { name: incomeName, amount: incomeAmount }])
    setIncomeName('')
    setIncomeAmount('')
  }

  const handleRemoveIncome = (indexToRemove: number) => {
    setIncomes(incomes.filter((_, index) => index !== indexToRemove))
  }

  const totalExpenses = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount || '0'), 0)
  const totalIncome = incomes.reduce((sum, income) => sum + parseFloat(income.amount || '0'), 0)
  const netBalance = totalIncome - totalExpenses

  return (
    <div className="app">
      <header className="header">
        <h1>Expense Tracker</h1>
        <p className="subtitle">Keep track of your spending</p>
      </header>

      <main className="main">
        <section className="add-income-section">
          <h2>Add New Income</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="income-name">Income Name</label>
              <input
                id="income-name"
                name="income-name"
                type="text"
                placeholder="e.g., Salary"
                value={incomeName}
                onChange={(e) => setIncomeName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="income-amount">Amount ($)</label>
              <input
                id="income-amount"
                name="income-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={incomeAmount}
                onChange={(e) => setIncomeAmount(e.target.value)}
              />
            </div>
            <button className="add-button" onClick={handleAddIncome}>
              Add Income
            </button>
          </div>
        </section>

        <section className="add-expense-section">
          <h2>Add New Expense</h2>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="expense-name">Expense Name</label>
              <input
                id="expense-name"
                name="expense-name"
                type="text"
                placeholder="e.g., Groceries"
                value={expenseName}
                onChange={(e) => setExpenseName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label htmlFor="expense-amount">Amount ($)</label>
              <input
                id="expense-amount"
                name="expense-amount"
                type="number"
                step="0.01"
                min="0"
                placeholder="0.00"
                value={expenseAmount}
                onChange={(e) => setExpenseAmount(e.target.value)}
              />
            </div>
            <button className="add-button" onClick={handleAddExpense}>
              Add Expense
            </button>
          </div>
        </section>

        <section className="income-section">
          <div className="income-header">
            <h2>Your Income</h2>
          </div>

          <table className="income-table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="amount-header">Amount</th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incomes.map((income, index) => (
                <tr key={index}>
                  <td>{income.name}</td>
                  <td className="amount-cell">${income.amount}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleRemoveIncome(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {incomes.length === 0 && (
            <div className="empty-state">
              <p>No income yet. Add your first income above!</p>
            </div>
          )}
        </section>

        <section className="expenses-section">
          <div className="expenses-header">
            <h2>Your Expenses</h2>
          </div>

          <table className="expenses-table">
            <thead>
              <tr>
                <th>Name</th>
                <th className="amount-header">Amount</th>
                <th className="actions-header">Actions</th>
              </tr>
            </thead>
            <tbody>
              {expenses.map((expense, index) => (
                <tr key={index}>
                  <td>{expense.name}</td>
                  <td className="amount-cell">${expense.amount}</td>
                  <td className="actions-cell">
                    <button onClick={() => handleRemoveExpense(index)}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {expenses.length === 0 && (
            <div className="empty-state">
              <p>No expenses yet. Add your first expense above!</p>
            </div>
          )}
        </section>

        <section className="balance-section">
          <div className="total-income">
            Total Income: <span className="amount">${totalIncome.toFixed(2)}</span>
          </div>
          <div className="total-expenses">
            Total Expenses: <span className="amount">${totalExpenses.toFixed(2)}</span>
          </div>
          <div className={`net-balance ${netBalance >= 0 ? 'positive' : 'negative'}`}>
            Net Balance: <span className="amount">${netBalance.toFixed(2)}</span>
          </div>
        </section>
      </main>

      <footer className="footer">
        <p>Home</p>
      </footer>
    </div>
  )
}

export default App
