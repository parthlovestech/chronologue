import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from './firebaseConfig';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out the user
      navigate('/'); // Redirect to login page after logout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="dashboard-container">
      <header className="header">
        <h1>Chronologue</h1>
      </header>
      
      <nav className="navbar">
        <Link to="/home" className="nav-button">
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/entries" className="nav-button">
          <i className="fas fa-book"></i> Entries
        </Link>
        <Link to="/planner" className="nav-button">
          <i className="fas fa-calendar"></i> Planner
        </Link>
        <Link to="/expenses" className="nav-button">
          <i className="fas fa-wallet"></i> Expenses
        </Link>
      </nav>
      
      <main className="content">
        <h2>Welcome to Chronologue</h2>
        <p>Your personal diary, planner, and expense tracker.</p>
        <div className="overview">
          <div className="widget">
            <h3><i className="fas fa-edit"></i> Recent Entries</h3>
            {/* List of recent entries */}
          </div>
          <div className="widget">
            <h3><i className="fas fa-tasks"></i> Upcoming Tasks</h3>
            {/* List of upcoming tasks */}
          </div>
          <div className="widget">
            <h3><i className="fas fa-dollar-sign"></i> Expense Summary</h3>
            {/* Summary of expenses */}
          </div>
        </div>
        <button className="button-logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </main>
      
      <footer className="footer">
        <p>&copy; 2024 Chronologue. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
