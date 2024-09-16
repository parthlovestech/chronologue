import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import Exams from './Exams'
import Planner from './Planner';
import Expense from './Expense';

const App = () => {
  const [user, setUser] = useState(null);

  return (
    <Router>
      <Routes>
        {/* Route for unauthenticated users */}
        {!user ? (
          <Route path="/" element={<Login setUser={setUser} />} />
        ) : (
          <>
            {/* Routes for authenticated users */}
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/exams" element={<Exams />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/expense" element={<Expense />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
