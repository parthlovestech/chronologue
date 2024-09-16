import React from 'react';
import './RecentEntries.css'; // Add styles as needed

const RecentEntries = ({ entries }) => {
  return (
    <div className="recent-entries">
      <h2>Recent Entries</h2>
      {entries.length > 0 ? (
        <ul>
          {entries.slice(0, 5).map((entry, index) => (
            <li key={index}>{entry.title}</li>
          ))}
        </ul>
      ) : (
        <p>No recent entries found.</p>
      )}
    </div>
  );
};

export default RecentEntries;
