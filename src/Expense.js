import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import jsPDF from 'jspdf'; // Import jsPDF for PDF generation
import 'chart.js/auto'; // Import necessary chart components
import './Expense.css';

const Expense = () => {
  const [expenses, setExpenses] = useState([]);
  const [newExpense, setNewExpense] = useState('');
  const [newAmount, setNewAmount] = useState('');
  const [newDate, setNewDate] = useState('');
  const [balance, setBalance] = useState(0); // User's balance

  const handleAddExpense = () => {
    if (newExpense.trim() === '' || newAmount.trim() === '' || newDate.trim() === '') return;

    const expenseAmount = parseFloat(newAmount);
    const newExpenseItem = {
      description: newExpense,
      amount: expenseAmount,
      date: new Date(newDate),
    };

    const updatedExpenses = [...expenses, newExpenseItem];
    setExpenses(updatedExpenses);
    setBalance((prevBalance) => prevBalance - expenseAmount);
    setNewExpense('');
    setNewAmount('');
    setNewDate('');
  };

  // Function to generate PDF report
  const generatePDF = () => {
    const doc = new jsPDF();
    doc.setFont('Helvetica');
    doc.setFontSize(16);

    // Add title
    doc.text('Expense Report', 20, 20);

    // Add balance info
    doc.setFontSize(12);
    doc.text(`Current Balance: $${balance.toFixed(2)}`, 20, 30);

    // Add table header
    doc.text('Date', 20, 40);
    doc.text('Description', 60, 40);
    doc.text('Amount', 120, 40);

    // Add expenses data
    let y = 50; // Start position for expenses
    expenses.forEach((expense) => {
      doc.text(expense.date.toLocaleDateString(), 20, y);
      doc.text(expense.description, 60, y);
      doc.text(`-$${expense.amount.toFixed(2)}`, 120, y);
      y += 10; // Adjust position for the next row
    });

    // Download the PDF
    doc.save('expense_report.pdf');
  };

  // Back button handler
  const handleBack = () => {
    window.history.back(); // Navigate back to the previous page
  };

  return (
    <div className="expense-container">
      {/* Back Button */}
      <button className="back-go-button" onClick={handleBack}>
        <i className="fas fa-arrow-left"></i>
      </button>

      <header className="expense-header">
        <h1>Financial Overview</h1>
      </header>

      <div className="balance-overview">
        <div className="balance-header">
          <h2>Account Summary</h2>
        </div>
        <div className="balance-details">
          <div className="balance-item">
            <span>Current Balance:</span>
            <span className={`balance-amount ${balance >= 0 ? 'positive' : 'negative'}`}>
              ${balance.toFixed(2)}
            </span>
          </div>
          <input
            type="number"
            placeholder="Set Initial Balance"
            onChange={(e) => setBalance(parseFloat(e.target.value) || 0)}
            className="balance-input"
          />
        </div>
      </div>

      <div className="expense-inputs">
        <h3>Add a Transaction</h3>
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
        <button onClick={handleAddExpense}>Add Transaction</button>
      </div>

      <div className="expense-chart">
        <h3>Spending Overview</h3>
        <Bar
          data={{
            labels: expenses.map(exp => exp.date.toLocaleDateString()),
            datasets: [{
              label: 'Expenses',
              data: expenses.map(exp => exp.amount),
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          }}
          options={{ scales: { y: { beginAtZero: true } } }}
        />
      </div>

      <div className="expense-sorting">
        <h3>Sort Transactions</h3>
        <button onClick={generatePDF}>Download Report (PDF)</button>
      </div>

      <div className="expense-list">
        <h3>Transaction History</h3>
        {expenses.length > 0 ? (
          expenses.map((exp, index) => (
            <div key={index} className="expense-card">
              <div className="transaction-details">
                <span className="transaction-desc">{exp.description}</span>
                <span className="transaction-date">{exp.date.toLocaleDateString()}</span>
              </div>
              <div className={`transaction-amount ${exp.amount < 0 ? 'negative' : 'positive'}`}>
                <span>{exp.amount < 0 ? `-$${Math.abs(exp.amount).toFixed(2)}` : `$${exp.amount.toFixed(2)}`}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-transactions">No transactions recorded.</p>
        )}
      </div>

    </div>
  );
};

export default Expense;
