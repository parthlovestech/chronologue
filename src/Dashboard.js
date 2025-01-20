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
        <p>Your personal planner, tracker, and more</p>
      </header>
      
      <nav className="navbar">
        <Link to="/home" className="nav-button">
          <i className="fas fa-home"></i> Home
        </Link>
        <Link to="/exams" className="nav-button">
          <i className="fas fa-book"></i> Exams
        </Link>
        <Link to="/planner" className="nav-button">
          <i className="fas fa-calendar"></i> Planner
        </Link>
        <Link to="/expense" className="nav-button">
          <i className="fas fa-wallet"></i> Expense
        </Link>
      </nav>
      
      <main className="content">
        <div className="hero-section">
          <h2>Welcome Back, User!</h2>
          <p>Your journey towards success starts here.</p>
        </div>

        <div className="cards-container">
          <div className="motivational-card">
            <h3>Stay Motivated!</h3>
            <p>"Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful." - Albert Schweitzer</p>
          </div>

          <div className="quick-links-card">
            <h3>Quick Links</h3>
            <ul>
              <li><Link to="https://premier.managebac.com/login">ManageBac</Link></li>
              <li><Link to="https://www.revisionvillage.com/">Revision Village</Link></li>
              <li><Link to="https://www.revisiondojo.com/curriculum-landing/ib">Revision Dojo</Link></li>
            </ul>
          </div>
          <div className="sigma-slot">
            <h3>Study Tip!</h3>
            <p>Take short breaks every 45 minutes to stay productive and prevent burnout. Try the Pomodoro technique!</p>          </div>
        </div>

        <button className="button-logout" onClick={handleLogout}>
          <i className="fas fa-sign-out-alt"></i> Logout
        </button>
      </main>
    </div>
  );
};

export default Dashboard;
