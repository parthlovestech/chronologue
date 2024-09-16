import React, { useState } from 'react';
import './Entries.css';

const Entries = () => {
  const [entries, setEntries] = useState(() => {
    try {
      const savedEntries = localStorage.getItem('entries');
      return savedEntries ? JSON.parse(savedEntries) : [];
    } catch (error) {
      console.error('Failed to parse entries from localStorage:', error);
      return [];
    }
  });
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);

  const handleAddEntry = () => {
    if (newTitle.trim() === '' || newContent.trim() === '') return;

    const newEntry = {
      title: newTitle,
      content: newContent,
      date: new Date().toLocaleDateString(),
    };

    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
    setNewTitle('');
    setNewContent('');
  };

  const handleViewEntry = (entry) => {
    if (entry && entry.title && entry.content) {
      setSelectedEntry(entry);
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEntry(null);
  };

  const handleDeleteEntry = (index) => {
    const updatedEntries = entries.filter((_, i) => i !== index);
    setEntries(updatedEntries);
    localStorage.setItem('entries', JSON.stringify(updatedEntries));
    if (selectedEntry && entries.indexOf(selectedEntry) === index) {
      handleCloseModal();
    }
  };

  return (
    <div className="entries-container">
      <header className="entries-header">
        <h1>My Diary</h1>
      </header>

      <div className="entries-list">
        {entries.length > 0 ? (
          entries.map((entry, index) => (
            <div
              key={index}
              className="entry-card"
              onClick={() => handleViewEntry(entry)}
            >
              <h2>{entry.title || 'Untitled'}</h2>
              <p>{entry.content ? entry.content.substring(0, 100) : 'No content'}...</p>
              <span className="entry-date">{entry.date || 'Unknown Date'}</span>
              <button
                className="delete-button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteEntry(index);
                }}
              >
                <i className="fas fa-trash"></i> Delete
              </button>
            </div>
          ))
        ) : (
          <p>No entries found.</p>
        )}
      </div>

      <div className="add-entry">
        <input
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          placeholder="Title"
        />
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Write your entry here..."
        />
        <button onClick={handleAddEntry}>Add Entry</button>
      </div>

      {showModal && selectedEntry && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{selectedEntry.title || 'Untitled'}</h2>
            <p>{selectedEntry.content || 'No content'}</p>
            <span className="modal-date">{selectedEntry.date || 'Unknown Date'}</span>
            <button onClick={handleCloseModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Entries;
