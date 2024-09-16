import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Dashboard from './Dashboard';
import Home from './Home';
import Entries from './Entries';
import Planner from './Planner';
import Expenses from './Expenses';

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
            <Route path="/" element={<Dashboard />} />
            <Route path="/home" element={<Home />} />
            <Route path="/entries" element={<Entries />} />
            <Route path="/planner" element={<Planner />} />
            <Route path="/expenses" element={<Expenses />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;
