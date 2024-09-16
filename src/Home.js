import React from 'react';
import { Link } from 'react-router-dom'; // Use Link for internal navigation
import './Home.css'; // Make sure to include your CSS file

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Chronologue</h1>
        <p>Your all-in-one tool for diary entries, task planning, and expense management.</p>
        <Link to="/dashboard" className="cta-button">Get Started</Link>
      </section>

      {/* Features Overview */}
      <section className="features">
        <div className="feature-item">
          <i className="fas fa-book feature-icon"></i>
          <h2>Diary</h2>
          <p>Track your personal thoughts and experiences.</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-calendar feature-icon"></i>
          <h2>Planner</h2>
          <p>Organize your schedule and tasks effortlessly.</p>
        </div>
        <div className="feature-item">
          <i className="fas fa-wallet feature-icon"></i>
          <h2>Expenses</h2>
          <p>Manage and track your finances with ease.</p>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>Sign Up</h3>
            <p>Create an account to get started with Chronologue.</p>
          </div>
          <div className="step">
            <h3>Explore Features</h3>
            <p>Discover all the tools available to manage your life.</p>
          </div>
          <div className="step">
            <h3>Start Organizing</h3>
            <p>Begin using the diary, planner, and expense tracker to stay on top of things.</p>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Home;
