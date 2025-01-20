import React from 'react';
import { Link } from 'react-router-dom'; 
import './Home.css';

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Chronologue</h1>
          <p>Your all-in-one tool for diary entries, task planning, and expense management.</p>
          <Link to="/dashboard" className="cta-button">Get Started</Link>
        </div>
      </section>

      {/* Features Overview */}
      <section className="features">
        <h2>Key Features</h2>
        <div className="feature-items">
          <div className="feature-item">
            <i className="fas fa-book feature-icon"></i>
            <h3>Exams</h3>
            <p>Track your upcoming exams.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-calendar feature-icon"></i>
            <h3>Planner</h3>
            <p>Organize your schedule and tasks effortlessly.</p>
          </div>
          <div className="feature-item">
            <i className="fas fa-wallet feature-icon"></i>
            <h3>Expenses</h3>
            <p>Manage and track your finances with ease.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <h3>1. Sign Up</h3>
            <p>Create an account to get started with Chronologue.</p>
          </div>
          <div className="step">
            <h3>2. Explore Features</h3>
            <p>Discover all the tools available to manage your life.</p>
          </div>
          <div className="step">
            <h3>3. Start Organizing</h3>
            <p>Begin using the exams planner, planner, and expense tracker to stay on top of things.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
