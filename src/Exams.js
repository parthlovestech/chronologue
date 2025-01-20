import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Exams.css';

const subjects = [
  'English',
  'Spanish',
  'Business Management',
  'Physics',
  'Computer Science',
  'Mathematics',
];

const Exams = () => {
  const [exams, setExams] = useState([]);
  const [newSubject, setNewSubject] = useState(subjects[0]);
  const [newDeadline, setNewDeadline] = useState('');
  const [newDetails, setNewDetails] = useState('');
  const [filter, setFilter] = useState('');
  const [search, setSearch] = useState('');
  const [sortOrder, setSortOrder] = useState('date');
  const navigate = useNavigate();

  // Load exams from localStorage when component mounts
  useEffect(() => {
    try {
      const savedExams = localStorage.getItem('exams');
      if (savedExams) {
        setExams(JSON.parse(savedExams));
      }
    } catch (error) {
      console.error('Failed to parse exams from localStorage:', error);
    }
  }, []);

  // Save exams to localStorage whenever exams state changes
  useEffect(() => {
    localStorage.setItem('exams', JSON.stringify(exams));
  }, [exams]);

  const handleAddExam = () => {
    if (!newDeadline.trim() || !newDetails.trim()) {
      alert('Please fill in all the fields.');
      return;
    }

    const newExam = {
      subject: newSubject,
      deadline: newDeadline,
      details: newDetails,
      status: 'Upcoming',
    };

    setExams((prevExams) => [...prevExams, newExam]);
    setNewDeadline('');
    setNewDetails('');
  };

  const handleDeleteExam = (index) => {
    const updatedExams = exams.filter((_, i) => i !== index);
    setExams(updatedExams);
  };

  const filteredExams = exams
    .filter((exam) => (filter ? exam.subject === filter : true))
    .filter((exam) => (search ? exam.details.toLowerCase().includes(search.toLowerCase()) : true))
    .sort((a, b) =>
      sortOrder === 'date'
        ? new Date(a.deadline) - new Date(b.deadline)
        : a.subject.localeCompare(b.subject)
    );

  return (
    <div className="exams-container">
      <header className="exams-header">
        <button className="custom-go-back-button" onClick={() => navigate(-1)}>
          <i className="fas fa-arrow-left"></i> {/* Custom back button */}
        </button>
        <h1>Exams</h1>
      </header>

      <div className="filters">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="">All Subjects</option>
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Search exams..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
        >
          <option value="date">Sort by Date</option>
          <option value="subject">Sort by Subject</option>
        </select>
      </div>

      <div className="exams-list-container">
        <div className="exams-list">
          {filteredExams.length > 0 ? (
            filteredExams.map((exam, index) => (
              <div key={index} className="exam-card">
                <h2>{exam.subject}</h2>
                <p>Deadline: {exam.deadline}</p>
                <p>Details: {exam.details}</p>
                <p>Status: <span className={`status ${exam.status.toLowerCase()}`}>{exam.status}</span></p>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteExam(index)}
                >
                  <i className="fas fa-trash"></i> Delete
                </button>
              </div>
            ))
          ) : (
            <p>No exams found.</p>
          )}
        </div>
      </div>

      <div className="add-exam">
        <select
          value={newSubject}
          onChange={(e) => setNewSubject(e.target.value)}
        >
          {subjects.map((subject, index) => (
            <option key={index} value={subject}>
              {subject}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={newDeadline}
          onChange={(e) => setNewDeadline(e.target.value)}
        />
        
        <textarea
          placeholder="Enter exam details..."
          value={newDetails}
          onChange={(e) => setNewDetails(e.target.value)}
        />
        
        <button onClick={handleAddExam}>Add Exam</button>
      </div>
    </div>
  );
};

export default Exams;
