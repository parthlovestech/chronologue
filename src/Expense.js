import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2'; // Import the Bar chart
import 'chart.js/auto'; // Import necessary chart components
import './Expense.css'; // Import the CSS file for styling

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState('');
  const [sortOrder, setSortOrder] = useState('date');
  const [calculatorInput, setCalculatorInput] = useState('');
  const [calculatorResult, setCalculatorResult] = useState('');

  const handleAddExpense = () => {
    if (newExpense.trim() === '' || newAmount.trim() === '' || newDate.trim() === '') return;

    const newExpenseItem = {
      description: newExpense,
      amount: parseFloat(newAmount),
      date: new Date(newDate),
    };

    const updatedExpenses = [...expenses, newExpenseItem];
    setExpenses(updatedExpenses);
    setNewExpense('');
    setNewAmount('');
    setNewDate(''); // Clear the date input
  };

  const handleSort = (order) => {
    setSortOrder(order);
  };

  const handleCalculate = () => {
    try {
      setCalculatorResult(eval(calculatorInput)); // Simple calculator
    } catch (e) {
      setCalculatorResult('Error');
    }
  };

  const sortedExpenses = expenses.sort((a, b) => 
    sortOrder === 'date' 
      ? new Date(b.date) - new Date(a.date)
      : b.amount - a.amount
  );

  const chartData = {
    labels: sortedExpenses.map(exp => exp.date.toLocaleDateString()), // Use date for labels
    datasets: [{
      label: 'Expenses',
      data: sortedExpenses.map(exp => exp.amount),
      backgroundColor: 'rgba(75, 192, 192, 0.2)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="expense-container">
      <header className="expense-header">
        <button className="back-go-button" onClick={() => window.history.back()}>
          <i className="fas fa-arrow-left"></i>
        </button>
        <h1>Expense Tracker</h1>
      </header>

      <div className="expense-inputs">
        <input
          type="text"
          placeholder="Expense Description"
          value={newExpense}
          onChange={(e) => setNewExpense(e.target.value)}
        />
        <input
          type="number"
          placeholder="Amount"
          value={newAmount}
          onChange={(e) => setNewAmount(e.target.value)}
        />
        <input
          type="date"
          value={newDate}
          onChange={(e) => setNewDate(e.target.value)}
        />
        <button onClick={handleAddExpense}>Add Expense</button>
      </div>

      <div className="expense-sorting">
        <select
          value={sortOrder}
          onChange={(e) => handleSort(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="amount">Sort by Amount</option>
        </select>
      </div>

      <div className="expense-chart">
        <Bar
          data={chartData}
          options={{
            scales: {
              y: {
                beginAtZero: true,
              },
            },
          }}
        />
      </div>

      <div className="expense-list">
        {sortedExpenses.length > 0 ? (
          sortedExpenses.map((exp, index) => (
            <div key={index} className="expense-card">
              <div className="table-row">
                <div className="table-cell description">
                  <h3>{exp.description}</h3>
                </div>
                <div className="table-cell amount-date">
                  <p className="amount">${exp.amount.toFixed(2)}</p>
                  <p className="date">{exp.date.toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No expenses found.</p>
        )}
      </div>

      
    </div>
  );
};

export default Expense;
