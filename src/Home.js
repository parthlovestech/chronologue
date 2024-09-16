import React from 'react';
import './Home.css'; // Make sure to include your CSS file

const Home = () => {
  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <h1>Welcome to Chronologue</h1>
        <p>Your ultimate tool for organizing your life. Track your diary entries, plan your tasks, and manage your expenses all in one place.</p>
        <a href="/signup" className="cta-button">Get Started</a>
      </section>

      {/* Features Overview */}
      <section className="features">
        <div className="feature-item">
          <i className="fas fa-book feature-icon"></i>
          <h2>Diary</h2>
          <p>Keep track of your personal thoughts and experiences.</p>
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

      {/* Testimonials */}
      <section className="testimonials">
        <h2>What Our Users Say</h2>
        <blockquote>
          <p>"Chronologue has transformed the way I manage my daily tasks. It's intuitive and user-friendly!"</p>
          <footer>- Jane Doe</footer>
        </blockquote>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Chronologue. All rights reserved.</p>
        <div className="footer-links">
          <a href="/contact">Contact Us</a>
          <a href="/privacy">Privacy Policy</a>
          <a href="/terms">Terms of Service</a>
        </div>
        <div className="social-media">
          <a href="https://twitter.com/yourprofile" className="social-icon"><i className="fab fa-twitter"></i></a>
          <a href="https://facebook.com/yourprofile" className="social-icon"><i className="fab fa-facebook-f"></i></a>
        </div>
      </footer>
    </div>
  );
};

export default Home;
